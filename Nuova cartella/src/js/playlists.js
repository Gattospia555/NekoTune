// SonicWave — Playlist Management
import { DEMO_TRACKS, DEFAULT_PLAYLISTS, generateId, generateCoverGradient } from './data.js';

class PlaylistManager {
  constructor(player, app) {
    this.player = player;
    this.app = app;
    this.playlists = this.loadPlaylists();
    this.favorites = JSON.parse(localStorage.getItem('sw_favorites') || '[]');
    this.recentlyPlayed = JSON.parse(localStorage.getItem('sw_recent') || '[]');
    this.currentPlaylistId = null;

    this.initEvents();
    this.renderSidebarPlaylists();
  }

  loadPlaylists() {
    const saved = localStorage.getItem('sw_playlists');
    if (saved) return JSON.parse(saved);
    // Initialize with defaults
    localStorage.setItem('sw_playlists', JSON.stringify(DEFAULT_PLAYLISTS));
    return [...DEFAULT_PLAYLISTS];
  }

  savePlaylists() {
    localStorage.setItem('sw_playlists', JSON.stringify(this.playlists));
  }

  saveFavorites() {
    localStorage.setItem('sw_favorites', JSON.stringify(this.favorites));
  }

  saveRecent() {
    localStorage.setItem('sw_recent', JSON.stringify(this.recentlyPlayed));
  }

