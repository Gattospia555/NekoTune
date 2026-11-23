# Schermate e video dell'app per il sito

Le immagini `docs/assets/app-*.webp` e i video `docs/assets/app-*.mp4` sono presi
dall'app vera (ramo `fix/grafica` di NekoTune-Dev) aperta in un browser con dati
di prova: brani, copertine, account "Mia" e amici (Luna, Kiro, Sole, Teo, Pixel)
sono inventati, e la rete è finta (`mock.js` risponde al posto di Supabase e di
Electron). Nessun dato vero entra nelle immagini.

Come rifarle:

1. Nella cartella dell'app: `npm ci --ignore-scripts`, poi avviare Vite solo
   per il browser (senza Electron) su `localhost:5174` con una config minima
   (`base: './'`, `server.port: 5174`), e mettere un file audio qualsiasi in
   `public/demo-audio.wav`.
2. `python3 gen.py` crea `art.json`/`art.js` (copertine e avatar disegnati).
3. `python3 shots.py` salva le schermate in `out/`, `python3 rec.py` registra i
   video in `vid/` (Playwright + Chrome). I caratteri Google vengono serviti dai
   pacchetti npm `@fontsource/*` e `material-symbols` (vedi `harness.py`).
4. Ridimensionare a 1600×1000 in WebP; i video vanno tagliati e convertiti in
   MP4 H.264 1280×800 senza audio (ffmpeg).
