import { storage } from "./storage.js";
import { DEMO_TRACKS, resolveTrack } from "./data.js";

export class OfflineManager {
  constructor(app) {
    this.app = app;
    this.refreshInterval = null;
    this.refreshTimeout = null;
    this.initEvents();
    window.addEventListener("nekotune-download-progress-changed", () => {
      if (this.app.currentSection === "offline") {
        this.scheduleRefreshOfflineView();
      }
    });
  }

  scheduleRefreshOfflineView() {
    clearTimeout(this.refreshTimeout);
    this.refreshTimeout = setTimeout(() => {
      this.refreshOfflineView();
    }, 100);
  }

  initEvents() {
    document
      .getElementById("btn-play-offline")
      ?.addEventListener("click", () => {
        this.playAllOffline();
      });

    document
      .getElementById("btn-clear-offline")
      ?.addEventListener("click", () => {
        this.app.showConfirm(
          "Libera Spazio",
          "Sei sicuro di voler eliminare TUTTI i brani scaricati? Dovrai riscaricarli per ascoltarli offline.",
          "Elimina Tutto",
          true,
          () => this.clearAllOffline(),
        );
      });
  }

  async refreshOfflineView() {
    try {
      const records = await storage.getAllDownloadedTracks();
      const progressEntries = storage
        .getDownloadProgressEntries()
        .filter((entry) => !records.some((record) => record.id === entry.id));
      const countEl = document.getElementById("offline-count");
      const sizeEl = document.getElementById("offline-size");
      const listEl = document.getElementById("offline-list");

      let totalBytes = 0;
      const tracks = [];

      records.forEach((r) => {
        totalBytes += r.byteSize || 0;
        const meta = r.meta || resolveTrack(r.id);
        if (meta) tracks.push(meta);
      });

      const activeCount = progressEntries.length;
      if (countEl) {
        const downloadedText = `${tracks.length} bran${tracks.length !== 1 ? "i" : "o"} scaricat${tracks.length !== 1 ? "i" : "o"}`;
        countEl.textContent =
          activeCount > 0
            ? `${downloadedText}, ${activeCount} in download`
            : downloadedText;
      }
      if (sizeEl)
        sizeEl.textContent = `${(totalBytes / (1024 * 1024)).toFixed(2)} MB utilizzati`;

      if (!listEl) return;

      if (tracks.length === 0 && progressEntries.length === 0) {
        listEl.innerHTML = `
          <div class="search-empty" style="padding: 40px;">
            <span class="material-icons-round">download</span>
            <p>Nessun brano scaricato</p>
          </div>
        `;
        return;
      }

      const progressHtml =
        progressEntries.length > 0
          ? `
          <div class="offline-progress-section">
            <h3 class="offline-section-title">Download in corso</h3>
            <div class="offline-progress-list">
              ${progressEntries
                .map((entry) => {
                  const meta = entry.meta || resolveTrack(entry.id);
                  const title = meta?.title || "Brano sconosciuto";
                  const artist = meta?.artist || "Download in corso";
                  const progress =
                    typeof entry.progress === "number"
                      ? Math.max(0, Math.min(100, entry.progress))
                      : 0;
                  const progressLabel =
                    typeof entry.progress === "number"
                      ? `${progress}%`
                      : "In corso";
                  return `
                  <div class="offline-progress-item">
                    <div class="offline-progress-cover">
                      <span class="material-icons-round">download</span>
                    </div>
                    <div class="offline-progress-info">
                      <div class="offline-progress-title">${title}</div>
                      <div class="offline-progress-artist">${artist}</div>
                    </div>
                    <div class="offline-progress-meta">${progressLabel}</div>
                    <div class="offline-progress-bar">
                      <div class="offline-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="offline-progress-actions">
                      <button class="btn-danger offline-cancel-download" data-download-id="${entry.id}" type="button">Blocca</button>
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>
        `
          : "";

      listEl.innerHTML = `${progressHtml}<div id="offline-completed-list" class="offline-completed-list"></div>`;

      listEl.querySelectorAll(".offline-cancel-download").forEach((button) => {
        button.addEventListener("click", () => {
          const downloadId = button.dataset.downloadId;
          if (downloadId && this.app.playlists?.cancelDownload) {
            this.app.playlists.cancelDownload(downloadId);
            this.scheduleRefreshOfflineView();
          }
        });
      });

      if (this.app.playlists && tracks.length > 0) {
        this.app.playlists.renderTrackList("offline-completed-list", tracks, {
          showActions: true,
          onPlay: (index) => {
            this.app.player.playTrackList(tracks, index);
          },
        });
      }
    } catch (e) {
      console.error("Error refreshing offline view:", e);
    }
  }

  async playAllOffline() {
    try {
      const records = await storage.getAllDownloadedTracks();
      const tracks = records
        .map((r) => r.meta || resolveTrack(r.id))
        .filter(Boolean);
      if (tracks.length > 0) {
        this.app.player.playTrackList(tracks, 0);
      } else {
        this.app.showToast("Nessun brano scaricato da riprodurre.");
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
      storage.clearDownloadProgress();
      this.app.showToast("Tutti i download rimossi con successo.");
      this.refreshOfflineView();
      // Re-trigger visual scan for download buttons in active lists
      if (typeof this.app.renderHomeQuickPlaylists === "function") {
        const currentSection = document
          .querySelector(".section.active")
          .id.replace("section-", "");
        this.app.navigateTo(currentSection, true);
      }
    } catch (e) {
      this.app.showToast("Errore durante la pulizia.", true);
      console.error(e);
    }
  }
}
