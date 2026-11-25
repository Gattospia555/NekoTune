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
