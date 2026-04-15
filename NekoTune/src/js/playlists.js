// Nekotune — Playlist Management
import { DEMO_TRACKS, DEFAULT_PLAYLISTS, generateId, generateCoverGradient, resolveTracks, resolveTrack } from './data.js';
import { storage } from './storage.js';
import realtimeManager from './socket.js';

class PlaylistManager {
  constructor(player, app) {
    this.player = player;
    this.app = app;
    this.playlists = this.loadPlaylists();
    this.favorites = JSON.parse(localStorage.getItem('sw_favorites') || '[]');
    this.recentlyPlayed = JSON.parse(localStorage.getItem('sw_recent') || '[]');
    this.currentPlaylistId = null;
    this.isFavManageMode = false;
    
    // Collaborative Playlists — Join channels for all collaborative playlists
    this.playlists.filter(p => p.isCollaborative && p.shareCode).forEach(p => {
      this._joinCollabChannel(p.shareCode);
    });
    this.initEvents();
    this.renderSidebarPlaylists();
  }

  _joinCollabChannel(code) {
    realtimeManager.joinChannel('collab_' + code, {
      broadcastEvents: ['collab_sync_playlist', 'collab_request_playlist'],
      onBroadcast: (event, payload) => {
        if (event === 'collab_sync_playlist') {
          this.handleCollabMessage({ type: 'SYNC_PLAYLIST', ...payload });
        } else if (event === 'collab_request_playlist') {
          this.handleCollabMessage({ type: 'REQUEST_PLAYLIST', ...payload });
        }
      }
    });
  }

  loadPlaylists() {
    const saved = localStorage.getItem('sw_playlists');
    if (saved) return JSON.parse(saved);
    // Initialize with defaults
    localStorage.setItem('sw_playlists', JSON.stringify(DEFAULT_PLAYLISTS));
    return [...DEFAULT_PLAYLISTS];
  }

  savePlaylists() {
    localStorage.setItem('sw_playlists', JSON.stringify(this.playlists));
  }

  saveFavorites() {
    localStorage.setItem('sw_favorites', JSON.stringify(this.favorites));
  }

  updateFavRemoveButton() {
    const selectedCount = document.querySelectorAll('#favorites-list .track-item .track-checkbox:checked').length;
    const btn = document.getElementById('btn-fav-remove-selected');
    if (btn) {
      btn.textContent = `Rimuovi (${selectedCount})`;
      btn.disabled = selectedCount === 0;
    }
  }

  saveRecent() {
    localStorage.setItem('sw_recent', JSON.stringify(this.recentlyPlayed));
  }

