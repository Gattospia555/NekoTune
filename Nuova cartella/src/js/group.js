// Nekotune Group Listening Session (WebSocket Remote Sync)
import socketManager from './socket.js';

function getMyUser() {
  const profile = JSON.parse(localStorage.getItem('sw_user_profile') || '{}');
  const colors = ['#6c5ce7', '#00b894', '#e17055', '#fdcb6e', '#74b9ff', '#a29bfe'];
  return {
    id: 'user_' + Date.now().toString(36),
    name: profile.username || 'Utente',
    color: colors[Math.floor(Math.random() * colors.length)],
    isHost: false
  };
}

class GroupSession {
  constructor(app, player) {
    this.app = app;
    this.player = player;
    this.isActive = false;
    this.isHost = false;
    this.sessionCode = '';
    this.participants = [];
    this.chatMessages = [];
    
    // My Identity from profile
    this.myUser = getMyUser();
    
    // WebSockets Server
    this.socket = socketManager.getSocket();
    this.setupSocketListeners();

    this.initEvents();
    
    // Sync triggers for Host
    this.player.onPlayStateChange = (playing) => {
      if (this.isActive && this.isHost) {
        this.socket.emit('session_sync_playstate', {
          sessionCode: this.sessionCode,
          playing: playing,
          time: this.player.getCurrentTime()
        });
      }
    };

    // Periodic time sync (host to clients)
    setInterval(() => {
      if (this.isActive && this.isHost && this.player.isPlaying) {
        this.socket.emit('session_sync_time', {
          sessionCode: this.sessionCode,
          time: this.player.getCurrentTime()
        });
      }
    }, 5000);
  }

  generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  setupSocketListeners() {
    this.socket.on('peer_join_request', (data) => {
      if (this.isHost && data.sessionCode === this.sessionCode) {
        this.participants.push(data.user);
        this.renderParticipants();
        this.app.showToast(`${data.user.name} si è unito alla sessione!`);
        
        // Accept user
        this.socket.emit('session_host_accept', {
          sessionCode: this.sessionCode,
          toSocketId: data.socketId,
          participants: this.participants
        });
        
        // Push current track and time
        setTimeout(() => {
          this.socket.emit('session_sync_track', {
            sessionCode: this.sessionCode,
            track: this.player.currentTrack,
            playing: this.player.isPlaying
          });
          this.socket.emit('session_sync_playstate', {
            sessionCode: this.sessionCode,
            playing: this.player.isPlaying,
            time: this.player.getCurrentTime()
          });
        }, 500);
      }
    });

    this.socket.on('peer_join_accept', (data) => {
      this.participants = data.participants;
      this.isActive = true;
      this.app.showToast(`Unito con successo!`);
      this.showSession();
    });

    this.socket.on('peer_participant_update', (data) => {
      this.participants = data.participants;
      this.renderParticipants();
    });

    this.socket.on('peer_participant_leave', (data) => {
      this.participants = this.participants.filter(p => p.id !== data.senderId);
      this.renderParticipants();
    });

    this.socket.on('peer_chat', (data) => {
      this.addChatMessage(data.user, data.text, data.time);
    });

    this.socket.on('peer_sync_track', (data) => {
      if (!this.isHost && data.track) {
        this.player.loadTrack(data.track, data.playing);
        this.updateGroupNowPlaying();
      }
    });

    this.socket.on('peer_sync_playstate', (data) => {
      if (!this.isHost) {
        if (Math.abs(this.player.getCurrentTime() - data.time) > 2) {
           this.player.seekTo(data.time);
        }
        if (data.playing) this.player.play();
        else this.player.pause();
      }
    });

    this.socket.on('peer_sync_time', (data) => {
      if (!this.isHost) {
         if (Math.abs(this.player.getCurrentTime() - data.time) > 2) {
           this.player.seekTo(data.time);
         }
      }
    });

    this.socket.on('peer_dj_propose', (data) => {
      if (this.isHost) {
        this.app.showToast(`${data.user.name} propone: ${data.track.title}`);
        if (confirm(`${data.user.name} vorrebbe aggiungere "${data.track.title}" in coda. Accetti?`)) {
          this.player.addToQueue(data.track);
          this.app.showToast(`Aggiunto: ${data.track.title}`);
        }
      }
    });
  }

