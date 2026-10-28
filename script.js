/* ===== 1. EDIT YOUR LINKS HERE =====
   Leave a value empty ("") until you have the URL. Empty links are shown as pending. */
const LINKS = {
  github: "https://github.com/chaithanya016",      // [Add GitHub URL] e.g. https://github.com/yourname
  linkedin: "https://www.linkedin.com/in/h-j-chaithanya-prasad-166404284/",    // [Add LinkedIn URL]
  project1: "",    // [Add GitHub URL] Speech Disorder Classification
  project1demo: "",// [Add live demo URL]
  project2: "",    // [Add GitHub URL] FP-Growth vs Random Forest
  project2demo: "" // [Add live demo URL]
};
const CONTACT_EMAIL = "chaithanyaprasadhj@gmail.com";

document.documentElement.classList.add("js");
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ===== 2. Apply links; mark missing ones ===== */
$$("[data-link]").forEach(a => {
  const url = LINKS[a.dataset.link];
  if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; }
  else {
    a.classList.add("pending");
    a.title = "[Add " + a.dataset.link + " URL in script.js]";
    a.addEventListener("click", e => e.preventDefault());
  }
});

/* ===== 3. Mobile menu ===== */
const burger = $("#burger"), menu = $("#menu");
const setMenu = open => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.firstElementChild.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ===== 4. Scroll: sticky nav, back-to-top, active link ===== */
const nav = $("#nav"), topBtn = $("#top");
const onScroll = () => {
  nav.classList.toggle("solid", scrollY > 30);
  topBtn.classList.toggle("show", scrollY > 500);
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();
topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const links = $$(".menu a");
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle("active", l.hash === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => spy.observe(s));

/* ===== 5. Scroll reveal ===== */
const reveal = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => reveal.observe(el));

/* ===== 6. Rotating hero keywords (from resume skills only) ===== */
const words = ["Deep Learning", "Python", "Data Analysis", "Power BI"];
let w = 0;
setInterval(() => { w = (w + 1) % words.length; $("#typed").textContent = words[w]; }, 2500);

/* ===== 7. Contact form validation ===== */
const form = $("#form");
const rules = {
  name: v => v.trim().length >= 2 || "Enter your name (at least 2 characters).",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
  subject: v => v.trim().length >= 3 || "Enter a subject (at least 3 characters).",
  message: v => v.trim().length >= 10 || "Message must be at least 10 characters."
};
const check = id => {
  const input = $("#" + id), r = rules[id](input.value);
  $("#e-" + id).textContent = r === true ? "" : r;
  input.classList.toggle("bad", r !== true);
  input.setAttribute("aria-invalid", r !== true);
  return r === true;
};
Object.keys(rules).forEach(id => $("#" + id).addEventListener("blur", () => check(id)));

form.addEventListener("submit", e => {
  e.preventDefault();
  const ok = Object.keys(rules).map(check).every(Boolean);
  if (!ok) { $(".bad").focus(); return; }
  /* No backend: open the visitor's email app with the message pre-filled.
     To send for real, replace this with fetch() to Formspree/Netlify Forms. */
  const body = `${$("#message").value}\n\nFrom: ${$("#name").value} (${$("#email").value})`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent($("#subject").value)}&body=${encodeURIComponent(body)}`;
  $("#status").textContent = "Your email app should open with the message ready to send.";
  form.reset();
});

$("#year").textContent = new Date().getFullYear();