  initEvents() {
    // Create playlist button & modal
    document.getElementById('btn-create-playlist').addEventListener('click', () => {
      this.showCreatePlaylistModal();
    });

    document.getElementById('btn-confirm-create-playlist').addEventListener('click', () => {
      this.createPlaylist();
    });

    // Close modal buttons
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('create-playlist-modal').classList.add('hidden');
        document.getElementById('join-playlist-modal').classList.add('hidden');
      });
    });

    // Join collab playlist UI
    const btnJoinUI = document.getElementById('btn-join-collab-playlist');
    if (btnJoinUI) {
      btnJoinUI.addEventListener('click', () => {
        document.getElementById('join-playlist-code').value = '';
        document.getElementById('join-playlist-modal').classList.remove('hidden');
      });
    }

    const btnConfirmJoin = document.getElementById('btn-confirm-join-playlist');
    if (btnConfirmJoin) {
      btnConfirmJoin.addEventListener('click', () => {
        const code = document.getElementById('join-playlist-code').value.trim().toUpperCase();
        if (code) {
          this.joinCollaborativePlaylist(code);
          document.getElementById('join-playlist-modal').classList.add('hidden');
        }
      });
    }

    // Favorite current track
    document.getElementById('btn-favorite-current').addEventListener('click', () => {
      if (this.player.currentTrack) {
        this.toggleFavorite(this.player.currentTrack);
      }
    });

    // Bulk favorites management
    document.getElementById('btn-manage-favorites')?.addEventListener('click', () => {
      this.isFavManageMode = true;
      document.getElementById('btn-manage-favorites').style.display = 'none';
      document.getElementById('favorites-bulk-actions').classList.remove('hidden');
      document.getElementById('btn-fav-select-all').style.display = 'inline-block';
      document.getElementById('btn-fav-deselect-all').style.display = 'none';
      this.showFavorites();
    });

    document.getElementById('btn-fav-cancel-manage')?.addEventListener('click', () => {
      this.isFavManageMode = false;
      document.getElementById('btn-manage-favorites').style.display = 'flex';
      document.getElementById('favorites-bulk-actions').classList.add('hidden');
      this.showFavorites();
    });

    document.getElementById('btn-fav-select-all')?.addEventListener('click', () => {
      document.querySelectorAll('#favorites-list .track-item .track-checkbox').forEach(cb => {
        cb.checked = true;
      });
      document.getElementById('btn-fav-select-all').style.display = 'none';
      document.getElementById('btn-fav-deselect-all').style.display = 'inline-block';
      this.updateFavRemoveButton();
    });

    document.getElementById('btn-fav-deselect-all')?.addEventListener('click', () => {
      document.querySelectorAll('#favorites-list .track-item .track-checkbox').forEach(cb => {
        cb.checked = false;
      });
      document.getElementById('btn-fav-select-all').style.display = 'inline-block';
      document.getElementById('btn-fav-deselect-all').style.display = 'none';
      this.updateFavRemoveButton();
    });

    document.getElementById('btn-fav-remove-selected')?.addEventListener('click', () => {
      const selected = Array.from(document.querySelectorAll('#favorites-list .track-item .track-checkbox:checked'));
      if (selected.length === 0) return;
      
      const idsToRemove = selected.map(cb => cb.dataset.trackId);
      this.favorites = this.favorites.filter(t => !idsToRemove.includes(typeof t === 'string' ? t : t.id));
      this.saveFavorites();
      
      document.getElementById('favorites-count').textContent =
        `${this.favorites.length} bran${this.favorites.length !== 1 ? 'i' : 'o'}`;
      
      this.isFavManageMode = false;
      document.getElementById('btn-manage-favorites').style.display = 'flex';
      document.getElementById('favorites-bulk-actions').classList.add('hidden');
      
      this.showFavorites();
      this.player.updateFavoriteButton();
    });

    // Playlist detail actions
    document.getElementById('btn-play-playlist').addEventListener('click', () => {
      this.playCurrentPlaylist();
    });

    document.getElementById('btn-shuffle-playlist').addEventListener('click', () => {
      this.shuffleCurrentPlaylist();
    });

    document.getElementById('btn-edit-playlist').addEventListener('click', () => {
      this.editCurrentPlaylist();
    });

    document.getElementById('btn-delete-playlist').addEventListener('click', () => {
      this.deleteCurrentPlaylist();
    });

    // Track recently played
    this.player.onTrackChange = (track) => {
      this.addToRecent(track);
      this.player.updateFavoriteButton();
      // Notify app for lyrics update etc.
      if (this.app.onTrackChange) this.app.onTrackChange(track);
    };
  }

  showCreatePlaylistModal() {
    const modal = document.getElementById('create-playlist-modal');
    document.getElementById('new-playlist-name').value = '';
    document.getElementById('new-playlist-desc').value = '';
    modal.classList.remove('hidden');
    document.getElementById('new-playlist-name').focus();
  }

  createPlaylist(name, desc) {
    const inputName = name || document.getElementById('new-playlist-name').value.trim();
    const inputDesc = desc || document.getElementById('new-playlist-desc').value.trim();

    if (!inputName) {
      document.getElementById('new-playlist-name').focus();
      return null;
    }

    const isCollab = document.getElementById('new-playlist-collab')?.checked;

    const colors = ['#6c5ce7', '#00b894', '#e17055', '#fdcb6e', '#74b9ff', '#a29bfe', '#ff7675', '#55efc4'];
    const playlist = {
      id: generateId(),
      name: inputName,
      description: inputDesc,
      tracks: [],
      color: colors[Math.floor(Math.random() * colors.length)],
      isCollaborative: !!isCollab,
      shareCode: isCollab ? Math.random().toString(36).substring(2, 8).toUpperCase() : null
    };

    if (playlist.isCollaborative) {
      this.app.showToast(`Playlist collaborativa creata! Codice: ${playlist.shareCode}`);
      this._joinCollabChannel(playlist.shareCode);
      this.broadcastPlaylist(playlist);
    } else {
      this.app.showToast(`Playlist "${inputName}" creata!`);
    }

    this.playlists.push(playlist);
    this.savePlaylists();
    this.renderSidebarPlaylists();

    document.getElementById('create-playlist-modal').classList.add('hidden');
    return playlist;
  }
  handleCollabMessage(data) {
    if (data.type === 'SYNC_PLAYLIST') {
      const pData = data.playlist;
      const idx = this.playlists.findIndex(p => p.shareCode === pData.shareCode);
      if (idx !== -1) {
        // Merge or overwrite (simple overwrite for now)
        this.playlists[idx].tracks = pData.tracks;
        this.playlists[idx].name = pData.name;
        this.playlists[idx].description = pData.description;
        this.savePlaylists();
        if (this.currentPlaylistId === this.playlists[idx].id) {
          this.showPlaylistDetail(this.playlists[idx].id);
        }
        this.app.showToast(`La playlist "${pData.name}" è stata aggiornata da remoto.`);
      } else {
        // We received a playlist we requested
        this.playlists.push(pData);
        this.savePlaylists();
        this.renderSidebarPlaylists();
        this.app.showToast(`Unito alla playlist collaborativa "${pData.name}"!`);
      }
    } else if (data.type === 'REQUEST_PLAYLIST') {
      const p = this.playlists.find(pl => pl.shareCode === data.shareCode);
      if (p) {
        this.broadcastPlaylist(p);
      }
    }
  }

  joinCollaborativePlaylist(code) {
    if (this.playlists.some(p => p.shareCode === code)) {
      this.app.showToast('Possiedi già questa playlist!');
      return;
    }
    
    // Join the channel
    this._joinCollabChannel(code);
    
    // Delay request slightly to ensure we joined the room
    setTimeout(() => {
      realtimeManager.broadcast('collab_' + code, 'collab_request_playlist', {
        shareCode: code
      });
      this.app.showToast('Attesa del creatore della playlist...');
    }, 500);
  }

  broadcastPlaylist(playlist) {
    if (playlist.isCollaborative && playlist.shareCode) {
      realtimeManager.broadcast('collab_' + playlist.shareCode, 'collab_sync_playlist', {
        playlist: playlist
      });
    }
  }

  deleteCurrentPlaylist() {
    if (!this.currentPlaylistId) return;
    const playlist = this.playlists.find(p => p.id === this.currentPlaylistId);
    if (!playlist) return;

    this.app.showConfirm(
      'Elimina Playlist',
      `Vuoi davvero eliminare la playlist "${playlist.name}"? Questa azione è irreversibile.`,
      'Elimina',
      true,
      () => {
        this.playlists = this.playlists.filter(p => p.id !== this.currentPlaylistId);
        this.savePlaylists();
        this.renderSidebarPlaylists();
        this.app.navigateTo('home');
        this.app.showToast('Playlist eliminata');
      }
    );
  }

  editCurrentPlaylist() {
    const nameEl = document.getElementById('playlist-detail-name');
    const descEl = document.getElementById('playlist-detail-desc');
    const isEditing = nameEl.contentEditable === 'true';

    if (isEditing) {
      // Save
      const playlist = this.playlists.find(p => p.id === this.currentPlaylistId);
      if (playlist) {
        playlist.name = nameEl.textContent.trim();
        playlist.description = descEl.textContent.trim();
        this.savePlaylists();
        this.renderSidebarPlaylists();
        this.app.showToast('Playlist aggiornata');
      }
      nameEl.contentEditable = 'false';
      descEl.contentEditable = 'false';
      document.getElementById('btn-edit-playlist').querySelector('.material-icons-round').textContent = 'edit';
    } else {
      nameEl.contentEditable = 'true';
      descEl.contentEditable = 'true';
      nameEl.focus();
      document.getElementById('btn-edit-playlist').querySelector('.material-icons-round').textContent = 'check';
    }
  }

  playCurrentPlaylist(startIndex = 0) {
    const playlist = this.playlists.find(p => p.id === this.currentPlaylistId);
    if (!playlist || playlist.tracks.length === 0) return;

    const tracks = resolveTracks(playlist.tracks);
    this.player.playTrackList(tracks, startIndex);
  }

  shuffleCurrentPlaylist() {
    const playlist = this.playlists.find(p => p.id === this.currentPlaylistId);
    if (!playlist || playlist.tracks.length === 0) return;

    const tracks = resolveTracks(playlist.tracks);
    // Shuffle
    for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }
    this.player.playTrackList(tracks, 0);
  }

  addTrackToPlaylist(playlistId, trackId) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    if (!playlist.tracks.includes(trackId)) {
      playlist.tracks.push(trackId);
      this.savePlaylists();
      this.app.showToast(`Aggiunto a "${playlist.name}"`);
      if (this.currentPlaylistId === playlistId) {
        this.showPlaylistDetail(playlistId);
      }
      this.broadcastPlaylist(playlist);
    }
  }

  removeTrackFromPlaylist(playlistId, trackId) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    playlist.tracks = playlist.tracks.filter(id => id !== trackId);
    this.savePlaylists();
    if (this.currentPlaylistId === playlistId) {
      this.showPlaylistDetail(playlistId);
    }
    this.broadcastPlaylist(playlist);
  }

  toggleFavorite(track) {
    if (!track || !track.id) return;
    const idx = this.favorites.findIndex(t => (typeof t === 'string' ? t : t.id) === track.id);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      this.app.showToast('Rimosso dai preferiti');
    } else {
      this.favorites.push(track);
      this.app.showToast('Aggiunto ai preferiti ❤️');
    }
    this.saveFavorites();
    this.player.updateFavoriteButton();
  }

  addToRecent(track) {
    if (!track || !track.id) return;
    this.recentlyPlayed = this.recentlyPlayed.filter(t => (typeof t === 'string' ? t : t.id) !== track.id);
    this.recentlyPlayed.unshift(track);
    if (this.recentlyPlayed.length > 50) this.recentlyPlayed.pop();
    this.saveRecent();
  }

  renderSidebarPlaylists() {
    const container = document.getElementById('playlist-list');
    container.innerHTML = '';

    this.playlists.forEach(playlist => {
      const item = document.createElement('div');
      item.className = `playlist-list-item${this.currentPlaylistId === playlist.id ? ' active' : ''}`;
      item.dataset.playlistId = playlist.id;
      item.innerHTML = `
        <span class="material-icons-round">queue_music</span>
        <span>${playlist.name}</span>
      `;
      item.addEventListener('click', () => {
        this.showPlaylistDetail(playlist.id);
      });
      container.appendChild(item);
    });
  }

  showPlaylistDetail(playlistId) {
    this.currentPlaylistId = playlistId;
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    this.app.navigateTo('playlist-detail');
    this.renderSidebarPlaylists();

    // Update banner
    const banner = document.getElementById('playlist-detail-banner');
    banner.querySelector('.playlist-header-gradient').style.background =
      `linear-gradient(135deg, ${playlist.color} 0%, transparent 70%)`;

    const cover = document.getElementById('playlist-detail-cover');
    const coverImg = generateCoverGradient(playlist.color);
    cover.innerHTML = `<img src="${coverImg}" alt="${playlist.name}" />`;

    document.getElementById('playlist-detail-name').textContent = playlist.name;
    document.getElementById('playlist-detail-name').contentEditable = 'false';
    document.getElementById('playlist-detail-desc').textContent = playlist.description || '';
    document.getElementById('playlist-detail-desc').contentEditable = 'false';
    document.getElementById('btn-edit-playlist').querySelector('.material-icons-round').textContent = 'edit';

    const tracks = resolveTracks(playlist.tracks);
    let metaText = `${tracks.length} bran${tracks.length !== 1 ? 'i' : 'o'}`;
    if (playlist.isCollaborative && playlist.shareCode) {
      metaText += ` &nbsp;&bull;&nbsp; <span class="collab-badge" style="color: var(--accent); cursor: pointer;" onclick="navigator.clipboard.writeText('${playlist.shareCode}').then(()=>alert('Codice copiato!'))">Codice Collab: ${playlist.shareCode} 📋</span>`;
    }
    document.getElementById('playlist-detail-meta').innerHTML = metaText;

    this.renderTrackList('playlist-detail-tracks', tracks, {
      showActions: true,
      playlistId: playlistId,
      onPlay: (index) => {
        this.player.playTrackList(tracks, index);
      }
    });
  }

  showFavorites() {
    const tracks = this.favorites
      .map(t => typeof t === 'string' ? resolveTrack(t) : t)
      .filter(Boolean);

    document.getElementById('favorites-count').textContent =
      `${tracks.length} bran${tracks.length !== 1 ? 'i' : 'o'}`;

    this.renderTrackList('favorites-list', tracks, {
      showActions: !this.isFavManageMode,
      selectable: this.isFavManageMode,
      onPlay: (index) => {
        if (!this.isFavManageMode) this.player.playTrackList(tracks, index);
      }
    });
  }

  showRecent() {
    const tracks = this.recentlyPlayed
      .map(t => typeof t === 'string' ? resolveTrack(t) : t)
      .filter(Boolean);

    this.renderTrackList('recent-list', tracks, {
      showActions: true,
      onPlay: (index) => {
        this.player.playTrackList(tracks, index);
      }
    });
  }

  renderTrackList(containerId, tracks, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    if (tracks.length === 0) {
      container.innerHTML = `
        <div class="search-empty" style="padding: 40px;">
          <span class="material-icons-round">music_off</span>
          <p>Nessun brano</p>
        </div>
      `;
      return;
    }

    // Header
    const header = document.createElement('div');
    header.className = 'track-list-header';
    header.innerHTML = `
      ${options.selectable ? '<span style="width: 32px"></span>' : '<span>#</span>'}
      <span>Titolo</span>
      <span>Album</span>
      <span>Durata</span>
      <span></span>
    `;
    container.appendChild(header);

    tracks.forEach((track, index) => {
      const isActive = this.player.currentTrack?.id === track.id;
      const isPlaying = isActive && this.player.isPlaying;

      const item = document.createElement('div');
      item.className = `track-item${isActive ? ' active' : ''}${isPlaying ? ' playing' : ''}`;
      item.draggable = options.playlistId ? true : false;
      item.dataset.trackId = track.id;
      item.dataset.index = index;

      const isFav = this.isFavorite(track.id);
      const cover = this.player.getTrackCover(track);

      item.innerHTML = `
        ${options.selectable ? `
        <div style="display: flex; align-items: center; justify-content: center; width: 32px; padding: 0 8px;">
          <input type="checkbox" class="track-checkbox" data-track-id="${track.id}" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--accent);">
        </div>
        ` : `
        <div class="track-number-wrapper">
          <span class="number">${index + 1}</span>
          <span class="material-icons-round action-icon play-icon">play_arrow</span>
          <span class="material-icons-round action-icon pause-icon">pause</span>
          <div class="playing-indicator"><span></span><span></span><span></span><span></span></div>
        </div>
        `}
        <div class="track-info">
          <div class="track-cover-small">
            <img src="${cover}" alt="${track.title}" />
          </div>
          <div class="track-text">
            <div class="track-title">${track.title}</div>
            <div class="track-artist-name">${track.artist}</div>
          </div>
        </div>
        <div class="track-album-name">${track.album}</div>
        <div class="track-duration">${formatDuration(track.duration)}</div>
        <div class="track-actions">
          <button class="btn-icon btn-download" data-track-id="${track.id}" title="Scarica offline">
            <span class="material-icons-round">download</span>
          </button>
          <button class="btn-icon btn-favorite ${isFav ? 'is-favorite' : ''}" data-track-id="${track.id}">
            <span class="material-icons-round">${isFav ? 'favorite' : 'favorite_border'}</span>
          </button>
          ${options.playlistId ? `
            <button class="btn-icon btn-remove-track" data-track-id="${track.id}" data-playlist-id="${options.playlistId}">
              <span class="material-icons-round">close</span>
            </button>
          ` : `
            <button class="btn-icon btn-add-to-queue" data-track-id="${track.id}">
              <span class="material-icons-round">playlist_add</span>
            </button>
          `}
        </div>
      `;

      // Single click to play (like mobile apps) and select
      item.addEventListener('click', (e) => {
        if (e.target.closest('.btn-icon')) return;
        
        if (options.selectable) {
          const cb = item.querySelector('.track-checkbox');
          if (cb && e.target !== cb) cb.checked = !cb.checked;
          if (this.updateFavRemoveButton && containerId === 'favorites-list') {
            this.updateFavRemoveButton();
            // Automatically switch back to "Select All" if not everything is checked
            const allChecked = document.querySelectorAll('#favorites-list .track-item .track-checkbox:not(:checked)').length === 0;
            if (allChecked) {
              document.getElementById('btn-fav-select-all').style.display = 'none';
              document.getElementById('btn-fav-deselect-all').style.display = 'inline-block';
            } else {
              document.getElementById('btn-fav-select-all').style.display = 'inline-block';
              document.getElementById('btn-fav-deselect-all').style.display = 'none';
            }
          }
          return;
        }
        
        // Visual selection
        container.querySelectorAll('.track-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        
        // Start playback immediately on single click
        if (options.onPlay) options.onPlay(index);
      });

      // Favorite button
      const favBtn = item.querySelector('.btn-favorite');
      if (favBtn) {
        favBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleFavorite(track);
          const icon = favBtn.querySelector('.material-icons-round');
          const nowFav = this.isFavorite(track.id);
          favBtn.classList.toggle('is-favorite', nowFav);
          icon.textContent = nowFav ? 'favorite' : 'favorite_border';
        });
      }

      // Download button
      const dlBtn = item.querySelector('.btn-download');
      if (dlBtn) {
        storage.hasTrack(track.id).then(has => {
          if (has) {
            dlBtn.classList.add('downloaded');
            dlBtn.querySelector('.material-icons-round').textContent = 'offline_pin';
          }
        });

        dlBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const isDownloaded = dlBtn.classList.contains('downloaded');
          const icon = dlBtn.querySelector('.material-icons-round');

          if (isDownloaded) {
            await storage.deleteTrack(track.id);
            dlBtn.classList.remove('downloaded');
            icon.textContent = 'download';
            this.app.showToast('Rimosso dai download');
          } else {
            icon.textContent = 'sync';
            dlBtn.classList.add('spinning-fast');
            try {
              let downloadUrl = track.src;
              if (track.isYoutube && window.electronAPI && window.electronAPI.getStreamUrl) {
                downloadUrl = await window.electronAPI.getStreamUrl(track.videoId);
                if (!downloadUrl) throw new Error("Link streaming YouTube non elaborabile.");
              }
              const res = await fetch(downloadUrl);
              const blob = await res.blob();
              await storage.saveTrack(track, blob);
              dlBtn.classList.remove('spinning-fast');
              dlBtn.classList.add('downloaded');
              icon.textContent = 'offline_pin';
              this.app.showToast('Brano scaricato offline');
            } catch (err) {
              console.error(err);
              dlBtn.classList.remove('spinning-fast');
              icon.textContent = 'error';
              this.app.showToast('Errore nel download');
            }
          }
        });
      }

      // Remove from playlist
      const removeBtn = item.querySelector('.btn-remove-track');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeTrackFromPlaylist(options.playlistId, track.id);
          this.app.showToast('Brano rimosso dalla playlist');
        });
      }

      // Add to queue
      const queueBtn = item.querySelector('.btn-add-to-queue');
      if (queueBtn) {
        queueBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.player.addToQueue(track);
          this.app.showToast('Aggiunto alla coda');
        });
      }

      // Drag & drop for playlist reordering
      if (options.playlistId) {
        item.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', index.toString());
          item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
          item.classList.remove('dragging');
          container.querySelectorAll('.track-item').forEach(i => i.classList.remove('drag-over'));
        });

        item.addEventListener('dragover', (e) => {
          e.preventDefault();
          item.classList.add('drag-over');
        });

        item.addEventListener('dragleave', () => {
          item.classList.remove('drag-over');
        });

        item.addEventListener('drop', (e) => {
          e.preventDefault();
          item.classList.remove('drag-over');
          const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
          const toIndex = index;
          this.reorderPlaylistTrack(options.playlistId, fromIndex, toIndex);
        });
      }

      container.appendChild(item);
    });
  }

  reorderPlaylistTrack(playlistId, fromIndex, toIndex) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    const [moved] = playlist.tracks.splice(fromIndex, 1);
    playlist.tracks.splice(toIndex, 0, moved);
    this.savePlaylists();
    this.showPlaylistDetail(playlistId);
  }

  getPlaylists() {
    return this.playlists;
  }

  isFavorite(trackId) {
    return this.favorites.some(t => (typeof t === 'string' ? t : t.id) === trackId);
  }
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default PlaylistManager;

