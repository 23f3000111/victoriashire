/* ============================================================
   shop.js — renders the shop grid + filter pills (no reload).
   ============================================================ */
import { PRODUCTS, formatRM, productTint } from "./products.js";

function cardMedia(p) {
  const badge = p.badge
    ? `<span class="shop-badge${p.badge === "New" ? " shop-badge--new" : ""}">${p.badge}</span>`
    : "";
  const initial = p.name.trim().charAt(0).toUpperCase();
  return `<div class="shop-card-media shop-card-media--${productTint(p.id)}">${badge}<span class="shop-monogram">${initial}</span></div>`;
}

function card(p) {
  const meta = p.category === "course"
    ? `<span class="chip">${p.age}</span>`
    : `<span class="chip">Goodie</span>`;
  return `
    <article class="shop-card reveal" data-category="${p.category}">
      <a class="card-link" href="product.html?id=${p.id}">
        ${cardMedia(p)}
        <h3>${p.name}</h3>
      </a>
      <div class="card-meta">
        ${meta}
        <span class="price">${formatRM(p.price)}</span>
      </div>
      <button class="btn btn-primary btn-sm" type="button" data-add="${p.id}">Add to cart</button>
    </article>`;
}

function render(filter) {
  const grid = document.getElementById("shop-grid");
  if (!grid) return;
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  grid.innerHTML = list.map(card).join("");
  // reveal immediately (grid is below the fold sometimes; keep it simple)
  grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
}

function initShop() {
  render("all");
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.setAttribute("aria-pressed", "false"));
      pill.setAttribute("aria-pressed", "true");
      render(pill.dataset.filter);
    });
  });
}

initShop();
