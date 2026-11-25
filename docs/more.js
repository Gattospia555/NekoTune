// Reveal the new sections once, like "amici" and "diretta" in room.js.
const els = [...document.querySelectorAll(".eqs, .pl")];
if (!("IntersectionObserver" in window)) els.forEach((e) => e.classList.add("in"));
else {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }),
    { threshold: 0.3 }
  );
  els.forEach((e) => io.observe(e));
}

// Luna's note: after a few throws of the yarn in the room (room.js fires
// "nekotune:yarn-gift"), a code for the app's rewards.
window.addEventListener("nekotune:yarn-gift", () => {
  if (document.querySelector(".yarn-gift")) return;
  const card = document.createElement("div");
  card.className = "yarn-gift";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", "Il bigliettino di Luna");
  card.innerHTML = `
    <button type="button" class="yg-close" aria-label="Chiudi">×</button>
    <p class="yg-title">Il bigliettino di Luna</p>
    <p>Grazie per aver giocato con me! Ecco un regalo per NekoTune:</p>
    <div class="yg-code"><code>GOMITOLO</code><button type="button" class="yg-copy">Copia</button></div>
    <p class="yg-how">Nell'app apri il tuo profilo, poi Ricompense, e scrivilo in "Riscatta codice": sblocchi il badge <strong>Gomitolo di Luna</strong>.</p>`;
  document.body.append(card);
  requestAnimationFrame(() => card.classList.add("in"));
  card.querySelector(".yg-close").addEventListener("click", () => {
    card.classList.remove("in");
    setTimeout(() => card.remove(), 400);
  });
  const copy = card.querySelector(".yg-copy");
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("GOMITOLO");
      copy.textContent = "Copiato!";
    } catch {
      copy.textContent = "Selezionalo e copialo";
    }
  });
});
