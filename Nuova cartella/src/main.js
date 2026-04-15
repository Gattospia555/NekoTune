// Nekotune — Main Application
import './style.css';
import './profile-styles.css';
import { DEMO_TRACKS, DEMO_ARTISTS, DEMO_ALBUMS, generateCoverGradient, resolveTracks } from './js/data.js';
import Player from './js/player.js';
import PlaylistManager from './js/playlists.js';
import LyricsManager from './js/lyrics.js';
import ThemeManager from './js/themes.js';
import ImportManager from './js/import.js';
import GroupSession from './js/group.js';
import { LocalFileManager } from './js/local-files.js';
import { AiDiscovery } from './js/ai-discovery.js';
import StatsManager from './js/stats.js';
import SmartRadio from './js/smart-radio.js';
import { OfflineManager } from './js/offline-manager.js';
import { AuthManager } from './js/auth.js';
import { ProfileManager } from './js/profile.js';
class NekotuneApp {
  constructor() {
    this.currentSection = 'home';
    this.navigationHistory = ['home'];
    this.navigationIndex = 0;
    
    this.authManager = new AuthManager();
    this.profileManager = new ProfileManager(this);
    // Initialize modules

    this.sleepTimerId = null;
    this.sleepTimerRemaining = 0;

    // Initialize modules
    this.player = new Player();
    this.playlists = new PlaylistManager(this.player, this);
    this.lyrics = new LyricsManager(this.player);
    this.themes = new ThemeManager(this);
    this.importer = new ImportManager(this, this.playlists);
    this.group = new GroupSession(this, this.player);
    this.localManager = new LocalFileManager(this);
    this.discovery = new AiDiscovery(this);
    this.stats = new StatsManager(this, this.player);
    this.radio = new SmartRadio(this, this.player);
    this.offline = new OfflineManager(this);

    // Initialize Electron features if available
    this.initElectron();

    // cross module callback
    this.onTrackChange = (track) => {
      this.lyrics.onTrackChange();
      if (this.group.isActive) {
        this.group.updateGroupNowPlaying();
      }
      this.updateTrackHighlight();
      this.profileManager.updateCurrentlyPlaying(track);
    };

    this.initNavigation();
    this.initSearch();
    this.initQueue();
    this.initSleepTimer();
    this.initKeyboardShortcuts();
    this.initSidebarMobile();

    // Render initial content
    this.renderHome();
    this.updateGreeting();
    
    // Check initial network state
    this.initNetworkMonitoring();
  }