  initEvents() {
    // Create playlist button & modal
    document.getElementById('btn-create-playlist').addEventListener('click', () => {
      this.showCreatePlaylistModal();
    });

    document.getElementById('btn-confirm-create-playlist').addEventListener('click', () => {
      this.createPlaylist();
    });

    // Close modal buttons
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('create-playlist-modal').classList.add('hidden');
      });
    });

    // Favorite current track
    document.getElementById('btn-favorite-current').addEventListener('click', () => {
      if (this.player.currentTrack) {
        this.toggleFavorite(this.player.currentTrack.id);
      }
    });

    // Playlist detail actions
    document.getElementById('btn-play-playlist').addEventListener('click', () => {
      this.playCurrentPlaylist();
    });

    document.getElementById('btn-shuffle-playlist').addEventListener('click', () => {
      this.shuffleCurrentPlaylist();
    });

    document.getElementById('btn-edit-playlist').addEventListener('click', () => {
      this.editCurrentPlaylist();
    });

    document.getElementById('btn-delete-playlist').addEventListener('click', () => {
      this.deleteCurrentPlaylist();
    });

    // Track recently played
    this.player.onTrackChange = (track) => {
      this.addToRecent(track.id);
      this.player.updateFavoriteButton();
      // Notify app for lyrics update etc.
      if (this.app.onTrackChange) this.app.onTrackChange(track);
    };
  }

  showCreatePlaylistModal() {
    const modal = document.getElementById('create-playlist-modal');
    document.getElementById('new-playlist-name').value = '';
    document.getElementById('new-playlist-desc').value = '';
    modal.classList.remove('hidden');
    document.getElementById('new-playlist-name').focus();
  }

  createPlaylist(name, desc) {
    const inputName = name || document.getElementById('new-playlist-name').value.trim();
    const inputDesc = desc || document.getElementById('new-playlist-desc').value.trim();

    if (!inputName) {
      document.getElementById('new-playlist-name').focus();
      return null;
    }

    const colors = ['#6c5ce7', '#00b894', '#e17055', '#fdcb6e', '#74b9ff', '#a29bfe', '#ff7675', '#55efc4'];
    const playlist = {
      id: generateId(),
      name: inputName,
      description: inputDesc,
      tracks: [],
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    this.playlists.push(playlist);
    this.savePlaylists();
    this.renderSidebarPlaylists();

    document.getElementById('create-playlist-modal').classList.add('hidden');
    this.app.showToast(`Playlist "${inputName}" creata!`);
    return playlist;
  }

  deleteCurrentPlaylist() {
    if (!this.currentPlaylistId) return;
    const playlist = this.playlists.find(p => p.id === this.currentPlaylistId);
    if (!playlist) return;

    if (confirm(`Vuoi davvero eliminare la playlist "${playlist.name}"?`)) {
      this.playlists = this.playlists.filter(p => p.id !== this.currentPlaylistId);
      this.savePlaylists();
      this.renderSidebarPlaylists();
      this.app.navigateTo('home');
      this.app.showToast('Playlist eliminata');
    }
  }

  editCurrentPlaylist() {
    const nameEl = document.getElementById('playlist-detail-name');
    const descEl = document.getElementById('playlist-detail-desc');
    const isEditing = nameEl.contentEditable === 'true';

    if (isEditing) {
      // Save
      const playlist = this.playlists.find(p => p.id === this.currentPlaylistId);
      if (playlist) {
        playlist.name = nameEl.textContent.trim();
        playlist.description = descEl.textContent.trim();
        this.savePlaylists();
        this.renderSidebarPlaylists();
        this.app.showToast('Playlist aggiornata');
      }
      nameEl.contentEditable = 'false';
      descEl.contentEditable = 'false';
      document.getElementById('btn-edit-playlist').querySelector('.material-icons-round').textContent = 'edit';
    } else {
      nameEl.contentEditable = 'true';
      descEl.contentEditable = 'true';
      nameEl.focus();
      document.getElementById('btn-edit-playlist').querySelector('.material-icons-round').textContent = 'check';
    }
  }

  playCurrentPlaylist(startIndex = 0) {
    const playlist = this.playlists.find(p => p.id === this.currentPlaylistId);
    if (!playlist || playlist.tracks.length === 0) return;

    const tracks = playlist.tracks.map(id => DEMO_TRACKS.find(t => t.id === id)).filter(Boolean);
    this.player.playTrackList(tracks, startIndex);
  }

  shuffleCurrentPlaylist() {
    const playlist = this.playlists.find(p => p.id === this.currentPlaylistId);
    if (!playlist || playlist.tracks.length === 0) return;

    const tracks = playlist.tracks.map(id => DEMO_TRACKS.find(t => t.id === id)).filter(Boolean);
    // Shuffle
    for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }
    this.player.playTrackList(tracks, 0);
  }

  addTrackToPlaylist(playlistId, trackId) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    if (!playlist.tracks.includes(trackId)) {
      playlist.tracks.push(trackId);
      this.savePlaylists();
      this.app.showToast(`Aggiunto a "${playlist.name}"`);
      if (this.currentPlaylistId === playlistId) {
        this.showPlaylistDetail(playlistId);
      }
    }
  }

  removeTrackFromPlaylist(playlistId, trackId) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    playlist.tracks = playlist.tracks.filter(id => id !== trackId);
    this.savePlaylists();
    if (this.currentPlaylistId === playlistId) {
      this.showPlaylistDetail(playlistId);
    }
  }

  toggleFavorite(trackId) {
    const idx = this.favorites.indexOf(trackId);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      this.app.showToast('Rimosso dai preferiti');
    } else {
      this.favorites.push(trackId);
      this.app.showToast('Aggiunto ai preferiti ❤️');
    }
    this.saveFavorites();
    this.player.updateFavoriteButton();
  }

  addToRecent(trackId) {
    this.recentlyPlayed = this.recentlyPlayed.filter(id => id !== trackId);
    this.recentlyPlayed.unshift(trackId);
    if (this.recentlyPlayed.length > 50) this.recentlyPlayed.pop();
    this.saveRecent();
  }

  renderSidebarPlaylists() {
    const container = document.getElementById('playlist-list');
    container.innerHTML = '';

    this.playlists.forEach(playlist => {
      const item = document.createElement('div');
      item.className = `playlist-list-item${this.currentPlaylistId === playlist.id ? ' active' : ''}`;
      item.dataset.playlistId = playlist.id;
      item.innerHTML = `
        <span class="material-icons-round">queue_music</span>
        <span>${playlist.name}</span>
      `;
      item.addEventListener('click', () => {
        this.showPlaylistDetail(playlist.id);
      });
      container.appendChild(item);
    });
  }

  showPlaylistDetail(playlistId) {
    this.currentPlaylistId = playlistId;
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    this.app.navigateTo('playlist-detail');
    this.renderSidebarPlaylists();

    // Update banner
    const banner = document.getElementById('playlist-detail-banner');
    banner.querySelector('.playlist-header-gradient').style.background =
      `linear-gradient(135deg, ${playlist.color} 0%, transparent 70%)`;

    const cover = document.getElementById('playlist-detail-cover');
    const coverImg = generateCoverGradient(playlist.color);
    cover.innerHTML = `<img src="${coverImg}" alt="${playlist.name}" />`;

    document.getElementById('playlist-detail-name').textContent = playlist.name;
    document.getElementById('playlist-detail-name').contentEditable = 'false';
    document.getElementById('playlist-detail-desc').textContent = playlist.description || '';
    document.getElementById('playlist-detail-desc').contentEditable = 'false';
    document.getElementById('btn-edit-playlist').querySelector('.material-icons-round').textContent = 'edit';

    const tracks = playlist.tracks.map(id => DEMO_TRACKS.find(t => t.id === id)).filter(Boolean);
    document.getElementById('playlist-detail-meta').textContent =
      `${tracks.length} bran${tracks.length !== 1 ? 'i' : 'o'}`;

    this.renderTrackList('playlist-detail-tracks', tracks, {
      showActions: true,
      playlistId: playlistId,
      onPlay: (index) => {
        this.player.playTrackList(tracks, index);
      }
    });
  }

  showFavorites() {
    const tracks = this.favorites
      .map(id => DEMO_TRACKS.find(t => t.id === id))
      .filter(Boolean);

    document.getElementById('favorites-count').textContent =
      `${tracks.length} bran${tracks.length !== 1 ? 'i' : 'o'}`;

    this.renderTrackList('favorites-list', tracks, {
      showActions: true,
      onPlay: (index) => {
        this.player.playTrackList(tracks, index);
      }
    });
  }

  showRecent() {
    const tracks = this.recentlyPlayed
      .map(id => DEMO_TRACKS.find(t => t.id === id))
      .filter(Boolean);

    this.renderTrackList('recent-list', tracks, {
      showActions: true,
      onPlay: (index) => {
        this.player.playTrackList(tracks, index);
      }
    });
  }

  renderTrackList(containerId, tracks, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    if (tracks.length === 0) {
      container.innerHTML = `
        <div class="search-empty" style="padding: 40px;">
          <span class="material-icons-round">music_off</span>
          <p>Nessun brano</p>
        </div>
      `;
      return;
    }

    // Header
    const header = document.createElement('div');
    header.className = 'track-list-header';
    header.innerHTML = `
      <span>#</span>
      <span>Titolo</span>
      <span>Album</span>
      <span>Durata</span>
      <span></span>
    `;
    container.appendChild(header);

    tracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = `track-item${this.player.currentTrack?.id === track.id ? ' playing' : ''}`;
      item.draggable = options.playlistId ? true : false;
      item.dataset.trackId = track.id;
      item.dataset.index = index;

      const isFav = this.favorites.includes(track.id);
      const cover = this.player.getTrackCover(track);
      const isPlaying = this.player.currentTrack?.id === track.id && this.player.isPlaying;

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
          <button class="btn-icon btn-favorite ${isFav ? 'is-favorite' : ''}" data-track-id="${track.id}">
            <span class="material-icons-round">${isFav ? 'favorite' : 'favorite_border'}</span>
          </button>
          ${options.playlistId ? `
            <button class="btn-icon btn-remove-track" data-track-id="${track.id}" data-playlist-id="${options.playlistId}">
              <span class="material-icons-round">close</span>
            </button>
          ` : `
            <button class="btn-icon btn-add-to-queue" data-track-id="${track.id}">
              <span class="material-icons-round">playlist_add</span>
            </button>
          `}
        </div>
      `;

      // Play on double click
      item.addEventListener('dblclick', () => {
        if (options.onPlay) options.onPlay(index);
      });

      // Single click selects
      item.addEventListener('click', (e) => {
        if (e.target.closest('.btn-icon')) return;
        // Just visual selection
        container.querySelectorAll('.track-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
      });

      // Favorite button
      const favBtn = item.querySelector('.btn-favorite');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(track.id);
        const icon = favBtn.querySelector('.material-icons-round');
        const nowFav = this.favorites.includes(track.id);
        favBtn.classList.toggle('is-favorite', nowFav);
        icon.textContent = nowFav ? 'favorite' : 'favorite_border';
      });

      // Remove from playlist
      const removeBtn = item.querySelector('.btn-remove-track');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeTrackFromPlaylist(options.playlistId, track.id);
          this.app.showToast('Brano rimosso dalla playlist');
        });
      }

      // Add to queue
      const queueBtn = item.querySelector('.btn-add-to-queue');
      if (queueBtn) {
        queueBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.player.addToQueue(track);
          this.app.showToast('Aggiunto alla coda');
        });
      }

      // Drag & drop for playlist reordering
      if (options.playlistId) {
        item.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', index.toString());
          item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
          item.classList.remove('dragging');
          container.querySelectorAll('.track-item').forEach(i => i.classList.remove('drag-over'));
        });

        item.addEventListener('dragover', (e) => {
          e.preventDefault();
          item.classList.add('drag-over');
        });

        item.addEventListener('dragleave', () => {
          item.classList.remove('drag-over');
        });

        item.addEventListener('drop', (e) => {
          e.preventDefault();
          item.classList.remove('drag-over');
          const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
          const toIndex = index;
          this.reorderPlaylistTrack(options.playlistId, fromIndex, toIndex);
        });
      }

      container.appendChild(item);
    });
  }

  reorderPlaylistTrack(playlistId, fromIndex, toIndex) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    const [moved] = playlist.tracks.splice(fromIndex, 1);
    playlist.tracks.splice(toIndex, 0, moved);
    this.savePlaylists();
    this.showPlaylistDetail(playlistId);
  }

  getPlaylists() {
    return this.playlists;
  }

  isFavorite(trackId) {
    return this.favorites.includes(trackId);
  }
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default PlaylistManager;
