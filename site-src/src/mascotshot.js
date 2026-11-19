import { drawCat, createTail, NEKO, LUNA } from "./mascot.js";
const q = new URLSearchParams(location.search);
const S = 4;
const c = document.getElementById("c");
const mode = q.get("m");
const tail = createTail();
for (let i = 0; i < 40; i++) tail.step(0.05, 1);
if (mode === "friends") {
  c.width = 520 * S;
  c.height = 262 * S;
  const g = c.getContext("2d");
  g.setTransform(S, 0, 0, S, 0, 0);
  drawCat(g, { pal: NEKO, eyes: "happy", tail, head: { rot: 0.06 } });
  g.translate(250, 30);
  g.scale(0.88, 0.88);
  drawCat(g, { pal: LUNA, eyes: "open", tail: createTail(), head: { rot: -0.08 }, bow: true, look: -0.7 });
} else {
  c.width = 260 * S;
  c.height = 262 * S;
  const g = c.getContext("2d");
  g.setTransform(S, 0, 0, S, 0, 0);
  if (mode === "asleep") drawCat(g, { pal: NEKO, eyes: "sleep", tail: null, head: { rot: 0.06, dy: 3 } });
  else drawCat(g, { pal: NEKO, eyes: "open", tail, head: { rot: 0.04 }, phones: true });
}
document.body.dataset.ready = "1";
