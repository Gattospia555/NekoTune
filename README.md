<div align="center">
  <img src="https://raw.githubusercontent.com/Gattospia555/NekoTune/main/NekoTune/src/assets/nekotune_logo.png" width="200" alt="NekoTune Logo"/>
  <h1>NekoTune 🐾</h1>
  <p><em>Un'alternativa musicale dal design mozzafiato, 100% gratuita. Potenza di YouTube, UI di Spotify.</em></p>
</div>

<hr/>

## 🐱 Cos'è NekoTune?
**NekoTune** è un player musicale desktop e web-app che unisce l'immenso database di **YouTube e YouTube Music** con una UI/UX moderna, fluida e simile a Spotify Premium. Nessuna pubblicità, nessuna interruzione, audio in alta qualità e tante feature interattive per i creatori e ascoltatori.

## ✨ Caratteristiche Principali

- 🎵 **Libreria Musicale Illimitata**: Grazie all'integrazione di `ytmusic-api`, puoi cercare e ascoltare milioni di brani, remix, copertine e podcast senza limitazioni.
- 🎨 **Design Moderno (Glassmorphism)**: Interfaccia utente stupenda dotata di effetti blur, animazioni CSS fluide e transizioni reattive.
- 📶 **Riproduzione Offline in Cache**: Gestione intelligente e caching dei brani con IndexedDB per poter ascoltare i tuoi brani off-grid.
- 🧑‍🎤 **Profili e Segui Artisti**: Proprio come le piattaforme Major, puoi visitare i profili degli artisti, scoprire i Top Tracks, album e seguire i tuoi preferiti!
- 🎧 **Qualità Audio Flessibile**: Riduci i consumi o ascolta al massimo della qualità tramite il sistema Audio Settings intelligente basato su `youtube-dl-exec`.
- 🎚️ **Equalizzatore Completo e 8D Audio**: Personalizza il tuo suono grazie allo Spatial Audio 8D e vari preset (Bass Boost, Pop, Flat, ecc.).
- 🤝 **Riproduzione Sincronizzata (Listen Together)**: Ascolta musica in simultanea con gli amici in una stanza virtuale.

## 🛠️ Tecnologie Utilizzate

Il progetto è costruito su uno Stack moderno ibrido:
- **Frontend Core**: HTML Vanilla, CSS Moderno, e JavaScript (ES6+).
- **Bundler e Build**: [Vite](https://vitejs.dev/) - per un HMR fulmineo ed espandibilità.
- **Backend / Wrapper**: [Electron](https://www.electronjs.org/) - Trasforma l'App Web in un veloce applicativo Windows/Mac nativo con IPC bridge per il filesystem locale.`
- **Mobile Crossover**: [CapacitorJS](https://capacitorjs.com/) (In Arrivo) - Per compilare la codebase su piattaforma Android!
- **Data Engine**: `ytmusic-api` e `youtube-dl-exec`.

## 🚀 Come avviare lo sviluppo locale

1. **Clona la Repository**
   ```bash
   git clone https://github.com/Gattospia555/NekoTune.git
   cd NekoTune
   cd NekoTune
   ```

2. **Installa le dipendenze**
   Dovrai avere [Node.js](https://nodejs.org) installato nel tuo PC. 
   ```bash
   npm install
   ```

3. **Avvia la modalità Sviluppo (Electron + Vite)**
   ```bash
   npm run dev
   ```

4. **Compila in EXE per PC (Windows)**
   Questo script preparerà sia il frontend Vite sia Electron-builder in un pacchetto.
   ```bash
   npm run build
   ```
   *L'eseguibile sarà pronto nella directory `dist/win-unpacked/`.*

## 📋 Prossimi Obiettivi (Roadmap)
- [x] Connettere gli stream audio ad un proxy locale in alta qualità
- [x] Profili Artista e Playlist personali
- [x] Impostazioni qualità e svuotamento cache
- [ ] Porting e compilazione Mobile Android tramite **CapacitorJS**
- [ ] Aggiungere testi sincronizzati dinamici (Lyrics)

---
<div align="center">
  <i>Sviluppato con Passione e Code ❤️.</i>
</div>
