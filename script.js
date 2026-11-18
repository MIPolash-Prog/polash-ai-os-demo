const TOOLS = [
  { n: "ChatGPT", d: "Fast drafts, rewrites, brainstorming and everyday reasoning.", c: "Writing", b: "POPULAR", u: "https://chatgpt.com/" },
  { n: "Claude", d: "Long-form writing, structured documents and careful analysis.", c: "Writing", b: "POPULAR", u: "https://claude.ai/" },
  { n: "Gemini", d: "Multimodal research, images and Google workspace workflows.", c: "Research", b: "FREE", u: "https://gemini.google.com/" },
  { n: "Perplexity", d: "Sourced answers with citations for quick, reliable research.", c: "Research", b: "FREE", u: "https://www.perplexity.ai/" },
  { n: "Figma", d: "Interface design with AI-assisted layouts and components.", c: "Design", b: "POPULAR", u: "https://www.figma.com/" },
  { n: "Canva", d: "Social sets, thumbnails and presentations in minutes.", c: "Design", b: "FREE", u: "https://www.canva.com/" },
  { n: "GitHub Copilot", d: "Code completion and pair programming inside your editor.", c: "Development", b: "PAID", u: "https://github.com/features/copilot" },
  { n: "Notion", d: "Projects, notes and reusable playbooks in one workspace.", c: "Workspace", b: "FREE", u: "https://www.notion.so/" },
  { n: "ElevenLabs", d: "Natural voiceovers for drafts, videos and demos.", c: "Video", b: "FREE", u: "https://elevenlabs.io/" },
  { n: "Runway", d: "Generative video, cleanup and visual effects.", c: "Video", b: "PAID", u: "https://runwayml.com/" },
  { n: "Trello", d: "Simple visual boards for client work and content pipelines.", c: "Workspace", b: "FREE", u: "https://trello.com/" },
  { n: "Grammarly", d: "Tone, clarity and grammar checks for client-ready copy.", c: "Writing", b: "FREE", u: "https://www.grammarly.com/" }
];

const ARTICLES = [
  {
    tag: "PRODUCTIVITY",
    t: "The one-page system that keeps projects calm",
    meta: "6 min read",
    body: "<p>Most projects do not fail from a lack of effort. They fail because the next action is unclear. A one-page system fixes that with three sections: what matters this week, what is blocked, and what is done.</p><h3>Keep it brutally short</h3><p>If the page needs scrolling, it is too long. Write outcomes, not activity. “Audit live” beats “work on SEO”.</p><h3>Review at the same time daily</h3><p>Ten quiet minutes in the morning remove the need for constant context switching. The page becomes the single source of truth.</p><blockquote>Clarity is a feature. Protect it.</blockquote>"
  },
  {
    tag: "AI TOOLS",
    t: "How to choose an AI tool without collecting twenty of them",
    meta: "5 min read",
    body: "<p>Start with the task, not the tool. Name the exact job — rewrite a proposal, summarise research, clean a transcript — then try two tools and keep the one that fits the workflow.</p><h3>Three tests</h3><ul><li>Does it save real time this week?</li><li>Does the output need heavy rewriting?</li><li>Does it fit the budget without stress?</li></ul><p>If a tool fails two of three, retire it. A small stack used daily beats a large one opened once.</p>"
  },
  {
    tag: "FREELANCING",
    t: "A better first line for every client proposal",
    meta: "4 min read",
    body: "<p>Open with what you noticed about their business, not your biography. One specific observation proves you read the brief and makes the rest of the proposal feel earned.</p><h3>Then keep the structure tight</h3><p>Observation, plan, price, next step. Four short blocks. Clients can say yes without rereading.</p><p>Send it quickly, follow up once, and move on. Volume with quality is the only reliable pipeline.</p>"
  }
];

const STEPS = [
  { t: "Find the right tool", d: "Search the catalog by name, tag or category and open the best fit in a new tab." },
  { t: "Turn it into a system", d: "Save the steps that work, repeat them weekly, and remove anything that adds friction." },
  { t: "Learn in public", d: "Write short notes from real work. They become your portfolio, your teaching material and your archive." },
  { t: "Ship and iterate", d: "Publish before it feels perfect, listen to feedback, and improve the next version." }
];

