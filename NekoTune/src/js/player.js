// Nekotune — Music Player Engine
import { DEMO_TRACKS, formatTime, generateCoverGradient } from "./data.js";
import { storage } from "./storage.js";

class Player {
  constructor() {
    this.audio = document.getElementById("audio-player");
    this.currentTrack = null;
    this.currentIndex = -1;
    this.queue = [];
    this.originalQueue = [];
    this.streamCache = new Map(); // Add a stream URL cache for faster playback
    this.isPlaying = false;
    this.isShuffle = false;
    this.repeatMode = "none"; // none, all, one
    this.volume = 0.7;
    this.isMuted = false;
    this.previousVolume = 0.7;

    // Web Audio API
    this.audioCtx = null;
    this.source = null;
    this.eqBands = [];
    this.pannerNode = null;
    this.analyzer = null;
    this.analyzerData = null;
    this.is8DActive = false;
    this.pannerAngle = 0;
    this.isKaraokeActive = false;
    this.karaokeNodes = null;

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

    this.audio.addEventListener("timeupdate", () => {
      this.updateProgressBar();
      this.updateMiniPlayerProgress();
      if (this.onTimeUpdate)
        this.onTimeUpdate(this.audio.currentTime, this.audio.duration);
    });

    this.audio.addEventListener("ended", () => {
      this.handleTrackEnd();
    });

    this.audio.addEventListener("loadedmetadata", () => {
      document.getElementById("player-time-total").textContent = formatTime(
        this.audio.duration,
      );
    });

    this.audio.addEventListener("error", () => {
      // If audio fails to load, still allow UI interaction
      console.warn("Audio failed to load, using fallback");
    });
  }

  initControls() {
    document
      .getElementById("btn-play")
      .addEventListener("click", () => this.togglePlay());
    document
      .getElementById("btn-prev")
      .addEventListener("click", () => this.previous());
    document
      .getElementById("btn-next")
      .addEventListener("click", () => this.next());
    document
      .getElementById("btn-shuffle")
      .addEventListener("click", () => this.toggleShuffle());
    document
      .getElementById("btn-repeat")
      .addEventListener("click", () => this.toggleRepeat());

    const btn8D = document.getElementById("btn-8d-audio");
    if (btn8D) {
      btn8D.addEventListener("click", () => {
        const isActive = this.toggle8DAudio();
        btn8D.classList.toggle("active", isActive);
      });
    }

    const btnKaraoke = document.getElementById("btn-karaoke");
    if (btnKaraoke) {
      btnKaraoke.addEventListener("click", () => {
        const isActive = this.toggleKaraoke();
        btnKaraoke.classList.toggle("active", isActive);
      });
    }

    const btnPip = document.getElementById("btn-mini-player");
    if (btnPip) {
      btnPip.addEventListener("click", () => this.togglePiP());
    }

    this.initEQUI();
  }

  initEQUI() {
    const btnEQ = document.getElementById("btn-eq");
    const modal = document.getElementById("eq-modal");
    const btnClose = document.getElementById("btn-close-eq");
    const btnCloseModal = document.getElementById("btn-close-eq-modal");
    const btnReset = document.getElementById("btn-reset-eq");
    const container = document.getElementById("eq-container");
    const presetDropdown = document.getElementById("eq-custom-dropdown");
    const presetSelected = document.getElementById("eq-dropdown-selected");
    const presetOptions = document.querySelectorAll(
      "#eq-dropdown-options .dropdown-option",
    );

    if (!btnEQ || !modal || !container) return;

    // Store presets and custom presets
    this.eqPresets = {
      flat: [0, 0, 0, 0, 0],
      acoustic: [3, 5, 2, 1, 3],
      bass_booster: [8, 6, 2, 0, -2],
      bass_reducer: [-8, -6, -2, 0, 2],
      classical: [4, 2, -1, 2, 6],
      dance: [6, 5, 0, 3, 4],
      electronic: [5, 4, -1, 1, 7],
      hiphop: [7, 4, 1, 1, 3],
      jazz: [4, 3, 0, 2, 4],
      pop: [-1, 2, 3, 2, 0],
      rock: [6, 4, 2, 2, 5],
      vocal_booster: [-2, 3, 5, 3, 1],
    };

    // Load custom presets from localStorage
    this.loadCustomEQPresets();
    this.currentEQPreset =
      localStorage.getItem("sw_eq_current_preset") || "flat";

    if (presetDropdown && presetSelected && presetOptions) {
      presetDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        presetDropdown.classList.toggle("active");
      });

