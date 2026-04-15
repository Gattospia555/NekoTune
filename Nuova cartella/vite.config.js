import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import fs from 'node:fs';
import path from 'node:path';

// Copy actual preload.cjs to dist-electron so it's always up to date
const preloadDir = path.resolve(process.cwd(), 'dist-electron');
if (!fs.existsSync(preloadDir)) fs.mkdirSync(preloadDir, { recursive: true });
const preloadSrc = path.resolve(process.cwd(), 'electron', 'preload.cjs');
fs.copyFileSync(preloadSrc, path.resolve(preloadDir, 'preload.cjs'));

export default defineConfig({
  plugins: [
    electron([
      {
        entry: 'electron/main.js',
        vite: {
          build: {
            rollupOptions: {
              external: ['electron', 'ytmusic-api', 'youtube-dl-exec', 'spotify-url-info', 'discord-rpc']
            }
          }
        }
      }
    ]),
    renderer(),
  ],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
