// Nekotune — Profile Manager
import './supabaseClient.js';

export class ProfileManager {
  constructor(app) {
    this.app = app;
    this.db = document.supabase;
    this.user = null;
    this.profile = null;
    this.activeTab = 'info';
    this.friends = [];
    this.pendingRequests = [];

    window.addEventListener('auth-state-changed', (e) => {
      this.user = e.detail.user;
      if (this.user) {
        this.loadProfile().then(() => this.render());
      } else {
        this.profile = null;
        this.render();
      }
    });
  }

  // ===== PROFILE DATA =====
  async loadProfile() {
    if (!this.user) return;
    const { data } = await this.db.from('users_profiles').select('*').eq('id', this.user.id).single();
    this.profile = data;
    this.render();
    return data;
  }

  async updateProfile(updates) {
    if (!this.user) return;
    const { data, error } = await this.db.from('users_profiles')
      .update(updates)
      .eq('id', this.user.id)
      .select()
      .single();
    if (!error) {
      this.profile = data;
      this.render();
    }
    return { data, error };
  }

  // ===== AVATAR =====
  async uploadAvatar(file) {
    if (!this.user) return { error: 'Non autenticato' };
    
    const fileExt = file.name.split('.').pop();
    const filePath = `${this.user.id}/avatar.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await this.db.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) return { error: uploadError.message };

    // Get public URL
    const { data: urlData } = this.db.storage.from('avatars').getPublicUrl(filePath);
    const avatarUrl = urlData.publicUrl + '?t=' + Date.now(); // cache bust

    // Update profile
    await this.updateProfile({ avatar_url: avatarUrl });
    return { url: avatarUrl };
  }

  // ===== FRIENDS =====
  async searchUsers(query) {
    if (!query || query.length < 2) return [];
    const { data } = await this.db.from('users_profiles')
      .select('id, username, avatar_url, status, currently_playing, is_private')
      .ilike('username', `%${query}%`)
      .neq('id', this.user.id)
      .limit(10);
    return data || [];
  }

  async sendFriendRequest(addresseeId) {
    const { error } = await this.db.from('friendships')
      .insert({ requester_id: this.user.id, addressee_id: addresseeId });
    return { error };
  }

  async acceptFriendRequest(friendshipId) {
    const { error } = await this.db.from('friendships')
      .update({ status: 'accepted' })
      .eq('id', friendshipId);
    return { error };
  }

  async rejectFriendRequest(friendshipId) {
    const { error } = await this.db.from('friendships')
      .delete()
      .eq('id', friendshipId);
    return { error };
  }

  async removeFriend(friendshipId) {
    const { error } = await this.db.from('friendships')
      .delete()
      .eq('id', friendshipId);
    return { error };
  }

  async loadFriends() {
    if (!this.user) return;
    
    // Accepted friends
    const { data: sent } = await this.db.from('friendships')
      .select('id, addressee_id, users_profiles!friendships_addressee_id_fkey(id, username, avatar_url, status, currently_playing, last_seen)')
      .eq('requester_id', this.user.id)
      .eq('status', 'accepted');

    const { data: received } = await this.db.from('friendships')
      .select('id, requester_id, users_profiles!friendships_requester_id_fkey(id, username, avatar_url, status, currently_playing, last_seen)')
      .eq('addressee_id', this.user.id)
      .eq('status', 'accepted');

    this.friends = [
      ...(sent || []).map(f => ({ friendshipId: f.id, ...f.users_profiles })),
      ...(received || []).map(f => ({ friendshipId: f.id, ...f.users_profiles }))
    ];

    // Pending requests (received)
    const { data: pending } = await this.db.from('friendships')
      .select('id, requester_id, users_profiles!friendships_requester_id_fkey(id, username, avatar_url)')
      .eq('addressee_id', this.user.id)
      .eq('status', 'pending');

    this.pendingRequests = (pending || []).map(p => ({ friendshipId: p.id, ...p.users_profiles }));
  }

  // ===== STATS SYNC =====
  async syncStatsToCloud() {
    if (!this.user) return;
    const statsKey = 'sw_listening_stats';
    const saved = localStorage.getItem(statsKey);
    if (!saved) return;

    try {
      const stats = JSON.parse(saved);
      await this.updateProfile({
        total_minutes: Math.round(stats.totalMinutes || 0),
        total_tracks: stats.totalTracks || 0,
        last_seen: new Date().toISOString()
      });
    } catch (e) {
      console.error('Stats sync error:', e);
    }
  }

  async recordListening(track, durationMs) {
    if (!this.user || durationMs < 30000) return;
    await this.db.from('listening_history').insert({
      user_id: this.user.id,
      track_id: track.id,
      track_metadata: { title: track.title, artist: track.artist },
      duration_ms: durationMs
    });
  }

  async updateCurrentlyPlaying(track) {
    if (!this.user) return;
    await this.updateProfile({
      currently_playing: track ? { title: track.title, artist: track.artist } : null,
      status: track ? 'listening' : 'online',
      last_seen: new Date().toISOString()
    });
  }

  // ===== UI RENDERING =====
  render() {
    const section = document.getElementById('section-profile');
    if (!section) return;

    if (!this.user || !this.profile) {
      section.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:20px;">
          <span class="material-icons-round" style="font-size:80px;color:var(--text-tertiary);">account_circle</span>
          <h2 style="color:var(--text-secondary);">Accedi per vedere il tuo profilo</h2>
          <button class="btn-primary" id="profile-login-btn" style="padding:12px 32px;border-radius:12px;font-size:1rem;">Accedi</button>
        </div>`;
      section.querySelector('#profile-login-btn')?.addEventListener('click', () => {
        this.app.authManager.showModal();
      });
      return;
    }

