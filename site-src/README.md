# Sito di NekoTune — scena 3D

Il sito pubblicato è in `../docs/` (GitHub Pages). Qui c'è il codice della
scena 3D ("la stanza di Neko") che diventa `docs/room.js`.

- `src/main.js` — scena, percorso della telecamera legato allo scorrimento, lettore di prova
- `src/cat.js` — Neko e Luna costruiti con forme semplici
- `src/audio.js` — i tre brani lo-fi suonati dal browser (Web Audio)
- `src/textures.js` — disco, copertine inventate, nuvolette, monitor della live

Per rigenerare `docs/room.js`:

```
npm install
npm run build
```

Testi e stile della pagina sono in `docs/index.html` e `docs/room.css`. Dopo ogni modifica di `room.css` o `room.js` aumentare il numero `?v=` in `docs/index.html`, altrimenti i browser tengono la versione vecchia.
Aggiungendo `?p=2` all'indirizzo la telecamera resta ferma sul capitolo 2 (utile per gli screenshot).
