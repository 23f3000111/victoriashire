/* ============================================================
   success.js — renders the confirmed (simulated) order (§5.3).
   ============================================================ */
import { getProduct, formatRM2 } from "./products.js";

const ORDER_KEY = "vs-last-order-a";
const mount = document.getElementById("success-mount");

let order = null;
try { order = JSON.parse(localStorage.getItem(ORDER_KEY) || "null"); } catch (e) {}

// escape user-supplied text (the email) before it touches innerHTML
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const check = `
  <svg class="success-check" viewBox="0 0 100 100" role="img" aria-label="Payment confirmed">
    <circle cx="50" cy="50" r="46"/>
    <path d="M28 52 l14 14 l30 -32"/>
  </svg>`;

if (!order || !order.items || !order.items.length) {
  mount.innerHTML = `
    <div class="success-wrap">
      <h1 class="h-hero">Nothing to confirm yet.</h1>
      <p class="success-note">Looks like you landed here without checking out. That's fine — the shop's just through here.</p>
      <div class="success-actions">
        <a class="btn btn-primary" href="shop.html">Back to the shop</a>
      </div>
    </div>`;
} else {
  const lines = order.items.map((it) => {
    const p = getProduct(it.id);
    const name = p ? p.name : it.id;
    const price = p ? p.price * it.qty : 0;
    return `<div class="order-line"><span>${name} <span style="color:var(--ink-soft)">× ${it.qty}</span></span><span class="price">${formatRM2(price)}</span></div>`;
  }).join("");

  mount.innerHTML = `
    <div class="success-wrap">
      ${check}
      <h1 class="h-hero">Paid and confirmed</h1>
      <span class="success-ref">Order ${order.ref}</span>
      <div class="order-card">
        ${lines}
        <div class="order-total"><span>Total</span><span>${formatRM2(order.total)}</span></div>
      </div>
      <p class="success-note">This was a simulated payment — no money moved. In the real site you'd get an email receipt about now${order.email ? `, at ${esc(order.email)}` : ""}.</p>
      <div class="success-actions">
        <a class="btn btn-primary" href="shop.html">Back to the shop</a>
        <a class="btn btn-ghost" href="https://wa.me/60122692488">WhatsApp us</a>
      </div>
    </div>`;
}