  // === Network Monitoring ===
  initNetworkMonitoring() {
    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        document.getElementById('offline-alert').style.display = 'flex';
        this.showToast('Sei offline. Modalità aereo attivata.', true);
        // Force navigate to offline view
        this.navigateTo('offline');
        
        // Disable online-only features
        document.getElementById('nav-search').style.pointerEvents = 'none';
        document.getElementById('nav-search').style.opacity = '0.5';
        document.getElementById('nav-discovery').style.pointerEvents = 'none';
        document.getElementById('nav-discovery').style.opacity = '0.5';
        document.getElementById('nav-group').style.pointerEvents = 'none';
        document.getElementById('nav-group').style.opacity = '0.5';
      } else {
        document.getElementById('offline-alert').style.display = 'none';
        this.showToast('Connessione ripristinata!');
        
        // Re-enable
        document.getElementById('nav-search').style.pointerEvents = 'auto';
        document.getElementById('nav-search').style.opacity = '1';
        document.getElementById('nav-discovery').style.pointerEvents = 'auto';
        document.getElementById('nav-discovery').style.opacity = '1';
        document.getElementById('nav-group').style.pointerEvents = 'auto';
        document.getElementById('nav-group').style.opacity = '1';
      }
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    // Initial check
    if (!navigator.onLine) {
      setTimeout(handleNetworkChange, 500);
    }
  }

  // === Navigation ===
  initNavigation() {
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        this.navigateTo(section);
      });
    });

    document.getElementById('btn-dropdown-profile')?.addEventListener('click', () => {
      this.navigateTo('profile');
      document.getElementById('profile-dropdown').style.display = 'none';
      if (!this.navigationHistory.includes('profile')) {
          this.navigationHistory.push('profile');
          this.navigationIndex = this.navigationHistory.length - 1;
      }
    });

    document.getElementById('btn-back').addEventListener('click', () => {
      if (this.navigationIndex > 0) {
        this.navigationIndex--;
        this.showSection(this.navigationHistory[this.navigationIndex], false);
      }
    });

    document.getElementById('btn-forward').addEventListener('click', () => {
      if (this.navigationIndex < this.navigationHistory.length - 1) {
        this.navigationIndex++;
        this.showSection(this.navigationHistory[this.navigationIndex], false);
      }
    });
  }

  initElectron() {
    if (window.electronAPI) {
      document.body.classList.add('is-electron');
      
      const titlebar = document.getElementById('electron-titlebar');
      if (titlebar) {
        titlebar.style.display = 'flex';
      }

      const btnMin = document.getElementById('btn-win-min');
      const btnMax = document.getElementById('btn-win-max');
      const btnClose = document.getElementById('btn-win-close');

      if (btnMin) btnMin.addEventListener('click', () => window.electronAPI.windowMinimize());
      if (btnMax) btnMax.addEventListener('click', () => window.electronAPI.windowMaximize());
      if (btnClose) btnClose.addEventListener('click', () => window.electronAPI.windowClose());
      
      // Hook media keys
      if (window.electronAPI.onMediaPlayPause) {
        window.electronAPI.onMediaPlayPause(() => this.player.togglePlay());
      }
      if (window.electronAPI.onMediaNextTrack) {
        window.electronAPI.onMediaNextTrack(() => this.player.next());
      }
      if (window.electronAPI.onMediaPrevTrack) {
        window.electronAPI.onMediaPrevTrack(() => this.player.previous());
      }
    }
  }

  navigateTo(section) {
    // Trim forward history
    this.navigationHistory = this.navigationHistory.slice(0, this.navigationIndex + 1);
    this.navigationHistory.push(section);
    this.navigationIndex = this.navigationHistory.length - 1;
    this.showSection(section);
  }

  showSection(section, updateNav = true) {
    if (this.currentSection === 'discovery' && section !== 'discovery') {
      this.discovery.onSectionLeave();
    }
    this.currentSection = section;

    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    // Show target
    const target = document.getElementById(`section-${section}`);
    if (target) {
      target.classList.add('active');
    }

    // Update nav items
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
      item.classList.toggle('active', item.dataset.section === section);
    });

    // Update nav arrows
    document.getElementById('btn-back').disabled = this.navigationIndex <= 0;
    document.getElementById('btn-forward').disabled = this.navigationIndex >= this.navigationHistory.length - 1;

    // Callbacks based on section
    switch (section) {
      case 'favorites':
        this.playlists.showFavorites();
        break;
      case 'recent':
        this.playlists.showRecent();
        break;
      case 'themes':
        this.themes.renderThemes();
        break;
      case 'group':
        if (this.group.isActive) {
          this.group.updateGroupNowPlaying();
        }
        break;
      case 'local':
        this.localManager.renderLocalList();
        break;
      case 'discovery':
        this.discovery.onSectionEnter();
        break;
      case 'wrapped':
        this.stats.onSectionVisible();
        break;
      case 'offline':
        this.offline.refreshOfflineView();
        break;
      case 'profile':
        this.profileManager.render();
        break;
    }

    // Close mobile sidebar
    this.closeSidebar();
  }

  // === Home ===
  renderHome() {
    this.renderQuickPlaylists();
    this.renderRecommended();
    this.renderPopularArtists();
    this.renderFeaturedAlbums();
  }

  updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = 'Buongiorno 🌅';
    else if (hour < 18) greeting = 'Buon pomeriggio ☀️';
    else greeting = 'Buonasera 🌙';

    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) heroTitle.textContent = greeting;
  }

  renderQuickPlaylists() {
    const container = document.getElementById('quick-playlists');
    container.innerHTML = '';

    const playlists = this.playlists.getPlaylists().slice(0, 6);
    playlists.forEach(playlist => {
      const cover = generateCoverGradient(playlist.color);
      const card = document.createElement('div');
      card.className = 'card-compact';
      card.innerHTML = `
        <div class="card-compact-cover">
          <img src="${cover}" alt="${playlist.name}" />
        </div>
        <div class="card-compact-text">
          <div class="card-title">${playlist.name}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        this.playlists.showPlaylistDetail(playlist.id);
      });
      container.appendChild(card);
    });
  }

  renderRecommended() {
    const container = document.getElementById('recommended-tracks');
    container.innerHTML = '';

    if (DEMO_TRACKS.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 20px; color: var(--text-secondary); grid-column: 1 / -1; text-align: center;">
          <span class="material-icons-round" style="font-size: 48px; margin-bottom: 10px; opacity: 0.5;">library_music</span>
          <p>La tua libreria è vuota, cerca un brano o importalo per riempirla!</p>
        </div>`;
      return;
    }

    // Shuffle and pick 6
    const shuffled = [...DEMO_TRACKS].sort(() => Math.random() - 0.5).slice(0, 6);
    shuffled.forEach(track => {
      container.appendChild(this.createTrackCard(track));
    });
  }

  renderPopularArtists() {
    const container = document.getElementById('popular-artists');
    container.innerHTML = '';

    if (DEMO_ARTISTS.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 20px; color: var(--text-secondary); grid-column: 1 / -1; text-align: center;">
          <p>Nessun artista recente disponibile.</p>
        </div>`;
      return;
    }

    DEMO_ARTISTS.forEach(artist => {
      const card = document.createElement('div');
      card.className = 'card artist-card';
      card.innerHTML = `
        <div class="card-cover" style="background: ${artist.color}">
          <span class="material-icons-round" style="font-size: 48px; color: rgba(255,255,255,0.6)">person</span>
        </div>
        <div class="card-title">${artist.name}</div>
        <div class="card-subtitle">Artista</div>
      `;
      card.addEventListener('click', () => {
        const tracks = resolveTracks(artist.tracks);
        this.player.playTrackList(tracks, 0);
      });
      container.appendChild(card);
    });
  }

  renderFeaturedAlbums() {
    const container = document.getElementById('featured-albums');
    container.innerHTML = '';

    if (DEMO_ALBUMS.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 20px; color: var(--text-secondary); grid-column: 1 / -1; text-align: center;">
          <p>Nessun album in evidenza al momento.</p>
        </div>`;
      return;
    }

    DEMO_ALBUMS.slice(0, 6).forEach(album => {
      const cover = generateCoverGradient(album.color);
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-cover">
          <img src="${cover}" alt="${album.title}" />
          <button class="card-play-btn">
            <span class="material-icons-round">play_arrow</span>
          </button>
        </div>
        <div class="card-title">${album.title}</div>
        <div class="card-subtitle">${album.artist}</div>
      `;

      const playBtn = card.querySelector('.card-play-btn');
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tracks = resolveTracks(album.tracks);
        this.player.playTrackList(tracks, 0);
      });

      card.addEventListener('click', () => {
        const tracks = resolveTracks(album.tracks);
        this.player.playTrackList(tracks, 0);
      });

      container.appendChild(card);
    });
  }

  createTrackCard(track) {
    const cover = this.player.getTrackCover(track);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-cover">
        <img src="${cover}" alt="${track.title}" />
        <button class="card-play-btn">
          <span class="material-icons-round">play_arrow</span>
        </button>
      </div>
      <div class="card-title">${track.title}</div>
      <div class="card-subtitle">${track.artist}</div>
    `;

    const playBtn = card.querySelector('.card-play-btn');
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.player.playTrackList([track], 0);
    });

    card.addEventListener('click', () => {
      this.player.playTrackList([track], 0);
    });

    return card;
  }

  // === Search ===
  initSearch() {
    const input = document.getElementById('search-input');
    let debounce;

    input.addEventListener('input', () => {
      if (this.currentSection !== 'search' && input.value.trim() !== '') {
        this.navigateTo('search');
      }
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        this.performSearch(input.value.trim());
      }, 200);
    });

    input.addEventListener('focus', () => {
      if (this.currentSection !== 'search') {
        this.navigateTo('search');
      }
    });
  }

  async performSearch(query) {
    const results = document.getElementById('search-results');

    if (!query) {
      results.innerHTML = `
        <div class="search-empty">
          <span class="material-icons-round">search</span>
          <p>Inizia a digitare per cercare brani, artisti e album</p>
        </div>
      `;
      return;
    }

    results.innerHTML = `
      <div class="search-empty">
        <span class="material-icons-round" style="animation: logoPulse 2s infinite">sync</span>
        <p>Ricerca in corso per "${query}"...</p>
      </div>
    `;

    const q = query.toLowerCase();

    // 1. Local Demo Search
    const localTracks = DEMO_TRACKS.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.album.toLowerCase().includes(q)
    );
    const artists = DEMO_ARTISTS.filter(a => a.name.toLowerCase().includes(q));
    const albums = DEMO_ALBUMS.filter(a => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q));

    // 2. YouTube Search (if in Electron)
    let ytResults = [];
    if (window.electronAPI && window.electronAPI.searchYoutube) {
      try {
        const videos = await window.electronAPI.searchYoutube(query);
        ytResults = videos.map(v => ({
          id: 'yt_' + v.id,
          title: v.title,
          artist: v.artist,
          album: 'YouTube',
          duration: v.duration,
          color: '#ff2a2a', // Youtube Red
          cover: v.cover,
          isYoutube: true,
          videoId: v.id,
          src: '' // Will be resolved dynamically
        }));
      } catch (e) {
        console.error("YT Search failed in UI", e);
      }
    }

    results.innerHTML = '';

    if (localTracks.length === 0 && artists.length === 0 && albums.length === 0 && ytResults.length === 0) {
      results.innerHTML = `
        <div class="search-empty">
          <span class="material-icons-round">search_off</span>
          <p>Nessun risultato per "${query}"</p>
        </div>
      `;
      return;
    }

    // Artists
    if (artists.length > 0) {
      const section = document.createElement('div');
      section.className = 'content-section';
      section.innerHTML = '<h3 class="section-title">Artisti Locali</h3>';
      const grid = document.createElement('div');
      grid.className = 'cards-grid';

      artists.forEach(artist => {
        const card = document.createElement('div');
        card.className = 'card artist-card';
        card.innerHTML = `
          <div class="card-cover" style="background: ${artist.color}">
            <span class="material-icons-round" style="font-size: 48px; color: rgba(255,255,255,0.6)">person</span>
          </div>
          <div class="card-title">${artist.name}</div>
          <div class="card-subtitle">Artista</div>
        `;
        card.addEventListener('click', () => {
          const artistTracks = resolveTracks(artist.tracks);
          this.player.playTrackList(artistTracks, 0);
        });
        grid.appendChild(card);
      });
      section.appendChild(grid);
      results.appendChild(section);
    }

    // Albums
    if (albums.length > 0) {
      const section = document.createElement('div');
      section.className = 'content-section';
      section.innerHTML = '<h3 class="section-title">Album Locali</h3>';
      const grid = document.createElement('div');
      grid.className = 'cards-grid';

      albums.forEach(album => {
        const cover = generateCoverGradient(album.color);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-cover">
            <img src="${cover}" alt="${album.title}" />
          </div>
          <div class="card-title">${album.title}</div>
          <div class="card-subtitle">${album.artist}</div>
        `;
        card.addEventListener('click', () => {
          const albumTracks = resolveTracks(album.tracks);
          this.player.playTrackList(albumTracks, 0);
        });
        grid.appendChild(card);
      });
      section.appendChild(grid);
      results.appendChild(section);
    }

    // 3. Spotify-Style Spotify-Style Top Result & Tracks
    const allTracks = [...ytResults, ...localTracks];
    const topResultMatch = artists[0] || allTracks[0] || albums[0];

    if (topResultMatch) {
      const topGridDiv = document.createElement('div');
      topGridDiv.className = 'search-top-grid';
      
      // Top Result
      const topResultDiv = document.createElement('div');
      topResultDiv.className = 'search-top-result';
      topResultDiv.innerHTML = '<h3 class="section-title">Risultato più rilevante</h3>';
      
      const isArtist = !!topResultMatch.name; // Artists have 'name', tracks/albums have 'title'
      const isAlbum = !!(topResultMatch.title && !topResultMatch.src && !topResultMatch.videoId); // Albums don't have src
      
      let topTitle = topResultMatch.title || topResultMatch.name;
      let topSubtitle = isArtist ? 'Artista' : (isAlbum ? 'Album' : `Brano • ${topResultMatch.artist}`);
      let topCover = topResultMatch.cover || (isArtist ? generateCoverGradient(topResultMatch.color) : generateCoverGradient(topResultMatch.color));
      if (!isArtist && !topResultMatch.cover) topCover = this.player.getTrackCover(topResultMatch);

      const topCard = document.createElement('div');
      topCard.className = `top-result-card ${isArtist ? 'is-artist' : ''}`;
      topCard.innerHTML = `
        <img src="${topCover}" alt="${topTitle}">
        <div class="top-result-title">${topTitle}</div>
        <div class="top-result-type-badge">${isArtist ? 'Artista' : (isAlbum ? 'Album' : 'Brano')}</div>
        <button class="btn-play-top"><span class="material-icons-round">play_arrow</span></button>
      `;

      topCard.addEventListener('click', () => {
        if (isArtist) {
          const artistTracks = resolveTracks(topResultMatch.tracks);
          if(artistTracks.length) this.player.playTrackList(artistTracks, 0);
        } else if (isAlbum) {
          const albumTracks = resolveTracks(topResultMatch.tracks);
          if(albumTracks.length) this.player.playTrackList(albumTracks, 0);
        } else {
          this.player.playTrackList(allTracks, 0);
        }
      });
      topResultDiv.appendChild(topCard);

      // Top Tracks (Brani)
      const topTracksDiv = document.createElement('div');
      topTracksDiv.className = 'search-top-tracks';
      topTracksDiv.innerHTML = '<h3 class="section-title">Brani</h3>';
      
      const trackListDiv = document.createElement('div');
      trackListDiv.className = 'track-list top-tracks-list';
      
      // Only show up to 4 tracks next to the top result
      const top4Tracks = allTracks.slice(0, 4);
      
      // Make them playable without rerendering the whole queue
      this.playlists.renderTrackList(null, allTracks, {
        showActions: true,
        onPlay: (index) => {
          this.player.playTrackList(allTracks, index);
        }
      });
      
      top4Tracks.forEach((track, index) => {
        const item = this.createSearchTrackItem(track, index, allTracks);
        trackListDiv.appendChild(item);
      });
      
      topTracksDiv.appendChild(trackListDiv);
      
      topGridDiv.appendChild(topResultDiv);
      topGridDiv.appendChild(topTracksDiv);
      
      results.appendChild(topGridDiv);
    }
  }

  createSearchTrackItem(track, index, allTracks) {
    const cover = this.player.getTrackCover(track);
    const isFav = this.playlists.isFavorite(track.id);
    const isPlaying = this.player.currentTrack?.id === track.id && this.player.isPlaying;

    const item = document.createElement('div');
    item.className = `track-item${this.player.currentTrack?.id === track.id ? ' playing' : ''}`;
    item.innerHTML = `
      <div class="track-number">
        ${isPlaying ?
          '<div class="playing-indicator"><span></span><span></span><span></span><span></span></div>' :
          (index + 1)}
      </div>
      <div class="track-info">
        <div class="track-cover-small">
          <img src="${cover}" alt="${track.title}" />
        </div>
        <div class="track-text">
          <div class="track-title">${track.title}</div>
          <div class="track-artist-name">${track.artist}</div>
        </div>
      </div>
      <div class="track-album-name">${track.album}</div>
      <div class="track-duration">${formatDuration(track.duration)}</div>
      <div class="track-actions">
        <button class="btn-icon btn-favorite ${isFav ? 'is-favorite' : ''}">
          <span class="material-icons-round">${isFav ? 'favorite' : 'favorite_border'}</span>
        </button>
      </div>
    `;

    item.addEventListener('dblclick', () => {
      this.player.playTrackList(allTracks, index);
    });

    const favBtn = item.querySelector('.btn-favorite');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.playlists.toggleFavorite(track.id);
      const nowFav = this.playlists.isFavorite(track.id);
      favBtn.classList.toggle('is-favorite', nowFav);
      favBtn.querySelector('.material-icons-round').textContent = nowFav ? 'favorite' : 'favorite_border';
    });

    return item;
  }

  // === Queue Panel ===
  initQueue() {
    document.getElementById('btn-queue').addEventListener('click', () => {
      this.toggleQueue();
    });

    document.getElementById('btn-close-queue').addEventListener('click', () => {
      this.hideQueue();
    });

    this.player.onQueueChange = () => {
      this.renderQueue();
    };
  }

  toggleQueue() {
    const panel = document.getElementById('queue-panel');
    const isVisible = panel.classList.contains('visible');
    if (isVisible) {
      this.hideQueue();
    } else {
      this.showQueue();
    }
  }

  showQueue() {
    // Close lyrics if open
    document.getElementById('lyrics-panel').classList.remove('visible');
    this.lyrics.isVisible = false;
    document.getElementById('btn-lyrics-toggle').classList.remove('active');

    const panel = document.getElementById('queue-panel');
    panel.classList.remove('hidden');
    panel.offsetHeight;
    panel.classList.add('visible');
    document.getElementById('btn-queue').classList.add('active');
    this.renderQueue();
  }

  hideQueue() {
    const panel = document.getElementById('queue-panel');
    panel.classList.remove('visible');
    setTimeout(() => panel.classList.add('hidden'), 400);
    document.getElementById('btn-queue').classList.remove('active');
  }

  renderQueue() {
    const { tracks, currentIndex } = this.player.getQueue();
    const nowPlayingContainer = document.getElementById('queue-now-playing');
    const listContainer = document.getElementById('queue-list');

    // Now playing
    if (this.player.currentTrack) {
      const track = this.player.currentTrack;
      const cover = this.player.getTrackCover(track);
      nowPlayingContainer.innerHTML = `
        <div class="queue-item" style="background: var(--bg-active)">
          <div class="queue-item-cover">
            <img src="${cover}" alt="${track.title}" />
          </div>
          <div class="queue-item-text">
            <div class="track-title" style="color: var(--accent)">${track.title}</div>
            <div class="track-artist-name">${track.artist}</div>
          </div>
          <div class="playing-indicator"><span></span><span></span><span></span><span></span></div>
        </div>
      `;
    } else {
      nowPlayingContainer.innerHTML = '';
    }

    // Queue
    listContainer.innerHTML = '';
    const upcoming = tracks.slice(currentIndex + 1);
    if (upcoming.length === 0) {
      listContainer.innerHTML = '<p style="text-align: center; color: var(--text-tertiary); padding: 24px;">La coda è vuota</p>';
      return;
    }

    upcoming.forEach((track, i) => {
      const cover = this.player.getTrackCover(track);
      const item = document.createElement('div');
      item.className = 'queue-item';
      item.innerHTML = `
        <div class="queue-item-cover">
          <img src="${cover}" alt="${track.title}" />
        </div>
        <div class="queue-item-text">
          <div class="track-title">${track.title}</div>
          <div class="track-artist-name">${track.artist}</div>
        </div>
        <span style="color: var(--text-tertiary); font-size: 0.8rem">${formatDuration(track.duration)}</span>
      `;
      item.addEventListener('click', () => {
        this.player.currentIndex = currentIndex + 1 + i;
        this.player.loadTrack(track);
      });
      listContainer.appendChild(item);
    });
  }

  // === Sleep Timer ===
  initSleepTimer() {
    document.getElementById('btn-sleep-timer').addEventListener('click', () => {
      document.getElementById('sleep-timer-modal').classList.toggle('hidden');
    });

    document.getElementById('btn-close-sleep-timer').addEventListener('click', () => {
      document.getElementById('sleep-timer-modal').classList.add('hidden');
    });

    document.querySelectorAll('.sleep-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes);
        this.startSleepTimer(minutes);
      });
    });

    document.getElementById('btn-cancel-sleep-timer').addEventListener('click', () => {
      this.cancelSleepTimer();
    });

    // Close modal on background click
    document.getElementById('sleep-timer-modal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        e.currentTarget.classList.add('hidden');
      }
    });
  }

  startSleepTimer(minutes) {
    this.cancelSleepTimer();

    this.sleepTimerRemaining = minutes * 60;
    document.getElementById('sleep-timer-active').classList.remove('hidden');

    this.sleepTimerId = setInterval(() => {
      this.sleepTimerRemaining--;
      const m = Math.floor(this.sleepTimerRemaining / 60);
      const s = this.sleepTimerRemaining % 60;
      document.getElementById('sleep-timer-remaining').textContent =
        `${m}:${s.toString().padStart(2, '0')}`;

      if (this.sleepTimerRemaining <= 0) {
        this.player.pause();
        this.cancelSleepTimer();
        this.showToast('Sleep timer: riproduzione fermata 💤');
      }
    }, 1000);

    this.showToast(`Sleep timer impostato: ${minutes} minuti`);
    document.getElementById('sleep-timer-modal').classList.add('hidden');
    document.getElementById('btn-sleep-timer').classList.add('active');
  }

  cancelSleepTimer() {
    if (this.sleepTimerId) {
      clearInterval(this.sleepTimerId);
      this.sleepTimerId = null;
    }
    this.sleepTimerRemaining = 0;
    document.getElementById('sleep-timer-active').classList.add('hidden');
    document.getElementById('btn-sleep-timer').classList.remove('active');
  }

  // === Keyboard Shortcuts ===
  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          this.player.togglePlay();
          break;
        case 'arrowright':
          if (e.ctrlKey || e.metaKey) {
            this.player.next();
          }
          break;
        case 'arrowleft':
          if (e.ctrlKey || e.metaKey) {
            this.player.previous();
          }
          break;
        case 'm':
          this.player.toggleMute();
          break;
        case 'l':
          this.lyrics.toggle();
          break;
        case 'q':
          this.toggleQueue();
          break;
        case 'escape':
          // Close any open panels/modals
          this.lyrics.hide();
          this.hideQueue();
          document.getElementById('sleep-timer-modal').classList.add('hidden');
          document.getElementById('create-playlist-modal').classList.add('hidden');
          if (document.body.classList.contains('mini-player')) {
            document.body.classList.remove('mini-player');
            document.getElementById('btn-mini-player').classList.remove('active');
          }
          break;
      }
    });
  }

  // === Sidebar Mobile ===
  initSidebarMobile() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebar-overlay';
    document.getElementById('app').appendChild(overlay);

    document.getElementById('btn-menu-toggle').addEventListener('click', () => {
      this.toggleSidebar();
    });

    overlay.addEventListener('click', () => {
      this.closeSidebar();
    });
  }

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('visible');
  }

  closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('visible');
  }

  // === Utilities ===
  updateTrackHighlight() {
    // Re-render current list if needed
    document.querySelectorAll('.track-item').forEach(item => {
      const trackId = item.dataset.trackId;
      const isCurrentTrack = this.player.currentTrack?.id === trackId;
      item.classList.toggle('playing', isCurrentTrack);
    });
  }

  showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.remove('visible');
    // Force reflow
    void toast.offsetWidth;
    toast.classList.add('visible');

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }

  showConfirm(title, message, confirmText, isDanger, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>${title}</h3>
        <p>${message}</p>
        <div class="modal-actions">
          <button class="btn-cancel">Annulla</button>
          <button class="btn-confirm" style="background: ${isDanger ? 'var(--danger)' : 'var(--accent)'}">${confirmText}</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    requestAnimationFrame(() => modal.classList.add('visible'));

    const close = () => {
      modal.classList.remove('visible');
      setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.btn-cancel').onclick = close;
    modal.querySelector('.btn-confirm').onclick = () => {
      onConfirm();
      close();
    };
  }
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  window.nekotune = new NekotuneApp();
});
