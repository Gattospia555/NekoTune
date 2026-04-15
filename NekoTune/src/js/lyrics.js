// Nekotune — Real-Time Lyrics (LRCLIB.net Integration)

class LyricsManager {
  constructor(player) {
    this.player = player;
    this.isVisible = false;
    this.isFullscreen = false;
    this.currentLyrics = null; // Array of { time, text }
    this.plainLyrics = null;   // Fallback plain text
    this.activeLine = -1;
    this.animationFrame = null;
    this.lyricsCache = {};     // Cache lyrics by "title - artist"
    this.isFetching = false;

    this.initEvents();
  }

  initEvents() {
    document.getElementById('btn-lyrics-toggle').addEventListener('click', () => {
      this.toggle();
    });

    document.getElementById('btn-close-lyrics').addEventListener('click', () => {
      this.hide();
    });

    document.getElementById('btn-lyrics-fullscreen').addEventListener('click', () => {
      this.toggleFullscreen();
    });
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    // Close queue panel if open
    document.getElementById('queue-panel').classList.remove('visible');

    const panel = document.getElementById('lyrics-panel');
    panel.classList.remove('hidden');
    // Force reflow
    panel.offsetHeight;
    panel.classList.add('visible');
    this.isVisible = true;

    document.getElementById('btn-lyrics-toggle').classList.add('active');

    this.loadCurrentLyrics();
    this.startSync();
  }

  hide() {
    const panel = document.getElementById('lyrics-panel');
    panel.classList.remove('visible');
    panel.classList.remove('fullscreen');
    this.isFullscreen = false;
    setTimeout(() => {
      panel.classList.add('hidden');
    }, 400);
    this.isVisible = false;
    document.getElementById('btn-lyrics-toggle').classList.remove('active');
    this.stopSync();
  }

  toggleFullscreen() {
    const panel = document.getElementById('lyrics-panel');
    this.isFullscreen = !this.isFullscreen;
    panel.classList.toggle('fullscreen', this.isFullscreen);

    const icon = document.getElementById('btn-lyrics-fullscreen').querySelector('.material-icons-round');
    icon.textContent = this.isFullscreen ? 'fullscreen_exit' : 'fullscreen';
  }

  // ===== LRC PARSER =====
  parseLRC(lrcString) {
    const lines = lrcString.split('\n');
    const result = [];
    // Match lines like [00:12.34] Some text  or [mm:ss.xx]
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

    for (const line of lines) {
      const timestamps = [];
      let match;
      while ((match = timeRegex.exec(line)) !== null) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        let ms = parseInt(match[3], 10);
        if (match[3].length === 2) ms *= 10; // Convert centiseconds to ms
        const time = minutes * 60 + seconds + ms / 1000;
        timestamps.push(time);
      }

      // Get the text after the last timestamp tag
      const text = line.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '').trim();

