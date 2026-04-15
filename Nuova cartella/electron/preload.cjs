const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  windowMinimize: () => ipcRenderer.send('window-min'),
  windowMaximize: () => ipcRenderer.send('window-max'),
  windowClose: () => ipcRenderer.send('window-close'),
  onMediaPlayPause: (callback) => ipcRenderer.on('media-play-pause', callback),
  onMediaNextTrack: (callback) => ipcRenderer.on('media-next-track', callback),
  onMediaPrevTrack: (callback) => ipcRenderer.on('media-prev-track', callback),

  // Real Audio API
  searchYoutube: (query, limit = 10) => ipcRenderer.invoke('search-youtube', query, limit),
  getStreamUrl: (videoId) => ipcRenderer.invoke('get-stream-url', videoId),
  parseSpotifyUrl: (url) => ipcRenderer.invoke('parse-spotify-url', url),
  
  // Spotify OAuth
  spotifyAuth: () => ipcRenderer.invoke('spotify-auth'),
  spotifyGetPlaylists: (token) => ipcRenderer.invoke('spotify-get-playlists', token),
  spotifyGetPlaylistTracks: (token, playlistId) => ipcRenderer.invoke('spotify-get-playlist-tracks', token, playlistId),
  spotifyGetLikedSongs: (token) => ipcRenderer.invoke('spotify-get-liked-songs', token),

  // App Features
  updateDiscord: (data) => ipcRenderer.send('update-discord', data),
  togglePiP: (enable) => ipcRenderer.send('toggle-pip', enable),
});
