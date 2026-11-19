// Neko and Luna in 3D, built from the app's mascot drawing: every part is the
// drawing's own outline, "inflated" into a soft, rounded volume (like a vinyl
// toy made from the sketch). From the front it matches the mascot; from an
// angle it has real depth. The face is painted on the head, the tail is the
// app's music-note tail, moving the same way.
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { createTail, drawFace, CURLED_TAIL } from "./mascot.js";

// outlines in the drawing's units (viewBox 0 0 260 262, y down)
const HEAD = "M58 118 C54 92 64 74 78 66 C96 56 148 56 166 66 C180 74 190 92 186 118 C182 146 156 162 122 162 C88 162 62 146 58 118 Z";
const BODY = "M80 236 C64 236 60 212 64 194 C70 166 86 148 122 148 C158 148 174 166 180 194 C184 212 180 236 164 236 Z";
const EARS = [
  [[70, 80], [82, 34], [114, 62]],
  [[130, 62], [162, 34], [174, 80]],
];
const INNER = [
  [[84, 66], [86, 46], [102, 60]],
  [[142, 60], [158, 46], [160, 66]],
];
const FOOT_Y = 242; // the drawing's floor
const MID_X = 122;

// tiny SVG path reader: M, L, C, Q, Z (absolute) -> THREE.Shape in local units (y up)
function shapeFrom(d) {
  const s = new THREE.Shape();
  const tok = d.match(/[MLCQZ]|-?\d*\.?\d+/g);
  let i = 0;
  const X = (v) => v - MID_X;
  const Y = (v) => FOOT_Y - v;
  const num = () => Number(tok[i++]);
  while (i < tok.length) {
    const c = tok[i++];
    if (c === "M") s.moveTo(X(num()), Y(num()));
    else if (c === "L") s.lineTo(X(num()), Y(num()));
    else if (c === "C") s.bezierCurveTo(X(num()), Y(num()), X(num()), Y(num()), X(num()), Y(num()));
    else if (c === "Q") s.quadraticCurveTo(X(num()), Y(num()), X(num()), Y(num()));
  }
  return s;
}
function triShape(pts) {
  const s = new THREE.Shape();
  pts.forEach(([x, y], k) => (k ? s.lineTo(x - MID_X, FOOT_Y - y) : s.moveTo(x - MID_X, FOOT_Y - y)));
  s.closePath();
  return s;
}
/** Soft pillow from a flat outline: the silhouette stays the same, the edges round off. */
// UVs only on the front face (for the painted face); everything else samples
// the canvas edge, which is plain fur colour.
const FAR = () => new THREE.Vector2(-999, -999);
function frontOnlyUV(frontZ) {
  return {
    generateTopUV(geometry, v, a, b, c) {
      const out = [a, b, c].map((k) => new THREE.Vector2(v[k * 3], v[k * 3 + 1]));
      return v[a * 3 + 2] > frontZ ? out : [FAR(), FAR(), FAR()];
    },
    // the rounded edge on the front half gets the same flat projection, so
    // features near the edge of the face (mouth, cheeks) are not cut off
    generateSideWallUV(geometry, v, a, b, c, d) {
      return [a, b, c, d].map((k) => (v[k * 3 + 2] > frontZ ? new THREE.Vector2(v[k * 3], v[k * 3 + 1]) : FAR()));
    },
  };
}
function puff(shape, depth, round, segments = 10, face = false) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: round * 1.4,
    bevelSize: round,
    bevelOffset: -round,
    bevelSegments: segments,
    curveSegments: 36,
    UVGenerator: face ? frontOnlyUV(depth / 2) : undefined,
  });
  g.translate(0, 0, -depth / 2);
  g.deleteAttribute("normal");
  const m = mergeVertices(g, 0.01);
  m.computeVertexNormals();
  return m;
}
const local = (x, y, z = 0) => new THREE.Vector3(x - MID_X, FOOT_Y - y, z);

