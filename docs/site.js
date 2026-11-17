// The little player in the hero: no sound, it only wakes Neko up.
(() => {
  const demo = document.getElementById("demo");
  if (!demo) return;
  const $ = (id) => document.getElementById(id);
  const play = $("demo-play");
  const fill = $("demo-fill");
  const now = $("demo-now");
  const total = $("demo-total");
  const title = $("demo-title");
  const artist = $("demo-artist");
  const caption = $("demo-caption");

  const tracks = [
    { title: "Pisolino sul davanzale", artist: "Neko & Friends", length: 192 },
    { title: "Nuvole basse", artist: "Kite Club", length: 214 },
    { title: "Fusa in do maggiore", artist: "Neko & Friends", length: 167 },
  ];
  let index = 0;
  let position = 0; // seconds
  let playing = false;
  let last = 0;
  let frame = 0;

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  function paint() {
    const t = tracks[index];
    title.textContent = t.title;
    artist.textContent = t.artist;
    total.textContent = fmt(t.length);
    now.textContent = fmt(position);
    fill.style.width = `${(position / t.length) * 100}%`;
  }

  function tick(time) {
    if (!playing) return;
    if (last) position += (time - last) / 1000;
    last = time;
    if (position >= tracks[index].length) {
      index = (index + 1) % tracks.length;
      position = 0;
    }
    paint();
    frame = requestAnimationFrame(tick);
  }

  function setPlaying(on) {
    playing = on;
    demo.dataset.state = on ? "playing" : "paused";
    play.setAttribute("aria-pressed", String(on));
    play.setAttribute("aria-label", on ? "Pausa" : "Riproduci");
    caption.textContent = on ? "Neko si è svegliato." : "Neko dorme. Premi play.";
    cancelAnimationFrame(frame);
    last = 0;
    if (on) frame = requestAnimationFrame(tick);
  }

  function step(dir) {
    index = (index + dir + tracks.length) % tracks.length;
    position = 0;
    paint();
    if (!playing) setPlaying(true);
  }

  play.addEventListener("click", () => setPlaying(!playing));
  $("demo-next").addEventListener("click", () => step(1));
  $("demo-prev").addEventListener("click", () => step(position > 3 ? 0 : -1));
  paint();
})();