    const p = this.profile;
    const avatarSrc = p.avatar_url || '';
    const avatarDisplay = avatarSrc 
      ? `<img src="${avatarSrc}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
      : `<span class="material-icons-round" style="font-size:56px;color:var(--text-tertiary);">person</span>`;
    
    const memberSince = new Date(p.created_at).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

    section.innerHTML = `
      <!-- Hero Card -->
      <div class="profile-hero">
        <div class="profile-hero-bg"></div>
        <div class="profile-hero-content">
          <div class="profile-avatar-wrapper" id="profile-avatar-click">
            <div class="profile-avatar">${avatarDisplay}</div>
            <div class="profile-avatar-overlay">
              <span class="material-icons-round">photo_camera</span>
            </div>
            <input type="file" id="avatar-file-input" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none;">
          </div>
          <div class="profile-hero-info">
            <h1 class="profile-username" id="profile-username-display">${p.username || 'Utente'}</h1>
            <p class="profile-bio" id="profile-bio-display">${p.bio || 'Clicca per aggiungere una bio...'}</p>
            <div class="profile-badges">
              <span class="profile-badge"><span class="material-icons-round">calendar_today</span> Membro dal ${memberSince}</span>
              <span class="profile-badge"><span class="material-icons-round">headphones</span> ${Math.round((p.total_minutes || 0) / 60)}h ascoltate</span>
              <span class="profile-badge"><span class="material-icons-round">music_note</span> ${p.total_tracks || 0} brani</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="profile-tabs">
        <button class="profile-tab active" data-tab="info"><span class="material-icons-round">person</span> Profilo</button>
        <button class="profile-tab" data-tab="stats"><span class="material-icons-round">insights</span> Statistiche</button>
        <button class="profile-tab" data-tab="friends"><span class="material-icons-round">group</span> Amici</button>
        <button class="profile-tab" data-tab="settings"><span class="material-icons-round">settings</span> Impostazioni</button>
      </div>

