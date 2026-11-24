/* Site-wide motion: reveal on scroll, split and decode headings, counters,
   card spotlight, magnetic buttons, blueprint cursor, timeline and scroll progress.
   Runs on every Astro page load; all listeners are torn down between pages. */

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
let ac: AbortController | undefined;

function splitHeadings(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-split]:not(.split):not([data-decode])').forEach((el) => {
    const text = (el.textContent ?? '').trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(/\s+/).forEach((w, i) => {
      if (i) el.append(' ');
      const outer = document.createElement('span');
      outer.className = 'w';
      outer.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.style.setProperty('--wi', String(i));
      inner.textContent = w;
      outer.append(inner);
      el.append(outer);
    });
    el.classList.add('split');
  });
}

/* Decode headings: each text node is wrapped in word spans (inline-block,
   nowrap) holding one span per character. The real character keeps its slot
   while a random glyph is painted over it, resolving left to right. When done
   the original text nodes are put back, so the final DOM is the real text.
   Screen readers read a .sr-only copy of the text meanwhile: the glyph wrappers are
   aria-hidden, and an aria-label on a role-less span (the hero name) would be ignored. */
const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=<>/\\[]{}';
const DECODE_MS = 600;
const decodeOriginals = new WeakMap<HTMLElement, Text>();
const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

function prepareDecode(el: HTMLElement) {
  if (el.dataset.decodeReady) return;
  el.dataset.decodeReady = '1';
  const label = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  while (walker.nextNode()) texts.push(walker.currentNode as Text);
  for (const node of texts) {
    if (!node.data.trim()) continue;
    const wrap = document.createElement('span');
    wrap.className = 'dcx';
    wrap.setAttribute('aria-hidden', 'true');
    for (const part of node.data.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { wrap.append(part); continue; }
      const word = document.createElement('span');
      word.className = 'dcw';
      for (const ch of Array.from(part)) {
        const c = document.createElement('span');
        c.className = 'dcc is-scr';
        c.dataset.g = glyph();
        c.textContent = ch;
        word.append(c);
      }
      wrap.append(word);
    }
    decodeOriginals.set(wrap, node);
    node.replaceWith(wrap);
  }
  const sr = document.createElement('span');
  sr.className = 'sr-only dcsr';
  sr.textContent = label;
  el.append(sr);
  el.classList.add('decode');
}

function restoreDecode(el: HTMLElement) {
  el.querySelectorAll<HTMLElement>('.dcx').forEach((wrap) => {
    const original = decodeOriginals.get(wrap);
    if (original) wrap.replaceWith(original);
  });
  el.querySelector(':scope > .dcsr')?.remove();
  el.classList.add('decoded');
}

function runDecode(el: HTMLElement, signal: AbortSignal) {
  if (el.dataset.decoding) return;
  el.dataset.decoding = '1';
  const chars = Array.from(el.querySelectorAll<HTMLElement>('.dcc'));
  if (!chars.length) return restoreDecode(el);
  const start = performance.now();
  let lastSwap = 0;
  const tick = (now: number) => {
    if (signal.aborted) return restoreDecode(el);
    const p = Math.min(1, (now - start) / DECODE_MS);
    const resolved = Math.floor(p * chars.length);
    const swap = now - lastSwap > 45;
    if (swap) lastSwap = now;
    chars.forEach((c, i) => {
      if (i < resolved) { if (c.classList.contains('is-scr')) c.classList.remove('is-scr'); }
      else if (swap) c.dataset.g = glyph();
    });
    if (p < 1) requestAnimationFrame(tick);
    else restoreDecode(el);
  };
  requestAnimationFrame(tick);
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || el.dataset.counted) return;
  el.dataset.counted = '1';
  if (reduce()) { el.textContent = String(target); return; }
  const start = performance.now();
  const dur = 1400;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = String(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* Blueprint cursor: one fixed overlay ([data-xhair], rendered by BaseLayout)
   with two hairlines through the pointer and a label in page pixels.
   Hidden over form fields and embedded media, except inside the hero or any
   [data-cursor] / [data-cursor-show] area (the hero canvas is the signature look). */
const CURSOR_HIDE = 'input, textarea, select, iframe, video, canvas, object, embed, [contenteditable=""], [contenteditable="true"], [data-cursor-hide]';
const CURSOR_KEEP = '[data-cursor], [data-cursor-show], [data-hero], .hero';

function blueprintCursor(signal: AbortSignal) {
  const hud = document.querySelector<HTMLElement>('[data-xhair]');
  if (!hud || !fine()) return;
  const h = hud.querySelector<HTMLElement>('.xhair__h')!;
  const v = hud.querySelector<HTMLElement>('.xhair__v')!;
  const xy = hud.querySelector<HTMLElement>('.xhair__xy')!;
  const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, '0');
  let cx = -1, cy = -1, frame = 0, visible = false;

  const draw = () => {
    frame = 0;
    h.style.transform = `translate3d(0, ${cy}px, 0)`;
    v.style.transform = `translate3d(${cx}px, 0, 0)`;
    // Keep the label inside the viewport near the right and bottom edges.
    const lx = cx + 14 + xy.offsetWidth > innerWidth ? cx - 14 - xy.offsetWidth : cx + 14;
    const ly = cy + 12 + xy.offsetHeight > innerHeight ? cy - 12 - xy.offsetHeight : cy + 12;
    xy.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
    xy.textContent = `X ${pad(cx + scrollX)}  Y ${pad(cy + scrollY)}`;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
  const show = (on: boolean) => {
    if (on === visible) return;
    visible = on;
    hud.classList.toggle('on', on);
  };

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return show(false);
      cx = e.clientX;
      cy = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      show(!(target?.closest(CURSOR_HIDE) && !target.closest(CURSOR_KEEP)));
      schedule();
    },
    { passive: true, signal }
  );
  // Page coordinates change while scrolling even when the pointer is still.
  addEventListener('scroll', () => { if (visible) schedule(); }, { passive: true, signal });
  document.documentElement.addEventListener('pointerleave', () => show(false), { signal });
  document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) show(false); }, { signal });
  addEventListener('blur', () => show(false), { signal });
  signal.addEventListener('abort', () => { cancelAnimationFrame(frame); hud.classList.remove('on'); });
}

