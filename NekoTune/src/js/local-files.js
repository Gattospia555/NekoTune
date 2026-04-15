// Nekotune — Local Files Manager
import { storage } from './storage.js';
import { generateId, formatTime } from './data.js';

export class LocalFileManager {
  constructor(app) {
    this.app = app;
    this.localTracks = [];
    
    this.initEvents();
    this.loadMetadata();
  }

  initEvents() {
    const btnScan = document.getElementById('btn-scan-local');
    if (btnScan) {
      btnScan.addEventListener('click', () => this.scanDirectory());
    }

    const btnClear = document.getElementById('btn-clear-local');
    if (btnClear) {
      btnClear.addEventListener('click', () => this.clearLocalLibrary());
    }
  }

  async loadMetadata() {
    if (!storage.db) await storage.initDB();
    const transaction = storage.db.transaction(['localLibrary'], 'readonly');
    const store = transaction.objectStore('localLibrary');
    const request = store.getAll();
    
    request.onsuccess = () => {
      if (request.result && request.result.length > 0) {
        // Assume single entry for simplicity storing all array
        this.localTracks = request.result[0].tracks || [];
        this.renderLocalList();
      }
    };
  }

  async saveMetadata() {
    if (!storage.db) await storage.initDB();
    const transaction = storage.db.transaction(['localLibrary'], 'readwrite');
    const store = transaction.objectStore('localLibrary');
    store.put({ id: 'main', tracks: this.localTracks });
  }

  async scanDirectory() {
    try {
      if (!window.showDirectoryPicker) {
        this.app.showToast('Il tuo browser/dispositivo non supporta la lettura delle cartelle.');
        return;
      }

      const dirHandle = await window.showDirectoryPicker({ mode: 'read' });
      this.app.showToast('Scansione in corso...');
      
      const newTracks = [];
      await this.processDirectory(dirHandle, newTracks);
      
      this.localTracks = [...this.localTracks, ...newTracks];
      
      // Remove duplicates based on title/file name
      const uniqueTracks = [];
      const titles = new Set();
      for (const t of this.localTracks) {
        if (!titles.has(t.title)) {
          titles.add(t.title);
          uniqueTracks.push(t);
        }
      }
      this.localTracks = uniqueTracks;

      this.saveMetadata();
      this.renderLocalList();
      this.app.showToast(`Scansione completata. Trovati ${newTracks.length} brani.`);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Directory scan failed:', err);
        this.app.showToast('Errore durante la scansione della cartella.');
      }
    }
  }

  async processDirectory(directoryHandle, newTracks) {
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === 'file') {
        if (entry.name.endsWith('.mp3') || entry.name.endsWith('.flac') || entry.name.endsWith('.wav') || entry.name.endsWith('.m4a')) {
          const file = await entry.getFile();
          
          // Generate a local track object
          const track = {
            id: 'local_' + generateId(),
            title: entry.name.replace(/\.[^/.]+$/, ""), // remove extension
            artist: 'File Locale',
            album: 'Libreria',
            duration: 0, // We would need to read audio metadata to get real duration, keeping it 0 for now
            color: '#0984e3',
            isLocal: true,
            handle: entry // We store the handle so we can request permission to read it later without duplicating large files in IndexedDB!
          };
          
          newTracks.push(track);
        }
      } else if (entry.kind === 'directory') {
        await this.processDirectory(entry, newTracks); // recursive
      }
    }
  }

  async playLocalTrack(trackIndex) {
    const track = this.localTracks[trackIndex];
    if (!track.handle) {
      this.app.showToast("File non trovato.");
      return;
    }

    try {
      // Very request permission if needed
      if ((await track.handle.queryPermission({ mode: 'read' })) !== 'granted') {
        if ((await track.handle.requestPermission({ mode: 'read' })) !== 'granted') {
          this.app.showToast("Permesso negato per leggere il file.");
          return;
        }
      }

      const file = await track.handle.getFile();
      const url = URL.createObjectURL(file);
      
      // Create a playable duplicate
      const playableTrack = { ...track, src: url };
      
      // We pass the whole local list but map them dynamically? 
      // It's tricky with Object URLs to map all of them at once without huge memory overhead.
      // For now, let's just create URL for the current track and throw it into the player single.
      this.app.player.playTrackList([playableTrack], 0);
      
    } catch (e) {
      console.error(e);
      this.app.showToast("Errore di caricamento file locale.");
    }
  }

  clearLocalLibrary() {
    this.app.showConfirm(
      'Svuota Libreria',
      'Vuoi rimuovere tutti i brani dalla libreria locale? (I file originali non verranno cancellati)',
      'Svuota',
      true,
      () => {
        this.localTracks = [];
        this.saveMetadata();
        this.renderLocalList();
      }
    );
  }

  renderLocalList() {
    const container = document.getElementById('local-tracks-list');
    const countEl = document.getElementById('local-count');
    const btnClear = document.getElementById('btn-clear-local');

    if (!container) return;
    
    if (this.localTracks.length === 0) {
      countEl.textContent = '0 brani scansionati';
      btnClear.classList.add('hidden');
      container.innerHTML = `
        <div class="search-empty" style="padding: 40px;">
          <span class="material-icons-round">snippet_folder</span>
          <p>Nessuna cartella scansionata. Inizia aggiungendo la tua musica.</p>
        </div>
      `;
      return;
    }

    countEl.textContent = `${this.localTracks.length} brani`;
    btnClear.classList.remove('hidden');

    // We can reuse app.playlists.renderTrackList but without the data.js mapping logic!
    // Since our local files aren't in DEMO_TRACKS, we write a custom render just for local.
    container.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'track-list-header';
    header.innerHTML = `
      <span>#</span>
      <span>Titolo</span>
      <span>Album</span>
      <span>Durata</span>
      <span></span>
    `;
    container.appendChild(header);

    this.localTracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = 'track-item';
      if (this.app.player.currentTrack?.id === track.id) item.classList.add('playing');
      
      item.innerHTML = `
        <div class="track-number">${index + 1}</div>
        <div class="track-info">
          <div class="track-cover-small">
            <span class="material-icons-round">audio_file</span>
          </div>
          <div class="track-text">
            <div class="track-title">${track.title}</div>
            <div class="track-artist-name">${track.artist}</div>
          </div>
        </div>
        <div class="track-album-name">${track.album}</div>
        <div class="track-duration">--:--</div>
        <div class="track-actions">
          <button class="btn-icon btn-add-to-queue" data-index="${index}" title="Riproduci">
            <span class="material-icons-round">play_arrow</span>
          </button>
        </div>
      `;

      item.addEventListener('dblclick', () => this.playLocalTrack(index));
      const playBtn = item.querySelector('.btn-add-to-queue');
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playLocalTrack(index);
      });

      container.appendChild(item);
    });
  }
}
