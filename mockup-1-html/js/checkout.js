/* ============================================================
   checkout.js — dummy Stripe checkout (§5.2).
   Reads the cart, renders the summary, validates card fields,
   simulates processing, stores the order, clears the cart.
   No SDK, no network. Nothing is charged.
   ============================================================ */
import { PRODUCTS, getProduct, formatRM2 } from "./products.js";

const CART_KEY = "vs-cart-a";
const ORDER_KEY = "vs-last-order-a";

/* ---------- card brand icons ---------- */
const BRANDS = {
  visa: `<svg viewBox="0 0 48 32" width="32" height="20"><rect width="48" height="32" rx="4" fill="#1A1F71"/><text x="24" y="21" font-family="Arial" font-size="12" font-weight="700" fill="#fff" text-anchor="middle" font-style="italic">VISA</text></svg>`,
  mastercard: `<svg viewBox="0 0 48 32" width="32" height="20"><rect width="48" height="32" rx="4" fill="#fff" stroke="#E6E6E6"/><circle cx="20" cy="16" r="9" fill="#EB001B"/><circle cx="28" cy="16" r="9" fill="#F79E1B" fill-opacity="0.85"/></svg>`,
  amex: `<svg viewBox="0 0 48 32" width="32" height="20"><rect width="48" height="32" rx="4" fill="#2E77BC"/><text x="24" y="20" font-family="Arial" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">AMEX</text></svg>`,
};

/* ---------- cart ---------- */
function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    if (parsed && Array.isArray(parsed.items)) {
      return parsed.items.filter((it) => getProduct(it.id)).map((it) => ({ id: it.id, qty: Math.max(1, it.qty | 0) }));
    }
  } catch (e) {}
  return [];
}

let items = readCart();

function total() {
  return items.reduce((sum, it) => sum + getProduct(it.id).price * it.qty, 0);
}

/* ---------- render summary ---------- */
function renderSummary() {
  const linesEl = document.getElementById("co-lines");
  const t = total();
  document.getElementById("co-amount").textContent = formatRM2(t);
  document.getElementById("co-total").textContent = formatRM2(t);
  document.getElementById("co-pay-label").textContent = `Pay ${formatRM2(t)}`;

  if (items.length === 0) {
    linesEl.innerHTML = `<p style="padding:16px 0;color:#6B7280;font-size:14px;">Your cart is empty. <a href="shop.html" style="color:#635BFF;">Back to the shop →</a></p>`;
    const pay = document.getElementById("co-pay");
    pay.disabled = true;
    pay.style.opacity = ".5";
    return;
  }

  linesEl.innerHTML = items.map((it) => {
    const p = getProduct(it.id);
    const thumb = `<div class="co-line-thumb"></div>`;
    return `
      <div class="co-line">
        ${thumb}
        <div class="co-line-main">
          <div class="co-line-name">${p.name}</div>
          <div class="co-line-qty">Qty ${it.qty}</div>
        </div>
        <div class="co-line-price">${formatRM2(p.price * it.qty)}</div>
      </div>`;
  }).join("");
}

/* ---------- input formatting ---------- */
const cardNumberEl = document.getElementById("card-number");
const cardExpEl = document.getElementById("card-exp");
const cardCvcEl = document.getElementById("card-cvc");
const brandEl = document.getElementById("card-brand");

function detectBrand(digits) {
  if (digits.startsWith("4")) return "visa";
  if (digits.startsWith("5") || digits.startsWith("2")) return "mastercard";
  if (digits.startsWith("3")) return "amex";
  return null;
}

cardNumberEl.addEventListener("input", () => {
  let digits = cardNumberEl.value.replace(/\D/g, "").slice(0, 16);
  cardNumberEl.value = digits.replace(/(.{4})/g, "$1 ").trim();
  const brand = detectBrand(digits);
  brandEl.innerHTML = brand ? BRANDS[brand] : "";
});

cardExpEl.addEventListener("input", () => {
  let d = cardExpEl.value.replace(/\D/g, "").slice(0, 4);
  cardExpEl.value = d.length >= 3 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
});

cardCvcEl.addEventListener("input", () => {
  cardCvcEl.value = cardCvcEl.value.replace(/\D/g, "").slice(0, 4);
});

/* ---------- validation helpers ---------- */
function setError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  field.classList.add("has-error");
  if (msg) {
    const err = field.querySelector(".co-error");
    if (err) err.textContent = msg;
  }
}
function clearError(fieldId) {
  document.getElementById(fieldId).classList.remove("has-error");
}
["f-email", "f-card", "f-name"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () => clearError(id));
});

function validate() {
  let ok = true;
  ["f-email", "f-card", "f-name"].forEach(clearError);

  const email = document.getElementById("email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("f-email", "Please enter a valid email address."); ok = false; }

  const digits = cardNumberEl.value.replace(/\D/g, "");
  if (digits === "4000000000000002") {
    setError("f-card", "Your card was declined.");
    ok = false;
  } else if (digits.length < 15) {
    setError("f-card", "Your card number is incomplete.");
    ok = false;
  } else {
    // expiry
    const exp = cardExpEl.value.replace(/\D/g, "");
    if (exp.length < 4) { setError("f-card", "Your card's expiry date is incomplete."); ok = false; }
    else {
      const mm = parseInt(exp.slice(0, 2), 10);
      const yy = parseInt(exp.slice(2), 10);
      const now = new Date();
      const curY = now.getFullYear() % 100;
      const curM = now.getMonth() + 1;
      if (mm < 1 || mm > 12) { setError("f-card", "Your card's expiry month is invalid."); ok = false; }
      else if (yy < curY || (yy === curY && mm < curM)) { setError("f-card", "Your card's expiry date is in the past."); ok = false; }
      else if (cardCvcEl.value.length < 3) { setError("f-card", "Your card's security code is incomplete."); ok = false; }
    }
  }

  const name = document.getElementById("card-name").value.trim();
  if (!name) { setError("f-name", "Please enter the name on your card."); ok = false; }

  return ok;
}

/* ---------- submit ---------- */
document.getElementById("co-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (items.length === 0) return;
  if (!validate()) return;

  const pay = document.getElementById("co-pay");
  const label = document.getElementById("co-pay-label");
  pay.disabled = true;
  pay.innerHTML = `<span class="co-spinner" aria-hidden="true"></span><span>Processing…</span>`;

  setTimeout(() => {
    const order = {
      ref: "VS-2026-" + String(Date.now()).slice(-4),
      items: items.map((it) => ({ id: it.id, qty: it.qty })),
      total: total(),
      email: document.getElementById("email").value.trim(),
      date: new Date().toISOString(),
    };
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      localStorage.removeItem(CART_KEY);
    } catch (err) {}
    window.location.href = "success.html";
  }, 1800);
});

/* ---------- banner dismiss ---------- */
document.getElementById("co-banner-close").addEventListener("click", () => {
  document.getElementById("co-banner").style.display = "none";
});

renderSummary();