      <!-- Tab Content -->
      <div class="profile-tab-content" id="profile-tab-content"></div>
    `;

    this.bindProfileEvents();
    this.renderTab('info');
  }

  bindProfileEvents() {
    // Avatar upload
    const avatarClick = document.getElementById('profile-avatar-click');
    const fileInput = document.getElementById('avatar-file-input');
    if (avatarClick && fileInput) {
      avatarClick.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        avatarClick.querySelector('.profile-avatar-overlay').innerHTML = '<div class="spinner-small"></div>';
        const result = await this.uploadAvatar(file);
        if (result.error) {
          this.app.showToast('Errore upload avatar: ' + result.error);
        } else {
          this.app.showToast('Avatar aggiornato!');
          this.render(); // Re-render
        }
      });
    }

    // Tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderTab(tab.dataset.tab);
      });
    });

    // Edit username
    const usernameEl = document.getElementById('profile-username-display');
    if (usernameEl) {
      usernameEl.addEventListener('click', () => this.showEditField('username', usernameEl));
    }

    // Edit bio
    const bioEl = document.getElementById('profile-bio-display');
    if (bioEl) {
      bioEl.addEventListener('click', () => this.showEditField('bio', bioEl));
    }
  }

  showEditField(field, element) {
    const currentValue = this.profile[field] || '';
    const isTextarea = field === 'bio';
    const inputEl = isTextarea ? document.createElement('textarea') : document.createElement('input');
    inputEl.value = currentValue;
    inputEl.style.cssText = `
      background: var(--bg-tertiary); border: 2px solid var(--accent);
      color: var(--text-primary); padding: 8px 12px; border-radius: 8px;
      font-size: inherit; font-family: inherit; width: 100%; outline: none;
      ${isTextarea ? 'resize:none;height:60px;' : ''}
    `;
    element.replaceWith(inputEl);
    inputEl.focus();

    const save = async () => {
      const newValue = inputEl.value.trim();
      if (newValue !== currentValue && newValue) {
        await this.updateProfile({ [field]: newValue });
        this.app.showToast(`${field === 'username' ? 'Username' : 'Bio'} aggiornato!`);
      }
      this.render();
    };
    inputEl.addEventListener('blur', save);
    inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !isTextarea) save(); });
  }

  // ===== TAB RENDERING =====
  renderTab(tab) {
    this.activeTab = tab;
    const container = document.getElementById('profile-tab-content');
    if (!container) return;

    switch (tab) {
      case 'info': this.renderInfoTab(container); break;
      case 'stats': this.renderStatsTab(container); break;
      case 'friends': this.renderFriendsTab(container); break;
      case 'settings': this.renderSettingsTab(container); break;
    }
  }

  renderInfoTab(container) {
    const p = this.profile;
    container.innerHTML = `
      <div class="profile-info-grid">
        <div class="profile-card">
          <h3><span class="material-icons-round">badge</span> Informazioni</h3>
          <div class="profile-field">
            <label>Email</label>
            <span>${this.user.email}</span>
          </div>
          <div class="profile-field">
            <label>Username</label>
            <span>${p.username || 'N/A'}</span>
          </div>
          <div class="profile-field">
            <label>Bio</label>
            <span>${p.bio || 'Nessuna bio impostata'}</span>
          </div>
          <div class="profile-field">
            <label>Profilo privato</label>
            <span>${p.is_private ? '🔒 Sì' : '🌐 No'}</span>
          </div>
        </div>
        <div class="profile-card">
          <h3><span class="material-icons-round">cloud_sync</span> Sincronizzazione</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:16px;">
            Le tue playlist e statistiche sono sincronizzate con il cloud.
          </p>
          <button class="btn-primary" id="btn-sync-now" style="width:100%;border-radius:10px;padding:10px;">
            <span class="material-icons-round" style="font-size:18px;vertical-align:middle;">sync</span> Sincronizza Ora
          </button>
          <p id="sync-status" style="color:var(--text-tertiary);font-size:0.8rem;margin-top:8px;text-align:center;"></p>
        </div>
      </div>`;

    document.getElementById('btn-sync-now')?.addEventListener('click', async () => {
      const statusEl = document.getElementById('sync-status');
      if (statusEl) statusEl.textContent = 'Sincronizzazione in corso...';
      await this.syncStatsToCloud();
      if (statusEl) statusEl.textContent = '✅ Sincronizzato alle ' + new Date().toLocaleTimeString('it-IT');
      this.app.showToast('Statistiche sincronizzate!');
    });
  }

  renderStatsTab(container) {
    // Merge local stats
    const statsKey = 'sw_listening_stats';
    let localStats = { totalMinutes: 0, totalTracks: 0, trackPlays: {}, artistPlays: {}, currentStreak: 0, longestStreak: 0 };
    try { localStats = { ...localStats, ...JSON.parse(localStorage.getItem(statsKey) || '{}') }; } catch(e) {}

    const hours = Math.round(localStats.totalMinutes / 60 * 10) / 10;
    const topTracks = Object.entries(localStats.trackPlays || {})
      .map(([id, d]) => ({ id, ...d }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    const topArtists = Object.entries(localStats.artistPlays || {})
      .map(([name, d]) => ({ name, ...d }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const artistColors = ['#6c5ce7', '#00b894', '#e17055', '#fdcb6e', '#74b9ff'];

    container.innerHTML = `
      <div class="profile-stats-hero">
        <div class="stats-ring-grid">
          <div class="stats-ring-card">
            <div class="stats-ring" style="--pct:${Math.min(hours / 100 * 100, 100)}; --clr:#6c5ce7;">
              <span>${hours}</span>
            </div>
            <div class="stats-ring-label">Ore Ascoltate</div>
          </div>
          <div class="stats-ring-card">
            <div class="stats-ring" style="--pct:${Math.min(localStats.totalTracks / 500 * 100, 100)}; --clr:#00b894;">
              <span>${localStats.totalTracks}</span>
            </div>
            <div class="stats-ring-label">Brani</div>
          </div>
          <div class="stats-ring-card">
            <div class="stats-ring" style="--pct:${Math.min(localStats.currentStreak / 30 * 100, 100)}; --clr:#e17055;">
              <span>${localStats.currentStreak}</span>
            </div>
            <div class="stats-ring-label">Streak (gg)</div>
          </div>
          <div class="stats-ring-card">
            <div class="stats-ring" style="--pct:${Math.min(localStats.longestStreak / 30 * 100, 100)}; --clr:#fdcb6e;">
              <span>${localStats.longestStreak}</span>
            </div>
            <div class="stats-ring-label">Record</div>
          </div>
        </div>
      </div>

