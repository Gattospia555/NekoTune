import * as THREE from "three";
import { createCat3D } from "./cat3d.js";
import { NEKO, LUNA } from "./mascot.js";
import { toonRamp } from "./toon.js";
const q = new URLSearchParams(location.search);
const T = Number(q.get("t") || 0);
const mode = q.get("m") || "fall";
const r = new THREE.WebGLRenderer({ canvas: document.getElementById("c"), antialias: true, alpha: true });
r.setSize(360, 360);
const scene = new THREE.Scene();
scene.add(new THREE.HemisphereLight("#fff", "#caa", 2));
const sun = new THREE.DirectionalLight("#fff", 2);
sun.position.set(3, 5, 6);
scene.add(sun);
const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
cam.position.set(2.2, 2.4, 6.4);
cam.lookAt(0, 1.4, 0);
const isLuna = q.get("luna") === "1";
const cat = createCat3D({ pal: isLuna ? LUNA : NEKO, scale: 0.0125, ramp: toonRamp(true), bow: isLuna, earColor: isLuna ? "#f6c2d2" : "#ffc7a6" });
cat.group.rotation.y = 0.15;
scene.add(cat.group);
const dt = 1 / 30;
const base = { eyes: q.get("eyes") || "open", rot: 0, nod: 0, turn: Number(q.get("turn") || 0), dy: 0, breath: 0, look: Number(q.get("look") || 0), energy: 1, wave: Number(q.get("wave") || 0), mouth: q.get("mouth") || "" };
if (mode === "fall") {
  for (let i = 0; i < 30; i++) cat.update(dt, { ...base, awake: true });
  for (let s = 0; s < T; s += dt) cat.update(dt, { ...base, awake: false });
} else {
  for (let i = 0; i < 120; i++) cat.update(dt, { ...base, awake: false });
  for (let s = 0; s < T; s += dt) cat.update(dt, { ...base, awake: true });
}
r.render(scene, cam);
document.body.dataset.ready = "1";
