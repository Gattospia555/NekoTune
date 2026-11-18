// Still portraits of Neko and Luna, rendered once to transparent PNGs for the
// site (not shipped as code). window.shot(name) -> data URL.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createCat } from "./cat.js";
import { recordTexture, noteTexture, heartTexture } from "./textures.js";
import { TRACKS } from "./audio.js";

const S = 1400;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(S, S);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

const pmrem = new THREE.PMREMGenerator(renderer);
const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

function stage() {
  const scene = new THREE.Scene();
  scene.environment = envTex;
  scene.environmentIntensity = 0.25;
  scene.add(new THREE.HemisphereLight("#ffffff", "#C9B4EC", 0.8));
  const key = new THREE.DirectionalLight("#FFF1E6", 2.6);
  key.position.set(-3, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.radius = 6;
  Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3 });
  scene.add(key);
  const rim = new THREE.DirectionalLight("#C9B6FF", 1.4);
  rim.position.set(4, 3, -4);
  scene.add(rim);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.18, color: "#4A3C6B" }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  return scene;
}

function record(scene, y = 0) {
  const top = new THREE.MeshStandardMaterial({ roughness: 0.3, map: recordTexture(TRACKS[0]) });
  const side = new THREE.MeshStandardMaterial({ color: "#1F182F", roughness: 0.35 });
  const r = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.04, 128), [side, top, side]);
  r.position.y = y + 0.02;
  r.castShadow = r.receiveShadow = true;
  scene.add(r);
  return r;
}

function sprite(tex, x, y, z, s) {
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  sp.position.set(x, y, z);
  sp.scale.setScalar(s);
  return sp;
}

function render(scene, camPos, target, fov = 30) {
  const cam = new THREE.PerspectiveCamera(fov, 1, 0.1, 50);
  cam.position.set(...camPos);
  cam.lookAt(...target);
  renderer.render(scene, cam);
  return renderer.domElement.toDataURL("image/png");
}

const SHOTS = {
  // Neko with headphones, sitting on a record, notes around
  headphones() {
    const scene = stage();
    record(scene);
    const neko = createCat();
    neko.group.position.set(0, 0.04, 0);
    neko.group.rotation.y = 0.25;
    neko.pose(1, 1.2, 0, { x: -0.15, y: 0.15 }, true, 1);
    scene.add(neko.group);
    const notes = [noteTexture("#9C7BD6"), noteTexture("#F28A5B"), noteTexture("#7FC7A6")];
    scene.add(sprite(notes[0], -0.9, 1.5, 0.2, 0.32));
    scene.add(sprite(notes[1], 0.95, 1.55, 0.1, 0.26));
    scene.add(sprite(notes[2], 0.65, 1.1, 0.4, 0.22));
    return render(scene, [0.5, 2.0, 5.6], [0, 0.55, 0]);
  },
  // asleep on the record
  asleep() {
    const scene = stage();
    record(scene);
    const neko = createCat();
    neko.group.position.set(0, 0.04, 0.05);
    neko.group.rotation.y = -0.35;
    neko.pose(0, 0, 0, { x: 0, y: 0 }, true, 0);
    scene.add(neko.group);
    return render(scene, [0.3, 3.0, 4.9], [0, 0.15, 0]);
  },
  // Neko and Luna side by side, a heart between them
  friends() {
    const scene = stage();
    const neko = createCat();
    neko.group.position.set(-0.55, 0, 0.1);
    neko.group.rotation.y = 0.45;
    neko.pose(1, 1, 0, { x: 0.5, y: 0.05 }, true, 0);
    scene.add(neko.group);
    const luna = createCat({ body: "#DCD0F4", accent: "#A58BD8", inner: "#F2B8D0", whisker: "#8A79B0", bellyColor: "#F4EFFC", sheen: "#FFFFFF" });
    luna.group.position.set(0.6, 0, -0.1);
    luna.group.rotation.y = -0.5;
    luna.pose(1, 2, 0, { x: -0.5, y: 0.05 }, true, 0);
    scene.add(luna.group);
    scene.add(sprite(heartTexture(), 0.02, 1.62, 0.1, 0.34));
    return render(scene, [0, 1.6, 5.2], [0, 0.66, 0]);
  },
};

window.shot = (name) => SHOTS[name]();
window.ready = true;
