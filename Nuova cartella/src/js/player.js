// SonicWave — Music Player Engine
import { DEMO_TRACKS, formatTime, generateCoverGradient } from './data.js';

class Player {
  constructor() {
    this.audio = document.getElementById('audio-player');
    this.currentTrack = null;
    this.currentIndex = -1;
    this.queue = [];
    this.originalQueue = [];
    this.isPlaying = false;
    this.isShuffle = false;
    this.repeatMode = 'none'; // none, all, one
    this.volume = 0.7;
    this.isMuted = false;
    this.previousVolume = 0.7;

    // Callbacks
    this.onTrackChange = null;
    this.onPlayStateChange = null;
    this.onTimeUpdate = null;
    this.onQueueChange = null;

    this.coverCache = {};
    this.initAudio();
    this.initControls();
    this.initProgressBar();
    this.initVolumeControl();
    this.initEqualizer();
  }

  initAudio() {
    this.audio.volume = this.volume;

    this.audio.addEventListener('timeupdate', () => {
      this.updateProgressBar();
      if (this.onTimeUpdate) this.onTimeUpdate(this.audio.currentTime, this.audio.duration);
    });

    this.audio.addEventListener('ended', () => {
      this.handleTrackEnd();
    });

    this.audio.addEventListener('loadedmetadata', () => {
      document.getElementById('player-time-total').textContent = formatTime(this.audio.duration);
    });

    this.audio.addEventListener('error', () => {
      // If audio fails to load, still allow UI interaction
      console.warn('Audio failed to load, using fallback');
    });
  }

  initControls() {
    document.getElementById('btn-play').addEventListener('click', () => this.togglePlay());
    document.getElementById('btn-prev').addEventListener('click', () => this.previous());
    document.getElementById('btn-next').addEventListener('click', () => this.next());
    document.getElementById('btn-shuffle').addEventListener('click', () => this.toggleShuffle());
    document.getElementById('btn-repeat').addEventListener('click', () => this.toggleRepeat());
  }

