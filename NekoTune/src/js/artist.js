export class ArtistManager {
  static currentArtistId = null;
  static currentArtistData = null;
  static app = null;

  static init(appInstance) {
    this.app = appInstance;
    this.following = JSON.parse(localStorage.getItem('sw_following') || '[]');
    this.btnFollow = document.getElementById('btn-follow-artist');
    this.btnPlay = document.getElementById('btn-play-artist');

    this.btnFollow.addEventListener('click', () => {
      if (!this.currentArtistId || !this.currentArtistData) return;
      this.toggleFollow(this.currentArtistId, this.currentArtistData);
    });

    this.btnPlay.addEventListener('click', () => {
      if (this.currentArtistData && this.currentArtistData.songs) {
        const firstTrack = this.currentArtistData.songs[0];
        if (firstTrack && this.app && this.app.player) {
          const trackClickTrigger = new CustomEvent('play-track', { detail: firstTrack });
          document.dispatchEvent(trackClickTrigger);
        }
      }
    });
    
    document.addEventListener('click', (e) => {
      const artistLink = e.target.closest('.artist-link');
      if (artistLink) {
        e.preventDefault();
        const artistId = artistLink.dataset.artistid;
        const artistName = artistLink.dataset.artistname;
        if (artistId) {
          this.loadArtistPage(artistId);
        } else if (artistName) {
          this.searchAndLoadArtist(artistName);
        }
      }
    });

    this.enhanceArtistLinks();
    
    const observer = new MutationObserver(() => this.enhanceArtistLinks());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  static enhanceArtistLinks() {
    document.querySelectorAll('.track-artist:not(.enhanced)').forEach(el => {
      el.classList.add('enhanced');
      const text = el.textContent;
      if (text && text !== 'Sconosciuto' && text !== 'Nessun artista') {
        el.innerHTML = `<span class="artist-link hover-underline" data-artistname="${text}" style="cursor:pointer; color:inherit;">${text}</span>`;
      }
    });
  }

  static async searchAndLoadArtist(name) {
    if (!window.electronAPI) return;
    try {
      const results = await window.electronAPI.invoke('search-artists', name, 1);
      if (results && results.length > 0) {
        this.loadArtistPage(results[0].artistId);
      } else {
        alert("Artista non trovato");
      }
    } catch(e) {
      console.error(e);
    }
  }

  static async loadArtistPage(artistId) {
    if (!window.electronAPI) return;
    
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('section-artist').classList.add('active');

    const loader = document.createElement('div');
    loader.className = 'loading-spinner center';
    document.getElementById('artist-popular-list').innerHTML = '';
    document.getElementById('artist-popular-list').appendChild(loader);

    try {
      const artist = await window.electronAPI.invoke('get-artist-details', artistId);
      if (!artist) {
        document.getElementById('artist-popular-list').innerHTML = '<p>Errore nel caricamento del profilo artista.</p>';
        return;
      }

      this.currentArtistId = artistId;
      this.currentArtistData = artist;
      
      const name = artist.name || 'Sconosciuto';
      const followers = artist.subscribers || 'N/A';
      const cover = artist.thumbnails && artist.thumbnails.length > 0 ? artist.thumbnails[artist.thumbnails.length - 1].url : '';
      
      document.getElementById('artist-detail-name').textContent = name;
      document.getElementById('artist-detail-followers').textContent = `${followers} iscritti su YT Music`;
      if (cover) {
        document.getElementById('artist-detail-banner').style.backgroundImage = `url('${cover}')`;
      }

      this.updateFollowButton(artistId);

      let mappedTracks = (artist.songs || []).map(v => ({
        id: v.videoId,
        title: v.name,
        artist: v.artist ? v.artist.name : name,
        cover: v.thumbnails && v.thumbnails.length > 0 ? v.thumbnails[v.thumbnails.length - 1].url : cover,
        duration: null,
        isYoutube: true
      }));
      mappedTracks = mappedTracks.filter(t => t.id);

      if (this.app && this.app.playlists && this.app.playlists.renderTrackList) {
        const popularListEl = document.getElementById('artist-popular-list');
        popularListEl.innerHTML = '';
        if (mappedTracks.length > 0) {
           this.app.playlists.renderTrackList(mappedTracks, popularListEl, false);
        } else {
           popularListEl.innerHTML = '<p>Nessun brano popolare trovato.</p>';
        }
      }

      const albumsGrid = document.getElementById('artist-albums-grid');
      albumsGrid.innerHTML = '';
      if (artist.albums || artist.singles) {
        const combined = [...(artist.albums || []), ...(artist.singles || [])].slice(0, 10);
        combined.forEach(item => {
          const card = document.createElement('div');
          card.className = 'content-card';
          const imgUrl = item.thumbnails && item.thumbnails.length > 0 ? item.thumbnails[item.thumbnails.length - 1].url : cover;
          card.innerHTML = `
            <div class="card-image-container">
              <img src="${imgUrl}" alt="${item.name}" loading="lazy" />
              <div class="card-play-btn"><span class="material-icons-round">play_arrow</span></div>
            </div>
            <div class="card-info">
              <h4>${item.name}</h4>
              <p>${item.year || 'Singolo'}</p>
            </div>
          `;
          albumsGrid.appendChild(card);
        });
      }

    } catch (e) {
      console.error(e);
      document.getElementById('artist-popular-list').innerHTML = '<p>Errore di rete.</p>';
    }
  }

  static updateFollowButton(id) {
    const isFollowed = this.following.some(a => a.id === id);
    if (isFollowed) {
      this.btnFollow.textContent = 'Segui già';
      this.btnFollow.style.background = 'var(--text-primary)';
      this.btnFollow.style.color = 'var(--bg-primary)';
      this.btnFollow.style.border = 'none';
    } else {
      this.btnFollow.textContent = 'Segui';
      this.btnFollow.style.background = 'transparent';
      this.btnFollow.style.color = 'var(--text-primary)';
      this.btnFollow.style.border = '1px solid rgba(255,255,255,0.3)';
    }
  }

  static toggleFollow(id, data) {
    const idx = this.following.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.following.splice(idx, 1);
    } else {
      this.following.push({
        id,
        name: data.name,
        thumbnail: data.thumbnails && data.thumbnails.length > 0 ? data.thumbnails[data.thumbnails.length - 1].url : ''
      });
    }
    localStorage.setItem('sw_following', JSON.stringify(this.following));
    this.updateFollowButton(id);
  }
}