  initEvents() {
    document.getElementById('btn-create-session').addEventListener('click', () => this.createSession());
    document.getElementById('btn-join-session').addEventListener('click', () => this.joinSession());
    document.getElementById('btn-leave-session').addEventListener('click', () => this.leaveSession());
    document.getElementById('btn-send-chat').addEventListener('click', () => this.sendMessage());
    document.getElementById('btn-dj-propose').addEventListener('click', () => this.proposeTrack());
    
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  createSession() {
    this.sessionCode = this.generateCode();
    this.isHost = true;
    this.isActive = true;
    
    // I am the host
    this.myUser.isHost = true;
    this.participants = [ this.myUser ];

    // Let the server know we have "joined" our own room
    this.socket.emit('join_session', { sessionCode: this.sessionCode, user: this.myUser });

    this.showSession();
    this.app.showToast(`Sessione creata! Codice: ${this.sessionCode}`);
  }

  joinSession() {
    const code = document.getElementById('join-code').value.trim().toUpperCase();
    if (!code || code.length < 3) {
      this.app.showToast('Inserisci un codice valido');
      return;
    }
    
    this.sessionCode = code;
    this.myUser.isHost = false;
    
    // Send join request to server
    this.socket.emit('join_session', { sessionCode: this.sessionCode, user: this.myUser });
    
    this.app.showToast('Ricerca host in corso...');
    setTimeout(() => {
      if (!this.isActive) {
        this.app.showToast('Impossibile trovare la sessione o host offline.');
      }
    }, 5000);
  }

  leaveSession() {
    if (this.isActive) {
      this.socket.emit('session_leave', { sessionCode: this.sessionCode, user: this.myUser });
    }
    
    this.isActive = false;
    this.isHost = false;
    this.sessionCode = '';
    this.participants = [];
    this.chatMessages = [];

    document.getElementById('group-lobby').classList.remove('hidden');
    document.getElementById('group-session').classList.add('hidden');
    document.getElementById('join-code').value = '';

    this.app.showToast('Hai lasciato la sessione');
  }

  showSession() {
    document.getElementById('group-lobby').classList.add('hidden');
    document.getElementById('group-session').classList.remove('hidden');

    document.getElementById('session-code').textContent = this.sessionCode;
    this.renderParticipants();
    this.updateGroupNowPlaying();

    this.chatMessages = [];
    document.getElementById('chat-messages').innerHTML = '';
  }

  renderParticipants() {
    const list = document.getElementById('participants-list');
    document.getElementById('participant-count').textContent = this.participants.length;
    list.innerHTML = '';

    this.participants.forEach(user => {
      const el = document.createElement('div');
      el.className = 'participant';
      el.innerHTML = `
        <div class="participant-avatar" style="background: ${user.color || '#333'}">
          ${user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div class="participant-name">${user.name} ${user.id === this.myUser.id ? '(Tu)' : ''}</div>
          ${user.isHost ? '<div class="participant-host">Host</div>' : ''}
        </div>
      `;
      list.appendChild(el);
    });
  }

  updateGroupNowPlaying() {
    const container = document.getElementById('group-current-track');
    const track = this.player.currentTrack;

    if (track) {
      container.innerHTML = `
        <span class="material-icons-round" style="color: var(--accent)">music_note</span>
        <div>
          <div style="font-weight: 600">${track.title}</div>
          <div style="color: var(--text-secondary); font-size: 0.85rem">${track.artist}</div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <span class="material-icons-round">music_note</span>
        <span>Nessun brano in riproduzione</span>
      `;
    }
    
    // Broadcast track change if host
    if (this.isActive && this.isHost) {
      this.socket.emit('session_sync_track', {
        sessionCode: this.sessionCode,
        track: track,
        playing: this.player.isPlaying
      });
    }
  }

  addChatMessage(user, text, time) {
    this.chatMessages.push({ user, text, time });

    const container = document.getElementById('chat-messages');
    const el = document.createElement('div');
    el.className = 'chat-message';
    el.innerHTML = `
      <div class="chat-msg-avatar" style="background: ${user.color || '#333'}">
        ${user.name.charAt(0).toUpperCase()}
      </div>
      <div class="chat-msg-content">
        <div class="chat-msg-name">${user.name}</div>
        <div class="chat-msg-text">${text}</div>
        <div class="chat-msg-time">${time}</div>
      </div>
    `;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }

  async proposeTrack() {
    if (!this.isActive) return;
    
    const query = window.prompt("Cerca il brano che vuoi proporre all'host:");
    if (!query) return;

    this.app.showToast('Ricerca brano...');
    if (window.electronAPI && window.electronAPI.searchYoutube) {
      try {
        const vids = await window.electronAPI.searchYoutube(query, 1);
        if (vids && vids.length > 0) {
          const v = vids[0];
          const track = {
            id: 'dj_' + v.id,
            title: v.title,
            artist: v.artist || 'YouTube',
            album: '',
            duration: v.duration,
            color: '#6c5ce7',
            cover: v.cover,
            isYoutube: true,
            videoId: v.id,
            src: '',
            source: 'Proposta DJ'
          };
          
          if (this.isHost) {
            this.player.addToQueue(track);
            this.app.showToast(`Brano aggiunto: ${track.title}`);
          } else {
            this.socket.emit('session_dj_propose', {
              sessionCode: this.sessionCode,
              user: this.myUser,
              track: track
            });
            this.app.showToast(`Proposta inviata all'host: ${track.title}`);
          }
        } else {
          this.app.showToast('Nessun brano trovato.');
        }
      } catch (e) {
        console.error(e);
        this.app.showToast('Errore durante la ricerca.');
      }
    } else {
      this.app.showToast('Ricerca online non disponibile nel browser limitato.');
    }
  }

  sendMessage() {
    if (!this.isActive) return;
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Show locally
    this.addChatMessage(this.myUser, text, time);
    
    // Broadcast
    this.socket.emit('session_chat', {
       sessionCode: this.sessionCode,
       user: this.myUser,
       text: text,
       time: time
    });
    
    input.value = '';
  }
}

export default GroupSession;
