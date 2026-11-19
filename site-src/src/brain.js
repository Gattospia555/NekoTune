// A little "brain" for each cat: where to go, what to do, how to move.
// It returns a pose every frame; the scene applies it to the 3D cat.
import * as THREE from "three";

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const smooth = (x) => x * x * (3 - 2 * x);
const clamp01 = (x) => Math.min(1, Math.max(0, x));

// the free floor of the room (furniture kept out)
export const CUSHION = { x: -0.2, z: 0.55, r: 1.25, y: 0.5 };
const FLOOR_Y = 0.12;
const BOUNDS = { x0: -3.2, x1: 4.4, z0: -2.5, z1: 4.4 };
const BLOCKS = [
  { x: -3, z: 2.6, r: 0.95 }, // crate
  { x: -4.1, z: 4.0, r: 0.8 }, // plant
  { x: 4.3, z: -1.35, r: 0.6 }, // small plant
  { x: 2.4, z: -3.0, r: 0.75 }, // chair
];

export const SPOTS = {
  neko: { x: -0.2, z: 0.55 },
  window: { x: 1.9, z: -2.2, face: { x: 2.55, z: -5 } },
  deck: { x: -1.6, z: -2.25, face: { x: -1.6, z: -5 } },
  tv: { x: -2.5, z: -1.0, face: { x: -5, z: -0.9 } },
  speakersR: { x: 0.6, z: -1.9 },
  rugFront: { x: 1.2, z: 3.4 },
  rugLeft: { x: -1.7, z: 3.4 },
  side: { x: 3.5, z: 0.6 },
  home: { x: 2.35, z: 2.0 },
  byNeko: { x: 1.45, z: 1.45 },
  crate: { x: -1.9, z: 2.6, face: { x: -3, z: 2.6 } },
};

/** Push a point out of the cushion (when not allowed on it) and blocks, keep it inside the room. */
function legal(p, allowCushion) {
  p.x = THREE.MathUtils.clamp(p.x, BOUNDS.x0, BOUNDS.x1);
  p.z = THREE.MathUtils.clamp(p.z, BOUNDS.z0, BOUNDS.z1);
  const obs = allowCushion ? BLOCKS : [...BLOCKS, { x: CUSHION.x, z: CUSHION.z, r: 1.75 }];
  for (const b of obs) {
    const dx = p.x - b.x;
    const dz = p.z - b.z;
    const d = Math.hypot(dx, dz);
    if (d < b.r) {
      const k = b.r / Math.max(d, 1e-4);
      p.x = b.x + dx * k;
      p.z = b.z + dz * k;
    }
  }
  return p;
}

/** Route from a to b going round the cushion if the straight line crosses it. */
function route(a, b, avoidCushion) {
  const pts = [];
  if (avoidCushion) {
    const cx = CUSHION.x;
    const cz = CUSHION.z;
    const abx = b.x - a.x;
    const abz = b.z - a.z;
    const len2 = abx * abx + abz * abz || 1;
    const t = clamp01(((cx - a.x) * abx + (cz - a.z) * abz) / len2);
    const qx = a.x + abx * t;
    const qz = a.z + abz * t;
    const d = Math.hypot(qx - cx, qz - cz);
    if (d < 1.9 && t > 0.05 && t < 0.95) {
      let nx = qx - cx;
      let nz = qz - cz;
      if (d < 1e-3) [nx, nz] = [-abz, abx];
      const n = Math.hypot(nx, nz);
      pts.push({ x: cx + (nx / n) * 2.3, z: cz + (nz / n) * 2.3 });
    }
  }
  pts.push({ x: b.x, z: b.z });
  return pts;
}

export class CatBrain {
  /**
   * name: "neko" | "luna"; cat: createCat3D() result; home: spot; opts.sleeper: Neko sleeps by default
   */
  constructor(name, cat, opts) {
    this.name = name;
    this.cat = cat;
    this.o = opts;
    this.pos = { x: opts.home.x, z: opts.home.z };
    this.y = opts.sleeper ? CUSHION.y : FLOOR_Y;
    this.yaw = 0;
    this.state = opts.sleeper ? "sleep" : "sit";
    this.timer = rand(2, 5);
    this.path = [];
    this.act = null;
    this.actT = 0;
    this.walkPhase = 0;
    this.awakeUntil = 0;
    this.nextStroll = rand(25, 45);
    this.face = null;
    this.dance = null;
    this.danceT = 0;
    this.speed = opts.speed ?? 1.1;
  }

