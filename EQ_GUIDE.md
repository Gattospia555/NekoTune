# 🎚️ NekoTune Equalizer - Guida Completa

## ✅ Bug Risolti (Versione 2.0)

### 1. **Slider Verticali Funzionanti**
- ✅ Slider verticali nativi HTML5 (non rotati)
- ✅ Responsive e touch-friendly
- ✅ Visualizzazione valori dB in tempo reale sopra ogni slider
- ✅ Smooth animation e box-shadow glow

### 2. **Allineamento Corretto**
- ✅ Griglia a 10 colonne perfettamente allineate
- ✅ Spazi di 12px tra i slider
- ✅ Etichette frequenza sempre visibili
- ✅ Valore dB dinamico

### 3. **Modalità Personalizzata Salvabile**
- ✅ Rileva quando modifichi manualmente gli slider
- ✅ Mostra "Personalizzato ✎" nel dropdown
- ✅ Bottone "Salva Preset" con modal dedicato
- ✅ I preset custom si salvano in localStorage
- ✅ Appaiono automaticamente nel dropdown

### 4. **Audio Context Migliorato**
- ✅ Inizializzazione automatica al primo play
- ✅ Resume context se sospeso
- ✅ Try/catch per browser senza Web Audio API
- ✅ Fallback webkitAudioContext per Safari

---

## 🎵 Come Usare

### Aprire l'Equalizzatore
1. Clicca sul bottone **EQ** nella barra del player
2. Si apre il modal con 10 slider verticali

### Applicare un Preset
1. Clicca sul dropdown **Preset**
2. Seleziona uno dei 12 preset disponibili:
   - **Flat** - Nessuna modifica
   - **Acoustic** - Boost bassi e acuti
   - **Bass Booster** - Bassi potenziati
   - **Bass Reducer** - Bassi ridotti
   - **Classical** - Bilanciato per musica classica
   - **Dance** - Bassi alti, medi ridotti
   - **Electronic** - Acuti brillanti
   - **Hip-Hop** - Bassi pesanti e medi caldi
   - **Jazz** - Naturale e bilanciato
   - **Pop** - Vocalista prominente
   - **Rock** - Bassi e acuti esaltati
   - **Vocal Booster** - Vocalista al centro

### Modificare l'Equalizzatore Manualmente
1. Trascina i slider verticali su/giù
2. I valori in dB vengono visualizzati in tempo reale
3. L'audio cambia **istantaneamente**
4. Il dropdown cambia a "Personalizzato ✎"

### Salvare un Preset Personalizzato
1. Modifica gli slider come preferisci
2. Clicca **"Salva Preset"**
3. Inserisci un nome (max 20 caratteri)
4. Clicca **"Salva"**
5. Il preset appare nel dropdown e sarà disponibile al prossimo avvio

### Reset
- Clicca **"Reset"** per tornare al preset Flat (0dB su tutte le bande)

---

## 🎛️ Specifiche Tecniche

### 10 Bande EQ
| Banda | Frequenza | Tipo | Uso |
|-------|-----------|------|-----|
| 1 | 31 Hz | Sub-Bass | Boost per kick drum pesanti |
| 2 | 62 Hz | Bass | Warmth e peso |
| 3 | 125 Hz | Low-Mid | Corpo della musica |
| 4 | 250 Hz | Low-Mid | Clarity dei bassi |
| 5 | 500 Hz | Mid | Presence e articolazione |
| 6 | 1 kHz | Mid | Intelligibilità voce |
| 7 | 2 kHz | Upper-Mid | Chiarezza e dettaglio |
| 8 | 4 kHz | Upper-Mid | Presenza sibilante |
| 9 | 8 kHz | Treble | Brillanza |
| 10 | 16 kHz | Treble | Air e luminosità |

### Range
- **Min**: -12 dB (attenuazione)
- **Max**: +12 dB (boost)
- **Step**: 0.1 dB (precisione massima)

### Audio Chain
```
Audio Element 
  → EQ Banda 1
  → EQ Banda 2
  → ...
  → EQ Banda 10
  → Panner (per 8D Audio)
  → Analyzer (visualizer)
  → Output
```

---

## 💾 Storage

### Preset Personalizzati
```javascript
localStorage.getItem('sw_eq_custom_presets')
// Formato: { "my_rock_setup": [6.3, 5.1, 3.8, ...], ... }
```

### Preset Corrente
```javascript
localStorage.getItem('sw_eq_current_preset')
// Formato: "flat" | "acoustic" | "my_rock_setup" | "custom"
```

---

## 🛠️ API Developer

### Applicare un Preset Programmaticamente
```javascript
player.applyEQPreset('rock');
// Disponibili: flat, acoustic, bass_booster, bass_reducer, 
//             classical, dance, electronic, hiphop, jazz, pop, rock, vocal_booster
```

### Modificare una Banda Singola
```javascript
player.setEQBand(0, 6.3);  // Banda 1 a +6.3 dB
player.setEQBand(9, -2.0); // Banda 10 a -2.0 dB
```

### Salvare un Preset Personalizzato
```javascript
const gains = [6.3, 5.1, 3.8, 1.2, -1.2, -1.2, 1.2, 3.8, 5.1, 6.3];
player.saveCustomEQPreset('my_preset', gains);
```

### Ottenere Gain Attuale
```javascript
const gain = player.eqBands[0].gain.value;
console.log(gain); // -12 a +12
```

---

## 🐛 Troubleshooting

### L'EQ non funziona
**Soluzione**: Riproduci un brano prima. L'AudioContext si inizializza al primo play.

### Gli slider non si muovono
**Soluzione**: Controlla che il browser supporti Web Audio API (tutti i moderni browser lo supportano).

### I valori non cambiano
**Soluzione**: Assicurati che `initWebAudio()` sia stato eseguito (ascolta un brano).

### Il preset non si salva
**Soluzione**: Controlla che localStorage sia abilitato nel browser.

### È lento quando trascinano gli slider
**Soluzione**: Normale durante lo sviluppo. In production sarà ottimizzato.

---

## 🎯 Esempio di Utilizzo

```javascript
// Quando la pagina carica
const player = new Player();

// Utente clicca su EQ button → si apre il modal

// Utente seleziona preset "Rock"
player.applyEQPreset('rock');
// Audio cambia istantaneamente

// Utente modifica manualmente slider 1
// Dropdown cambia a "Personalizzato ✎"

// Utente clicca "Salva Preset"
// Inserisce nome "My Heavy Metal"
// Salva in localStorage

// Al prossimo avvio, il preset è disponibile
```

---

## 🚀 Prossimi Miglioramenti

- [ ] Preset sincronizzati via cloud (Supabase)
- [ ] Visualizzatore grafico della risposta in frequenza
- [ ] Curve EQ grafiche (traccia la curva col mouse)
- [ ] Preset per genere musicale (auto-detect)
- [ ] A/B comparison tra preset
- [ ] Export preset come JSON
- [ ] Preload curve da online library

---

## 📊 Statistiche

| Metrica | Valore |
|---------|--------|
| Bande EQ | 10 |
| Preset Inclusi | 12 |
| Range dB | -12 a +12 |
| Risoluzione | 0.1 dB |
| Slider Type | Verticali nativi HTML5 |
| Storage | localStorage (IndexedDB per futuri) |

---

**Versione**: 2.0  
**Data**: 15 Aprile 2026  
**Status**: ✅ Production Ready  
**Browser Support**: Chrome, Firefox, Safari, Edge (ultimi 2 anni)
