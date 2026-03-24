// SonicWave — Group Listening Session
import { DEMO_USERS, DEMO_CHAT_MESSAGES } from './data.js';

class GroupSession {
  constructor(app, player) {
    this.app = app;
    this.player = player;
    this.isActive = false;
    this.isHost = false;
    this.sessionCode = '';
    this.participants = [];
    this.chatMessages = [];
    this.chatSimInterval = null;

    this.initEvents();
  }

  initEvents() {
    document.getElementById('btn-create-session').addEventListener('click', () => {
      this.createSession();
    });

    document.getElementById('btn-join-session').addEventListener('click', () => {
      this.joinSession();
    });

    document.getElementById('btn-leave-session').addEventListener('click', () => {
      this.leaveSession();
    });

    document.getElementById('btn-send-chat').addEventListener('click', () => {
      this.sendMessage();
    });

    document.getElementById('chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    document.getElementById('join-code').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.joinSession();
    });
  }

  generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  createSession() {
    this.sessionCode = this.generateCode();
    this.isHost = true;
    this.isActive = true;

    // Host + random participants
    this.participants = [
      DEMO_USERS[0],
      ...DEMO_USERS.slice(1, 3 + Math.floor(Math.random() * 3))
    ];

    this.showSession();
    this.startChatSimulation();
    this.app.showToast(`Sessione creata! Codice: ${this.sessionCode}`);
  }

  joinSession() {
    const code = document.getElementById('join-code').value.trim().toUpperCase();
    if (!code || code.length < 3) {
      this.app.showToast('Inserisci un codice valido');
      return;
    }

    this.sessionCode = code;
    this.isHost = false;
    this.isActive = true;

    this.participants = [
      { ...DEMO_USERS[0], isHost: false },
      { ...DEMO_USERS[1], isHost: true },
      ...DEMO_USERS.slice(2, 4)
    ];

    this.showSession();
    this.startChatSimulation();
    this.app.showToast('Ti sei unito alla sessione!');
  }

  leaveSession() {
    this.isActive = false;
    this.isHost = false;
    this.sessionCode = '';
    this.participants = [];
    this.chatMessages = [];

    if (this.chatSimInterval) {
      clearInterval(this.chatSimInterval);
      this.chatSimInterval = null;
    }

    document.getElementById('group-lobby').classList.remove('hidden');
    document.getElementById('group-session').classList.add('hidden');
    document.getElementById('join-code').value = '';

    this.app.showToast('Hai lasciato la sessione');
  }

  showSession() {
    document.getElementById('group-lobby').classList.add('hidden');
    document.getElementById('group-session').classList.remove('hidden');

    // Session code
    document.getElementById('session-code').textContent = this.sessionCode;

    // Participants
    this.renderParticipants();

    // Update now playing
    this.updateGroupNowPlaying();

    // Chat
    this.chatMessages = [];
    document.getElementById('chat-messages').innerHTML = '';

    // Add initial messages with delay
    this.addInitialMessages();
  }

  renderParticipants() {
    const list = document.getElementById('participants-list');
    document.getElementById('participant-count').textContent = this.participants.length;
    list.innerHTML = '';

    this.participants.forEach(user => {
      const el = document.createElement('div');
      el.className = 'participant';
      el.innerHTML = `
        <div class="participant-avatar" style="background: ${user.color}">
          ${user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div class="participant-name">${user.name}</div>
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
  }

  async addInitialMessages() {
    for (const msg of DEMO_CHAT_MESSAGES) {
      await this.delay(800 + Math.random() * 1200);
      if (!this.isActive) return;
      this.addChatMessage(msg.userId, msg.text, msg.time);
    }
  }

  startChatSimulation() {
    const messages = [
      'Le canzoni sono fantastiche! 🎶',
      'Mi piace molto questa vibe ✨',
      'Prossima canzone?',
      'Alziamo il volume! 🔊',
      'Questa mi ricorda l\'estate scorsa ☀️',
      'Che bel beat 🥁',
      'Aggiungiamola alla playlist del gruppo',
      'Chi ha scelto questa? È bellissima!',
      'Vibe perfetta per la serata 🌙',
      'Qualcuno la conosce? 🤔'
    ];

    this.chatSimInterval = setInterval(() => {
      if (!this.isActive) {
        clearInterval(this.chatSimInterval);
        return;
      }

      const randomUser = DEMO_USERS[1 + Math.floor(Math.random() * (DEMO_USERS.length - 1))];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      this.addChatMessage(randomUser.id, randomMsg, time);
    }, 8000 + Math.random() * 12000);
  }

  addChatMessage(userId, text, time) {
    const user = DEMO_USERS.find(u => u.id === userId);
    if (!user) return;

    this.chatMessages.push({ userId, text, time });

    const container = document.getElementById('chat-messages');
    const el = document.createElement('div');
    el.className = 'chat-message';
    el.innerHTML = `
      <div class="chat-msg-avatar" style="background: ${user.color}">
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

  sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    this.addChatMessage('u1', text, time);
    input.value = '';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default GroupSession;
