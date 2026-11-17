// A clay-style cat built from primitives. Neko (peach) and Luna (lilac)
// share this builder. Pose goes from curled up asleep (0) to sitting (1).
import * as THREE from "three";

const lerp = (a, b, t) => a + (b - a) * t;
const v = (x, y, z) => new THREE.Vector3(x, y, z);

const TAIL_SLEEP = [v(0, 0.18, -0.42), v(0.42, 0.12, -0.36), v(0.62, 0.09, 0.02), v(0.46, 0.08, 0.42), v(0.14, 0.08, 0.6)];
const TAIL_AWAKE = [v(0, 0.2, -0.42), v(0.14, 0.24, -0.74), v(0.26, 0.58, -0.86), v(0.3, 0.96, -0.72), v(0.2, 1.16, -0.52)];

export function createCat({ body = "#FFB37E", accent = "#F28A5B", inner = "#FF9E8A", eye = "#2B1D16", whisker = "#B5654A", bellyColor = "#FFD3AE" } = {}) {
  const mat = (color, rough = 0.78) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 });
  const bodyMat = mat(body);
  const accentMat = mat(accent);
  const eyeMat = mat(eye, 0.35);
  const white = new THREE.MeshBasicMaterial({ color: "#ffffff" });
  const group = new THREE.Group();

  const torso = new THREE.Mesh(new THREE.SphereGeometry(0.5, 48, 32), bodyMat);
  torso.castShadow = true;
  group.add(torso);

  // lighter belly, so the round body reads as a cat sitting up
  const bellyMat = mat(bellyColor);
  bellyMat.emissive.set(bellyColor);
  bellyMat.emissiveIntensity = 0.18;
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 24), bellyMat);
  belly.scale.set(0.62, 0.72, 0.5);
  belly.position.set(0, -0.06, 0.27);
  torso.add(belly);

  const pawGeo = new THREE.SphereGeometry(0.11, 24, 16);
  const paws = [-1, 1].map((s) => {
    const p = new THREE.Mesh(pawGeo, bodyMat);
    p.scale.set(1, 0.7, 1.25);
    p.castShadow = true;
    p.userData.side = s;
    group.add(p);
    return p;
  });

  // head ------------------------------------------------------------
  const head = new THREE.Group();
  group.add(head);
  const A = 0.46, B = 0.38, Cc = 0.4;
  const skull = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), bodyMat);
  skull.scale.set(A, B, Cc);
  skull.castShadow = true;
  head.add(skull);

  // put an object on the face surface, facing outwards
  const onFace = (obj, x, y, lift = 0.004) => {
    const z = Cc * Math.sqrt(Math.max(0, 1 - (x / A) ** 2 - (y / B) ** 2));
    const n = v(x / (A * A), y / (B * B), z / (Cc * Cc)).normalize();
    obj.position.set(x, y, z).addScaledVector(n, lift);
    obj.lookAt(obj.position.clone().add(n));
    head.add(obj);
    return obj;
  };

  const earGeo = new THREE.ConeGeometry(0.15, 0.32, 24);
  const innerGeo = new THREE.ConeGeometry(0.085, 0.19, 20);
  const innerMat = mat(inner);
  [-1, 1].forEach((s) => {
    const ear = new THREE.Mesh(earGeo, bodyMat);
    ear.position.set(0.25 * s, 0.33, -0.03);
    ear.rotation.set(-0.12, 0, -0.38 * s);
    ear.castShadow = true;
    head.add(ear);
    const inn = new THREE.Mesh(innerGeo, innerMat);
    inn.position.set(0, -0.04, 0.07);
    inn.scale.z = 0.5;
    ear.add(inn);
  });

  const openEyes = [];
  const eyeGeo = new THREE.SphereGeometry(0.056, 24, 16);
  const shine = new THREE.SphereGeometry(0.018, 12, 8);
  [-1, 1].forEach((s) => {
    const e = new THREE.Group();
    const ball = new THREE.Mesh(eyeGeo, eyeMat);
    ball.scale.set(1, 1.15, 0.45);
    e.add(ball);
    const hl = new THREE.Mesh(shine, white);
    hl.position.set(-0.016, 0.022, 0.022);
    e.add(hl);
    onFace(e, 0.15 * s, 0.03, 0.0);
    openEyes.push(e);
  });

  const arc = (r, t) => new THREE.TorusGeometry(r, t, 8, 24, Math.PI);
  const closedEyes = [-1, 1].map((s) => {
    const m = new THREE.Mesh(arc(0.055, 0.013), eyeMat);
    const holder = new THREE.Group();
    m.rotation.z = Math.PI;
    holder.add(m);
    onFace(holder, 0.15 * s, 0.035, 0.002);
    return holder;
  });

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.034, 16, 12), eyeMat);
  nose.scale.set(1.35, 0.8, 0.6);
  onFace(nose, 0, -0.06, 0.004);
  [-1, 1].forEach((s) => {
    const m = new THREE.Mesh(arc(0.028, 0.008), eyeMat);
    const holder = new THREE.Group();
    m.rotation.z = Math.PI;
    holder.add(m);
    onFace(holder, 0.028 * s, -0.105, 0.002);
  });
  const blushMat = new THREE.MeshBasicMaterial({ color: "#FF8F7A", transparent: true, opacity: 0.4, depthWrite: false });
  [-1, 1].forEach((s) => onFace(new THREE.Mesh(new THREE.CircleGeometry(0.06, 24), blushMat), 0.27 * s, -0.08, 0.006));

  const whiskerMat = mat(whisker, 0.6);
  const wGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.26, 6);
  [-1, 1].forEach((s) =>
    [-0.045, -0.105].forEach((y, k) => {
      const w = new THREE.Mesh(wGeo, whiskerMat);
      w.position.set(0.43 * s, y, 0.17);
      w.rotation.set(0, 0, Math.PI / 2 + (k ? -0.12 : 0.1) * s);
      head.add(w);
    })
  );

  // headphones (hidden until the stream chapter)
  const phones = new THREE.Group();
  const phoneMat = mat("#4A3C6B", 0.5);
  const padMat = mat("#C9B6EC", 0.8);
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.04, 12, 40, Math.PI), phoneMat);
  phones.add(band);
  [-1, 1].forEach((s) => {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.09, 28), phoneMat);
    cup.rotation.z = Math.PI / 2;
    cup.position.set(0.47 * s, 0, 0);
    phones.add(cup);
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 24), padMat);
    pad.rotation.z = Math.PI / 2;
    pad.position.set(0.43 * s, 0, 0);
    phones.add(pad);
  });
  phones.position.set(0, 0.02, -0.06);
  phones.scale.setScalar(0.0001);
  phones.visible = false;
  head.add(phones);

  // tail --------------------------------------------------------------
  const tailPts = TAIL_SLEEP.map((p) => p.clone());
  const curve = new THREE.CatmullRomCurve3(tailPts);
  let tail = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, 0.075, 10), bodyMat);
  tail.castShadow = true;
  group.add(tail);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 14), accentMat);
  tip.castShadow = true;
  group.add(tip);

  let blink = 0;
  let nextBlink = 2;

  /**
   * awake 0..1, t seconds, beat 0..1 pulse, look {x,y} -1..1,
   * swish extra tail energy, still = no idle motion
   */
  function pose(awake, t, beat, look, still, phonesK = 0) {
    const a = THREE.MathUtils.smootherstep(awake, 0, 1);
    const breathe = still ? 0 : Math.sin(t * (a > 0.5 ? 2.2 : 1.3)) * 0.018;
    torso.scale.set(lerp(1.22, 0.96, a), lerp(0.6, 1.04, a) + breathe, lerp(1.16, 0.94, a));
    torso.position.set(0, lerp(0.3, 0.5, a), 0);
    paws.forEach((p) => {
      const s = p.userData.side;
      p.position.set(lerp(0.2, 0.16, a) * s, 0.07, lerp(0.58, 0.31, a));
    });

    const bob = still ? 0 : beat * 0.05 * a;
    head.position.set(lerp(0.06, 0, a), lerp(0.46, 1.06, a) - bob, lerp(0.56, 0.16, a));
    head.rotation.set(
      lerp(0.32, -look.y * 0.25, a) + bob * 1.4,
      lerp(0.18, look.x * 0.45, a),
      lerp(0.28, (still ? 0 : Math.sin(t * 1.6) * 0.06) * a, a)
    );

    // eyes: closed while asleep, blinking when awake
    if (!still && a > 0.5) {
      nextBlink -= 1 / 60;
      if (nextBlink < 0) {
        blink = 1;
        nextBlink = 2.5 + Math.random() * 3;
      }
    }
    blink = Math.max(0, blink - 0.12);
    const open = a > 0.55 ? 1 - (blink > 0 ? Math.sin(blink * Math.PI) : 0) : 0;
    openEyes.forEach((e) => (e.scale.y = Math.max(0.05, open), (e.visible = open > 0.06)));
    closedEyes.forEach((e) => (e.visible = open <= 0.06));

    // tail
    for (let i = 0; i < tailPts.length; i++) {
      tailPts[i].lerpVectors(TAIL_SLEEP[i], TAIL_AWAKE[i], a);
      if (!still) {
        const k = i / (tailPts.length - 1);
        tailPts[i].x += Math.sin(t * (1.2 + a * 1.6) - i * 0.7) * 0.12 * k * (0.25 + a);
      }
    }
    tail.geometry.dispose();
    tail.geometry = new THREE.TubeGeometry(curve, 36, 0.075, 10);
    tip.position.copy(tailPts[tailPts.length - 1]);

    phones.visible = phonesK > 0.01;
    phones.scale.setScalar(Math.max(0.0001, phonesK));
  }

  pose(0, 0, 0, { x: 0, y: 0 }, true);
  return { group, head, pose, hit: [torso, skull] };
}
