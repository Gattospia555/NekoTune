export class CloudSyncManager {
  static app = null;
  static db = null;
  static intervalId = null;
  static syncInProgress = false;

  static init(appInstance) {
    this.app = appInstance;
    this.db = document.supabase;

    window.addEventListener('auth-state-changed', async (e) => {
      const user = e.detail.user;
      if (user) {
        // User logged in, pull from cloud right away
        await this.pullFromCloud(user.id);
        this.startBackgroundSync(user.id);
      } else {
        // User logged out
        this.stopBackgroundSync();
      }
    });

    // Custom events from components triggering a push
    window.addEventListener('trigger-cloud-push', () => {
       if (this.app.authManager?.user) {
         this.pushToCloud(this.app.authManager.user.id);
       }
    });
  }

  static startBackgroundSync(userId) {
    this.stopBackgroundSync();
    // Sync every 5 minutes (300000 ms) automatically
    this.intervalId = setInterval(() => {
      this.pushToCloud(userId);
    }, 300000);
  }

  static stopBackgroundSync() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  static async pullFromCloud(userId) {
    if (!this.db || !userId) return;
    try {
      this.app.showToast("☁️ Sincronizzazione dal Cloud in corso...", false);

      // 1. Pull Profile (Following, Stats, & Settings)
      const { data: profile } = await this.db.from('users_profiles').select('following, total_minutes, settings').eq('id', userId).single();
      if (profile) {
        if (profile.following) {
          localStorage.setItem('sw_following', JSON.stringify(profile.following));
          // Need to update ArtistManager in memory if loaded
          if (window.ArtistManager) window.ArtistManager.following = profile.following;
        }
        if (profile.settings && Object.keys(profile.settings).length > 0) {
          localStorage.setItem('sw_settings', JSON.stringify(profile.settings));
          if (window.SettingsManager) window.SettingsManager.loadSettings();
        }
      }
      
      // 2. Pull Playlists (Simplest mapping, overwriting local by assuming cloud is truth on login)
      const { data: playlists } = await this.db.from('user_playlists').select('*').eq('user_id', userId);
      if (playlists && playlists.length > 0) {
         // Format from DB structure to Local storage structure
         const mappedPlaylists = playlists.map(p => ({
            id: p.id,
            name: p.name,
            desc: p.description,
            color: '#ff6b35', // default
            tracks: p.tracks || []
         }));
         localStorage.setItem('sw_playlists', JSON.stringify(mappedPlaylists));
         if (this.app.playlists) this.app.playlists.loadPlaylists();
      }

      // 3. Pull Favorites
      const { data: favorites } = await this.db.from('user_favorites').select('*').eq('user_id', userId);
      if (favorites && favorites.length > 0) {
        // We restore just the track_metadata object or specific id mapping
        const mappedFavs = favorites.map(f => f.track_metadata || f.track_id);
        localStorage.setItem('sw_favorites', JSON.stringify(mappedFavs));
        if (this.app.playlists) {
            this.app.playlists.favorites = mappedFavs;
            this.app.playlists.saveFavorites(true); // save silent
        }
      }

      this.app.showToast("✅ Sincronizzazione cloud completata!");
    } catch (e) {
      console.error("Cloud Pull Error", e);
      this.app.showToast("⚠️ Si è verificato un errore durante la sincronia cloud.", true);
    }
  }

  static async pushToCloud(userId) {
    if (!this.db || !userId || this.syncInProgress) return;
    this.syncInProgress = true;
    
    try {
      const dbFollowing = JSON.parse(localStorage.getItem('sw_following') || '[]');
      const dbPlaylists = JSON.parse(localStorage.getItem('sw_playlists') || '[]');
      const dbFavorites = JSON.parse(localStorage.getItem('sw_favorites') || '[]');
      const localStats = JSON.parse(localStorage.getItem('sw_listening_stats') || '{}');
      const localSettings = JSON.parse(localStorage.getItem('sw_settings') || '{}');
      const totalMinutes = localStats.totalMinutes || 0;
      
      // Update following array, stats, and settings on profile
      await this.db.from('users_profiles').update({ 
          following: dbFollowing,
          total_minutes: Math.round(totalMinutes),
          settings: localSettings
      }).eq('id', userId);

      // We implement a lazy push for playlists: Delete all and re-insert (Or upsert)
      // Upsert requires ID matching. Let's ensure the IDs we pass match uuid.
      // If local playlists don't use UUID, we'd need a translation layer. For now, assuming upsert format.
      // Better yet, just clear and re-insert to ensure exact synchronization without orphaned tracks right now.
      
      await this.db.from('user_playlists').delete().eq('user_id', userId);
      if (dbPlaylists.length > 0) {
        const inserts = dbPlaylists.map(p => ({
          // id: is skipped so uuid gets generated, but we lose local ID binding. 
          // For a true sync, local ID should be uuid. For now, assuming name+user_id matching or insert.
          user_id: userId,
          name: p.name,
          description: p.desc || '',
          tracks: p.tracks
        }));
        await this.db.from('user_playlists').insert(inserts);
      }

      // Sync Favorites
      await this.db.from('user_favorites').delete().eq('user_id', userId);
      if (dbFavorites.length > 0) {
         const insertsFav = dbFavorites.map(f => {
            if (typeof f === 'string') {
               return { user_id: userId, track_id: f, track_metadata: { id: f } };
            } else {
               return { user_id: userId, track_id: f.id, track_metadata: f };
            }
         });
         // Chunk inserts if too large, but usually fine for < 1000
         await this.db.from('user_favorites').insert(insertsFav);
      }
      
    } catch (e) {
      console.error("Cloud Push Error", e);
    } finally {
      this.syncInProgress = false;
    }
  }
}
