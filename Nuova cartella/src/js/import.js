// SonicWave — Import Playlists (Spotify & YouTube)
import { DEMO_TRACKS, SPOTIFY_IMPORT_TRACKS, YOUTUBE_IMPORT_TRACKS, generateId } from './data.js';

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

    // Enter key on inputs
    document.getElementById('spotify-url').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.importFromSpotify();
    });

    document.getElementById('youtube-url').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.importFromYoutube();
    });
  }

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

    await this.simulateImport('Spotify', SPOTIFY_IMPORT_TRACKS);
  }

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

    await this.simulateImport('YouTube', YOUTUBE_IMPORT_TRACKS);
  }

  async simulateImport(source, tracks) {
    const progress = document.getElementById('import-progress');
    const progressFill = document.getElementById('import-progress-fill');
    const statusText = document.getElementById('import-status-text');
    const results = document.getElementById('import-results');

    // Show progress
    progress.classList.remove('hidden');
    results.classList.add('hidden');
    progressFill.style.width = '0%';
    statusText.textContent = `Connessione a ${source}...`;

    // Simulate progress
    const steps = [
      { percent: 15, text: `Connessione a ${source}...`, delay: 500 },
      { percent: 30, text: 'Lettura playlist...', delay: 700 },
      { percent: 50, text: `Trovati ${tracks.length} brani...`, delay: 600 },
      { percent: 70, text: 'Analisi dei brani...', delay: 800 },
      { percent: 85, text: 'Importazione in corso...', delay: 600 },
      { percent: 100, text: 'Importazione completata!', delay: 400 }
    ];

    for (const step of steps) {
      await this.delay(step.delay);
      progressFill.style.width = step.percent + '%';
      statusText.textContent = step.text;
    }

    await this.delay(500);

    // Map imported tracks to internal format (use random demo tracks as fallback audio)
    this.importedTracks = tracks.map((track, i) => {
      const demoTrack = DEMO_TRACKS[i % DEMO_TRACKS.length];
      return {
        ...demoTrack,
        id: generateId(),
        title: track.title,
        artist: track.artist,
        album: track.album,
        duration: track.duration,
        color: ['#6c5ce7', '#e17055', '#00b894', '#fdcb6e', '#74b9ff', '#a29bfe'][i % 6],
        imported: true,
        source: source
      };
    });

    // Show results
    this.showImportResults(source);
  }

  showImportResults(source) {
    const results = document.getElementById('import-results');
    const list = document.getElementById('imported-tracks-list');
    results.classList.remove('hidden');

    list.innerHTML = '';
    this.importedTracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = 'track-item';
      item.innerHTML = `
        <div class="track-number">${index + 1}</div>
        <div class="track-info">
          <div class="track-cover-small">
            <span class="material-icons-round">${source === 'Spotify' ? 'music_note' : 'play_circle'}</span>
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
      list.appendChild(item);
    });
  }

  saveImportedAsPlaylist() {
    if (this.importedTracks.length === 0) return;

    const source = this.importedTracks[0].source;
    const name = `Import ${source} — ${new Date().toLocaleDateString('it-IT')}`;

    // Add imported tracks to demo tracks (in-memory)
    this.importedTracks.forEach(track => {
      if (!DEMO_TRACKS.find(t => t.id === track.id)) {
        DEMO_TRACKS.push(track);
      }
    });

    // Create playlist with imported track IDs
    const playlist = this.playlistManager.createPlaylist(name, `Importata da ${source}`);
    if (playlist) {
      this.importedTracks.forEach(track => {
        this.playlistManager.addTrackToPlaylist(playlist.id, track.id);
      });
      this.app.showToast(`Playlist "${name}" creata con ${this.importedTracks.length} brani!`);

      // Reset
      document.getElementById('spotify-url').value = '';
      document.getElementById('youtube-url').value = '';
      document.getElementById('import-progress').classList.add('hidden');
      document.getElementById('import-results').classList.add('hidden');
    }
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
