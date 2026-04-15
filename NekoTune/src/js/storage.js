// Nekotune — Persistent IndexedDB Storage & AES-GCM Encrypted Caching
export class StorageManager {
  constructor() {
    this.dbName = "NekotuneDB";
    this.dbVersion = 2; // Upgraded for encrypted schema
    this.db = null;
    this.cryptoKey = null;
    this.downloadProgressKey = "sw_download_progress";
    this.initDB();
  }

  getDownloadProgressMap() {
    try {
      return JSON.parse(localStorage.getItem(this.downloadProgressKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  saveDownloadProgressMap(map) {
    localStorage.setItem(this.downloadProgressKey, JSON.stringify(map));
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("nekotune-download-progress-changed"),
      );
    }
  }

  setDownloadProgress(trackId, payload) {
    if (!trackId) return;
    const map = this.getDownloadProgressMap();
    map[trackId] = {
      ...map[trackId],
      ...payload,
      id: trackId,
      updatedAt: Date.now(),
    };
    this.saveDownloadProgressMap(map);
  }

  removeDownloadProgress(trackId) {
    if (!trackId) return;
    const map = this.getDownloadProgressMap();
    if (!map[trackId]) return;
    delete map[trackId];
    this.saveDownloadProgressMap(map);
  }

  clearDownloadProgress() {
    localStorage.removeItem(this.downloadProgressKey);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("nekotune-download-progress-changed"),
      );
    }
  }

  getDownloadProgressEntries() {
    return Object.values(this.getDownloadProgressMap());
  }

  async initCrypto() {
    if (this.cryptoKey) return;
    const storedKey = localStorage.getItem("sw_master_key");
    if (storedKey) {
      const rawKey = Uint8Array.from(atob(storedKey), (c) => c.charCodeAt(0));
      this.cryptoKey = await crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"],
      );
    } else {
      this.cryptoKey = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"],
      );
      const exported = await crypto.subtle.exportKey("raw", this.cryptoKey);
      const b64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
      localStorage.setItem("sw_master_key", b64);
    }
  }

  async initDB() {
    await this.initCrypto();
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (e) => reject("IndexedDB error: " + e.target.error);

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("tracks")) {
          db.createObjectStore("tracks", { keyPath: "id" });
        } else if (e.oldVersion < 2) {
          // Clear old unencrypted tracks
          db.deleteObjectStore("tracks");
          db.createObjectStore("tracks", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("localLibrary")) {
          db.createObjectStore("localLibrary", { keyPath: "id" });
        }
      };
    });
  }

  async saveTrack(track, blob) {
    if (!this.db) await this.initDB();

    // Encrypt
    const arrayBuffer = await blob.arrayBuffer();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      this.cryptoKey,
      arrayBuffer,
    );

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["tracks"], "readwrite");
      const store = transaction.objectStore("tracks");
      const request = store.put({
        id: track.id,
        meta: track, // Store the full metadata (title, artist, cover info)
        iv: Array.from(iv), // Store as regular array for structured cloning
        data: encryptedData,
        mimeType: blob.type,
        timestamp: Date.now(),
      });
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async getTrack(id) {
    if (!this.db) await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["tracks"], "readonly");
      const store = transaction.objectStore("tracks");
      const request = store.get(id);

      request.onsuccess = async () => {
        const result = request.result;
        if (!result || !result.data) {
          resolve(null);
          return;
        }

        try {
          const iv = new Uint8Array(result.iv);
          const decryptedBuffer = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            this.cryptoKey,
            result.data,
          );
          const blob = new Blob([decryptedBuffer], {
            type: result.mimeType || "audio/mpeg",
          });
          resolve(blob);
        } catch (err) {
          console.error("Failed to decrypt offline track:", err);
          resolve(null);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async deleteTrack(id) {
    if (!this.db) await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["tracks"], "readwrite");
      const store = transaction.objectStore("tracks");
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async hasTrack(id) {
    if (!this.db) await this.initDB();
    return new Promise((resolve) => {
      const transaction = this.db.transaction(["tracks"], "readonly");
      const store = transaction.objectStore("tracks");
      const request = store.count(id);
      request.onsuccess = () => {
        resolve(request.result > 0);
      };
      request.onerror = () => resolve(false);
    });
  }

  async getAllDownloadedTracks() {
    if (!this.db) await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(["tracks"], "readonly");
      const store = transaction.objectStore("tracks");
      const request = store.openCursor();
      const results = [];

      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const t = cursor.value;
          results.push({
            meta: t.meta,
            id: t.id,
            timestamp: t.timestamp,
            byteSize: t.data ? t.data.byteLength : 0,
          });
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }
}

export const storage = new StorageManager();
