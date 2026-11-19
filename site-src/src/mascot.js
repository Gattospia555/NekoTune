// Neko, the NekoTune mascot, drawn on a canvas with the very same shapes as the
// app (src/js/ui/mascot.js in NekoTune): sitting cat, round head, dot eyes,
// tail that curls like a music note. Luna is the same cat in lilac with a bow.
// The tail moves like in the app: smooth random sway, never twice the same.

export const NEKO = {
  fill: "#FFB37E",
  line: "#F28A5B",
  ink: "#2B1D16",
  whisker: "#B5654A",
  blush: "#FF8F7A",
};
export const LUNA = {
  fill: "#F6F1FC",
  line: "#9B7FC4",
  ink: "#2B1D16",
  whisker: "#8E78BD",
  blush: "#FF9DB0",
  bow: "#5FB3A8",
  bowLine: "#3E8B84",
};

const HEAD = new Path2D("M58 118 C54 92 64 74 78 66 L82 34 L108 56 C116 54 128 54 136 56 L162 34 L166 66 C180 74 190 92 186 118 C182 146 156 162 122 162 C88 162 62 146 58 118 Z");
const BODY = new Path2D("M80 236 C64 236 60 212 64 194 C70 166 86 148 122 148 C158 148 174 166 180 194 C184 212 180 236 164 236 Z");
const LEGS = new Path2D("M106 196 L106 230 M138 196 L138 230");
const CURLED = new Path2D("M168 230 C196 232 204 246 184 251 C154 257 98 256 72 250");
const NOSE = new Path2D("M118 122 L126 122 L122 126 Z");
const MOUTH = new Path2D("M113 128 Q117.5 134 122 128 Q126.5 134 131 128");
const WHISKERS = new Path2D("M78 121 L56 117 M78 128 L56 131 M166 121 L188 117 M166 128 L188 131");
const INNER_EARS = new Path2D("M84 44 L101 58 Q90 60 86 64 Z M160 44 L143 58 Q154 60 158 64 Z");

// tail centre line from the app, and the normalised length along it
const TP = [[150,228],[157,228.9],[163.5,229.4],[169.6,229.3],[175.3,228.8],[180.4,227.8],[185.1,226.4],[189.3,224.6],[193,222.4],[196.2,219.8],[198.9,216.9],[201,213.7],[202.6,210.1],[203.6,206.3],[204.1,202.3],[204,198],[203.6,194.5],[203,191],[202.4,187.6],[201.8,184.3],[201.2,181],[200.6,177.8],[200,174.6],[199.5,171.4],[199.1,168.2],[198.8,165],[198.7,161.7],[198.7,158.4],[198.9,155],[199.3,151.5],[200,148],[200.7,145.3],[201.7,142.8],[202.9,140.6],[204.3,138.6],[205.9,136.8],[207.7,135.3],[209.6,134],[211.7,133],[213.8,132.3],[216.1,131.9],[218.4,131.7],[220.8,131.8],[223.2,132.2],[225.6,133],[228,134],[230.3,135.3],[232.4,136.9],[234.2,138.7],[235.8,140.7],[237.2,142.8],[238.3,145.1],[239.2,147.5],[239.8,150],[240.1,152.6],[240.1,155.2],[239.9,157.8],[239.4,160.4],[238.6,163],[237.4,165.6],[236,168],[235.2,169.1],[234.3,170.2],[233.4,171.1],[232.4,172],[231.4,172.7],[230.4,173.3],[229.4,173.9],[228.3,174.3],[227.3,174.7],[226.2,175],[225.2,175.1],[224.1,175.2],[223,175.2],[222,175.2],[221,175]];
let acc = 0;
const ARC = TP.map((p, i) => (i ? (acc += Math.hypot(p[0] - TP[i - 1][0], p[1] - TP[i - 1][1])) : 0)).map((v) => v / acc);
const DEG = Math.PI / 180;