  initProgressBar() {
    const container = document.getElementById('progress-bar-container');
    let isDragging = false;

    const seek = (e) => {
      const rect = container.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (this.audio.duration) {
        this.audio.currentTime = percent * this.audio.duration;
      }
      this.updateProgressBar();
    };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      seek(e);
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) seek(e);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }

  initVolumeControl() {
    const slider = document.getElementById('volume-slider-container') || document.querySelector('.volume-slider-container');
    const btnVolume = document.getElementById('btn-volume');
    let isDragging = false;

    if (!slider) return;

    const setVolume = (e) => {
      const rect = slider.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      this.volume = percent;
      this.isMuted = false;
      this.audio.volume = percent;
      this.audio.muted = false;
      this.updateVolumeUI();
    };

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      setVolume(e);
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) setVolume(e);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    btnVolume.addEventListener('click', () => {
      this.toggleMute();
    });
  }

  initEqualizer() {
    this.eqCanvas = document.getElementById('equalizer-canvas');
    this.eqCtx = this.eqCanvas ? this.eqCanvas.getContext('2d') : null;
    this.eqBars = Array(8).fill(0);
    this.animateEqualizer();
  }

  animateEqualizer() {
    if (!this.eqCtx) return;
    const ctx = this.eqCtx;
    const w = this.eqCanvas.width;
    const h = this.eqCanvas.height;
    const barWidth = 6;
    const gap = 4;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < 8; i++) {
        if (this.isPlaying) {
          this.eqBars[i] += (Math.random() * h - this.eqBars[i]) * 0.3;
        } else {
          this.eqBars[i] *= 0.9;
        }

        const barH = Math.max(2, this.eqBars[i]);
        const x = i * (barWidth + gap);
        const y = h - barH;

        const gradient = ctx.createLinearGradient(x, y, x, h);
        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue('--accent').trim() || '#6c5ce7';
        const accentSecondary = style.getPropertyValue('--accent-secondary').trim() || '#a29bfe';
        gradient.addColorStop(0, accentSecondary);
        gradient.addColorStop(1, accent);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  getTrackCover(track) {
    if (!this.coverCache[track.id]) {
      this.coverCache[track.id] = generateCoverGradient(track.color);
    }
    return this.coverCache[track.id];
  }

  loadTrack(track, autoplay = true) {
    this.currentTrack = track;
    this.audio.src = track.src;
    this.audio.load();

    // Update UI
    const cover = this.getTrackCover(track);
    const playerCover = document.getElementById('player-cover');
    playerCover.innerHTML = `<img src="${cover}" alt="${track.title}" />`;
    document.getElementById('player-track-name').textContent = track.title;
    document.getElementById('player-track-artist').textContent = track.artist;

    // Update document title
    document.title = `${track.title} — ${track.artist} | SonicWave`;

    // Update favorite button
    this.updateFavoriteButton();

    if (autoplay) {
      this.play();
    }

    if (this.onTrackChange) this.onTrackChange(track);
  }

  play() {
    if (!this.currentTrack) return;
    const promise = this.audio.play();
    if (promise) {
      promise.catch(err => console.warn('Playback prevented:', err));
    }
    this.isPlaying = true;
    document.getElementById('btn-play').querySelector('.material-icons-round').textContent = 'pause';
    if (this.onPlayStateChange) this.onPlayStateChange(true);
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    document.getElementById('btn-play').querySelector('.material-icons-round').textContent = 'play_arrow';
    if (this.onPlayStateChange) this.onPlayStateChange(false);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      if (!this.currentTrack && this.queue.length > 0) {
        this.currentIndex = 0;
        this.loadTrack(this.queue[0]);
      } else {
        this.play();
      }
    }
  }

  next() {
    if (this.queue.length === 0) return;
    if (this.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.play();
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.queue.length;
    this.loadTrack(this.queue[this.currentIndex]);
  }

  previous() {
    if (this.queue.length === 0) return;
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + this.queue.length) % this.queue.length;
    this.loadTrack(this.queue[this.currentIndex]);
  }

  handleTrackEnd() {
    if (this.repeatMode === 'one') {
      this.audio.currentTime = 0;
      this.play();
    } else if (this.currentIndex < this.queue.length - 1 || this.repeatMode === 'all') {
      this.next();
    } else {
      this.pause();
      this.audio.currentTime = 0;
    }
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    const btn = document.getElementById('btn-shuffle');
    btn.classList.toggle('active', this.isShuffle);

    if (this.isShuffle) {
      this.originalQueue = [...this.queue];
      const currentTrack = this.queue[this.currentIndex];
      const remaining = this.queue.filter((_, i) => i !== this.currentIndex);
      // Fisher-Yates shuffle
      for (let i = remaining.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
      }
      this.queue = [currentTrack, ...remaining];
      this.currentIndex = 0;
    } else {
      const currentTrack = this.currentTrack;
      this.queue = [...this.originalQueue];
      this.currentIndex = this.queue.findIndex(t => t.id === currentTrack?.id);
    }
    if (this.onQueueChange) this.onQueueChange();
  }

  toggleRepeat() {
    const modes = ['none', 'all', 'one'];
    const idx = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(idx + 1) % modes.length];

    const btn = document.getElementById('btn-repeat');
    const icon = btn.querySelector('.material-icons-round');
    btn.classList.toggle('active', this.repeatMode !== 'none');
    icon.textContent = this.repeatMode === 'one' ? 'repeat_one' : 'repeat';
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.previousVolume = this.volume;
      this.audio.muted = true;
    } else {
      this.audio.muted = false;
    }
    this.updateVolumeUI();
  }

  updateProgressBar() {
    const fill = document.getElementById('progress-bar-fill');
    const current = document.getElementById('player-time-current');
    if (this.audio.duration) {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      fill.style.width = percent + '%';
      current.textContent = formatTime(this.audio.currentTime);
    }
  }

  updateVolumeUI() {
    const fill = document.getElementById('volume-slider-fill');
    const icon = document.getElementById('btn-volume').querySelector('.material-icons-round');

    const vol = this.isMuted ? 0 : this.volume;
    fill.style.width = (vol * 100) + '%';

    if (this.isMuted || vol === 0) {
      icon.textContent = 'volume_off';
    } else if (vol < 0.5) {
      icon.textContent = 'volume_down';
    } else {
      icon.textContent = 'volume_up';
    }
  }

  updateFavoriteButton() {
    const btn = document.getElementById('btn-favorite-current');
    if (!btn || !this.currentTrack) return;
    const favorites = JSON.parse(localStorage.getItem('sw_favorites') || '[]');
    const isFav = favorites.includes(this.currentTrack.id);
    btn.classList.toggle('is-favorite', isFav);
    btn.querySelector('.material-icons-round').textContent = isFav ? 'favorite' : 'favorite_border';
  }

  playTrackList(tracks, startIndex = 0) {
    this.queue = [...tracks];
    this.originalQueue = [...tracks];
    this.currentIndex = startIndex;

    if (this.isShuffle) {
      const currentTrack = this.queue[startIndex];
      const remaining = this.queue.filter((_, i) => i !== startIndex);
      for (let i = remaining.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
      }
      this.queue = [currentTrack, ...remaining];
      this.currentIndex = 0;
    }

    this.loadTrack(this.queue[this.currentIndex]);
    if (this.onQueueChange) this.onQueueChange();
  }

  addToQueue(track) {
    this.queue.push(track);
    if (this.onQueueChange) this.onQueueChange();
  }

  getQueue() {
    return {
      tracks: this.queue,
      currentIndex: this.currentIndex
    };
  }

  seekTo(time) {
    if (this.audio.duration) {
      this.audio.currentTime = time;
    }
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration || 0;
  }
}

export default Player;
