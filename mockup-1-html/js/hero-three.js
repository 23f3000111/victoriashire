/* ============================================================
   hero-three.js — floating clay-toned toy blocks (home hero).
   Signature moment for Mockup A. Cheap, matte, cursor-reactive.
   - <768px: skip WebGL, show a static inline-SVG block stack.
   - prefers-reduced-motion: render ONE static frame, no loop.
   ============================================================ */
import * as THREE from "three";

const PAL = {
  paper: "#FFFDF4",
  cream: "#FFFFFF",
  ink: "#26276B",
  clay: "#E8483A",
  clayDeep: "#C42F22",
  sage: "#2FA9E0",
  marigold: "#F9C513",
  terra: "#8A4FA3",
};

const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function letterTexture(letter, bg) {
  const c = document.createElement("canvas");
  c.width = c.height = 160;
  const ctx = c.getContext("2d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 160, 160);
  // rounded inner panel for a printed-block look
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.fillRect(14, 14, 132, 132);
  ctx.fillStyle = PAL.cream;
  ctx.font = '800 104px "Baloo 2", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, 80, 88);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function svgFallback(container) {
  container.innerHTML = `
    <svg viewBox="0 0 260 240" class="hero-blocks-svg" role="img" aria-label="A stack of toy letter blocks spelling VIS" xmlns="http://www.w3.org/2000/svg">
      <g stroke="${PAL.ink}" stroke-width="4" stroke-linejoin="round">
        <g transform="rotate(-6 90 170)"><rect x="52" y="140" width="76" height="76" rx="14" fill="${PAL.clay}"/><text x="90" y="192" font-family="Baloo 2, sans-serif" font-size="48" font-weight="800" fill="${PAL.cream}" text-anchor="middle">V</text></g>
        <g transform="rotate(5 170 150)"><rect x="132" y="120" width="76" height="76" rx="14" fill="${PAL.sage}"/><text x="170" y="172" font-family="Baloo 2, sans-serif" font-size="48" font-weight="800" fill="${PAL.cream}" text-anchor="middle">I</text></g>
        <g transform="rotate(-3 128 78)"><rect x="90" y="46" width="76" height="76" rx="14" fill="${PAL.marigold}"/><text x="128" y="98" font-family="Baloo 2, sans-serif" font-size="48" font-weight="800" fill="${PAL.cream}" text-anchor="middle">S</text></g>
        <circle cx="214" cy="70" r="16" fill="${PAL.terra}"/>
        <path d="M40 96 l8 -18 l8 18 z" fill="${PAL.marigold}"/>
      </g>
    </svg>`;
}

export function initHero() {
  const canvas = document.getElementById("hero-canvas");
  const fallback = document.getElementById("hero-fallback");
  if (!canvas) return;

  // small screens: no WebGL, show SVG stack
  if (window.innerWidth < 768) {
    canvas.style.display = "none";
    if (fallback) svgFallback(fallback);
    return;
  }

  const wrap = canvas.parentElement;
  let W = wrap.clientWidth;
  let H = wrap.clientHeight;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (err) {
    // WebGL unavailable → fall back to the static SVG block stack
    canvas.style.display = "none";
    if (fallback) svgFallback(fallback);
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
  camera.position.set(0, 0, 7);

  // lights — warm, matte, no shadows
  const hemi = new THREE.HemisphereLight(0xfff3e0, 0xdcae86, 1.05);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 1.1);
  dir.position.set(3, 5, 4);
  scene.add(dir);

  const group = new THREE.Group();
  scene.add(group);

  const mat = (hex) => new THREE.MeshStandardMaterial({ color: new THREE.Color(hex), roughness: 0.85, metalness: 0 });

  const objects = [];
  function place(mesh, x, y, z, amp, speed, spin) {
    mesh.position.set(x, y, z);
    mesh.userData = { baseY: y, phase: Math.random() * Math.PI * 2, amp, speed, spin };
    group.add(mesh);
    objects.push(mesh);
  }

  // 3 letter blocks (V, I, S) — colourful toy blocks, cream letters
  const blockGeo = new THREE.BoxGeometry(1.15, 1.15, 1.15);
  const mkBlock = (letter, hex) => {
    const tex = letterTexture(letter, hex);
    const m = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0 });
    return new THREE.Mesh(blockGeo, m);
  };
  place(mkBlock("V", PAL.clay), -2.3, 0.5, 0, 0.22, 0.7, 0.2);
  place(mkBlock("I", PAL.sage), -0.2, 1.35, -0.5, 0.18, 0.9, -0.16);
  place(mkBlock("S", PAL.marigold), 1.9, 0.7, 0.2, 0.2, 0.8, 0.22);

  // torus (stacking ring)
  place(new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 16, 40), mat(PAL.terra)), 2.6, -1.2, -0.4, 0.16, 1.1, 0.5);
  // sphere (ball)
  place(new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 24), mat(PAL.sage)), -2.7, -1.5, 0.3, 0.24, 0.85, 0.1);

  // star (extruded 5-point)
  const starShape = new THREE.Shape();
  const spikes = 5, outer = 0.55, inner = 0.24;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    i === 0 ? starShape.moveTo(x, y) : starShape.lineTo(x, y);
  }
  starShape.closePath();
  const starGeo = new THREE.ExtrudeGeometry(starShape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 });
  starGeo.center();
  place(new THREE.Mesh(starGeo, mat(PAL.marigold)), 0.4, -1.6, 0.5, 0.2, 1.0, 0.4);

  // crayon (cylinder + cone)
  const crayon = new THREE.Group();
  crayon.add(new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.85, 20), mat(PAL.clay)));
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.32, 20), mat(PAL.clayDeep));
  tip.position.y = 0.58;
  crayon.add(tip);
  crayon.rotation.z = 0.5;
  place(crayon, 3.0, 1.4, -0.6, 0.18, 0.75, 0.3);

  // accent ring (flattened torus)
  const accent = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.13, 14, 36), mat(PAL.clayDeep));
  accent.scale.set(1, 1, 0.5);
  place(accent, -1.4, -0.3, -0.8, 0.15, 1.2, -0.5);

  // pointer parallax
  const pointer = { x: 0, y: 0 };
  const targetRot = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  function resize() {
    W = wrap.clientWidth; H = wrap.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let running = true;
  let rafId = null;

  function renderFrame() {
    const t = clock.getElapsedTime();
    objects.forEach((o) => {
      const u = o.userData;
      o.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * u.amp;
      o.rotation.x += u.spin * 0.006;
      o.rotation.y += u.spin * 0.009;
    });
    targetRot.y += (pointer.x * 0.15 - targetRot.y) * 0.05;
    targetRot.x += (-pointer.y * 0.12 - targetRot.x) * 0.05;
    group.rotation.y = targetRot.y;
    group.rotation.x = targetRot.x;
    renderer.render(scene, camera);
  }

  function loop() {
    if (!running) return;
    renderFrame();
    rafId = requestAnimationFrame(loop);
  }

  if (REDUCE) {
    // one static frame, no loop, no parallax listener effect
    renderFrame();
    return;
  }

  // pause when hero scrolls away or tab hidden
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !document.hidden) {
        if (!running) { running = true; clock.start(); loop(); }
      } else {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
      }
    });
  }, { threshold: 0.02 });
  io.observe(wrap);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { running = false; if (rafId) cancelAnimationFrame(rafId); }
    else if (!running) { running = true; loop(); }
  });

  loop();
}

// auto-init after fonts settle (so block letters use Baloo 2)
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(initHero);
} else {
  window.addEventListener("load", initHero);
}