export function createCat3D({ pal, scale, ramp, bow = false, inkId = 2, earColor = "#ffc7a6" }) {
  const group = new THREE.Group();
  group.scale.setScalar(scale);
  const toon = (color, extra = {}) => new THREE.MeshToonMaterial({ color, gradientMap: ramp, ...extra });
  const fur = toon(pal.fill);
  const dark = toon(pal.line);
  const meshes = [];
  const add = (geo, mat, parent = group, id = inkId) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true;
    m.receiveShadow = false;
    m.userData.ink = id;
    parent.add(m);
    meshes.push(m);
    return m;
  };

  // body, front legs, bean feet
  add(puff(shapeFrom(BODY), 34, 26), fur);
  const legs = [];
  for (const x of [106, 138]) {
    const pv = new THREE.Group();
    pv.position.copy(local(x, 196, 44));
    group.add(pv);
    const leg = add(new THREE.CapsuleGeometry(9.5, 28, 6, 14), fur, pv);
    leg.position.copy(local(x, 212, 47).sub(pv.position));
    const foot = add(new THREE.SphereGeometry(1, 20, 14), fur, pv);
    foot.scale.set(15, 9.5, 17);
    foot.position.copy(local(x - 2, 233, 50).sub(pv.position));
    legs.push(pv);
  }
  const legBase = legs.map((l) => l.position.clone());

  // head group, pivoting at the neck so it can nod and tilt
  const head = new THREE.Group();
  head.position.copy(local(122, 152, 8));
  group.add(head);
  const inHead = (v) => v.sub(head.position);
  // face texture: the front cap of the head uses the drawing's coordinates as UVs
  const faceCanvas = document.createElement("canvas");
  faceCanvas.width = 520;
  faceCanvas.height = 524;
  const fg = faceCanvas.getContext("2d");
  const faceTex = new THREE.CanvasTexture(faceCanvas);
  faceTex.colorSpace = THREE.SRGBColorSpace;
  faceTex.wrapS = faceTex.wrapT = THREE.ClampToEdgeWrapping;
  faceTex.anisotropy = 4;
  // shape coords are (x - 122, 242 - y): map back to the canvas
  faceTex.repeat.set(1 / 260, 1 / 262);
  faceTex.offset.set(MID_X / 260, (262 - FOOT_Y) / 262);
  const headMat = toon("#ffffff", { map: faceTex });
  const headGeo = puff(shapeFrom(HEAD), 30, 30, 12, true);
  const headMesh = add(headGeo, headMat, head);
  headMesh.position.copy(inHead(local(122, 242, 6)));
  // ears on pivots at their base, so they can twitch and turn
  const ears = [];
  for (let k = 0; k < 2; k++) {
    const pv = new THREE.Group();
    pv.position.copy(inHead(local(k ? 152 : 92, 71, 0)));
    head.add(pv);
    const ear = add(puff(triShape(EARS[k]), 8, 7, 6), fur, pv);
    ear.position.copy(inHead(local(122, 242, -6)).sub(pv.position));
    const inner = add(puff(triShape(INNER[k]), 2, 2.5, 3), toon(earColor), pv);
    inner.position.copy(inHead(local(122, 242, 4)).sub(pv.position));
    ears.push(pv);
  }
  const earV = [0, 0];
  // whiskers: thin and dark, no ink around them
  const whiskerMat = new THREE.MeshBasicMaterial({ color: pal.whisker });
  for (const [a, b] of [
    [[80, 121], [52, 116]],
    [[80, 129], [52, 133]],
    [[164, 121], [192, 116]],
    [[164, 129], [192, 133]],
  ]) {
    const p0 = inHead(local(a[0], a[1], 50));
    const p1 = inHead(local(b[0], b[1], 40));
    const w = add(new THREE.CylinderGeometry(1.4, 1.1, p0.distanceTo(p1), 6), whiskerMat, head, 4);
    w.position.copy(p0).add(p1).multiplyScalar(0.5);
    w.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p1.clone().sub(p0).normalize());
    w.castShadow = false;
  }
  // headphones (only while the music plays)
  const phones = new THREE.Group();
  head.add(phones);
  {
    const band = [];
    for (let i = 0; i <= 24; i++) {
      const a = Math.PI * (i / 24);
      band.push(inHead(local(122 - Math.cos(a) * 74, 114 - Math.sin(a) * 80, -2)));
    }
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(band), 48, 6.5, 10), toon("#5a4a8a"), phones);
    for (const sx of [-1, 1]) {
      const cup = add(new THREE.CylinderGeometry(19, 19, 16, 28), toon("#4b3d78"), phones);
      cup.rotation.z = Math.PI / 2;
      cup.position.copy(inHead(local(122 + sx * 74, 116, 6)));
      const pad = add(new THREE.CylinderGeometry(13, 13, 5, 24), toon(pal.fill === "#FFB37E" ? "#ffd2b3" : "#ffd6e2"), phones);
      pad.rotation.z = Math.PI / 2;
      pad.position.copy(inHead(local(122 + sx * 66, 116, 6)));
    }
  }
  phones.visible = false;
  if (bow) {
    const bowMat = toon(pal.bow);
    for (const sx of [-1, 1]) {
      const wing = add(new THREE.SphereGeometry(1, 18, 12), bowMat, head);
      wing.scale.set(13, 10, 6);
      wing.rotation.z = sx * 0.35;
      wing.position.copy(inHead(local(150 + sx * 14, 60, 22)));
    }
    const knot = add(new THREE.SphereGeometry(6, 14, 10), toon(pal.bowLine), head);
    knot.position.copy(inHead(local(150, 60, 27)));
  }

  // tail: one tube that morphs between the app's moving note-tail (awake)
  // and the tail curled round the paws (asleep)
  const N = 48;
  const tail = createTail();
  const resample = (pts) => {
    const len = [0];
    for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + pts[i].distanceTo(pts[i - 1]));
    const total = len[len.length - 1];
    const out = [];
    let j = 0;
    for (let k = 0; k < N; k++) {
      const d = (k / (N - 1)) * total;
      while (j < len.length - 2 && len[j + 1] < d) j++;
      const f = (d - len[j]) / Math.max(1e-6, len[j + 1] - len[j]);
      out.push(pts[j].clone().lerp(pts[j + 1], Math.min(1, Math.max(0, f))));
    }
    return out;
  };
  const upPoints = () => resample(tail.points().map(([x, y], i, all) => local(x, y, -26 + (i / all.length) * 6)));
  const curledPts = (() => {
    const [p0, c1, c2, p1, c3, c4, p2] = CURLED_TAIL;
    const bez = (a, b, c, d, t) => a * (1 - t) ** 3 + 3 * b * t * (1 - t) ** 2 + 3 * c * t * t * (1 - t) + d * t ** 3;
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const u = i / 40;
      const [A, B, C, D] = u < 0.5 ? [p0, c1, c2, p1] : [p1, c3, c4, p2];
      const t = u < 0.5 ? u * 2 : (u - 0.5) * 2;
      const x = bez(A[0], B[0], C[0], D[0], t);
      const y = Math.min(bez(A[1], B[1], C[1], D[1], t), 236);
      const z = -24 + 84 * THREE.MathUtils.smoothstep(u, 0, 0.55);
      pts.push(local(x, y, z));
    }
    // start from the same root as the note-tail
    pts.unshift(local(150, 228, -26));
    return resample(pts);
  })();
  let up = upPoints();
  const tailMesh = add(new THREE.BufferGeometry(), fur);
  const tip = add(new THREE.SphereGeometry(10, 16, 12), dark);
  const cur = curledPts.map((p) => p.clone());
  function buildTail(m) {
    // m = 0 note-tail, 1 curled; on the way it swings out to the side, round the body
    const swing = Math.sin(Math.PI * m);
    for (let k = 0; k < N; k++) {
      const u = k / (N - 1);
      cur[k].lerpVectors(up[k], curledPts[k], THREE.MathUtils.smoothstep(m, u * 0.35, u * 0.35 + 0.65));
      cur[k].x += swing * 46 * u;
      cur[k].z += swing * 30 * u;
    }
    tailMesh.geometry.dispose();
    tailMesh.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cur), 72, 8.5, 10);
    tip.position.copy(cur[N - 1]);
  }
  buildTail(0);

  let faceKey = "";
  function paintFace(eyes, look, yawn = 0, mouth = "") {
    const key = eyes + "|" + Math.round(look * 4) + "|" + Math.round(yawn * 6) + "|" + mouth;
    if (key === faceKey) return;
    faceKey = key;
    fg.setTransform(2, 0, 0, 2, 0, 0);
    drawFace(fg, { pal, eyes, look, yawn, mouth });
    faceTex.needsUpdate = true;
  }
  paintFace("open", 0);

  // ---------------------------------------------------------------- sleep / wake
  // sleep: 0 awake ... 1 asleep. Falling asleep is a little scene (yawn,
  // heavy eyes, head going down, tail curling round the paws); waking is quick.
  const sm = { phase: "awake", t: 0, sleep: 0, tailM: 0, bounce: 0 };
  const DOWN = new THREE.Vector3(0, -1, 0);
  const IDQ = new THREE.Quaternion();
  const waveQ = new THREE.Quaternion();
  const waveDir = new THREE.Vector3();
  const pawQ = [new THREE.Quaternion(), new THREE.Quaternion()];
  const pawW = [0, 0];
  const ease = (x) => x * x * (3 - 2 * x);
  const clamp = (x) => Math.min(1, Math.max(0, x));
  let frame = 0;
  let lastTail = -1;
  return {
    group,
    head,
    meshes,
    get asleep() {
      return sm.phase === "asleep";
    },
    /**
     * opts: { awake (target), eyes (when awake), phones, rot, nod, turn, dy (awake pose),
     *         breath, look, energy, still }
     */
    update(dt, opts) {
      const want = opts.awake !== false;
      if (opts.still) {
        sm.phase = want ? "awake" : "asleep";
        sm.sleep = sm.tailM = want ? 0 : 1;
      } else if (want && (sm.phase === "asleep" || sm.phase === "falling")) {
        sm.phase = "waking";
        sm.t = 0;
        sm.from = sm.sleep;
        sm.tailFrom = sm.tailM;
      } else if (!want && (sm.phase === "awake" || sm.phase === "waking")) {
        sm.phase = "falling";
        sm.t = 0;
        sm.from = sm.sleep;
        sm.tailFrom = sm.tailM;
      }
      sm.t += dt;
      let eyes = opts.eyes;
      let yawn = 0;
      let headUp = 0;
      if (sm.phase === "falling") {
        const T = sm.t;
        // 0-1.1 s yawn, 1.1-2.4 s heavy eyes and slow blinks, head goes down, tail curls
        if (T < 1.1) {
          yawn = Math.sin(Math.PI * clamp(T / 1.1));
          eyes = yawn > 0.25 ? "yawn" : "heavy";
          headUp = yawn;
        } else if (T < 2.6) {
          const b = T - 1.1;
          eyes = (b > 0.45 && b < 0.7) || b > 1.2 ? "sleep" : "heavy";
        } else eyes = "sleep";
        sm.sleep = sm.from + (1 - sm.from) * ease(clamp((T - 0.9) / 1.8));
        sm.tailM = sm.tailFrom + (1 - sm.tailFrom) * ease(clamp((T - 1.2) / 1.3));
        if (T > 3) sm.phase = "asleep";
      } else if (sm.phase === "waking") {
        const T = sm.t;
        eyes = T < 0.12 ? "sleep" : T < 0.22 ? "blink" : opts.eyes;
        sm.sleep = sm.from * (1 - ease(clamp(T / 0.45)));
        sm.tailM = sm.tailFrom * (1 - ease(clamp((T - 0.1) / 0.6)));
        // ears-up pop at the end
        sm.bounce = T > 0.3 ? Math.sin(Math.PI * clamp((T - 0.3) / 0.35)) : 0;
        if (T > 0.8) sm.phase = "awake";
      } else if (sm.phase === "asleep") {
        eyes = "sleep";
        sm.sleep = 1;
        sm.tailM = 1;
      } else {
        sm.sleep = 0;
        sm.tailM = 0;
        sm.bounce = 0;
      }
      if (opts.eyes === "happy") eyes = "happy";
      paintFace(eyes, sm.sleep > 0.5 ? 0 : opts.look || 0, yawn, sm.sleep > 0.5 ? "" : opts.mouth || "");
      phones.visible = !!opts.phones && sm.sleep < 0.5;
      // head: blend the awake pose and the sleeping pose
      const s = sm.sleep;
      const breath = opts.breath || 0;
      // the head follows its target smoothly (no jumps, whatever the inputs do)
      const k = opts.still ? 1 : 1 - Math.exp(-dt * 10);
      head.rotation.x += ((opts.nod || 0) * (1 - s) + 0.22 * s - headUp * 0.18 - head.rotation.x) * k;
      head.rotation.y += ((opts.turn || 0) * (1 - s) - head.rotation.y) * k;
      head.rotation.z += (-((opts.rot || 0) * (1 - s) + 0.07 * s) - head.rotation.z) * k;
      // ears: + flicks the ear outwards (and a little back)
      for (let i = 0; i < 2; i++) {
        const e = (opts.ears?.[i] || 0) * (1 - s);
        earV[i] += (e - earV[i]) * (opts.still ? 1 : 1 - Math.exp(-dt * 22));
        ears[i].rotation.z = earV[i] * (i ? -1 : 1) * 0.9;
        ears[i].rotation.x = -earV[i] * 0.5;
      }
      // waving paw (right front leg)
      const w = opts.wave || 0;
      // front paws: each can be raised in any direction (wave, groom, swat, walk)
      const paws = opts.paws || [null, opts.wave ? { w: opts.wave, dir: [0.75 + Math.sin(sm.t * 13) * 0.22, 0.95, 0.4] } : null];
      for (let i = 0; i < 2; i++) {
        const p = paws[i];
        const w = p ? p.w : 0;
        const target = pawQ[i];
        if (p && w > 0) {
          waveDir.set(...p.dir).normalize();
          target.setFromUnitVectors(DOWN, waveDir);
        }
        const kk = opts.still ? 1 : 1 - Math.exp(-dt * 16);
        pawW[i] += (w - pawW[i]) * kk;
        legs[i].quaternion.slerpQuaternions(IDQ, target, Math.min(1, pawW[i]));
        const out = Math.min(1, pawW[i]) * (p?.lift ?? 1);
        legs[i].position.copy(legBase[i]);
        legs[i].position.z += out * 16;
        legs[i].position.x += out * 10 * (i ? 1 : -1);
        legs[i].scale.set(1, 1 + 0.4 * out, 1);
      }
      // the body settles a little as he falls asleep
      group.userData.settle = s;
      // tail: animate the note-tail while (partly) awake; morph towards the curl
      const animate = !opts.still && sm.tailM < 1;
      if (animate && frame++ % 2 === 0) {
        tail.step(dt * 2, (opts.energy ?? 1) * (1 - sm.tailM));
        up = upPoints();
        buildTail(sm.tailM);
        lastTail = sm.tailM;
      } else if (sm.tailM !== lastTail) {
        buildTail(sm.tailM);
        lastTail = sm.tailM;
      }
    },
  };
}