const PROFILE = {
  email: "Polash@programmer.net",
  whatsapp: "https://wa.me/8801723328481"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

const state = {
  q: "",
  cat: "All",
  lang: localStorage.getItem("polash-lang") || "bn"
};

function applyLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem("polash-lang", lang);
  $$("[data-en][data-bn]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });
  $$("[data-en-placeholder]").forEach((el) => {
    el.placeholder = el.dataset[lang + "Placeholder"] || el.placeholder;
  });
  $("#langBtn").textContent = lang === "bn" ? "EN" : "বাং";
  renderTools();
  renderArticles();
  renderSteps();
}

function toast(message, kind) {
  const node = document.createElement("div");
  node.className = "toast" + (kind === "err" ? " err" : "");
  node.textContent = message;
  $("#toasts").appendChild(node);
  setTimeout(() => {
    node.classList.add("out");
    setTimeout(() => node.remove(), 300);
  }, 2800);
}

function renderTools() {
  const term = state.q.trim().toLowerCase();
  const list = TOOLS.filter((tool) => {
    const matchCat = state.cat === "All" || tool.c === state.cat;
    const text = (tool.n + " " + tool.c + " " + tool.d).toLowerCase();
    return matchCat && (!term || text.indexOf(term) > -1);
  });
  $("#toolGrid").innerHTML = list.map((tool) => {
    return '<article class="card reveal visible">' +
      '<div class="card-top"><span class="card-icon">' + esc(tool.n.charAt(0)) + '</span><span class="badge">' + esc(tool.b) + '</span></div>' +
      '<h3>' + esc(tool.n) + '</h3>' +
      '<p>' + esc(tool.d) + '</p>' +
      '<a class="card-link" href="' + esc(tool.u) + '" target="_blank" rel="noopener">' +
      (state.lang === "bn" ? "টুল খুলুন" : "Open tool") +
      '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg></a>' +
      '</article>';
  }).join("");
  $("#toolEmpty").hidden = list.length > 0;
}

function renderChips() {
  const cats = ["All"].concat(Array.from(new Set(TOOLS.map((tool) => tool.c))));
  $("#categoryChips").innerHTML = cats.map((cat) => {
    const label = cat === "All" ? (state.lang === "bn" ? "সব" : "All") : cat;
    return '<button type="button" class="chip' + (state.cat === cat ? " active" : "") + '" data-cat="' + esc(cat) + '">' + esc(label) + '</button>';
  }).join("");
  $$("#categoryChips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.cat = chip.dataset.cat;
      renderChips();
      renderTools();
    });
  });
}

function renderArticles() {
  $("#articleGrid").innerHTML = ARTICLES.map((article, index) => {
    return '<article class="card reveal visible" data-article="' + index + '">' +
      '<div class="card-top"><span class="badge">' + esc(article.tag) + '</span><span class="article-meta">' + esc(article.meta) + '</span></div>' +
      '<h3>' + esc(article.t) + '</h3>' +
      '<p>' + (state.lang === "bn" ? "সংক্ষিপ্ত, ব্যবহারিক প্লেবুক — কাজের অভিজ্ঞতা থেকে।" : "A short, practical playbook from real work.") + '</p>' +
      '<span class="card-link">' + (state.lang === "bn" ? "পড়ুন" : "Read article") +
      '<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></span>' +
      '</article>';
  }).join("");
  $$("[data-article]").forEach((card) => {
    card.addEventListener("click", () => {
      const article = ARTICLES[Number(card.dataset.article)];
      openModal(article.t, article.body);
    });
  });
}

function renderSteps() {
  $("#timeline").innerHTML = STEPS.map((step) => {
    return '<li><div><b>' + esc(step.t) + '</b><span>' + esc(step.d) + '</span></div></li>';
  }).join("");
}

function openModal(title, body) {
  const root = $("#modalRoot");
  root.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
    '<div class="modal-head"><h2>' + esc(title) + '</h2><button class="modal-close" type="button" aria-label="Close">&times;</button></div>' +
    '<div class="modal-body">' + body + '</div>' +
    '<div class="modal-foot"><button class="btn btn-ghost modal-close" type="button">' + (state.lang === "bn" ? "বন্ধ করুন" : "Close") + '</button></div>' +
    '</div>';
  root.classList.add("open");
  root.setAttribute("aria-hidden", "false");
  $$(".modal-close", root).forEach((button) => button.addEventListener("click", closeModal));
  $(".modal-close", root).focus();
}

