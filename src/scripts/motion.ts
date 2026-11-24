/* Site-wide motion: reveal on scroll, split headings, counters, card spotlight,
   magnetic buttons, blueprint cursor and timeline progress.
   Runs on every Astro page load; all listeners are torn down between pages. */

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
let ac: AbortController | undefined;

function splitHeadings(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-split]:not(.split)').forEach((el) => {
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

function init() {
  ac?.abort();
  ac = new AbortController();
  const { signal } = ac;
  document.documentElement.classList.remove('no-js');

  splitHeadings(document);

  // Reveal
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add('is-in');
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
        if (el.dataset.count) countUp(el);
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  document.querySelectorAll('[data-reveal], .split, [data-count-group]').forEach((el) => io.observe(el));
  signal.addEventListener('abort', () => io.disconnect());

  // Stagger children automatically
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
  });

  // Card spotlight
  if (fine()) {
    document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
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

    // Blueprint cursor: crosshair + live coordinates over [data-cursor] areas
    document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((area) => {
      const hud = area.querySelector<HTMLElement>('.cursor-hud');
      if (!hud) return;
      area.addEventListener(
        'pointermove',
        (e) => {
          const r = area.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          hud.style.setProperty('--cx', `${x}px`);
          hud.style.setProperty('--cy', `${y}px`);
          const label = hud.querySelector('.cursor-hud__xy');
          if (label) label.textContent = `X ${String(Math.round(x)).padStart(4, '0')}  Y ${String(Math.round(y)).padStart(4, '0')}`;
          hud.classList.add('on');
        },
        { signal }
      );
      area.addEventListener('pointerleave', () => hud.classList.remove('on'), { signal });
    });
  }

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
