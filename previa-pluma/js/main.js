// Número oficial do WhatsApp (DDI + DDD + número, só dígitos)
const WHATSAPP = "5547991525654";

// Links de WhatsApp com mensagem pronta (atributo data-wa)
document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(el.dataset.wa)}`;
  el.target = "_blank";
  el.rel = "noopener";
});

// Header com borda ao rolar
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Filtro de tratamentos
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".treat");
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("is-active", t === tab);
      t.setAttribute("aria-selected", t === tab);
    });
    const f = tab.dataset.filter;
    cards.forEach((c) => {
      const show = f === "todos" || c.dataset.cat.split(" ").includes(f);
      c.classList.toggle("is-hidden", !show);
      if (show) c.classList.add("is-visible");
    });
  })
);

// Aberto agora / Fechado agora (horário de Joinville)
// Seg a sex, 9h às 20h. Ajustar se houver sábado.
const HOURS = { 1: [9, 20], 2: [9, 20], 3: [9, 20], 4: [9, 20], 5: [9, 20] };
const status = document.getElementById("status");
if (status) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const h = (parseInt(get("hour"), 10) % 24) + parseInt(get("minute"), 10) / 60;
  const range = HOURS[day];
  const open = range && h >= range[0] && h < range[1];
  status.textContent = open ? "Aberto agora" : "Fechado agora";
  status.classList.add(open ? "is-open" : "is-closed");
}

// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Animação de entrada
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