  // ------------------------------------------------------------------ commands from the scene
  goTo(spot, then = null) {
    const target = legal({ x: spot.x, z: spot.z }, this.name === "neko");
    const avoid = this.name === "luna" || (!this.onCushion(this.pos) && !this.onCushion(target));
    this.path = route(this.pos, target, avoid);
    this.state = "walk";
    this.face = spot.face || null;
    this.then = then;
  }
  doAct(name, dur) {
    this.act = name;
    this.actT = 0;
    this.actDur = dur ?? ACT_DUR[name] ?? 1.2;
    this.path = [];
    this.state = "act";
  }
  wake(sec = 4) {
    this.awakeUntil = Math.max(this.awakeUntil, this.t + sec);
    if (this.state === "sleep") {
      this.state = "sit";
      this.timer = sec;
    }
  }
  onCushion(p) {
    return Math.hypot(p.x - CUSHION.x, p.z - CUSHION.z) < CUSHION.r + 0.1;
  }

  // ------------------------------------------------------------------ think + move
  update(dt, ctx) {
    this.t = ctx.t;
    const pose = {
      eyes: "open",
      mouth: "",
      rot: 0,
      nod: 0,
      turn: 0,
      look: 0,
      paws: [null, null],
      energy: 1,
      dy: 0,
      lean: 0,
      roll: 0,
      yawAdd: 0,
      hop: 0,
      sx: 1,
      sy: 1,
      awake: true,
    };
    const music = ctx.music > 0.5;
    const isNeko = this.name === "neko";

    // Neko sleeps on his cushion unless the music plays, someone woke him, or he goes for a stroll
    if (isNeko && this.state === "sleep") {
      pose.awake = false;
      if (music) this.wakeUp("dance");
      else if (ctx.t > this.nextStroll && !ctx.still) this.wakeUp("stroll");
    }
    if (!isNeko && ctx.lunaSleep && !music) {
      if (this.state !== "sleep" && this.state !== "walk") {
        this.state = "sleep";
      }
    } else if (!isNeko && this.state === "sleep") this.state = "sit";
    if (this.state === "sleep") pose.awake = false;

    // decide what to do next when the current thing ends
    this.timer -= dt;
    if ((this.state === "sit" || this.state === "dance") && this.timer <= 0 && !ctx.still) this.decide(ctx);
    if (music && this.state === "sit") {
      this.state = "dance";
      this.timer = rand(3, 6);
      this.dance = pick(DANCES);
    }
    if (!music && this.state === "dance") {
      this.state = "sit";
      this.timer = rand(1, 3);
    }

    // walking
    if (this.state === "walk") {
      const target = this.path[0];
      if (!target) {
        this.state = "sit";
        this.timer = rand(2.5, 5);
        if (this.then) {
          const f = this.then;
          this.then = null;
          f();
        }
      } else {
        const dx = target.x - this.pos.x;
        const dz = target.z - this.pos.z;
        const d = Math.hypot(dx, dz);
        const step = Math.min(d, this.speed * dt);
        if (d < 0.05) this.path.shift();
        else {
          this.pos.x += (dx / d) * step;
          this.pos.z += (dz / d) * step;
          this.turnTo(this.view(Math.atan2(dx, dz), ctx, 0.9), dt, 7);
        }
        this.walkPhase += dt * this.speed * 7.5;
        const s = Math.sin(this.walkPhase);
        pose.dy = Math.abs(s) * 0.07;
        pose.roll = s * 0.06;
        pose.paws = [
          { w: 0.35, dir: [0, -1, 0.9 * Math.max(0, s)], lift: 0.2 },
          { w: 0.35, dir: [0, -1, 0.9 * Math.max(0, -s)], lift: 0.2 },
        ];
        pose.energy = 1.5;
        pose.nod = 0.06;
      }
    } else {
      // when not walking, face the camera (a little to the side) or the thing we came to see
      const toCam = Math.atan2(ctx.camera.position.x - this.pos.x, ctx.camera.position.z - this.pos.z);
      let want = toCam + (this.o.sideOffset ?? 0);
      if (this.face && this.state !== "dance") want = this.view(Math.atan2(this.face.x - this.pos.x, this.face.z - this.pos.z), ctx, 0.9);
      if (ctx.lookAt && this.state !== "sleep") {
        // turn the head towards something interesting (rolling yarn, the pointer)
        const ang = Math.atan2(ctx.lookAt.x - this.pos.x, ctx.lookAt.z - this.pos.z) - this.yaw;
        const w = Math.atan2(Math.sin(ang), Math.cos(ang));
        pose.turn = THREE.MathUtils.clamp(w * 0.6, -0.7, 0.7);
        pose.look = THREE.MathUtils.clamp(w * 1.3, -1, 1);
      }
      this.turnTo(want, dt, 3);
    }

    // one-off actions
    if (this.state === "act") {
      this.actT += dt;
      const k = clamp01(this.actT / this.actDur);
      ACTS[this.act]?.(pose, k, this.actT, ctx, this);
      if (k >= 1) {
        this.act = null;
        this.state = "sit";
        this.timer = rand(2, 4.5);
      }
    }
    // dancing
    if (this.state === "dance") {
      this.danceT += dt;
      DANCE_MOVES[this.dance]?.(pose, ctx, this);
      pose.energy = 1.6;
    }
    // gentle life while sitting
    if (this.state === "sit") {
      pose.rot = Math.sin(ctx.t * 0.9 + (isNeko ? 0 : 2)) * 0.05;
      pose.nod = Math.sin(ctx.t * 0.6) * 0.04;
    }
    // Neko goes back to sleep on his cushion when nothing else is going on
    if (isNeko && this.state === "sit" && !music && ctx.t > this.awakeUntil && !this.strolling) {
      if (this.onCushion(this.pos)) {
        this.state = "sleep";
        this.face = null;
        this.nextStroll = ctx.t + rand(35, 70);
      } else this.goTo(SPOTS.neko);
    }

    // height: Neko's cushion is higher than the floor
    const wantY = this.onCushion(this.pos) ? CUSHION.y : FLOOR_Y;
    this.y += (wantY - this.y) * (1 - Math.exp(-dt * 8));
    const edge = Math.abs(wantY - this.y) > 0.03 ? Math.sin(Math.PI * clamp01(Math.abs(wantY - this.y) / 0.38)) * 0.25 : 0;

    // the face is a drawing on a puffy shape: body + head together never turn too far from the camera
    if (!pose.yawAdd) {
      const toCam = Math.atan2(ctx.camera.position.x - this.pos.x, ctx.camera.position.z - this.pos.z);
      const rel = Math.atan2(Math.sin(this.yaw - toCam), Math.cos(this.yaw - toCam));
      pose.turn = THREE.MathUtils.clamp(pose.turn, -0.95 - rel, 0.95 - rel);
    }
    pose.x = this.pos.x + (pose.dx || 0) * Math.cos(this.yaw);
    pose.z = this.pos.z - (pose.dx || 0) * Math.sin(this.yaw);
    pose.y = this.y + pose.dy + pose.hop + edge;
    pose.yaw = this.yaw + pose.yawAdd;
    return pose;
  }

