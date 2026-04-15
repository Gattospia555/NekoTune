import { io } from 'socket.io-client';

class SocketManager {
  constructor() {
    // Connect to the local Node.js server. Users can configure this later or we can inject it via ENV.
    this.serverUrl = 'http://localhost:3000';
    this.socket = null;
    this.connected = false;
  }

  connect() {
    if (this.socket) return this.socket;

    this.socket = io(this.serverUrl, {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

    this.socket.on('connect', () => {
      console.log('Connected to Nekotune Server with ID:', this.socket.id);
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Nekotune Server.');
      this.connected = false;
    });

    this.socket.on('connect_error', (err) => {
      console.warn('Socket connection error:', err.message);
    });

    return this.socket;
  }

  getSocket() {
    if (!this.socket) {
      return this.connect();
    }
    return this.socket;
  }
}

export default new SocketManager();