const rand = (a, b) => a + Math.random() * (b - a);
function drift(lo, hi, dMin, dMax) {
  const v = rand(lo, hi);
  return { lo, hi, dMin, dMax, from: v, to: rand(lo, hi), t: 0, d: rand(dMin, dMax), v };
}
function step(o, dt) {
  o.t += dt;
  if (o.t >= o.d) {
    o.from = o.to;
    o.to = rand(o.lo, o.hi);
    o.t = 0;
    o.d = rand(o.dMin, o.dMax);
  }
  const x = o.t / o.d;
  o.v = o.from + (o.to - o.from) * x * x * (3 - 2 * x);
  return o.v;
}

/** A tail that moves by itself. Call tail.step(dt, energy) every frame. */
export function createTail() {
  const s = { sway: drift(-6, 7, 0.9, 2.6), wave: drift(0.5, 4.5, 1.2, 3.5), speed: drift(1, 3.2, 1.5, 4), phase: Math.random() * 6.28 };
  return {
    step(dt, energy = 1) {
      s.sway.lo = -6 * energy;
      s.sway.hi = 7 * energy;
      s.wave.hi = 0.5 + 4 * energy;
      step(s.sway, dt);
      step(s.wave, dt);
      s.phase += step(s.speed, dt) * dt;
    },
    path() {
      const [px, py] = TP[0];
      const p = new Path2D();
      let x = 0;
      let y = 0;
      for (let i = 0; i < TP.length; i++) {
        const u = ARC[i];
        const g = Math.pow(u, 1.3) * (s.sway.v + s.wave.v * Math.sin(s.phase - 1.8 * u)) * DEG;
        const dx = TP[i][0] - px;
        const dy = TP[i][1] - py;
        x = px + dx * Math.cos(g) - dy * Math.sin(g);
        y = py + dx * Math.sin(g) + dy * Math.cos(g);
        i ? p.lineTo(x, y) : p.moveTo(x, y);
      }
      return { p, tip: [x, y] };
    },
  };
}

/**
 * Draw the cat in viewBox units (0 0 260 262).
 * opts: { pal, eyes: "open"|"sleep"|"happy"|"blink", tail (createTail() or null = curled),
 *         head: { rot (rad), dy }, phones: bool, bow: bool, look: -1..1 }
 */
