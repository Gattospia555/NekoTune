// SonicWave — Real-Time Lyrics
import { DEMO_LYRICS } from './data.js';

class LyricsManager {
  constructor(player) {
    this.player = player;
    this.isVisible = false;
    this.isFullscreen = false;
    this.currentLyrics = null;
    this.activeLine = -1;
    this.animationFrame = null;

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

  loadCurrentLyrics() {
    const track = this.player.currentTrack;
    const content = document.getElementById('lyrics-content');

    if (!track || !track.hasLyrics || !DEMO_LYRICS[track.id]) {
      content.innerHTML = '<p class="lyrics-empty">Nessun testo disponibile per questo brano</p>';
      this.currentLyrics = null;
      return;
    }

    this.currentLyrics = DEMO_LYRICS[track.id];
    content.innerHTML = '';

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

  startSync() {
    this.stopSync();
    const sync = () => {
      if (!this.isVisible || !this.currentLyrics) return;

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
    const lines = content.querySelectorAll('.lyrics-line');

    lines.forEach((line, i) => {
      line.classList.toggle('active', i === activeIndex);
    });

    // Auto-scroll to active line
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
    if (this.isVisible) {
      this.loadCurrentLyrics();
      this.activeLine = -1;
    }
  }
}

export default LyricsManager;
