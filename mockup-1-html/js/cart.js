/* ============================================================
   cart.js — localStorage cart + slide-in drawer + header badge.
   Exposes window.vsCart for other pages (shop, product, console).
   ============================================================ */
import { PRODUCTS, getProduct, formatRM, productTint, NOTE_COURSE, NOTE_GOODIE } from "./products.js";

const KEY = "vs-cart-a";
const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let state = { items: [] };
let lastFocused = null;

/* ---------- persistence ---------- */
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) {
        // keep only ids still in the catalogue
        state.items = parsed.items
          .filter((it) => getProduct(it.id))
          .map((it) => ({ id: it.id, qty: Math.max(1, it.qty | 0) }));
      }
    }
  } catch (e) { state.items = []; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
}

/* ---------- derived ---------- */
function count() { return state.items.reduce((n, it) => n + it.qty, 0); }
function subtotal() {
  return state.items.reduce((sum, it) => {
    const p = getProduct(it.id);
    return sum + (p ? p.price * it.qty : 0);
  }, 0);
}

/* ---------- mutations ---------- */
function add(id, qty = 1) {
  const p = getProduct(id);
  if (!p) return;
  const row = state.items.find((it) => it.id === id);
  if (row) row.qty += qty;
  else state.items.push({ id, qty });
  save();
  renderBadge(true);
  renderDrawer(id);
  openDrawer();
}
function setQty(id, qty) {
  const row = state.items.find((it) => it.id === id);
  if (!row) return;
  row.qty = Math.max(1, qty | 0);
  save();
  renderBadge(true);
  renderDrawer();
}
function remove(id) {
  state.items = state.items.filter((it) => it.id !== id);
  save();
  renderBadge(true);
  renderDrawer();
}
function clear() {
  state.items = [];
  save();
  renderBadge(false);
  renderDrawer();
}

/* ---------- badge ---------- */
function renderBadge(pop) {
  const el = document.getElementById("cart-count");
  const btn = document.getElementById("cart-open-btn");
  if (!el) return;
  const n = count();
  el.textContent = n;
  el.classList.toggle("has-items", n > 0);
  if (btn) btn.setAttribute("aria-label", `Open cart, ${n} item${n === 1 ? "" : "s"}`);
  if (pop && n > 0 && !REDUCE) {
    el.classList.remove("pop");
    void el.offsetWidth; // reflow to restart animation
    el.classList.add("pop");
  }
}

/* ---------- drawer markup ---------- */
function buildDrawer() {
  let mount = document.getElementById("cart-drawer-mount");
  if (!mount) {
    mount = document.createElement("div");
    mount.id = "cart-drawer-mount";
    document.body.appendChild(mount);
  }
  mount.innerHTML = `
    <div class="cart-overlay" id="cart-overlay" hidden></div>
    <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Your cart" aria-hidden="true">
      <div class="cart-head">
        <h2 class="cart-title">Your cart</h2>
        <button class="cart-close" id="cart-close" type="button" aria-label="Close cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </div>
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-foot" id="cart-foot"></div>
    </aside>`;

  document.getElementById("cart-close").addEventListener("click", closeDrawer);
  document.getElementById("cart-overlay").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    const drawer = document.getElementById("cart-drawer");
    if (!drawer || drawer.getAttribute("aria-hidden") === "true") return;
    if (e.key === "Escape") closeDrawer();
    if (e.key === "Tab") trapTab(e, drawer);
  });
}

function thumb(p) {
  const initial = p.name.trim().charAt(0).toUpperCase();
  return `<div class="cart-thumb cart-thumb--block cart-thumb--${productTint(p.id)}">${initial}</div>`;
}

function renderDrawer(highlightId) {
  const itemsEl = document.getElementById("cart-items");
  const footEl = document.getElementById("cart-foot");
  if (!itemsEl || !footEl) return;

  if (state.items.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-art">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 10.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M8.5 8 12 3l3.5 5"/></svg>
        </div>
        <p class="cart-empty-title">Your cart is empty.</p>
        <p class="cart-empty-sub">Course trials and school essentials are in the shop.</p>
        <a class="btn btn-primary btn-sm" href="shop.html">Visit the school shop</a>
      </div>`;
    footEl.innerHTML = "";
    return;
  }

  itemsEl.innerHTML = state.items.map((it) => {
    const p = getProduct(it.id);
    const note = p.category === "course" ? NOTE_COURSE : NOTE_GOODIE;
    const hl = it.id === highlightId ? " is-added" : "";
    return `
      <div class="cart-row${hl}" data-id="${p.id}">
        ${thumb(p)}
        <div class="cart-info">
          <a class="cart-name" href="product.html?id=${p.id}">${p.name}</a>
          <p class="cart-note">${note}</p>
          <div class="cart-qty">
            <button class="qbtn qmin" type="button" aria-label="Decrease quantity of ${p.name}">−</button>
            <span class="qval" aria-live="polite">${it.qty}</span>
            <button class="qbtn qpls" type="button" aria-label="Increase quantity of ${p.name}">+</button>
            <button class="qrem" type="button" aria-label="Remove ${p.name}">Remove</button>
          </div>
        </div>
        <div class="cart-line price">${formatRM(p.price * it.qty)}</div>
      </div>`;
  }).join("");

  footEl.innerHTML = `
    <div class="cart-subtotal">
      <span>Subtotal</span>
      <span class="price cart-subtotal-val">${formatRM(subtotal())}</span>
    </div>
    <a class="btn btn-primary cart-checkout" href="checkout.html">Go to checkout</a>
    <p class="cart-demo-note">Demo checkout — no card is charged.</p>`;

  // wire row buttons
  itemsEl.querySelectorAll(".cart-row").forEach((row) => {
    const id = row.dataset.id;
    row.querySelector(".qmin").addEventListener("click", () => {
      const cur = getProduct(id) && state.items.find((i) => i.id === id);
      if (cur) setQty(id, cur.qty - 1);
    });
    row.querySelector(".qpls").addEventListener("click", () => {
      const cur = state.items.find((i) => i.id === id);
      if (cur) setQty(id, cur.qty + 1);
    });
    row.querySelector(".qrem").addEventListener("click", () => remove(id));
  });

  if (highlightId && !REDUCE) {
    const hlRow = itemsEl.querySelector(".cart-row.is-added");
    if (hlRow) setTimeout(() => hlRow.classList.remove("is-added"), 1400);
  }
}

/* ---------- open / close ---------- */
function openDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer) return;
  lastFocused = document.activeElement;
  overlay.hidden = false;
  requestAnimationFrame(() => {
    drawer.classList.add("open");
    overlay.classList.add("open");
  });
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const close = document.getElementById("cart-close");
  if (close) close.focus();
}
function closeDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer) return;
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => { overlay.hidden = true; }, 350);
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}
function trapTab(e, drawer) {
  const focusable = drawer.querySelectorAll(
    'a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ---------- boot ---------- */
export function initCart() {
  load();
  buildDrawer();
  renderBadge(false);
  renderDrawer();
  const openBtn = document.getElementById("cart-open-btn");
  if (openBtn) openBtn.addEventListener("click", openDrawer);

  window.vsCart = {
    add, remove, setQty, clear,
    open: openDrawer, close: closeDrawer,
    get: () => JSON.parse(JSON.stringify(state)),
    count, subtotal,
  };
}
