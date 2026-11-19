// The product story after the room: everything here is driven by the scroll
// position (Apple-style "scrubbing"), plus the theme picker and the header.
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x, a, b) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/** 0 when the section's top reaches the top of the screen, 1 when its bottom reaches the bottom. */
function progress(el) {
  const r = el.getBoundingClientRect();
  const total = el.offsetHeight - innerHeight;
  return total <= 0 ? 0 : clamp01(-r.top / total);
}
const visible = (el) => {
  const r = el.getBoundingClientRect();
  return r.bottom > -100 && r.top < innerHeight + 100;
};

// ---------------------------------------------------------------- player
const ap = $("#player");
const apParts = ap && {
  laptop: $(".laptop", ap),
  idle: $(".sc-idle", ap),
  play: $(".sc-play", ap),
  exp: $(".sc-exp", ap),
  lyr: $$(".sc-lyr", ap),
  heads: $$(".ap-h", ap),
  facts: $$(".ap-facts li", ap),
};
const STEPS = [0.16, 0.36, 0.58, 0.79, 1.0];
function updatePlayer() {
  if (!ap || !visible(ap)) return;
  const p = reduced.matches ? Math.max(progress(ap), 0) : progress(ap);
  const P = apParts;
  // the screen starts filling the window (we just came out of Neko's TV) and settles into the laptop
  const z = smooth(p, 0, STEPS[0]);
  const lw = P.laptop.offsetWidth || 1;
  const fill = Math.max(innerWidth / (lw * 0.94), 1);
  const scale = lerp(fill, 1, z);
  P.laptop.style.transform = `translateY(${lerp(-6, 0, z)}vh) scale(${scale.toFixed(4)})`;
  ap.style.setProperty("--z", z.toFixed(3));
  // pictures
  const s1 = smooth(p, STEPS[1], STEPS[1] + 0.06);
  const s2 = smooth(p, STEPS[2], STEPS[2] + 0.1);
  const s3 = smooth(p, STEPS[3], STEPS[3] + 0.04);
  P.play.style.opacity = s1;
  P.exp.style.transform = `translateY(${((1 - s2) * 100).toFixed(2)}%)`;
  P.exp.style.opacity = s2 > 0 ? 1 : 0;
  const lyrK = smooth(p, STEPS[3], 0.98) * P.lyr.length;
  // zoom into the lyrics panel, like Apple zooming into a detail
  const lz = 1 + 0.75 * smooth(p, 0.82, 0.93);
  P.lyr.forEach((img) => (img.style.transform = `scale(${lz.toFixed(4)})`));
  P.lyr.forEach((img, i) => (img.style.opacity = s3 * clamp01(lyrK - i + 1 > 0 ? (i === 0 ? 1 : clamp01((lyrK - i) * 2.5)) : 0)));
  // headlines: one at a time
  P.heads.forEach((h, i) => {
    const a = STEPS[i];
    const b = STEPS[i + 1];
    const fadeIn = i === 0 ? smooth(p, 0.06, STEPS[0]) : smooth(p, a, a + 0.04);
    const fadeOut = i === P.heads.length - 1 ? 1 : 1 - smooth(p, b - 0.04, b);
    const k = fadeIn * fadeOut;
    h.style.opacity = k.toFixed(3);
    h.style.transform = `translateY(${((1 - fadeIn) * 24 - (1 - fadeOut) * 24).toFixed(1)}px)`;
    h.toggleAttribute("aria-hidden", k < 0.5);
  });
  P.facts.forEach((li) => li.classList.toggle("on", p >= STEPS[Number(li.dataset.step)]));
}

// ---------------------------------------------------------------- friends + streaming: play once when they come into view
const fr = $("#amici");
const st = $("#diretta");
const stWidget = st && $(".st-widget", st);
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }),
  { threshold: 0.35 }
);
[fr, st].forEach((el) => el && io.observe(el));
if (fr) $$(".bub", fr).forEach((b, i) => b.style.setProperty("--i", i));
addEventListener("neko-track", (e) => {
  if (!stWidget) return;
  $(".sw-title", stWidget).textContent = e.detail.title;
  $(".sw-artist", stWidget).textContent = e.detail.artist;
  $(".sw-cover", stWidget).style.background = e.detail.label;
  stWidget.classList.toggle("playing", !!e.detail.playing);
});

// ---------------------------------------------------------------- themes
const th = $("#temi");
if (th) {
  const shot = $(".th-shot", th);
  const img = $(".th-img", th);
  const names = {};
  $$(".th-btn", th).forEach((b) => (names[b.dataset.theme] = b.textContent.trim()));
  // warm the cache so the switch is instant
  const preload = () => $$(".th-btn", th).forEach((b) => (new Image().src = `media/theme-${b.dataset.theme}.webp`));
  new IntersectionObserver(([e], o) => e.isIntersecting && (preload(), o.disconnect()), { rootMargin: "400px" }).observe(th);
  $$(".th-btn", th).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.getAttribute("aria-pressed") === "true") return;
      $$(".th-btn", th).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const id = btn.dataset.theme;
      th.style.setProperty("--th-bg", btn.dataset.bg);
      th.dataset.ink = btn.dataset.ink;
      const src = `media/theme-${id}.webp`;
      const alt = `NekoTune con il tema ${names[id]}`;
      if (reduced.matches || !shot.animate) {
        img.src = src;
        img.alt = alt;
        return;
      }
      // a circle grows from the button, like the theme switch in the app
      const r = shot.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      const x = clamp01((b.left + b.width / 2 - r.left) / r.width) * 100;
      const y = clamp01((b.top + b.height / 2 - r.top) / r.height) * 100;
      const next = img.cloneNode();
      next.src = src;
      next.alt = alt;
      next.classList.add("th-next");
      shot.appendChild(next);
      const run = () =>
        next
          .animate([{ clipPath: `circle(0% at ${x}% ${y}%)` }, { clipPath: `circle(150% at ${x}% ${y}%)` }], {
            duration: 700,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          })
          .finished.then(() => {
            img.src = src;
            img.alt = alt;
            next.remove();
          });
      next.decode ? next.decode().then(run, run) : run();
      void e;
    });
  });
}

// ---------------------------------------------------------------- download
const dl = $("#scarica");
if (dl) {
  const art = $(".dl-art", dl);
  const wake = (on) => art.classList.toggle("awake", on);
  $$(".btn", dl).forEach((b) => {
    b.addEventListener("pointerenter", () => wake(true));
    b.addEventListener("pointerleave", () => wake(false));
    b.addEventListener("focus", () => wake(true));
    b.addEventListener("blur", () => wake(false));
  });
}

// ---------------------------------------------------------------- header: current section
const links = $$(".tracks a");
const sections = links.map((a) => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
function updateHeader() {
  const mid = innerHeight * 0.5;
  let cur = -1;
  sections.forEach((s, i) => {
    const r = s.getBoundingClientRect();
    if (r.top <= mid && r.bottom > mid) cur = i;
  });
  links.forEach((a, i) => (i === cur ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
  // dark sections get a dark header
  const dark = $$(".ap").some((s) => {
    const r = s.getBoundingClientRect();
    return r.top <= 40 && r.bottom > 40;
  });
  document.body.classList.toggle("header-dark", dark);
}

let queued = false;
function update() {
  queued = false;
  updatePlayer();
  updateHeader();
}
const schedule = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(update);
  }
};
addEventListener("scroll", schedule, { passive: true });
addEventListener("resize", schedule);
addEventListener("load", schedule);
schedule();
