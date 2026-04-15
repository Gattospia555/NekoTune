import { generateCoverGradient, getAllTracks } from './data.js';

export class AiDiscovery {
  constructor(app) {
    this.app = app;
    this.swipeQueue = [];
    this.currentSwipeTrack = null;
    this.audioPreview = new Audio();
    this.isPlayingPreview = false;
    this.isSearching = false;
    
    this.initEvents();
  }

  initEvents() {
    // Playlist Generator
    const btnGen = document.getElementById('btn-generate-ai');
    if (btnGen) {
      btnGen.addEventListener('click', () => this.generateAiPlaylist());
    }

    // Swipe controls
    const btnLeft = document.getElementById('btn-swipe-left');
    const btnRight = document.getElementById('btn-swipe-right');
    const btnPlay = document.getElementById('btn-swipe-play');

    if (btnLeft) btnLeft.addEventListener('click', () => this.handleSwipe(false));
    if (btnRight) btnRight.addEventListener('click', () => this.handleSwipe(true));
    if (btnPlay) btnPlay.addEventListener('click', () => this.togglePreview());
  }

  onSectionEnter() {
    this.buildSwipeQueue();
  }

  onSectionLeave() {
    this.stopPreview();
  }

  // == AI Playlist Generator (uses YouTube search) ==
  async generateAiPlaylist() {
    const promptInput = document.getElementById('ai-prompt');
    const prompt = promptInput.value.trim() || 'Mix Magico AI';
    const btn = document.getElementById('btn-generate-ai');
    
    if (!window.electronAPI || !window.electronAPI.searchYoutube) {
      this.app.showToast('Funzione disponibile solo nell\'app desktop Electron.', true);
      return;
    }

    this.app.showToast('🧠 L\'AI sta analizzando il tuo prompt...');
    btn.disabled = true;
    btn.textContent = 'Generazione in corso...';
    
    try {
      // Use the prompt as a YouTube Music search query
      const results = await window.electronAPI.searchYoutube(prompt, 10);
      
      if (!results || results.length === 0) {
        this.app.showToast('Nessun risultato trovato per questo prompt.', true);
        btn.disabled = false;
        btn.textContent = 'Genera Magia';
        return;
      }

      // Convert YT results to tracks
      const tracks = results.map(v => ({
        id: 'ai_' + v.id + '_' + Date.now(),
        title: v.title,
        artist: v.artist || 'Sconosciuto',
        album: `💡 ${prompt}`,
        duration: v.duration || 0,
        color: '#a29bfe',
        cover: v.cover || '',
        isYoutube: true,
        videoId: v.id,
        src: '',
        imported: true,
        source: 'AI Discovery'
      }));

      // Save to library
      const allTracks = getAllTracks();
      tracks.forEach(t => {
        if (!allTracks.find(ex => ex.videoId === t.videoId)) {
          allTracks.push(t);
        }
      });
      localStorage.setItem('sw_imported_tracks', JSON.stringify(allTracks));

      // Create a playlist with these tracks
      const playlistName = `💡 ${prompt}`;
      const pl = this.app.playlists.createPlaylist(playlistName, `Generata dall'AI: "${prompt}"`);
      if (pl) {
        tracks.forEach(t => {
          if (!pl.tracks.includes(t.id)) {
            pl.tracks.push(t.id);
          }
        });
        this.app.playlists.savePlaylists();
      }
      
      // Start playing the new tracks immediately
      this.app.player.playTrackList(tracks, 0);
      
      promptInput.value = '';
      this.app.showToast(`🎵 Playlist "${prompt}" creata con ${tracks.length} brani!`);
    } catch (err) {
      console.error('AI Playlist error:', err);
      this.app.showToast('Errore durante la generazione della playlist.', true);
    }
    
    btn.disabled = false;
    btn.textContent = 'Genera Magia';
  }

  // == Swipe Logic (Tinder-style) ==
  async buildSwipeQueue() {
    if (this.isSearching) return;
    this.isSearching = true;

    // Try to load cached discovery tracks first
    const cached = JSON.parse(localStorage.getItem('sw_discovery_queue') || '[]');
    
    if (cached.length > 3) {
      this.swipeQueue = cached;
      this.isSearching = false;
      this.loadNextSwipe();
      return;
    }

    // Fetch fresh suggestions from YouTube Music
    if (window.electronAPI && window.electronAPI.searchYoutube) {
      const queries = [
        'trending music 2026', 'new releases music', 'popular songs',
        'indie music hits', 'chill vibes playlist', 'workout motivation songs',
        'lofi study beats', 'electronic dance music', 'R&B soul music',
        'rock anthems', 'jazz classics', 'hip hop new', 'pop hits 2026'
      ];
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
      
      try {
        document.getElementById('swipe-title').textContent = 'Caricamento...';
        document.getElementById('swipe-artist').textContent = 'Cerco brani interessanti per te';
        
        const results = await window.electronAPI.searchYoutube(randomQuery, 15);
        
        if (results && results.length > 0) {
          this.swipeQueue = results.map(v => ({
            id: 'disc_' + v.id + '_' + Date.now(),
            title: v.title,
            artist: v.artist || 'Sconosciuto',
            album: 'Discovery',
            duration: v.duration || 0,
            color: '#6c5ce7',
            cover: v.cover || '',
            isYoutube: true,
            videoId: v.id,
            src: '',
            source: 'Discovery'
          }));

          // Cache for next time
          localStorage.setItem('sw_discovery_queue', JSON.stringify(this.swipeQueue));
        }
      } catch (e) {
        console.error('Discovery fetch error:', e);
      }
    }

    // Fallback: Use existing library tracks the user hasn't favorited
    if (this.swipeQueue.length === 0) {
      const allTracks = getAllTracks();
      const favIds = (this.app.playlists.favorites || []).map(f => typeof f === 'string' ? f : f.id);
      this.swipeQueue = allTracks.filter(t => !favIds.includes(t.id));
      this.swipeQueue.sort(() => 0.5 - Math.random());
    }

    this.isSearching = false;
    this.loadNextSwipe();
  }

