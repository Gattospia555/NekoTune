// NekoTune site — "Neko's room": a furnished 3D room behind the page. Each
// chapter pins its text in the middle of the screen while the camera moves
// to the next corner of the room. Press play and the room comes alive.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GTAOPass } from "three/examples/jsm/postprocessing/GTAOPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { createCat } from "./cat.js";
import { LofiBand, TRACKS } from "./audio.js";
import {
  C,
  recordTexture,
  coverTexture,
  noteTexture,
  heartTexture,
  zTexture,
  dotTexture,
  createMonitorScreen,
  floorTexture,
  skyTexture,
  glowTexture,
} from "./textures.js";

const $ = (s) => document.querySelector(s);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x, a, b) => THREE.MathUtils.smoothstep(x, a, b);
const bump = (x, a, b, c, d) => smooth(x, a, b) * (1 - smooth(x, c, d));
const lerp = THREE.MathUtils.lerp;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

// ---------------------------------------------------------------- audio + UI
const band = new LofiBand();
const ui = {
  play: $("#play"),
  prev: $("#prev"),
  next: $("#next"),
  sound: $("#sound"),
  title: $("#track-title"),
  artist: $("#track-artist"),
  now: $("#time-now"),
  total: $("#time-total"),
  fill: $("#progress-fill"),
  caption: $("#caption"),
};
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
let playing = false;
let fakeClock = 0;
let scene3d = null;
const speakerCones = [];

function showTrack() {
  const t = TRACKS[band.track];
  ui.title.textContent = t.title;
  ui.artist.textContent = t.artist;
  ui.total.textContent = fmt(t.length);
  scene3d?.setTrack(band.track);
}

function setPlaying(on) {
  playing = on;
  document.body.classList.toggle("is-playing", on);
  ui.play.setAttribute("aria-pressed", String(on));
  ui.play.setAttribute("aria-label", on ? "Metti in pausa" : "Riproduci");
  try {
    on ? band.play() : band.pause();
  } catch {
    /* no Web Audio: the room still dances */
  }
  ui.caption.textContent = on
    ? band.muted
      ? "Neko è sveglio. La musica è senza audio."
      : "Neko è sveglio e ascolta con te."
    : "Neko dorme. Premi play.";
}

ui.play.addEventListener("click", () => setPlaying(!playing));
ui.prev.addEventListener("click", () => {
  band.setTrack(band.track - 1);
  showTrack();
  if (!playing) setPlaying(true);
});
ui.next.addEventListener("click", () => {
  band.setTrack(band.track + 1);
  showTrack();
  if (!playing) setPlaying(true);
});
ui.sound.addEventListener("click", () => {
  const on = ui.sound.getAttribute("aria-pressed") !== "true";
  ui.sound.setAttribute("aria-pressed", String(on));
  ui.sound.setAttribute("aria-label", on ? "Togli l'audio" : "Rimetti l'audio");
  band.setMuted(!on);
  if (playing) setPlaying(true);
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && playing) setPlaying(false);
});

// ---------------------------------------------------------------- scroll map
// Each chapter is taller than the screen and its text stays pinned. While a
// chapter is pinned the camera holds on its corner of the room (p = i, with
// a slow drift); between two chapters it travels (p goes from i to i + 1).
const chapters = [...document.querySelectorAll("[data-chapter]")];
const rail = [...document.querySelectorAll(".tracks a")];
let pins = [];
function measure() {
  pins = chapters.map((el) => {
    const top = el.getBoundingClientRect().top + scrollY;
    return { start: top, end: top + el.offsetHeight - innerHeight };
  });
}
let drift = 0;
function scrollProgress() {
  const y = scrollY;
  if (!pins.length) return 0;
  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];
    if (y < pin.start) {
      if (i === 0) return 0;
      const prev = pins[i - 1];
      drift = 1;
      return i - 1 + (y - prev.end) / Math.max(1, pin.start - prev.end);
    }
    if (y <= pin.end) {
      drift = (y - pin.start) / Math.max(1, pin.end - pin.start);
      return i;
    }
  }
  drift = 1;
  return pins.length - 1 + Math.min(0.6, (y - pins.at(-1).end) / innerHeight);
}

// fade and lift of the pinned text
const copies = chapters.map((el) => el.querySelector(".copy"));
function updateCopies() {
  const vh = innerHeight;
  chapters.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const inK = clamp01((vh - r.top) / (vh * 0.55));
    const outK = clamp01((r.bottom - vh * 0.62) / (vh * 0.3));
    const k = i === 0 ? outK : Math.min(inK, outK);
    copies[i]?.style.setProperty("--show", k.toFixed(3));
  });
  document.body.classList.toggle("scrolled", scrollY > 40);
}

// ---------------------------------------------------------------- the scene
const forceP = new URLSearchParams(location.search).has("p") ? Number(new URLSearchParams(location.search).get("p")) : null;

function buildScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const DAY_BG = new THREE.Color("#F3EEFB");
  const NIGHT_BG = new THREE.Color("#1E1733");
  scene.background = DAY_BG.clone();
  // soft studio reflections on glossy plastic and fabric
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.22;
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 90);

  // post-processing: ambient occlusion, bloom on the lights, tone mapping,
  // a little film grain. It steps down by itself on slow computers.
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  // the AO pass looks through a twin camera that ignores sprites and dust
  // (layer 1): their square quads would otherwise show up as dark blocks
  camera.layers.enable(1);
  const aoCamera = camera.clone();
  aoCamera.layers.set(0);
  const gtao = new GTAOPass(scene, aoCamera, 2, 2);
  gtao.updateGtaoMaterial({ radius: 0.65, distanceExponent: 1.4, thickness: 1.6, scale: 1.15, samples: 12 });
  gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 5 });
  gtao.blendIntensity = 1.0;
  composer.addPass(gtao);
  const bloom = new UnrealBloomPass(new THREE.Vector2(2, 2), 0.55, 0.6, 1.8);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  const grain = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, time: { value: 0 }, amount: { value: 0.03 } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: `uniform sampler2D tDiffuse; uniform float time; uniform float amount; varying vec2 vUv;
      float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233)) + time) * 43758.5453); }
      void main() { vec4 c = texture2D(tDiffuse, vUv); c.rgb += (rand(vUv * 1000.0) - 0.5) * amount; gl_FragColor = c; }`,
  });
  composer.addPass(grain);
  const forceQ = new URLSearchParams(location.search).get("q");
  let quality = forceQ != null ? Number(forceQ) : innerWidth < 820 || (navigator.deviceMemory && navigator.deviceMemory < 4) ? 1 : 2;
  const perf = { frames: 0, time: 0, checks: 0 };
  function applyQuality() {
    gtao.enabled = quality >= 2;
    bloom.enabled = quality >= 1;
  }
  applyQuality();

  const mat = (color, rough = 0.75, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
  // fabric: soft sheen at grazing angles; gloss: lacquered plastic
  const fabric = (color, sheenColor = "#ffffff") =>
    new THREE.MeshPhysicalMaterial({ color, roughness: 0.92, sheen: 0.7, sheenRoughness: 0.7, sheenColor: new THREE.Color(sheenColor) });
  const gloss = (color, rough = 0.32) => new THREE.MeshPhysicalMaterial({ color, roughness: rough, clearcoat: 0.8, clearcoatRoughness: 0.18 });
  const shadowy = (o) => {
    o.traverse((m) => {
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    return o;
  };
  const box = (w, h, d, color, r = 0.04, rough = 0.75) => {
    const material = typeof color === "string" ? mat(color, rough) : color;
    const m = new THREE.Mesh(r > 0 ? new RoundedBoxGeometry(w, h, d, 3, r) : new THREE.BoxGeometry(w, h, d), material);
    m.castShadow = m.receiveShadow = true;
    return m;
  };
  const room = new THREE.Group();
  scene.add(room);
  const at = (o, x, y, z, parent) => {
    o.position.set(x, y, z);
    (parent || room).add(o);
    return o;
  };

  // ---------------------------------------------------------------- lights
  const hemi = new THREE.HemisphereLight("#ffffff", "#C9B4EC", 0.78);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#FFF1E6", 2.8);
  sun.position.set(6, 9, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const windowLight = new THREE.PointLight("#FFD9BF", 1.2, 9, 1.6);
  scene.add(windowLight);
  const lampLight = new THREE.PointLight("#FFB37E", 0, 7, 1.6);
  scene.add(lampLight);
  const tvLight = new THREE.PointLight("#C9B6FF", 0, 6, 1.8);
  scene.add(tvLight);
  const deskLight = new THREE.PointLight("#B79CFF", 0, 6, 1.6);
  scene.add(deskLight);
  const nekoFill = new THREE.PointLight("#FFE3CC", 0, 6, 1.2);
  scene.add(nekoFill);

  // ---------------------------------------------------------------- shell
  const R = 4; // half size of the room
  const WALL_H = 4.6;
  at(box(2 * R + 0.5, 0.55, 2 * R + 0.5, "#CDB8EE", 0.16, 0.9), 0, -0.28, 0);
  const floorTex = floorTexture();
  floorTex.repeat.set(1.6, 1.6);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(2 * R, 2 * R), new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.62, map: floorTex, clearcoat: 0.35, clearcoatRoughness: 0.45 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  at(floor, 0, 0.004, 0);

  const wallColor = "#EAE0F8";
  at(box(2 * R + 0.3, WALL_H, 0.3, wallColor, 0.03, 0.95), 0, WALL_H / 2, -R - 0.15);
  at(box(0.3, WALL_H, 2 * R + 0.3, wallColor, 0.03, 0.95), -R - 0.15, WALL_H / 2, 0);
  // lower panels and skirting
  at(box(2 * R, 1.15, 0.05, "#E3D6F7", 0.01, 0.9), 0, 0.575, -R + 0.02);
  at(box(0.05, 1.15, 2 * R, "#E3D6F7", 0.01, 0.9), -R + 0.02, 0.575, 0);
  at(box(2 * R, 0.06, 0.09, "#FFFFFF", 0.02), 0, 1.16, -R + 0.04);
  at(box(0.09, 0.06, 2 * R, "#FFFFFF", 0.02), -R + 0.04, 1.16, 0);
  at(box(2 * R, 0.16, 0.08, "#FFFFFF", 0.02), 0, 0.08, -R + 0.04);
  at(box(0.08, 0.16, 2 * R, "#FFFFFF", 0.02), -R + 0.04, 0.08, 0);

  // window on the back wall: day and night skies cross-fade
  const win = new THREE.Group();
  at(win, -0.9, 2.75, -R + 0.02);
  const skyNightMat = new THREE.MeshBasicMaterial({ map: skyTexture(true), toneMapped: false, transparent: true, opacity: 0 });
  at(new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.0), new THREE.MeshBasicMaterial({ map: skyTexture(false), toneMapped: false })), 0, 0, 0.01, win);
  at(new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.0), skyNightMat), 0, 0, 0.012, win);
  [[0, 1.05, 2.8, 0.14], [0, -1.05, 2.8, 0.14], [-1.36, 0, 0.14, 2.2], [1.36, 0, 0.14, 2.2], [0, 0, 0.07, 2.0], [0, 0, 2.6, 0.07]].forEach(([x, y, w, h]) =>
    at(box(w, h, 0.12, "#FFFFFF", 0.02), x, y, 0.06, win)
  );
  at(box(3.1, 0.1, 0.36, "#FFFFFF", 0.03), 0, -1.13, 0.16, win); // sill
  const curtainMat = fabric("#FFC9A8");
  [-1, 1].forEach((s) => {
    const cur = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 2.7, 16, 1, false, 0, Math.PI), curtainMat);
    cur.scale.set(1, 1, 0.45);
    cur.rotation.y = Math.PI;
    cur.castShadow = true;
    at(cur, s * 1.62, -0.1, 0.22, win);
  });
  at(box(3.9, 0.06, 0.06, "#C9B6EC", 0.02), 0, 1.3, 0.25, win); // rod
  const leafA = mat("#8FD1B0", 0.75);
  const leafB = mat("#B7E4CC", 0.75);
  const leaves = (parent, n, x, y, z, sx, sy, spread) => {
    for (let i = 0; i < n; i++) {
      const l = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), i % 2 ? leafA : leafB);
      const h = sy * (1 + ((i * 7) % 5) * 0.12);
      l.scale.set(sx, h, sx * 0.4);
      const a = (i / n) * Math.PI * 2;
      l.position.set(x + Math.cos(a) * spread, y + h * 0.85, z + Math.sin(a) * spread);
      l.rotation.set(Math.sin(a) * 0.35, -a, -Math.cos(a) * 0.35);
      l.castShadow = true;
      parent.add(l);
    }
  };
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.24, 20), mat(C.peach, 0.7)), 0.9, -0.96, 0.17, win).castShadow = true;
  leaves(win, 5, 0.9, -0.86, 0.17, 0.07, 0.2, 0.04);

  // shelves on the back wall, right of the window
  const shelves = new THREE.Group();
  at(shelves, 2.55, 0, -R + 0.25);
  [2.15, 3.05].forEach((y) => at(box(1.8, 0.07, 0.42, "#FFFFFF", 0.02), 0, y, 0, shelves));
  const bookCols = ["#9C7BD6", "#FFB37E", "#BFE6D3", "#F28A5B", "#C9B6EC", "#FFB6C1"];
  for (let i = 0; i < 6; i++) {
    const h = 0.32 + ((i * 7) % 4) * 0.05;
    const b = box(0.09, h, 0.3, bookCols[i], 0.015);
    b.rotation.z = i === 5 ? 0.25 : 0;
    at(b, -0.75 + i * 0.11 + (i === 5 ? 0.04 : 0), 2.19 + h / 2, 0.02, shelves);
  }
  for (let i = 0; i < 4; i++) {
    const rec = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.025, 32), mat(i % 2 ? "#2B2144" : "#3A3054", 0.4));
    rec.castShadow = true;
    at(rec, 0.35, 2.2 + i * 0.03, 0.02, shelves);
  }
  const statue = shadowy(createCat({ body: "#FFFFFF", accent: "#E7DCF7", inner: "#FFD3E0", bellyColor: "#FFFFFF" }).group);
  statue.scale.setScalar(0.22);
  statue.rotation.y = -0.4;
  at(statue, 0.62, 3.09, 0.02, shelves);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.1, 0.2, 20), mat("#C9B6EC", 0.7)), -0.45, 3.19, 0, shelves).castShadow = true;
  for (let i = 0; i < 9; i++) {
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), i % 2 ? leafA : leafB);
    l.scale.set(1, 0.6, 1);
    at(l, -0.45 + Math.sin(i) * 0.12, 3.2 - i * 0.11, 0.12 + (i % 3) * 0.04, shelves);
  }

  // string lights along the top of both walls
  const bulbs = [];
  const bulbGeo = new THREE.SphereGeometry(0.05, 12, 8);
  const bulbCols = ["#FFD58A", "#FFB6C1", "#C9B6FF", "#BFE6D3"];
  const glowMats = bulbCols.map((c) => {
    const col = new THREE.Color(c);
    return new THREE.SpriteMaterial({
      map: glowTexture(`rgb(${Math.round(col.r * 255)},${Math.round(col.g * 255)},${Math.round(col.b * 255)})`),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.25,
    });
  });
  const addBulbs = (from, to, n) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const p = new THREE.Vector3().lerpVectors(from, to, u);
      p.y -= Math.sin(u * Math.PI * 3) ** 2 * 0.22;
      pts.push(p);
      if (i > 0 && i < n) {
        const k = bulbs.length % bulbCols.length;
        const m = new THREE.Mesh(bulbGeo, new THREE.MeshStandardMaterial({ color: bulbCols[k], emissive: bulbCols[k], emissiveIntensity: 0.6, roughness: 0.4 }));
        at(m, p.x, p.y - 0.06, p.z);
        const g = new THREE.Sprite(glowMats[k]);
        g.layers.set(1);
        g.scale.setScalar(0.55);
        at(g, p.x, p.y - 0.06, p.z);
        bulbs.push({ m, g });
      }
    }
    room.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: "#6E5A92" })));
  };
  addBulbs(new THREE.Vector3(-R + 0.12, 4.2, -R + 0.12), new THREE.Vector3(R - 0.2, 4.2, -R + 0.12), 18);
  addBulbs(new THREE.Vector3(-R + 0.12, 4.2, -R + 0.12), new THREE.Vector3(-R + 0.12, 4.2, R - 0.3), 16);

  // posters with invented covers on the left wall
  const posterData = [
    ["Notte lilla", "Kite Club", ["#2B2144", "#4A3C6B", "#FFB37E"], 3],
    ["Fusa", "Neko & Friends", ["#FFD3B8", "#FFB37E", "#2B2144"], 1],
  ];
  const posters = posterData.map(([tt, a, cols, i], k) => {
    const g = new THREE.Group();
    at(box(1.18, 1.18, 0.06, "#FFFFFF", 0.02), 0, 0, 0, g);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(1.02, 1.02), new THREE.MeshStandardMaterial({ roughness: 0.6 }));
    face.userData = { tt, a, cols, i };
    at(face, 0, 0, 0.035, g);
    g.rotation.y = Math.PI / 2;
    g.rotation.z = k ? 0.05 : -0.03;
    at(g, -R + 0.06, k ? 2.0 : 3.05, k ? 3.2 : 2.25);
    return face;
  });

  // rug and cushions
  const rug = new THREE.Mesh(new THREE.CircleGeometry(2.25, 64), fabric("#D9C9F5"));
  rug.rotation.x = -Math.PI / 2;
  rug.receiveShadow = true;
  at(rug, 0.3, 0.012, 0.9);
  const rugRing = new THREE.Mesh(new THREE.RingGeometry(1.9, 2.0, 64), mat("#FFFFFF", 0.98));
  rugRing.rotation.x = -Math.PI / 2;
  at(rugRing, 0.3, 0.016, 0.9);
  const cushion = (x, z, color) => {
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.85, 48, 24), fabric(color));
    c.scale.set(1, 0.22, 1);
    c.castShadow = c.receiveShadow = true;
    return at(c, x, 0.1, z);
  };
  cushion(-0.75, 1.15, "#C7B2EE");
  const lunaCushion = cushion(1.05, 0.05, "#FFD3B8");

  // console with the turntable, under the window
  const consoleG = new THREE.Group();
  at(consoleG, -0.9, 0, -R + 0.62);
  at(box(3.0, 0.72, 0.95, gloss("#FFF8F1", 0.5), 0.06), 0, 0.42, 0, consoleG);
  [-1.3, 1.3].forEach((x) => [-0.35, 0.35].forEach((z) => at(box(0.07, 0.1, 0.07, "#C9B6EC", 0.02), x, 0.04, z, consoleG)));
  [-0.75, 0.75].forEach((x) => {
    at(box(1.38, 0.56, 0.03, "#F4ECFC", 0.02), x, 0.42, 0.48, consoleG);
    at(box(0.26, 0.04, 0.04, "#C9B6EC", 0.02), x, 0.58, 0.51, consoleG);
  });
  const deck = new THREE.Group();
  at(deck, -0.35, 0.78, 0.02, consoleG);
  at(box(1.45, 0.16, 1.05, gloss("#FFFFFF"), 0.06), 0, 0.08, 0, deck);
  const platter = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.04, 64), mat("#3A3054", 0.5));
  platter.castShadow = true;
  at(platter, -0.17, 0.18, 0, deck);
  const recordTop = new THREE.MeshStandardMaterial({ roughness: 0.35, color: "#ffffff" });
  const record = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.015, 96), [mat("#1F182F", 0.4), recordTop, mat("#1F182F")]);
  at(record, -0.17, 0.205, 0, deck);
  const armPivot = new THREE.Group();
  at(armPivot, 0.48, 0.17, -0.33, deck);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.1, 20), mat(C.peach, 0.5)), 0, 0.04, 0, armPivot);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.62, 10), mat("#BDB3CF", 0.3));
  arm.rotation.x = Math.PI / 2;
  at(arm, 0, 0.1, 0.31, armPivot);
  at(box(0.08, 0.04, 0.13, C.peachDeep, 0.015), 0, 0.09, 0.62, armPivot);
  const led = at(new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 8), new THREE.MeshBasicMaterial({ color: "#9C7BD6" })), 0.5, 0.16, 0.45, deck);
  [-1.25, 1.2].forEach((x) => {
    const sp = new THREE.Group();
    at(box(0.42, 0.62, 0.38, gloss("#4A3C6B", 0.45), 0.05), 0, 0.31, 0, sp);
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.03, 24), mat("#2B2144", 0.4));
    cone.rotation.x = Math.PI / 2;
    at(cone, 0, 0.36, 0.2, sp);
    const tw = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16), mat("#C9B6EC", 0.4));
    tw.rotation.x = Math.PI / 2;
    at(tw, 0, 0.55, 0.2, sp);
    at(sp, x, 0.78, 0.02, consoleG);
    speakerCones.push(cone);
  });

  // TV on the left wall: the real app plays on it
  const vids = ["assets/app-listen.mp4", "assets/app-friends.mp4"].map((src) => {
    const v = document.createElement("video");
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = "auto";
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.src = src;
    const tex = new THREE.VideoTexture(v);
    tex.colorSpace = THREE.NoColorSpace;
    const o = { v, tex, ready: false, on: false };
    v.addEventListener("playing", () => (o.ready = true));
    return o;
  });
  const loader = new THREE.TextureLoader();
  const vposters = ["assets/app-listen-poster.jpg", "assets/app-friends-poster.jpg"].map((src) => {
    const tx = loader.load(src);
    tx.colorSpace = THREE.NoColorSpace;
    return tx;
  });
  const SW = 3.36;
  const SH = 2.1;
  const screenU = {
    mapA: { value: vposters[0] },
    mapB: { value: vposters[1] },
    mixK: { value: 0 },
    power: { value: 0 },
    size: { value: new THREE.Vector2(SW, SH) },
    radius: { value: 0.05 },
  };
  const tvMat = new THREE.ShaderMaterial({
    uniforms: screenU,
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: `
      uniform sampler2D mapA; uniform sampler2D mapB; uniform float mixK; uniform float power;
      uniform vec2 size; uniform float radius; varying vec2 vUv;
      float box(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r; }
      void main() {
        float d = box((vUv - 0.5) * size, size * 0.5, radius);
        if (d > 0.0) discard;
        vec3 c = mix(texture2D(mapA, vUv).rgb, texture2D(mapB, vUv).rgb, mixK);
        vec3 off = vec3(0.10, 0.08, 0.16);
        float sheen = smoothstep(0.55, 0.0, distance(vUv, vec2(0.15, 0.95))) * 0.06;
        vec3 col = mix(off, c, power) + sheen;
        gl_FragColor = vec4(pow(col, vec3(2.2)), 1.0);
      }`,
  });
  const tv = new THREE.Group();
  at(box(SW + 0.22, SH + 0.22, 0.1, gloss("#2B2144", 0.25), 0.06), 0, 0, 0, tv);
  at(new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), tvMat), 0, 0, 0.052, tv);
  tv.rotation.y = Math.PI / 2;
  at(tv, -R + 0.1, 2.45, -0.15);
  const cab = new THREE.Group();
  at(cab, -R + 0.42, 0, -0.15);
  at(box(0.7, 0.5, 2.6, "#FFFFFF", 0.05, 0.6), 0, 0.3, 0, cab);
  [-0.85, 0, 0.85].forEach((z) => at(box(0.03, 0.36, 0.78, "#F1E8FB", 0.02), 0.36, 0.3, z, cab));
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.22, 20), mat(C.peach, 0.7)), 0, 0.66, 1.0, cab).castShadow = true;
  leaves(cab, 6, 0, 0.74, 1.0, 0.06, 0.22, 0.04);

  // big floor plant in the back-left corner
  const plant = new THREE.Group();
  at(plant, -R + 0.75, 0, -R + 0.75);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.27, 0.58, 28), mat("#FFE3CC", 0.7)), 0, 0.29, 0, plant).castShadow = true;
  leaves(plant, 10, 0, 0.5, 0, 0.11, 0.5, 0.1);

  // floor lamp in the front-left corner
  const lampG = new THREE.Group();
  at(lampG, -R + 0.55, 0, R - 0.9);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.9, 12), mat(C.plumSoft, 0.4)), 0, 0.95, 0, lampG);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.06, 32), mat(C.plumSoft, 0.4)), 0, 0.03, 0, lampG);
  const shadeMat = new THREE.MeshStandardMaterial({ color: "#FFE1C6", roughness: 0.8, side: THREE.DoubleSide, emissive: "#FFB37E", emissiveIntensity: 0.15 });
  at(new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.4, 32, 1, true), shadeMat), 0, 1.98, 0, lampG);
  shadowy(lampG);
  lampLight.position.set(-R + 0.55, 1.8, R - 0.9);

  // crate of records, front right
  const crate = new THREE.Group();
  at(crate, R - 0.85, 0, R - 1.2);
  crate.rotation.y = -0.5;
  at(box(1.0, 0.55, 0.6, "#FFE3CC", 0.06, 0.8), 0, 0.275, 0, crate);
  ["#9C7BD6", "#FFB37E", "#BFE6D3", "#F28A5B", "#C9B6EC"].forEach((col, i) => {
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.62, 0.52), mat(col, 0.7));
    sleeve.position.set(-0.36 + i * 0.17, 0.52, 0);
    sleeve.rotation.z = 0.12 - i * 0.03;
    sleeve.castShadow = true;
    crate.add(sleeve);
  });

  // stream desk in the back-right corner
  const desk = new THREE.Group();
  at(desk, R - 1.45, 0, -R + 0.95);
  at(box(2.4, 0.09, 1.15, "#FFFFFF", 0.03, 0.55), 0, 1.12, 0, desk);
  [[-1.1, -0.45], [-1.1, 0.45], [1.1, -0.45], [1.1, 0.45]].forEach(([x, z]) => at(box(0.07, 1.1, 0.07, "#C9B6EC", 0.02), x, 0.55, z, desk));
  const monitor = new THREE.Group();
  at(monitor, -0.15, 1.17, -0.15, desk);
  at(box(1.7, 1.0, 0.07, gloss("#3A3054", 0.3), 0.04), 0, 0.75, 0, monitor);
  const streamScreen = createMonitorScreen();
  const streamMat = new THREE.MeshBasicMaterial({ map: streamScreen.texture, toneMapped: false, color: "#555" });
  at(new THREE.Mesh(new THREE.PlaneGeometry(1.58, 0.9), streamMat), 0, 0.75, 0.037, monitor);
  at(box(0.08, 0.26, 0.06, "#3A3054", 0.02), 0, 0.14, -0.03, monitor);
  at(box(0.5, 0.03, 0.3, "#3A3054", 0.015), 0, 0.02, 0, monitor);
  at(box(0.8, 0.03, 0.26, "#F4ECFC", 0.015), -0.1, 1.185, 0.28, desk);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.15, 20), mat(C.peach, 0.6)), 0.75, 1.24, 0.25, desk);
  const mic = new THREE.Group();
  at(mic, 0.85, 1.17, -0.2, desk);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 10), mat("#4A3C6B", 0.4)), 0, 0.2, 0, mic);
  at(new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.12, 6, 12), mat("#2B2144", 0.4)), 0, 0.46, 0, mic);
  const ringMat = new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#FFE3F0", emissiveIntensity: 0, roughness: 0.4 });
  at(new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.035, 12, 40), ringMat), -0.95, 1.95, -0.2, desk);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.75, 8), mat("#4A3C6B")), -0.95, 1.55, -0.2, desk);
  const chair = new THREE.Group();
  at(chair, -0.1, 0, 0.95, desk);
  chair.rotation.y = 0.3;
  at(box(0.62, 0.1, 0.58, fabric("#9C7BD6"), 0.05), 0, 0.62, 0, chair);
  at(box(0.6, 0.72, 0.1, fabric("#9C7BD6"), 0.05), 0, 1.0, 0.27, chair);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.55, 10), mat("#4A3C6B")), 0, 0.3, 0, chair);
  at(new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 20), mat("#4A3C6B")), 0, 0.03, 0, chair);
  shadowy(desk);

  // cats -------------------------------------------------------------
  const neko = createCat();
  at(neko.group, -0.75, 0.21, 1.15);
  neko.group.rotation.y = 0.45;
  const luna = createCat({ body: "#DCD0F4", accent: "#A58BD8", inner: "#F2B8D0", whisker: "#8A79B0", bellyColor: "#F4EFFC" });
  at(luna.group, 1.05, 0.21, 0.05);
  luna.group.rotation.y = -0.35;

  // album covers that fly out of the record and circle the room
  const coverData = [
    ["Nuvole basse", "Kite Club", ["#C9B6EC", "#9C7BD6", "#FFF8F1"]],
    ["Fusa", "Neko & Friends", ["#FFD3B8", "#FFB37E", "#2B2144"]],
    ["Mare di sera", "Onde Lente", ["#BFE6D3", "#7FC7A6", "#2B2144"]],
    ["Gomitolo", "Luna", ["#2B2144", "#4A3C6B", "#FFB37E"]],
    ["Lunedì piano", "Ottobre", ["#FFE3CC", "#F6C5A2", "#9C7BD6"]],
    ["Archi", "Studio Gatto", ["#E7DCF7", "#C9B6EC", "#F28A5B"]],
    ["Pixel", "Bit & Coda", ["#9C7BD6", "#6E52A8", "#BFE6D3"]],
  ];
  const coverGeo = new RoundedBoxGeometry(0.7, 0.7, 0.025, 3, 0.012);
  const covers = coverData.map(() => {
    const white = mat("#ffffff");
    const m = new THREE.Mesh(coverGeo, [white, white, white, white, new THREE.MeshStandardMaterial({ roughness: 0.6 }), mat("#E7DCF7")]);
    m.castShadow = true;
    m.visible = false;
    scene.add(m);
    return m;
  });

  // sprites ----------------------------------------------------------------
  const noteMats = [C.lilac, C.peachDeep, "#7FC7A6"].map((c) => new THREE.SpriteMaterial({ map: noteTexture(c), transparent: true, depthWrite: false }));
  const heartMat = new THREE.SpriteMaterial({ map: heartTexture(), transparent: true, depthWrite: false });
  const zMat = new THREE.SpriteMaterial({ map: zTexture(), transparent: true, depthWrite: false });
  const particles = [];
  function emit(material, from, opts = {}) {
    const s = new THREE.Sprite(material.clone());
    s.layers.set(1);
    s.position.copy(from);
    const size = opts.size ?? 0.26;
    s.scale.setScalar(size);
    s.userData = {
      vel: new THREE.Vector3((Math.random() - 0.5) * (opts.spread ?? 0.4), opts.up ?? 0.6, (Math.random() - 0.5) * 0.2),
      life: 0,
      max: opts.life ?? 2.4,
      size,
      sway: Math.random() * 6,
      kind: opts.kind,
    };
    scene.add(s);
    particles.push(s);
  }

  const motes = new THREE.Points(
    (() => {
      const g = new THREE.BufferGeometry();
      const n = 120;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) pos.set([(Math.random() - 0.5) * 7, Math.random() * 4.2, (Math.random() - 0.5) * 7], i * 3);
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      return g;
    })(),
    new THREE.PointsMaterial({ size: 0.06, map: dotTexture(), transparent: true, depthWrite: false, color: "#FFF4E6", opacity: 0.7 })
  );
  motes.layers.set(1);
  room.add(motes);

  let fontsReady = false;
  function paintTextures() {
    fontsReady = true;
    setTrack(band.track);
    covers.forEach((m, i) => {
      const [tt, a, cols] = coverData[i];
      m.material[4].map = coverTexture(i, tt, a, cols);
      m.material[4].needsUpdate = true;
    });
    posters.forEach((face) => {
      const { tt, a, cols, i } = face.userData;
      face.material.map = coverTexture(i, tt, a, cols);
      face.material.needsUpdate = true;
    });
  }
  function setTrack(i) {
    if (!fontsReady) return;
    recordTop.map?.dispose();
    recordTop.map = recordTexture(TRACKS[i]);
    recordTop.needsUpdate = true;
  }

  // ---------------------------------------------------------------- camera path
  // camera position, target, sideways shift (wide screens), target for tall screens
  const KEYS = [
    { pos: [8.4, 6.0, 11.4], tgt: [-0.3, 1.4, -0.4], off: 0.24, m: [-0.2, 1.7, -0.2] }, // the room
    { pos: [3.7, 3.9, 3.5], tgt: [-2.4, 2.25, -0.35], off: 0.24, m: [-2.6, 2.2, -0.3] }, // TV and record
    { pos: [5.4, 2.7, 6.4], tgt: [-0.9, 1.5, 0.1], off: 0.24, m: [-0.4, 1.5, 0.4] }, // friends
    { pos: [-2.7, 2.35, 5.3], tgt: [1.6, 1.2, -2.0], off: 0.24, m: [1.6, 1.5, -2.0] }, // stream desk
    { pos: [1.6, 2.0, 5.2], tgt: [-0.75, 0.95, 1.15], off: 0.24, m: [-0.75, 1.1, 1.15] }, // Neko
  ].map((k) => ({ pos: new THREE.Vector3(...k.pos), tgt: new THREE.Vector3(...k.tgt), off: k.off, m: new THREE.Vector3(...k.m) }));

  const camPos = new THREE.Vector3();
  const camTgt = new THREE.Vector3();
  const mTgt = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const tmp2 = new THREE.Vector3();
  let width = 1;
  let height = 1;
  let narrow = false;

  function resize() {
    width = innerWidth;
    height = innerHeight;
    narrow = width < 820 || height > width * 0.9;
    renderer.setSize(width, height, false);
    composer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.fov = narrow ? 46 : 36;
    camera.updateProjectionMatrix();
  }

  function cameraAt(p, d) {
    const i = Math.max(0, Math.min(KEYS.length - 2, Math.floor(p)));
    const t = smooth(p - i, 0, 1);
    const a = KEYS[i];
    const b = KEYS[i + 1];
    camPos.lerpVectors(a.pos, b.pos, t);
    camTgt.lerpVectors(a.tgt, b.tgt, t);
    const off = lerp(a.off, b.off, t);
    // slow orbit while a chapter is pinned
    tmp.subVectors(camPos, camTgt).applyAxisAngle(THREE.Object3D.DEFAULT_UP, (d - 0.5) * 0.14);
    camPos.copy(camTgt).add(tmp);
    if (narrow) {
      mTgt.lerpVectors(a.m, b.m, t);
      tmp.multiplyScalar(1.35);
      camTgt.copy(mTgt);
      camPos.copy(mTgt).add(tmp);
      camera.setViewOffset(width, height, 0, height * 0.2, width, height);
    } else {
      camera.setViewOffset(width, height, -off * width, 0, width, height);
    }
  }

  // ---------------------------------------------------------------- interaction
  const pointer = new THREE.Vector2(0, 0);
  const look = { x: 0, y: 0 };
  const ray = new THREE.Raycaster();
  let wakeUntil = 0;
  const clickables = [...neko.hit, record, platter];
  addEventListener("pointermove", (e) => pointer.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1));
  function pick(e) {
    if (e.target !== canvas) return null;
    ray.setFromCamera(new THREE.Vector2((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1), camera);
    return ray.intersectObjects(clickables, false)[0]?.object ?? null;
  }
  canvas.addEventListener("pointermove", (e) => (canvas.style.cursor = pick(e) ? "pointer" : ""));
  canvas.addEventListener("click", (e) => {
    const o = pick(e);
    if (!o) return;
    if (o === record || o === platter) return setPlaying(!playing);
    const from = neko.head.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.45, 0));
    if (!playing && state.awake < 0.5) {
      wakeUntil = clock.getElapsed() + 2.6;
      ui.caption.textContent = "Mrr? Neko si è svegliato un attimo.";
    }
    for (let i = 0; i < 5; i++) emit(heartMat, from, { size: 0.2 + Math.random() * 0.1, spread: 1.2, up: 0.8 });
  });

  function videoOn(o, on) {
    if (on === o.on) return;
    o.on = on;
    if (on) o.v.play().catch(() => {});
    else o.v.pause();
  }

  // ---------------------------------------------------------------- loop
  const clock = new THREE.Timer();
  const state = { p: 0, d: 0.5, awake: 0, intro: reduced.matches ? 1 : 0, spin: 0, arm: 0, cur: -1 };
  let lastNote = 0;
  let lastZ = 0;
  let lastHeart = 0;
  let frame = 0;
  let running = true;
  const recordWorld = new THREE.Vector3();
  const nekoHead = new THREE.Vector3();

  function tick(now) {
    if (!running) return;
    requestAnimationFrame(tick);
    clock.update(now);
    const dt = Math.min(Math.max(clock.getDelta(), 0), 0.05);
    const t = clock.getElapsed();
    const still = reduced.matches;
    frame++;
    if (frame % 90 === 0) measure();

    let target = forceP ?? scrollProgress();
    if (!Number.isFinite(target)) target = 0;
    const targetD = forceP != null ? 0.5 : drift;
    const k = 1 - Math.exp(-dt * 4.5);
    state.p = still || forceP != null || !Number.isFinite(state.p) ? target : lerp(state.p, target, k);
    state.d = still ? 0.5 : lerp(state.d, targetD, k);
    const p = state.p;

    let beat = band.pulse();
    if (playing && !band.ctx) {
      fakeClock += dt;
      beat = Math.exp(-((fakeClock * 1.3) % 1) * 7);
    }

    // chapter states
    const wantAwake = playing || p > 0.35 || t < wakeUntil ? 1 : 0;
    state.awake = lerp(state.awake, wantAwake, 1 - Math.exp(-dt * (wantAwake ? 3 : 1.4)));
    const coverK = bump(p, 0.45, 0.95, 1.25, 1.7);
    const lunaK = bump(p, 1.25, 1.8, 2.4, 2.8);
    const nightK = bump(p, 2.35, 2.85, 3.35, 3.75);
    const phonesK = bump(p, 2.5, 2.9, 3.4, 3.8);
    const tvOn = smooth(p, 0.35, 0.8) * (1 - bump(p, 2.6, 3.0, 3.4, 3.8));
    const toFriends = bump(p, 1.3, 1.8, 3.2, 3.6);
    const liveK = smooth(p, 2.3, 2.8);
    document.body.dataset.mood = nightK > 0.5 ? "night" : "day";

    if (state.intro < 1) state.intro = Math.min(1, state.intro + dt / 1.8);
    const introE = 1 - Math.pow(1 - state.intro, 3);
    room.position.y = lerp(-1.2, 0, introE);
    room.rotation.y = lerp(-0.35, 0, introE);

    look.x = lerp(look.x, pointer.x, 0.06);
    look.y = lerp(look.y, pointer.y, 0.06);
    neko.pose(state.awake, t, beat, look, still, phonesK);
    const lk = THREE.MathUtils.smootherstep(lunaK, 0, 1);
    luna.group.visible = lunaK > 0.01;
    luna.group.scale.setScalar(Math.max(0.0001, lk));
    lunaCushion.scale.set(Math.max(0.0001, lk), 0.22 * Math.max(0.0001, lk), Math.max(0.0001, lk));
    luna.pose(lunaK > 0.5 ? 1 : 0.2, t + 1.3, beat * 0.6, { x: -0.7, y: 0.1 }, still);

    state.spin = lerp(state.spin, playing ? 1 : 0, 1 - Math.exp(-dt * 2.5));
    record.rotation.y -= dt * state.spin * 3.5;
    state.arm = lerp(state.arm, playing ? 1 : 0, 1 - Math.exp(-dt * 3));
    armPivot.rotation.y = lerp(0.05, -0.42, state.arm);
    led.material.color.set(playing ? "#FF8FA3" : "#9C7BD6");
    speakerCones.forEach((c) => c.scale.set(1 + beat * 0.12, 1, 1 + beat * 0.12));

    record.getWorldPosition(recordWorld);
    covers.forEach((m, i) => {
      m.visible = coverK > 0.01;
      if (!m.visible) return;
      const a = (i / covers.length) * Math.PI * 2 + (still ? 0 : t * 0.16);
      const ky = THREE.MathUtils.smootherstep(clamp01(coverK * 1.4 - i * 0.05), 0, 1);
      tmp.set(-0.5 + Math.cos(a) * 1.9, 2.75 + Math.sin(a * 2 + t * 0.7) * 0.15, -1.9 + Math.sin(a) * 1.15);
      m.position.lerpVectors(recordWorld, tmp, ky);
      m.scale.setScalar(Math.max(0.0001, ky));
      m.lookAt(camera.position);
      m.rotation.z += Math.sin(t + i) * 0.05;
    });

    // TV
    screenU.power.value = tvOn;
    screenU.mixK.value = toFriends;
    const friendsWas = vids[1].on;
    videoOn(vids[0], !still && tvOn > 0.05 && toFriends < 0.98);
    videoOn(vids[1], !still && tvOn > 0.05 && toFriends > 0.02);
    if (vids[1].on && !friendsWas) vids[1].v.currentTime = 0;
    screenU.mapA.value = vids[0].ready ? vids[0].tex : vposters[0];
    screenU.mapB.value = vids[1].ready ? vids[1].tex : vposters[1];
    tvLight.position.set(-R + 1.2, 2.4, -0.15);
    tvLight.intensity = tvOn * (0.8 + nightK * 3);

    // stream monitor + ring light
    if (frame % 3 === 0 && p > 1.8) streamScreen.draw(still ? 0 : t, TRACKS[band.track], playing || p > 2.2);
    streamMat.color.setScalar(lerp(0.33, 1, liveK));
    ringMat.emissiveIntensity = liveK * (1.5 + nightK * 4);
    deskLight.position.set(R - 1.6, 2.0, -R + 1.6);
    deskLight.intensity = liveK * (0.6 + nightK * 5);

    // day and night
    scene.background.lerpColors(DAY_BG, NIGHT_BG, nightK);
    scene.environmentIntensity = lerp(0.22, 0.1, nightK);
    skyNightMat.opacity = nightK;
    hemi.intensity = lerp(0.78, 0.45, nightK);
    hemi.groundColor.set(nightK > 0.5 ? "#5B4790" : "#C9B4EC");
    sun.intensity = lerp(2.8, 0.35, nightK);
    sun.color.set(nightK > 0.5 ? "#9C8CFF" : "#FFF1E6");
    windowLight.position.set(-0.9, 2.6, -R + 1.2);
    windowLight.intensity = lerp(1.2, 0.5, nightK);
    windowLight.color.set(nightK > 0.5 ? "#8E7CFF" : "#FFD9BF");
    lampLight.intensity = 0.4 + nightK * 4;
    shadeMat.emissiveIntensity = 0.15 + nightK * 3.2;
    neko.head.getWorldPosition(nekoHead);
    nekoFill.position.set(nekoHead.x + 1.2, nekoHead.y + 0.8, nekoHead.z + 1.4);
    nekoFill.intensity = nightK * 7;
    const bulbK = 0.35 + nightK * 0.65;
    bulbs.forEach(({ m, g }, i) => {
      const tw = still ? 1 : 0.85 + Math.sin(t * 2 + i * 1.7) * 0.15;
      m.material.emissiveIntensity = (1.1 + nightK * 4.5) * tw;
      g.material.opacity = bulbK * 0.5 * tw;
    });
    renderer.toneMappingExposure = lerp(1.0, 1.15, nightK);
    motes.rotation.y = still ? 0 : t * 0.02;

    // particles
    if (playing && !still && t - lastNote > 0.55 && p < 2.3) {
      lastNote = t;
      tmp.copy(recordWorld).add(tmp2.set((Math.random() - 0.5) * 0.5, 0.15, (Math.random() - 0.5) * 0.4));
      emit(noteMats[Math.floor(Math.random() * 3)], tmp, { size: 0.22 + beat * 0.08, spread: 0.5 });
    }
    if (state.awake < 0.3 && !still && t - lastZ > 1.4) {
      lastZ = t;
      emit(zMat, tmp.copy(nekoHead).add(tmp2.set(0.35, 0.35, 0)), { size: 0.18, spread: 0.15, up: 0.35, life: 2.6, kind: "z" });
    }
    if (p > 3.6 && p < 4.4 && !still && t - lastHeart > 0.8) {
      lastHeart = t;
      emit(heartMat, tmp.copy(nekoHead).add(tmp2.set(0, 0.55, 0)), { size: 0.18, spread: 0.9, up: 0.45, life: 2 });
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const s = particles[i];
      const u = s.userData;
      u.life += dt * (u.kind === "z" && state.awake > 0.5 ? 4 : 1);
      s.position.addScaledVector(u.vel, dt);
      s.position.x += Math.sin(u.life * 3 + u.sway) * dt * 0.15;
      const f = u.life / u.max;
      s.material.opacity = f < 0.15 ? f / 0.15 : 1 - smooth(f, 0.6, 1);
      s.scale.setScalar(u.size * (0.7 + Math.min(1, f * 4) * 0.3));
      if (u.life > u.max) {
        scene.remove(s);
        s.material.dispose();
        particles.splice(i, 1);
      }
    }

    cameraAt(p, state.d);
    if (!still && !narrow) {
      camPos.x += look.x * 0.22;
      camPos.y += look.y * 0.1;
    }
    camera.position.copy(camPos);
    camera.lookAt(camTgt);

    const tr = TRACKS[band.track];
    const shown = (band.ctx ? band.elapsed : fakeClock) % tr.length;
    ui.now.textContent = fmt(shown);
    ui.fill.style.transform = `scaleX(${shown / tr.length})`;
    const cur = Math.round(Math.min(p, 4));
    if (cur !== state.cur) {
      state.cur = cur;
      rail.forEach((a, i) => (i === cur ? a.setAttribute("aria-current", "step") : a.removeAttribute("aria-current")));
    }

    // quality: after the entrance, measure; step down if the computer struggles
    if (state.intro >= 1 && perf.checks < 2 && forceQ == null) {
      perf.frames++;
      perf.time += Math.max(clock.getDelta(), 0);
      if (perf.frames === 90) {
        const fps = 90 / Math.max(perf.time, 0.001);
        if (fps < 42 && quality > 0) {
          quality--;
          applyQuality();
        }
        perf.frames = 0;
        perf.time = 0;
        perf.checks++;
      }
    }
    if (quality > 0) {
      aoCamera.copy(camera);
      aoCamera.layers.set(0);
      grain.uniforms.time.value = still ? 0 : t % 100;
      composer.render(dt);
    } else renderer.render(scene, camera);
  }

  resize();
  addEventListener("resize", () => {
    resize();
    measure();
  });

  return {
    start() {
      document.fonts?.ready.then(paintTextures);
      setTimeout(() => !fontsReady && paintTextures(), 2000);
      requestAnimationFrame(tick);
      document.body.classList.add("scene-ready");
    },
    setTrack,
    setRunning(on) {
      if (on === running) return;
      running = on;
      if (!on) vids.forEach((o) => videoOn(o, false));
      else {
        clock.reset?.();
        requestAnimationFrame(tick);
      }
    },
  };
}

