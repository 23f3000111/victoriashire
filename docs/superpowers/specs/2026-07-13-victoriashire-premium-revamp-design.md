# Victoriashire — Premium Revamp Design Spec

**Date:** 2026-07-13
**Status:** For review

## 1. Context & goal

Both existing Victoriashire (VIS) mockups were rejected by the client as looking like a
"colourful kindergarten website." The brief:

> VIS should sit between **premium Montessori, international early-years education, and modern
> Asian parent expectations** — warm, calm, intelligent, highly visual, but still clearly
> **academic and credible**.

Goal: revamp **both** mockups into a premium register, as **two distinct premium directions**
so the client can choose a winner. Rebuild scope is **everything** (both homepages + all of
mockup-1's inner pages).

### Reference sites (images in `reference website/`)
- **guidepostmontessori.com** — best overall structural reference (calm, airy, soft blue, real photography).
- **guidepost.hk** — closest strategic reference (soft periwinkle, outcome copy: "the school for agency").
- **gardenschool.edu.my** early-years — international-school credibility (sage/green + brass, serif, institutional).
- **leportschools.com** — parent-conversion copywriting model (sells outcomes: confidence, independence, thinking).

### Reference DNA (shared across all four)
Warm cream base (never stark white) · **one** calm sophisticated accent · real photography of
engaged children front-and-centre · generous whitespace · restrained editorial typography ·
soft-rounded (not bubbly) corners · outcome-driven copy.

## 2. Folder → direction mapping

| Folder | Was | Becomes |
|---|---|---|
| `mockup-1-html` (9 pages + shop/checkout) | "Puzzle Pop" | **Direction A — "Guidepost calm"** (all pages) |
| `mockup-3-html` (single homepage) | "Craft Table" | **Direction B — "International-school credibility"** |

## 3. Direction A — "Guidepost calm" (mockup-1, all pages)

**Feeling:** warm, calm, intelligent, airy — Guidepost / modern-Asian-parent lane.

### Design tokens
```
--ink:        #26276B   /* logo navy — headings, text */
--ink-soft:   #55568A   /* secondary text */
--cream:      #FBF8F1   /* page base (never stark white) */
--cream-deep: #F3EEE1   /* alternating band */
--white:      #FFFFFF   /* cards */
--periwinkle: #5E6FA6   /* primary accent — links, buttons, small marks */
--peri-soft:  #E7EAF3   /* accent tint */
--sage:       #86A08A   /* secondary accent */
--sage-soft:  #E7EEE7
--sand:       #EFE6D3   /* warm block/tint */
radius: 20px card / 14px sm / 999 pill
shadow: soft ambient only — 0 12px 32px rgba(38,39,107,.07)
section spacing: clamp(4rem, 8vw, 7rem)  /* generous */
```
### Type
- Display: **Hanken Grotesque** (600–800), lowercase headings with a trailing period.
- Body: **Figtree** (400–600). Clean humanist sans; **no serif** (this separates A from B).

### Components
Slim intake bar · calm sticky header (logo, nav, "Book a tour" periwinkle pill) · thin line
icons (no mascots) · soft-rounded photo frames · calm quote cards · restrained stat blocks ·
colour-block tiles where photos run thin.

### Homepage anatomy
slim intake bar → split hero (outcome headline + real photo) → one-line mission band → 3 calm
"why" value cards → photo-led programme cards (ECE / Cambridge English / Music / Daycare) →
"built for independence" photo-split (Montessori story) → restrained stats (50 yrs · 2 campuses
· 3 languages) → real-photo gallery grid → parent quote cards → admissions CTA with steps →
find-us maps → calm navy footer.

### Inner pages (re-skin into Direction A; keep existing JS/functionality)
about · admissions · programmes · contact · shop · product · checkout · success.
Shop product tiles use clean colour-block treatments (no fake product photography).
Checkout keeps its functional Stripe-grey neutrality.

## 4. Direction B — "International-school credibility" (mockup-3, homepage)

**Feeling:** established, academic, premium — Garden School / LePort lane.

### Design tokens
```
--forest:      #22372B   /* primary — bands, headings on cream */
--forest-deep: #172A20
--cream:       #F5F1E8   /* page base */
--paper:       #FBF9F3   /* cards */
--brass:       #B08A3E   /* accent — rules, small marks, buttons */
--brass-soft:  #E9DFC8
--ink:         #1E2A3A   /* near-black navy body text */
radius: 8px, hairline rules
section spacing: clamp(3.5rem, 6vw, 5.5rem)  /* structured, denser than A */
```
### Type
- Display: **Fraunces** (high-contrast serif, Title Case, optical sizing).
- Body: **Inter** (400–600). Serif display + brass rules separate B from A.

### Components
Enquire topbar · institutional header (wordmark/monogram note) · full-bleed photo with forest
gradient overlay · hairline brass dividers · structured card grids · institutional stat row
(serif figures) · deep-green CTA band with brass button · serif footer with crest note.

### Homepage anatomy
enquire topbar → full-bleed photo hero + serif outcome headline → centered "a foundation for
lifelong success" statement → structured early-years curriculum section → "The VIS difference"
(confidence / independence / thinking) → structured programme cards → institutional stat row →
photo feature band → parent voice → deep-green enquire CTA → serif footer.

## 5. Applies to both

### Copy — rewrite to outcomes
Remove "holistic development," "nurturing young minds," and generic wording. Lead with
**confidence, independence, thinking ability**, "make the most of their potential," "a
foundation for lifelong success," "future-ready." Preserve all real VIS facts: Puchong & Putra
Heights campuses, ages 4 months–17 years, Canadian curriculum standards, Montessori-inspired,
Cambridge English, music school attached, three languages daily, care to 6.30pm, 50-year
heritage, WhatsApp contact (+60 12-269 2488).

### Retire entirely
Cartoon mascots, sun/clouds/bees/balloons/rainbow/grass-&-flowers, stickers & sticker wobble,
washi tape, torn paper, crayon buttons, bunting, doodle arrows, candy tints, handwriting fonts
(Chewy, Gochi Hand, Shantell Sans, Baloo 2).

### Imagery strategy
Reuse the 5 real classroom photos (blocks, music, literacy, ballet, 50-years) where they fit;
fill remaining slots with restrained cream/navy/accent colour blocks and typographic
treatments. **No fake product shots, no cartoon illustrations.** Retire the colourful marketing
posters (they read as flyers). Logo stays as a small mark, not the palette.

## 6. Non-goals / out of scope
- Deep responsive fine-tuning and per-element Playwright testing (per lightweight-verification
  norm for this build). Layouts should be sensible at desktop and degrade reasonably.
- New photography or real e-commerce/payment integration (checkout stays simulated).
- Changing site information architecture / page inventory.

## 7. Verification
One desktop screenshot per completed page to confirm the premium look lands (per the
established lightweight-verification approach for this build).