      document.addEventListener("click", (e) => {
        if (!presetDropdown.contains(e.target)) {
          presetDropdown.classList.remove("active");
        }
      });

      presetOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
          e.stopPropagation();
          const selected = e.target.getAttribute("data-value");
          this.applyEQPreset(selected);
          presetDropdown.classList.remove("active");
        });
      });
    }

    btnEQ.addEventListener("click", () => {
      if (!this.audioCtx) {
        this.initWebAudio();
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch((e) => console.warn("Resume failed:", e));
      }
      modal.style.display = "flex";
      modal.offsetHeight;
      modal.classList.add("visible");
      this.renderEQSliders(container);
      presetSelected.textContent =
        this.currentEQPreset.charAt(0).toUpperCase() +
        this.currentEQPreset.slice(1);
    });

    const closeEQModal = () => {
      modal.classList.remove("visible");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    };

    if (btnClose) {
      btnClose.addEventListener("click", closeEQModal);
    }

    if (btnCloseModal) {
      btnCloseModal.addEventListener("click", closeEQModal);
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeEQModal();
      }
    });

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        this.applyEQPreset("flat");
        presetSelected.textContent = "Flat";
      });
    }

    // Setup Save Custom EQ Modal
    this.setupSaveEQModal();

    // Delete custom EQ preset
    const btnDelete = document.getElementById("btn-delete-custom-eq");
    if (btnDelete) {
      btnDelete.addEventListener("click", () => {
        const presetName = this.currentEQPreset;
        // Usa il modal custom invece di confirm
        this.showConfirmDialog(
          `Sei sicuro di voler eliminare il preset "${presetName}"?`,
          () => {
            // Delete from localStorage
            const custom = localStorage.getItem("sw_eq_custom_presets");
            if (custom) {
              const customPresets = JSON.parse(custom);
              delete customPresets[presetName];
              localStorage.setItem(
                "sw_eq_custom_presets",
                JSON.stringify(customPresets),
              );
            }
            // Delete from eqPresets object
            delete this.eqPresets[presetName];
            // Remove from dropdown
            const dropdown = document.getElementById("eq-dropdown-options");
            const optionToDelete = dropdown.querySelector(
              `[data-value="${presetName}"]`,
            );
            if (optionToDelete) {
              optionToDelete.remove();
            }
            // Reset to Flat
            this.applyEQPreset("flat");
            // Hide delete button
            btnDelete.style.display = "none";
            // Show success message
            if (window.nekotune && window.nekotune.showToast) {
              window.nekotune.showToast(
                `Preset "${presetName}" eliminato con successo!`,
              );
            }
          },
          () => {}, // onCancel
        );
      });
    }
  }

  loadCustomEQPresets() {
    const saved = localStorage.getItem("sw_eq_custom_presets");
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        this.eqPresets = { ...this.eqPresets, ...custom };
      } catch (e) {
        console.warn("Failed to load custom EQ presets:", e);
      }
    }
  }

  saveCustomEQPreset(name, gains) {
    const custom = localStorage.getItem("sw_eq_custom_presets");
    const customPresets = custom ? JSON.parse(custom) : {};
    customPresets[name] = gains;
    localStorage.setItem("sw_eq_custom_presets", JSON.stringify(customPresets));
    this.eqPresets[name] = gains;
  }

  applyEQPreset(presetName) {
    if (!this.eqPresets[presetName]) return;
    const gains = this.eqPresets[presetName];

    // Applica i valori alle bande disponibili (5 bande)
    if (this.eqBands && this.eqBands.length > 0) {
      this.eqBands.forEach((band, idx) => {
        // Se il preset ha meno valori delle bande, fallback a 0
        const gain = gains[idx] !== undefined ? gains[idx] : 0;
        band.gain.value = gain;
        const slider = document.getElementById(`eq-slider-${idx}`);
        if (slider) {
          slider.value = gain;
          slider.dispatchEvent(new Event("input"));
        }
      });
    }

    this.currentEQPreset = presetName;
    localStorage.setItem("sw_eq_current_preset", presetName);

    const presetSelected = document.getElementById("eq-dropdown-selected");
    if (presetSelected) {
      presetSelected.textContent =
        presetName.charAt(0).toUpperCase() + presetName.slice(1);
    }

    // Mostra il bottone elimina solo per preset custom
    const btnDelete = document.getElementById("btn-delete-custom-eq");
    if (btnDelete) {
      const builtInPresets = [
        "flat",
        "acoustic",
        "bass_booster",
        "bass_reducer",
        "classical",
        "dance",
        "electronic",
        "hiphop",
        "jazz",
        "pop",
        "rock",
        "vocal_booster",
      ];
      btnDelete.style.display = builtInPresets.includes(presetName)
        ? "none"
        : "flex";
    }
  }

  renderEQSliders(container) {
    // Clear previous sliders
    container.innerHTML = "";

    const frequencies = [60, 230, 910, 3600, 14000];
    const labels = ["60", "230", "910", "3.6k", "14k"];

    const sliderGrid = document.createElement("div");
    sliderGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(5, 60px);
      gap: 12px;
      width: fit-content;
      margin: 0 auto;
      padding: 20px 10px;
      align-items: end;
      justify-items: center;
      justify-content: center;
    `;

    frequencies.forEach((freq, idx) => {
      const band = this.eqBands[idx];
      const initialValue = band ? band.gain.value : 0;

      const bandDiv = document.createElement("div");
      bandDiv.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      `;

      // Value display
      const valueSpan = document.createElement("span");
      valueSpan.className = "eq-value-display";
      valueSpan.textContent =
        initialValue > 0
          ? "+" + initialValue.toFixed(1)
          : initialValue.toFixed(1);
      valueSpan.style.cssText = `
        font-size: 0.75rem;
        color: var(--accent);
        font-weight: 600;
        min-width: 40px;
        text-align: center;
        height: 16px;
      `;

      // Vertical slider with better styling
      const input = document.createElement("input");
      input.type = "range";
      input.className = "eq-slider-vertical";
      input.id = `eq-slider-${idx}`;
      input.min = "-10";
      input.max = "10";
      input.step = "0.1";
      input.value = initialValue;
      input.style.cssText = `
        height: 120px;
        width: 32px;
        margin: 0;
        cursor: pointer;
        accent-color: var(--accent);
      `;

      // Event listener with modal title update
      input.addEventListener("input", (e) => {
        const value = parseFloat(e.target.value);
        if (this.eqBands[idx]) {
          this.eqBands[idx].gain.value = value;
        }
        valueSpan.textContent =
          value > 0 ? "+" + value.toFixed(1) : value.toFixed(1);

        // Check if we've modified from the preset
        if (this.currentEQPreset !== "custom") {
          this.currentEQPreset = "custom";
          const presetSelected = document.getElementById(
            "eq-dropdown-selected",
          );
          if (presetSelected) {
            presetSelected.textContent = "Personalizzato ✎";
          }
        }
      });

      // Frequency label
      const labelDiv = document.createElement("div");
      labelDiv.textContent = labels[idx];
      labelDiv.style.cssText = `
        font-size: 0.7rem;
        color: var(--text-tertiary);
        text-align: center;
        width: 100%;
      `;

      bandDiv.appendChild(valueSpan);
      bandDiv.appendChild(input);
      bandDiv.appendChild(labelDiv);
      sliderGrid.appendChild(bandDiv);
    });

    container.appendChild(sliderGrid);
  }

  initProgressBar() {
    const container = document.getElementById("progress-bar-container");
    let isDragging = false;

    const seek = (e) => {
      const rect = container.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      if (this.audio.duration) {
        this.audio.currentTime = percent * this.audio.duration;
      }
      this.updateProgressBar();
    };

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      seek(e);
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) seek(e);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  initVolumeControl() {
    const slider =
      document.getElementById("volume-slider-container") ||
      document.querySelector(".volume-slider-container");
    const btnVolume = document.getElementById("btn-volume");
    let isDragging = false;

    if (!slider) return;

    const setVolume = (e) => {
      const rect = slider.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      this.volume = percent;
      this.isMuted = false;
      this.audio.volume = percent;
      this.audio.muted = false;
      this.updateVolumeUI();
    };

    slider.addEventListener("mousedown", (e) => {
      isDragging = true;
      setVolume(e);
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) setVolume(e);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    btnVolume.addEventListener("click", () => {
      this.toggleMute();
    });
  }

  initEqualizer() {
    this.eqCanvas = document.getElementById("equalizer-canvas");
    this.eqCtx = this.eqCanvas ? this.eqCanvas.getContext("2d") : null;
    this.eqBars = Array(8).fill(0);

    // Initialize Web Audio on first audio play (browser requirement for AudioContext)
    this.audio.addEventListener(
      "play",
      () => {
        if (!this.audioCtx) {
          this.initWebAudio();
        }
      },
      { once: false },
    );

    this.animateEqualizer();
  }

  initWebAudio() {
    if (this.audioCtx) {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx
          .resume()
          .catch((e) => console.warn("AudioContext resume failed:", e));
      }
      return;
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      console.error("Web Audio API not supported:", e);
      return;
    }

    this.source = this.audioCtx.createMediaElementSource(this.audio);

    // Graphic EQ (5 bands)
    const frequencies = [60, 230, 910, 3600, 14000];
    this.eqBands = frequencies.map((freq) => {
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = freq;
      filter.Q.value = 1;
      filter.gain.value = 0;
      return filter;
    });

    // Panner
    this.pannerNode = this.audioCtx.createStereoPanner();

    // Analyzer
    this.analyzer = this.audioCtx.createAnalyser();
    this.analyzer.fftSize = 64; // Small fft for our 8 bars UI
    this.analyzerData = new Uint8Array(this.analyzer.frequencyBinCount);

    // Routing: source -> EQ bands -> Panner -> Analyzer -> destination
    let lastNode = this.source;
    this.eqBands.forEach((band) => {
      lastNode.connect(band);
      lastNode = band;
    });

    lastNode.connect(this.pannerNode);
    this.pannerNode.connect(this.analyzer);
    this.analyzer.connect(this.audioCtx.destination);

    this.animate8D();
  }

  animate8D() {
    if (this.is8DActive && this.pannerNode && this.isPlaying) {
      this.pannerAngle += 0.02; // Speed of 8D rotation
      // Pan back and forth between -1 and 1
      this.pannerNode.pan.value = Math.sin(this.pannerAngle);
    } else if (this.pannerNode && !this.is8DActive) {
      this.pannerNode.pan.value = 0;
    }
    requestAnimationFrame(() => this.animate8D());
  }

  setEQBand(index, gainValue) {
    if (this.eqBands[index]) {
      this.eqBands[index].gain.value = gainValue;
    }
  }

  toggle8DAudio() {
    this.is8DActive = !this.is8DActive;
    return this.is8DActive;
  }

  toggleKaraoke() {
    this.isKaraokeActive = !this.isKaraokeActive;
    if (!this.audioCtx) return this.isKaraokeActive;

    if (this.isKaraokeActive) {
      // Basic OOPS (Out Of Phase Stereo) vocal remover
      if (!this.karaokeNodes) {
        const splitter = this.audioCtx.createChannelSplitter(2);
        const merger = this.audioCtx.createChannelMerger(2);
        const gainL = this.audioCtx.createGain();
        const gainR = this.audioCtx.createGain();
        const finalGain = this.audioCtx.createGain();

        // Invert phase of right channel
        gainR.gain.value = -1;

        // Output left to both, inverted right to both to cancel center
        splitter.connect(gainL, 0); // left
        splitter.connect(gainR, 1); // right

        gainL.connect(merger, 0, 0);
        gainL.connect(merger, 0, 1);
        gainR.connect(merger, 0, 0);
        gainR.connect(merger, 0, 1);

        merger.connect(finalGain);
        this.karaokeNodes = { splitter, finalGain };
      }

      // Route: Panner -> Splitter ... -> finalGain -> Analyzer
      this.pannerNode.disconnect(this.analyzer);
      this.pannerNode.connect(this.karaokeNodes.splitter);
      this.karaokeNodes.finalGain.connect(this.analyzer);
    } else {
      if (this.karaokeNodes) {
        this.pannerNode.disconnect(this.karaokeNodes.splitter);
        this.karaokeNodes.finalGain.disconnect(this.analyzer);
      }
      this.pannerNode.connect(this.analyzer);
    }

    return this.isKaraokeActive;
  }

  async togglePiP() {
    this.isElectronPiP = !this.isElectronPiP;
    const overlay = document.getElementById("mini-player-overlay");

    if (this.isElectronPiP) {
      // Show mini-player overlay
      overlay.style.display = "flex";
      document.body.classList.add("mini-player");

      // Sync current track info
      this.syncMiniPlayer();

      // Wire mini-player controls (only once)
      if (!this._miniPlayerWired) {
        this._miniPlayerWired = true;

        document
          .getElementById("mini-btn-play")
          .addEventListener("click", () => this.togglePlay());
        document
          .getElementById("mini-btn-prev")
          .addEventListener("click", () => this.previous());
        document
          .getElementById("mini-btn-next")
          .addEventListener("click", () => this.next());
        document
          .getElementById("mini-btn-close")
          .addEventListener("click", () => this.togglePiP());

        // Mini progress bar seek
        const miniProgress = document.getElementById(
          "mini-player-progress-container",
        );
        miniProgress.addEventListener("click", (e) => {
          const rect = miniProgress.getBoundingClientRect();
          const percent = Math.max(
            0,
            Math.min(1, (e.clientX - rect.left) / rect.width),
          );
          if (this.audio.duration) {
            this.audio.currentTime = percent * this.audio.duration;
          }
        });
      }

      // Tell Electron to resize + alwaysOnTop
      if (window.electronAPI && window.electronAPI.togglePiP) {
        window.electronAPI.togglePiP(true);
      }
    } else {
      // Hide mini-player overlay
      overlay.style.display = "none";
      document.body.classList.remove("mini-player");

      // Restore Electron window
      if (window.electronAPI && window.electronAPI.togglePiP) {
        window.electronAPI.togglePiP(false);
      }
    }
  }

  syncMiniPlayer() {
    if (!this.currentTrack) return;
    const cover = this.getTrackCover(this.currentTrack);
    const coverEl = document.getElementById("mini-player-cover");
    coverEl.innerHTML = `<img src="${cover}" alt="${this.currentTrack.title}" />`;
    document.getElementById("mini-player-title").textContent =
      this.currentTrack.title;
    document.getElementById("mini-player-artist").textContent =
      this.currentTrack.artist;

    // Sync play button icon
    const playIcon = document
      .getElementById("mini-btn-play")
      ?.querySelector(".material-icons-round");
    if (playIcon)
      playIcon.textContent = this.isPlaying ? "pause" : "play_arrow";
  }

  updateMiniPlayerProgress() {
    if (!this.isElectronPiP) return;
    const fill = document.getElementById("mini-player-progress-fill");
    if (fill && this.audio.duration) {
      fill.style.width =
        (this.audio.currentTime / this.audio.duration) * 100 + "%";
    }
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

      if (this.analyzer && this.isPlaying) {
        this.analyzer.getByteFrequencyData(this.analyzerData);
        // Map 32 bins to 8 bars
        for (let i = 0; i < 8; i++) {
          const startBin = i * 3;
          let sum = 0;
          for (let j = 0; j < 3; j++)
            sum += this.analyzerData[startBin + j] || 0;
          const avg = sum / 3;
          // Scale to height
          this.eqBars[i] = (avg / 255) * h;
        }
      } else {
        // Fallback or idle animation
        for (let i = 0; i < 8; i++) {
          this.eqBars[i] *= 0.9;
        }
      }

      for (let i = 0; i < 8; i++) {
        const barH = Math.max(2, this.eqBars[i]);
        const x = i * (barWidth + gap);
        const y = h - barH;

        const gradient = ctx.createLinearGradient(x, y, x, h);
        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue("--accent").trim() || "#6c5ce7";
        const accentSecondary =
          style.getPropertyValue("--accent-secondary").trim() || "#a29bfe";
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
    if (track.cover) return track.cover;
    if (!this.coverCache[track.id]) {
      this.coverCache[track.id] = generateCoverGradient(track.color || "#333");
    }
    return this.coverCache[track.id];
  }

  async loadTrack(track, autoplay = true) {
    this.currentTrack = track;

    // Resolve YouTube streams at playback time so the URL doesn't expire
    if (
      track.isYoutube &&
      window.electronAPI &&
      window.electronAPI.getStreamUrl
    ) {
      try {
        let streamUrl = this.streamCache.get(track.videoId);
        if (!streamUrl) {
          const quality =
            localStorage.getItem("sw_settings_quality") || "bestaudio";
          streamUrl = await window.electronAPI.getStreamUrl(
            track.videoId,
            quality,
          );
        }
        if (streamUrl) {
          track.src = streamUrl;
        } else {
          console.error("YTDL returned null stream");
          if (window.nekotune && window.nekotune.showToast) {
            window.nekotune.showToast(
              "Brano bloccato per limiti d'età o non disponibile.",
              true,
            );
          }
          this.pause();
          setTimeout(() => this.next(), 2000);
          return;
        }
      } catch (e) {
        console.error("Failed to extract YouTube stream:", e);
        if (window.nekotune && window.nekotune.showToast) {
          window.nekotune.showToast(
            "Errore durante l'estrazione del brano.",
            true,
          );
        }
        this.pause();
        setTimeout(() => this.next(), 2000);
        return;
      }
    }

    // Prefetch the next track URL to eliminate load times seamlessly
    this.prefetchNextTrack();

    // Check if track is cached offline
    try {
      const cachedBlob = await storage.getTrack(track.id);
      if (cachedBlob) {
        this.audio.src = URL.createObjectURL(cachedBlob);
      } else {
        if (!navigator.onLine) {
          if (window.nekotune && window.nekotune.showToast) {
            window.nekotune.showToast(
              "Impossibile riprodurre: questo brano non è scaricato e sei offline.",
              true,
            );
          }
          return;
        }
        this.audio.src = track.src;
      }
    } catch (e) {
      console.error("Storage error:", e);
      this.audio.src = track.src || "";
    }

    this.audio.load();

    // Update UI
    const cover = this.getTrackCover(track);
    const playerCover = document.getElementById("player-cover");
    playerCover.innerHTML = `<img src="${cover}" alt="${track.title}" />`;
    document.getElementById("player-track-name").textContent = track.title;
    document.getElementById("player-track-artist").textContent = track.artist;

    // Update document title
    document.title = `${track.title} — ${track.artist} | Nekotune`;

    // Update favorite button
    this.updateFavoriteButton();

    this.updateMediaSession(track);

    if (autoplay) {
      this.play();
    }

    this.syncMiniPlayer();

    if (this.onTrackChange) this.onTrackChange(track);

    // Check if queue is running low
    if (this.onQueueLow && this.queue.length - this.currentIndex <= 3) {
      this.onQueueLow();
    }
  }

  updateMediaSession(track) {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album || "Nekotune",
        artwork: [
          // Since our cover is a data URI gradient, it works as an image
          {
            src: this.getTrackCover(track),
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => this.play());
      navigator.mediaSession.setActionHandler("pause", () => this.pause());
      navigator.mediaSession.setActionHandler("previoustrack", () =>
        this.previous(),
      );
      navigator.mediaSession.setActionHandler("nexttrack", () => this.next());
    }
  }

  notifyDiscord() {
    if (!window.electronAPI || !window.electronAPI.updateDiscord) return;
    if (!this.currentTrack) {
      window.electronAPI.updateDiscord({
        details: "Sfoglia la libreria",
        state: "Nekotune Desktop",
      });
      return;
    }

    // A valid Audio element has duration once loaded; handle cases where it isn't fully loaded yet
    const current = this.audio.currentTime || 0;
    const total =
      this.audio.duration && !isNaN(this.audio.duration)
        ? this.audio.duration
        : this.currentTrack.duration || 0;

    window.electronAPI.updateDiscord({
      details: this.currentTrack.title,
      state: `Di ${this.currentTrack.artist}`,
      playing: this.isPlaying,
      currentTime: current,
      totalDuration: total,
      imageUrl: this.currentTrack.thumbnail,
    });
  }

  play() {
    if (!this.currentTrack) return;

    // Init audio ctx on first user gesture
    this.initWebAudio();

    const promise = this.audio.play();
    if (promise) {
      promise.catch((err) => console.warn("Playback prevented:", err));
    }
    this.isPlaying = true;
    document
      .getElementById("btn-play")
      .querySelector(".material-icons-round").textContent = "pause";
    this.syncMiniPlayer();
    if (this.onPlayStateChange) this.onPlayStateChange(true);
    this.notifyDiscord();
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    document
      .getElementById("btn-play")
      .querySelector(".material-icons-round").textContent = "play_arrow";
    this.syncMiniPlayer();
    if (this.onPlayStateChange) this.onPlayStateChange(false);
    this.notifyDiscord();
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
    if (this.repeatMode === "one") {
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
    this.currentIndex =
      (this.currentIndex - 1 + this.queue.length) % this.queue.length;
    this.loadTrack(this.queue[this.currentIndex]);
  }

  handleTrackEnd() {
    if (this.repeatMode === "one") {
      this.audio.currentTime = 0;
      this.play();
    } else if (
      this.currentIndex < this.queue.length - 1 ||
      this.repeatMode === "all"
    ) {
      this.next();
    } else {
      this.pause();
      this.audio.currentTime = 0;
    }
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    const btn = document.getElementById("btn-shuffle");
    btn.classList.toggle("active", this.isShuffle);

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
      this.currentIndex = this.queue.findIndex(
        (t) => t.id === currentTrack?.id,
      );
    }
    if (this.onQueueChange) this.onQueueChange();
  }

  toggleRepeat() {
    const modes = ["none", "all", "one"];
    const idx = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(idx + 1) % modes.length];

    const btn = document.getElementById("btn-repeat");
    const icon = btn.querySelector(".material-icons-round");
    btn.classList.toggle("active", this.repeatMode !== "none");
    icon.textContent = this.repeatMode === "one" ? "repeat_one" : "repeat";
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
    const fill = document.getElementById("progress-bar-fill");
    const current = document.getElementById("player-time-current");
    if (this.audio.duration) {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      fill.style.width = percent + "%";
      current.textContent = formatTime(this.audio.currentTime);
    }
  }

  updateVolumeUI() {
    const fill = document.getElementById("volume-slider-fill");
    const icon = document
      .getElementById("btn-volume")
      .querySelector(".material-icons-round");

    const vol = this.isMuted ? 0 : this.volume;
    fill.style.width = vol * 100 + "%";

    if (this.isMuted || vol === 0) {
      icon.textContent = "volume_off";
    } else if (vol < 0.5) {
      icon.textContent = "volume_down";
    } else {
      icon.textContent = "volume_up";
    }
  }

  updateFavoriteButton() {
    const btn = document.getElementById("btn-favorite-current");
    if (!btn || !this.currentTrack) return;
    const favorites = JSON.parse(localStorage.getItem("sw_favorites") || "[]");
    const isFav = favorites.some(
      (t) => (typeof t === "string" ? t : t.id) === this.currentTrack.id,
    );
    btn.classList.toggle("is-favorite", isFav);
    btn.querySelector(".material-icons-round").textContent = isFav
      ? "favorite"
      : "favorite_border";
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

  // Pre-fetch the URL of the next YouTube song to ensure instant playback without UI freeze
  async prefetchNextTrack() {
    if (
      !this.queue ||
      this.currentIndex === -1 ||
      this.currentIndex >= this.queue.length - 1
    )
      return;

    const nextTrack = this.queue[this.currentIndex + 1];
    if (
      nextTrack &&
      nextTrack.isYoutube &&
      window.electronAPI &&
      window.electronAPI.getStreamUrl
    ) {
      if (!this.streamCache.has(nextTrack.videoId)) {
        try {
          const streamUrl = await window.electronAPI.getStreamUrl(
            nextTrack.videoId,
          );
          if (streamUrl) {
            this.streamCache.set(nextTrack.videoId, streamUrl);

            // Clean up cache to prevent memory bloating over long sessions
            if (this.streamCache.size > 10) {
              const firstKey = this.streamCache.keys().next().value;
              this.streamCache.delete(firstKey);
            }
          }
        } catch (e) {
          console.error("Prefetch next track failed", e);
        }
      }
    }
  }

  addToQueue(track) {
    this.queue.push(track);
    if (this.onQueueChange) this.onQueueChange();
  }

  getQueue() {
    return {
      tracks: this.queue,
      currentIndex: this.currentIndex,
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

  setupSaveEQModal() {
    const btnSave = document.getElementById("btn-save-custom-eq");
    const saveModal = document.getElementById("save-eq-modal");
    const btnCloseSaveEQ = document.getElementById("btn-close-save-eq");
    const btnCancelSaveEQ = document.getElementById("btn-cancel-save-eq");
    const btnConfirmSaveEQ = document.getElementById("btn-confirm-save-eq");
    const inputName = document.getElementById("custom-eq-name");

    if (!btnSave || !saveModal) return;

    btnSave.addEventListener("click", () => {
      inputName.value = "";
      saveModal.style.display = "flex";
      saveModal.offsetHeight;
      saveModal.classList.add("visible");
      inputName.focus();
    });

    btnCloseSaveEQ.addEventListener("click", () => {
      saveModal.classList.remove("visible");
      setTimeout(() => (saveModal.style.display = "none"), 300);
    });

    btnCancelSaveEQ.addEventListener("click", () => {
      saveModal.classList.remove("visible");
      setTimeout(() => (saveModal.style.display = "none"), 300);
    });

    btnConfirmSaveEQ.addEventListener("click", () => {
      const presetName = inputName.value.trim();

      if (!presetName) {
        alert("Inserisci un nome per il preset");
        return;
      }

      if (presetName.length > 20) {
        alert("Il nome deve avere massimo 20 caratteri");
        return;
      }

      // Get current EQ gains
      const gains = this.eqBands.map((band) => band.gain.value);

      // Save to localStorage
      this.saveCustomEQPreset(
        presetName.toLowerCase().replace(/\s+/g, "_"),
        gains,
      );

      // Add to dropdown
      const dropdown = document.getElementById("eq-dropdown-options");
      const newOption = document.createElement("div");
      newOption.className = "dropdown-option";
      newOption.setAttribute(
        "data-value",
        presetName.toLowerCase().replace(/\s+/g, "_"),
      );
      newOption.textContent = presetName;
      newOption.addEventListener("click", (e) => {
        e.stopPropagation();
        this.applyEQPreset(presetName.toLowerCase().replace(/\s+/g, "_"));
        document
          .getElementById("eq-custom-dropdown")
          .classList.remove("active");
      });
      dropdown.appendChild(newOption);

      // Apply the preset
      this.applyEQPreset(presetName.toLowerCase().replace(/\s+/g, "_"));

      // Close modal
      saveModal.classList.remove("visible");
      setTimeout(() => (saveModal.style.display = "none"), 300);

      // Show success message
      if (window.nekotune && window.nekotune.showToast) {
        window.nekotune.showToast(
          `Preset "${presetName}" salvato con successo!`,
        );
      }
    });

    // Allow Enter key to confirm
    inputName.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        btnConfirmSaveEQ.click();
      }
    });

    // Close modal when clicking outside
    saveModal.addEventListener("click", (e) => {
      if (e.target === saveModal) {
        saveModal.classList.remove("visible");
        setTimeout(() => (saveModal.style.display = "none"), 300);
      }
    });

    // Delete custom EQ preset
    const btnDelete = document.getElementById("btn-delete-custom-eq");
    if (btnDelete) {
      btnDelete.addEventListener("click", () => {
        const presetName = this.currentEQPreset;
        // Usa il modal custom invece di confirm
        this.showConfirmDialog(
          `Sei sicuro di voler eliminare il preset "${presetName}"?`,
          () => {
            // Delete from localStorage
            const custom = localStorage.getItem("sw_eq_custom_presets");
            if (custom) {
              const customPresets = JSON.parse(custom);
              delete customPresets[presetName];
              localStorage.setItem(
                "sw_eq_custom_presets",
                JSON.stringify(customPresets),
              );
            }
            // Delete from eqPresets object
            delete this.eqPresets[presetName];
            // Remove from dropdown
            const dropdown = document.getElementById("eq-dropdown-options");
            const optionToDelete = dropdown.querySelector(
              `[data-value="${presetName}"]`,
            );
            if (optionToDelete) {
              optionToDelete.remove();
            }
            // Reset to Flat
            this.applyEQPreset("flat");
            // Hide delete button
            btnDelete.style.display = "none";
            // Show success message
            if (window.nekotune && window.nekotune.showToast) {
              window.nekotune.showToast(
                `Preset "${presetName}" eliminato con successo!`,
              );
            }
          },
          () => {}, // onCancel
        );
      });
    }
  }

  // Mostra un modal di conferma custom, stile NekoTune
  showConfirmDialog(message, onConfirm, onCancel) {
    // Se esiste già, rimuovi
    let old = document.getElementById("nt-confirm-modal");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "nt-confirm-modal";
    overlay.className = "modal-overlay nt-eq-confirm";

    const modal = document.createElement("div");
    modal.className = "modal-content nt-eq-confirm-content";

    const title = document.createElement("h3");
    title.textContent = "Elimina preset";

    const msg = document.createElement("div");
    msg.className = "nt-eq-confirm-message";
    msg.textContent = message;

    const btnRow = document.createElement("div");
    btnRow.className = "modal-actions nt-eq-confirm-actions";

    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Annulla";
    btnCancel.className = "btn-cancel nt-eq-confirm-cancel";
    btnCancel.onclick = () => {
      overlay.remove();
      if (onCancel) onCancel();
    };

    const btnOk = document.createElement("button");
    btnOk.textContent = "OK";
    btnOk.className = "btn-confirm nt-eq-confirm-ok";
    btnOk.onclick = () => {
      overlay.remove();
      if (onConfirm) onConfirm();
    };

    btnRow.appendChild(btnCancel);
    btnRow.appendChild(btnOk);
    modal.appendChild(title);
    modal.appendChild(msg);
    modal.appendChild(btnRow);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add("visible"));

    // Focus automatico su OK
    setTimeout(() => btnOk.focus(), 10);

    // Chiudi con ESC
    overlay.tabIndex = -1;
    overlay.focus();
    overlay.onkeydown = (e) => {
      if (e.key === "Escape") {
        overlay.remove();
        if (onCancel) onCancel();
      }
    };
  }
}

export default Player;
