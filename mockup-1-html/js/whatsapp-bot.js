/* ============================================================
   whatsapp-bot.js — scripted WhatsApp-style front-desk chat.
   Floating launcher + decision-tree quick replies; no network.
   ============================================================ */

const WHATSAPP = '60122692488';

const FLOW = {
  start: {
    bot: [
      "Hello! 👋 You've reached the Victoriashire front desk.",
      'What can we help you with today?',
    ],
    options: [
      { label: '🎒 Programmes & ages', next: 'programmes' },
      { label: '📝 Admissions & fees', next: 'admissions' },
      { label: '🏫 Book a tour', next: 'visit' },
      { label: '📍 Location & hours', next: 'location' },
      { label: '🛍️ Trials & goodies', next: 'shop' },
      { label: '💬 Chat on WhatsApp', act: 'whatsapp' },
    ],
  },
  programmes: {
    bot: [
      'Four ways in, one big childhood:',
      '• Early Childhood Education — 4 mths–6 yrs\n• Cambridge English — ages 4–12\n• VIS Music School — ages 1–18\n• Daycare & Tuition — ages 7–12',
    ],
    options: [
      { label: 'See all programmes', act: 'go:programmes.html' },
      { label: '⬅ Back', next: 'start' },
    ],
  },
  admissions: {
    bot: [
      'The 2026 intake is open! 🎉',
      'A trial month is RM 388, Cambridge English and piano trials are RM 100 each. Enrolment is four easy steps.',
    ],
    options: [
      { label: 'How admissions work', act: 'go:admissions.html' },
      { label: '⬅ Back', next: 'start' },
    ],
  },
  visit: {
    bot: [
      'Come see a morning in action. 😊',
      "Mornings are when we're at our best. Pick a day and Ms. Chui will meet you at the door.",
    ],
    options: [
      { label: 'Contact & campuses', act: 'go:contact.html' },
      { label: 'WhatsApp Ms. Chui', act: 'whatsapp' },
      { label: '⬅ Back', next: 'start' },
    ],
  },
  location: {
    bot: [
      '📍 Puchong (HQ): No. 18, Jalan Puteri 7/15, Bandar Puteri, 47100 Puchong.\n📍 Putra Heights: 1-2, Jalan Putra Mahkota 7/5C, 47650 Subang Jaya.',
      '🕗 Mon–Fri 8am–6pm · Sat 9am–5pm · closed Sundays & public holidays.\n☎ +60 12-269 2488',
    ],
    options: [
      { label: 'Open in Maps', act: 'maps', next: 'more' },
      { label: 'Call us', act: 'call', next: 'more' },
      { label: '⬅ Back', next: 'start' },
    ],
  },
  shop: {
    bot: [
      'The little shop has course trials, uniform tees, Percy the Pony and the crayons that end up on our walls. 🖍️',
    ],
    options: [
      { label: 'Browse the shop', act: 'go:shop.html' },
      { label: '⬅ Back', next: 'start' },
    ],
  },
  more: {
    bot: ['Anything else we can help with? 😊'],
    options: [
      { label: '🎒 Programmes', next: 'programmes' },
      { label: '🏫 Book a tour', next: 'visit' },
      { label: '🔁 Start over', next: 'start' },
    ],
  },
};

const WA_SVG = `<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" width="26" height="26"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.6 1.4 5.6 1.4h.2C24.6 28.8 30 23.4 30 16.8 30 9.4 24.6 3 16 3zm0 23.6c-1.8 0-3.5-.5-5-1.3l-.4-.2-4.3.8.9-4.2-.3-.4C6 19.4 5.4 17.2 5.4 15 5.4 9.2 10.2 4.6 16 4.6c2.8 0 5.4 1.1 7.4 3.1 2 2 3.1 4.6 3.1 7.4 0 5.8-4.8 11.5-10.5 11.5zm6.1-8.4c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.8-1.9-1.1-2.6c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.2 2.4 3.7 5.9 5.1 2.2.9 3 1 4.1.9.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>`;
const X_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true" width="22" height="22"><path d="M6 6l12 12M18 6 6 18"/></svg>`;

