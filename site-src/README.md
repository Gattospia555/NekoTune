# Sito di NekoTune — la stanza di Neko

Il sito pubblicato è in `../docs/` (GitHub Pages). Qui c'è il codice che diventa `docs/room.js` e il modello della stanza.

- `blender/room.py` — la stanza costruita in Blender da Python ed esportata in `docs/media/room.glb`
- `src/mascot.js` — Neko e Luna disegnati come la mascotte dell'app (stessi tracciati di `src/js/ui/mascot.js` di NekoTune), su canvas
- `src/cat3d.js` — Neko e Luna in 3D: ogni parte è il contorno del disegno della mascotte "gonfiato" (testa, orecchie, corpo, zampe, coda a nota), con la faccia dipinta sulla testa
- `src/brain.js` — il "cervello" dei gatti: dove andare nella stanza (evitando mobili e cuscino), gesti (stiracchiarsi, lavarsi la zampa, testa inclinata, inseguire la coda, saltare sul gomitolo, salutare, miagolare) e balli diversi a tempo di musica. Neko ogni tanto si sveglia da solo, fa un giro e torna a dormire. Ogni movimento passa da "molle" (niente scatti), camminano con accelerazione, curve e passo molleggiato, e i gesti hanno preparazione e atterraggio. Per i test: `?dbg&ff=6` accelera i gatti; `?dbg&fixed=24&film` avanza un fotogramma alla volta (per filmarli)
- `src/mascotshot.js` — pagina di prova (`mascot.html?m=asleep|awake|friends`) per le immagini delle sezioni
- `src/main.js` — lettore di prova, scorrimento, orologio nell'intestazione
- `src/scene.js` — la scena 3D: luce, telecamera, oggetti cliccabili, TV con l'app
- `src/toon.js` — ombre a due toni e contorni a inchiostro (stile cartone animato)
- `src/daylight.js` — colori e luce che seguono l'ora del computer di chi visita
- `src/product.js` — sezioni dopo la stanza (player che scorre, temi, chat, download)
- `src/audio.js` — i tre brani lo-fi suonati dal browser (Web Audio)
- `src/textures.js` — copertine inventate, note, cuori, monitor della live
- `src/look.js` — pagina di prova per fare le immagini (`look.html`)

Rigenerare la stanza (serve il pacchetto Python `bpy`, cioè Blender come modulo):

```
python3 blender/room.py -- ../docs/media/room.glb
```

Rigenerare `docs/room.js`:

```
npm install
npm run build
```

Dopo ogni modifica di `room.css` o `room.js` aumentare il numero `?v=` in `docs/index.html`, altrimenti i browser tengono la versione vecchia.

Parametri utili nell'indirizzo: `?h=22` finge che siano le 22 (anche `h=8`, `h=15`, `h=18.5`), `?p=1` blocca la telecamera alla fine del tuffo nella TV, `?q=0` qualità bassa.

Caratteri: Dela Gothic One e Zen Maru Gothic (licenza SIL Open Font License, file in `docs/fonts/`).
