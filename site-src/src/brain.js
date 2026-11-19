// A little "brain" for each cat: where to go, what to do, how to move.
// It returns a pose every frame; the scene applies it to the 3D cat.
//
// To feel like a cat rather than a robot:
// - every pose channel goes through a spring (a bit of overshoot, never a jump);
// - walking has a speed: cats speed up, slow down before stopping, curve instead of
//   turning on the spot, the head looks where they're going before the body follows;
// - every gesture has its preparation (a crouch before a jump) and its landing;
// - when nothing happens they are never still in the same way: glances that stop on
//   something, ear twitches, tail flicks, slow blinks, small weight shifts.
import * as THREE from "three";

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const smooth = (x) => x * x * (3 - 2 * x);
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
/** 0→1 eased between a and b */
const seg = (k, a, b) => smooth(clamp01((k - a) / (b - a)));
/** 0→1→0 between a and b */
const bell = (k, a, b) => Math.sin(Math.PI * clamp01((k - a) / (b - a)));

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
  p.x = clamp(p.x, BOUNDS.x0, BOUNDS.x1);
  p.z = clamp(p.z, BOUNDS.z0, BOUNDS.z1);
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

// ------------------------------------------------------------------ springs
/** A damped spring: follows its target with a little overshoot, like a body with weight. */
class Spring {
  constructor(v, freq, damp) {
    this.v = v;
    this.vel = 0;
    this.w = TAU * freq;
    this.z = damp;
  }
  step(target, dt) {
    const n = Math.max(1, Math.ceil(dt / 0.012));
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      this.vel += (this.w * this.w * (target - this.v) - 2 * this.z * this.w * this.vel) * h;
      this.v += this.vel * h;
    }
    return this.v;
  }
}
// channel: [rest value, frequency (Hz), damping]
const CHANNELS = {
  lean: [0, 2.6, 0.62],
  roll: [0, 2.8, 0.55],
  rot: [0, 3.2, 0.6],
  nod: [0, 3.6, 0.65],
  turn: [0, 4.2, 0.82],
  look: [0, 5, 0.9],
  sx: [1, 4.5, 0.4],
  sy: [1, 4.5, 0.4],
};

// how they move: speed (room units/s), steps per metre, bounce
const GAITS = {
  walk: { v: 1.25, cad: 7.5, bob: 0.06 },
  trot: { v: 2.0, cad: 6.2, bob: 0.1 },
  bound: { v: 3.1, stride: 1.35 },
};

export class CatBrain {
  /**
   * name: "neko" | "luna"; cat: createCat3D() result; home: spot; opts.sleeper: Neko sleeps by default
   */
  constructor(name, cat, opts) {
    this.name = name;
    this.cat = cat;
    this.o = opts;
    this.pace = opts.pace ?? 1;
    this.pos = { x: opts.home.x, z: opts.home.z };
    this.y = opts.sleeper ? CUSHION.y : FLOOR_Y;
    this.yaw = 0;
    this.heading = 0;
    this.v = 0;
    this.accel = 0;
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
    this.t = 0;
    this.sp = {};
    for (const [k, [v, f, z]] of Object.entries(CHANNELS)) this.sp[k] = new Spring(v, f, z);
    // idle life
    this.gl = { turn: 0, look: 0, nod: 0, until: 0 };
    this.shift = 0;
    this.ear = { next: rand(1, 4), t0: -9, side: 0 };
    this.flick = 0;
    this.nextFlick = rand(2, 6);
    this.blinkUntil = 0;
  }

