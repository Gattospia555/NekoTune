import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { toonRamp, toonify, InkPass } from "./toon.js";
import { moodAt, mixColor, mixNum, paintSky } from "./daylight.js";
import { createMonitorScreen, coverTexture } from "./textures.js";
import { TRACKS } from "./audio.js";

const q = new URLSearchParams(location.search);
const canvas = document.getElementById("c");
const alpha = q.get("alpha") === "1";
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(Number(q.get("fov") || 28), innerWidth / innerHeight, 0.5, 120);
const cp = (q.get("cam") || "13,10.5,15").split(",").map(Number);
const tp = (q.get("tgt") || "-0.6,1.9,-0.4").split(",").map(Number);
camera.position.set(...cp);
camera.lookAt(...tp);
const m = moodAt();
scene.background = alpha ? null : mixColor(m.a.bg, m.b.bg, m.t);
const sun = new THREE.DirectionalLight(mixColor(m.a.sun, m.b.sun, m.t), mixNum(m.a.sunI, m.b.sunI, m.t));
const d = new THREE.Vector3(...m.a.sunDir).lerp(new THREE.Vector3(...m.b.sunDir), m.t).normalize();
sun.position.copy(d.multiplyScalar(20));
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 50 });
sun.shadow.bias = -0.0008;
sun.shadow.normalBias = 0.03;
scene.add(sun);
const amb = new THREE.HemisphereLight(mixColor(m.a.amb, m.b.amb, m.t), mixColor(m.a.amb, "#c79a7a", 0.4), mixNum(m.a.ambI, m.b.ambI, m.t));
scene.add(amb);
const lampK = mixNum(m.a.lamp, m.b.lamp, m.t);
const lamp = new THREE.PointLight("#ffc77a", 40 * lampK, 12, 1.6);
lamp.position.set(-4.2, 3.1, -3.9);
lamp.castShadow = lampK > 0.3;
lamp.shadow.bias = -0.002;
scene.add(lamp);
const ramp = toonRamp();
new GLTFLoader().load("media/room.glb", (g) => {
  const root = g.scene;
  toonify(root, ramp);
  const bulbs = mixNum(m.a.bulbs, m.b.bulbs, m.t);
  root.traverse((o) => {
    if (!o.isMesh) return;
    if (o.name === "bulbs" || o.name === "lamp_bulb") {
      o.material = new THREE.MeshBasicMaterial({ color: new THREE.Color("#fff2c4").multiplyScalar(0.6 + bulbs * 1.2) });
      o.castShadow = false;
    }
    if (o.name === "window_sky") {
      const cv = document.createElement("canvas");
      cv.width = 512; cv.height = 440;
      paintSky(cv, m);
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      o.material = new THREE.MeshBasicMaterial({ map: t });
      o.castShadow = false; o.receiveShadow = false;
    }
    if (o.name === "tv_screen") {
      o.material = new THREE.MeshBasicMaterial({ color: "#2b3350" });
    }
    if (o.name === "poster_art") {
      o.material = new THREE.MeshBasicMaterial({ map: coverTexture(0, TRACKS[0].title, TRACKS[0].artist, ["#5fb3a8", "#ffe3c8", "#2a2430"]) });
    }
    if (o.name === "pc_screen") {
      const mon = createMonitorScreen();
      mon.draw(3.2, TRACKS[0], true);
      o.material = new THREE.MeshBasicMaterial({ map: mon.texture });
      o.castShadow = false;
    }
    if (/curtain|lamp_shade/.test(o.name)) o.castShadow = false;
  });
  // closed eyes vs open
  const sleeping = q.get("sleep") !== "0";
  root.traverse((o) => {
    if (/_eyeshut/.test(o.name)) o.visible = sleeping;
    if (/neko_eye-?1$|neko_eye1$|neko_eyehi/.test(o.name)) o.visible = !sleeping;
    if (/neko_phones/.test(o.name)) o.visible = q.get("phones") === "1";
  });
  const only = q.get("only");
  if (only) {
    const keep = only.split(",");
    root.traverse((o) => {
      if (!o.isMesh) return;
      let a = o, ok = false;
      while (a) { if (keep.includes(a.name)) ok = true; a = a.parent; }
      if (!ok) o.visible = false;
    });
  }
  const hy = q.get("headyaw");
  if (hy) { const h = root.getObjectByName("neko_head"); h.rotation.y = Number(hy); h.rotation.x = Number(q.get("headpitch") || 0); }
  const lh = q.get("lunayaw");
  if (lh) { root.getObjectByName("luna_head").rotation.y = Number(lh); }
  scene.add(root);
  window.__names = [];
  root.traverse((o) => window.__names.push(o.name));
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const ink = new InkPass(renderer, scene, camera, { ink: mixColor(m.a.ink, m.b.ink, m.t).getStyle(), thickness: Number(q.get("th") || 1.1), paper: 0.012 });
  ink.setSize(innerWidth, innerHeight, 1);
  const ip = new ShaderPass(ink.material);
  composer.addPass(ip);
  composer.addPass(new OutputPass());
  ink.prepare();
  composer.render();
  document.body.dataset.ready = "1";
});
