/* ============================================================
   goodie-art.js — inline SVG illustrations for the 6 goodies.
   Direction A palette: ink navy outlines over calm periwinkle /
   sage / sand fills on a soft tinted ground. Keyed by product id.
   (Colour names are historical; the values are the calm palette.)
   ============================================================ */

const C = {
  paper: "#FFFFFF",
  ink: "#26276B",       /* ink navy */
  clay: "#5E6FA6",      /* periwinkle */
  sage: "#7E9A82",      /* sage */
  marigold: "#C7A559",  /* muted sand-gold */
  terra: "#46568B",     /* deep periwinkle */
  clayTint: "#E7EAF3",  /* periwinkle tint */
  sageTint: "#E6EDE6",  /* sage tint */
  marTint: "#EFE6D3",   /* sand */
  terraTint: "#EDEFF6", /* soft blue tint */
};

const stroke = `fill="none" stroke="${C.ink}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"`;

function frame(bg, inner, label) {
  return `<svg viewBox="0 0 200 200" class="goodie-svg" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="192" height="192" rx="26" fill="${bg}"/>
    ${inner}
  </svg>`;
}

const ART = {
  "school-tee": () => frame(C.marTint, `
    <path d="M66 54 L84 44 C90 54 110 54 116 44 L134 54 L150 74 L132 90 L126 82 L126 150 C126 154 123 157 119 157 L81 157 C77 157 74 154 74 150 L74 82 L68 90 L50 74 Z"
      fill="${C.marigold}" stroke="${C.ink}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M84 44 C90 54 110 54 116 44" ${stroke}/>
    <circle cx="100" cy="112" r="13" fill="${C.paper}" stroke="${C.ink}" stroke-width="4"/>
    <path d="M94 112 h12 M100 106 v12" ${stroke.replace('4.5','3.5')} stroke="${C.clay}"/>
  `, "VIS school tee illustration"),

  "library-tote": () => frame(C.sageTint, `
    <path d="M58 78 L142 78 L150 156 C150 160 147 163 143 163 L57 163 C53 163 50 160 50 156 Z"
      fill="${C.sage}" stroke="${C.ink}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M76 82 C76 56 124 56 124 82" ${stroke}/>
    <path d="M84 106 h32 M84 122 h32" ${stroke.replace('4.5','3.6')} stroke="${C.paper}"/>
  `, "Canvas library tote illustration"),

  "crayon-set": () => frame(C.clayTint, `
    <rect x="52" y="96" width="96" height="58" rx="10" fill="${C.clay}" stroke="${C.ink}" stroke-width="4.5"/>
    <path d="M52 116 h96" ${stroke.replace('4.5','3.5')} stroke="${C.paper}"/>
    <g stroke="${C.ink}" stroke-width="4" stroke-linejoin="round">
      <rect x="64" y="56" width="16" height="46" rx="6" fill="${C.sage}"/>
      <path d="M64 56 L72 42 L80 56 Z" fill="${C.sage}"/>
      <rect x="92" y="50" width="16" height="52" rx="6" fill="${C.marigold}"/>
      <path d="M92 50 L100 36 L108 50 Z" fill="${C.marigold}"/>
      <rect x="120" y="58" width="16" height="44" rx="6" fill="${C.terra}"/>
      <path d="M120 58 L128 44 L136 58 Z" fill="${C.terra}"/>
    </g>
  `, "Jumbo crayon and sketchbook set illustration"),

  "water-bottle": () => frame(C.terraTint, `
    <rect x="74" y="62" width="52" height="94" rx="18" fill="${C.terra}" stroke="${C.ink}" stroke-width="4.5"/>
    <rect x="82" y="44" width="36" height="22" rx="7" fill="${C.clay}" stroke="${C.ink}" stroke-width="4.5"/>
    <rect x="82" y="92" width="36" height="30" rx="6" fill="${C.paper}" stroke="${C.ink}" stroke-width="3.6"/>
    <path d="M90 104 h20" ${stroke.replace('4.5','3')} stroke="${C.clay}"/>
  `, "Sip-top water bottle illustration"),

  "percy-plush": () => frame(C.clayTint, `
    <path d="M70 150 C58 150 54 120 66 108 C60 96 66 78 82 76 C86 62 108 60 116 72 C132 72 142 88 136 104 C146 116 140 150 126 150 Z"
      fill="${C.terra}" stroke="${C.ink}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M82 76 C74 66 72 58 78 52 C86 56 90 66 90 74" fill="${C.clay}" stroke="${C.ink}" stroke-width="4"/>
    <path d="M116 72 C122 62 128 58 134 60 C132 70 126 78 120 80" fill="${C.clay}" stroke="${C.ink}" stroke-width="4"/>
    <circle cx="90" cy="106" r="4.5" fill="${C.ink}"/>
    <circle cx="112" cy="106" r="4.5" fill="${C.ink}"/>
    <path d="M96 124 c4 5 8 5 12 0" ${stroke.replace('4.5','3.5')}/>
    <path d="M100 84 c-2 8 -2 12 0 18 M108 84 c-2 8 -2 12 0 16" stroke="${C.clay}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  `, "Percy the pony plush illustration"),

  "workbook-set": () => frame(C.marTint, `
    <g stroke="${C.ink}" stroke-width="4.5" stroke-linejoin="round">
      <rect x="54" y="120" width="92" height="26" rx="6" fill="${C.sage}"/>
      <rect x="50" y="96" width="100" height="26" rx="6" fill="${C.clay}"/>
      <rect x="58" y="72" width="84" height="26" rx="6" fill="${C.marigold}"/>
    </g>
    <path d="M66 85 h30 M62 109 h40 M66 133 h30" stroke="${C.paper}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  `, "Holiday activity workbook set illustration"),
};

/* Percy standalone (for empty cart, 404, footer accents) */
export function percyArt(size = 120) {
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="Percy the pony" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 150 C58 150 54 120 66 108 C60 96 66 78 82 76 C86 62 108 60 116 72 C132 72 142 88 136 104 C146 116 140 150 126 150 Z"
      fill="${C.terra}" stroke="${C.ink}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M82 76 C74 66 72 58 78 52 C86 56 90 66 90 74" fill="${C.clay}" stroke="${C.ink}" stroke-width="4"/>
    <path d="M116 72 C122 62 128 58 134 60 C132 70 126 78 120 80" fill="${C.clay}" stroke="${C.ink}" stroke-width="4"/>
    <circle cx="90" cy="106" r="4.5" fill="${C.ink}"/>
    <circle cx="112" cy="106" r="4.5" fill="${C.ink}"/>
    <path d="M96 124 c4 5 8 5 12 0" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`;
}

export function goodieSVG(id) {
  const fn = ART[id];
  return fn ? fn() : frame(C.clayTint, "", "Goodie");
}

/* Fill any <div data-goodie-art="id"> with its illustration. */
export function hydrateGoodieArt(root = document) {
  root.querySelectorAll("[data-goodie-art]").forEach((el) => {
    if (el.dataset.hydrated) return;
    el.dataset.hydrated = "1";
    el.innerHTML = goodieSVG(el.dataset.goodieArt);
  });
}
