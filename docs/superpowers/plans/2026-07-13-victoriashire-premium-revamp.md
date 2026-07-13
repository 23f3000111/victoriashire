# Victoriashire Premium Revamp — Implementation Plan

> **For agentic workers:** This is a static HTML/CSS mockup build (no test framework, non-git
> folder). Per-task verification = a desktop screenshot checked against the task's acceptance
> criteria. "Checkpoint" replaces "commit." Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revamp both Victoriashire mockups from "colourful kindergarten" into two distinct
premium directions — A "Guidepost calm" (mockup-1, all 9 pages) and B "international-school
credibility" (mockup-3, homepage).

**Architecture:** mockup-1 keeps its existing multi-file CSS (`tokens/base/components/pages/
checkout.css`), JS (`main.js` injects shared header/footer; `cart/checkout/shop/product` stay
functional), and page inventory — we re-skin, not re-architect. mockup-3 is a single
`index.html` + `style.css` + `script.js`, fully rewritten to Direction B.

**Tech Stack:** Hand-written HTML/CSS/vanilla JS. Google Fonts. GSAP/ScrollTrigger already
vendored in mockup-1 (reveal animations). No build step.

## Global Constraints (verbatim from spec)

- **Retire entirely:** cartoon mascots, sun/clouds/bees/balloons/rainbow/grass-&-flowers,
  stickers & sticker wobble, washi tape, torn paper, crayon buttons, bunting, doodle arrows,
  candy tints, handwriting fonts (Chewy, Gochi Hand, Shantell Sans, Baloo 2).
- **Copy → outcomes:** confidence, independence, thinking ability, "make the most of their
  potential," "a foundation for lifelong success." No "holistic development"/"nurturing young minds."
- **Preserve real facts:** Puchong & Putra Heights, ages 4mo–17yr, Canadian curriculum
  standards, Montessori-inspired, Cambridge English, music school attached, 3 languages daily,
  care to 6.30pm, 50-year heritage, WhatsApp +60 12-269 2488.
- **Imagery:** reuse the 5 real photos (blocks, music, literacy, ballet, 50-years); fill gaps
  with cream/navy/accent colour blocks + type. No fake product shots, no cartoon illustration.
  Retire the marketing posters. Logo stays a small mark.
- **Direction A tokens:** ink `#26276B`, ink-soft `#55568A`, cream `#FBF8F1`, cream-deep
  `#F3EEE1`, periwinkle `#5E6FA6`, peri-soft `#E7EAF3`, sage `#86A08A`, sand `#EFE6D3`;
  Display **Hanken Grotesque** (lowercase heads + period), Body **Figtree**; radius 20/14/999;
  soft ambient shadow only; section spacing `clamp(4rem,8vw,7rem)`.
- **Direction B tokens:** forest `#22372B`, forest-deep `#172A20`, cream `#F5F1E8`, paper
  `#FBF9F3`, brass `#B08A3E`, brass-soft `#E9DFC8`, ink `#1E2A3A`; Display **Fraunces** (serif,
  Title Case), Body **Inter**; radius 8px, hairline rules; spacing `clamp(3.5rem,6vw,5.5rem)`.
- **Verification:** one desktop screenshot per page; sensible desktop layout; no console errors.

---

### Task 1: Direction A design foundation (mockup-1)

**Files:**
- Rewrite: `mockup-1-html/css/tokens.css`
- Modify: `mockup-1-html/css/base.css`, `mockup-1-html/css/components.css`
- Modify: `mockup-1-html/js/main.js` (shared header/footer markup — read first to find the
  injected templates)
- Modify: Google Fonts `<link>` in every `mockup-1-html/*.html` head (swap Baloo/Nunito/
  Shantell → Hanken Grotesque + Figtree)

**Deliverable:** Any mockup-1 page loads on the new cream/navy/periwinkle palette with Hanken/
Figtree type, a calm sticky header (logo, nav, "Book a tour" periwinkle pill) and calm navy
footer; no leftover mascot/candy styling leaks; no console errors.

- [ ] Read `base.css`, `components.css`, `pages.css`, `main.js` to map current header/footer,
      button, and utility classes.
- [ ] Rewrite `tokens.css` to the Direction A token set (delete puzzle palette, candy tints,
      sticker/pop shadows, bounce ease, handwriting font vars).
- [ ] Revise `base.css`: base typography (Hanken headings lowercase w/ period, Figtree body),
      link/button styles (periwinkle primary pill, ghost, white), container/section spacing.
- [ ] Update the shared header/footer in `main.js` to the calm anatomy.
- [ ] Swap the Google Fonts link across all `*.html` heads.
- [ ] **Verify:** open `index.html` — header/footer/palette/type are Direction A; screenshot.

### Task 2: Direction A homepage (`index.html`)

**Files:**
- Rewrite: `mockup-1-html/index.html` (section markup)
- Modify: `mockup-1-html/css/components.css`, `mockup-1-html/css/pages.css`

**Deliverable:** Homepage follows the Direction A anatomy: slim intake bar → split hero
(outcome headline + real photo) → mission line → 3 "why" cards → photo programme cards → "built
for independence" photo-split → restrained stats → photo gallery grid → parent quotes →
admissions CTA w/ steps → find-us maps → footer. All decorative SVGs (sun, clouds, bee,
balloons, rainbow, grass, flowers, mascots, stickers, polaroids, notice-board) removed.