function closeModal() {
  const root = $("#modalRoot");
  root.classList.remove("open");
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = "";
}

$("#modalRoot").addEventListener("click", (event) => {
  if (event.target.id === "modalRoot") closeModal();
});

function formValues() {
  return {
    name: $("#cName").value.trim(),
    email: $("#cEmail").value.trim(),
    need: $("#cNeed").value,
    message: $("#cMsg").value.trim()
  };
}

function validate(values) {
  if (!values.name || !values.message || !/^\S+@\S+\.\S+$/.test(values.email)) {
    toast(state.lang === "bn" ? "নাম, বৈধ ইমেইল ও বার্তা দিন।" : "Enter your name, a valid email and a message.", "err");
    return false;
  }
  return true;
}

function messageText(values) {
  return "Name: " + values.name + "\nEmail: " + values.email + "\nNeed: " + values.need + "\n\n" + values.message;
}

$("#sendWhatsApp").addEventListener("click", () => {
  const values = formValues();
  if (!validate(values)) return;
  window.open(PROFILE.whatsapp + "?text=" + encodeURIComponent(messageText(values)), "_blank", "noopener");
  $("#formStatus").textContent = state.lang === "bn" ? "WhatsApp খুলছে…" : "Opening WhatsApp…";
});

$("#sendEmail").addEventListener("click", () => {
  const values = formValues();
  if (!validate(values)) return;
  location.href = "mailto:" + PROFILE.email + "?subject=" + encodeURIComponent("Project inquiry — " + values.need) + "&body=" + encodeURIComponent(messageText(values));
  $("#formStatus").textContent = state.lang === "bn" ? "ইমেইল অ্যাপ খুলছে…" : "Opening your email app…";
});

$("#contactForm").addEventListener("submit", (event) => event.preventDefault());

$("#langBtn").addEventListener("click", () => {
  applyLang(state.lang === "bn" ? "en" : "bn");
});

$("#themeBtn").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("polash-theme", next);
  toast(next === "dark" ? (state.lang === "bn" ? "ডার্ক থিম" : "Dark theme") : (state.lang === "bn" ? "লাইট থিম" : "Light theme"));
});

$("#navToggle").addEventListener("click", () => {
  const open = $("#navLinks").classList.toggle("open");
  $("#navToggle").setAttribute("aria-expanded", String(open));
});

$$("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    $("#navLinks").classList.remove("open");
    $("#navToggle").setAttribute("aria-expanded", "false");
  });
});

$("#toolSearch").addEventListener("input", (event) => {
  state.q = event.target.value;
  renderTools();
});

$("#fabToggle").addEventListener("click", () => {
  const open = $("#fab").classList.toggle("open");
  $("#fabToggle").setAttribute("aria-expanded", String(open));
});

$("#topBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  $("#fab").classList.remove("open");
});

$("#shareBtn").addEventListener("click", () => {
  const data = { title: "Polash AI OS", text: "Build • Learn • Earn • Grow", url: location.href };
  if (navigator.share) {
    navigator.share(data).catch(() => {});
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(data.url).then(() => toast(state.lang === "bn" ? "লিংক কপি হয়েছে" : "Link copied"));
  } else {
    toast(state.lang === "bn" ? "শেয়ার করা যায়নি" : "Could not copy link", "err");
  }
  $("#fab").classList.remove("open");
});

let installEvent = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installEvent = event;
  $("#installBtn").hidden = false;
});

$("#installBtn").addEventListener("click", async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice;
  installEvent = null;
  $("#installBtn").hidden = true;
  $("#fab").classList.remove("open");
});

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
  $("#scrollProgress").style.width = value + "%";
}, { passive: true });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    $("#navLinks").classList.remove("open");
    $("#fab").classList.remove("open");
  }
  if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
    event.preventDefault();
    $("#toolSearch").focus();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
$$(".reveal:not(.visible)").forEach((el) => observer.observe(el));

document.documentElement.dataset.theme = localStorage.getItem("polash-theme") || "dark";
$("#year").textContent = new Date().getFullYear();
renderChips();
applyLang(state.lang);

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