export function initWhatsAppBot() {
  let open = false;
  let started = false;
  let currentNode = null;
  const timers = [];

  /* --- build DOM --- */
  const root = document.createElement('div');
  root.className = 'wa-root';

  const nudge = document.createElement('button');
  nudge.type = 'button';
  nudge.className = 'wa-nudge';
  nudge.innerHTML = 'Let&#39s chat';

  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'wa-launcher';
  launcher.setAttribute('aria-label', 'Open Victoriashire chat');
  launcher.innerHTML = `<span class="wa-ping"></span><span class="wa-ico wa-ico-open">${WA_SVG}</span><span class="wa-ico wa-ico-close">${X_SVG}</span>`;

  const panel = document.createElement('div');
  panel.className = 'wa-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Victoriashire chat');
  panel.innerHTML = `
    <div class="wa-head">
      <span class="wa-avatar"><img src="assets/img/logo-preschool.avif" alt=""><span class="wa-dot"></span></span>
      <span class="wa-head-txt"><strong>Victoriashire Front Desk</strong><small>Typically replies instantly</small></span>
      <button type="button" class="wa-close" aria-label="Close chat">${X_SVG}</button>
    </div>
    <div class="wa-body"></div>
    <div class="wa-foot"><div class="wa-options"></div></div>`;

  root.append(nudge, launcher, panel);
  document.body.appendChild(root);

  const body = panel.querySelector('.wa-body');
  const optsRow = panel.querySelector('.wa-options');

  const clearTimers = () => { timers.forEach(clearTimeout); timers.length = 0; };
  const scrollDown = () => body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });

  const addMsg = (from, text) => {
    const b = document.createElement('div');
    b.className = `wa-msg wa-msg--${from}`;
    b.textContent = text;
    body.appendChild(b);
    scrollDown();
  };

  const setTyping = (on) => {
    let t = body.querySelector('.wa-typing');
    if (on && !t) {
      t = document.createElement('div');
      t.className = 'wa-typing';
      t.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(t);
      scrollDown();
    } else if (!on && t) {
      t.remove();
    }
  };

  const showOptions = (options) => {
    optsRow.textContent = '';
    options.forEach((o) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wa-chip';
      btn.textContent = o.label;
      btn.addEventListener('click', () => choose(o));
      optsRow.appendChild(btn);
    });
  };

  const goToNode = (nodeId) => {
    const node = FLOW[nodeId];
    if (!node) return;
    currentNode = nodeId;
    optsRow.textContent = '';
    clearTimers();
    setTyping(true);
    let delay = 500;
    node.bot.forEach((text, idx) => {
      const isLast = idx === node.bot.length - 1;
      const t = setTimeout(() => {
        const i = timers.indexOf(t);
        if (i > -1) timers.splice(i, 1);
        setTyping(false);
        addMsg('bot', text);
        if (isLast) showOptions(node.options);
        else setTyping(true);
      }, delay);
      timers.push(t);
      delay += 650 + Math.min(text.length * 12, 900);
    });
  };

  const runAct = (act) => {
    if (act === 'whatsapp') window.open(`https://wa.me/${WHATSAPP}`, '_blank', 'noopener');
    else if (act === 'maps') window.open('https://www.google.com/maps/search/?api=1&query=Victoriashire+International+Preschool+Bandar+Puteri+Puchong', '_blank', 'noopener');
    else if (act === 'call') window.location.href = 'tel:+60122692488';
    else if (act.startsWith('go:')) window.location.href = act.slice(3);
  };

  const choose = (opt) => {
    addMsg('user', opt.label);
    optsRow.textContent = '';
    if (opt.act) runAct(opt.act);
    if (opt.next) timers.push(setTimeout(() => goToNode(opt.next), 350));
  };

  const toggle = () => {
    open = !open;
    nudge.classList.remove('show');
    root.classList.toggle('open', open);
    if (!open) return;
    // First open — start the conversation.
    if (!started) { started = true; goToNode('start'); return; }
    // Re-open: if a previous sequence was left without options showing
    // (and none are still queued), recover so the chat can't dead-end.
    const queued = timers.length > 0;
    if (!optsRow.children.length && !queued && currentNode) {
      setTyping(false);
      showOptions(FLOW[currentNode].options);
    }
  };

  launcher.addEventListener('click', toggle);
  nudge.addEventListener('click', toggle);
  panel.querySelector('.wa-close').addEventListener('click', toggle);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) toggle(); });

  setTimeout(() => { if (!open) nudge.classList.add('show'); }, 4500);
}
