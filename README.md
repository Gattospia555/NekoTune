<div align="center">
  <img src="https://raw.githubusercontent.com/Gattospia555/NekoTune/main/NekoTune/src/assets/nekotune_logo.png" width="200" alt="NekoTune Logo"/>
  <h1>NekoTune 🐾</h1>
  <p><em>A breathtaking music player alternative, 100% free. The power of YouTube with the UI of Spotify.</em></p>
</div>

<hr/>

## 🐱 What is NekoTune?
**NekoTune** is a desktop and web music player that combines the massive databases of **YouTube and YouTube Music** with a modern, fluid, Spotify Premium-like UI/UX. No ads, no interruptions, high-quality audio, and tons of interactive features for creators and listeners alike.

## ✨ Key Features

- 🎵 **Unlimited Music Library**: Thanks to the integration of `ytmusic-api`, you can search and listen to millions of songs, remixes, covers, and podcasts without limits.
- 🎨 **Modern Design (Glassmorphism)**: Gorgeous user interface featuring blur effects, smooth CSS animations, and reactive transitions.
- 📶 **Offline Cache Playback**: Smart track caching and management via IndexedDB so you can listen to your favorite songs off the grid.
- 🧑‍🎤 **Artist Profiles & Following**: Just like major platforms, you can visit artist profiles, discover their Top Tracks, explore albums, and follow your favorites!
- 🎧 **Flexible Audio Quality**: Save bandwidth or listen at maximum quality through the smart Audio Settings system powered by `youtube-dl-exec`.
- 🎚️ **Full Equalizer & 8D Audio**: Customize your sound with Spatial Audio 8D and various built-in presets (Bass Boost, Pop, Flat, etc.).
- 🤝 **Synchronized Playback (Listen Together)**: Listen to music simultaneously with your friends in a virtual room.

## 🛠️ Technologies Used

The project is built on a modern hybrid stack:
- **Core Frontend**: Vanilla HTML, Modern CSS, and JavaScript (ES6+).
- **Bundler & Build**: [Vite](https://vitejs.dev/) - for lightning-fast HMR and scalability.
- **Backend / Wrapper**: [Electron](https://www.electronjs.org/) - Transforms the Web App into a fast, native Windows/Mac application with an IPC bridge for local filesystem operations.
- **Mobile Crossover**: [CapacitorJS](https://capacitorjs.com/) (Coming Soon) - To compile the codebase for Android platforms!
- **Data Engine**: `ytmusic-api` and `youtube-dl-exec`.

## 🚀 Getting Started Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Gattospia555/NekoTune.git
   cd NekoTune
   cd NekoTune
   ```

2. **Install Dependencies**
   You will need to have [Node.js](https://nodejs.org) installed on your PC. 
   ```bash
   npm install
   ```

3. **Start Development Mode (Electron + Vite)**
   ```bash
   npm run dev
   ```

4. **Build as PC Executable (Windows)**
   This script will prepare and bundle both the Vite frontend and Electron-builder.
   ```bash
   npm run build
   ```
   *The executable will be ready in the `dist/win-unpacked/` directory.*

## 📋 Roadmap
- [x] Connect audio streams to a local proxy in high quality
- [x] Artist Profiles and Personal Playlists
- [x] Quality settings and cache clearing
- [ ] Mobile Android porting and compilation via **CapacitorJS**
- [ ] Add dynamic synchronized Lyrics

---
<div align="center">
  <i>Developed with Passion and Code ❤️.</i>
</div>