  /** The cats are puffy drawings: keep the face towards the camera, turned at most `max` radians. */
  view(a, ctx, max) {
    const toCam = Math.atan2(ctx.camera.position.x - this.pos.x, ctx.camera.position.z - this.pos.z);
    const rel = Math.atan2(Math.sin(a - toCam), Math.cos(a - toCam));
    return toCam + THREE.MathUtils.clamp(rel, -max, max);
  }

  turnTo(a, dt, rate) {
    const d = Math.atan2(Math.sin(a - this.yaw), Math.cos(a - this.yaw));
    this.yaw += d * (1 - Math.exp(-dt * rate));
  }

  wakeUp(reason) {
    this.state = "sit";
    this.timer = 0.8;
    this.reason = reason;
    if (reason === "stroll") {
      this.strolling = true;
      this.awakeUntil = this.t + 30;
    }
  }

  decide(ctx) {
    const isNeko = this.name === "neko";
    const music = ctx.music > 0.5;
    if (music) {
      // change dance move, now and then hop over to the speakers (Luna)
      if (!isNeko && Math.random() < 0.25 && Math.hypot(this.pos.x - SPOTS.speakersR.x, this.pos.z - SPOTS.speakersR.z) > 0.6) {
        this.goTo(SPOTS.speakersR);
        return;
      }
      if (Math.random() < 0.3) this.doAct(pick(["spin", "hop"]));
      else {
        this.state = "dance";
        this.dance = pick(DANCES.filter((d) => d !== this.dance));
        this.danceT = 0;
        this.timer = rand(3.5, 7);
      }
      return;
    }
    if (isNeko) {
      if (this.reason === "stroll" && this.strolling) {
        // a little routine: stretch, go somewhere, look, come back
        if (!this.strollStep) this.strollStep = 0;
        const step = this.strollStep++;
        if (step === 0) return this.doAct("stretch");
        if (step === 1) {
          const dest = pick([SPOTS.window, SPOTS.deck, ctx.lunaSpot || SPOTS.side, SPOTS.tv, SPOTS.rugFront]);
          return this.goTo(dest);
        }
        if (step === 2) return this.doAct(pick(["lookaround", "groom", "tilt", "mew"]));
        if (step === 3) return this.doAct(pick(["tailchase", "stretch", "lookaround", "hop"]));
        this.strolling = false;
        this.strollStep = 0;
        this.reason = null;
        this.awakeUntil = 0;
        this.goTo(SPOTS.neko);
        return;
      }
      // awake on the cushion (petted): small things, then sleep
      this.doAct(pick(["lookaround", "groom", "tilt", "stretch"]));
      return;
    }
    // Luna: wander, play, visit Neko
    const r = Math.random();
    if (ctx.yarn && r < 0.18) {
      const y = ctx.yarn.position;
      return this.goTo({ x: y.x - 0.55 * Math.sign(y.x - this.pos.x || 1), z: y.z }, () => this.doAct("pounce"));
    }
    if (r < 0.5) {
      const spots = [SPOTS.home, SPOTS.window, SPOTS.deck, SPOTS.tv, SPOTS.rugFront, SPOTS.rugLeft, SPOTS.side, SPOTS.byNeko, SPOTS.crate];
      const far = spots.filter((s) => Math.hypot(s.x - this.pos.x, s.z - this.pos.z) > 1);
      return this.goTo(pick(far));
    }
    this.face = null;
    this.doAct(pick(["groom", "lookaround", "tilt", "stretch", "tailchase", "hop", "wave", "loaf"]));
  }
}

