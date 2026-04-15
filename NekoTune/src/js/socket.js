// Nekotune — Realtime Manager (Supabase Realtime Channels)
// Replaces the old Socket.io-based socket.js

class RealtimeManager {
  constructor() {
    this.supabase = null;
    this.channels = {};
    this.connected = false;
  }

  getSupabase() {
    if (!this.supabase) {
      this.supabase = document.supabase;
    }
    return this.supabase;
  }

  /**
   * Join a Realtime channel (room). Uses Broadcast + Presence.
   * @param {string} channelName - Channel/room name (e.g., session code or collab playlist code)
   * @param {object} handlers - Event handlers: { onBroadcast, onPresenceSync, onPresenceJoin, onPresenceLeave }
   * @returns {object} channel
   */
  joinChannel(channelName, handlers = {}) {
    const sb = this.getSupabase();
    if (!sb) {
      console.warn('Supabase not initialized yet');
      return null;
    }

    // If already in this channel, leave it first
    if (this.channels[channelName]) {
      this.leaveChannel(channelName);
    }

    const channel = sb.channel(channelName, {
      config: {
        broadcast: { self: false },
        presence: { key: handlers.presenceKey || 'user_' + Date.now().toString(36) }
      }
    });

    // Register broadcast event listeners
    if (handlers.onBroadcast) {
      // Listen to all events via a catch-all pattern
      const events = handlers.broadcastEvents || [];
      events.forEach(eventName => {
        channel.on('broadcast', { event: eventName }, (payload) => {
          handlers.onBroadcast(eventName, payload.payload);
        });
      });
    }

    // Presence
    if (handlers.onPresenceSync) {
      channel.on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        handlers.onPresenceSync(state);
      });
    }
    if (handlers.onPresenceJoin) {
      channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
        handlers.onPresenceJoin(key, newPresences);
      });
    }
    if (handlers.onPresenceLeave) {
      channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        handlers.onPresenceLeave(key, leftPresences);
      });
    }

    // Subscribe
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        this.connected = true;
        console.log(`[Realtime] Joined channel: ${channelName}`);

        // Track presence if user data provided
        if (handlers.presenceData) {
          await channel.track(handlers.presenceData);
        }

        if (handlers.onSubscribed) handlers.onSubscribed(channel);
      } else if (status === 'CHANNEL_ERROR') {
        console.error(`[Realtime] Channel error: ${channelName}`);
        if (handlers.onError) handlers.onError('CHANNEL_ERROR');
      } else if (status === 'TIMED_OUT') {
        console.warn(`[Realtime] Channel timed out: ${channelName}`);
        if (handlers.onError) handlers.onError('TIMED_OUT');
      }
    });

    this.channels[channelName] = channel;
    return channel;
  }

  /**
   * Send a broadcast message to a channel
   */
  broadcast(channelName, event, payload) {
    const channel = this.channels[channelName];
    if (!channel) {
      console.warn(`[Realtime] Not in channel: ${channelName}`);
      return;
    }
    channel.send({
      type: 'broadcast',
      event: event,
      payload: payload
    });
  }

  /**
   * Update presence data
   */
  async trackPresence(channelName, data) {
    const channel = this.channels[channelName];
    if (!channel) return;
    await channel.track(data);
  }

  /**
   * Leave a channel
   */
  leaveChannel(channelName) {
    const channel = this.channels[channelName];
    if (channel) {
      const sb = this.getSupabase();
      sb.removeChannel(channel);
      delete this.channels[channelName];
      console.log(`[Realtime] Left channel: ${channelName}`);
    }
  }

  /**
   * Get presence state for a channel
   */
  getPresenceState(channelName) {
    const channel = this.channels[channelName];
    if (!channel) return {};
    return channel.presenceState();
  }

  /**
   * Get a raw channel reference (for Socket.io compatibility shim in playlists)
   */
  getChannel(channelName) {
    return this.channels[channelName] || null;
  }

  /**
   * Check if connected
   */
  isConnected() {
    return this.connected;
  }
}

export default new RealtimeManager();
