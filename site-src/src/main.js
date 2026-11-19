// NekoTune site: Neko's room (cel-shaded 3D, real clock) + the product story.
import { createRoom } from "./scene.js";
import { LofiBand, TRACKS } from "./audio.js";
import "./product.js";

const $ = (s) => document.querySelector(s);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x, a, b) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// ---------------------------------------------------------------- audio + player
const band = new LofiBand();
const ui = {
  play: $("#play"),
  prev: $("#prev"),
  next: $("#next"),
  sound: $("#sound"),
  title: $("#track-title"),
  artist: $("#track-artist"),
  now: $("#time-now"),
  total: $("#time-total"),
  fill: $("#progress-fill"),
  caption: $("#caption"),
};
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
let playing = false;
let fakeClock = 0;
let room = null;

function showTrack() {
  const t = TRACKS[band.track];
  ui.title.textContent = t.title;
  ui.artist.textContent = t.artist;
  ui.total.textContent = fmt(t.length);
  room?.setTrack(band.track);
  dispatchEvent(new CustomEvent("neko-track", { detail: { ...t, playing } }));
}
function say(text) {
  ui.caption.textContent = text;
}
function setPlaying(on) {
  playing = on;
  document.body.classList.toggle("is-playing", on);
  ui.play.setAttribute("aria-pressed", String(on));
  ui.play.setAttribute("aria-label", on ? "Metti in pausa" : "Riproduci");
  try {
    on ? band.play() : band.pause();
  } catch {
    /* no Web Audio: the room still dances */
  }
  room?.setPlaying(on);
  dispatchEvent(new CustomEvent("neko-track", { detail: { ...TRACKS[band.track], playing: on } }));
  say(on ? (band.muted ? "Neko è sveglio. La musica è senza audio." : "Neko è sveglio e ascolta con te.") : "Neko dorme. Premi play.");
}
function nextTrack(d = 1) {
  band.setTrack(band.track + d);
  showTrack();
  if (!playing) setPlaying(true);
}
ui.play.addEventListener("click", () => setPlaying(!playing));
ui.prev.addEventListener("click", () => nextTrack(-1));
ui.next.addEventListener("click", () => nextTrack(1));
ui.sound.addEventListener("click", () => {
  const on = ui.sound.getAttribute("aria-pressed") !== "true";
  ui.sound.setAttribute("aria-pressed", String(on));
  ui.sound.setAttribute("aria-label", on ? "Togli l'audio" : "Rimetti l'audio");
  band.setMuted(!on);
  if (playing) setPlaying(true);
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && playing) setPlaying(false);
});
function tickPlayer(dt) {
  const tr = TRACKS[band.track];
  if (playing && !band.ctx) fakeClock += dt;
  const shown = (band.ctx ? band.elapsed : fakeClock) % tr.length;
  ui.now.textContent = fmt(shown);
  ui.fill.style.transform = `scaleX(${(shown / tr.length).toFixed(4)})`;
}

// ---------------------------------------------------------------- scroll: room -> into the TV
const hero = $("#inizio");
const dive = $(".chapter-dive");
const copy = $(".hero-copy");
function progress() {
  const y = scrollY;
  const start = hero.offsetTop + hero.offsetHeight - innerHeight;
  const end = dive.offsetTop + dive.offsetHeight - innerHeight;
  return clamp01((y - start) / Math.max(1, end - start));
}
function updateHero() {
  const y = scrollY;
  const holdEnd = hero.offsetTop + hero.offsetHeight - innerHeight;
  const k = 1 - smooth(y, holdEnd * 0.35, holdEnd + innerHeight * 0.15);
  copy?.style.setProperty("--show", k.toFixed(3));
  document.body.classList.toggle("scrolled", y > 40);
}
addEventListener("scroll", updateHero, { passive: true });
addEventListener("resize", updateHero);
updateHero();

// ---------------------------------------------------------------- the clock in the header
const TIME_WORDS = { morning: "mattina", day: "pomeriggio", golden: "tramonto", night: "notte" };
const chip = $(".clock");
let moodName = "day";
function paintClock() {
  if (!chip) return;
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  chip.querySelector(".clock-time").textContent = `${hh}:${mm}`;
  chip.querySelector(".clock-word").textContent = TIME_WORDS[moodName] || "";
}
paintClock();
setInterval(paintClock, 20000);
function setMood(name) {
  moodName = name;
  document.documentElement.dataset.time = name;
  paintClock();
}
// before the 3D loads, guess the mood from the clock so the page has the right colours
{
  const h = Number(new URLSearchParams(location.search).get("h") ?? new Date().getHours() + new Date().getMinutes() / 60);
  setMood(h < 6.5 || h >= 19.4 ? "night" : h < 8.8 ? "morning" : h < 17.5 ? "day" : "golden");
}

// ---------------------------------------------------------------- boot the room
showTrack();
const canvas = $("#scene");
let last = performance.now();
function fallbackLoop() {
  setInterval(() => tickPlayer(0.25), 250);
}
try {
  room = createRoom(canvas, {
    progress,
    togglePlay: () => setPlaying(!playing),
    nextTrack: () => nextTrack(1),
    say,
    purr: () => band.purr?.(),
    mew: () => band.mew?.(),
    goTo: (sel) => $(sel)?.scrollIntoView({ behavior: "smooth" }),
    mood: (name) => setMood(name),
    frame: () => {
      const now = performance.now();
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      let beat = band.pulse();
      if (playing && !band.ctx) beat = Math.exp(-((fakeClock * 1.3) % 1) * 7);
      room.setBeat(beat);
      let groove = band.groove();
      if (playing && !band.ctx) groove = 0.5 + 0.5 * Math.cos(fakeClock * (TRACKS[band.track].bpm / 60) * Math.PI * 2);
      room.setGroove(groove, band.ctx ? band.elapsed - 0.06 : fakeClock);
      tickPlayer(dt);
    },
  });
  room.start();
  room.setTrack(band.track);
  room.loaded.then(() => document.body.classList.add("scene-ready")).catch((err) => {
    console.warn("Stanza non caricata:", err);
    document.body.classList.add("no-3d");
  });
  const after = $(".after-room");
  const update = () => {
    const past = after && after.getBoundingClientRect().top <= 0;
    room.setRunning(!document.hidden && !past);
  };
  addEventListener("scroll", update, { passive: true });
  document.addEventListener("visibilitychange", update);
} catch (err) {
  console.warn("3D non disponibile:", err);
  document.body.classList.add("no-3d");
  fallbackLoop();
}
