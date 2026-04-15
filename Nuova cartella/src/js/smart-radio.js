// Nekotune — Smart Radio & Endless Queue
import { DEMO_TRACKS } from './data.js';

class SmartRadio {
  constructor(app, player) {
    this.app = app;
    this.player = player;
    this.isActive = false;
    this.history = new Set();
    this.isFetching = false;

    this.initEvents();
    
    // Hook into player
    this.player.onQueueLow = () => {
      if (this.isActive && !this.isFetching) {
        this.generateRadioTracks(3);
      }
    };
  }

  initEvents() {
    const btnRadio = document.getElementById('btn-radio');
    if (btnRadio) {
      btnRadio.addEventListener('click', () => {
        this.toggleRadio();
      });
    }
  }

  toggleRadio() {
    this.isActive = !this.isActive;
    const btnRadio = document.getElementById('btn-radio');
    if (btnRadio) {
      btnRadio.classList.toggle('active', this.isActive);
    }
    
    this.app.showToast(this.isActive ? 'Smart Radio attivata: coda infinita' : 'Smart Radio disattivata');
    
    if (this.isActive) {
      // Check immediately if we need to add tracks
      const queueStatus = this.player.getQueue();
      if (queueStatus.tracks.length - queueStatus.currentIndex <= 3) {
        this.generateRadioTracks(5);
      }
    }
  }

  async generateRadioTracks(count = 3) {
    this.isFetching = true;
    
    // Determine context based on current track or recent plays
    const contextTrack = this.player.currentTrack;
    let query = '';
    
    if (contextTrack) {
      // By searching for just the artist, youtube-music-api will return their top tracks.
      // This ensures we stay within the artist's discography or extremely similar top hits.
      query = `${contextTrack.artist}`;
      this.history.add(contextTrack.id);
    } else {
      // Fallback
      query = "lofi hip hop radio";
    }

    try {
      if (window.electronAPI && window.electronAPI.searchYoutube) {
        // Fetch a large pool to avoid running out quickly when filtering duplicates
        const fetchLimit = count + 20; 
        const vids = await window.electronAPI.searchYoutube(query, fetchLimit);
        
        if (vids && vids.length > 0) {
          // Shuffle the results slightly so it's not the exact same order every time
          const shuffledVids = vids.sort(() => Math.random() - 0.5);
          let added = 0;
          
          // Filter to avoid recently played tracks
          for (let v of shuffledVids) {
            if (added >= count) break;
            
            // To ensure we don't play the exact same video twice, we check its original videoId
            // since radioId is just a prefix.
            if (!this.history.has(v.id)) {
              this.history.add(v.id);
              
              const newTrack = {
                id: 'radio_' + v.id,
                title: v.title,
                artist: v.artist || 'YouTube Mix',
                album: '',
                duration: v.duration,
                color: '#ff0000',
                cover: v.cover,
                isYoutube: true,
                videoId: v.id,
                src: '', // Resolves at playtime
                source: 'Radio'
              };
              
              this.player.addToQueue(newTrack);
              added++;
            }
          }
        }
      } else {
        // Fallback for local demo (using demo tracks, randomly)
        let added = 0;
        const shuffledDemo = [...DEMO_TRACKS].sort(() => 0.5 - Math.random());
        
        for (let track of shuffledDemo) {
          if (added >= count) break;
          
          if (!this.history.has(track.id)) {
            this.history.add(track.id);
            this.player.addToQueue({ ...track, id: 'radio_local_' + track.id + '_' + Date.now() });
            added++;
          }
        }
      }
    } catch (e) {
      console.error('Error generating radio tracks:', e);
    } finally {
      this.isFetching = false;
    }
  }
}

export default SmartRadio;
