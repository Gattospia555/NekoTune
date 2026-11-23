// Neko and Luna in 3D, built from the app's mascot drawing: head and body are
// round volumes whose front silhouette is exactly the drawing's outline (like a
// vinyl toy made from the sketch). From the front they match the mascot; from
// the side and from behind they are still a cat (back of the head, ears, tail). The face is painted on the head, the tail is the
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
// sitting and standing (on four legs) placements of the parts, in local units
const TORSO_SIT = local(122, 192, 0);
const TORSO_STAND = new THREE.Vector3(0, 62, -10);
const HEAD_STAND = new THREE.Vector3(0, 74, 58);
const TAIL_ROOT = local(150, 228, -26);
const TAIL_STAND = new THREE.Vector3(0, 70, -66);
const LEG_STAND_Z = 34;
const HIP_STAND = (side) => new THREE.Vector3(side * 26, 46, -52);

/**
 * A round volume whose front silhouette is exactly the outline: every ring of a
 * sphere is stretched to the outline's radius in that direction (so seen from the
 * front it is the drawing), and the depth is `depth` front and back (so from the
 * side and from behind it is a soft, round shape, not a flat cut-out).
 * e < 1 makes it a little "boxier" (a broader, flatter face).
 * With `face`, the front half gets the drawing's coordinates as UVs (the painted
 * face); the back half samples outside the face, which is plain fur colour.
 */
