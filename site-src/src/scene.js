// Neko's room, cel-shaded: a Blender model (media/room.glb) drawn with two-tone
// toon light and ink outlines. The light follows the visitor's clock.
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { toonRamp, toonify, InkPass } from "./toon.js";
import { moodAt, MOODS, mixColor, mixNum, paintSky } from "./daylight.js";
import { noteTexture, heartTexture, zTexture, qTexture, coverTexture, createMonitorScreen } from "./textures.js";
import { TRACKS } from "./audio.js";
import { catCanvas, createTail, NEKO, LUNA } from "./mascot.js";
import { createCat3D } from "./cat3d.js";
import { CatBrain, SPOTS } from "./brain.js";

const COVERS = [["#5fb3a8", "#ffe3c8", "#2a2430"], ["#b6a0dc", "#f6a08f", "#2a2430"], ["#6c8fc4", "#bfe6d3", "#1d2333"]];
const smooth = (x, a, b) => THREE.MathUtils.smoothstep(x, a, b);
const lerp = THREE.MathUtils.lerp;
const clamp01 = (x) => Math.min(1, Math.max(0, x));

/** Re-pivot an object around a world point (Blender origins are at 0,0,0). */
function pivot(obj, world) {
  const g = new THREE.Group();
  g.name = obj.name + "_pivot";
  obj.parent.add(g);
  g.position.copy(obj.parent.worldToLocal(world.clone()));
  g.updateMatrixWorld(true);
  g.attach(obj);
  return g;
}
function centerOf(obj) {
  return new THREE.Box3().setFromObject(obj).getCenter(new THREE.Vector3());
}
function baseOf(obj) {
  const b = new THREE.Box3().setFromObject(obj);
  return new THREE.Vector3((b.min.x + b.max.x) / 2, b.min.y, (b.min.z + b.max.z) / 2);
}