  loadNextSwipe() {
    const card = document.getElementById('swipe-card');
    if (this.swipeQueue.length === 0) {
      document.getElementById('swipe-title').textContent = "Hai finito le canzoni!";
      document.getElementById('swipe-artist').textContent = "Torna più tardi per altre scoperte.";
      document.getElementById('swipe-cover').src = generateCoverGradient('#333');
      card.style.transform = 'scale(1)';
      card.style.opacity = '1';
      this.currentSwipeTrack = null;
      return;
    }

    this.currentSwipeTrack = this.swipeQueue.pop();
    
    // Update cached queue
    localStorage.setItem('sw_discovery_queue', JSON.stringify(this.swipeQueue));
    
    document.getElementById('swipe-title').textContent = this.currentSwipeTrack.title;
    document.getElementById('swipe-artist').textContent = this.currentSwipeTrack.artist;

    const coverSrc = this.currentSwipeTrack.cover && this.currentSwipeTrack.cover.startsWith('http')
      ? this.currentSwipeTrack.cover
      : generateCoverGradient(this.currentSwipeTrack.color || '#6c5ce7');
    document.getElementById('swipe-cover').src = coverSrc;

    card.style.transform = 'scale(1)';
    card.style.opacity = '1';
    
    this.playPreview();
  }

  async playPreview() {
    if (!this.currentSwipeTrack) return;
    
    // Pause main player if playing
    if (this.app.player.isPlaying) {
      this.app.player.pause();
    }

    // For YouTube tracks, resolve the stream URL
    if (this.currentSwipeTrack.isYoutube && window.electronAPI && window.electronAPI.getStreamUrl) {
      try {
        const streamUrl = await window.electronAPI.getStreamUrl(this.currentSwipeTrack.videoId);
        // Abort if the user left the discovery section while waiting for the stream URL
        if (this.app.currentSection !== 'discovery') return;
        
        if (streamUrl) {
          this.audioPreview.src = streamUrl;
        } else {
          // Can't play preview, just show the card
          return;
        }
      } catch (e) {
        console.warn('Preview stream error:', e);
        return;
      }
    } else if (this.currentSwipeTrack.src) {
      this.audioPreview.src = this.currentSwipeTrack.src;
    } else {
      return; // No source available
    }

    this.audioPreview.currentTime = 0;
    this.audioPreview.volume = 0.5;
    
    // Auto-stop after 30 seconds
    clearTimeout(this._previewTimeout);
    this._previewTimeout = setTimeout(() => this.stopPreview(), 30000);
    
    this.audioPreview.play().catch(() => console.log('Autoplay blocked'));
    this.isPlayingPreview = true;
    const btn = document.getElementById('btn-swipe-play');
    if (btn) btn.querySelector('.material-icons-round').textContent = 'pause';
  }

  stopPreview() {
    clearTimeout(this._previewTimeout);
    this.audioPreview.pause();
    this.isPlayingPreview = false;
    const btn = document.getElementById('btn-swipe-play');
    if (btn) btn.querySelector('.material-icons-round').textContent = 'play_arrow';
  }

  togglePreview() {
    if (this.isPlayingPreview) {
      this.stopPreview();
    } else {
      this.playPreview();
    }
  }

  handleSwipe(isLike) {
    if (!this.currentSwipeTrack) return;
    const card = document.getElementById('swipe-card');
    
    this.stopPreview();
    
    if (isLike) {
      card.style.transform = 'translateX(200px) rotate(15deg)';
      card.style.opacity = '0';
      
      // Save to library and favorites
      const allTracks = getAllTracks();
      if (!allTracks.find(t => t.id === this.currentSwipeTrack.id)) {
        allTracks.push(this.currentSwipeTrack);
        localStorage.setItem('sw_imported_tracks', JSON.stringify(allTracks));
      }
      
      // Add to favorites
      if (!this.app.playlists.isFavorite(this.currentSwipeTrack.id)) {
        this.app.playlists.toggleFavorite(this.currentSwipeTrack);
      }
      this.app.showToast(`❤️ ${this.currentSwipeTrack.title} aggiunto ai preferiti!`);
    } else {
      card.style.transform = 'translateX(-200px) rotate(-15deg)';
      card.style.opacity = '0';
    }

    setTimeout(() => {
      card.style.transition = 'none';
      card.style.transform = 'scale(0.8)';
      card.style.opacity = '0';
      
      setTimeout(() => {
        card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        this.loadNextSwipe();
      }, 50);
    }, 300);
  }
}