function inflate(shape, depth, e = 0.8, face = false) {
  const pts = shape.getSpacedPoints(256).slice(0, -1);
  const c = pts.reduce((a, q) => a.add(q), new THREE.Vector2()).multiplyScalar(1 / pts.length);
  // radius of the outline as a function of the angle (the outlines are star-shaped)
  const polar = pts.map((q) => ({ a: Math.atan2(q.y - c.y, q.x - c.x), r: q.distanceTo(c) })).sort((u, v) => u.a - v.a);
  const radius = (a) => {
    let i = polar.findIndex((q) => q.a >= a);
    if (i <= 0) i = polar.length;
    const p0 = polar[(i - 1) % polar.length];
    const p1 = polar[i % polar.length];
    let span = p1.a - p0.a;
    let d = a - p0.a;
    if (span <= 0) span += Math.PI * 2;
    if (d < 0) d += Math.PI * 2;
    return p0.r + (p1.r - p0.r) * Math.min(1, d / span);
  };
  const NP = 32; // rings from the front pole to the back pole (even: one ring is the silhouette)
  const NT = 96;
  const pos = [];
  const uv = [];
  const sgn = (v) => (v < 0 ? -1 : 1);
  for (let i = 0; i <= NP; i++) {
    const phi = (i / NP) * Math.PI;
    const sp = Math.sin(phi);
    const cp = Math.cos(phi);
    const ring = Math.pow(Math.abs(sp), e);
    const z = depth * sgn(cp) * Math.pow(Math.abs(cp), e);
    for (let j = 0; j <= NT; j++) {
      const th = (j / NT) * Math.PI * 2 - Math.PI;
      const R = radius(th);
      const x = c.x + Math.cos(th) * R * ring;
      const y = c.y + Math.sin(th) * R * ring;
      pos.push(x, y, z);
      if (i <= NP / 2) uv.push(x, y);
      else uv.push(c.x + Math.cos(th) * R * 2.2, c.y + Math.sin(th) * R * 2.2);
    }
  }
  const idx = [];
  for (let i = 0; i < NP; i++)
    for (let j = 0; j < NT; j++) {
      const a = i * (NT + 1) + j;
      const b = a + NT + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  const m = mergeVertices(g, 0.001);
  m.computeVertexNormals();
  if (!face) m.deleteAttribute("uv");
  // where the surface is, seen from the front at (x, y): used to place whiskers and legs on it
  m.userData.surfaceZ = (x, y) => {
    const a = Math.atan2(y - c.y, x - c.x);
    const rho = Math.min(1, Math.hypot(x - c.x, y - c.y) / radius(a));
    const sp = Math.pow(rho, 1 / e);
    return depth * Math.pow(Math.sqrt(Math.max(0, 1 - sp * sp)), e);
  };
  return m;
}


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
  const bodyGeo = inflate(shapeFrom(BODY), 50, 0.85);
  bodyGeo.translate(-TORSO_SIT.x, -TORSO_SIT.y, 0);
  // the body sits in a "torso" pivot: sitting it is upright like the drawing,
  // standing (walking on four legs) it tips forward and becomes a horizontal loaf
  const torso = new THREE.Group();
  torso.position.copy(TORSO_SIT);
  group.add(torso);
  const bodyMesh = add(bodyGeo, fur, torso);

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
  const legStand = legBase.map((b) => new THREE.Vector3(b.x * 1.25, b.y, LEG_STAND_Z));
  const legNow = legBase.map((b) => b.clone());
  // back legs: the round haunches on the sides of the body and the back feet,
  // which peek out beside the front ones (like a real sitting cat)
  const hinds = [];
  for (const [k, x] of [
    [0, 80],
    [1, 164],
  ]) {
    const pv = new THREE.Group();
    pv.position.copy(local(x, 208, -8));
    group.add(pv);
    const haunch = add(new THREE.SphereGeometry(1, 28, 18), fur, pv);
    haunch.scale.set(21, 25, 36);
    haunch.rotation.y = k ? -0.25 : 0.25;
    // the lower back leg: only seen when standing
    const shin = add(new THREE.CapsuleGeometry(9, 26, 6, 12), fur, pv);
    shin.position.set(0, -22, 0);
    shin.visible = false;
    const foot = add(new THREE.SphereGeometry(1, 20, 14), fur, pv);
    foot.scale.set(14, 9, 19);
    foot.position.copy(local(x + (k ? 7 : -7), 234, 26).sub(pv.position));
    hinds.push({ pv, haunch, shin, foot, sitPos: pv.position.clone(), base: foot.position.clone(), step: 0, drop: 0, side: k ? 1 : -1 });
  }

  // head group, pivoting at the neck so it can nod and tilt
  const head = new THREE.Group();
  head.position.copy(local(122, 152, 8));
  const HEAD_SIT = head.position.clone();
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
  const headGeo = inflate(shapeFrom(HEAD), 52, 0.78, true);
  const headMesh = add(headGeo, headMat, head);
  headMesh.position.copy(inHead(local(122, 242, 6)));
  // ears on pivots at their base, so they can twitch and turn
  const ears = [];
  for (let k = 0; k < 2; k++) {
    const pv = new THREE.Group();
    pv.position.copy(inHead(local(k ? 152 : 92, 71, 0)));
    head.add(pv);
    // thin and rounded (thicker in the middle), turned a little outwards like real ears
    const ear = add(inflate(triShape(EARS[k]), 7, 0.9), fur, pv);
    ear.position.copy(inHead(local(122, 242, 0)).sub(pv.position));
    const inner = add(inflate(triShape(INNER[k]), 2.2, 0.9), toon(earColor), pv);
    inner.position.copy(inHead(local(122, 242, 5.5)).sub(pv.position));
    pv.rotation.y = k ? 0.32 : -0.32;
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
    const zr = headGeo.userData.surfaceZ(a[0] - MID_X, FOOT_Y - a[1]) + 6;
    const p0 = inHead(local(a[0], a[1], zr - 2));
    const p1 = inHead(local(b[0], b[1], zr - 14));
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
  // the tail lives in its own group, rooted at the base of the tail, so that
  // standing it can move to the back of the body and point backwards
  const tailGroup = new THREE.Group();
  tailGroup.position.copy(TAIL_ROOT);
  group.add(tailGroup);
  const tailMesh = add(new THREE.BufferGeometry(), fur, tailGroup);
  const tip = add(new THREE.SphereGeometry(10, 16, 12), dark, tailGroup);
  const rel = [];
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
    for (let k = 0; k < N; k++) (rel[k] ||= new THREE.Vector3()).copy(cur[k]).sub(TAIL_ROOT);
    tailMesh.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rel), 72, 8.5, 10);
    tip.position.copy(rel[N - 1]);
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
  let stand = 0;
  const STAND_FOOT = new THREE.Vector3(0, -40, 7);
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
      // standing on four legs (walking) or sitting: everything moves between the two poses
      const stWant = (opts.stand || 0) * (1 - s);
      stand += (stWant - stand) * (opts.still ? 1 : 1 - Math.exp(-dt * 7));
      const st = THREE.MathUtils.smoothstep(stand, 0, 1);
      torso.position.lerpVectors(TORSO_SIT, TORSO_STAND, st);
      torso.rotation.x = st * 1.42;
      bodyMesh.scale.set(1 - 0.06 * st, 1 + 0.5 * st, 1 - 0.27 * st);
      head.position.lerpVectors(HEAD_SIT, HEAD_STAND, st);
      for (let i = 0; i < 2; i++) legNow[i].lerpVectors(legBase[i], legStand[i], st);
      tailGroup.position.lerpVectors(TAIL_ROOT, TAIL_STAND, st);
      tailGroup.rotation.set(-0.35 * st, (Math.PI / 2) * st, 0);
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
        legs[i].position.copy(legNow[i]);
        legs[i].position.z += out * 16;
        legs[i].position.x += out * 10 * (i ? 1 : -1);
        legs[i].scale.set(1, 1 + 0.4 * out, 1);
      }
      // back feet: step forwards/backwards (walking), hang down (in the air)
      const ks = opts.still ? 1 : 1 - Math.exp(-dt * 16);
      for (let i = 0; i < 2; i++) {
        const h = hinds[i];
        h.step += ((opts.hind?.[i] || 0) * (1 - s) - h.step) * ks;
        h.drop += ((opts.hindDrop || 0) - h.drop) * ks;
        h.foot.position.copy(h.base);
        h.foot.position.z += (h.step * 13 - h.drop * 16) * (1 - st);
        h.foot.position.y += (Math.max(0, h.step) * 7 - h.drop * 9) * (1 - st);
        // standing: the hip sits at the back, the leg shows, the foot is under it and swings
        h.pv.position.lerpVectors(h.sitPos, HIP_STAND(h.side), st);
        h.haunch.scale.set(21 - 5 * st, 25 - 4 * st, 36 - 14 * st);
        h.shin.visible = st > 0.04;
        h.shin.scale.set(1, Math.max(0.01, st), 1);
        h.foot.position.lerp(STAND_FOOT, st);
        h.pv.rotation.x = (-h.step * 0.6 + h.drop * 0.7) * st;
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
