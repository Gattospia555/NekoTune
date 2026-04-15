// Nekotune — Music Player Engine
import { DEMO_TRACKS, formatTime, generateCoverGradient } from './data.js';
import { storage } from './storage.js';

class Player {
  constructor() {
    this.audioA = document.getElementById('audio-player');
    this.audioB = new Audio();
    this.audioB.crossOrigin = 'anonymous';
    this.audio = this.audioA;
    
    this.fadeIntervalA = null;
    this.fadeIntervalB = null;
    this.currentTrack = null;
    this.currentIndex = -1;
    this.queue = [];
    this.originalQueue = [];
    this.streamCache = new Map(); // Add a stream URL cache for faster playback
    this.isPlaying = false;
    this.isShuffle = false;
    this.repeatMode = 'none'; // none, all, one
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

  togglePiP() {
    this.isPiP = !this.isPiP;
    const btn = document.getElementById('btn-mini-player');
    if (btn) btn.classList.toggle('active', this.isPiP);

    const overlay = document.getElementById('mini-player-overlay');

    if (window.electronAPI && window.electronAPI.togglePiP) {
       window.electronAPI.togglePiP(this.isPiP);
    }
    
    if (this.isPiP) {
       if (overlay) overlay.style.display = 'flex';
       document.body.classList.add('pip-mode');
       this.updateMiniPlayerInfo();
    } else {
       if (overlay) overlay.style.display = 'none';
       document.body.classList.remove('pip-mode');
    }
  }

  updateMiniPlayerInfo() {
    const track = this.currentTrack;
    const titleEl = document.getElementById('mini-player-title');
    const artistEl = document.getElementById('mini-player-artist');
    const coverEl = document.getElementById('mini-player-cover');
    const playBtn = document.getElementById('mini-btn-play');

    if (titleEl) titleEl.textContent = track ? track.title : 'Nessun brano';
    if (artistEl) artistEl.textContent = track ? track.artist : '\u2014';
    
    if (coverEl && track) {
      const coverUrl = this.getTrackCover(track);
      coverEl.innerHTML = `<img src="${coverUrl}" alt="${track.title}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
    }

    if (playBtn) {
      playBtn.querySelector('.material-icons-round').textContent = this.isPlaying ? 'pause' : 'play_arrow';
    }
  }

  updateMiniPlayerProgress() {
    if (!this.isPiP) return;
    const fill = document.getElementById('mini-player-progress-fill');
    if (fill && this.audio && this.audio.duration) {
      const pct = (this.audio.currentTime / this.audio.duration) * 100;
      fill.style.width = `${pct}%`;
    }
    // Also keep play button in sync
    const playBtn = document.getElementById('mini-btn-play');
    if (playBtn) {
      playBtn.querySelector('.material-icons-round').textContent = this.isPlaying ? 'pause' : 'play_arrow';
    }
  }

  attachAudioListeners(audioEl) {
    audioEl.addEventListener('timeupdate', () => {
      if (this.audio !== audioEl) return; // Ignore background fading out audio
      
      this.updateProgressBar();
      this.updateMiniPlayerProgress();
      if (this.onTimeUpdate) this.onTimeUpdate(audioEl.currentTime, audioEl.duration);

      // Check crossfade trigger
      const crossTime = window.SettingsManager ? window.SettingsManager.getCrossfadeTime() : 5;
      if (!this.crossfading && crossTime > 0 && audioEl.duration > crossTime * 2) {
         const timeLeft = audioEl.duration - audioEl.currentTime;
         if (timeLeft > 0 && timeLeft <= crossTime && this.queue.length > 0 && this.currentIndex < this.queue.length - 1) {
             this.crossfading = true;
             this.triggerCrossfadeNext(crossTime);
         }
      }
    });

    audioEl.addEventListener('ended', () => {
      if (this.audio === audioEl && !this.crossfading) {
        this.handleTrackEnd();
      }
    });

    audioEl.addEventListener('loadedmetadata', () => {
      if (this.audio === audioEl) {
        document.getElementById('player-time-total').textContent = formatTime(audioEl.duration);
      }
    });

    audioEl.addEventListener('error', () => {
      if (this.audio === audioEl) console.warn('Audio failed to load');
    });
  }

  triggerCrossfadeNext(fadeTime) {
      // Manual next to prep second audio
      this.currentIndex = (this.currentIndex + 1) % this.queue.length;
      
      const outgoingAudio = this.audio;
      // Swap audio
      this.audio = (this.audio === this.audioA) ? this.audioB : this.audioA;
      
      const incomingAudio = this.audio;
      const targetVolume = this.volume;
      incomingAudio.volume = 0;
      
      // Load and play incoming track silently
      this.loadTrack(this.queue[this.currentIndex], true, true);
      
      // Execute the volume transition linearly over 50 steps
      const steps = 50;
      const intervalMs = (fadeTime * 1000) / steps;
      let currentStep = 0;
      
      if(this.fadeInterval) clearInterval(this.fadeInterval);
      this.fadeInterval = setInterval(() => {
          currentStep++;
          const ratio = currentStep / steps; // 0 to 1
          
          if (!this.isMuted) {
             try {
                outgoingAudio.volume = Math.max(0, targetVolume * (1 - ratio));
                incomingAudio.volume = Math.min(targetVolume, targetVolume * ratio);
             } catch(e) {}
          }
          
          if (currentStep >= steps) {
             clearInterval(this.fadeInterval);
             outgoingAudio.pause();
             outgoingAudio.currentTime = 0;
             
          }
      }, intervalMs);
  }


  initAudio() {
    this.attachAudioListeners(this.audioA);
    this.attachAudioListeners(this.audioB);
  }

  initControls() {

    document.getElementById('btn-play').addEventListener('click', () => this.togglePlay());
    document.getElementById('btn-prev').addEventListener('click', () => this.previous());
    document.getElementById('btn-next').addEventListener('click', () => this.next());
    document.getElementById('btn-shuffle').addEventListener('click', () => this.toggleShuffle());
    document.getElementById('btn-repeat').addEventListener('click', () => this.toggleRepeat());
    
    const btn8D = document.getElementById('btn-8d-audio');
    if (btn8D) {
      btn8D.addEventListener('click', () => {
        const isActive = this.toggle8DAudio();
        btn8D.classList.toggle('active', isActive);
      });
    }

    const btnKaraoke = document.getElementById('btn-karaoke');
    if (btnKaraoke) {
      btnKaraoke.addEventListener('click', () => {
        const isActive = this.toggleKaraoke();
        btnKaraoke.classList.toggle('active', isActive);
      });
    }

    const btnPip = document.getElementById('btn-mini-player');
    if (btnPip) {
      btnPip.addEventListener('click', () => this.togglePiP());
    }

    this.initEQUI();
  }

  initEQUI() {
    const btnEQ = document.getElementById('btn-eq');
    const modal = document.getElementById('eq-modal');
    const btnClose = document.getElementById('btn-close-eq');
    const btnReset = document.getElementById('btn-reset-eq');
    const container = document.getElementById('eq-container');
    const presetDropdown = document.getElementById('eq-custom-dropdown');
    const presetSelected = document.getElementById('eq-dropdown-selected');
    const presetOptions = document.querySelectorAll('#eq-dropdown-options .dropdown-option');

    if (!btnEQ || !modal || !container) return;
    const eqPresets = {
      flat:           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      acoustic:       [5.1, 5.1, 3.8, 1.2, 1.2, 1.2, 3.8, 5.1, 3.8, 2.5],
      bass_booster:   [6.3, 5.1, 4.0, 2.5, 1.2, 0, 0, 0, 0, 0],
      bass_reducer:   [-5.1, -4.0, -2.5, -1.2, 0, 0, 0, 0, 0, 0],
      classical:      [5.1, 3.8, 2.5, 0, 0, 0, 2.5, 3.8, 5.1, 6.3],
      dance:          [7.6, 6.3, 3.8, 0, 0, 0, 2.5, 3.8, 5.1, 5.1],
      electronic:     [6.3, 5.1, 2.5, 0, 0, 0, 0, 2.5, 5.1, 6.3],
      hiphop:         [6.3, 5.1, 2.5, 1.2, -1.2, -1.2, 1.2, 2.5, 3.8, 5.1],
      jazz:           [5.1, 3.8, 2.5, 1.2, -1.2, -1.2, 0, 1.2, 3.8, 5.1],
      pop:            [-1.2, -1.2, 0, 2.5, 5.1, 5.1, 2.5, 0, -1.2, -1.2],
      rock:           [6.3, 5.1, 3.8, 1.2, -1.2, -1.2, 1.2, 3.8, 5.1, 6.3],
      vocal_booster:  [-1.2, -1.2, 0, 2.5, 5.1, 5.1, 3.8, 1.2, 0, -1.2]
    };
    // --- LOAD CUSTOM EQUALIZER PRESETS ---
    let customPresets = {};
    try {
      const stored = localStorage.getItem('nekotune_custom_eq');
      if (stored) customPresets = JSON.parse(stored);
    } catch (e) {}

    // Add them to the preset engine
    Object.keys(customPresets).forEach(key => {
      eqPresets[key] = customPresets[key].values;
    });
    
    // Inject them into the HTML dropdown
    const optionsContainer = document.getElementById('eq-dropdown-options');
    if (optionsContainer && Object.keys(customPresets).length > 0) {
      Object.keys(customPresets).forEach(key => {
        const customObj = customPresets[key];
        const newOpt = document.createElement('div');
        newOpt.className = 'dropdown-option custom-eq-option';
        newOpt.dataset.value = key;
        newOpt.textContent = customObj.name;
        // Insert after 'Flat'
        optionsContainer.insertBefore(newOpt, optionsContainer.children[1]);
      });
    }

    if (presetDropdown && presetSelected && presetOptions) {
      presetDropdown.addEventListener('click', (e) => {
        // Prevent event from bubbling so document click listener won't immediately close it
        e.stopPropagation();
        presetDropdown.classList.toggle('active');
      });
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!presetDropdown.contains(e.target)) {
          presetDropdown.classList.remove('active');
        }
      });
      presetOptions.forEach(option => {
        option.addEventListener('click', (e) => {
          const selected = e.target.getAttribute('data-value');
          if (selected !== 'custom') {
            presetSelected.textContent = e.target.textContent;
          } else {
            presetSelected.textContent = 'Modificato';
          }
          if (selected === 'custom') return;
          const gains = eqPresets[selected] || eqPresets.flat;
          if (this.eqBands && this.eqBands.length === 10) {
            this.eqBands.forEach((band, idx) => {
              band.gain.value = gains[idx];
              const slider = document.getElementById(`eq-slider-${idx}`);
              if (slider) {
                slider.value = gains[idx];
                // Fire input event to update label visually in case we need it
                slider.dispatchEvent(new Event('input'));
              }
            });
          }
          presetDropdown.classList.remove('active');
        });
      });
    }

    // --- Custom EQ Presets Logic ---
    const btnSaveEq = document.getElementById('btn-save-eq');
    if (btnSaveEq) {
      btnSaveEq.addEventListener('click', () => {
        const name = prompt('Inserisci il nome del tuo preset personalizzato:');
        if (!name || name.trim() === '') return;
        
        const cleanName = name.trim();
        const optionId = 'custom_' + Date.now();
        
        // Grab current gains
        const currentGains = [];
        if (this.eqBands && this.eqBands.length === 10) {
          this.eqBands.forEach((band) => currentGains.push(band.gain.value));
        } else {
          return;
        }
        
        // Add to eqPresets object
        if (typeof eqPresets !== 'undefined') {
          eqPresets[optionId] = currentGains;
        }

        // Save to localStorage
        let customPresets = {};
        try {
          const stored = localStorage.getItem('nekotune_custom_eq');
          if (stored) customPresets = JSON.parse(stored);
        } catch (e) {}
        
        customPresets[optionId] = { name: cleanName, values: currentGains };
        localStorage.setItem('nekotune_custom_eq', JSON.stringify(customPresets));
        
        // Add to UI dropdown
        const optionsContainer = document.getElementById('eq-dropdown-options');
        if (optionsContainer) {
          const newOpt = document.createElement('div');
          newOpt.className = 'dropdown-option custom-eq-option';
          newOpt.dataset.value = optionId;
          newOpt.textContent = cleanName;
          
          // Add click listener
          newOpt.addEventListener('click', (e) => {
            const selected = optionId;
            const presetSelected = document.getElementById('eq-dropdown-selected');
            if (presetSelected) presetSelected.textContent = cleanName;
            
            const gains = currentGains;
            if (this.eqBands && this.eqBands.length === 10) {
              this.eqBands.forEach((band, idx) => {
                band.gain.value = gains[idx];
                const slider = document.getElementById(`eq-slider-${idx}`);
                if (slider) {
                  slider.value = gains[idx];
                  slider.dispatchEvent(new Event('input'));
                }
              });
            }
            presetDropdown.classList.remove('active');
          });
          
          // Insert after Flat
          const firstOpt = optionsContainer.children[1];
          if (firstOpt) {
            optionsContainer.insertBefore(newOpt, firstOpt);
          } else {
            optionsContainer.appendChild(newOpt);
          }
        }
        
        // set current selection to new preset
        const presetSelected = document.getElementById('eq-dropdown-selected');
        if (presetSelected) presetSelected.textContent = cleanName;
      });
    }
    btnEQ.addEventListener('click', () => {
      // Create audio context if not created yet so we have bands
      if (!this.audioCtx) this.initWebAudio();
      modal.style.display = 'flex';
      // Force reflow before adding class for smooth transition
      modal.offsetHeight;
      modal.classList.add('visible');
      this.renderEQSliders(container);
    });

    btnClose.addEventListener('click', () => {
      modal.classList.remove('visible');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300); // 300ms matches transition length
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });

    btnReset.addEventListener('click', () => {
      this.eqBands.forEach((band, idx) => {
        band.gain.value = 0;
        const slider = document.getElementById(`eq-slider-${idx}`);
        if (slider) {
           slider.value = 0;
           slider.dispatchEvent(new Event('input'));
        }
      });
      if (presetSelected) presetSelected.textContent = 'Flat';
    });
  }

  renderEQSliders(container) {
    if (container.children.length > 0) return; // Already rendered
    
    container.innerHTML = '';
    const frequencies = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
    const labels = ['31', '62', '125', '250', '500', '1k', '2k', '4k', '8k', '16k'];

    frequencies.forEach((freq, idx) => {
      const band = this.eqBands[idx];
      const div = document.createElement('div');
      div.className = 'eq-band';
      
      // dB value label (above the slider)
      const valueLabel = document.createElement('div');
      valueLabel.className = 'eq-value';
      valueLabel.id = `eq-value-${idx}`;
      const initVal = band ? band.gain.value : 0;
      valueLabel.textContent = (initVal >= 0 ? '+' : '') + initVal.toFixed(1);
      
      const wrapper = document.createElement('div');
      wrapper.className = 'eq-slider-wrapper';
      
      // Helper to update slider fill gradient via CSS variable
      const updateSliderFill = (slider, val) => {
        const pct = ((val + 12) / 24) * 100;
        slider.style.setProperty('--fill-pct', `${pct}%`);
      };
      
      const input = document.createElement('input');
      input.type = 'range';
      input.className = 'eq-slider';
      input.id = `eq-slider-${idx}`;
      input.min = -12;
      input.max = 12;
      input.step = 0.5;
      input.value = band ? band.gain.value : 0;
      updateSliderFill(input, parseFloat(input.value));
      
      input.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (this.eqBands[idx]) {
          this.eqBands[idx].gain.value = val;
        }
        
        updateSliderFill(input, val);
        
        // Update dB value label
        const vLabel = document.getElementById(`eq-value-${idx}`);
        if (vLabel) vLabel.textContent = (val >= 0 ? '+' : '') + val.toFixed(1);
        
        if (e.isTrusted) {
          const selectText = document.getElementById('eq-dropdown-selected');
          if (selectText) selectText.textContent = 'Modificato';
        }
      });
      
      const label = document.createElement('div');
      label.className = 'eq-label';
      label.textContent = labels[idx];
      
      div.appendChild(valueLabel);
      wrapper.appendChild(input);
      div.appendChild(wrapper);
      div.appendChild(label);
      
      container.appendChild(div);
    });
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
      this.audioA.muted = false;
      this.audioB.muted = false;
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

  initWebAudio() {
    if (this.audioCtx) {
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaElementSource(this.audio);

    // Graphic EQ (10 bands)
    const frequencies = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
    this.eqBands = frequencies.map(freq => {
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'peaking';
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

    // Routing
    let lastNode = this.source;
    this.eqBands.forEach(band => {
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
    const overlay = document.getElementById('mini-player-overlay');

    if (this.isElectronPiP) {
      // Show mini-player overlay
      overlay.style.display = 'flex';
      document.body.classList.add('mini-player');

      // Sync current track info
      this.syncMiniPlayer();

      // Wire mini-player controls (only once)
      if (!this._miniPlayerWired) {
        this._miniPlayerWired = true;

        document.getElementById('mini-btn-play').addEventListener('click', () => this.togglePlay());
        document.getElementById('mini-btn-prev').addEventListener('click', () => this.previous());
        document.getElementById('mini-btn-next').addEventListener('click', () => this.next());
        document.getElementById('mini-btn-close').addEventListener('click', () => this.togglePiP());

        // Shuffle
        document.getElementById('mini-btn-shuffle')?.addEventListener('click', () => {
          this.toggleShuffle();
          this.syncMiniPlayer();
        });

        // Repeat
        document.getElementById('mini-btn-repeat')?.addEventListener('click', () => {
          this.toggleRepeat();
          this.syncMiniPlayer();
        });

        // Favorite
        document.getElementById('mini-btn-favorite')?.addEventListener('click', () => {
          if (this.currentTrack && window.nekotune && window.nekotune.playlists) {
            window.nekotune.playlists.toggleFavorite(this.currentTrack);
            this.syncMiniPlayer();
          }
        });

        // Volume slider
        const miniVolSlider = document.getElementById('mini-volume-slider');
        if (miniVolSlider) {
          let volDragging = false;
          const setMiniVol = (e) => {
            const rect = miniVolSlider.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            this.volume = pct;
            this.audio.volume = pct;
            this.audioA.muted = false;
      this.audioB.muted = false;
            this.isMuted = false;
            this.updateVolumeUI();
            document.getElementById('mini-volume-fill').style.width = (pct * 100) + '%';
            const volIcon = document.getElementById('mini-btn-volume')?.querySelector('.material-icons-round');
            if (volIcon) volIcon.textContent = pct === 0 ? 'volume_off' : pct < 0.5 ? 'volume_down' : 'volume_up';
          };
          miniVolSlider.addEventListener('mousedown', (e) => { volDragging = true; setMiniVol(e); });
          document.addEventListener('mousemove', (e) => { if (volDragging) setMiniVol(e); });
          document.addEventListener('mouseup', () => { volDragging = false; });
        }

        // Volume mute toggle
        document.getElementById('mini-btn-volume')?.addEventListener('click', () => {
          this.toggleMute();
          this.syncMiniPlayer();
        });

        // Lyrics toggle
        document.getElementById('mini-btn-lyrics')?.addEventListener('click', () => {
          const panel = document.getElementById('mini-lyrics-panel');
          const btn = document.getElementById('mini-btn-lyrics');
          if (panel) {
            const visible = panel.style.display !== 'none';
            panel.style.display = visible ? 'none' : 'block';
            btn?.classList.toggle('active', !visible);
            if (!visible) {
              // Load and sync lyrics for the mini player
              if (window.nekotune && window.nekotune.lyrics) {
                const lm = window.nekotune.lyrics;
                // If lyrics aren't loaded yet, load them now
                if (!lm.currentLyrics && !lm.plainLyrics && !lm.isFetching) {
                  lm.loadCurrentLyrics();
                }
                lm.startSync();
              }
              this.syncMiniLyrics();
            } else {
              // If the main lyrics panel is also hidden, stop sync
              if (window.nekotune && window.nekotune.lyrics && !window.nekotune.lyrics.isVisible) {
                window.nekotune.lyrics.stopSync();
              }
            }
            // Resize PiP window to fit lyrics
            if (window.electronAPI && window.electronAPI.togglePiP) {
              if (!visible) {
                window.electronAPI.resizePiP && window.electronAPI.resizePiP(360, 500);
              } else {
                window.electronAPI.resizePiP && window.electronAPI.resizePiP(360, 420);
              }
            }
          }
        });

        // Mini progress bar seek
        const miniProgress = document.getElementById('mini-player-progress-container');
        miniProgress.addEventListener('click', (e) => {
          const rect = miniProgress.getBoundingClientRect();
          const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
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
      overlay.style.display = 'none';
      document.body.classList.remove('mini-player');

      // Hide lyrics panel when exiting PiP
      const lyricsPanel = document.getElementById('mini-lyrics-panel');
      if (lyricsPanel) lyricsPanel.style.display = 'none';

      // Restore Electron window
      if (window.electronAPI && window.electronAPI.togglePiP) {
        window.electronAPI.togglePiP(false);
      }
    }
  }

  syncMiniPlayer() {
    if (!this.currentTrack) return;
    const cover = this.getTrackCover(this.currentTrack);
    const coverEl = document.getElementById('mini-player-cover');
    coverEl.innerHTML = `<img src="${cover}" alt="${this.currentTrack.title}" />`;
    document.getElementById('mini-player-title').textContent = this.currentTrack.title;
    document.getElementById('mini-player-artist').textContent = this.currentTrack.artist;

    // Extract dominant color from album art for dynamic background
    this.extractMiniPlayerColor(cover);

    // Sync play button icon
    const playIcon = document.getElementById('mini-btn-play')?.querySelector('.material-icons-round');
    if (playIcon) playIcon.textContent = this.isPlaying ? 'pause' : 'play_arrow';

    // Sync shuffle state
    const shuffleBtn = document.getElementById('mini-btn-shuffle');
    if (shuffleBtn) shuffleBtn.classList.toggle('active', this.isShuffle);

    // Sync repeat state
    const repeatBtn = document.getElementById('mini-btn-repeat');
    if (repeatBtn) {
      repeatBtn.classList.toggle('active', this.repeatMode !== 'none');
      const repeatIcon = repeatBtn.querySelector('.material-icons-round');
      if (repeatIcon) repeatIcon.textContent = this.repeatMode === 'one' ? 'repeat_one' : 'repeat';
    }

    // Sync favorite state
    const favBtn = document.getElementById('mini-btn-favorite');
    if (favBtn && window.nekotune && window.nekotune.playlists) {
      const isFav = window.nekotune.playlists.isFavorite(this.currentTrack.id);
      const favIcon = favBtn.querySelector('.material-icons-round');
      if (favIcon) favIcon.textContent = isFav ? 'favorite' : 'favorite_border';
      favBtn.classList.toggle('active', isFav);
    }

    // Sync volume
    const volFill = document.getElementById('mini-volume-fill');
    if (volFill) volFill.style.width = ((this.isMuted ? 0 : this.volume) * 100) + '%';
    const volIcon = document.getElementById('mini-btn-volume')?.querySelector('.material-icons-round');
    if (volIcon) {
      if (this.isMuted || this.volume === 0) volIcon.textContent = 'volume_off';
      else if (this.volume < 0.5) volIcon.textContent = 'volume_down';
      else volIcon.textContent = 'volume_up';
    }
  }

  extractMiniPlayerColor(coverUrl) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(img, 0, 0, 50, 50);
        const data = ctx.getImageData(0, 0, 50, 50).data;

        // Sample pixels and find dominant color
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
          const pr = data[i], pg = data[i+1], pb = data[i+2];
          // Skip very dark and very bright pixels
          const brightness = (pr + pg + pb) / 3;
          if (brightness > 30 && brightness < 220) {
            r += pr; g += pg; b += pb; count++;
          }
        }

        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
        } else {
          r = 30; g = 24; b = 48; // Fallback purple
        }

        // Darken the color for a premium look
        const dr = Math.round(r * 0.3);
        const dg = Math.round(g * 0.3);
        const db = Math.round(b * 0.3);

        const overlay = document.getElementById('mini-player-overlay');
        if (overlay) {
          overlay.style.background = `linear-gradient(
            145deg,
            rgba(${dr}, ${dg}, ${db}, 0.97) 0%,
            rgba(${Math.round(r*0.2)}, ${Math.round(g*0.2)}, ${Math.round(b*0.2)}, 0.95) 50%,
            rgba(${Math.round(r*0.15)}, ${Math.round(g*0.15)}, ${Math.round(b*0.15)}, 0.93) 100%
          )`;
          overlay.style.transition = 'background 0.8s ease';
        }
      } catch(e) {
        console.warn('Color extraction failed:', e);
      }
    };
    img.src = coverUrl;
  }

  syncMiniLyrics() {
    const content = document.getElementById('mini-lyrics-content');
    if (!content) return;

    // Check if the lyrics engine has synced lyrics loaded
    if (window.nekotune && window.nekotune.lyrics) {
      const lm = window.nekotune.lyrics;
      if (lm.currentLyrics && lm.currentLyrics.length > 0) {
        // Synced lyrics are loaded Ã¢â‚¬â€ the updateHighlight function will handle live updates
        if (lm.activeLine >= 0 && lm.currentLyrics[lm.activeLine]) {
          content.innerHTML = `<div class="lyrics-line active">${lm.currentLyrics[lm.activeLine].text}</div>`;
        } else {
          content.innerHTML = '<p style="color: rgba(255,255,255,0.4); font-style: italic;">In attesa del testo...</p>';
        }
        return;
      } else if (lm.plainLyrics) {
        const lines = lm.plainLyrics.split('\n').slice(0, 2);
        content.innerHTML = lines.map(l => `<div class="lyrics-line lyrics-plain" style="margin:2px 0;">${l}</div>`).join('');
        return;
      }
    }

    // Fallback: try to pull from the main panel
    const mainContent = document.getElementById('lyrics-content');
    if (mainContent && mainContent.textContent.trim() && !mainContent.querySelector('.lyrics-loading')) {
      const activeLine = mainContent.querySelector('.lyrics-line.active');
      if (activeLine) {
        content.innerHTML = `<div class="lyrics-line active">${activeLine.textContent}</div>`;
        return;
      }
    }

    content.innerHTML = '<p style="color: rgba(255,255,255,0.4); font-style: italic;">Nessun testo disponibile</p>';
  }

  updateMiniPlayerProgress() {
    if (!this.isElectronPiP) return;
    const fill = document.getElementById('mini-player-progress-fill');
    if (fill && this.audio.duration) {
      fill.style.width = ((this.audio.currentTime / this.audio.duration) * 100) + '%';
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
          for (let j = 0; j < 3; j++) sum += this.analyzerData[startBin + j] || 0;
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
    if (track.cover) return track.cover;
    if (!this.coverCache[track.id]) {
      this.coverCache[track.id] = generateCoverGradient(track.color || '#333');
    }
    return this.coverCache[track.id];
  }

  async loadTrack(track, autoplay = true, isCrossfade = false) {
    this.currentTrack = track;
    
    // Resolve YouTube streams at playback time so the URL doesn't expire
    if (track.isYoutube && window.electronAPI && window.electronAPI.getStreamUrl) {
      try {
        let streamUrl = this.streamCache.get(track.videoId);
        if (!streamUrl) {
          const quality = localStorage.getItem('sw_settings_quality') || 'bestaudio';
          streamUrl = await window.electronAPI.getStreamUrl(track.videoId, quality);
        }
        if (streamUrl) {
          track.src = streamUrl;
        } else {
          console.error("YTDL returned null stream");
          if (window.nekotune && window.nekotune.showToast) {
            window.nekotune.showToast('Brano bloccato per limiti d\'etÃƒÂ  o non disponibile.', true);
          }
          this.pause();
          setTimeout(() => this.next(), 2000);
          return;
        }
      } catch (e) {
        console.error("Failed to extract YouTube stream:", e);
        if (window.nekotune && window.nekotune.showToast) {
          window.nekotune.showToast('Errore durante l\'estrazione del brano.', true);
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
            window.nekotune.showToast('Impossibile riprodurre: questo brano non ÃƒÂ¨ scaricato e sei offline.', true);
          }
          return;
        }
        this.audio.src = track.src;
      }
    } catch (e) {
      console.error('Storage error:', e);
      this.audio.src = track.src || '';
    }
    
    this.audio.load();

    // Update UI
    const cover = this.getTrackCover(track);
    const playerCover = document.getElementById('player-cover');
    playerCover.innerHTML = `<img src="${cover}" alt="${track.title}" />`;
    document.getElementById('player-track-name').textContent = track.title;
    document.getElementById('player-track-artist').textContent = track.artist;

    // Update document title
    document.title = `${track.title} Ã¢â‚¬â€ ${track.artist} | Nekotune`;

    // Update favorite button
    this.updateFavoriteButton();

    this.updateMediaSession(track);
    
    if (autoplay) {
      this.play();
    }

    this.syncMiniPlayer();

    if (this.onTrackChange) this.onTrackChange(track);
    
    // Check if queue is running low
    if (this.onQueueLow && (this.queue.length - this.currentIndex <= 3)) {
      this.onQueueLow();
    }
  }

  updateMediaSession(track) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album || 'Nekotune',
        artwork: [
          // Since our cover is a data URI gradient, it works as an image
          { src: this.getTrackCover(track), sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('previoustrack', () => this.previous());
      navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
    }
  }

  notifyDiscord() {
    if (!window.electronAPI || !window.electronAPI.updateDiscord) return;
    if (!this.currentTrack) {
      window.electronAPI.updateDiscord({ details: 'Sfoglia la libreria', state: 'Nekotune Desktop' });
      return;
    }

    // A valid Audio element has duration once loaded; handle cases where it isn't fully loaded yet
    const current = this.audio.currentTime || 0;
    const total = this.audio.duration && !isNaN(this.audio.duration) ? this.audio.duration : (this.currentTrack.duration || 0);

    window.electronAPI.updateDiscord({
      details: this.currentTrack.title,
      state: `Di ${this.currentTrack.artist}`,
      playing: this.isPlaying,
      currentTime: current,
      totalDuration: total,
      imageUrl: this.currentTrack.thumbnail
    });
  }

  play() {
    if (!this.currentTrack) return;
    
    // Init audio ctx on first user gesture
    this.initWebAudio();

    const promise = this.audio.play();
    if (promise) {
      promise.catch(err => console.warn('Playback prevented:', err));
    }
    this.isPlaying = true;
    document.getElementById('btn-play').querySelector('.material-icons-round').textContent = 'pause';
    const pipPlay = document.getElementById('btn-pip-play');
    if(pipPlay) pipPlay.querySelector('.material-icons-round').textContent = 'pause';
    this.syncMiniPlayer();
    if (this.onPlayStateChange) this.onPlayStateChange(true);
    this.notifyDiscord();
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    document.getElementById('btn-play').querySelector('.material-icons-round').textContent = 'play_arrow';
    const pipPlay = document.getElementById('btn-pip-play');
    if(pipPlay) pipPlay.querySelector('.material-icons-round').textContent = 'play_arrow';
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
      this.audioA.muted = true;
      this.audioB.muted = true;
    } else {
      this.audioA.muted = false;
      this.audioB.muted = false;
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
    const isFav = favorites.some(t => (typeof t === 'string' ? t : t.id) === this.currentTrack.id);
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

  // Pre-fetch the URL of the next YouTube song to ensure instant playback without UI freeze
  async prefetchNextTrack() {
    if (!this.queue || this.currentIndex === -1 || this.currentIndex >= this.queue.length - 1) return;
    
    const nextTrack = this.queue[this.currentIndex + 1];
    if (nextTrack && nextTrack.isYoutube && window.electronAPI && window.electronAPI.getStreamUrl) {
      if (!this.streamCache.has(nextTrack.videoId)) {
        try {
          const streamUrl = await window.electronAPI.getStreamUrl(nextTrack.videoId);
          if (streamUrl) {
            this.streamCache.set(nextTrack.videoId, streamUrl);
            
            // Clean up cache to prevent memory bloating over long sessions
            if (this.streamCache.size > 10) {
              const firstKey = this.streamCache.keys().next().value;
              this.streamCache.delete(firstKey);
            }
          }
        } catch(e) {
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

