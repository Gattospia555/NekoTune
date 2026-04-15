// Nekotune Group Listening Session (Supabase Realtime)
import realtimeManager from './socket.js';

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

    // Periodic time sync interval reference
    this._syncInterval = null;

    this.initEvents();

    // Sync triggers for Host
    this.player.onPlayStateChange = (playing) => {
      if (this.isActive && this.isHost) {
        realtimeManager.broadcast('session_' + this.sessionCode, 'sync_playstate', {
          playing: playing,
          time: this.player.getCurrentTime()
        });
      }
    };
  }

  generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  setupRealtimeListeners() {
    const channelName = 'session_' + this.sessionCode;

    realtimeManager.joinChannel(channelName, {
      presenceKey: this.myUser.id,
      presenceData: {
        user: this.myUser,
        joinedAt: new Date().toISOString()
      },

      broadcastEvents: [
        'sync_track',
        'sync_playstate',
        'sync_time',
        'chat_message',
        'dj_propose',
        'host_welcome'
      ],

      onBroadcast: (event, data) => {
        switch (event) {
          case 'host_welcome':
            // Host sends welcome with current track state
            if (!this.isHost && data.targetUserId === this.myUser.id) {
              this.app.showToast('Unito con successo!');
              if (data.track) {
                this.player.loadTrack(data.track, data.playing);
                this.updateGroupNowPlaying();
              }
            }
            break;

          case 'sync_track':
            if (!this.isHost && data.track) {
              this.player.loadTrack(data.track, data.playing);
              this.updateGroupNowPlaying();
            }
            break;

          case 'sync_playstate':
            if (!this.isHost) {
              if (Math.abs(this.player.getCurrentTime() - data.time) > 2) {
                this.player.seekTo(data.time);
              }
              if (data.playing) this.player.play();
              else this.player.pause();
            }
            break;

          case 'sync_time':
            if (!this.isHost) {
              if (Math.abs(this.player.getCurrentTime() - data.time) > 2) {
                this.player.seekTo(data.time);
              }
            }
            break;

          case 'chat_message':
            this.addChatMessage(data.user, data.text, data.time);
            break;

          case 'dj_propose':
            if (this.isHost) {
              this.app.showToast(`${data.user.name} propone: ${data.track.title}`);
              if (confirm(`${data.user.name} vorrebbe aggiungere "${data.track.title}" in coda. Accetti?`)) {
                this.player.addToQueue(data.track);
                this.app.showToast(`Aggiunto: ${data.track.title}`);
              }
            }
            break;
        }
      },

      onPresenceSync: (state) => {
        // Rebuild participant list from presence state
        this.participants = [];
        Object.values(state).forEach(presences => {
          presences.forEach(p => {
            if (p.user) {
              this.participants.push(p.user);
            }
          });
        });
        this.renderParticipants();
        document.getElementById('participant-count').textContent = this.participants.length;
      },

      onPresenceJoin: (key, newPresences) => {
        newPresences.forEach(p => {
          if (p.user && p.user.id !== this.myUser.id) {
            this.app.showToast(`${p.user.name} si è unito alla sessione!`);

            // If I'm the host, send current track state to the new user
            if (this.isHost && this.player.currentTrack) {
              setTimeout(() => {
                realtimeManager.broadcast('session_' + this.sessionCode, 'host_welcome', {
                  targetUserId: p.user.id,
                  track: this.player.currentTrack,
                  playing: this.player.isPlaying,
                  time: this.player.getCurrentTime()
                });
              }, 500);
            }
          }
        });
      },

      onPresenceLeave: (key, leftPresences) => {
        leftPresences.forEach(p => {
          if (p.user) {
            this.app.showToast(`${p.user.name} ha lasciato la sessione`);
          }
        });
      },

      onSubscribed: () => {
        this.isActive = true;
        this.showSession();
        this.updateConnectionStatus('connected');
      },

      onError: (err) => {
        this.updateConnectionStatus('error');
        this.app.showToast('Errore di connessione alla sessione');
      }
    });

    // Periodic time sync (host to clients)
    this._syncInterval = setInterval(() => {
      if (this.isActive && this.isHost && this.player.isPlaying) {
        realtimeManager.broadcast('session_' + this.sessionCode, 'sync_time', {
          time: this.player.getCurrentTime()
        });
      }
    }, 5000);
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
    this.myUser.isHost = true;
    this.participants = [this.myUser];

    this.updateConnectionStatus('connecting');
    this.setupRealtimeListeners();

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
    this.isHost = false;

    this.updateConnectionStatus('connecting');
    this.setupRealtimeListeners();

    this.app.showToast('Connessione in corso...');

    // Timeout if nobody is in the session
    setTimeout(() => {
      if (this.isActive && this.participants.length <= 1) {
        // We're the only one — might be the wrong code
        this.app.showToast('Sei l\'unico nella sessione. Assicurati che il codice sia corretto.');
      }
    }, 8000);
  }

  leaveSession() {
    if (this.isActive) {
      realtimeManager.leaveChannel('session_' + this.sessionCode);
    }

    if (this._syncInterval) {
      clearInterval(this._syncInterval);
      this._syncInterval = null;
    }

    this.isActive = false;
    this.isHost = false;
    this.sessionCode = '';
    this.participants = [];
    this.chatMessages = [];

    document.getElementById('group-lobby').classList.remove('hidden');
    document.getElementById('group-session').classList.add('hidden');
    document.getElementById('join-code').value = '';

    this.updateConnectionStatus('disconnected');
    this.app.showToast('Hai lasciato la sessione');
  }

  updateConnectionStatus(status) {
    const statusEl = document.getElementById('group-connection-status');
    if (!statusEl) return;

    switch (status) {
      case 'connecting':
        statusEl.innerHTML = '<span class="material-icons-round" style="font-size:14px;color:var(--warning);animation:spin 1s linear infinite;">sync</span> Connessione...';
        statusEl.style.color = 'var(--warning)';
        break;
      case 'connected':
        statusEl.innerHTML = '<span class="material-icons-round" style="font-size:14px;color:var(--success);">cloud_done</span> Connesso via Supabase';
        statusEl.style.color = 'var(--success)';
        break;
      case 'error':
        statusEl.innerHTML = '<span class="material-icons-round" style="font-size:14px;color:var(--danger);">cloud_off</span> Errore connessione';
        statusEl.style.color = 'var(--danger)';
        break;
      case 'disconnected':
        statusEl.innerHTML = '';
        break;
    }
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
      realtimeManager.broadcast('session_' + this.sessionCode, 'sync_track', {
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
            realtimeManager.broadcast('session_' + this.sessionCode, 'dj_propose', {
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

    // Broadcast via Supabase Realtime
    realtimeManager.broadcast('session_' + this.sessionCode, 'chat_message', {
      user: this.myUser,
      text: text,
      time: time
    });

    input.value = '';
  }
}

export default GroupSession;