      ${topArtists.length > 0 ? `
      <div class="profile-card">
        <h3><span class="material-icons-round">person</span> Top Artisti</h3>
        <div class="profile-top-list">
          ${topArtists.map((a, i) => `
            <div class="profile-top-item">
              <div class="profile-top-rank" style="background:${artistColors[i]}">${i + 1}</div>
              <div class="profile-top-name">${a.name}</div>
              <div class="profile-top-count">${a.count} ascolti</div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      ${topTracks.length > 0 ? `
      <div class="profile-card">
        <h3><span class="material-icons-round">music_note</span> Top Brani</h3>
        <div class="profile-top-list">
          ${topTracks.map((t, i) => `
            <div class="profile-top-item">
              <div class="profile-top-rank">${i + 1}</div>
              <div class="profile-top-info">
                <div class="profile-top-name">${t.title}</div>
                <div class="profile-top-sub">${t.artist}</div>
              </div>
              <div class="profile-top-count">${t.count}×</div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
    `;
  }

  async renderFriendsTab(container) {
    container.innerHTML = '<div style="text-align:center;padding:40px;"><div class="spinner-small"></div></div>';
    await this.loadFriends();

    container.innerHTML = `
      <!-- Search -->
      <div class="profile-card">
        <h3><span class="material-icons-round">person_search</span> Cerca Utenti</h3>
        <div style="display:flex;gap:10px;">
          <input type="text" id="friend-search-input" placeholder="Cerca per username..." style="
            flex:1;padding:10px 14px;border-radius:10px;
            border:1px solid var(--border);background:var(--bg-tertiary);
            color:var(--text-primary);outline:none;font-size:0.95rem;
          ">
          <button class="btn-primary" id="btn-friend-search" style="padding:10px 20px;border-radius:10px;">
            <span class="material-icons-round" style="font-size:20px;">search</span>
          </button>
        </div>
        <div id="friend-search-results" style="margin-top:12px;"></div>
      </div>

      ${this.pendingRequests.length > 0 ? `
      <div class="profile-card">
        <h3><span class="material-icons-round">notifications</span> Richieste (${this.pendingRequests.length})</h3>
        <div class="friends-list">
          ${this.pendingRequests.map(r => `
            <div class="friend-item">
              <div class="friend-avatar">${r.avatar_url ? `<img src="${r.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : r.username.charAt(0).toUpperCase()}</div>
              <div class="friend-name">${r.username}</div>
              <div class="friend-actions">
                <button class="btn-accept-friend" data-id="${r.friendshipId}" style="background:#00b894;color:#fff;border:none;padding:6px 14px;border-radius:8px;cursor:pointer;font-size:0.85rem;">Accetta</button>
                <button class="btn-reject-friend" data-id="${r.friendshipId}" style="background:#e17055;color:#fff;border:none;padding:6px 14px;border-radius:8px;cursor:pointer;font-size:0.85rem;">Rifiuta</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <div class="profile-card">
        <h3><span class="material-icons-round">group</span> I Tuoi Amici (${this.friends.length})</h3>
        ${this.friends.length > 0 ? `
        <div class="friends-grid">
          ${this.friends.map(f => {
            const isOnline = f.status === 'listening' || f.status === 'online';
            const playing = f.currently_playing;
            return `
              <div class="friend-card">
                <div class="friend-card-avatar">
                  ${f.avatar_url ? `<img src="${f.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : `<span style="font-size:24px;font-weight:700;">${f.username.charAt(0).toUpperCase()}</span>`}
                  <div class="friend-status-dot ${isOnline ? 'online' : 'offline'}"></div>
                </div>
                <div class="friend-card-name">${f.username}</div>
                ${playing ? `<div class="friend-card-playing"><span class="material-icons-round" style="font-size:14px;">music_note</span> ${playing.title}</div>` : `<div class="friend-card-playing" style="opacity:0.4;">Offline</div>`}
                <button class="btn-remove-friend" data-id="${f.friendshipId}" style="margin-top:8px;background:transparent;border:1px solid var(--border);color:var(--text-tertiary);padding:4px 12px;border-radius:6px;cursor:pointer;font-size:0.75rem;">Rimuovi</button>
              </div>
            `;
          }).join('')}
        </div>` : `
        <div style="text-align:center;padding:30px;color:var(--text-tertiary);">
          <span class="material-icons-round" style="font-size:48px;display:block;margin-bottom:12px;">group_off</span>
          Nessun amico ancora. Cerca un utente qui sopra!
        </div>`}
      </div>
    `;

    // Bind events
    document.getElementById('btn-friend-search')?.addEventListener('click', () => this.handleFriendSearch());
    document.getElementById('friend-search-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleFriendSearch();
    });

    document.querySelectorAll('.btn-accept-friend').forEach(btn => {
      btn.addEventListener('click', async () => {
        await this.acceptFriendRequest(btn.dataset.id);
        this.app.showToast('Richiesta accettata!');
        this.renderFriendsTab(container);
      });
    });

    document.querySelectorAll('.btn-reject-friend').forEach(btn => {
      btn.addEventListener('click', async () => {
        await this.rejectFriendRequest(btn.dataset.id);
        this.renderFriendsTab(container);
      });
    });

    document.querySelectorAll('.btn-remove-friend').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Vuoi rimuovere questo amico?')) {
          await this.removeFriend(btn.dataset.id);
          this.app.showToast('Amico rimosso');
          this.renderFriendsTab(container);
        }
      });
    });
  }

  async handleFriendSearch() {
    const input = document.getElementById('friend-search-input');
    const results = document.getElementById('friend-search-results');
    if (!input || !results) return;

    const query = input.value.trim();
    if (query.length < 2) {
      results.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;">Inserisci almeno 2 caratteri</p>';
      return;
    }

    results.innerHTML = '<div class="spinner-small"></div>';
    const users = await this.searchUsers(query);

    if (users.length === 0) {
      results.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;">Nessun utente trovato</p>';
      return;
    }

    results.innerHTML = users.map(u => `
      <div class="friend-item" style="margin-bottom:8px;">
        <div class="friend-avatar">${u.avatar_url ? `<img src="${u.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : u.username.charAt(0).toUpperCase()}</div>
        <div class="friend-name">${u.username} ${u.is_private ? '🔒' : ''}</div>
        <button class="btn-add-friend btn-primary" data-id="${u.id}" style="padding:6px 16px;border-radius:8px;font-size:0.85rem;">
          <span class="material-icons-round" style="font-size:16px;vertical-align:middle;">person_add</span> Aggiungi
        </button>
      </div>
    `).join('');

    results.querySelectorAll('.btn-add-friend').forEach(btn => {
      btn.addEventListener('click', async () => {
        const { error } = await this.sendFriendRequest(btn.dataset.id);
        if (error) {
          this.app.showToast('Richiesta già inviata o errore');
        } else {
          btn.textContent = '✓ Inviata';
          btn.disabled = true;
          btn.style.opacity = '0.5';
          this.app.showToast('Richiesta di amicizia inviata!');
        }
      });
    });
  }

  renderSettingsTab(container) {
    container.innerHTML = `
      <div class="profile-info-grid">
        <div class="profile-card">
          <h3><span class="material-icons-round">lock</span> Sicurezza</h3>
          <button class="btn-secondary" id="btn-change-password" style="width:100%;padding:12px;border-radius:10px;margin-bottom:12px;">
            <span class="material-icons-round" style="font-size:18px;vertical-align:middle;">vpn_key</span> Cambia Password
          </button>
          <div id="change-password-form" style="display:none;margin-top:12px;">
            <input type="password" id="new-password" placeholder="Nuova password (min. 6 caratteri)" style="
              width:100%;padding:10px 14px;border-radius:8px;margin-bottom:10px;
              border:1px solid var(--border);background:var(--bg-tertiary);
              color:var(--text-primary);outline:none;box-sizing:border-box;
            ">
            <button class="btn-primary" id="btn-save-password" style="width:100%;padding:10px;border-radius:8px;">Salva Password</button>
          </div>
        </div>

        <div class="profile-card">
          <h3><span class="material-icons-round">visibility</span> Privacy</h3>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;">
            <div>
              <div style="font-weight:600;color:var(--text-primary);">Profilo Privato</div>
              <div style="font-size:0.8rem;color:var(--text-tertiary);">Solo i tuoi amici possono vederti</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggle-private" ${this.profile?.is_private ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="profile-card" style="border-color:var(--error, #ff4d4d);">
          <h3 style="color:var(--error, #ff4d4d);"><span class="material-icons-round">warning</span> Zona Pericolosa</h3>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:16px;">
            L'eliminazione dell'account è irreversibile. Tutti i tuoi dati verranno cancellati.
          </p>
          <button class="btn-danger" id="btn-delete-account" style="
            width:100%;padding:12px;border-radius:10px;
            background:var(--error, #ff4d4d);color:#fff;border:none;
            cursor:pointer;font-weight:600;font-size:0.95rem;
          ">Elimina Account</button>
        </div>
      </div>
    `;

    // Change password
    document.getElementById('btn-change-password')?.addEventListener('click', () => {
      document.getElementById('change-password-form').style.display = 'block';
    });

    document.getElementById('btn-save-password')?.addEventListener('click', async () => {
      const newPw = document.getElementById('new-password').value;
      if (newPw.length < 6) { this.app.showToast('La password deve avere almeno 6 caratteri'); return; }
      const { error } = await this.db.auth.updateUser({ password: newPw });
      if (error) this.app.showToast('Errore: ' + error.message);
      else {
        this.app.showToast('Password aggiornata con successo!');
        document.getElementById('change-password-form').style.display = 'none';
      }
    });

    // Privacy toggle
    document.getElementById('toggle-private')?.addEventListener('change', async (e) => {
      await this.updateProfile({ is_private: e.target.checked });
      this.app.showToast(e.target.checked ? 'Profilo impostato come privato' : 'Profilo impostato come pubblico');
    });

    // Delete account
    document.getElementById('btn-delete-account')?.addEventListener('click', async () => {
      const confirm1 = confirm('Sei sicuro di voler eliminare il tuo account? Questa azione è IRREVERSIBILE.');
      if (!confirm1) return;
      const confirm2 = confirm('ULTIMA CONFERMA: Tutti i tuoi dati, playlist, amicizie e statistiche verranno cancellati per sempre. Procedere?');
      if (!confirm2) return;

      // Delete user data
      await this.db.from('listening_history').delete().eq('user_id', this.user.id);
      await this.db.from('friendships').delete().or(`requester_id.eq.${this.user.id},addressee_id.eq.${this.user.id}`);
      await this.db.from('user_favorites').delete().eq('user_id', this.user.id);
      await this.db.from('user_playlists').delete().eq('user_id', this.user.id);
      await this.db.from('users_profiles').delete().eq('id', this.user.id);
      
      localStorage.removeItem('sw_listening_stats');
      await this.db.auth.signOut();
      this.app.showToast('Account eliminato.');
    });
  }
}
