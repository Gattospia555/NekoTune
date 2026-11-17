// NekoTune site — "Neko's room": one 3D scene, the camera walks through it
// as you scroll. Press play and the room comes alive.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { createCat } from "./cat.js";
import { LofiBand, TRACKS } from "./audio.js";
import {
  C,
  recordTexture,
  coverTexture,
  bubbleTexture,
  noteTexture,
  heartTexture,
  zTexture,
  dotTexture,
  createMonitorScreen,
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
const chapters = [...document.querySelectorAll("[data-chapter]")];
const rail = [...document.querySelectorAll(".rail a")];
let centers = [];
function measure() {
  centers = chapters.map((el) => {
    const r = el.getBoundingClientRect();
    return r.top + scrollY + r.height / 2;
  });
}
function scrollProgress() {
  const anchor = scrollY + innerHeight / 2;
  if (anchor <= centers[0]) return 0;
  for (let i = 0; i < centers.length - 1; i++) {
    if (anchor <= centers[i + 1]) return i + (anchor - centers[i]) / (centers[i + 1] - centers[i]);
  }
  return centers.length - 1 + Math.min(0.6, (anchor - centers.at(-1)) / innerHeight);
}

// ---------------------------------------------------------------- the scene
let scene3d = null;
const forceP = new URLSearchParams(location.search).has("p") ? Number(new URLSearchParams(location.search).get("p")) : null;

function buildScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);

  // lights
  const hemi = new THREE.HemisphereLight("#ffffff", "#CDB8F0", 1.25);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#FFF1E6", 2.4);
  sun.position.set(-4, 8, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -5;
  sun.shadow.camera.right = 5;
  sun.shadow.camera.top = 5;
  sun.shadow.camera.bottom = -5;
  sun.shadow.radius = 5;
  sun.shadow.bias = -0.0008;
  scene.add(sun);
  const rim = new THREE.DirectionalLight("#C9B6EC", 1.1);
  rim.position.set(5, 3, -5);
  scene.add(rim);
  const screenGlow = new THREE.PointLight("#B79CFF", 0, 7, 1.6);
  scene.add(screenGlow);
  const lamp = new THREE.PointLight("#FFB37E", 0, 5, 1.8);
  scene.add(lamp);

  const mat = (color, rough = 0.75) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 });
  const room = new THREE.Group();
  scene.add(room);

  // floating island: a soft rounded plinth
  const profile = [];
  const R = 4.1;
  profile.push(new THREE.Vector2(0, -0.75));
  for (let i = 0; i <= 12; i++) {
    const a = -Math.PI / 2 + (i / 12) * Math.PI;
    profile.push(new THREE.Vector2(R - 0.28 + Math.cos(a) * 0.28, -0.38 + Math.sin(a) * 0.38 * (i < 6 ? 1 : 0.95)));
  }
  profile.push(new THREE.Vector2(0, 0));
  const island = new THREE.Mesh(new THREE.LatheGeometry(profile, 96), mat("#ECE3FA", 0.9));
  island.receiveShadow = true;
  room.add(island);
  const rug = new THREE.Mesh(new THREE.CircleGeometry(1.9, 64), mat("#DCCDF5", 0.95));
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(-0.4, 0.004, 0.4);
  rug.receiveShadow = true;
  room.add(rug);

  // turntable
  const deck = new THREE.Group();
  deck.position.set(0.45, 0, -0.55);
  deck.rotation.y = -0.28;
  room.add(deck);
  const base = new THREE.Mesh(new RoundedBoxGeometry(2.3, 0.34, 1.8, 6, 0.12), mat(C.cream, 0.6));
  base.position.y = 0.17;
  base.castShadow = base.receiveShadow = true;
  deck.add(base);
  const platter = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.06, 72), mat("#3A3054", 0.5));
  platter.position.set(-0.28, 0.37, 0);
  platter.castShadow = true;
  deck.add(platter);
  const recordTop = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.05, color: "#ffffff" });
  const record = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.02, 96), [mat("#1F182F", 0.4), recordTop, mat("#1F182F")]);
  record.position.set(-0.28, 0.41, 0);
  deck.add(record);
  const armPivot = new THREE.Group();
  armPivot.position.set(0.78, 0.36, -0.55);
  deck.add(armPivot);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.16, 24), mat(C.peach, 0.5));
  post.position.y = 0.06;
  armPivot.add(post);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 12), mat("#BDB3CF", 0.3));
  arm.rotation.x = Math.PI / 2;
  arm.position.set(0, 0.17, 0.5);
  armPivot.add(arm);
  const head = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.06, 0.2, 3, 0.02), mat(C.peachDeep, 0.5));
  head.position.set(0, 0.15, 1.0);
  armPivot.add(head);
  [[0.75, 0.62], [0.95, 0.62]].forEach(([x, z]) => {
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 24), mat(C.lilac, 0.5));
    knob.position.set(x, 0.36, z);
    deck.add(knob);
  });
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 8), new THREE.MeshBasicMaterial({ color: "#9C7BD6" }));
  led.position.set(0.55, 0.35, 0.68);
  deck.add(led);

  // cushions
  const cushion = (x, z, color) => {
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.85, 48, 24), mat(color, 0.95));
    c.scale.set(1, 0.2, 1);
    c.position.set(x, 0.08, z);
    c.receiveShadow = c.castShadow = true;
    room.add(c);
    return c;
  };
  cushion(-1.35, 0.95, "#C7B2EE");
  const lunaCushion = cushion(1.75, 1.15, "#FFD3B8");

  // cats
  const neko = createCat();
  neko.group.position.set(-1.35, 0.2, 0.95);
  neko.group.rotation.y = 0.35;
  room.add(neko.group);
  const luna = createCat({ body: "#DCD0F4", accent: "#A58BD8", inner: "#F2B8D0", whisker: "#8A79B0", bellyColor: "#F4EFFC" });
  luna.group.position.set(1.75, 0.2, 1.15);
  luna.group.rotation.y = -0.75;
  room.add(luna.group);

  // props: plant, crate of records, a floor lamp
  const plant = new THREE.Group();
  plant.position.set(-2.75, 0, -1.25);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.26, 0.5, 32), mat(C.peach, 0.7));
  pot.position.y = 0.25;
  pot.castShadow = true;
  plant.add(pot);
  const leafMats = [mat("#8FD1B0", 0.75), mat("#B7E4CC", 0.75)];
  const blade = new THREE.SphereGeometry(1, 24, 16);
  for (let i = 0; i < 8; i++) {
    const l = new THREE.Mesh(blade, leafMats[i % 2]);
    const h = 0.42 + ((i * 7) % 5) * 0.06;
    l.scale.set(0.1, h, 0.035);
    const a = (i / 8) * Math.PI * 2;
    l.position.set(Math.cos(a) * 0.1, 0.45 + h * 0.85, Math.sin(a) * 0.1);
    l.rotation.set(Math.sin(a) * 0.32, -a, -Math.cos(a) * 0.32);
    l.castShadow = true;
    plant.add(l);
  }
  room.add(plant);

  const crate = new THREE.Group();
  crate.position.set(-0.95, 0, -2.05);
  crate.rotation.y = 0.4;
  const box = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.55, 0.6, 4, 0.06), mat("#FFE3CC", 0.8));
  box.position.y = 0.275;
  box.castShadow = true;
  crate.add(box);
  ["#9C7BD6", "#FFB37E", "#BFE6D3", "#F28A5B", "#C9B6EC"].forEach((col, i) => {
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.62, 0.52), mat(col, 0.7));
    sleeve.position.set(-0.36 + i * 0.17, 0.52, 0);
    sleeve.rotation.z = 0.12 - i * 0.03;
    crate.add(sleeve);
  });
  room.add(crate);

  const lampG = new THREE.Group();
  lampG.position.set(0.95, 0, -2.55);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 12), mat(C.plumSoft, 0.4));
  stem.position.y = 0.8;
  lampG.add(stem);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.36, 32, 1, true), new THREE.MeshStandardMaterial({ color: "#FFE1C6", roughness: 0.8, side: THREE.DoubleSide, emissive: "#FFB37E", emissiveIntensity: 0 }));
  shade.position.y = 1.68;
  lampG.add(shade);
  const lampFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.06, 32), mat(C.plumSoft, 0.4));
  lampFoot.position.y = 0.03;
  lampG.add(lampFoot);
  lampG.traverse((o) => o.isMesh && (o.castShadow = true));
  room.add(lampG);
  lamp.position.set(0.95, 1.55, -2.55);

  // stream monitor (rises in the stream chapter)
  const monitor = new THREE.Group();
  monitor.position.set(2.45, 0, -1.35);
  monitor.rotation.y = -0.62;
  const bezel = new THREE.Mesh(new RoundedBoxGeometry(2.0, 1.22, 0.12, 5, 0.06), mat("#3A3054", 0.45));
  bezel.position.y = 1.45;
  bezel.castShadow = true;
  monitor.add(bezel);
  const screen = createMonitorScreen();
  const screenMat = new THREE.MeshBasicMaterial({ map: screen.texture, toneMapped: false });
  const display = new THREE.Mesh(new THREE.PlaneGeometry(1.86, 1.08), screenMat);
  display.position.set(0, 1.45, 0.062);
  monitor.add(display);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.75, 16), mat("#3A3054", 0.45));
  neck.position.y = 0.48;
  monitor.add(neck);
  const foot = new THREE.Mesh(new RoundedBoxGeometry(0.8, 0.06, 0.45, 3, 0.03), mat("#3A3054", 0.45));
  foot.position.y = 0.06;
  monitor.add(foot);
  monitor.traverse((o) => o.isMesh && (o.castShadow = true));
  room.add(monitor);

  // album covers that fly out of the record
  const covers = [];
  const coverData = [
    ["Nuvole basse", "Kite Club", ["#C9B6EC", "#9C7BD6", "#FFF8F1"]],
    ["Fusa", "Neko & Friends", ["#FFD3B8", "#FFB37E", "#2B2144"]],
    ["Mare di sera", "Onde Lente", ["#BFE6D3", "#7FC7A6", "#2B2144"]],
    ["Gomitolo", "Luna", ["#2B2144", "#4A3C6B", "#FFB37E"]],
    ["Lunedì piano", "Ottobre", ["#FFE3CC", "#F6C5A2", "#9C7BD6"]],
    ["Archi", "Studio Gatto", ["#E7DCF7", "#C9B6EC", "#F28A5B"]],
    ["Pixel", "Bit & Coda", ["#9C7BD6", "#6E52A8", "#BFE6D3"]],
    ["Davanzale", "Mici Uniti", ["#FFB6C1", "#F28AA0", "#FFF8F1"]],
  ];
  const coverGeo = new RoundedBoxGeometry(0.95, 0.95, 0.03, 3, 0.012);
  coverData.forEach((_, i) => {
    const m = new THREE.Mesh(coverGeo, [mat("#fff"), mat("#fff"), mat("#fff"), mat("#fff"), new THREE.MeshStandardMaterial({ roughness: 0.6 }), mat("#E7DCF7")]);
    m.castShadow = true;
    m.visible = false;
    room.add(m);
    covers.push(m);
  });

  // sprites: notes, hearts, Zs, bubbles
  const noteMats = [C.lilac, C.peachDeep, "#7FC7A6"].map((c) => new THREE.SpriteMaterial({ map: noteTexture(c), transparent: true, depthWrite: false }));
  const heartMat = new THREE.SpriteMaterial({ map: heartTexture(), transparent: true, depthWrite: false });
  const zMat = new THREE.SpriteMaterial({ map: zTexture(), transparent: true, depthWrite: false });
  const particles = [];
  function emit(material, from, opts = {}) {
    const s = new THREE.Sprite(material.clone());
    s.position.copy(from);
    const size = opts.size ?? 0.28;
    s.scale.setScalar(size);
    s.userData = {
      vel: new THREE.Vector3((Math.random() - 0.5) * (opts.spread ?? 0.4), opts.up ?? 0.7, (Math.random() - 0.5) * 0.2),
      life: 0,
      max: opts.life ?? 2.4,
      size,
      sway: Math.random() * 6,
    };
    scene.add(s);
    particles.push(s);
  }

  const bubbles = [
    { text: "hai sentito questa?", mine: false },
    { text: "Nuvole basse", sub: "Kite Club · ascolta", mine: false },
    { text: "in loop da stamattina", mine: true },
    { text: "Sessione d'ascolto", sub: "Codice NEKO42 · Partecipa", mine: true },
  ].map((b, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, opacity: 0 }));
    s.userData = { ...b, i };
    s.visible = false;
    scene.add(s);
    return s;
  });

  // dust motes floating around the island
  const motes = new THREE.Points(
    (() => {
      const g = new THREE.BufferGeometry();
      const n = 90;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const r = 2 + Math.random() * 4;
        const a = Math.random() * Math.PI * 2;
        pos.set([Math.cos(a) * r, Math.random() * 4 - 0.5, Math.sin(a) * r], i * 3);
      }
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      return g;
    })(),
    new THREE.PointsMaterial({ size: 0.09, map: dotTexture(), transparent: true, depthWrite: false, color: "#ffffff", opacity: 0.8 })
  );
  scene.add(motes);

  // textures that need the web fonts
  let fontsReady = false;
  function paintTextures() {
    fontsReady = true;
    setTrack(band.track);
    covers.forEach((m, i) => {
      const [t, a, cols] = coverData[i];
      m.material[4].map = coverTexture(i, t, a, cols);
      m.material[4].needsUpdate = true;
    });
    bubbles.forEach((s) => {
      const { texture, aspect } = bubbleTexture(s.userData.text, s.userData.mine, s.userData.sub);
      s.material.map = texture;
      s.material.needsUpdate = true;
      s.userData.aspect = aspect;
    });
  }
  function setTrack(i) {
    if (!fontsReady) return;
    recordTop.map?.dispose();
    recordTop.map = recordTexture(TRACKS[i]);
    recordTop.needsUpdate = true;
  }

  // -------------------------------------------------------------- camera path
  const KEYS = [
    { pos: [0.7, 2.7, 7.1], tgt: [-0.3, 0.65, 0.1], off: 0.19, m: [-0.95, 0.8, 0.35] },
    { pos: [0.4, 6.8, 9.6], tgt: [0, 1.2, 0], off: -0.19, m: [-0.2, 1.2, 0] },
    { pos: [1.6, 3.2, 8.2], tgt: [0.25, 1.25, 0.9], off: 0.15, m: [0.2, 1.6, 0.9] },
    { pos: [-3.9, 2.7, 5.4], tgt: [0.8, 1.1, -0.5], off: -0.17, m: [0.2, 1.1, -0.3] },
    { pos: [0.3, 2.2, 5.9], tgt: [-1.1, 0.9, 0.7], off: 0.18, m: [-1.2, 0.95, 0.8] },
  ].map((k) => ({ pos: new THREE.Vector3(...k.pos), tgt: new THREE.Vector3(...k.tgt), off: k.off, m: new THREE.Vector3(...k.m) }));
  const mTgt = new THREE.Vector3();

  const camPos = new THREE.Vector3();
  const camTgt = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  let width = 1;
  let height = 1;
  let narrow = false;

  function resize() {
    width = innerWidth;
    height = innerHeight;
    narrow = width < 820;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = narrow ? 44 : 36;
    camera.updateProjectionMatrix();
  }

  function cameraAt(p) {
    const i = Math.min(KEYS.length - 2, Math.floor(p));
    const t = smooth(p - i, 0.08, 0.92);
    const a = KEYS[i];
    const b = KEYS[i + 1];
    camPos.lerpVectors(a.pos, b.pos, t);
    camTgt.lerpVectors(a.tgt, b.tgt, t);
    let off = lerp(a.off, b.off, t);
    if (narrow) {
      // phones: scene in the upper part, further away, centred on the subject
      tmp.subVectors(camPos, camTgt).multiplyScalar(1.38);
      mTgt.lerpVectors(a.m, b.m, t);
      camPos.copy(mTgt).add(tmp);
      camTgt.copy(mTgt);
      camera.setViewOffset(width, height, 0, height * 0.17, width, height);
    } else {
      camera.setViewOffset(width, height, -off * width, 0, width, height);
    }
  }

  // -------------------------------------------------------------- interaction
  const pointer = new THREE.Vector2(0, 0);
  const look = { x: 0, y: 0 };
  const ray = new THREE.Raycaster();
  let wakeUntil = 0;
  const clickables = [...neko.hit, record, platter];
  addEventListener("pointermove", (e) => {
    pointer.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1);
  });
  function pick(e) {
    if (e.target !== canvas) return null;
    ray.setFromCamera(new THREE.Vector2((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1), camera);
    const hit = ray.intersectObjects(clickables, false)[0];
    return hit?.object ?? null;
  }
  canvas.addEventListener("pointermove", (e) => {
    canvas.style.cursor = pick(e) ? "pointer" : "";
  });
  canvas.addEventListener("click", (e) => {
    const o = pick(e);
    if (!o) return;
    if (o === record || o === platter) {
      setPlaying(!playing);
      return;
    }
    const at = neko.head.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.45, 0));
    if (!playing && state.awake < 0.5) {
      wakeUntil = clock.getElapsed() + 2.6;
      ui.caption.textContent = "Mrr? Neko si è svegliato un attimo.";
    }
    for (let i = 0; i < 5; i++) emit(heartMat, at, { size: 0.22 + Math.random() * 0.1, spread: 1.2, up: 0.9 });
  });

  // -------------------------------------------------------------- loop
  const clock = new THREE.Timer();
  const state = { p: 0, awake: 0, night: 0, intro: reduced.matches ? 1 : 0, spin: 0, arm: 0 };
  let lastNote = 0;
  let lastZ = 0;
  let lastHeart = 0;
  let frame = 0;
  let running = true;
  const recordWorld = new THREE.Vector3();

  function tick(now) {
    if (!running) return;
    requestAnimationFrame(tick);
    clock.update(now);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsed();
    const still = reduced.matches;
    frame++;

    const target = forceP ?? scrollProgress();
    state.p = still ? target : lerp(state.p, target, 1 - Math.exp(-dt * 5));
    const p = state.p;

    // fake beat when Web Audio is muted or missing
    let beat = band.pulse();
    if (playing && !band.ctx) {
      fakeClock += dt;
      beat = Math.exp(-((fakeClock * 1.3) % 1) * 7);
    }

    // states
    const wantAwake = playing || p > 0.35 || t < wakeUntil ? 1 : 0;
    state.awake = lerp(state.awake, wantAwake, 1 - Math.exp(-dt * (wantAwake ? 3 : 1.4)));
    const coverK = bump(p, 0.35, 0.95, 1.55, 2.0);
    const lunaK = smooth(p, 1.3, 1.85);
    const nightK = bump(p, 2.35, 2.75, 3.3, 3.65);
    const monitorK = smooth(p, 2.1, 2.7);
    const phonesK = bump(p, 2.5, 2.85, 3.45, 3.8);
    state.night = nightK;
    document.body.dataset.mood = nightK > 0.5 ? "night" : "day";
    if (!state.intro || state.intro < 1) state.intro = Math.min(1, state.intro + dt / 1.6);
    const introE = 1 - Math.pow(1 - state.intro, 3);

    // room entrance
    room.position.y = lerp(-0.9, 0, introE) + (still ? 0 : Math.sin(t * 0.6) * 0.03);
    room.rotation.y = lerp(-0.5, 0, introE);

    // look at pointer (only when awake)
    look.x = lerp(look.x, pointer.x, 0.06);
    look.y = lerp(look.y, pointer.y, 0.06);
    neko.pose(state.awake, t, beat, look, still, phonesK);
    luna.group.scale.setScalar(Math.max(0.0001, THREE.MathUtils.smootherstep(lunaK, 0, 1)));
    luna.group.visible = lunaK > 0.01;
    lunaCushion.scale.set(Math.max(0.0001, lunaK), 0.2 * Math.max(0.0001, lunaK), Math.max(0.0001, lunaK));
    luna.pose(lunaK > 0.5 ? 1 : 0.2, t + 1.3, beat * 0.6, { x: -0.6, y: 0.1 }, still);

    // record + tonearm
    state.spin = lerp(state.spin, playing ? 1 : 0, 1 - Math.exp(-dt * 2.5));
    record.rotation.y -= dt * state.spin * 3.5;
    state.arm = lerp(state.arm, playing ? 1 : 0, 1 - Math.exp(-dt * 3));
    armPivot.rotation.y = lerp(-0.08, -0.52, state.arm);
    led.material.color.set(playing ? "#FF8FA3" : "#9C7BD6");

    // covers burst out of the record and orbit
    record.getWorldPosition(recordWorld);
    covers.forEach((m, i) => {
      const k = coverK;
      m.visible = k > 0.01;
      if (!m.visible) return;
      const a = (i / covers.length) * Math.PI * 2 + (still ? 0 : t * 0.18);
      const ringR = 3.15;
      const ky = THREE.MathUtils.smootherstep(clamp01(k * 1.4 - i * 0.04), 0, 1);
      tmp.set(Math.cos(a) * ringR, 1.6 + Math.sin(a * 2 + t * 0.7) * 0.18, Math.sin(a) * ringR);
      m.position.lerpVectors(recordWorld, tmp, ky);
      m.scale.setScalar(Math.max(0.0001, ky));
      m.lookAt(camera.position);
      m.rotation.z += Math.sin(t + i) * 0.05;
    });

    // chat bubbles over the cats
    const chatP = p - 1.55;
    bubbles.forEach((s) => {
      const { i, mine, aspect = 3 } = s.userData;
      const k = smooth(chatP, i * 0.13, i * 0.13 + 0.1) * (1 - smooth(p, 2.35, 2.6));
      s.visible = k > 0.01;
      if (!s.visible) return;
      const who = mine ? neko : luna;
      who.head.getWorldPosition(tmp);
      const stack = mine ? i - 2 : i;
      s.position.set(tmp.x + (mine ? -0.1 : 0.1), tmp.y + 0.62 + stack * 0.42 - (1 - k) * 0.2, tmp.z);
      const h = 0.34 * (s.userData.sub ? 1.3 : 1);
      s.scale.set(h * aspect * k, h * k, 1);
      s.material.opacity = k;
    });

    // monitor
    monitor.position.y = lerp(-2.2, 0, THREE.MathUtils.smootherstep(monitorK, 0, 1));
    monitor.visible = monitorK > 0.01;
    if (monitor.visible && frame % 3 === 0) screen.draw(still ? 0 : t, TRACKS[band.track], playing || p > 2.2);
    screenGlow.position.set(2.0, 1.5, -0.8);
    screenGlow.intensity = monitorK * (0.4 + nightK * 7);

    // night for the live
    hemi.intensity = lerp(1.25, 0.28, nightK);
    sun.intensity = lerp(2.4, 0.25, nightK);
    rim.intensity = lerp(1.1, 2.2, nightK);
    rim.color.set(nightK > 0.5 ? "#9C7BFF" : "#C9B6EC");
    lamp.intensity = nightK * 5;
    shade.material.emissiveIntensity = nightK * 1.4;
    renderer.toneMappingExposure = lerp(1.05, 1.25, nightK);
    motes.material.opacity = 0.8;
    motes.rotation.y = still ? 0 : t * 0.03;

    // particles
    if (playing && !still && t - lastNote > 0.55 && p < 2.4) {
      lastNote = t;
      tmp.copy(recordWorld).add(new THREE.Vector3((Math.random() - 0.5) * 0.8, 0.15, (Math.random() - 0.5) * 0.6));
      emit(noteMats[Math.floor(Math.random() * 3)], tmp, { size: 0.24 + beat * 0.08, spread: 0.5 });
    }
    if (state.awake < 0.3 && !still && t - lastZ > 1.4) {
      lastZ = t;
      neko.head.getWorldPosition(tmp).add(new THREE.Vector3(0.35, 0.35, 0));
      emit(zMat, tmp, { size: 0.18, spread: 0.15, up: 0.35, life: 2.6 });
      particles.at(-1).userData.kind = "z";
    }
    if (p > 3.55 && !still && t - lastHeart > 0.7) {
      lastHeart = t;
      neko.head.getWorldPosition(tmp).add(new THREE.Vector3(0, 0.6, 0));
      emit(heartMat, tmp, { size: 0.2, spread: 1, up: 0.6 });
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

    // camera
    cameraAt(p);
    if (!still && !narrow) {
      camPos.x += look.x * 0.25;
      camPos.y += look.y * 0.12;
    }
    camera.position.copy(camPos);
    camera.lookAt(camTgt);

    // UI clock
    const tr = TRACKS[band.track];
    const el = band.ctx ? band.elapsed : fakeClock;
    const shown = el % tr.length;
    ui.now.textContent = fmt(shown);
    ui.fill.style.transform = `scaleX(${shown / tr.length})`;
    const cur = Math.round(Math.min(p, 4));
    if (cur !== state.cur) {
      state.cur = cur;
      rail.forEach((a, i) => (i === cur ? a.setAttribute("aria-current", "step") : a.removeAttribute("aria-current")));
    }

    renderer.render(scene, camera);
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
      if (on) {
        clock.reset?.();
        requestAnimationFrame(tick);
      }
    },
  };
}

// ---------------------------------------------------------------- boot
measure();
addEventListener("load", measure);
showTrack();
const canvas = $("#scene");
try {
  scene3d = buildScene(canvas);
  scene3d.start();
  // stop drawing once the page has scrolled past the room, or the tab is hidden
  const after = $(".after-room");
  const update = () => scene3d.setRunning(!document.hidden && !(after && after.getBoundingClientRect().top <= 0));
  addEventListener("scroll", update, { passive: true });
  document.addEventListener("visibilitychange", update);
} catch (err) {
  console.warn("3D non disponibile:", err);
  document.body.classList.add("no-3d");
  // keep the demo player's clock moving without the scene
  setInterval(() => {
    const tr = TRACKS[band.track];
    if (playing && !band.ctx) fakeClock += 0.25;
    const shown = (band.ctx ? band.elapsed : fakeClock) % tr.length;
    ui.now.textContent = fmt(shown);
    ui.fill.style.transform = `scaleX(${shown / tr.length})`;
  }, 250);
}
