// Nekotune — Import Playlists (Spotify & YouTube)
import { DEMO_TRACKS, generateId, saveImportedTracks } from './data.js';

class ImportManager {
  constructor(app, playlistManager) {
    this.app = app;
    this.playlistManager = playlistManager;
    this.importedTracks = [];

    this.initEvents();
  }

  initEvents() {
    document.getElementById('btn-import-spotify').addEventListener('click', () => {
      this.importFromSpotify();
    });

    document.getElementById('btn-import-youtube').addEventListener('click', () => {
      this.importFromYoutube();
    });

    document.getElementById('btn-save-imported').addEventListener('click', () => {
      this.saveImportedAsPlaylist();
    });

    document.getElementById('btn-save-imported-favorites').addEventListener('click', () => {
      this.saveImportedAsFavorites();
    });

    // Enter key on inputs
    document.getElementById('spotify-url').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.importFromSpotify();
    });

    document.getElementById('youtube-url').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.importFromYoutube();
    });

    // Spotify OAuth
    const btnAuth = document.getElementById('btn-spotify-auth');
    if (btnAuth) {
      btnAuth.addEventListener('click', () => this.spotifyLogin());
    }
  }

  // ===== SPOTIFY OAUTH (Private Playlists) =====
  async spotifyLogin() {
    if (!window.electronAPI || !window.electronAPI.spotifyAuth) {
      this.app.showToast('Funzione disponibile solo nell\'app desktop.', true);
      return;
    }

    const btn = document.getElementById('btn-spotify-auth');
    btn.disabled = true;
    btn.innerHTML = '<span class="material-icons-round">hourglass_top</span> Accesso in corso...';

    try {
      const token = await window.electronAPI.spotifyAuth();
      this.spotifyToken = token;
      
      btn.innerHTML = '<span class="material-icons-round">check_circle</span> Connesso!';
      btn.style.background = '#1ed760';
      this.app.showToast('✅ Accesso a Spotify riuscito!');

      // Load user playlists
      await this.loadSpotifyPlaylists(token);
    } catch (e) {
      console.error('Spotify auth error:', e);
      btn.disabled = false;
      btn.innerHTML = '<span class="material-icons-round">login</span> Accedi con Spotify';
      this.app.showToast('Accesso a Spotify annullato o fallito.', true);
    }
  }

  async loadSpotifyPlaylists(token) {
    const container = document.getElementById('spotify-private-playlists');
    const list = document.getElementById('spotify-playlists-list');
    container.classList.remove('hidden');
    list.innerHTML = '<p style="color: var(--text-secondary); padding: 8px;">Caricamento playlist...</p>';

    try {
      const playlists = await window.electronAPI.spotifyGetPlaylists(token);

      list.innerHTML = '';

      // Add "Liked Songs" option
      const likedItem = document.createElement('div');
      likedItem.className = 'track-item';
      likedItem.style.cssText = 'cursor:pointer; padding:12px; border-radius:8px; margin-bottom:4px;';
      likedItem.innerHTML = `
        <div class="track-info" style="flex:1;">
          <div class="track-cover-small" style="background: linear-gradient(135deg, #4b2ddb, #b8a9e8);">
            <span class="material-icons-round" style="color: white;">favorite</span>
          </div>
          <div class="track-text">
            <div class="track-title">❤️ Brani Preferiti Spotify</div>
            <div class="track-artist-name">I tuoi brani preferiti</div>
          </div>
        </div>
        <button class="btn-primary" style="font-size:0.8rem; padding:6px 14px;">Importa</button>
      `;
      likedItem.querySelector('.btn-primary').addEventListener('click', (e) => {
        e.stopPropagation();
        this.importSpotifyLikedSongs(token);
      });
      list.appendChild(likedItem);

      // Render each playlist
      playlists.forEach(pl => {
        const item = document.createElement('div');
        item.className = 'track-item';
        item.style.cssText = 'cursor:pointer; padding:12px; border-radius:8px; margin-bottom:4px;';
        
        const coverHtml = pl.cover
          ? `<img src="${pl.cover}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" />`
          : '<span class="material-icons-round">queue_music</span>';

        item.innerHTML = `
          <div class="track-info" style="flex:1;">
            <div class="track-cover-small">${coverHtml}</div>
            <div class="track-text">
              <div class="track-title">${pl.name} ${!pl.isPublic ? '🔒' : ''}</div>
              <div class="track-artist-name">${pl.trackCount} brani · ${pl.owner}</div>
            </div>
          </div>
          <button class="btn-primary" style="font-size:0.8rem; padding:6px 14px;">Importa</button>
        `;
        item.querySelector('.btn-primary').addEventListener('click', (e) => {
          e.stopPropagation();
          this.importSpotifyPlaylist(token, pl.id, pl.name);
        });
        list.appendChild(item);
      });

      if (playlists.length === 0) {
        list.innerHTML += '<p style="color: var(--text-secondary); padding: 8px;">Nessuna playlist trovata.</p>';
      }
    } catch (e) {
      console.error('Failed to load Spotify playlists:', e);
      list.innerHTML = '<p style="color: var(--error); padding: 8px;">Errore nel caricamento delle playlist.</p>';
    }
  }

  async importSpotifyPlaylist(token, playlistId, playlistName) {
    const progress = document.getElementById('import-progress');
    const progressFill = document.getElementById('import-progress-fill');
    const statusText = document.getElementById('import-status-text');
    const results = document.getElementById('import-results');

    progress.classList.remove('hidden');
    results.classList.add('hidden');
    progressFill.style.width = '10%';
    statusText.textContent = `Caricamento "${playlistName}"...`;

    try {
      const spTracks = await window.electronAPI.spotifyGetPlaylistTracks(token, playlistId);
      await this.resolveSpotifyTracksToYoutube(spTracks, playlistName);
    } catch (e) {
      console.error('Import playlist error:', e);
      this.app.showToast('Errore durante l\'importazione della playlist.', true);
      progress.classList.add('hidden');
    }
  }

  async importSpotifyLikedSongs(token) {
    const progress = document.getElementById('import-progress');
    const progressFill = document.getElementById('import-progress-fill');
    const statusText = document.getElementById('import-status-text');
    const results = document.getElementById('import-results');

    progress.classList.remove('hidden');
    results.classList.add('hidden');
    progressFill.style.width = '10%';
    statusText.textContent = 'Caricamento brani preferiti Spotify...';

    try {
      const spTracks = await window.electronAPI.spotifyGetLikedSongs(token);
      await this.resolveSpotifyTracksToYoutube(spTracks, '❤️ Brani Preferiti Spotify');
    } catch (e) {
      console.error('Import liked songs error:', e);
      this.app.showToast('Errore durante l\'importazione dei preferiti.', true);
      progress.classList.add('hidden');
    }
  }

  async resolveSpotifyTracksToYoutube(spTracks, sourceName) {
    const progressFill = document.getElementById('import-progress-fill');
    const statusText = document.getElementById('import-status-text');

    if (!spTracks || spTracks.length === 0) {
      this.app.showToast('Nessun brano trovato.');
      document.getElementById('import-progress').classList.add('hidden');
      return;
    }

    statusText.textContent = `Trovati ${spTracks.length} brani. Ricerca sorgenti audio...`;
    progressFill.style.width = '15%';

    const finalTracks = [];
    let failed = 0;

    for (let i = 0; i < spTracks.length; i++) {
      const sp = spTracks[i];
      progressFill.style.width = `${15 + (i / spTracks.length) * 80}%`;
      statusText.textContent = `[${i + 1}/${spTracks.length}] ${sp.title} — ${sp.artist}`;

      const q = `${sp.title} ${sp.artist}`;
      try {
        const vids = await window.electronAPI.searchYoutube(q, 3);
        if (vids && vids.length > 0) {
          const v = vids[0];
          finalTracks.push({
            id: 'sp_' + v.id + '_' + Date.now() + '_' + i,
            title: sp.title,
            artist: sp.artist,
            album: sp.album || sourceName,
            duration: sp.duration > 0 ? sp.duration : v.duration,
            color: '#1DB954',
            cover: sp.cover || v.cover || '',
            thumbnail: sp.cover || v.cover || '',
            isYoutube: true,
            videoId: v.id,
            src: '',
            imported: true,
            source: 'Spotify'
          });
        } else { failed++; }
      } catch { failed++; }

      if (i > 0 && i % 5 === 0) await this.delay(300);
    }

    progressFill.style.width = '100%';
    statusText.textContent = failed > 0
      ? `Completato! ${finalTracks.length} importati, ${failed} non trovati.`
      : `Completato! ${finalTracks.length} brani importati.`;

    await this.delay(500);
    this.importedTracks = finalTracks;
    this.showImportResults('Spotify');
  }

  // ===== SPOTIFY IMPORT =====
  async importFromSpotify() {
    const url = document.getElementById('spotify-url').value.trim();
    if (!url) {
      this.app.showToast('Inserisci un URL di Spotify');
      return;
    }

    if (!url.includes('spotify.com')) {
      this.app.showToast('URL Spotify non valido');
      return;
    }

    if (!window.electronAPI || !window.electronAPI.parseSpotifyUrl) {
      this.app.showToast('Importazione Spotify disponibile solo nell\'app desktop.', true);
      return;
    }

    const progress = document.getElementById('import-progress');
    const progressFill = document.getElementById('import-progress-fill');
    const statusText = document.getElementById('import-status-text');
    const results = document.getElementById('import-results');

    progress.classList.remove('hidden');
    results.classList.add('hidden');
    progressFill.style.width = '10%';
    statusText.textContent = `Lettura playlist Spotify...`;

    try {
      const spTracks = await window.electronAPI.parseSpotifyUrl(url);
      if (!spTracks || spTracks.length === 0) {
        this.app.showToast('Impossibile estrarre brani da questo link. Controlla che l\'URL sia pubblico.');
        progress.classList.add('hidden');
        return;
      }

      statusText.textContent = `Trovati ${spTracks.length} brani. Analisi sorgenti audio...`;
      progressFill.style.width = '15%';
      
      const finalTracks = [];
      let failed = 0;

      for (let i = 0; i < spTracks.length; i++) {
        const sp = spTracks[i];
        progressFill.style.width = `${15 + (i / spTracks.length) * 80}%`;
        statusText.textContent = `[${i + 1}/${spTracks.length}] Ricerca: ${sp.title} — ${sp.artist}`;
        
        // Search YouTube Music for the matching audio
        const q = `${sp.title} ${sp.artist}`;
        try {
          const vids = await window.electronAPI.searchYoutube(q, 3);
          if (vids && vids.length > 0) {
            const v = vids[0]; // Best match
            finalTracks.push({
              id: 'sp_' + v.id + '_' + Date.now() + '_' + i,
              title: sp.title,
              artist: sp.artist,
              album: sp.album || 'Spotify Import',
              duration: sp.duration > 0 ? sp.duration : v.duration,
              color: '#1DB954',
              cover: sp.cover || v.cover || '',
              thumbnail: sp.cover || v.cover || '',
              isYoutube: true,
              videoId: v.id,
              src: '',
              imported: true,
              source: 'Spotify'
            });
          } else {
            failed++;
          }
        } catch (searchErr) {
          console.warn(`Ricerca fallita per: ${sp.title}`, searchErr);
          failed++;
        }

        // Small delay to avoid rate limiting
        if (i > 0 && i % 5 === 0) {
          await this.delay(300);
        }
      }

      progressFill.style.width = '100%';
      
      if (failed > 0) {
        statusText.textContent = `Importazione completata! ${finalTracks.length} brani trovati, ${failed} non trovati.`;
      } else {
        statusText.textContent = `Importazione completata! ${finalTracks.length} brani importati.`;
      }
      
      await this.delay(500);

      this.importedTracks = finalTracks;
      this.showImportResults('Spotify');
    } catch(e) {
      console.error('Spotify import error:', e);
      this.app.showToast('Errore durante l\'importazione da Spotify. Riprova.');
      progress.classList.add('hidden');
    }
  }

  // ===== YOUTUBE IMPORT =====
  async importFromYoutube() {
    const url = document.getElementById('youtube-url').value.trim();
    if (!url) {
      this.app.showToast('Inserisci un URL di YouTube');
      return;
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      this.app.showToast('URL YouTube non valido');
      return;
    }

    if (!window.electronAPI || !window.electronAPI.searchYoutube) {
      this.app.showToast('Importazione YouTube disponibile solo nell\'app desktop.', true);
      return;
    }

    const progress = document.getElementById('import-progress');
    const progressFill = document.getElementById('import-progress-fill');
    const statusText = document.getElementById('import-status-text');
    const results = document.getElementById('import-results');

    progress.classList.remove('hidden');
    results.classList.add('hidden');
    progressFill.style.width = '10%';
    statusText.textContent = `Analisi URL YouTube...`;

    try {
      // Extract video ID or playlist ID from URL
      const videoId = this.extractYoutubeVideoId(url);
      
      if (videoId) {
        // Single video import
        statusText.textContent = 'Caricamento informazioni video...';
        progressFill.style.width = '40%';
        
        const vids = await window.electronAPI.searchYoutube(videoId, 1);
        if (vids && vids.length > 0) {
          const v = vids[0];
          this.importedTracks = [{
            id: 'yt_' + v.id + '_' + Date.now(),
            title: v.title,
            artist: v.artist || 'YouTube',
            album: 'YouTube Import',
            duration: v.duration || 0,
            color: '#FF0000',
            cover: v.cover || '',
            thumbnail: v.cover || '',
            isYoutube: true,
            videoId: v.id,
            src: '',
            imported: true,
            source: 'YouTube'
          }];

          progressFill.style.width = '100%';
          statusText.textContent = 'Video importato!';
          await this.delay(500);
          this.showImportResults('YouTube');
        } else {
          this.app.showToast('Video non trovato.');
          progress.classList.add('hidden');
        }
      } else {
        // Try treating URL as a search query (playlist or channel)
        statusText.textContent = 'Ricerca contenuti...';
        progressFill.style.width = '30%';
        
        // Use the URL title as a search query
        const vids = await window.electronAPI.searchYoutube(url, 20);
        
        if (vids && vids.length > 0) {
          this.importedTracks = vids.map((v, i) => ({
            id: 'yt_' + v.id + '_' + Date.now() + '_' + i,
            title: v.title,
            artist: v.artist || 'YouTube',
            album: 'YouTube Import',
            duration: v.duration || 0,
            color: '#FF0000',
            cover: v.cover || '',
            thumbnail: v.cover || '',
            isYoutube: true,
            videoId: v.id,
            src: '',
            imported: true,
            source: 'YouTube'
          }));

          progressFill.style.width = '100%';
          statusText.textContent = `${this.importedTracks.length} brani trovati!`;
          await this.delay(500);
          this.showImportResults('YouTube');
        } else {
          this.app.showToast('Nessun risultato trovato.');
          progress.classList.add('hidden');
        }
      }
    } catch (e) {
      console.error('YouTube import error:', e);
      this.app.showToast('Errore durante l\'importazione da YouTube.');
      progress.classList.add('hidden');
    }
  }

  extractYoutubeVideoId(url) {
    const patterns = [
      /(?:v=|\/v\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:embed\/)([a-zA-Z0-9_-]{11})/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  // ===== RESULTS UI =====
  showImportResults(source) {
    const results = document.getElementById('import-results');
    const list = document.getElementById('imported-tracks-list');
    results.classList.remove('hidden');

    list.innerHTML = '';
    this.importedTracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = 'track-item';
      
      const coverHtml = track.cover && track.cover.startsWith('http')
        ? `<img src="${track.cover}" alt="${track.title}" style="width:100%; height:100%; object-fit:cover; border-radius:4px;" />`
        : `<span class="material-icons-round">${source === 'Spotify' ? 'music_note' : 'play_circle'}</span>`;

      item.innerHTML = `
        <div class="track-number-wrapper">
          <span class="number">${index + 1}</span>
        </div>
        <div class="track-info">
          <div class="track-cover-small">
            ${coverHtml}
          </div>
          <div class="track-text">
            <div class="track-title">${track.title}</div>
            <div class="track-artist-name">${track.artist}</div>
          </div>
        </div>
        <div class="track-album-name">${track.album}</div>
        <div class="track-duration">${this.formatDuration(track.duration)}</div>
        <div class="track-actions"></div>
      `;
      
      // Click to preview
      item.addEventListener('click', () => {
        if (this.app.player) {
          this.app.player.playTrackList(this.importedTracks, index);
        }
      });
      item.style.cursor = 'pointer';
      
      list.appendChild(item);
    });
  }

  // ===== SAVE ACTIONS =====
  saveImportedAsPlaylist() {
    if (this.importedTracks.length === 0) return;

    const source = this.importedTracks[0].source;
    const name = `Import ${source} — ${new Date().toLocaleDateString('it-IT')}`;

    // Add imported tracks to the library
    this.importedTracks.forEach(track => {
      if (!DEMO_TRACKS.find(t => t.id === track.id)) {
        DEMO_TRACKS.push(track);
      }
    });
    saveImportedTracks();

    // Create playlist with imported track IDs
    const playlist = this.playlistManager.createPlaylist(name, `Importata da ${source}`);
    if (playlist) {
      this.importedTracks.forEach(track => {
        this.playlistManager.addTrackToPlaylist(playlist.id, track.id);
      });
      this.app.showToast(`🎵 Playlist "${name}" creata con ${this.importedTracks.length} brani!`);

      // Reset
      this.resetImportUI();
    }
  }

  saveImportedAsFavorites() {
    if (this.importedTracks.length === 0) return;

    // Add imported tracks to the library
    this.importedTracks.forEach(track => {
      if (!DEMO_TRACKS.find(t => t.id === track.id)) {
        DEMO_TRACKS.push(track);
      }
    });
    saveImportedTracks();

    // Add each track to favorites (pass the full track object, not just ID)
    this.importedTracks.forEach(track => {
      if (!this.playlistManager.isFavorite(track.id)) {
        this.playlistManager.toggleFavorite(track);
      }
    });

    this.app.showToast(`❤️ ${this.importedTracks.length} brani aggiunti ai preferiti!`);
    this.resetImportUI();
  }

  resetImportUI() {
    document.getElementById('spotify-url').value = '';
    document.getElementById('youtube-url').value = '';
    document.getElementById('import-progress').classList.add('hidden');
    document.getElementById('import-results').classList.add('hidden');
  }

  formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default ImportManager;