// ------------------------------------------------------------------ actions
const ACT_DUR = { hop: 0.9, spin: 0.9, wave: 1.6, mew: 0.9, groom: 2.6, stretch: 2.2, tilt: 1.8, lookaround: 2.6, tailchase: 2.0, pounce: 1.6, loaf: 3.5 };
const ACTS = {
  hop(p, k) {
    p.hop = Math.abs(Math.sin(k * Math.PI * 2)) * 0.45 * (1 - k * 0.3);
    const land = Math.abs(Math.cos(k * Math.PI * 2));
    p.sy = 1 - land * 0.06 * (1 - k);
    p.sx = 1 + land * 0.04 * (1 - k);
    p.eyes = "happy";
  },
  spin(p, k) {
    p.yawAdd = smooth(k) * TAU;
    p.hop = Math.sin(k * Math.PI) * 0.25;
    p.eyes = "happy";
  },
  wave(p, k, t) {
    const w = Math.sin(k * Math.PI);
    p.paws[1] = { w, dir: [0.75 + Math.sin(t * 13) * 0.22, 0.95, 0.4] };
    p.rot = -0.1 * w;
  },
  mew(p, k, t, ctx, b) {
    if (t < 0.02) ctx.say?.(b.name);
    p.mouth = k < 0.65 ? "mew" : "";
    p.rot = 0.15;
    p.eyes = k < 0.65 ? "happy" : "open";
  },
  groom(p, k, t) {
    // lick the paw: paw up to the mouth, head down, eyes closed
    const w = Math.sin(Math.min(1, k * 1.2) * Math.PI);
    p.paws[0] = { w: w * (0.9 + 0.1 * Math.sin(t * 12)), dir: [0.45, 0.85, 0.8], lift: 0.5 };
    p.nod = 0.28 * w + Math.sin(t * 12) * 0.03 * w;
    p.rot = -0.18 * w;
    p.eyes = w > 0.3 ? "happy" : "open";
  },
  stretch(p, k) {
    // front down, back up, then a long stretch upwards with a yawn
    const a = Math.sin(Math.min(1, k * 2) * Math.PI);
    const b = Math.sin(Math.max(0, k * 2 - 1) * Math.PI);
    p.lean = 0.35 * a;
    p.sy = 1 - 0.1 * a + 0.12 * b;
    p.sx = 1 + 0.06 * a - 0.04 * b;
    p.paws = [
      { w: a, dir: [0, -0.5, 1], lift: 0.6 },
      { w: a, dir: [0, -0.5, 1], lift: 0.6 },
    ];
    if (b > 0.2) {
      p.eyes = "yawn";
      p.mouth = "";
      p.nod = -0.2 * b;
    } else p.eyes = a > 0.5 ? "heavy" : "open";
  },
  tilt(p, k, t, ctx, b) {
    if (t < 0.02) ctx.question?.(b);
    const w = Math.sin(Math.min(1, k * 1.3) * Math.PI);
    p.rot = 0.42 * w;
    p.look = 0.6 * w;
  },
  lookaround(p, k) {
    p.turn = Math.sin(k * TAU) * 0.8;
    p.look = Math.sin(k * TAU) * 1;
    p.nod = -0.05;
  },
  tailchase(p, k) {
    p.yawAdd = smooth(k) * TAU * 2;
    p.turn = 0.6 * Math.sin(k * Math.PI);
    p.look = 1;
    p.energy = 2.4;
    p.hop = Math.abs(Math.sin(k * Math.PI * 6)) * 0.08;
  },
  pounce(p, k, t, ctx, b) {
    // crouch and wiggle, then jump at the yarn and bat it
    if (k < 0.5) {
      p.lean = 0.3;
      p.sy = 0.88;
      p.roll = Math.sin(t * 22) * 0.07;
      p.look = 0;
    } else {
      const j = (k - 0.5) / 0.5;
      p.hop = Math.sin(Math.min(1, j * 1.6) * Math.PI) * 0.5;
      p.paws[1] = { w: Math.sin(Math.min(1, j * 1.6) * Math.PI), dir: [0.1, 0.1, 1], lift: 1 };
      p.eyes = "happy";
      if (!b.batted && j > 0.35) {
        b.batted = true;
        ctx.batYarn?.(b);
      }
    }
    if (k >= 0.99) b.batted = false;
  },
  loaf(p, k) {
    // sits down low, eyes half closed, content
    const w = Math.sin(Math.min(1, k * 1.4) * Math.PI * 0.5) * (1 - Math.max(0, k - 0.85) / 0.15);
    p.sy = 1 - 0.08 * w;
    p.sx = 1 + 0.05 * w;
    p.eyes = w > 0.5 ? "heavy" : "open";
    p.nod = 0.1 * w;
  },
};