export function createRoom(canvas, hooks) {
  const q = new URLSearchParams(location.search);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.3, 140);
  camera.layers.enable(1);

  // ------------------------------------------------------------ light
  const sun = new THREE.DirectionalLight("#fff", 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 60 });
  sun.shadow.bias = -0.0008;
  sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight("#fff", "#c79a7a", 1.3);
  scene.add(hemi);
  const lamp = new THREE.PointLight("#ffc77a", 0, 13, 1.5);
  lamp.position.set(-4.2, 3.1, -3.9);
  lamp.castShadow = true;
  lamp.shadow.bias = -0.002;
  lamp.shadow.mapSize.set(512, 512);
  scene.add(lamp);
  const tvGlow = new THREE.PointLight("#9fc4ff", 0, 7, 1.6);
  tvGlow.position.set(-3.6, 2.7, -0.9);
  scene.add(tvGlow);
  const deskGlow = new THREE.PointLight("#c7a4ff", 0, 5, 1.6);
  deskGlow.position.set(2.4, 2.6, -3.6);
  scene.add(deskGlow);

  // ------------------------------------------------------------ post
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const ink = new InkPass(renderer, scene, camera, { thickness: 1.1, paper: 0.012 });
  const inkPass = new ShaderPass(ink.material);
  composer.addPass(inkPass);
  composer.addPass(new OutputPass());

  // ------------------------------------------------------------ state
  const user = { flip: 0, lamp: -1, tv: 0, plant: 0, statue: 0 };
  const st = { p: 0, flip: 0, lamp: 0, tv: 0, music: 0, awake: 0, spin: 0, arm: 0, intro: reduced.matches ? 1 : 0, plantT: 0, statueT: 0, happy: 0, lunaHappy: 0 };
  let clockMood = moodAt();
  const parts = {};
  let ready = false;
  let playing = false;
  let beat = 0;
  let groove = 0;
  let grooveT = 0;
  let wakeUntil = 0;
  let trackIndex = 0;

  // window sky
  const skyCanvas = document.createElement("canvas");
  skyCanvas.width = 512;
  skyCanvas.height = 440;
  const skyTex = new THREE.CanvasTexture(skyCanvas);
  skyTex.colorSpace = THREE.SRGBColorSpace;
  let skyKey = "";

  // TV: the real app on screen
  const vids = ["assets/app-listen.mp4", "assets/app-friends.mp4"].map((src) => {
    const v = document.createElement("video");
    Object.assign(v, { muted: true, loop: true, playsInline: true, preload: "auto" });
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.src = src;
    const tex = new THREE.VideoTexture(v);
    tex.colorSpace = THREE.SRGBColorSpace;
    const o = { v, tex, ready: false, on: false };
    v.addEventListener("playing", () => (o.ready = true));
    return o;
  });
  const loader = new THREE.TextureLoader();
  const posters = ["assets/app-listen-poster.jpg", "assets/app-friends-poster.jpg"].map((src) => {
    const t = loader.load(src);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
  const still = loader.load("media/home-idle.webp");
  still.colorSpace = THREE.SRGBColorSpace;
  const screenU = {
    mapS: { value: still },
    stillK: { value: 0 },
    mapA: { value: posters[0] },
    mapB: { value: posters[1] },
    mixK: { value: 0 },
    power: { value: 0 },
    off: { value: new THREE.Color("#1d2333") },
    aspect: { value: 1.714 },
    srcAspect: { value: 1.6 },
  };
  const tvMat = new THREE.ShaderMaterial({
    uniforms: screenU,
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: `
      uniform sampler2D mapA, mapB, mapS; uniform float mixK, power, aspect, srcAspect, stillK; uniform vec3 off; varying vec2 vUv;
      void main(){
        vec2 uv = vUv;
        // cover-fit the 16:10 video into the screen
        float k = aspect / srcAspect;
        uv.y = (uv.y - 0.5) / k + 0.5;
        vec3 c = mix(texture2D(mapA, uv).rgb, texture2D(mapB, uv).rgb, mixK);
        // at the end of the dive the TV shows the same picture the next section starts with
        c = mix(c, texture2D(mapS, uv).rgb, stillK);
        float sheen = smoothstep(0.6, 0.0, distance(vUv, vec2(0.12, 0.9))) * 0.05;
        gl_FragColor = vec4(mix(off, c, power) + sheen, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const monitor = createMonitorScreen();
  const monitorMat = new THREE.MeshBasicMaterial({ map: monitor.texture, color: "#666" });

  // particles
  const noteMats = ["#ffb37e", "#5fb3a8", "#b6a0dc"].map((c) => new THREE.SpriteMaterial({ map: noteTexture(c), transparent: true, depthWrite: false }));
  const heartMat = new THREE.SpriteMaterial({ map: heartTexture(), transparent: true, depthWrite: false });
  const zMat = new THREE.SpriteMaterial({ map: zTexture(), transparent: true, depthWrite: false });
  const qMat = new THREE.SpriteMaterial({ map: qTexture(), transparent: true, depthWrite: false });
  const particles = [];
  function emit(material, from, opts = {}) {
    const s = new THREE.Sprite(material.clone());
    s.layers.set(1);
    s.position.copy(from);
    const size = opts.size ?? 0.3;
    s.scale.setScalar(size);
    s.userData = { vel: new THREE.Vector3((Math.random() - 0.5) * (opts.spread ?? 0.4), opts.up ?? 0.6, (Math.random() - 0.5) * 0.25), life: 0, max: opts.life ?? 2.4, size, sway: Math.random() * 6, kind: opts.kind };
    scene.add(s);
    particles.push(s);
  }

  // ------------------------------------------------------------ the cats (2D, like in the app)
  // A drawing on a plane. In the outline pre-pass only its opaque pixels count
  // (and they draw no ink line: the drawing has its own outline).
  function flatCat(canvasEl, height) {
    const tex = new THREE.CanvasTexture(canvasEl);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const h = height;
    const w = (h * 260) / 262;
    const geo = new THREE.PlaneGeometry(w, h);
    // the point between the feet (122, 242 in the drawing) sits at the origin
    geo.translate(-(122 / 260 - 0.5) * w, -(0.5 - 242 / 262) * h, 0);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.04 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.userData.preMat = new THREE.ShaderMaterial({
      uniforms: { map: { value: tex } },
      vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: "uniform sampler2D map; varying vec2 vUv; void main(){ if (texture2D(map, vUv).a < 0.5) discard; gl_FragColor = vec4(0.5, 0.5, 1.0, 0.9); }",
    });
    mesh.userData.tex = tex;
    return mesh;
  }
  function makeCat({ pal, height, pos, bow }) {
    const cv = catCanvas(2);
    const mesh = flatCat(cv.canvas, height);
    const group = new THREE.Group();
    group.position.set(...pos);
    group.add(mesh);
    const tail = createTail();
    return { group, mesh, cv, tail, pal, bow, tex: mesh.userData.tex, last: -1 };
  }

  // ------------------------------------------------------------ load the room
  const room = new THREE.Group();
  scene.add(room);
  const ramp = toonRamp();
  const gl = new GLTFLoader();
  gl.setMeshoptDecoder(MeshoptDecoder);
  const loaded = new Promise((resolve, reject) => {
    gl.load(
      "media/room.glb",
      (g) => {
        room.add(g.scene);
        const mats = toonify(g.scene, ramp, toonRamp(true));
        const by = (n) => g.scene.getObjectByName(n);
        g.scene.traverse((o) => {
          if (!o.isMesh) return;
          if (/^(bulbs|lamp_bulb)$/.test(o.name)) {
            o.material = new THREE.MeshBasicMaterial({ color: "#fff2c4" });
            o.castShadow = false;
            parts[o.name] = o;
          }
          if (o.name === "window_sky") {
            o.material = new THREE.MeshBasicMaterial({ map: skyTex });
            o.castShadow = o.receiveShadow = false;
          }
          if (o.name === "tv_screen") {
            o.material = tvMat;
            o.castShadow = false;
          }
          if (o.name === "pc_screen") {
            o.material = monitorMat;
            o.castShadow = false;
          }
          if (o.name === "poster_art") {
            o.userData.poster = true;
            parts.poster = o;
          }
          if (/curtain|lamp_shade|wire_/.test(o.name)) o.castShadow = false;
        });
        parts.shadeMat = [...mats.values()].find((m) => m.name === "c_lampshade");
        parts.labelMat = [...mats.values()].find((m) => m.name === "c_label");
        parts.ledMat = [...mats.values()].find((m) => m.name === "c_led");
        // pivots for things that move
        g.scene.updateMatrixWorld(true);
        // Neko and Luna: the mascot drawings from the app, standing in the room
        const softRamp = toonRamp(true);
        parts.neko = createCat3D({ pal: NEKO, scale: 0.0125, ramp: softRamp, inkId: 2 });
        parts.neko.group.position.set(-0.2, 0.5, 0.55);
        parts.luna = createCat3D({ pal: LUNA, scale: 0.0098, ramp: softRamp, inkId: 3, bow: true, earColor: "#f6c2d2" });
        parts.luna.group.position.set(2.35, 0.12, 2.05);
        room.add(parts.neko.group, parts.luna.group);
        brains.neko = new CatBrain("neko", parts.neko, { home: SPOTS.neko, sleeper: true, pace: 0.9, sideOffset: -0.32 });
        brains.luna = new CatBrain("luna", parts.luna, { home: SPOTS.home, pace: 1.05, sideOffset: 0.35 });
        // blue yarn ball (Luna's song is "Gomitolo blu")
        {
          const yg = new THREE.Group();
          const blue = new THREE.MeshToonMaterial({ color: "#5a7fb8", gradientMap: ramp });
          const blueL = new THREE.MeshToonMaterial({ color: "#7d9fd6", gradientMap: ramp });
          const ball = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 16), blue);
          ball.castShadow = true;
          yg.add(ball);
          for (let k = 0; k < 5; k++) {
            const strand = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.022, 6, 32), blueL);
            strand.rotation.set(k * 0.7, k * 1.3, k * 0.4);
            yg.add(strand);
          }
          const loose = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0.18, -0.16, 0.1), new THREE.Vector3(0.45, -0.22, 0.2), new THREE.Vector3(0.7, -0.23, 0.05)]), 16, 0.018, 6), blueL);
          yg.add(loose);
          room.add(yg);
          parts.yarn = yg;
          yg.position.set(1.0, 0.36, 3.3);
          yg.traverse((m) => m.isMesh && targets.push({ mesh: m, label: () => "Lancia il gomitolo a Luna", act: throwYarn }));
        }
        parts.record = by("record");
        parts.recordPivot = pivot(parts.record, centerOf(parts.record));
        ["record_label", "groove0", "groove1", "groove2"].forEach((n) => parts.recordPivot.attach(by(n)));
        parts.arm = by("tonearm");
        parts.cones = ["speaker_l_cone", "speaker_r_cone"].map((n) => by(n));
        parts.plant = by("plant_leaves");
        parts.statue = by("statue");
        parts.statuePivot = pivot(parts.statue, baseOf(parts.statue));
        // the print on the acrylic stand: Neko, happy
        {
          const cv = catCanvas(2);
          cv.draw({ pal: NEKO, eyes: "happy", tail: createTail(), head: { rot: 0.08 } });
          const plate = by("stand_plate");
          const c = centerOf(plate);
          const m = flatCat(cv.canvas, 0.6);
          m.position.set(c.x + 0.02, c.y - 0.3, c.z);
          m.rotation.y = Math.PI / 2;
          parts.statuePivot.attach(m);
        }
        // interaction targets
        const T = (names, label, act) => names.forEach((n) => by(n)?.traverse((m) => m.isMesh && targets.push({ mesh: m, label, act })));
        parts.neko.meshes.forEach((m) => targets.push({ mesh: m, label: () => "Accarezza Neko", act: petNeko }));
        parts.luna.meshes.forEach((m) => targets.push({ mesh: m, label: () => (parts.luna.asleep ? "Sveglia Luna" : "Gioca con Luna"), act: petLuna }));
        T(["deck_base", "deck_platter", "record", "record_label", "tonearm", "deck_knob"], () => (playing ? "Ferma il disco" : "Fai partire il disco"), () => hooks.togglePlay());
        T(["speaker_l", "speaker_r", "speaker_l_cone", "speaker_r_cone", "speaker_l_tweet", "speaker_r_tweet"], () => (playing ? "Ferma la musica" : "Accendi la musica"), () => hooks.togglePlay());
        T(["crate", "crate_in", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => "crate_rec" + i)], () => "Pesca un altro disco", () => hooks.nextTrack());
        T(["lamp", "lamp_shade", "lamp_bulb"], () => (lampOn() ? "Spegni la lampada" : "Accendi la lampada"), () => (user.lamp = lampOn() ? 0 : 1));
        T(["window_sky", "win_top", "win_bot", "win_l", "win_r", "win_mid", "win_mid2", "curtain_l", "curtain_r"], () => (isNight() ? "Fai tornare giorno" : "Fai venire sera"), () => (user.flip = user.flip ? 0 : 1));
        T(["tv_body", "tv_screen"], () => ["Accendi la TV", "Cambia canale", "Spegni la TV"][user.tv], () => (user.tv = (user.tv + 1) % 3));
        T(["plant"], () => "Smuovi la pianta", () => (user.plant = 1));
        T(["statue"], () => "Fai girare lo stand di Neko", () => (user.statue = 1));
        T(["pc_body", "pc_screen", "keyboard", "mic"], () => "Vai alla sezione per lo stream", () => hooks.goTo("#diretta"));
        hitMeshes = targets.map((x) => x.mesh);
        document.fonts?.ready.then(paintPoster);
        ready = true;
        if (q.has("dbg")) window.__cats = { brains, parts, yarn, petLuna, petNeko, throwYarn };
        paintPoster();
        resolve();
      },
      undefined,
      reject
    );
  });

  function paintPoster() {
    if (!parts.poster) return;
    const t = TRACKS[trackIndex];
    parts.poster.material = new THREE.MeshBasicMaterial({ map: coverTexture(trackIndex, t.title, t.artist, COVERS[trackIndex % COVERS.length]) });
  }

  const isNight = () => (user.flip ? clockMood.name !== "night" : clockMood.name === "night");
  const lampOn = () => (user.lamp === -1 ? isNight() || clockMood.name === "golden" : user.lamp === 1);

  // ------------------------------------------------------------ interaction
  const targets = [];
  let hitMeshes = [];
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const look = { x: 0, y: 0 };
  const tip = document.querySelector(".room-tip");
  let width = 1;
  let height = 1;
  let narrow = false;
  addEventListener("pointermove", (e) => pointer.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1));
  function pick(e) {
    if (!ready || e.target !== canvas || st.p > 0.25) return null;
    ray.setFromCamera(new THREE.Vector2((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1), camera);
    const hit = ray.intersectObjects(hitMeshes, false)[0];
    return hit ? targets.find((x) => x.mesh === hit.object) : null;
  }
  canvas.addEventListener("pointermove", (e) => {
    const h = pick(e);
    luna.hover = !!h && h.act === petLuna;
    canvas.style.cursor = h ? "pointer" : "";
    if (!tip) return;
    if (h && e.pointerType === "mouse") {
      tip.textContent = h.label();
      tip.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 18}px)`;
      tip.classList.add("on");
    } else tip.classList.remove("on");
  });
  canvas.addEventListener("pointerleave", () => {
    tip?.classList.remove("on");
    luna.hover = false;
  });
  canvas.addEventListener("click", (e) => {
    const h = pick(e);
    if (!h) return;
    h.act();
    if (tip) tip.textContent = h.label();
  });
  const headPos = (c) => c.group.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, c === parts.neko ? 2.7 : 2.1, 0.2));
  function petNeko() {
    st.happy = 1.8;
    const b = brains.neko;
    b.startle();
    if (!playing && (parts.neko.asleep || b.state === "sleep")) {
      wakeUntil = clock.getElapsed() + 6;
      hooks.say("Mrr? Neko si è svegliato un attimo.");
    } else {
      hooks.say("Neko fa le fusa.");
      if (b.state === "sit" && Math.random() < 0.5) b.doAct(Math.random() < 0.5 ? "wave" : "hop");
    }
    hooks.purr();
    const from = headPos(parts.neko);
    for (let i = 0; i < 6; i++) emit(heartMat, from, { size: 0.24 + Math.random() * 0.1, spread: 1.2, up: 0.8 });
  }
  // Each cat has a little brain (brain.js): it walks around, plays, dances.
  const brains = {};
  const luna = { idle: 0, n: 0, hover: false };
  const LUNA_ACTS = [
    ["hop", "Luna saltella contenta."],
    ["wave", "Luna ti saluta con la zampa."],
    ["spin", "Luna fa una giravolta."],
    ["mew", "Miao! Luna ti ha risposto."],
    ["tailchase", "Luna si mette a inseguire la sua coda."],
    ["tilt", "Luna ti guarda con la testa inclinata."],
  ];
  function petLuna() {
    luna.idle = 0;
    const b = brains.luna;
    b.startle();
    if (parts.luna.asleep || b.state === "sleep") {
      b.wakeUp("pet");
      b.timer = 2;
      hooks.say("Luna si stiracchia e si sveglia.");
      return;
    }
    const [act, text] = LUNA_ACTS[luna.n++ % LUNA_ACTS.length];
    b.face = null;
    b.doAct(act);
    hooks.say(text);
    if (act === "hop" || act === "spin") st.lunaHappy = 1.0;
    const from = headPos(parts.luna);
    for (let i = 0; i < 3; i++) emit(heartMat, from, { size: 0.22, spread: 1, up: 0.7 });
  }
  // the yarn ball: it rolls where it is pushed, slows down, bounces off walls and the cushion
  const yarn = { vel: new THREE.Vector2(), rolling: false };
  function pushYarn(dirX, dirZ, speed) {
    const n = Math.hypot(dirX, dirZ) || 1;
    yarn.vel.set((dirX / n) * speed, (dirZ / n) * speed);
    yarn.rolling = true;
  }
  function throwYarn() {
    luna.idle = 0;
    const a = Math.random() * Math.PI * 2;
    pushYarn(Math.cos(a), Math.sin(a), 3.2);
    hooks.say(parts.luna.asleep ? "Il gomitolo rotola. Luna apre un occhio..." : "Luna corre dietro al gomitolo!");
    const b = brains.luna;
    if (b && b.state !== "sleep") setTimeout(() => b.state !== "sleep" && chaseYarn(), 600);
  }
  function chaseYarn() {
    const b = brains.luna;
    const y = parts.yarn.position;
    const dx = y.x - b.pos.x;
    const dz = y.z - b.pos.z;
    const d = Math.hypot(dx, dz) || 1;
    b.goTo({ x: y.x - (dx / d) * 0.75, z: y.z - (dz / d) * 0.75, face: { x: y.x, z: y.z } }, () => {
      const q = parts.yarn.position;
      b.face = { x: q.x, z: q.z };
      b.doAct("pounce");
    }, d > 1.5 ? "bound" : "walk");
  }
  function stepYarn(dt) {
    if (!parts.yarn || !yarn.rolling) return;
    const p = parts.yarn.position;
    p.x += yarn.vel.x * dt;
    p.z += yarn.vel.y * dt;
    if (p.x < -3.2 || p.x > 4.4) (yarn.vel.x *= -0.7), (p.x = THREE.MathUtils.clamp(p.x, -3.2, 4.4));
    if (p.z < -2.4 || p.z > 4.5) (yarn.vel.y *= -0.7), (p.z = THREE.MathUtils.clamp(p.z, -2.4, 4.5));
    const cx = p.x + 0.2;
    const cz = p.z - 0.55;
    const cd = Math.hypot(cx, cz);
    if (cd < 1.75) {
      const nx = cx / cd;
      const nz = cz / cd;
      const dot = yarn.vel.x * nx + yarn.vel.y * nz;
      if (dot < 0) yarn.vel.set(yarn.vel.x - 1.6 * dot * nx, yarn.vel.y - 1.6 * dot * nz);
      p.x = -0.2 + nx * 1.75;
      p.z = 0.55 + nz * 1.75;
    }
    const sp = yarn.vel.length();
    parts.yarn.rotation.x += (yarn.vel.y * dt) / 0.24;
    parts.yarn.rotation.z -= (yarn.vel.x * dt) / 0.24;
    yarn.vel.multiplyScalar(Math.exp(-dt * 1.3));
    if (sp < 0.05) yarn.rolling = false;
  }

  // ------------------------------------------------------------ camera
  const KEYS = [
    { pos: [16.6, 12.6, 18.8], tgt: [-0.2, 1.6, -0.1] },
    { pos: [-1.2, 2.75, -0.9], tgt: [-6, 2.75, -0.9] },
  ].map((k) => ({ pos: new THREE.Vector3(...k.pos), tgt: new THREE.Vector3(...k.tgt) }));
  const dbgCam = q.has("cam") ? [q.get("cam").split(",").map(Number), (q.get("tgt") || "0,1.5,0").split(",").map(Number)] : null;
  const camPos = new THREE.Vector3();
  const camTgt = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const TV = new THREE.Vector3(-4.685, 2.75, -0.9);

  function resize() {
    width = innerWidth;
    height = innerHeight;
    narrow = width < 820 || height > width * 0.95;
    const dpr = Math.min(devicePixelRatio, quality > 1 ? 1.75 : 1.25);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    composer.setPixelRatio(dpr);
    composer.setSize(width, height);
    ink.setSize(width, height, dpr);
    ink.uniforms.thickness.value = Math.max(1, dpr * 0.85);
    camera.aspect = width / height;
    camera.fov = narrow ? 34 : 26;
    camera.updateProjectionMatrix();
    // the dive ends with the TV screen exactly covering the window
    const half = THREE.MathUtils.degToRad(camera.fov / 2);
    const dH = 0.91 / Math.tan(half);
    const dW = 1.56 / (Math.tan(half) * camera.aspect);
    KEYS[1].pos.set(TV.x + Math.min(dH, dW) * 0.995, TV.y, TV.z);
    KEYS[1].tgt.set(TV.x - 2, TV.y, TV.z);
  }

  function cameraAt(p) {
    const t = smooth(p, 0, 1);
    const a = KEYS[0];
    const b = KEYS[1];
    // ease the path: first turn towards the TV, then fly in
    const turn = smooth(p, 0, 0.55);
    const fly = THREE.MathUtils.smootherstep(p, 0.25, 1);
    camTgt.lerpVectors(a.tgt, b.tgt, turn);
    camPos.lerpVectors(a.pos, b.pos, fly);
    if (narrow) {
      tmp.subVectors(a.pos, a.tgt).multiplyScalar(1.25);
      const far = tmp.add(a.tgt);
      camPos.lerpVectors(far, b.pos, fly);
      camera.setViewOffset(width, height, 0, height * 0.17 * (1 - t), width, height);
    } else {
      camera.setViewOffset(width, height, -width * (width < 1150 ? 0.32 : 0.255) * (1 - t), height * 0.02 * (1 - t), width, height);
    }
  }

  // ------------------------------------------------------------ quality
  const forceQ = q.get("q");
  let quality = forceQ != null ? Number(forceQ) : innerWidth < 820 || (navigator.deviceMemory && navigator.deviceMemory < 4) ? 1 : 2;
  const perf = { frames: 0, time: 0, checks: 0 };

  // ------------------------------------------------------------ mood (clock + window toggle)
  const cur = { bg: new THREE.Color(), sun: new THREE.Color(), amb: new THREE.Color(), ink: new THREE.Color(), sunI: 1, ambI: 1, bulbs: 0, stars: 0, lampAuto: 0 };
  const dir = new THREE.Vector3();
  let lastPage = "";
  function applyMood(dt) {
    if (clock.getElapsed() - lastClock > 60) {
      clockMood = moodAt();
      lastClock = clock.getElapsed();
    }
    st.flip = lerp(st.flip, user.flip, 1 - Math.exp(-dt * 2.2));
    const m = clockMood;
    const other = m.name === "night" ? MOODS.day : MOODS.night;
    const mix = (key) => (typeof m.a[key] === "number" ? mixNum(mixNum(m.a[key], m.b[key], m.t), other[key], st.flip) : null);
    const mixC = (key, out) => out.copy(mixColor(m.a[key], m.b[key], m.t)).lerp(new THREE.Color(other[key]), st.flip);
    mixC("bg", cur.bg);
    mixC("sun", cur.sun);
    mixC("amb", cur.amb);
    mixC("ink", cur.ink);
    cur.sunI = mix("sunI");
    cur.ambI = mix("ambI");
    cur.bulbs = mix("bulbs");
    cur.stars = mix("stars");
    scene.background = cur.bg;
    sun.color.copy(cur.sun);
    sun.intensity = cur.sunI;
    const da = new THREE.Vector3(...m.a.sunDir).lerp(new THREE.Vector3(...m.b.sunDir), m.t);
    dir.copy(da).lerp(new THREE.Vector3(...other.sunDir), st.flip).normalize();
    sun.position.copy(dir).multiplyScalar(22);
    hemi.color.copy(cur.amb);
    hemi.groundColor.copy(cur.amb).lerp(new THREE.Color("#c79a7a"), 0.45);
    hemi.intensity = cur.ambI;
    ink.uniforms.ink.value.copy(cur.ink);
    st.lamp = lerp(st.lamp, lampOn() ? 1 : 0, 1 - Math.exp(-dt * 5));
    const night = cur.stars;
    lamp.intensity = st.lamp * (14 + night * 30);
    if (parts.shadeMat) parts.shadeMat.emissive.set("#ffb45c").multiplyScalar(st.lamp * (0.35 + night * 0.4));
    if (parts.lamp_bulb) parts.lamp_bulb.material.color.set("#fff2c4").multiplyScalar(0.55 + st.lamp * 1.1);
    if (parts.bulbs) parts.bulbs.material.color.set("#fff2c4").multiplyScalar(0.45 + cur.bulbs * 1.15);
    // repaint the window when the sky changed enough
    const key = (m.name + (st.flip > 0.5 ? "f" : "") + Math.round(st.flip * 8)).toString();
    if (key !== skyKey) {
      skyKey = key;
      const blend = st.flip < 0.5 ? m : { a: other, b: other, t: 0 };
      paintSky(skyCanvas, st.flip > 0.02 && st.flip < 0.98 ? (st.flip < 0.5 ? m : blend) : st.flip >= 0.98 ? blend : m);
      skyTex.needsUpdate = true;
    }
    const page = night > 0.5 ? "night" : m.name === "golden" && st.flip < 0.5 ? "golden" : m.name === "morning" && st.flip < 0.5 ? "morning" : night > 0.5 ? "night" : "day";
    const pageName = st.flip > 0.5 ? (m.name === "night" ? "day" : "night") : m.name;
    if (pageName !== lastPage) {
      lastPage = pageName;
      hooks.mood(pageName, cur.bg.getHexString());
    }
    void page;
  }
  let lastClock = 0;

  // ------------------------------------------------------------ loop
  const clock = new THREE.Timer();
  let running = true;
  let forceP = q.has("p") ? Number(q.get("p")) : null;
  let lastNote = 0;
  let lastZ = 0;
  let frame = 0;
  const recW = new THREE.Vector3();
  const headW = new THREE.Vector3();

  function setVideo(o, on) {
    if (on === o.on) return;
    o.on = on;
    if (on) o.v.play().catch(() => {});
    else o.v.pause();
  }

  // ?ff=4 runs the cats' brains faster (for testing)
  const FF = q.has("ff") ? +q.get("ff") || 1 : 1;
  const FIXED = q.has("fixed") ? +q.get("fixed") || 24 : 0;
  let fixedT = 0;
  const FILM = FIXED && q.has("film");
  let brainT = 0;
  function tick(now) {
    if (!running) return;
    requestAnimationFrame(tick);
    clock.update(now);
    let dt = Math.min(Math.max(clock.getDelta(), 0), 0.05);
    if (FILM) {
      if (!(window.__go > 0)) return;
      window.__go--;
    }
    // ?fixed=24: every frame is exactly 1/24 s (to film the animations frame by frame)
    if (FIXED) dt = 1 / FIXED;
    const t = FIXED ? (fixedT += dt) : clock.getElapsed();
    const still = reduced.matches;
    frame++;
    const target = forceP ?? hooks.progress();
    st.p = still || forceP != null ? target : lerp(st.p, Number.isFinite(target) ? target : 0, 1 - Math.exp(-dt * 5));
    const p = st.p;
    applyMood(dt);
    if (!ready) {
      cameraAt(0);
      camera.position.copy(camPos);
      camera.lookAt(camTgt);
      renderer.render(scene, camera);
      return;
    }
    const ease = (v, to, s) => lerp(v, to, 1 - Math.exp(-dt * s));
    st.music = ease(st.music, playing ? 1 : 0, 2.5);
    const wantAwake = playing || p > 0.3 || t < wakeUntil ? 1 : 0;
    st.awake = ease(st.awake, wantAwake, wantAwake ? 3 : 1.4);
    st.tv = ease(st.tv, user.tv === 0 ? 0 : 1, 4);
    st.happy = Math.max(0, st.happy - dt);
    st.lunaHappy = Math.max(0, st.lunaHappy - dt);

    // intro: the room drops in
    if (st.intro < 1) st.intro = Math.min(1, st.intro + dt / 1.6);
    const ie = 1 - Math.pow(1 - st.intro, 3);
    room.position.y = lerp(-1.5, 0, ie);
    room.rotation.y = lerp(-0.3, 0, ie);

    // cats
    look.x = lerp(look.x, pointer.x, 0.06);
    look.y = lerp(look.y, pointer.y, 0.06);
    // ---- the cats: brains decide, poses move the 3D models
    const bdt = dt * FF;
    brainT += bdt;
    stepYarn(bdt);
    luna.idle += bdt;
    if (playing || yarn.rolling) luna.idle = 0;
    const beatLen = 60 / TRACKS[trackIndex].bpm;
    const ctxB = {
      t: brainT,
      dt: bdt,
      still,
      camera,
      music: st.music,
      groove,
      phase: grooveT / beatLen,
      yarn: parts.yarn,
      lunaSleep: luna.idle > 45,
      lunaSpot: { x: brains.luna.pos.x + 1.1, z: brains.luna.pos.z - 0.6 },
      question: (b) => emit(qMat, headPos(b.cat === parts.neko ? parts.neko : parts.luna).add(new THREE.Vector3(0.4, 0.1, 0)), { size: 0.34, spread: 0.1, up: 0.3, life: 1.6 }),
      say: (name) => name === "luna" && hooks.mew?.(),
      batYarn: (b) => {
        const q = parts.yarn.position;
        const ax = q.x - b.pos.x;
        const az = q.z - b.pos.z;
        if (Math.hypot(ax, az) > 1.6) return;
        pushYarn(ax + (Math.random() - 0.5) * 0.6, az + (Math.random() - 0.5) * 0.6, 2.4 + Math.random() * 1.2);
        hooks.say(b.name === "luna" ? "Luna colpisce il gomitolo con la zampa." : "Neko colpisce il gomitolo.");
      },
    };
    // a cat walking into the yarn pushes it along
    for (const b of [brains.neko, brains.luna]) {
      const q = parts.yarn.position;
      const ax = q.x - b.pos.x;
      const az = q.z - b.pos.z;
      const d = Math.hypot(ax, az);
      if (d < 0.55 && b.v > 0.3 && yarn.vel.length() < b.v) pushYarn(ax, az, b.v * 1.2);
    }
    const lookRolling = yarn.rolling ? parts.yarn.position : null;
    // Neko
    const nb = brains.neko;
    if (playing || t < wakeUntil) nb.wake(t < wakeUntil ? (wakeUntil - t) * FF : 2);
    const np = nb.update(bdt, { ...ctxB, lookAt: lookRolling, other: brains.luna.pos });
    // Luna
    const lb = brains.luna;
    let lookL = lookRolling;
    if (!lookL && luna.hover) lookL = camera.position.clone().add(new THREE.Vector3(pointer.x * 4, pointer.y * 2, 0));
    const lpz = lb.update(bdt, { ...ctxB, lookAt: lookL, other: brains.neko.pos });
    const happy = st.happy > 0.3;
    const lh = st.lunaHappy > 0.3;
    const blink = !still && t % 4.1 < 0.13;
    const blinkL = !still && (t + 1.7) % 3.6 < 0.13;
    const applyPose = (cat, pz, base, extra) => {
      cat.group.position.set(pz.x, pz.y, pz.z);
      cat.group.rotation.set(pz.lean, pz.yaw, pz.roll, "YXZ");
      const settle = cat.group.userData.settle || 0;
      const br = still ? 0 : Math.sin(t * (settle > 0.5 ? 1.4 : 2.4)) * 0.012;
      cat.group.scale.set(base * pz.sx * (1 + br * 0.4 + settle * 0.03), base * pz.sy * (1 + br - settle * 0.05), base * pz.sx * (1 + br * 0.4 + settle * 0.03));
      cat.update(dt, {
        ...pz,
        eyes: extra.happy ? "happy" : pz.eyes === "open" && (cat === parts.luna ? blinkL : blink) ? "blink" : pz.eyes,
        rot: pz.rot + (extra.happy ? Math.sin(t * 6) * 0.06 : 0),
        nod: pz.nod - (extra.lookY || 0),
        turn: pz.turn + (extra.turn || 0),
        look: pz.look + (extra.look || 0),
        breath: still ? 0 : Math.sin(t * 1.4) * 1.5,
        phones: extra.phones,
        still,
      });
    };
    applyPose(parts.neko, np, 0.0125, { happy, phones: st.music > 0.5, lookY: nb.state === "sit" ? look.y * 0.1 : 0, turn: nb.state === "sit" ? look.x * 0.25 : 0, look: nb.state === "sit" ? look.x * 0.5 : 0 });
    applyPose(parts.luna, lpz, 0.0098, { happy: lh });
    const aw = np.awake ? 1 : 0;

    // turntable
    st.spin = ease(st.spin, playing ? 1 : 0, 2.5);
    parts.recordPivot.rotation.y -= dt * st.spin * 3.6;
    st.arm = ease(st.arm, playing ? 1 : 0, 3);
    parts.arm.rotation.y = lerp(0, 0.38, st.arm);
    parts.cones.forEach((c) => c.scale.set(1 + beat * 0.15, 1 + beat * 0.15, 1));
    if (parts.ledMat) parts.ledMat.emissive.set(playing ? "#ff5a4a" : "#000");

    // plant + statue
    if (user.plant) {
      st.plantT += dt;
      parts.plant.rotation.z = Math.sin(st.plantT * 14) * 0.1 * Math.exp(-st.plantT * 2.5);
      parts.plant.rotation.x = Math.cos(st.plantT * 11) * 0.06 * Math.exp(-st.plantT * 2.5);
      if (st.plantT > 2.5) (user.plant = 0), (st.plantT = 0), parts.plant.rotation.set(0, 0, 0);
    }
    if (user.statue) {
      st.statueT = Math.min(1, st.statueT + dt * 1.1);
      parts.statuePivot.rotation.y = THREE.MathUtils.smootherstep(st.statueT, 0, 1) * Math.PI * 2;
      if (st.statueT >= 1) (user.statue = 0), (st.statueT = 0);
    }

    // TV: switched on by hand, or when we dive into it
    const tvOn = Math.max(st.tv, smooth(p, 0.15, 0.5));
    screenU.power.value = tvOn;
    screenU.mixK.value = user.tv === 2 && p < 0.2 ? 1 : 0;
    const dive = p > 0.1;
    setVideo(vids[0], !still && tvOn > 0.05 && (screenU.mixK.value < 0.5 || dive));
    setVideo(vids[1], !still && tvOn > 0.05 && screenU.mixK.value > 0.5 && !dive);
    if (dive) screenU.mixK.value = 0;
    screenU.stillK.value = smooth(p, 0.5, 0.85);
    screenU.mapA.value = vids[0].ready ? vids[0].tex : posters[0];
    screenU.mapB.value = vids[1].ready ? vids[1].tex : posters[1];
    tvGlow.intensity = tvOn * (1 + cur.stars * 5);
    // stream monitor
    const live = Math.max(cur.stars, st.music * 0.7);
    if (frame % 3 === 0) monitor.draw(still ? 0 : t, TRACKS[trackIndex], playing);
    monitorMat.color.setScalar(lerp(0.45, 1, live));
    deskGlow.intensity = live * (0.5 + cur.stars * 4);

    // particles
    parts.record.getWorldPosition(recW);
    headW.copy(headPos(parts.neko));
    if (playing && !still && t - lastNote > 0.6 && p < 0.3) {
      lastNote = t;
      emit(noteMats[Math.floor(Math.random() * 3)], recW.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.4, 0.25, 0.1)), { size: 0.3 + beat * 0.1, spread: 0.5 });
    }
    if (parts.neko.asleep && !still && t - lastZ > 1.5) {
      lastZ = t;
      emit(zMat, headW.clone().add(new THREE.Vector3(1.0, 0.45, 0.3)), { size: 0.26, spread: 0.15, up: 0.35, life: 2.6, kind: "z" });
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const s = particles[i];
      const u = s.userData;
      u.life += dt * (u.kind === "z" && st.awake > 0.5 ? 4 : 1);
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
      const k = 1 - smooth(p, 0, 0.4);
      camPos.x += look.x * 0.5 * k;
      camPos.y += look.y * 0.3 * k;
    }
    if (dbgCam) {
      camPos.set(...dbgCam[0]);
      camTgt.set(...dbgCam[1]);
      camera.clearViewOffset();
    }
    camera.position.copy(camPos);
    camera.lookAt(camTgt);
    // ink lines thin out as we fly into the TV
    ink.uniforms.strength.value = 0.85 * (1 - smooth(p, 0.7, 0.95));
    ink.uniforms.time.value = still ? 0 : t;

    // quality: measure after the entrance, step down if the computer struggles
    if (st.intro >= 1 && perf.checks < 2 && forceQ == null) {
      perf.frames++;
      perf.time += dt;
      if (perf.frames === 90) {
        const fps = 90 / Math.max(perf.time, 0.001);
        if (fps < 40 && quality > 0) {
          quality--;
          resize();
        }
        perf.frames = perf.time = 0;
        perf.checks++;
      }
    }
    if (quality > 0) {
      ink.prepare(1); // layer 0 only: no sprites in the outline buffer
      composer.render(dt);
    } else renderer.render(scene, camera);
    hooks.frame?.();
  }

  resize();
  addEventListener("resize", resize);

  return {
    loaded,
    start() {
      requestAnimationFrame(tick);
    },
    setRunning(on) {
      if (on === running) return;
      running = on;
      if (!on) vids.forEach((o) => setVideo(o, false));
      else {
        clock.reset?.();
        requestAnimationFrame(tick);
      }
    },
    setPlaying(on) {
      playing = on;
    },
    setBeat(b) {
      beat = b;
    },
    setGroove(g, phaseT) {
      groove = g;
      grooveT = phaseT ?? grooveT;
    },
    setTrack(i) {
      trackIndex = i;
      if (parts.labelMat) parts.labelMat.color.set(TRACKS[i].label || "#ffb37e");
      paintPoster();
    },
    forceProgress(v) {
      forceP = v;
    },
  };
}
