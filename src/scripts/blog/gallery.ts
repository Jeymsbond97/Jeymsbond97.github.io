/* Post photo carousel: arrows, dots, counter and keyboard on a native scroll-snap track
   (touch swipe is the browser's own scrolling), plus a <dialog> lightbox with the same controls.
   Runs on every Astro page load; listeners are torn down between pages. */

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = (i: number) => String(i).padStart(2, '0');
let ac: AbortController | undefined;

/** Wire one scroll-snap track: returns go(i) and calls onChange whenever the visible slide changes. */
function track(el: HTMLElement, signal: AbortSignal, onChange: (i: number) => void) {
  const count = el.children.length;
  let index = 0;
  let frame = 0;
  const current = () => Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / Math.max(1, el.clientWidth))));
  const go = (i: number, instant = false) => {
    const to = Math.min(count - 1, Math.max(0, i));
    el.scrollTo({ left: to * el.clientWidth, behavior: instant || reduce() ? 'instant' : 'smooth' });
  };
  el.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const i = current();
      if (i !== index) { index = i; onChange(i); }
    });
  }, { passive: true, signal });
  return { go, get index() { return index; }, count };
}

function keys(e: KeyboardEvent, t: { go: (i: number) => void; index: number; count: number }) {
  const to = { ArrowLeft: t.index - 1, ArrowRight: t.index + 1, Home: 0, End: t.count - 1 }[e.key];
  if (to === undefined) return;
  e.preventDefault();
  t.go(to);
}

function setup(root: HTMLElement, signal: AbortSignal) {
  const cur = root.querySelector<HTMLElement>('[data-cur]');
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-dot]')];
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const strip = root.querySelector<HTMLElement>('[data-track]')!;

  const main = track(strip, signal, (i) => {
    if (cur) cur.textContent = pad(i + 1);
    dots.forEach((d, j) => (j === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === main.count - 1;
  });
  prev?.addEventListener('click', () => main.go(main.index - 1), { signal });
  next?.addEventListener('click', () => main.go(main.index + 1), { signal });
  dots.forEach((d, i) => d.addEventListener('click', () => main.go(i), { signal }));
  strip.addEventListener('keydown', (e) => { if (e.target === strip) keys(e, main); }, { signal });

  const dialog = root.querySelector<HTMLDialogElement>('[data-lightbox]');
  const lbStrip = root.querySelector<HTMLElement>('[data-lb-track]');
  if (!dialog || !lbStrip || typeof dialog.showModal !== 'function') return;
  const lbCur = dialog.querySelector<HTMLElement>('[data-lb-cur]');
  const lb = track(lbStrip, signal, (i) => { if (lbCur) lbCur.textContent = pad(i + 1); });

  root.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => btn.addEventListener('click', () => {
    dialog.showModal();
    document.documentElement.classList.add('lb-open');
    const i = Number(btn.dataset.open);
    lb.go(i, true);
    if (lbCur) lbCur.textContent = pad(i + 1);
  }, { signal }));
  dialog.querySelector('[data-lb-prev]')?.addEventListener('click', () => lb.go(lb.index - 1), { signal });
  dialog.querySelector('[data-lb-next]')?.addEventListener('click', () => lb.go(lb.index + 1), { signal });
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close(), { signal });
  dialog.addEventListener('keydown', (e) => keys(e, lb), { signal });
  // A click on the dark area around the photo closes; a click on the photo itself does not.
  dialog.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el === dialog || el.hasAttribute('data-lb-slide')) dialog.close();
  }, { signal });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('lb-open');
    main.go(lb.index, true);
    root.querySelector<HTMLElement>(`[data-open="${lb.index}"]`)?.focus({ preventScroll: true });
  }, { signal });
}

function init() {
  ac?.abort();
  ac = new AbortController();
  const { signal } = ac;
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((g) => setup(g, signal));
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => document.documentElement.classList.remove('lb-open'));

export {};
