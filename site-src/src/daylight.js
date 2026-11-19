// The room follows the visitor's real clock: afternoon by day, golden hour,
// then night with the lamp and the string lights on.
import * as THREE from "three";

// Key moments of the day. Colours are sRGB hex; the page uses the same ones.
const KEYS = [
  { h: 0, name: "night" },
  { h: 5.5, name: "night" },
  { h: 7.5, name: "morning" },
  { h: 10, name: "day" },
  { h: 16.5, name: "day" },
  { h: 18.5, name: "golden" },
  { h: 20.3, name: "night" },
  { h: 24, name: "night" },
];
export const MOODS = {
  morning: {
    bg: "#b7e0d8", sky: ["#a9dcd6", "#f5d9b8"], sun: "#ffe7c4", sunI: 2.2, amb: "#a8b8d8", ambI: 1.8,
    sunDir: [-0.35, 0.55, 0.75], lamp: 0, bulbs: 0.15, stars: 0, ink: "#3a3440", page: "light",
  },
  day: {
    bg: "#8fd3cf", sky: ["#7fcdc8", "#c9ece4"], sun: "#fff3dc", sunI: 2.5, amb: "#9fb3d6", ambI: 1.85,
    sunDir: [0.25, 0.75, 0.6], lamp: 0, bulbs: 0.1, stars: 0, ink: "#33303e", page: "light",
  },
  golden: {
    bg: "#f2b58c", sky: ["#f29b7e", "#ffd7a1"], sun: "#ffc68a", sunI: 2.4, amb: "#9d8fc4", ambI: 1.6,
    sunDir: [0.75, 0.3, 0.45], lamp: 0.6, bulbs: 0.7, stars: 0, ink: "#3b2a37", page: "light",
  },
  night: {
    bg: "#24284a", sky: ["#1d2142", "#3b3a6e"], sun: "#9fb6ff", sunI: 0.55, amb: "#5d64a8", ambI: 1.05,
    sunDir: [0.4, 0.6, 0.35], lamp: 1, bulbs: 1, stars: 1, ink: "#16152a", page: "dark",
  },
};

function hourNow() {
  const q = new URLSearchParams(location.search).get("h");
  if (q != null && q !== "" && !Number.isNaN(Number(q))) return Number(q);
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60;
}

/** Returns { a, b, t } — the two moods to blend and how far between them. */
export function moodAt(h = hourNow()) {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const k0 = KEYS[i];
    const k1 = KEYS[i + 1];
    if (h >= k0.h && h <= k1.h) {
      const t = k1.h === k0.h ? 0 : (h - k0.h) / (k1.h - k0.h);
      return { a: MOODS[k0.name], b: MOODS[k1.name], t: THREE.MathUtils.smoothstep(t, 0, 1), name: t < 0.5 ? k0.name : k1.name, h };
    }
  }
  return { a: MOODS.night, b: MOODS.night, t: 0, name: "night", h };
}

const ca = new THREE.Color();
const cb = new THREE.Color();
export function mixColor(x, y, t, out = new THREE.Color()) {
  ca.set(x);
  cb.set(y);
  return out.copy(ca).lerp(cb, t);
}
export const mixNum = (x, y, t) => x + (y - x) * t;

/** Painted sky for the window: gradient, flat cartoon clouds or stars and a moon. */
export function paintSky(canvas, m, seed = 3) {
  const { a, b, t } = m;
  const c = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const top = mixColor(a.sky[0], b.sky[0], t).getStyle();
  const bot = mixColor(a.sky[1], b.sky[1], t).getStyle();
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, top);
  g.addColorStop(1, bot);
  c.fillStyle = g;
  c.fillRect(0, 0, W, H);
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const stars = mixNum(a.stars, b.stars, t);
  if (stars > 0.05) {
    c.fillStyle = `rgba(255,248,220,${stars})`;
    for (let i = 0; i < 70; i++) {
      const x = rnd() * W;
      const y = rnd() * H * 0.75;
      const r = rnd() < 0.15 ? 2.6 : 1.3;
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fill();
    }
    // moon
    c.fillStyle = `rgba(255,244,214,${stars})`;
    c.beginPath();
    c.arc(W * 0.72, H * 0.26, H * 0.11, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = top;
    c.beginPath();
    c.arc(W * 0.72 + H * 0.05, H * 0.23, H * 0.1, 0, Math.PI * 2);
    c.fill();
  }
  const clouds = 1 - stars;
  if (clouds > 0.05) {
    // flat, layered anime clouds
    const cloud = (x, y, w, col, sh) => {
      c.fillStyle = sh;
      blobRow(x + 6, y + 8, w);
      c.fillStyle = col;
      blobRow(x, y, w);
    };
    const blobRow = (x, y, w) => {
      c.beginPath();
      const n = 5;
      for (let i = 0; i < n; i++) {
        const r = w * (0.12 + 0.08 * Math.sin(i * 1.7 + seed));
        c.moveTo(x + (i / (n - 1)) * w + r, y);
        c.arc(x + (i / (n - 1)) * w, y - r * 0.35, r, 0, Math.PI * 2);
      }
      c.rect(x - w * 0.08, y - w * 0.05, w * 1.16, w * 0.12);
      c.fill();
    };
    const cl = `rgba(255,255,255,${0.92 * clouds})`;
    const sh = mixColor(a.sky[0], "#5c7fa8", 0.35).getStyle();
    c.globalAlpha = clouds;
    cloud(W * 0.08, H * 0.32, W * 0.34, cl, sh);
    cloud(W * 0.58, H * 0.18, W * 0.26, cl, sh);
    cloud(W * 0.5, H * 0.62, W * 0.42, cl, sh);
    c.globalAlpha = 1;
  }
  // city rooftops at the bottom
  const roof = mixColor(mixColor(a.bg, b.bg, t).getStyle(), "#2a2840", 0.55).getStyle();
  c.fillStyle = roof;
  let x = 0;
  while (x < W) {
    const w = 40 + rnd() * 80;
    const h = H * (0.08 + rnd() * 0.16);
    c.fillRect(x, H - h, w - 6, h);
    if (stars > 0.3) {
      c.fillStyle = `rgba(255,214,140,${stars * 0.9})`;
      for (let i = 0; i < 3; i++) if (rnd() < 0.6) c.fillRect(x + 8 + i * 14, H - h + 10 + rnd() * (h - 24), 7, 9);
      c.fillStyle = roof;
    }
    x += w;
  }
}
