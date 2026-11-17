// A plush-toy cat. Neko (peach) and Luna (lilac) share this builder.
// Pose goes from curled up asleep (0) to sitting up (1).
import * as THREE from "three";

const lerp = (a, b, t) => a + (b - a) * t;
const v = (x, y, z) => new THREE.Vector3(x, y, z);

// tail path, local to the cat (asleep: wrapped around the front; awake: up behind)
const TAIL_SLEEP = [v(0, 0.16, -0.4), v(0.42, 0.11, -0.34), v(0.6, 0.09, 0.05), v(0.44, 0.08, 0.42), v(0.1, 0.08, 0.58)];
const TAIL_AWAKE = [v(0, 0.16, -0.4), v(0.16, 0.2, -0.7), v(0.3, 0.52, -0.82), v(0.34, 0.9, -0.7), v(0.22, 1.1, -0.5)];
const TAIL_SEG = 40;
const TAIL_RAD = 10;

// body silhouette: a soft pear, revolved
const BODY = [
  [0.0, 0.0], [0.3, 0.01], [0.43, 0.06], [0.5, 0.17], [0.51, 0.3], [0.48, 0.44],
  [0.42, 0.57], [0.34, 0.68], [0.24, 0.76], [0.12, 0.8], [0.0, 0.81],
].map(([r, y]) => new THREE.Vector2(r, y));

function fur(color, sheenColor) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.82,
    metalness: 0,
    sheen: 0.55,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color(sheenColor),
  });
}