  // ------------------------------------------------------------------ commands from the scene
  goTo(spot, then = null, gait = "walk") {
    const target = legal({ x: spot.x, z: spot.z }, this.name === "neko");
    const avoid = this.name === "luna" || (!this.onCushion(this.pos) && !this.onCushion(target));
    this.path = route(this.pos, target, avoid);
    // on a long trip a cat often stops halfway to look at something
    const dist = Math.hypot(target.x - this.pos.x, target.z - this.pos.z);
    if (gait !== "bound" && dist > 3.2 && this.path.length === 1 && Math.random() < 0.4) {
      const f = rand(0.4, 0.6);
      this.path.unshift(legal({ x: this.pos.x + (target.x - this.pos.x) * f + rand(-0.4, 0.4), z: this.pos.z + (target.z - this.pos.z) * f + rand(-0.4, 0.4), pause: true }, this.name === "neko"));
    }
    this.gait = gait;
    // from standstill: a short "get ready" (the head turns first, a little crouch)
    this.prepT = this.v < 0.2 ? (gait === "bound" ? 0.35 : 0.22) : 0;
    this.pauseT = 0;
    this.state = "walk";
    this.face = spot.face || null;
    this.then = then;
  }
  doAct(name, dur, then = null) {
    this.act = name;
    this.actT = 0;
    this.actDur = dur ?? ACT_DUR[name] ?? 1.2;
    this.actThen = then;
    this.path = [];
    this.v = 0;
    this.state = "act";
    this.leapPrev = 0;
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
  /** Something happened (a click, a noise): quick ear flick and tail flick. */
  startle() {
    this.ear.t0 = this.t;
    this.ear.side = 2;
    this.flick = 1;
  }

  // ------------------------------------------------------------------ think + move
  update(dt, ctx) {
    this.t = ctx.t;
    // T: spring targets; R: fast offsets added after the springs; p: everything else
    const T = { lean: 0, roll: 0, rot: 0, nod: 0, turn: 0, look: 0, sx: 1, sy: 1 };
    const R = { lean: 0, roll: 0, rot: 0, nod: 0, sy: 1, sx: 1 };
    const p = { eyes: "open", mouth: "", paws: [null, null], hind: [0, 0], hindDrop: 0, energy: 0.6, hop: 0, dy: 0, dx: 0, yawAdd: 0, ears: [0, 0], awake: true };
    const music = ctx.music > 0.5;
    const isNeko = this.name === "neko";

    // Neko sleeps on his cushion unless the music plays, someone woke him, or he goes for a stroll
    if (isNeko && this.state === "sleep") {
      if (music) this.wakeUp("dance");
      else if (ctx.t > this.nextStroll && !ctx.still) this.wakeUp("stroll");
    }
    if (!isNeko && ctx.lunaSleep && !music) {
      if (this.state === "sit") this.doAct("loaf", 2.2, () => (this.state = "sleep"));
    } else if (!isNeko && this.state === "sleep") this.wakeUp("luna");
    if (this.state === "sleep") p.awake = false;

    // decide what to do next when the current thing ends
    this.timer -= dt;
    if ((this.state === "sit" || this.state === "dance") && this.timer <= 0 && !ctx.still) this.decide(ctx);
    if (music && this.state === "sit") {
      this.state = "dance";
      this.timer = rand(3, 6);
      this.dance = pick(DANCES);
      this.danceT = 0;
    }
    if (!music && this.state === "dance") {
      this.state = "sit";
      this.timer = rand(1, 3);
    }

    if (this.state === "walk") this.walk(dt, ctx, T, R, p);
    else {
      this.v = 0;
      // not walking: the body keeps its direction (or faces what we came to see);
      // dancing and sleeping on the cushion it faces you
      const toCam = Math.atan2(ctx.camera.position.x - this.pos.x, ctx.camera.position.z - this.pos.z) + (this.o.sideOffset ?? 0);
      if (this.bodyGoal == null) this.bodyGoal = toCam;
      let want = this.bodyGoal;
      if (this.state === "dance" || this.state === "sleep" || this.act === "knead") want = toCam;
      else if (this.face) want = Math.atan2(this.face.x - this.pos.x, this.face.z - this.pos.z);
      this.turnTo(want, dt, 3);
    }

    // one-off actions
    if (this.state === "act") {
      this.actT += dt;
      const k = clamp01(this.actT / this.actDur);
      ACTS[this.act]?.(T, p, R, k, this.actT, ctx, this);
      if (k >= 1) {
        this.act = null;
        this.state = "sit";
        this.timer = rand(1.5, 4);
        this.sp.sy.vel -= 0.5; // settles back down
        const f = this.actThen;
        this.actThen = null;
        if (f) f();
      }
    }
    // dancing
    if (this.state === "dance") {
      this.danceT += dt;
      DANCE_MOVES[this.dance]?.(T, p, R, ctx, this);
      p.energy = 1.8;
    }
    // a living cat sitting still
    if (this.state === "sit") this.idle(dt, ctx, T, p);
    // ears and tail have their own small life in every awake state
    if (this.state !== "sleep") this.twitches(dt, ctx, p);
    // something interesting rolling around (yarn) or the pointer: the head follows it
    if (ctx.lookAt && (this.state === "sit" || this.state === "dance")) {
      const w = wrap(Math.atan2(ctx.lookAt.x - this.pos.x, ctx.lookAt.z - this.pos.z) - this.yaw);
      T.turn = clamp(w * 0.6, -0.7, 0.7);
      T.look = clamp(w * 1.3, -1, 1);
    }

    // Neko goes back to his cushion and sleeps when nothing else is going on:
    // first he kneads it with his paws, like cats do
    if (isNeko && this.state === "sit" && !music && ctx.t > this.awakeUntil && !this.strolling) {
      if (this.onCushion(this.pos)) {
        this.face = null;
        this.doAct("knead", rand(2.4, 3.4), () => {
          this.state = "sleep";
          this.nextStroll = ctx.t + rand(35, 70);
        });
      } else this.goTo(SPOTS.neko);
    }

    // height: Neko's cushion is higher than the floor (a little hop to get on it)
    const wantY = this.onCushion(this.pos) ? CUSHION.y : FLOOR_Y;
    this.y += (wantY - this.y) * (1 - Math.exp(-dt * 7));
    const edge = Math.abs(wantY - this.y) > 0.03 ? Math.sin(Math.PI * clamp01(Math.abs(wantY - this.y) / 0.38)) * 0.3 : 0;

    // springs
    const pose = p;
    for (const k of Object.keys(CHANNELS)) pose[k] = this.sp[k].step(T[k], dt);
    pose.lean += R.lean;
    pose.roll += R.roll;
    pose.rot += R.rot;
    pose.nod += R.nod;
    pose.sy *= R.sy;
    pose.sx *= R.sx;
    if (ctx.still) Object.assign(pose, { lean: 0, roll: 0, rot: 0, nod: 0, turn: 0, look: 0, sx: 1, sy: 1 });

    pose.turn = clamp(pose.turn, -0.85, 0.85);
    pose.x = this.pos.x + pose.dx * Math.cos(this.yaw);
    pose.z = this.pos.z - pose.dx * Math.sin(this.yaw);
    pose.y = this.y + pose.dy + pose.hop + edge;
    pose.yaw = this.yaw + pose.yawAdd;
    return pose;
  }

  // ------------------------------------------------------------------ walking
  walk(dt, ctx, T, R, p) {
    const isNeko = this.name === "neko";
    const g = GAITS[this.gait] || GAITS.walk;
    const vmax = g.v * this.pace;
    const wp = this.path[0];
    if (!wp) return this.arrive(ctx);
    const dx = wp.x - this.pos.x;
    const dz = wp.z - this.pos.z;
    const d = Math.hypot(dx, dz);
    const want = Math.atan2(dx, dz);

    // get ready: head turns towards the target, a small crouch, then go
    if (this.prepT > 0) {
      this.prepT -= dt;
      this.heading = want;
      T.turn = clamp(wrap(want - this.yaw), -0.7, 0.7);
      T.look = clamp(T.turn * 1.4, -1, 1);
      T.sy = this.gait === "bound" ? 0.86 : 0.95;
      T.lean = this.gait === "bound" ? 0.25 : 0.1;
      if (this.gait === "bound") R.roll = Math.sin(this.t * 26) * 0.05; // butt wiggle
      p.energy = 2;
      return;
    }
    // a stop halfway: look around, then go on
    if (this.pauseT > 0) {
      this.pauseT -= dt;
      this.v = Math.max(0, this.v - 6 * dt);
      this.idle(dt, ctx, T, p);
      if (this.pauseT <= 0) this.prepT = 0.15;
      return;
    }

    // steering: the direction of travel turns gradually, so cats walk in curves
    const err = wrap(want - this.heading);
    const rate = 3 + 7 * (1 - clamp01(this.v / vmax));
    this.heading += clamp(err, -rate * dt, rate * dt);
    let remaining = d;
    for (let i = 1; i < this.path.length; i++) remaining += Math.hypot(this.path[i].x - this.path[i - 1].x, this.path[i].z - this.path[i - 1].z);
    const stopAt = wp.pause ? d : remaining;
    let vt = vmax * Math.max(0.25, Math.cos(Math.min(Math.abs(err), 1.4)));
    vt = Math.min(vt, Math.sqrt(2 * 2.4 * stopAt) + 0.08);
    const acc = vt > this.v ? 3.0 : 6;
    const dv = clamp(vt - this.v, -acc * dt, acc * dt);
    this.v += dv;
    this.accel += (dv / Math.max(dt, 1e-4) - this.accel) * (1 - Math.exp(-dt * 6));
    this.pos.x += Math.sin(this.heading) * this.v * dt;
    this.pos.z += Math.cos(this.heading) * this.v * dt;
    legal(this.pos, isNeko);
    const last = this.path.length === 1;
    if (d < (last || wp.pause ? 0.07 : 0.45)) {
      this.path.shift();
      if (wp.pause) {
        this.pauseT = rand(0.9, 2);
        this.gl.until = 0;
      }
    }

    // the body faces the way it goes (but never shows its back); the head leads
    // the body turns the way it goes; the head is a little ahead in the curves
    this.turnTo(this.heading, dt, 7);
    const rel = wrap(this.heading - this.yaw);
    T.turn = clamp(rel * 0.8, -0.5, 0.5);
    T.look = clamp(rel * 1.2, -1, 1);
    const s = clamp01(this.v / vmax);
    const accLean = clamp(this.accel * 0.05, -0.18, 0.18);
    const fx = Math.cos(rel);
    const fs = -Math.sin(rel);

    if (this.gait === "bound") {
      // bounding: a jump per stride, stretched in the air, squashed on landing
      this.walkPhase += (this.v * dt) / g.stride;
      const ph = this.walkPhase % 1;
      const air = ph < 0.62 ? Math.sin((Math.PI * ph) / 0.62) : 0;
      const land = ph >= 0.62 ? Math.sin((Math.PI * (ph - 0.62)) / 0.38) : 0;
      p.hop = air * 0.34 * s;
      R.sy = 1 + 0.09 * air * s - 0.12 * land * s;
      R.sx = 1 - 0.04 * air * s + 0.07 * land * s;
      const pitch = (0.22 * Math.cos(ph * TAU) + 0.05) * s;
      R.lean = pitch * fx;
      R.roll = pitch * fs;
      T.lean = (0.14 * s + accLean) * fx;
      T.roll = (0.14 * s + accLean) * fs;
      p.paws = [
        { w: 0.85 * air * s, dir: [-0.1, -0.2, 1], lift: 0.9 },
        { w: 0.85 * air * s, dir: [0.1, -0.2, 1], lift: 0.9 },
      ];
      p.hindDrop = (air - land * 0.4) * s;
      p.ears = [0.3 * s, 0.3 * s];
      p.energy = 2.6;
    } else {
      // walk / trot: two steps per cycle, the body rides a little up and down,
      // squashes at each footfall and rolls from side to side; the head stays steadier
      this.walkPhase += this.v * dt * g.cad;
      const sN = Math.sin(this.walkPhase);
      const up = Math.abs(sN);
      p.dy = up * g.bob * s;
      R.sy = 1 - 0.045 * (1 - up) * s;
      R.roll = sN * 0.065 * s;
      R.rot = -sN * 0.04 * s;
      R.nod = -Math.cos(2 * this.walkPhase) * 0.035 * s;
      T.lean = (0.12 * s + accLean) * fx;
      T.roll = (0.12 * s + accLean) * fs;
      T.nod += 0.04 * s;
      p.paws = [
        { w: 0.5 * s, dir: [0, -1, 1.1 * Math.max(0, sN)], lift: 0.35 },
        { w: 0.5 * s, dir: [0, -1, 1.1 * Math.max(0, -sN)], lift: 0.35 },
      ];
      // back feet move with the opposite front foot (front-left with back-right), like cats do
      p.hind = [-sN * s, sN * s];
      p.energy = 1.3 + s;
    }
  }

  arrive(ctx) {
    this.v = 0;
    this.bodyGoal = this.face ? Math.atan2(this.face.x - this.pos.x, this.face.z - this.pos.z) : this.yaw;
    this.state = "sit";
    this.timer = rand(1.8, 4);
    this.sp.sy.vel -= this.gait === "bound" ? 1.6 : 0.9; // sits down with a little squash
    this.sp.lean.vel -= 0.6;
    this.flick = 1;
    this.gl.until = 0;
    if (this.then) {
      const f = this.then;
      this.then = null;
      f();
    }
  }

  // ------------------------------------------------------------------ being alive while sitting
  idle(dt, ctx, T, p) {
    const t = ctx.t;
    if (t > this.gl.until) {
      // a new glance: at you, at the other cat, at the yarn, around, up at something
      const r = Math.random();
      let turn = 0;
      let nod = rand(-0.03, 0.05);
      const dirTo = (q) => Math.atan2(q.x - this.pos.x, q.z - this.pos.z);
      const at = (q) => clamp(wrap(dirTo(q) - this.yaw), -0.75, 0.75);
      // now and then the whole cat turns round: towards you, the other cat, or somewhere else
      if (Math.random() < 0.22) {
        const w = Math.random();
        this.face = null;
        this.bodyGoal = w < 0.5 ? dirTo(ctx.camera.position) + (this.o.sideOffset ?? 0) * 0.5 : w < 0.8 && ctx.other ? dirTo(ctx.other) : this.yaw + rand(-1.6, 1.6);
        this.flick = 0.6;
      }
      if (r < 0.38) {
        turn = at(ctx.camera.position);
        if (Math.random() < 0.3 && Math.abs(turn) < 0.6) this.blinkUntil = t + 0.7; // a slow blink: "I like you"
      } else if (r < 0.6 && ctx.other) turn = at(ctx.other);
      else if (r < 0.72 && ctx.yarn) {
        turn = at(ctx.yarn.position);
        nod = 0.12;
      } else if (r < 0.9) {
        turn = rand(-0.7, 0.7);
        nod = rand(-0.1, 0.1);
      } else {
        turn = rand(-0.35, 0.35);
        nod = -0.24;
      }
      this.gl = { turn, nod, look: clamp(turn * 1.5, -1, 1), until: t + rand(1.1, 4.2) };
      if (Math.random() < 0.3) this.shift = rand(-0.05, 0.05);
      if (Math.abs(turn) > 0.3 && Math.random() < 0.5) (this.ear.t0 = t), (this.ear.side = turn > 0 ? 1 : 0);
    }
    T.turn = this.gl.turn;
    T.look = this.gl.look;
    T.nod = this.gl.nod;
    T.roll = this.shift;
    T.rot = this.gl.turn * 0.12;
    if (t < this.blinkUntil) p.eyes = "happy";
  }

  twitches(dt, ctx, p) {
    const t = ctx.t;
    // ears: now and then one flicks (both, when startled)
    if (t > this.ear.next) {
      this.ear.t0 = t;
      this.ear.side = Math.random() < 0.15 ? 2 : Math.random() < 0.5 ? 0 : 1;
      this.ear.next = t + rand(1.5, 6);
    }
    const e = bell(t - this.ear.t0, 0, 0.24) * 0.6;
    if (this.ear.side !== 1) p.ears[0] += e;
    if (this.ear.side !== 0) p.ears[1] += e;
    // tail: quiet sway with sudden flicks
    if (t > this.nextFlick) {
      this.flick = 1;
      this.nextFlick = t + rand(2.5, 8);
    }
    this.flick *= Math.exp(-dt * 2.5);
    p.energy += this.flick * 2.2;
  }

  turnTo(a, dt, rate) {
    this.yaw += wrap(a - this.yaw) * (1 - Math.exp(-dt * rate));
  }

  wakeUp(reason) {
    this.state = "sit";
    this.timer = 0.9;
    this.reason = reason;
    this.startle();
    if (reason === "stroll") {
      this.strolling = true;
      this.strollStep = 0;
      this.awakeUntil = this.t + 40;
    }
  }

  decide(ctx) {
    const isNeko = this.name === "neko";
    const music = ctx.music > 0.5;
    if (music) {
      // change dance move, now and then go over to the speakers (Luna)
      if (!isNeko && Math.random() < 0.25 && Math.hypot(this.pos.x - SPOTS.speakersR.x, this.pos.z - SPOTS.speakersR.z) > 0.6) {
        this.goTo(SPOTS.speakersR, null, "trot");
        return;
      }
      if (Math.random() < 0.25) this.doAct(pick(["spin", "hop"]));
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
        // a little routine: stretch, go somewhere, look, do something, come back
        const step = this.strollStep++;
        if (step === 0) return this.doAct("stretch");
        if (step === 1) return this.doAct("shake");
        if (step === 2) return this.goTo(pick([SPOTS.window, SPOTS.deck, ctx.lunaSpot || SPOTS.side, SPOTS.tv, SPOTS.rugFront]));
        if (step === 3) return this.doAct(pick(["lookaround", "groom", "tilt", "mew"]));
        if (step === 4) return this.doAct(pick(["groom", "lookaround", "hop", "tailchase"]));
        this.strolling = false;
        this.reason = null;
        this.awakeUntil = 0;
        this.goTo(SPOTS.neko);
        return;
      }
      // awake on the cushion (petted): small things, then sleep
      this.doAct(pick(["lookaround", "groom", "tilt", "shake"]));
      return;
    }
    // Luna: sit and watch for a while, wander, play, visit Neko
    const r = Math.random();
    if (r < 0.2) {
      this.timer = rand(2, 5); // just sits and looks around
      return;
    }
    if (ctx.yarn && r < 0.36) {
      const y = ctx.yarn.position;
      const ax = y.x - this.pos.x;
      const az = y.z - this.pos.z;
      const n = Math.hypot(ax, az) || 1;
      return this.goTo({ x: y.x - (ax / n) * 0.7, z: y.z - (az / n) * 0.7, face: { x: y.x, z: y.z } }, () => this.doAct("pounce"), n > 2.5 ? "trot" : "walk");
    }
    if (r < 0.66) {
      const spots = [SPOTS.home, SPOTS.window, SPOTS.deck, SPOTS.tv, SPOTS.rugFront, SPOTS.rugLeft, SPOTS.side, SPOTS.byNeko, SPOTS.crate];
      const far = spots.filter((s) => Math.hypot(s.x - this.pos.x, s.z - this.pos.z) > 1);
      return this.goTo(pick(far), Math.random() < 0.5 ? () => this.doAct(pick(["lookaround", "groom", "tilt"])) : null, Math.random() < 0.3 ? "trot" : "walk");
    }
    this.face = null;
    this.doAct(pick(["groom", "lookaround", "tilt", "stretch", "tailchase", "hop", "wave", "loaf", "shake"]));
  }
}

