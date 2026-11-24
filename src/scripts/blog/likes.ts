/* Post likes. Shown number = LinkedIn reactions (baked in at build time as data-base)
   + site likes from the Abacus counter, fetched after render and only when the count is
   near the viewport. A browser can like a post once (remembered in localStorage).
   If Abacus is unreachable the LinkedIn number simply stays.
   Markup: [data-likes][data-slug][data-base] containing [data-like-n] and optionally [data-like-btn]. */

const API = 'https://abacus.jasoncameron.dev';
const NS = 'jeymsbond97-portfolio';
const PARTICLES = 14;

/** Site-like reads per slug for this browser session; null means the counter could not be read. */
const reads = new Map<string, Promise<number | null>>();
/** Latest site-like count we trust per slug, and slugs with a like on its way to the counter. */
const known = new Map<string, number>();
const sending = new Set<string>();
let ac: AbortController | undefined;

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const storeKey = (slug: string) => `liked:${slug}`;
function hasLiked(slug: string) {
  try { return localStorage.getItem(storeKey(slug)) === '1'; } catch { return false; }
}
function remember(slug: string, on: boolean) {
  try { on ? localStorage.setItem(storeKey(slug), '1') : localStorage.removeItem(storeKey(slug)); } catch { /* private mode: like still counts once per page */ }
}

async function call(op: 'get' | 'hit', slug: string): Promise<number | null> {
  try {
    const res = await fetch(`${API}/${op}/${NS}/like-${slug}`, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
    if (op === 'get' && res.status === 404) return 0; // never liked yet
    if (!res.ok) return null;
    const value = Number((await res.json())?.value);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function read(slug: string) {
  let p = reads.get(slug);
  if (!p) {
    p = call('get', slug).then((v) => {
      if (v === null) reads.delete(slug); // retry on the next page
      else if (!sending.has(slug)) known.set(slug, v);
      return v;
    });
    reads.set(slug, p);
  }
  return p;
}

function render(slug: string, siteLikes: number) {
  document.querySelectorAll<HTMLElement>(`[data-likes][data-slug="${slug}"]`).forEach((el) => {
    const total = Number(el.dataset.base ?? 0) + siteLikes;
    const n = el.querySelector<HTMLElement>('[data-like-n]');
    if (n) n.textContent = String(total);
    const btn = el.querySelector<HTMLButtonElement>('[data-like-btn]');
    if (btn) labelButton(btn, total);
  });
}

/** The button's accessible name: the action or the state, then the count ("Like this post, 19 likes"). */
function labelButton(btn: HTMLButtonElement, total: number) {
  const L = btn.dataset;
  const count = (total === 1 ? L.lOne : L.lMany)?.replace('{n}', String(total)) ?? String(total);
  const liked = btn.getAttribute('aria-disabled') === 'true';
  btn.setAttribute('aria-label', ((liked ? L.lLiked : L.lLike) ?? '').replace('{count}', count));
}

function burst(btn: HTMLElement) {
  if (reduce()) return;
  const host = btn.querySelector<HTMLElement>('[data-burst]');
  if (!host) return;
  for (let i = 0; i < PARTICLES; i++) {
    const p = document.createElement('i');
    const angle = (360 / PARTICLES) * i + (Math.random() * 16 - 8);
    p.style.setProperty('--a', `${angle}deg`);
    p.style.setProperty('--d', `${22 + Math.random() * 18}px`);
    p.style.setProperty('--s', `${2 + Math.random() * 3}px`);
    p.style.setProperty('--c', i % 2 ? 'var(--accent-2)' : 'var(--accent)');
    p.addEventListener('animationend', () => p.remove(), { once: true });
    host.append(p);
  }
}

/** Liked is final: the button stays focusable (aria-disabled, not disabled) but ignores further clicks. */
function setLiked(btn: HTMLButtonElement, on: boolean) {
  if (on) btn.setAttribute('aria-disabled', 'true'); else btn.removeAttribute('aria-disabled');
  const label = btn.querySelector<HTMLElement>('[data-like-label]');
  if (label) label.textContent = (on ? btn.dataset.liked : btn.dataset.like) ?? '';
}

function setupButton(btn: HTMLButtonElement, slug: string, signal: AbortSignal) {
  setLiked(btn, hasLiked(slug));
  render(slug, known.get(slug) ?? 0); // the label must say "liked" for a returning visitor
  btn.addEventListener('click', async () => {
    if (sending.has(slug) || btn.getAttribute('aria-disabled') === 'true') return; // one like per browser
    btn.classList.remove('is-pop');
    void btn.offsetWidth; // restart the pop animation
    btn.classList.add('is-pop');
    const before = known.get(slug) ?? 0;
    sending.add(slug);
    setLiked(btn, true);
    remember(slug, true);
    burst(btn);
    render(slug, before + 1); // optimistic
    const after = await call('hit', slug);
    sending.delete(slug);
    if (after === null) {
      // The like did not reach the counter: undo so the visitor can try again later.
      setLiked(btn, false);
      remember(slug, false);
      render(slug, before);
      return;
    }
    known.set(slug, after);
    reads.set(slug, Promise.resolve(after));
    render(slug, after);
  }, { signal });
}

function init() {
  ac?.abort();
  ac = new AbortController();
  const { signal } = ac;
  const els = [...document.querySelectorAll<HTMLElement>('[data-likes][data-slug]')];
  if (!els.length) return;
  const load = (el: HTMLElement) => {
    const slug = el.dataset.slug!;
    read(slug).then(() => {
      const v = known.get(slug);
      if (v !== undefined && !sending.has(slug) && !signal.aborted) render(slug, v);
    });
  };
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io?.unobserve(e.target);
        load(e.target as HTMLElement);
      }), { rootMargin: '300px 0px' })
    : undefined;
  signal.addEventListener('abort', () => io?.disconnect());
  els.forEach((el) => {
    if (io) io.observe(el); else load(el);
    const btn = el.querySelector<HTMLButtonElement>('[data-like-btn]');
    if (btn) setupButton(btn, el.dataset.slug!, signal);
  });
}

document.addEventListener('astro:page-load', init);

export {};
