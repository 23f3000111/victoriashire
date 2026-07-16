/* ============================================================
   product.js — renders a single product from ?id=, with qty
   stepper, add-to-cart, category note, and a related row.
   Unknown id → friendly empty state with Percy.
   ============================================================ */
import { PRODUCTS, getProduct, formatRM, productTint, NOTE_COURSE, NOTE_GOODIE } from "./products.js";
import { goodieSVG } from "./goodie-art.js";

const mount = document.getElementById("product-mount");
const params = new URLSearchParams(location.search);
const id = params.get("id");
const product = getProduct(id);

function art(p, lazy = false) {
  return p.image
    ? `<img src="assets/img/${p.image}" alt="${p.name}"${lazy ? ' loading="lazy"' : ""}>`
    : goodieSVG(p.id);
}

function media(p) {
  const badge = p.badge ? `<span class="product-badge${p.badge === "New" ? " product-badge--new" : ""}">${p.badge}</span>` : "";
  return `<div class="product-media product-media--${productTint(p.id)}">${badge}${art(p)}</div>`;
}

function relatedCard(p) {
  return `
    <article class="shop-card">
      <a class="card-link" href="product.html?id=${p.id}">
        <div class="shop-card-media shop-card-media--${productTint(p.id)}">${art(p, true)}</div>
        <h3>${p.name}</h3>
      </a>
      <div class="card-meta">
        <span class="chip">${p.category === "course" ? p.age : "Goodie"}</span>
        <span class="price">${formatRM(p.price)}</span>
      </div>
      <button class="btn btn-primary btn-sm" type="button" data-add="${p.id}">Add to cart</button>
    </article>`;
}

function relatedList(p) {
  const same = PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category);
  const others = PRODUCTS.filter((x) => x.id !== p.id && x.category !== p.category);
  return [...same, ...others].slice(0, 3);
}

function renderEmpty() {
  document.title = "Not found — Victoriashire shop";
  mount.innerHTML = `
    <div class="empty-state">
      <h1 class="h-title">We couldn't find that item.</h1>
      <p>It may have been removed, or the link is out of date.</p>
      <a class="btn btn-primary" href="shop.html">Back to the school shop</a>
    </div>`;
}

function renderProduct(p) {
  document.title = `${p.name} — Victoriashire shop`;
  const chips = [];
  if (p.age) chips.push(`<span class="chip">${p.age}</span>`);
  if (p.schedule) chips.push(`<span class="chip">${p.schedule}</span>`);
  const note = p.category === "course" ? NOTE_COURSE : NOTE_GOODIE;
  const details = p.details.map((d) => `<p>${d}</p>`).join("");

  mount.innerHTML = `
    <nav class="crumbs" aria-label="Breadcrumb"><a href="shop.html" class="arrow-link"><span class="arw" style="transform:rotate(180deg)">→</span> Back to the shop</a></nav>
    <div class="product-layout">
      ${media(p)}
      <div class="product-info">
        <h1>${p.name}</h1>
        <div class="product-chips">${chips.join("")}</div>
        <p class="product-price">${formatRM(p.price)}</p>
        <div class="product-details">${details}</div>
        <p class="product-note">${note}</p>
        <div class="qty-stepper">
          <span style="font-weight:700;">Quantity</span>
          <div class="qbox">
            <button class="qbtn" type="button" id="p-minus" aria-label="Decrease quantity">−</button>
            <span class="qval" id="p-qty" aria-live="polite">1</span>
            <button class="qbtn" type="button" id="p-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary" type="button" id="p-add">Add to cart</button>
          <a class="btn btn-ghost" href="shop.html">Keep browsing</a>
        </div>
      </div>
    </div>
    <section class="related-row">
      <div class="sec-head"><p class="eyebrow">While you're here</p><h2 class="h-title">You might also like.</h2></div>
      <div class="shop-grid">${relatedList(p).map(relatedCard).join("")}</div>
    </section>`;

  // qty stepper
  let qty = 1;
  const qtyEl = document.getElementById("p-qty");
  document.getElementById("p-minus").addEventListener("click", () => { qty = Math.max(1, qty - 1); qtyEl.textContent = qty; });
  document.getElementById("p-plus").addEventListener("click", () => { qty += 1; qtyEl.textContent = qty; });
  document.getElementById("p-add").addEventListener("click", () => {
    if (window.vsCart) window.vsCart.add(p.id, qty);
  });
}

if (product) renderProduct(product); else renderEmpty();

/* crumb style (tiny, page-local) */
const style = document.createElement("style");
style.textContent = `.crumbs{margin-bottom:1.4rem;} .crumbs .arrow-link .arw{display:inline-block;}`;
document.head.appendChild(style);
