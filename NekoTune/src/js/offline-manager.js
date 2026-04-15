import { storage } from './storage.js';
import { DEMO_TRACKS, resolveTrack } from './data.js';

export class OfflineManager {
  constructor(app) {
    this.app = app;
    this.refreshInterval = null;
    this.initEvents();
  }

  initEvents() {
    document.getElementById('btn-play-offline')?.addEventListener('click', () => {
      this.playAllOffline();
    });

    document.getElementById('btn-clear-offline')?.addEventListener('click', () => {
      this.app.showConfirm(
        'Libera Spazio',
        'Sei sicuro di voler eliminare TUTTI i brani scaricati? Dovrai riscaricarli per ascoltarli offline.',
        'Elimina Tutto',
        true,
        () => this.clearAllOffline()
      );
    });
  }

  async refreshOfflineView() {
    try {
      const records = await storage.getAllDownloadedTracks();
      const countEl = document.getElementById('offline-count');
      const sizeEl = document.getElementById('offline-size');
      
      let totalBytes = 0;
      const tracks = [];
      
      records.forEach(r => {
        totalBytes += r.byteSize || 0;
        const meta = r.meta || resolveTrack(r.id);
        if (meta) tracks.push(meta);
      });

      if (countEl) countEl.textContent = `${tracks.length} bran${tracks.length !== 1 ? 'i' : 'o'} scaricat${tracks.length !== 1 ? 'i' : 'o'}`;
      if (sizeEl) sizeEl.textContent = `${(totalBytes / (1024 * 1024)).toFixed(2)} MB utilizzati`;

      // Render via PlaylistManager
      if (this.app.playlists) {
        this.app.playlists.renderTrackList('offline-list', tracks, {
          showActions: true,
          onPlay: (index) => {
            this.app.player.playTrackList(tracks, index);
          }
        });
      }
    } catch (e) {
      console.error('Error refreshing offline view:', e);
    }
  }

  async playAllOffline() {
    try {
      const records = await storage.getAllDownloadedTracks();
      const tracks = records.map(r => r.meta || resolveTrack(r.id)).filter(Boolean);
      if (tracks.length > 0) {
        this.app.player.playTrackList(tracks, 0);
      } else {
        this.app.showToast('Nessun brano scaricato da riprodurre.');
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  async clearAllOffline() {
    try {
      const records = await storage.getAllDownloadedTracks();
      for (const r of records) {
        await storage.deleteTrack(r.id);
      }
      this.app.showToast('Tutti i download rimossi con successo.');
      this.refreshOfflineView();
      // Re-trigger visual scan for download buttons in active lists
      if (typeof this.app.renderHomeQuickPlaylists === 'function') {
        const currentSection = document.querySelector('.section.active').id.replace('section-', '');
        this.app.navigateTo(currentSection, true); 
      }
    } catch (e) {
      this.app.showToast('Errore durante la pulizia.', true);
      console.error(e);
    }
  }
}