export function drawCat(g, opts) {
  const P = opts.pal || NEKO;
  g.lineCap = "round";
  g.lineJoin = "round";
  // soft shadow
  g.fillStyle = P.line;
  g.globalAlpha = 0.16;
  g.beginPath();
  g.ellipse(124, 242, 84, 6, 0, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 1;
  // tail behind the body
  if (opts.tail) {
    const { p, tip } = opts.tail.path();
    g.strokeStyle = P.line;
    g.lineWidth = 16;
    g.stroke(p);
    g.strokeStyle = P.fill;
    g.lineWidth = 5;
    g.stroke(p);
    g.fillStyle = P.line;
    g.beginPath();
    g.arc(tip[0], tip[1], 9, 0, Math.PI * 2);
    g.fill();
  }
  // body, legs, feet
  g.fillStyle = P.fill;
  g.strokeStyle = P.line;
  g.lineWidth = 6;
  g.fill(BODY);
  g.stroke(BODY);
  g.stroke(LEGS);
  for (const cx of [104, 140]) {
    g.beginPath();
    g.ellipse(cx, 234, 14, 8, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();
  }
  if (!opts.tail) {
    // curled round the paws while sleeping
    g.strokeStyle = P.line;
    g.lineWidth = 16;
    g.stroke(CURLED);
    g.strokeStyle = P.fill;
    g.lineWidth = 5;
    g.stroke(CURLED);
    g.fillStyle = P.line;
    g.beginPath();
    g.arc(70, 249, 9, 0, Math.PI * 2);
    g.fill();
  }
  // head (bobs and tilts around the neck)
  const h = opts.head || { rot: 0, dy: 0 };
  g.save();
  g.translate(122, 150 + (h.dy || 0));
  g.rotate(h.rot || 0);
  g.translate(-122, -150);
  if (opts.phones) {
    g.strokeStyle = "#3f3360";
    g.lineWidth = 15;
    g.beginPath();
    g.moveTo(60, 112);
    g.bezierCurveTo(60, 30, 184, 30, 184, 112);
    g.stroke();
    g.strokeStyle = "#7d6bb0";
    g.lineWidth = 7;
    g.stroke();
  }
  g.fillStyle = P.fill;
  g.strokeStyle = P.line;
  g.lineWidth = 6;
  g.fill(HEAD);
  g.stroke(HEAD);
  g.fillStyle = P.line;
  g.globalAlpha = 0.35;
  g.fill(INNER_EARS);
  g.globalAlpha = 1;
  // eyes
  const xs = [100, 144];
  const look = (opts.look || 0) * 3;
  g.fillStyle = P.ink;
  g.strokeStyle = P.ink;
  g.lineWidth = 3.4;
  if (opts.eyes === "open") {
    for (const x of xs) {
      g.beginPath();
      g.arc(x + look, 112, 6, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = "#fff";
    for (const x of xs) {
      g.beginPath();
      g.arc(x + look - 1.8, 110.2, 1.9, 0, Math.PI * 2);
      g.fill();
    }
  } else if (opts.eyes === "blink") {
    for (const x of xs) {
      g.beginPath();
      g.moveTo(x - 7, 112);
      g.lineTo(x + 7, 112);
      g.stroke();
    }
  } else {
    const happy = opts.eyes === "happy";
    for (const x of xs) {
      g.beginPath();
      if (happy) {
        g.moveTo(x - 8, 115);
        g.quadraticCurveTo(x, 105, x + 8, 115);
      } else {
        g.moveTo(x - 8, 112);
        g.quadraticCurveTo(x, 119, x + 8, 112);
      }
      g.stroke();
    }
  }
  g.fillStyle = P.ink;
  g.lineWidth = 2;
  g.fill(NOSE);
  g.stroke(NOSE);
  g.lineWidth = 2.6;
  g.stroke(MOUTH);
  g.fillStyle = P.blush;
  g.globalAlpha = 0.45;
  for (const x of [86, 158]) {
    g.beginPath();
    g.arc(x, 130, 5.5, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  g.strokeStyle = P.whisker;
  g.lineWidth = 2.4;
  g.stroke(WHISKERS);
  if (opts.phones) {
    for (const x of [52, 192]) {
      g.fillStyle = "#5a4a8a";
      g.strokeStyle = "#3f3360";
      g.lineWidth = 5;
      g.beginPath();
      g.roundRect(x - 13, 92, 26, 44, 11);
      g.fill();
      g.stroke();
      g.fillStyle = P.fill;
      g.beginPath();
      g.roundRect(x + (x < 122 ? 6 : -12), 98, 6, 32, 3);
      g.fill();
    }
  }
  if (opts.bow) {
    g.fillStyle = P.bow;
    g.strokeStyle = P.bowLine;
    g.lineWidth = 4;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(150, 62);
      g.lineTo(150 + s * 20, 48);
      g.quadraticCurveTo(150 + s * 26, 62, 150 + s * 20, 76);
      g.closePath();
      g.fill();
      g.stroke();
    }
    g.beginPath();
    g.arc(150, 62, 6, 0, Math.PI * 2);
    g.fill();
    g.stroke();
  }
  g.restore();
}

/** A canvas the size of the viewBox times `scale`, plus a helper to redraw it. */
export function catCanvas(scale = 2) {
  const c = document.createElement("canvas");
  c.width = 260 * scale;
  c.height = 262 * scale;
  const g = c.getContext("2d");
  return {
    canvas: c,
    draw(opts) {
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, c.width, c.height);
      g.setTransform(scale, 0, 0, scale, 0, 0);
      drawCat(g, opts);
    },
  };
}