      for (const time of timestamps) {
        result.push({ time, text });
      }
    }

    // Sort by time
    result.sort((a, b) => a.time - b.time);
    return result;
  }

  // ===== LRCLIB.NET FETCHER =====
  async fetchLyrics(title, artist, duration) {
    const cacheKey = `${title} - ${artist}`.toLowerCase();
    if (this.lyricsCache[cacheKey]) {
      return this.lyricsCache[cacheKey];
    }

    try {
      // Build the API URL — try the "get" endpoint first for best match
      const params = new URLSearchParams({
        track_name: title,
        artist_name: artist,
      });
      if (duration && duration > 0) {
        params.set('duration', Math.round(duration));
      }

      const response = await fetch(`https://lrclib.net/api/get?${params.toString()}`, {
        headers: { 'User-Agent': 'Nekotune Desktop v1.0' }
      });

      if (response.ok) {
        const data = await response.json();
        const result = {
          syncedLyrics: data.syncedLyrics || null,
          plainLyrics: data.plainLyrics || null,
        };
        this.lyricsCache[cacheKey] = result;
        return result;
      }

      // Fallback: search endpoint
      const searchResponse = await fetch(`https://lrclib.net/api/search?${new URLSearchParams({ track_name: title, artist_name: artist }).toString()}`, {
        headers: { 'User-Agent': 'Nekotune Desktop v1.0' }
      });

      if (searchResponse.ok) {
        const results = await searchResponse.json();
        if (results && results.length > 0) {
          const best = results[0];
          const result = {
            syncedLyrics: best.syncedLyrics || null,
            plainLyrics: best.plainLyrics || null,
          };
          this.lyricsCache[cacheKey] = result;
          return result;
        }
      }

      return null;
    } catch (err) {
      console.error('LRCLIB fetch error:', err);
      return null;
    }
  }

  // ===== MAIN LOADER =====
  async loadCurrentLyrics() {
    const track = this.player.currentTrack;
    const content = document.getElementById('lyrics-content');

    if (!track) {
      content.innerHTML = '<p class="lyrics-empty">Riproduci un brano per vedere i testi</p>';
      this.currentLyrics = null;
      this.plainLyrics = null;
      return;
    }

    // Show loading state
    content.innerHTML = `
      <div class="lyrics-loading">
        <span class="material-icons-round lyrics-loading-icon">music_note</span>
        <p>Caricamento testi per</p>
        <p class="lyrics-loading-track">${track.title}</p>
      </div>
    `;
    this.currentLyrics = null;
    this.plainLyrics = null;
    this.isFetching = true;

    const lyricsData = await this.fetchLyrics(track.title, track.artist, track.duration);
    this.isFetching = false;

    // Check if the track changed while we were fetching
    if (this.player.currentTrack !== track) return;

    if (!lyricsData || (!lyricsData.syncedLyrics && !lyricsData.plainLyrics)) {
      content.innerHTML = `
        <div class="lyrics-empty-state">
          <span class="material-icons-round" style="font-size:48px; color:var(--text-tertiary); margin-bottom:16px;">lyrics</span>
          <p class="lyrics-empty">Nessun testo disponibile per</p>
          <p class="lyrics-empty-track">"${track.title}" — ${track.artist}</p>
        </div>
      `;
      return;
    }

    // If we have synced (LRC) lyrics, parse and render them
    if (lyricsData.syncedLyrics) {
      this.currentLyrics = this.parseLRC(lyricsData.syncedLyrics);
      this.renderSyncedLyrics(content);
    } else if (lyricsData.plainLyrics) {
      // Fallback: plain text lyrics (no sync)
      this.plainLyrics = lyricsData.plainLyrics;
      this.renderPlainLyrics(content);
    }
  }

  renderSyncedLyrics(content) {
    content.innerHTML = '';
    this.activeLine = -1;

    this.currentLyrics.forEach((line, index) => {
      const el = document.createElement('div');
      el.className = 'lyrics-line';
      el.textContent = line.text || '♪';
      el.dataset.index = index;
      el.dataset.time = line.time;

      // Click to seek to this line
      el.addEventListener('click', () => {
        this.player.seekTo(line.time);
      });

      content.appendChild(el);
    });
  }

  renderPlainLyrics(content) {
    content.innerHTML = '';
    const lines = this.plainLyrics.split('\n');

    lines.forEach(line => {
      const el = document.createElement('div');
      el.className = 'lyrics-line lyrics-plain';
      el.textContent = line || '';
      content.appendChild(el);
    });
  }

  // ===== SYNC ENGINE =====
  startSync() {
    this.stopSync();
    const sync = () => {
      if (!this.isVisible || !this.currentLyrics) {
        this.animationFrame = requestAnimationFrame(sync);
        return;
      }

      const time = this.player.getCurrentTime();
      let activeIndex = -1;

      for (let i = this.currentLyrics.length - 1; i >= 0; i--) {
        if (time >= this.currentLyrics[i].time) {
          activeIndex = i;
          break;
        }
      }

      if (activeIndex !== this.activeLine) {
        this.activeLine = activeIndex;
        this.updateHighlight(activeIndex);
      }

      this.animationFrame = requestAnimationFrame(sync);
    };

    this.animationFrame = requestAnimationFrame(sync);
  }

  stopSync() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  updateHighlight(activeIndex) {
    const content = document.getElementById('lyrics-content');
    const lines = content.querySelectorAll('.lyrics-line:not(.lyrics-plain)');

    lines.forEach((line, i) => {
      line.classList.toggle('active', i === activeIndex);
      // Dim past lines slightly
      line.classList.toggle('past', i < activeIndex);
    });

    // Auto-scroll to active line with smooth centering
    if (activeIndex >= 0 && lines[activeIndex]) {
      const line = lines[activeIndex];
      const container = content;
      const lineTop = line.offsetTop;
      const containerHeight = container.clientHeight;

      container.scrollTo({
        top: lineTop - containerHeight / 3,
        behavior: 'smooth'
      });
    }
  }

  // Called when track changes
  onTrackChange() {
    this.activeLine = -1;
    if (this.isVisible) {
      this.loadCurrentLyrics();
    }
  }
}

export default LyricsManager;
