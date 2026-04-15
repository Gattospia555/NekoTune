import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// A simple in-memory state store to maintain some persistence 
// for playlists or session states if a user disconnects or joins late.
const sessions = {};
const collabPlaylists = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // ============================================
  // GROUP SESSIONS (SESSION_CODE)
  // ============================================
  socket.on('join_session', ({ sessionCode, user }) => {
    socket.join(sessionCode);
    console.log(`User ${user.name} joined session ${sessionCode}`);
    
    // Broadcast join request to the room. The host is responsible for responding with a JOIN_ACCEPT
    socket.to(sessionCode).emit('peer_join_request', { 
      sessionCode, 
      senderId: user.id || socket.id, 
      user,
      socketId: socket.id
    });
  });

  socket.on('session_host_accept', ({ sessionCode, toSocketId, participants }) => {
    // Host accepts the user, sending participants back directly to them or room
    io.to(toSocketId).emit('peer_join_accept', { participants });
    // And let everyone else know the participant list updated
    socket.to(sessionCode).emit('peer_participant_update', { participants });
  });

  socket.on('session_leave', ({ sessionCode, user }) => {
    socket.leave(sessionCode);
    socket.to(sessionCode).emit('peer_participant_leave', { senderId: user.id });
  });

  socket.on('session_sync_track', ({ sessionCode, track, playing }) => {
    socket.to(sessionCode).emit('peer_sync_track', { track, playing });
  });

  socket.on('session_sync_playstate', ({ sessionCode, time, playing }) => {
    socket.to(sessionCode).emit('peer_sync_playstate', { time, playing });
  });

  socket.on('session_sync_time', ({ sessionCode, time }) => {
    socket.to(sessionCode).emit('peer_sync_time', { time });
  });

  socket.on('session_chat', ({ sessionCode, user, text, time }) => {
    socket.to(sessionCode).emit('peer_chat', { user, text, time });
  });

  socket.on('session_dj_propose', ({ sessionCode, user, track }) => {
    socket.to(sessionCode).emit('peer_dj_propose', { user, track });
  });

  // ============================================
  // COLLABORATIVE PLAYLISTS (PLAYLIST_ID)
  // ============================================
  socket.on('collab_join', ({ playlistId, shareCode, user }) => {
    // They join a room unique to the collab playlist
    socket.join(playlistId);
    socket.to(playlistId).emit('collab_peer_join', { user });
  });

  socket.on('collab_add_track', ({ playlistId, track }) => {
    socket.to(playlistId).emit('collab_peer_add_track', { track });
  });

  socket.on('collab_remove_track', ({ playlistId, trackId }) => {
    socket.to(playlistId).emit('collab_peer_remove_track', { trackId });
  });

  socket.on('collab_update_meta', ({ playlistId, data }) => {
    socket.to(playlistId).emit('collab_peer_update_meta', { data });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Ideally we would loop through rooms and emit leave events here
    // But since clients manually emit leave events, this is mostly cleanup
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Nekotune Signaling Server running on http://localhost:${PORT}`);
});
