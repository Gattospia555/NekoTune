// Canvas-drawn textures for the scene: record label, album covers,
// chat bubbles, notes, hearts, the stream monitor.
import * as THREE from "three";

export const C = {
  mist: "#F3EEFB",
  lilacLight: "#E7DCF7",
  lilac: "#9C7BD6",
  lilacSoft: "#C9B6EC",
  plum: "#2B2144",
  plumSoft: "#4A3C6B",
  peach: "#FFB37E",
  peachDeep: "#F28A5B",
  pink: "#FFB6C1",
  cream: "#FFF8F1",
  mint: "#BFE6D3",
};

const DISPLAY = '"Dela Gothic One", "Zen Maru Gothic", system-ui, sans-serif';
const BODY = '"Zen Maru Gothic", system-ui, sans-serif';

/** Draw text, shrinking the font until it fits maxW. */
function fitText(g, text, x, y, maxW, weight, size, family) {
  let px = size;
  g.font = `${weight} ${px}px ${family}`;
  while (g.measureText(text).width > maxW && px > 8) {
    px -= 1;
    g.font = `${weight} ${px}px ${family}`;
  }
  g.fillText(text, x, y);
}

function canvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")];
}

function tex(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function paw(g, x, y, s, color) {
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(x, y + s * 0.35, s * 0.55, s * 0.45, 0, 0, Math.PI * 2);
  g.fill();
  [[-0.55, -0.25], [-0.2, -0.6], [0.2, -0.6], [0.55, -0.25]].forEach(([dx, dy]) => {
    g.beginPath();
    g.ellipse(x + dx * s, y + dy * s, s * 0.2, s * 0.25, 0, 0, Math.PI * 2);
    g.fill();
  });
}

/** Top of the record: grooves, label with the track name. */
export function recordTexture(track) {
  const S = 1024;
  const [c, g] = canvas(S, S);
  const m = S / 2;
  g.fillStyle = "#231B38";
  g.beginPath();
  g.arc(m, m, m, 0, Math.PI * 2);
  g.fill();
  for (let r = m - 14; r > S * 0.2; r -= 5) {
    g.strokeStyle = `rgba(255,255,255,${0.025 + ((r * 7) % 13) / 400})`;
    g.lineWidth = 1.4;
    g.beginPath();
    g.arc(m, m, r, 0, Math.PI * 2);
    g.stroke();
  }
  // soft sheen
  const sheen = g.createLinearGradient(0, 0, S, S);
  sheen.addColorStop(0.35, "rgba(255,255,255,0)");
  sheen.addColorStop(0.5, "rgba(214,196,255,0.10)");
  sheen.addColorStop(0.65, "rgba(255,255,255,0)");
  g.fillStyle = sheen;
  g.beginPath();
  g.arc(m, m, m - 8, 0, Math.PI * 2);
  g.fill();
  // label
  g.fillStyle = track.label;
  g.beginPath();
  g.arc(m, m, S * 0.19, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "rgba(43,33,68,.12)";
  g.beginPath();
  g.arc(m, m, S * 0.19, 0, Math.PI * 2);
  g.arc(m, m, S * 0.175, 0, Math.PI * 2, true);
  g.fill();
  paw(g, m, m - S * 0.085, S * 0.045, "rgba(43,33,68,.85)");
  g.fillStyle = C.plum;
  g.textAlign = "center";
  g.font = `600 ${S * 0.034}px ${DISPLAY}`;
  g.fillText("NekoTune", m, m + S * 0.06);
  g.font = `700 ${S * 0.02}px ${BODY}`;
  g.fillText(track.title, m, m + S * 0.1);
  g.fillStyle = "#1A142B";
  g.beginPath();
  g.arc(m, m, S * 0.012, 0, Math.PI * 2);
  g.fill();
  return tex(c);
}

const COVER_MOTIFS = ["sun", "waves", "stripes", "dots", "moon", "arch", "grid", "blob"];

/** Invented album covers (no real artwork). */
export function coverTexture(i, title, artist, colors) {
  const S = 512;
  const [c, g] = canvas(S, S);
  const [a, b, ink] = colors;
  roundRect(g, 0, 0, S, S, 44);
  g.save();
  g.clip();
  const bg = g.createLinearGradient(0, 0, 0, S);
  bg.addColorStop(0, a);
  bg.addColorStop(1, b);
  g.fillStyle = bg;
  g.fillRect(0, 0, S, S);
  g.fillStyle = ink;
  g.strokeStyle = ink;
  const motif = COVER_MOTIFS[i % COVER_MOTIFS.length];
  if (motif === "sun") {
    g.beginPath();
    g.arc(S * 0.5, S * 0.46, S * 0.22, 0, Math.PI * 2);
    g.fill();
    g.globalAlpha = 0.5;
    for (let k = 0; k < 4; k++) g.fillRect(0, S * (0.6 + k * 0.06), S, S * 0.025);
  } else if (motif === "waves") {
    g.lineWidth = 16;
    for (let k = 0; k < 5; k++) {
      g.beginPath();
      for (let x = -20; x <= S + 20; x += 10) {
        const y = S * (0.25 + k * 0.12) + Math.sin(x / 50 + k) * 18;
        x === -20 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke();
    }
  } else if (motif === "stripes") {
    g.save();
    g.translate(S / 2, S / 2);
    g.rotate(-0.5);
    for (let k = -6; k < 6; k++) g.fillRect(-S, k * 60, S * 2, 26);
    g.restore();
  } else if (motif === "dots") {
    for (let y = 0; y < 6; y++)
      for (let x = 0; x < 6; x++) {
        g.beginPath();
        g.arc(60 + x * 78, 60 + y * 62, 10 + ((x + y) % 3) * 6, 0, Math.PI * 2);
        g.fill();
      }
  } else if (motif === "moon") {
    g.beginPath();
    g.arc(S * 0.55, S * 0.42, S * 0.2, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = a;
    g.beginPath();
    g.arc(S * 0.63, S * 0.36, S * 0.17, 0, Math.PI * 2);
    g.fill();
  } else if (motif === "arch") {
    g.lineWidth = 26;
    for (let k = 0; k < 4; k++) {
      g.beginPath();
      g.arc(S / 2, S * 0.78, S * (0.12 + k * 0.1), Math.PI, 0);
      g.stroke();
    }
  } else if (motif === "grid") {
    g.lineWidth = 6;
    for (let k = 1; k < 8; k++) {
      g.beginPath();
      g.moveTo(k * 64, 0);
      g.lineTo(k * 64, S);
      g.moveTo(0, k * 64);
      g.lineTo(S, k * 64);
      g.stroke();
    }
    g.beginPath();
    g.arc(S * 0.62, S * 0.38, 70, 0, Math.PI * 2);
    g.fill();
  } else {
    g.beginPath();
    g.moveTo(S * 0.2, S * 0.5);
    g.bezierCurveTo(S * 0.1, S * 0.1, S * 0.7, S * 0.05, S * 0.8, S * 0.4);
    g.bezierCurveTo(S * 0.95, S * 0.75, S * 0.35, S * 0.85, S * 0.2, S * 0.5);
    g.fill();
  }
  g.globalAlpha = 1;
  g.fillStyle = "rgba(255,255,255,.9)";
  roundRect(g, 26, S - 120, S - 52, 94, 22);
  g.fill();
  g.fillStyle = C.plum;
  fitText(g, title, 50, S - 72, S - 100, 600, 36, DISPLAY);
  g.fillStyle = C.plumSoft;
  fitText(g, artist, 50, S - 40, S - 100, 700, 24, BODY);
  g.restore();
  return tex(c);
}

/** Chat bubble sprite texture. Returns { texture, aspect }. */
export function bubbleTexture(text, mine, sub) {
  const pad = 34;
  const [m, mg] = canvas(10, 10);
  mg.font = `700 46px ${BODY}`;
  const w = Math.ceil(Math.max(mg.measureText(text).width, sub ? 300 : 0)) + pad * 2;
  const h = sub ? 168 : 112;
  const [c, g] = canvas(w + 20, h + 40);
  g.fillStyle = "rgba(43,33,68,.12)";
  roundRect(g, 10, 16, w, h, 40);
  g.fill();
  g.fillStyle = mine ? "#FFE1CB" : "#FFFFFF";
  roundRect(g, 10, 8, w, h, 40);
  g.fill();
  // tail
  g.beginPath();
  const tx = mine ? w - 40 : 50;
  g.moveTo(tx, h + 2);
  g.lineTo(tx + (mine ? 22 : -10), h + 34);
  g.lineTo(tx + (mine ? -18 : 30), h + 2);
  g.fill();
  g.fillStyle = C.plum;
  g.font = `700 46px ${BODY}`;
  g.textBaseline = "middle";
  g.fillText(text, 10 + pad, 8 + (sub ? 56 : h / 2));
  if (sub) {
    g.fillStyle = C.lilac;
    g.font = `800 34px ${BODY}`;
    g.fillText(sub, 10 + pad, 8 + 118);
  }
  void m;
  return { texture: tex(c), aspect: c.width / c.height };
}

export function noteTexture(color) {
  const [c, g] = canvas(128, 128);
  g.fillStyle = color;
  g.strokeStyle = color;
  g.beginPath();
  g.ellipse(46, 96, 22, 17, -0.4, 0, Math.PI * 2);
  g.fill();
  g.lineWidth = 9;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(66, 92);
  g.lineTo(66, 20);
  g.quadraticCurveTo(96, 30, 98, 58);
  g.stroke();
  return tex(c);
}

export function heartTexture() {
  const [c, g] = canvas(128, 128);
  g.fillStyle = C.pink;
  g.strokeStyle = "#F28AA0";
  g.lineWidth = 6;
  g.beginPath();
  g.moveTo(64, 108);
  g.bezierCurveTo(10, 72, 18, 22, 46, 22);
  g.bezierCurveTo(58, 22, 64, 34, 64, 34);
  g.bezierCurveTo(64, 34, 70, 22, 82, 22);
  g.bezierCurveTo(110, 22, 118, 72, 64, 108);
  g.fill();
  g.stroke();
  return tex(c);
}

export function zTexture() {
  const [c, g] = canvas(128, 128);
  g.strokeStyle = C.lilac;
  g.lineWidth = 12;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.beginPath();
  g.moveTo(34, 36);
  g.lineTo(94, 36);
  g.lineTo(34, 96);
  g.lineTo(94, 96);
  g.stroke();
  return tex(c);
}

export function dotTexture() {
  const [c, g] = canvas(64, 64);
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.4, "rgba(255,255,255,.6)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return tex(c);
}

/** The stream monitor: a pastel "game" with the NekoTune widget on top. */
export function createMonitorScreen() {
  const W = 768;
  const H = 448;
  const SC = 2;
  const [c, g] = canvas(W * SC, H * SC);
  const texture = tex(c);
  texture.anisotropy = 4;
  function draw(time, track, playing) {
    g.setTransform(SC, 0, 0, SC, 0, 0);
    const sky = g.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#3B2D63");
    sky.addColorStop(1, "#8E6CC9");
    g.fillStyle = sky;
    g.fillRect(0, 0, W, H);
    // stars
    g.fillStyle = "rgba(255,255,255,.7)";
    for (let i = 0; i < 40; i++) {
      const x = (i * 97) % W;
      const y = (i * 53) % (H * 0.5);
      g.fillRect(x, y, 3, 3);
    }
    // hills scrolling
    const off = time * 40;
    [["#5B4790", 0.62, 60], ["#7A5FB4", 0.72, 40], ["#B79CE6", 0.84, 26]].forEach(([col, base, amp], k) => {
      g.fillStyle = col;
      g.beginPath();
      g.moveTo(0, H);
      for (let x = 0; x <= W; x += 16) {
        const y = H * base + Math.sin((x + off * (k + 1)) / (90 + k * 30)) * amp;
        g.lineTo(x, y);
      }
      g.lineTo(W, H);
      g.fill();
    });
    // a little runner (a cat silhouette, simplified)
    const bob = Math.abs(Math.sin(time * 6)) * 14;
    g.fillStyle = C.peach;
    g.beginPath();
    g.ellipse(W * 0.62, H * 0.68 - bob, 34, 24, 0, 0, Math.PI * 2);
    g.ellipse(W * 0.62 + 34, H * 0.62 - bob, 20, 18, 0, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.moveTo(W * 0.62 + 24, H * 0.56 - bob);
    g.lineTo(W * 0.62 + 30, H * 0.5 - bob);
    g.lineTo(W * 0.62 + 38, H * 0.56 - bob);
    g.moveTo(W * 0.62 + 40, H * 0.56 - bob);
    g.lineTo(W * 0.62 + 48, H * 0.5 - bob);
    g.lineTo(W * 0.62 + 52, H * 0.58 - bob);
    g.fill();
    // LIVE
    g.fillStyle = "#FF5C7A";
    roundRect(g, 24, 22, 108, 44, 14);
    g.fill();
    g.fillStyle = "#fff";
    g.font = `800 26px ${BODY}`;
    g.fillText("LIVE", 48, 53);
    // widget
    g.fillStyle = "rgba(255,255,255,.94)";
    roundRect(g, 24, H - 118, 420, 92, 24);
    g.fill();
    g.fillStyle = track.label;
    roundRect(g, 38, H - 104, 64, 64, 14);
    g.fill();
    paw(g, 70, H - 76, 11, "rgba(43,33,68,.8)");
    g.fillStyle = C.plum;
    fitText(g, track.title, 118, H - 74, 262, 600, 26, DISPLAY);
    g.fillStyle = C.plumSoft;
    fitText(g, track.artist, 118, H - 46, 262, 700, 20, BODY);
    for (let i = 0; i < 4; i++) {
      const hh = playing ? 12 + Math.abs(Math.sin(time * (5 + i * 1.7) + i)) * 30 : 8;
      g.fillStyle = C.lilac;
      roundRect(g, 396 + i * 11, H - 52 - hh, 7, hh, 3);
      g.fill();
    }
    texture.needsUpdate = true;
  }
  return { texture, draw };
}

/** Light wooden floor boards. */
export function floorTexture() {
  const S = 1024;
  const [c, g] = canvas(S, S);
  const boards = 8;
  const h = S / boards;
  const tones = ["#F3DCC4", "#EFD5BB", "#F6E2CD", "#EBD0B5"];
  for (let i = 0; i < boards; i++) {
    let x = -((i * 173) % 400);
    while (x < S) {
      const w = 380 + ((i * 97 + x) % 220);
      g.fillStyle = tones[(i + Math.floor(x / 97)) % tones.length];
      g.fillRect(x, i * h, w, h);
      // grain
      g.strokeStyle = "rgba(150,100,70,.07)";
      g.lineWidth = 2;
      for (let k = 0; k < 5; k++) {
        g.beginPath();
        const yy = i * h + 12 + k * (h / 5);
        g.moveTo(x, yy);
        g.bezierCurveTo(x + w * 0.3, yy - 6, x + w * 0.6, yy + 6, x + w, yy);
        g.stroke();
      }
      g.fillStyle = "rgba(120,80,60,.18)";
      g.fillRect(x + w - 3, i * h, 3, h);
      x += w;
    }
    g.fillStyle = "rgba(120,80,60,.16)";
    g.fillRect(0, i * h + h - 3, S, 3);
  }
  const t = tex(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** What you see through the window. night = false for day. */
export function skyTexture(night) {
  const W = 512;
  const H = 400;
  const [c, g] = canvas(W, H);
  const sky = g.createLinearGradient(0, 0, 0, H);
  if (night) {
    sky.addColorStop(0, "#1B1430");
    sky.addColorStop(1, "#4A3480");
  } else {
    sky.addColorStop(0, "#BFA8EA");
    sky.addColorStop(0.7, "#F6D3E4");
    sky.addColorStop(1, "#FFD9BF");
  }
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);
  if (night) {
    g.fillStyle = "#fff";
    for (let i = 0; i < 70; i++) {
      const r = (i % 7 === 0 ? 2.2 : 1.2);
      g.globalAlpha = 0.4 + ((i * 37) % 60) / 100;
      g.beginPath();
      g.arc((i * 131) % W, (i * 71) % (H * 0.75), r, 0, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha = 1;
    g.fillStyle = "#FFF4DA";
    g.beginPath();
    g.arc(W * 0.72, H * 0.28, 34, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#1F1735";
    g.beginPath();
    g.arc(W * 0.75, H * 0.25, 30, 0, Math.PI * 2);
    g.fill();
  } else {
    g.fillStyle = "rgba(255,255,255,.85)";
    [[90, 110, 1], [330, 70, 1.3], [420, 180, 0.8]].forEach(([x, y, s]) => {
      g.beginPath();
      g.ellipse(x, y, 52 * s, 18 * s, 0, 0, Math.PI * 2);
      g.ellipse(x - 26 * s, y + 6 * s, 30 * s, 14 * s, 0, 0, Math.PI * 2);
      g.ellipse(x + 30 * s, y + 4 * s, 34 * s, 15 * s, 0, 0, Math.PI * 2);
      g.fill();
    });
    g.fillStyle = "#FFE7C4";
    g.beginPath();
    g.arc(W * 0.22, H * 0.66, 30, 0, Math.PI * 2);
    g.fill();
  }
  // city roofs at the bottom
  g.fillStyle = night ? "#2A2050" : "#C9B1E6";
  let x = 0;
  let k = 0;
  while (x < W) {
    const w = 40 + ((k * 53) % 50);
    const hh = 40 + ((k * 31) % 60);
    g.fillRect(x, H - hh, w - 6, hh);
    if (night) {
      g.fillStyle = "#FFD58A";
      for (let wy = H - hh + 10; wy < H - 8; wy += 16)
        for (let wx = x + 6; wx < x + w - 14; wx += 12) if ((wx * 7 + wy * 3 + k) % 5 === 0) g.fillRect(wx, wy, 5, 7);
      g.fillStyle = "#2A2050";
    }
    x += w;
    k++;
  }
  return tex(c);
}

/** Soft round glow for lights. */
export function glowTexture(color) {
  const [c, g] = canvas(128, 128);
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, color);
  r.addColorStop(0.25, color.replace(")", ",0.55)").replace("rgb", "rgba"));
  r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  return tex(c);
}
