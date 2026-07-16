/* ============================================================
   main.js — shared shell (header, footer, mobile nav),
   hide-on-scroll, reveal animations, marquee helper.
   Loaded as an ES module on every page.
   GSAP + ScrollTrigger are global (classic <script> tags).
   ============================================================ */

import { initCart } from './cart.js';
import { hydrateGoodieArt } from './goodie-art.js';
import { initWhatsAppBot } from './whatsapp-bot.js';

document.documentElement.classList.remove('no-js');

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof window.gsap !== 'undefined';
if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

/* ---------- nav model ---------- */
const NAV = [
  ['Home', 'index.html'],
  ['About', 'about.html'],
  ['Programmes', 'programmes.html'],
  ['Admissions', 'admissions.html'],
  ['Shop', 'shop.html'],
  ['Contact', 'contact.html'],
];

const currentFile = (() => {
  const p = location.pathname.split('/').pop();
  return p && p.length ? p : 'index.html';
})();

const svgBasket = `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 10.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M8.5 8 12 3l3.5 5"/><path d="M9.5 12v3M14.5 12v3"/></svg>`;
const svgMenu = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`;
const svgClose = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`;

/* ---------- build header ---------- */
function buildHeader() {
  const mount = document.getElementById('site-header');
  if (!mount) return;

  const links = NAV.map(([label, href]) => {
    const active = href === currentFile ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');

  const mobileLinks = NAV.map(([label, href]) => {
    const active = href === currentFile ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');

  mount.className = 'site-header';
  mount.innerHTML = `
    <div class="topbar">
      <div class="container topbar-in">
        <span class="topbar-note">Enrolling now for 2026 · two campuses in Puchong &amp; Putra Heights</span>
        <span class="topbar-links">
          <a href="tel:+60122692488">+60 12-269 2488</a>
          <a href="https://wa.me/60122692488" target="_blank" rel="noopener">Book a tour</a>
        </span>
      </div>
    </div>
    <div class="header-bar">
      <div class="container header-in">
        <a class="header-logo" href="index.html" aria-label="Victoriashire — home">
          <img src="assets/img/logo-preschool.avif" alt="Victoriashire International Preschool and Kindergarten logo" width="477" height="88">
        </a>
        <nav class="header-nav" aria-label="Primary">${links}</nav>
        <a target="_blank" rel="noopener" class="btn btn-primary btn-sm header-cta" href="https://wa.me/60122692488">Book a tour</a>
        <button class="cart-btn" id="cart-open-btn" type="button" aria-label="Open cart, 0 items">
          ${svgBasket}
          <span class="cart-count" id="cart-count" aria-hidden="true">0</span>
        </button>
        <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
          ${svgMenu}
        </button>
      </div>
    </div>`;

  // Mobile overlay must live on <body> — a transformed header creates a
  // containing block that would trap a position:fixed child.
  const overlay = document.createElement('nav');
  overlay.className = 'mobile-nav';
  overlay.id = 'mobile-nav';
  overlay.setAttribute('aria-label', 'Mobile');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <button class="close-btn" id="nav-close" type="button" aria-label="Close menu">${svgClose}</button>
    ${mobileLinks}
    <p class="m-contact">WhatsApp Ms. Chui · +60 12-269 2488</p>`;
  document.body.appendChild(overlay);

  wireMobileNav();
  // header is position:sticky (topbar scrolls away, nav bar stays) — no JS needed
}

function wireMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const closeBtn = document.getElementById('nav-close');
  const overlay = document.getElementById('mobile-nav');
  if (!toggle || !overlay) return;

  const open = () => {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  const close = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  };
  toggle.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
}

function wireHideOnScroll(header) {
  const setY = gsap.quickTo(header, 'y', { duration: 0.4, ease: 'power3.out' });
  let last = window.scrollY;
  let hidden = false;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const goingDown = y > last && y > 140;
    if (goingDown && !hidden) { setY(-140); hidden = true; }
    else if (!goingDown && hidden) { setY(0); hidden = false; }
    last = y;
  }, { passive: true });
}

/* ---------- build footer ---------- */
function buildFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  mount.className = 'site-footer';
  mount.innerHTML = `
    <div class="footer-body">
      <div class="container footer-grid">
        <div class="footer-brand">
          <span class="footer-wordmark">Victoriashire</span>
          <p>An international preschool, kindergarten and music school in Puchong — Canadian curriculum standards, Montessori-inspired, ages four months to seventeen.</p>
          <p class="footer-lang trilingual">English <span class="sep">·</span> 中文 <span class="sep">·</span> Bahasa Melayu</p>
        </div>
        <div class="footer-col">
          <h4>Visit us</h4>
          <p><strong>Puchong (HQ)</strong><br>No. 18, Jalan Puteri 7/15, Bandar Puteri, 47100 Puchong, Selangor</p>
          <p><strong>Putra Heights</strong><br>1-2, Jalan Putra Mahkota 7/5C, Pusat Bandar Putra Point, 47650 Subang Jaya, Selangor</p>
        </div>
        <div class="footer-col">
          <h4>Hours &amp; hello</h4>
          <p>Mon–Fri 8am–6pm<br>Sat 9am–5pm<br>Closed Sun &amp; public holidays</p>
          <p><a href="https://wa.me/60122692488">WhatsApp +60 12-269 2488</a></p>
          <p><a href="mailto:cherry@victoriashire.edu.my">cherry@victoriashire.edu.my</a></p>
          <p><a href="https://www.instagram.com/victoriashire_school" rel="noopener">@victoriashire_school</a></p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="programmes.html">Programmes</a></li>
            <li><a href="admissions.html">Admissions</a></li>
            <li><a href="shop.html">School shop</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        © 2026 Victoriashire International Education Group · Design mockup — payments are simulated.
      </div>
    </div>`;
}

/* ---------- reveal animations ---------- */
function initReveals() {
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  const scatterEls = Array.from(document.querySelectorAll('.reveal-scatter'));

  // scatter items get a random start rotation
  scatterEls.forEach(el => {
    const rot = (Math.random() * 12 - 6).toFixed(1);
    el.dataset.rot = rot;
    if (!REDUCE) el.style.transform = `translateY(24px) rotate(${rot}deg)`;
  });

  if (REDUCE || !hasGSAP || !window.ScrollTrigger) {
    // IntersectionObserver fallback → add .is-in (CSS handles it)
    if ('IntersectionObserver' in window && !REDUCE) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      [...revealEls, ...scatterEls].forEach(el => io.observe(el));
    } else {
      [...revealEls, ...scatterEls].forEach(el => { el.classList.add('is-in'); el.style.transform = 'none'; });
    }
    return;
  }

  // GSAP ScrollTrigger batches
  ScrollTrigger.batch(revealEls, {
    start: 'top 88%',
    onEnter: batch => gsap.to(batch, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out',
      onComplete: () => batch.forEach(el => el.classList.add('is-in')),
    }),
  });
  ScrollTrigger.batch(scatterEls, {
    start: 'top 90%',
    onEnter: batch => gsap.to(batch, {
      opacity: 1, y: 0, rotate: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      onComplete: () => batch.forEach(el => el.classList.add('is-in')),
    }),
  });
}

/* ---------- animated counters ([data-count]) ---------- */
function initCounters() {
  const els = Array.from(document.querySelectorAll('[data-count]'));
  if (!els.length) return;

  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (REDUCE || !hasGSAP) { el.textContent = target + suffix; return; }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.4, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
    });
  };

  if (hasGSAP && window.ScrollTrigger && !REDUCE) {
    els.forEach((el) => ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true, onEnter: () => run(el),
    }));
  } else if ('IntersectionObserver' in window && !REDUCE) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach(run);
  }
}

/* ---------- accordion (admissions FAQ) ---------- */
function initAccordion() {
  document.querySelectorAll('.accordion').forEach(acc => {
    const btns = acc.querySelectorAll('.acc-btn');
    btns.forEach(btn => {
      const panel = btn.nextElementSibling;
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        panel.style.maxHeight = open ? '0' : panel.scrollHeight + 'px';
      });
    });
  });
}

/* ---------- step spine draw-in (admissions) ---------- */
function initStepSpine() {
  const line = document.querySelector('.spine-line');
  if (!line) return;
  if (REDUCE || !('IntersectionObserver' in window)) { line.classList.add('drawn'); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { line.classList.add('drawn'); io.disconnect(); } });
  }, { threshold: 0.15 });
  io.observe(line.parentElement);
}

/* ---------- marquee helper (duplicate track for seamless loop) ---------- */
function initMarquees() {
  document.querySelectorAll('.js-marquee').forEach(m => {
    const track = m.querySelector('.marquee-track');
    if (!track || track.dataset.doubled) return;
    track.dataset.doubled = '1';
    // duplicate the children within the same track so translateX(-50%) loops seamlessly
    Array.from(track.children).forEach(node => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });
}

/* ---------- letter-pop headlines (Puzzle Pop) ---------- */
function initLetterPop() {
  document.querySelectorAll('.h-hero').forEach(h => {
    if (h.dataset.split) return;
    h.dataset.split = '1';
    const text = h.textContent;
    h.setAttribute('aria-label', text);
    const words = text.trim().split(/\s+/);
    // highlight the longest word with the four logo colours
    const hlIdx = words.reduce((best, w, i) => w.length > words[best].length ? i : best, 0);
    let i = 0;
    h.textContent = '';
    words.forEach((w, wi) => {
      const wordEl = document.createElement('span');
      wordEl.className = 'w' + (wi === hlIdx ? ' w-hl' : '');
      wordEl.setAttribute('aria-hidden', 'true');
      [...w].forEach(ch => {
        const l = document.createElement('span');
        l.className = 'l';
        l.style.setProperty('--i', i++);
        l.textContent = ch;
        wordEl.appendChild(l);
      });
      h.appendChild(wordEl);
      if (wi < words.length - 1) h.appendChild(document.createTextNode(' '));
    });
    h.classList.add('split-ltr');
  });
}

/* ---------- floating jigsaw pieces in heroes ---------- */
function initFloatPieces() {
  const spots = [
    ['fp-sun',   '12%', '58%', '6.2s', '.55'],
    ['fp-sky',   '6%',  '38%', '7.4s', '.5'],
    ['fp-poppy', '78%', '6%',  '8.1s', '.6'],
    ['fp-grape', '86%', '80%', '6.8s', '.5'],
  ];
  document.querySelectorAll('.home-hero, .page-intro, .visit-band').forEach(host => {
    if (host.dataset.pieces) return;
    host.dataset.pieces = '1';
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    spots.forEach(([cls, top, left, dur, scale]) => {
      const s = document.createElement('span');
      s.className = `float-piece ${cls}`;
      s.setAttribute('aria-hidden', 'true');
      s.style.top = top;
      s.style.left = left;
      s.style.setProperty('--fd', dur);
      s.style.width = s.style.height = `calc(52px * ${1 + Number(scale) * .5})`;
      s.style.opacity = '.9';
      host.appendChild(s);
    });
    // a couple of spinning stars between the pieces
    [['30%', '8%', '11s'], ['58%', '92%', '9s']].forEach(([top, left, dur]) => {
      const st = document.createElement('span');
      st.className = 'float-star';
      st.setAttribute('aria-hidden', 'true');
      st.style.top = top;
      st.style.left = left;
      st.style.setProperty('--fd', dur);
      host.appendChild(st);
    });
  });
}

/* ---------- rainbow scroll progress bar ---------- */
function initProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- squiggle underlines draw in on scroll ---------- */
function initSquiggles() {
  const heads = document.querySelectorAll('.sec-head');
  if (REDUCE || !('IntersectionObserver' in window)) {
    heads.forEach(h => h.classList.add('squiggle-in'));
    return;
  }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('squiggle-in'); io.unobserve(e.target); }
  }), { threshold: 0.3 });
  heads.forEach(h => io.observe(h));
}

/* ---------- lightbox for notice-board posters & polaroids ---------- */
function initLightbox() {
  const SELECTOR = '.notice-pin img, .polaroid img';
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Image viewer');
  box.innerHTML = `
    <button class="lb-close" type="button" aria-label="Close">✕</button>
    <button class="lb-prev" type="button" aria-label="Previous image">‹</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lb-next" type="button" aria-label="Next image">›</button>`;
  document.body.appendChild(box);

  const imgEl = box.querySelector('img');
  const capEl = box.querySelector('figcaption');
  let list = [];
  let idx = 0;

  const show = (i) => {
    idx = (i + list.length) % list.length;
    imgEl.src = list[idx].src;
    imgEl.alt = list[idx].alt || '';
    capEl.textContent = list[idx].alt || '';
  };
  const openBox = (target) => {
    const seen = new Set();
    list = Array.from(document.querySelectorAll(SELECTOR))
      .filter(im => !seen.has(im.src) && seen.add(im.src));
    const i = list.findIndex(im => im.src === target.src);
    show(i < 0 ? 0 : i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeBox = () => {
    box.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const im = e.target.closest(SELECTOR);
    if (im) { e.preventDefault(); openBox(im); }
  });
  box.querySelector('.lb-close').addEventListener('click', closeBox);
  box.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  box.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  box.addEventListener('click', (e) => { if (e.target === box) closeBox(); });
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') closeBox();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
}

/* ---------- boot ---------- */
buildHeader();
buildFooter();
initCart();
hydrateGoodieArt();
initReveals();
initMarquees();
initCounters();
initAccordion();
initStepSpine();
initWhatsAppBot();

// refresh ScrollTrigger once fonts settle (layout shift)
if (hasGSAP && window.ScrollTrigger && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

// delegated add-to-cart (home teaser, shop grid, etc.)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add]');
  if (btn && window.vsCart) {
    e.preventDefault();
    window.vsCart.add(btn.dataset.add);
  }
});

// let cart.js know the shell exists
document.dispatchEvent(new CustomEvent('shell:ready'));

export { initReveals, initMarquees, REDUCE, hasGSAP };