- [ ] Rebuild hero: outcome headline ("Raising confident, independent thinkers — from four
      months."), subcopy, two CTAs, small trust row; real photo in soft-rounded frame.
- [ ] Rebuild remaining sections per anatomy; retire posters/notice-board; keep the shop teaser
      but restyle calm; keep the two campus maps.
- [ ] Restyle in `components.css`/`pages.css`; confirm GSAP reveal still runs.
- [ ] **Verify:** full-page screenshot matches anatomy; no console errors.

### Task 3: Direction B homepage (mockup-3, full rewrite)

**Files:**
- Rewrite: `mockup-3-html/index.html`, `mockup-3-html/css/style.css`
- Modify: `mockup-3-html/js/script.js` (keep reveal/marquee/count; delete bunting/tape/doodle
  generators — read first)
- Modify: Google Fonts `<link>` (Chewy/Gochi/Varela → Fraunces + Inter)

**Deliverable:** Institutional forest/brass/serif homepage per Direction B anatomy: enquire
topbar → full-bleed photo hero + serif outcome headline → "foundation for lifelong success"
statement → early-years curriculum section → "The VIS difference" (confidence/independence/
thinking) → programme cards → institutional stat row → photo feature band → parent voice →
deep-green enquire CTA → serif footer. No scrapbook/tape/post-it/crayon/bunting artefacts.

- [ ] Read `script.js`; keep only reveal/marquee/count-up; remove decorative generators.
- [ ] Rewrite `index.html` to Direction B anatomy with outcome copy + real photos.
- [ ] Rewrite `style.css` to Direction B tokens/type/components.
- [ ] **Verify:** full-page screenshot; no console errors.

> **CHECKPOINT — client-facing review.** After Tasks 1–3, both homepages exist in their new
> directions. Pause for the user to eyeball both before the inner-page sweep.

### Task 4: `programmes.html` → Direction A

**Files:** Rewrite `mockup-1-html/programmes.html`; extend `pages.css` as needed.
**Deliverable:** Programme detail page (ECE / Cambridge English / Music / Daycare with age
ranges + outcome copy) in Direction A; anchors (`#ece`,`#cambridge`,`#music`,`#daycare`) intact.
- [ ] Rebuild sections in Direction A; retire decorative artefacts.
- [ ] **Verify:** screenshot; anchor links resolve.

### Task 5: `about.html` → Direction A

**Files:** Rewrite `mockup-1-html/about.html`; extend `pages.css`.
**Deliverable:** Story/heritage page — 50-year heritage, Montessori philosophy, two campuses —
outcome-framed, Direction A, using the 50-years + classroom photos.
- [ ] Rebuild; **Verify:** screenshot.

### Task 6: `admissions.html` → Direction A

**Files:** Rewrite `mockup-1-html/admissions.html`; extend `pages.css`.
**Deliverable:** Admissions page — steps to enrol, intake info, tour CTA — Direction A, calm.
- [ ] Rebuild; **Verify:** screenshot.

### Task 7: `contact.html` → Direction A

**Files:** Rewrite `mockup-1-html/contact.html`; extend `pages.css`.
**Deliverable:** Contact page — two campus addresses/maps, hours, WhatsApp — Direction A.
- [ ] Rebuild; **Verify:** screenshot; maps render.

### Task 8: `shop.html` + `product.html` → Direction A

**Files:** Rewrite `mockup-1-html/shop.html`, `mockup-1-html/product.html`; modify
`components.css`/`pages.css`. Do **not** break `js/shop.js`, `js/product.js`, `js/cart.js`.
**Deliverable:** Shop grid + product detail in Direction A; product tiles use calm colour-block
treatments (no fake product photos); add-to-cart/cart-drawer still work.
- [ ] Rebuild markup keeping `data-*` hooks the JS relies on (read shop.js/product.js/cart.js).
- [ ] Colour-block product tiles per palette.
- [ ] **Verify:** screenshot; add-to-cart opens drawer; no console errors.

### Task 9: `checkout.html` + `success.html` → Direction A

**Files:** Rewrite `mockup-1-html/checkout.html`, `mockup-1-html/success.html`; modify
`checkout.css`. Do **not** break `js/checkout.js`, `js/success.js`.
**Deliverable:** Checkout keeps functional Stripe-grey neutrality but adopts Direction A
header/footer/type; success page in Direction A; simulated flow still completes.
- [ ] Re-skin header/footer/type; keep form structure and JS hooks intact.
- [ ] **Verify:** screenshot; walk the simulated checkout → success once; no console errors.

---

## Self-Review

**Spec coverage:** Direction A system → Tasks 1–2,4–9. Direction B system → Task 3. Copy
rewrite / retirements / imagery strategy → Global Constraints, applied every task. All 9
mockup-1 pages + mockup-3 homepage have a task. Non-goals (responsive depth, real payments)
respected. No gaps.

**Placeholder scan:** No TBD/TODO; each task names exact files, deliverable, and a concrete
verify step. (Full source is authored at execution time by design — see the adaptation note in
the header — not a placeholder.)

**Consistency:** Token names/values match the spec verbatim in Global Constraints and are
referenced, not redefined, per task. JS files that must keep working are named explicitly where
their pages are touched (main.js T1; shop/product/cart T8; checkout/success T9; script.js T3).