// ---------------------------------------------------------------- boot
measure();
updateCopies();
addEventListener("load", () => {
  measure();
  updateCopies();
});
addEventListener("resize", updateCopies);
addEventListener("scroll", updateCopies, { passive: true });
showTrack();
const canvasEl = $("#scene");
try {
  scene3d = buildScene(canvasEl);
  scene3d.start();
  const after = $(".after-room");
  const update = () => {
    const past = after && after.getBoundingClientRect().top <= 0;
    scene3d.setRunning(!document.hidden && !past);
    if (past) rail.forEach((a) => a.removeAttribute("aria-current"));
  };
  addEventListener("scroll", update, { passive: true });
  document.addEventListener("visibilitychange", update);
} catch (err) {
  console.warn("3D non disponibile:", err);
  document.body.classList.add("no-3d");
  setInterval(() => {
    const tr = TRACKS[band.track];
    if (playing && !band.ctx) fakeClock += 0.25;
    const shown = (band.ctx ? band.elapsed : fakeClock) % tr.length;
    ui.now.textContent = fmt(shown);
    ui.fill.style.transform = `scaleX(${shown / tr.length})`;
  }, 250);
}

// ---------------------------------------------------------------- screenshots
// Tabs: Home, Testi, Messaggi... one big picture at a time.
const tabs = [...document.querySelectorAll('.viewer-tabs [role="tab"]')];
function selectTab(i, focus) {
  tabs.forEach((t, k) => {
    const on = k === i;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  });
  if (focus) tabs[i].focus();
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => selectTab(i));
  t.addEventListener("keydown", (e) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (e.key === "Home") return selectTab(0, true);
    if (e.key === "End") return selectTab(tabs.length - 1, true);
    if (d) {
      e.preventDefault();
      selectTab((i + d + tabs.length) % tabs.length, true);
    }
  });
});