function init() {
  ac?.abort();
  ac = new AbortController();
  const { signal } = ac;
  document.documentElement.classList.remove('no-js');

  splitHeadings(document);
  const decodes = reduce() ? [] : Array.from(document.querySelectorAll<HTMLElement>('[data-decode]:not(.decoded)'));
  decodes.forEach(prepareDecode);

  // Reveal
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add('is-in');
        if (el.classList.contains('decode') && !el.classList.contains('decoded')) runDecode(el, signal);
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
        if (el.dataset.count) countUp(el);
        io.unobserve(el);
      }
    },
    // threshold 0 so an element taller than the viewport still reveals; the larger bottom margin keeps
    // the old feel (things appear a little after they cross the bottom edge, not at the first pixel)
    { rootMargin: '0px 0px -12% 0px', threshold: 0 }
  );
  document.querySelectorAll('[data-reveal], .split, [data-count-group]').forEach((el) => io.observe(el));
  decodes.forEach((el) => io.observe(el));
  signal.addEventListener('abort', () => io.disconnect());

  // Stagger children automatically
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
  });

  // Card spotlight
  if (fine()) {
    document.querySelectorAll<HTMLElement>('.card, .hud-panel').forEach((card) => {
      card.addEventListener(
        'pointermove',
        (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--x', `${e.clientX - r.left}px`);
          card.style.setProperty('--y', `${e.clientY - r.top}px`);
        },
        { signal }
      );
    });

    // Magnetic buttons
    if (!reduce()) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
        btn.addEventListener(
          'pointermove',
          (e) => {
            const r = btn.getBoundingClientRect();
            btn.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.18}px`);
            btn.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.28}px`);
          },
          { signal }
        );
        btn.addEventListener('pointerleave', () => { btn.style.setProperty('--mx', '0px'); btn.style.setProperty('--my', '0px'); }, { signal });
      });
    }
  }

  blueprintCursor(signal);

  // Timeline progress line
  const timelines = document.querySelectorAll<HTMLElement>('[data-timeline]');
  if (timelines.length) {
    const update = () => {
      timelines.forEach((tl) => {
        const r = tl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
        tl.style.setProperty('--progress', p.toFixed(3));
      });
    };
    addEventListener('scroll', update, { passive: true, signal });
    update();
  }

  // Scroll progress bar
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (bar) {
    const upd = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    };
    addEventListener('scroll', upd, { passive: true, signal });
    upd();
  }

  // YouTube facades
  document.querySelectorAll<HTMLButtonElement>('[data-yt]').forEach((btn) => {
    btn.addEventListener(
      'click',
      () => {
        const id = btn.dataset.yt;
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
        frame.title = btn.dataset.title ?? 'YouTube video';
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        frame.allowFullscreen = true;
        frame.className = 'yt-frame';
        btn.replaceWith(frame);
        frame.focus();
      },
      { signal }
    );
  });

  // Copy buttons
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener(
      'click',
      async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy ?? '');
          btn.classList.add('copied');
          const label = btn.querySelector<HTMLElement>('.copy-label');
          if (label) {
            btn.dataset.label ??= label.textContent ?? '';
            if (btn.dataset.copied) label.textContent = btn.dataset.copied;
          }
          clearTimeout(Number(btn.dataset.timer));
          btn.dataset.timer = String(
            setTimeout(() => { btn.classList.remove('copied'); if (label) label.textContent = btn.dataset.label ?? ''; }, 1600)
          );
        } catch { /* clipboard unavailable */ }
      },
      { signal }
    );
  });
}

document.addEventListener('astro:page-load', init);

// Module scope: keeps these top-level names out of the global script scope.
export {};