export function createCat({
  body = "#FFB37E",
  accent = "#F28A5B",
  inner = "#FF9E8A",
  eye = "#2B1D16",
  whisker = "#B5654A",
  bellyColor = "#FFE0C4",
  sheen = "#FFE6D2",
} = {}) {
  const bodyMat = fur(body, sheen);
  const bellyMat = fur(bellyColor, "#FFFFFF");
  const accentMat = fur(accent, sheen);
  const innerMat = new THREE.MeshStandardMaterial({ color: inner, roughness: 0.7 });
  const eyeMat = new THREE.MeshPhysicalMaterial({ color: eye, roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.05 });
  const noseMat = new THREE.MeshStandardMaterial({ color: "#E8798A", roughness: 0.4 });
  const white = new THREE.MeshBasicMaterial({ color: "#ffffff" });
  const group = new THREE.Group();
  const meshes = [];
  const add = (parent, mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    meshes.push(mesh);
    return mesh;
  };

  // body ---------------------------------------------------------------
  const torso = add(group, new THREE.Mesh(new THREE.LatheGeometry(BODY, 48), bodyMat));
  const belly = add(torso, new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), bellyMat));
  belly.scale.set(0.24, 0.27, 0.14);
  belly.position.set(0, 0.34, 0.4);

  // haunches, front legs, paws
  const haunches = [-1, 1].map((s) => {
    const h = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.25, 28, 20), bodyMat));
    h.userData.side = s;
    return h;
  });
  const legs = [-1, 1].map((s) => {
    const g = new THREE.Group();
    group.add(g);
    const leg = add(g, new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.26, 8, 16), bodyMat));
    leg.position.y = 0.17;
    const paw = add(g, new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 14), bellyMat));
    paw.scale.set(1, 0.62, 1.2);
    paw.position.set(0, 0.04, 0.03);
    g.userData.side = s;
    return g;
  });
  const backPaws = [-1, 1].map((s) => {
    const p = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), bellyMat));
    p.scale.set(1, 0.6, 1.35);
    p.userData.side = s;
    return p;
  });

  // head -----------------------------------------------------------------
  const head = new THREE.Group();
  group.add(head);
  const A = 0.44, B = 0.37, Cc = 0.39;
  const skull = add(head, new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), bodyMat));
  skull.scale.set(A, B, Cc);
  // cheek fluff makes the face wider at the bottom
  [-1, 1].forEach((s) => {
    const ch = add(head, new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), bodyMat));
    ch.scale.set(1.1, 0.85, 0.85);
    ch.position.set(0.2 * s, -0.12, 0.12);
  });

  const onFace = (obj, x, y, lift = 0.004) => {
    const z = Cc * Math.sqrt(Math.max(0, 1 - (x / A) ** 2 - (y / B) ** 2));
    const n = v(x / (A * A), y / (B * B), z / (Cc * Cc)).normalize();
    obj.position.set(x, y, z).addScaledVector(n, lift);
    obj.lookAt(obj.position.clone().add(n));
    head.add(obj);
    return obj;
  };

  // muzzle: two little whisker pads and a chin, lighter
  [-1, 1].forEach((s) => {
    const pad = add(head, new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 14), bellyMat));
    pad.scale.set(1, 0.82, 0.75);
    pad.position.set(0.062 * s, -0.12, 0.345);
  });
  const chin = add(head, new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), bellyMat));
  chin.scale.set(1, 0.7, 0.7);
  chin.position.set(0, -0.19, 0.31);
  const nose = add(head, new THREE.Mesh(new THREE.SphereGeometry(0.036, 16, 12), noseMat));
  nose.scale.set(1.35, 0.85, 0.8);
  nose.position.set(0, -0.065, 0.405);

  // ears: rounded cones, flattened front to back
  const earGeo = new THREE.ConeGeometry(0.16, 0.27, 28, 1);
  earGeo.translate(0, 0.135, 0);
  const innerGeo = new THREE.ConeGeometry(0.11, 0.2, 24, 1);
  innerGeo.translate(0, 0.1, 0);
  [-1, 1].forEach((s) => {
    const ear = add(head, new THREE.Mesh(earGeo, bodyMat));
    ear.scale.set(1, 1, 0.62);
    ear.position.set(0.25 * s, 0.21, -0.03);
    ear.rotation.set(-0.1, 0.15 * s, -0.42 * s);
    const inn = add(ear, new THREE.Mesh(innerGeo, innerMat));
    inn.position.set(0, 0.02, 0.07);
    inn.scale.z = 0.4;
  });

  // eyes: glossy, with two highlights; closed eyes are little arcs
  const openEyes = [];
  [-1, 1].forEach((s) => {
    const e = new THREE.Group();
    const ball = add(e, new THREE.Mesh(new THREE.SphereGeometry(0.062, 24, 16), eyeMat));
    ball.scale.set(1, 1.18, 0.5);
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 8), white);
    hl.position.set(-0.018, 0.026, 0.026);
    e.add(hl);
    const hl2 = new THREE.Mesh(new THREE.SphereGeometry(0.009, 8, 6), white);
    hl2.position.set(0.02, -0.02, 0.027);
    e.add(hl2);
    onFace(e, 0.155 * s, 0.035, 0.0);
    openEyes.push(e);
  });
  const arc = (r, t) => new THREE.TorusGeometry(r, t, 8, 24, Math.PI);
  const closedEyes = [-1, 1].map((s) => {
    const m = new THREE.Mesh(arc(0.055, 0.012), eyeMat);
    const holder = new THREE.Group();
    m.rotation.z = Math.PI;
    holder.add(m);
    onFace(holder, 0.155 * s, 0.035, 0.002);
    return holder;
  });
  // mouth: a small "w" under the nose
  [-1, 1].forEach((s) => {
    const m = new THREE.Mesh(arc(0.022, 0.0065), eyeMat);
    m.rotation.z = Math.PI;
    m.position.set(0.022 * s, -0.115, 0.42);
    head.add(m);
  });
  const blushMat = new THREE.MeshBasicMaterial({ color: "#FF8F7A", transparent: true, opacity: 0.35, depthWrite: false });
  [-1, 1].forEach((s) => onFace(new THREE.Mesh(new THREE.CircleGeometry(0.055, 24), blushMat), 0.28 * s, -0.07, 0.03));

  const whiskerMat = new THREE.MeshStandardMaterial({ color: whisker, roughness: 0.6 });
  const wGeo = new THREE.CylinderGeometry(0.0045, 0.0025, 0.3, 6);
  wGeo.translate(0, 0.15, 0);
  [-1, 1].forEach((s) =>
    [0.08, -0.05].forEach((a) => {
      const w = new THREE.Mesh(wGeo, whiskerMat);
      w.position.set(0.11 * s, -0.11, 0.37);
      w.rotation.set(0, 0, -(Math.PI / 2 + a) * s);
      head.add(w);
    })
  );

  // headphones (stream chapter)
  const phones = new THREE.Group();
  const phoneMat = new THREE.MeshPhysicalMaterial({ color: "#4A3C6B", roughness: 0.35, clearcoat: 0.6 });
  const padMat = fur("#C9B6EC", "#FFFFFF");
  phones.add(new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.04, 12, 40, Math.PI), phoneMat));
  [-1, 1].forEach((s) => {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 28), phoneMat);
    cup.rotation.z = Math.PI / 2;
    cup.position.set(0.47 * s, 0, 0);
    phones.add(cup);
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 24), padMat);
    pad.rotation.z = Math.PI / 2;
    pad.position.set(0.42 * s, 0, 0);
    phones.add(pad);
  });
  phones.position.set(0, 0.02, -0.04);
  phones.scale.setScalar(0.0001);
  phones.visible = false;
  head.add(phones);

  // tail: a tube that gets thinner towards a darker tip
  const tailPts = TAIL_SLEEP.map((p) => p.clone());
  const curve = new THREE.CatmullRomCurve3(tailPts);
  const tail = add(group, new THREE.Mesh(new THREE.BufferGeometry(), bodyMat));
  const tip = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 14), accentMat));
  const tubeGeo = new THREE.TubeGeometry(curve, TAIL_SEG, 0.085, TAIL_RAD);
  tail.geometry = tubeGeo;
  const tailPos = tubeGeo.attributes.position;
  const frames = { p: new THREE.Vector3(), n: new THREE.Vector3(), b: new THREE.Vector3() };
  function rebuildTail() {
    const f = curve.computeFrenetFrames(TAIL_SEG, false);
    let k = 0;
    for (let i = 0; i <= TAIL_SEG; i++) {
      const u = i / TAIL_SEG;
      curve.getPointAt(u, frames.p);
      const r = 0.085 * (1 - u * 0.35);
      for (let j = 0; j <= TAIL_RAD; j++) {
        const a = (j / TAIL_RAD) * Math.PI * 2;
        const sin = Math.sin(a);
        const cos = -Math.cos(a);
        frames.n.copy(f.normals[i]).multiplyScalar(cos);
        frames.b.copy(f.binormals[i]).multiplyScalar(sin);
        tailPos.setXYZ(k++, frames.p.x + (frames.n.x + frames.b.x) * r, frames.p.y + (frames.n.y + frames.b.y) * r, frames.p.z + (frames.n.z + frames.b.z) * r);
      }
    }
    tailPos.needsUpdate = true;
    tubeGeo.computeVertexNormals();
    tubeGeo.computeBoundingSphere();
    tip.position.copy(tailPts[tailPts.length - 1]);
  }

  let blink = 0;
  let nextBlink = 2;

  /** awake 0..1, t seconds, beat 0..1, look {x,y}, still = no idle motion */
  function pose(awake, t, beat, look, still, phonesK = 0) {
    const a = THREE.MathUtils.smootherstep(awake, 0, 1);
    const breathe = still ? 0 : Math.sin(t * (a > 0.5 ? 2.2 : 1.3)) * 0.016;
    // asleep: a round loaf; awake: sitting up
    torso.scale.set(lerp(1.3, 1.0, a), lerp(0.62, 1.0, a) + breathe, lerp(1.25, 0.95, a));
    torso.position.set(0, 0, lerp(0, -0.04, a));
    haunches.forEach((h) => {
      const s = h.userData.side;
      h.position.set(lerp(0.34, 0.3, a) * s, lerp(0.15, 0.2, a), lerp(-0.12, -0.02, a));
      h.scale.set(0.95, lerp(0.7, 1, a), 1.3);
    });
    legs.forEach((g) => {
      const s = g.userData.side;
      g.position.set(lerp(0.17, 0.135, a) * s, 0, lerp(0.42, 0.32, a));
      g.rotation.x = lerp(1.25, 0, a);
      g.scale.setScalar(lerp(0.85, 1, a));
    });
    backPaws.forEach((p) => {
      const s = p.userData.side;
      p.position.set(lerp(0.4, 0.33, a) * s, 0.06, lerp(0.02, 0.18, a));
    });

    const bob = still ? 0 : beat * 0.05 * a;
    head.position.set(lerp(0.06, 0, a), lerp(0.44, 1.02, a) - bob, lerp(0.58, 0.16, a));
    head.rotation.set(
      lerp(0.35, -look.y * 0.25, a) + bob * 1.4,
      lerp(0.2, look.x * 0.45, a),
      lerp(0.3, (still ? 0 : Math.sin(t * 1.6) * 0.06) * a, a)
    );

    if (!still && a > 0.5) {
      nextBlink -= 1 / 60;
      if (nextBlink < 0) {
        blink = 1;
        nextBlink = 2.5 + Math.random() * 3;
      }
    }
    blink = Math.max(0, blink - 0.12);
    const open = a > 0.55 ? 1 - (blink > 0 ? Math.sin(blink * Math.PI) : 0) : 0;
    openEyes.forEach((e) => ((e.scale.y = Math.max(0.05, open)), (e.visible = open > 0.06)));
    closedEyes.forEach((e) => (e.visible = open <= 0.06));

    for (let i = 0; i < tailPts.length; i++) {
      tailPts[i].lerpVectors(TAIL_SLEEP[i], TAIL_AWAKE[i], a);
      if (!still) {
        const k = i / (tailPts.length - 1);
        tailPts[i].x += Math.sin(t * (1.2 + a * 1.6) - i * 0.7) * 0.12 * k * (0.25 + a);
      }
    }
    rebuildTail();

    phones.visible = phonesK > 0.01;
    phones.scale.setScalar(Math.max(0.0001, phonesK));
  }

  pose(0, 0, 0, { x: 0, y: 0 }, true);
  return { group, head, pose, hit: [torso, skull] };
}
