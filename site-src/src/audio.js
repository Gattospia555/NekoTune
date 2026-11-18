// A tiny lo-fi band made with Web Audio: keys, bass, drums, vinyl crackle.
// Everything is generated in the browser — no audio files.

export const TRACKS = [
  {
    title: "Pisolino sul davanzale",
    artist: "Neko & Friends",
    bpm: 74,
    label: "#FFB37E",
    chords: [
      [53, 57, 60, 64],
      [52, 55, 59, 62],
      [50, 53, 57, 60],
      [48, 52, 55, 59],
    ],
    roots: [41, 40, 38, 36],
    length: 192,
  },
  {
    title: "Fusa a 80 bpm",
    artist: "Kite Club",
    bpm: 80,
    label: "#C9B6EC",
    chords: [
      [57, 60, 64, 67],
      [50, 53, 57, 60, 64],
      [55, 59, 62, 65],
      [48, 52, 55, 59],
    ],
    roots: [45, 38, 43, 36],
    length: 168,
  },
  {
    title: "Gomitolo blu",
    artist: "Luna",
    bpm: 84,
    label: "#BFE6D3",
    chords: [
      [51, 55, 58, 62],
      [50, 53, 57, 60],
      [48, 51, 55, 58],
      [46, 50, 53, 55],
    ],
    roots: [39, 38, 36, 34],
    length: 205,
  },
];

const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

export class LofiBand {
  constructor() {
    this.ctx = null;
    this.track = 0;
    this.playing = false;
    this.muted = false;
    this.kicks = []; // audio times of scheduled kicks, for the visuals
    this.step = 0;
    this.nextTime = 0;
    this.timer = null;
    this.startedAt = 0;
    this.elapsedBefore = 0;
  }

  ensure() {
    if (this.ctx) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.ctx = ctx;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 3;
    this.warm = ctx.createBiquadFilter();
    this.warm.type = "lowpass";
    this.warm.frequency.value = 3200;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.warm.connect(comp).connect(this.master).connect(ctx.destination);
    // noise buffer shared by drums and crackle
    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    // vinyl crackle: sparse clicks on a loop
    const crack = ctx.createBuffer(1, len, ctx.sampleRate);
    const cd = crack.getChannelData(0);
    for (let i = 0; i < len; i++) {
      cd[i] = Math.random() < 0.0009 ? (Math.random() * 2 - 1) * 0.9 : (Math.random() * 2 - 1) * 0.012;
    }
    this.crackle = ctx.createBufferSource();
    this.crackle.buffer = crack;
    this.crackle.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 900;
    this.crackleGain = ctx.createGain();
    this.crackleGain.gain.value = 0;
    this.crackle.connect(hp).connect(this.crackleGain).connect(this.warm);
    this.crackle.start();
  }

  get level() {
    return this.muted ? 0 : 0.26;
  }

  play() {
    this.ensure();
    const ctx = this.ctx;
    if (ctx.state === "suspended") ctx.resume();
    this.playing = true;
    this.nextTime = ctx.currentTime + 0.08;
    this.startedAt = ctx.currentTime;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(this.level, ctx.currentTime, 0.15);
    this.crackleGain.gain.setTargetAtTime(0.5, ctx.currentTime, 0.2);
    clearInterval(this.timer);
    this.timer = setInterval(() => this.schedule(), 25);
  }