// ------------------------------------------------------------------ actions
// (T: spring targets, p: pose, R: fast offsets, k: 0→1, t: seconds, ctx, b: the brain)
const ACT_DUR = { hop: 1.1, spin: 1.3, wave: 1.8, mew: 1.0, groom: 4.2, stretch: 3.4, tilt: 2.0, lookaround: 3.2, tailchase: 2.6, pounce: 2.0, loaf: 5, shake: 0.9, knead: 3 };
const ACTS = {
  hop(T, p, R, k) {
    // crouch, jump (stretched), land (squashed)
    T.sy = 1 - 0.13 * bell(k, 0, 0.32) - 0.1 * bell(k, 0.72, 0.95);
    T.lean = 0.15 * bell(k, 0, 0.32) - 0.08 * bell(k, 0.32, 0.72);
    const air = bell(k, 0.3, 0.74);
    p.hop = air * 0.55;
    R.sy = 1 + 0.1 * air;
    p.paws = [
      { w: 0.6 * air, dir: [-0.3, 0.2, 1], lift: 0.6 },
      { w: 0.6 * air, dir: [0.3, 0.2, 1], lift: 0.6 },
    ];
    p.hindDrop = air;
    p.eyes = k > 0.3 ? "happy" : "open";
    p.ears = [0.2 * air, 0.2 * air];
    p.energy = 2.4;
  },
  spin(T, p, R, k) {
    T.sy = 1 - 0.1 * bell(k, 0, 0.2) - 0.08 * bell(k, 0.85, 1);
    const u = seg(k, 0.15, 0.85);
    p.yawAdd = u * TAU;
    p.hop = bell(k, 0.15, 0.85) * 0.3;
    p.hindDrop = bell(k, 0.15, 0.85) * 0.6;
    p.hind = [Math.sin(k * 40) * 0.5 * bell(k, 0.15, 0.85), -Math.sin(k * 40) * 0.5 * bell(k, 0.15, 0.85)];
    p.eyes = "happy";
    p.energy = 2.6;
  },
  wave(T, p, R, k, t) {
    const w = seg(k, 0, 0.18) * (1 - seg(k, 0.82, 1));
    p.paws[1] = { w, dir: [0.7 + Math.sin(t * 11) * 0.25 * w, 0.95, 0.45] };
    T.rot = -0.12 * w;
    T.roll = -0.04 * w;
    p.eyes = w > 0.5 ? "happy" : "open";
    p.ears = [0.15 * w, 0.15 * w];
  },
  mew(T, p, R, k, t, ctx, b) {
    if (t < 0.05 && !b.mewed) {
      b.mewed = true;
      ctx.say?.(b.name);
    }
    if (k > 0.9) b.mewed = false;
    const w = bell(k, 0, 0.75);
    p.mouth = k > 0.08 && k < 0.65 ? "mew" : "";
    T.nod = -0.2 * w;
    T.rot = 0.12 * w;
    T.sy = 1 + 0.05 * w;
    p.eyes = k > 0.08 && k < 0.65 ? "happy" : "open";
  },
  groom(T, p, R, k, t) {
    // paw up to the mouth, a few licks, a wipe over the face, paw down
    const up = seg(k, 0, 0.12) * (1 - seg(k, 0.88, 1));
    const licking = k > 0.12 && k < 0.6;
    const wipe = bell(k, 0.6, 0.88);
    const lick = licking ? Math.pow(Math.max(0, Math.sin(t * 7.5)), 2) : 0;
    p.paws[0] = { w: up, dir: [0.5 - 0.15 * wipe, 0.85 + 0.6 * wipe, 0.8], lift: 0.5 + 0.2 * wipe };
    T.nod = 0.2 * up - 0.1 * wipe;
    R.nod = 0.12 * lick;
    T.rot = -0.2 * up + 0.25 * wipe;
    R.rot = Math.sin(t * 7.5) * 0.06 * wipe;
    p.eyes = up > 0.4 ? "happy" : "open";
    p.ears = [0.25 * wipe, 0];
  },
  stretch(T, p, R, k) {
    // front paws slide far forward, chest down; then up again and a big yawn with the head back
    const down = seg(k, 0, 0.32) * (1 - seg(k, 0.55, 0.72));
    const tremble = k > 0.3 && k < 0.55 ? Math.sin(k * 120) * 0.012 : 0;
    T.lean = 0.5 * down;
    R.lean = tremble;
    T.sy = 1 - 0.18 * down + 0.07 * bell(k, 0.68, 1);
    T.sx = 1 + 0.06 * down;
    T.nod = -0.18 * down - 0.26 * bell(k, 0.68, 1);
    p.paws = [
      { w: down, dir: [-0.15, -0.12, 1], lift: 1 },
      { w: down, dir: [0.15, -0.12, 1], lift: 1 },
    ];
    p.hind = [-0.7 * down, -0.7 * down];
    if (k > 0.7 && k < 0.95) p.eyes = "yawn";
    else p.eyes = down > 0.4 ? "heavy" : "open";
    p.ears = [0.35 * down, 0.35 * down];
    p.energy = 0.3;
  },
  shake(T, p, R, k, t) {
    // a quick shake of the whole head, ears flapping
    const w = bell(k, 0, 1);
    R.rot = Math.sin(t * 42) * 0.32 * w;
    R.roll = Math.sin(t * 42 + 1) * 0.05 * w;
    p.ears = [0.7 * w * Math.abs(Math.sin(t * 42)), 0.7 * w * Math.abs(Math.cos(t * 42))];
    p.eyes = w > 0.3 ? "happy" : "open";
    p.energy = 2;
  },
  tilt(T, p, R, k, t, ctx, b) {
    if (t < 0.05 && !b.asked) {
      b.asked = true;
      ctx.question?.(b);
    }
    if (k > 0.9) b.asked = false;
    // quick tilt, hold, a second smaller tilt the other way
    const a = k < 0.55 ? 0.42 * seg(k, 0, 0.1) : -0.25 * seg(k, 0.55, 0.62);
    T.rot = a * (1 - seg(k, 0.88, 1));
    T.look = 0.4 * Math.sign(a);
    p.ears = [k < 0.55 ? 0 : 0.3, k < 0.55 ? 0.3 : 0];
  },
  lookaround(T, p, R, k) {
    // glance left, hold, glance right, hold, back
    const turn = k < 0.33 ? -0.7 : k < 0.72 ? 0.7 : 0;
    T.turn = turn * seg(k, 0, 0.06);
    T.look = T.turn * 1.4;
    T.nod = k > 0.33 && k < 0.72 ? -0.08 : 0.02;
    p.ears = [k < 0.33 ? 0.35 : 0, k > 0.33 && k < 0.72 ? 0.35 : 0];
  },
  tailchase(T, p, R, k, t) {
    // notices the tail, crouches, spins after it (speeding up), stops a little dizzy
    const look = seg(k, 0, 0.12);
    T.turn = 0.75 * look * (1 - seg(k, 0.75, 0.8));
    T.look = T.turn * 1.4;
    T.sy = 1 - 0.1 * bell(k, 0.05, 0.22);
    const u = clamp01((k - 0.2) / 0.55);
    p.yawAdd = (u * u * (3 - 2 * u)) * TAU * 1.5;
    p.hop = k > 0.2 && k < 0.75 ? Math.abs(Math.sin(t * 18)) * 0.07 : 0;
    const run = k > 0.2 && k < 0.75 ? 0.7 : 0;
    p.hind = [Math.sin(t * 18) * run, -Math.sin(t * 18) * run];
    const dizzy = k > 0.75 ? 1 - seg(k, 0.75, 1) : 0;
    R.roll = Math.sin(t * 9) * 0.1 * dizzy;
    R.rot = Math.sin(t * 9 + 1) * 0.12 * dizzy;
    p.eyes = dizzy > 0.2 ? "happy" : "open";
    p.energy = 3;
  },
  pounce(T, p, R, k, t, ctx, b) {
    // crouch low, eyes on the target, butt wiggles faster and faster...
    const crouch = seg(k, 0, 0.25) * (1 - seg(k, 0.52, 0.56));
    T.lean = 0.35 * crouch;
    T.sy = 1 - 0.17 * crouch;
    T.sx = 1 + 0.05 * crouch;
    T.nod = -0.1 * crouch;
    R.roll = k > 0.18 && k < 0.53 ? Math.sin(t * (14 + 26 * k)) * 0.07 : 0;
    p.ears = [0.15 * crouch, 0.15 * crouch];
    p.energy = 1.5 + 2.5 * crouch;
    // ...then the leap (stretched), paws forward, and the landing (squashed)
    const air = bell(k, 0.54, 0.8);
    p.hop = air * 0.6;
    R.sy = 1 + 0.14 * air;
    R.lean = -0.25 * bell(k, 0.54, 0.66) + 0.3 * bell(k, 0.66, 0.85);
    p.paws = [
      { w: air, dir: [-0.15, 0.15, 1], lift: 1 },
      { w: air, dir: [0.15, 0.15, 1], lift: 1 },
    ];
    p.hindDrop = air;
    // treading on the spot while wiggling
    if (k > 0.18 && k < 0.53) p.hind = [Math.sin(t * 20) * 0.25, -Math.sin(t * 20) * 0.25];
    // the leap carries the cat forward, towards what it was looking at
    const u = seg(k, 0.54, 0.8);
    const step = (u - (b.leapPrev || 0)) * 0.7;
    b.leapPrev = u;
    const f = b.face;
    const dir = f ? Math.atan2(f.x - b.pos.x, f.z - b.pos.z) : b.yaw;
    if (step > 0) {
      b.pos.x += Math.sin(dir) * step;
      b.pos.z += Math.cos(dir) * step;
      legal(b.pos, b.name === "neko");
    }
    if (k > 0.8) T.sy = 1 - 0.12 * bell(k, 0.8, 1);
    if (k > 0.56) p.eyes = "happy";
    if (!b.batted && k > 0.72) {
      b.batted = true;
      ctx.batYarn?.(b);
    }
    if (k >= 0.99) b.batted = false;
  },
  loaf(T, p, R, k) {
    // settles down low, eyes half closed, content; the tail goes quiet
    const w = seg(k, 0, 0.3) * (1 - seg(k, 0.9, 1));
    T.sy = 1 - 0.09 * w;
    T.sx = 1 + 0.06 * w;
    T.nod = 0.1 * w;
    p.eyes = w > 0.5 ? "heavy" : "open";
    p.energy = 0.25;
  },
  knead(T, p, R, k, t) {
    // "making biscuits" on the cushion: paws press down in turn, eyes happy
    const w = seg(k, 0, 0.12) * (1 - seg(k, 0.88, 1));
    const a = Math.max(0, Math.sin(t * 6));
    const c = Math.max(0, -Math.sin(t * 6));
    p.paws = [
      { w: 0.55 * a * w, dir: [0, -0.4, 1], lift: 0.4 },
      { w: 0.55 * c * w, dir: [0, -0.4, 1], lift: 0.4 },
    ];
    R.roll = (a - c) * 0.04 * w;
    R.sy = 1 - 0.02 * (a + c) * w;
    T.lean = 0.08 * w;
    T.nod = 0.1 * w;
    p.eyes = w > 0.4 ? "happy" : "open";
    p.energy = 0.4;
  },
};