// ------------------------------------------------------------------ dance moves (on the music's groove)
const DANCES = ["bob", "sway", "steps", "paws", "jump"];
const DANCE_MOVES = {
  bob(p, ctx) {
    p.nod = (ctx.groove - 0.5) * 0.32;
    p.rot = Math.sin(ctx.phase * Math.PI) * 0.08;
    p.eyes = "happy";
  },
  sway(p, ctx) {
    p.roll = Math.sin(ctx.phase * Math.PI) * 0.16;
    p.rot = -Math.sin(ctx.phase * Math.PI) * 0.12;
    p.nod = (ctx.groove - 0.5) * 0.16;
  },
  steps(p, ctx, b) {
    // little steps side to side, one per beat
    const s = Math.sin(ctx.phase * Math.PI);
    p.dx = s * 0.18;
    p.hop = ctx.groove * 0.06;
    p.roll = s * 0.08;
    p.paws = [
      { w: 0.4 * Math.max(0, s), dir: [-0.3, -0.6, 1], lift: 0.4 },
      { w: 0.4 * Math.max(0, -s), dir: [0.3, -0.6, 1], lift: 0.4 },
    ];
  },
  paws(p, ctx) {
    // paws up, one per beat, like a little dance in the air
    const s = Math.sin(ctx.phase * Math.PI);
    p.paws = [
      { w: Math.max(0, s), dir: [-0.6, 1, 0.4] },
      { w: Math.max(0, -s), dir: [0.6, 1, 0.4] },
    ];
    p.rot = s * 0.12;
    p.eyes = "happy";
  },
  jump(p, ctx) {
    // a hop every other beat
    const ph = (ctx.phase % 2) / 2;
    p.hop = Math.max(0, Math.sin(ph * TAU)) * 0.3;
    p.nod = (ctx.groove - 0.5) * 0.2;
    p.eyes = "happy";
  },
};