  pause() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.elapsedBefore = this.elapsed;
    this.playing = false;
    clearInterval(this.timer);
    this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.12);
    this.crackleGain.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
  }

  setMuted(m) {
    this.muted = m;
    if (this.ctx && this.playing) this.master.gain.setTargetAtTime(this.level, this.ctx.currentTime, 0.1);
  }

  setTrack(i) {
    this.track = (i + TRACKS.length) % TRACKS.length;
    this.step = 0;
    this.elapsedBefore = 0;
    if (this.ctx) {
      this.startedAt = this.ctx.currentTime;
      this.nextTime = this.ctx.currentTime + 0.06;
    }
  }

  get elapsed() {
    if (!this.ctx || !this.playing) return this.elapsedBefore;
    return this.elapsedBefore + (this.ctx.currentTime - this.startedAt);
  }

  /** 0..1 pulse right after each kick, for the visuals. */
  pulse() {
    if (!this.ctx || !this.playing) return 0;
    const now = this.ctx.currentTime;
    while (this.kicks.length > 1 && this.kicks[1] <= now) this.kicks.shift();
    const k = this.kicks[0];
    if (k === undefined || k > now) return 0;
    return Math.exp(-(now - k) * 7);
  }

  schedule() {
    const ctx = this.ctx;
    const t = TRACKS[this.track];
    const sixteenth = 60 / t.bpm / 4;
    while (this.nextTime < ctx.currentTime + 0.12) {
      // lazy swing on the off 16ths
      const swing = this.step % 2 === 1 ? sixteenth * 0.18 : 0;
      this.hit(this.step, this.nextTime + swing, t, sixteenth);
      this.nextTime += sixteenth;
      this.step = (this.step + 1) % 64;
    }
  }

  hit(step, time, t, sixteenth) {
    const bar = Math.floor(step / 16);
    const s = step % 16;
    const chord = t.chords[bar % t.chords.length];
    const root = t.roots[bar % t.roots.length];
    if (s === 0) this.keys(chord, time, sixteenth * 14, 0.11);
    if (s === 10) this.keys(chord.slice(1), time, sixteenth * 6, 0.06);
    if (s === 0 || s === 7 || s === 10) this.bass(root, time, sixteenth * (s === 7 ? 2 : 5));
    if (s === 0 || s === 10 || (s === 7 && bar % 2 === 1)) this.kick(time);
    if (s === 4 || s === 12) this.snare(time);
    if (s % 2 === 0) this.hat(time, s % 4 === 2 ? 0.07 : 0.035);
    // a few music-box notes, the same every loop
    const seed = (step * 37 + this.track * 11) % 23;
    if (s % 2 === 0 && seed < 4) {
      const n = chord[seed % chord.length] + 12;
      this.bell(n, time);
    }
  }

  /** A short purr: low noise, wobbling about 24 times a second. */
  purr() {
    if (this.muted) return;
    this.ensure();
    const ctx = this.ctx;
    if (ctx.state === "suspended") ctx.resume();
    const t = ctx.currentTime + 0.02;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 180;
    lp.Q.value = 2;
    const wob = ctx.createGain();
    wob.gain.value = 0.5;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 24;
    const lfoAmt = ctx.createGain();
    lfoAmt.gain.value = 0.5;
    lfo.connect(lfoAmt).connect(wob.gain);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.9, t + 0.25);
    env.gain.setValueAtTime(0.9, t + 1.1);
    env.gain.linearRampToValueAtTime(0, t + 1.6);
    src.connect(lp).connect(wob).connect(env).connect(ctx.destination);
    src.start(t);
    lfo.start(t);
    src.stop(t + 1.7);
    lfo.stop(t + 1.7);
  }

  keys(notes, time, dur, vol) {
    const ctx = this.ctx;
    notes.forEach((n, i) => {
      [0, 5].forEach((detune, j) => {
        const o = ctx.createOscillator();
        o.type = j ? "triangle" : "sine";
        o.frequency.value = hz(n);
        o.detune.value = detune;
        const g = ctx.createGain();
        const at = time + i * 0.012;
        g.gain.setValueAtTime(0, at);
        g.gain.linearRampToValueAtTime(vol * (j ? 0.35 : 1), at + 0.02);
        g.gain.exponentialRampToValueAtTime(vol * 0.35, at + 0.4);
        g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        o.connect(g).connect(this.warm);
        o.start(at);
        o.stop(at + dur + 0.05);
      });
    });
  }

  bass(n, time, dur) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = hz(n);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.32, time + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    o.connect(g).connect(this.warm);
    o.start(time);
    o.stop(time + dur + 0.05);
  }

  kick(time) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(130, time);
    o.frequency.exponentialRampToValueAtTime(42, time + 0.14);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.75, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.32);
    o.connect(g).connect(this.warm);
    o.start(time);
    o.stop(time + 0.35);
    this.kicks.push(time);
    if (this.kicks.length > 16) this.kicks.shift();
  }

  snare(time) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1700;
    bp.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.28, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
    src.connect(bp).connect(g).connect(this.warm);
    src.start(time, Math.random());
    src.stop(time + 0.2);
  }

  hat(time, vol) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 6500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
    src.connect(hp).connect(g).connect(this.master);
    src.start(time, Math.random());
    src.stop(time + 0.06);
  }

  bell(n, time) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = hz(n);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.05, time + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.9);
    o.connect(g).connect(this.warm);
    o.start(time);
    o.stop(time + 1);
  }
}