// ------------------------------------------------------------------ dance moves (on the music's groove)
const DANCES = ["bob", "sway", "steps", "paws", "jump"];
const DANCE_MOVES = {
  bob(T, p, R, ctx) {
    T.nod = (ctx.groove - 0.5) * 0.34;
    T.rot = Math.sin(ctx.phase * Math.PI) * 0.09;
    T.sy = 1 - (1 - ctx.groove) * 0.03;
    p.eyes = "happy";
  },
  sway(T, p, R, ctx) {
    T.roll = Math.sin(ctx.phase * Math.PI) * 0.15;
    T.rot = -Math.sin(ctx.phase * Math.PI - 0.5) * 0.13; // the head follows a little late
    T.nod = (ctx.groove - 0.5) * 0.14;
  },
  steps(T, p, R, ctx) {
    // little steps side to side, one per beat
    const s = Math.sin(ctx.phase * Math.PI);
    p.dx = s * 0.2;
    p.hop = Math.pow(ctx.groove, 3) * 0.08;
    T.roll = s * 0.09;
    T.rot = -s * 0.06;
    p.paws = [
      { w: 0.45 * Math.max(0, s), dir: [-0.3, -0.6, 1], lift: 0.4 },
      { w: 0.45 * Math.max(0, -s), dir: [0.3, -0.6, 1], lift: 0.4 },
    ];
    p.hind = [-s * 0.6, s * 0.6];
  },
  paws(T, p, R, ctx) {
    // paws up, one per beat, like a little dance in the air
    const s = Math.sin(ctx.phase * Math.PI);
    p.paws = [
      { w: Math.max(0, s), dir: [-0.6, 1, 0.4] },
      { w: Math.max(0, -s), dir: [0.6, 1, 0.4] },
    ];
    T.rot = Math.sin(ctx.phase * Math.PI - 0.4) * 0.13;
    T.roll = s * 0.05;
    p.eyes = "happy";
  },
  jump(T, p, R, ctx) {
    // a hop every other beat: crouch before, squash after
    const ph = (((ctx.phase % 2) + 2) % 2) / 2;
    const air = ph < 0.45 ? Math.sin((Math.PI * ph) / 0.45) : 0;
    p.hop = air * 0.32;
    p.hindDrop = air;
    R.sy = air > 0 ? 1 + 0.08 * air : 1 - 0.1 * Math.sin((Math.PI * (ph - 0.45)) / 0.55);
    T.nod = (ctx.groove - 0.5) * 0.18;
    p.eyes = "happy";
  },
};
