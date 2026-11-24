/* Hero 3D: starts the Lumi scene once the page has painted and the browser is idle, shows load progress,
   draws only while the hero is on screen and the tab is visible, and frees everything before an Astro page swap.
   three.js and the model are loaded on demand, so pages without the hero never pay for them.
   On a data-saver or slow (2g, 3g) connection nothing is loaded until the visitor presses "Load 3D Lumi". */
import type { LumiHandle } from './lumi3d/scene';

let ac: AbortController | undefined;
let lumi: LumiHandle | undefined;

function webglOk() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** Data saver is on, or the connection is 3g or slower (Network Information API, Chromium only). */
function saveData() {
  const c = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  return !!c && (c.saveData === true || ['slow-2g', '2g', '3g'].includes(c.effectiveType ?? ''));
}

/** A panel in the style of the WebGL fallback with a button that starts the scene. Built here so the
    hero markup stays the same; it copies the fallback's Astro scope attribute to get the hero's styles.
    The strings come from ui.ts, fetched only on this path, so other visitors never download them. */
async function offerLoad(root: HTMLElement, signal: AbortSignal, start: () => void) {
  const { t } = await import('../i18n/ui');
  if (signal.aborted) return;
  const lang = document.documentElement.lang === 'ko' ? 'ko' : 'en';
  const proto = root.querySelector<HTMLElement>('.fallback');
  const scoped = <T extends HTMLElement>(el: T) => {
    for (const a of proto?.attributes ?? []) if (a.name.startsWith('data-astro-cid-')) el.setAttribute(a.name, '');
    return el;
  };
  const panel = scoped(document.createElement('div'));
  panel.className = 'fallback';
  panel.style.display = 'block';
  const title = scoped(document.createElement('p'));
  title.className = 'fallback__title';
  title.textContent = t(lang, 'hero.lumi.saver.title');
  const body = scoped(document.createElement('p'));
  body.textContent = t(lang, 'hero.lumi.saver.body');
  const btn = scoped(document.createElement('button'));
  btn.type = 'button';
  btn.className = 'btn btn-sm btn-primary';
  btn.textContent = t(lang, 'hero.lumi.saver.load');
  panel.append(title, body, btn);
  // the WebGL message stays hidden: this browser can draw the scene
  if (proto) proto.style.display = 'none';
  (proto?.parentElement ?? root).append(panel);
  const remove = () => { panel.remove(); if (proto) proto.style.display = ''; };
  signal.addEventListener('abort', remove);
  btn.addEventListener('click', () => { remove(); start(); }, { signal });
}

function teardown() {
  ac?.abort();
  ac = undefined;
  lumi?.dispose();
  lumi = undefined;
}

function whenIdle(signal: AbortSignal, fn: () => void) {
  const run = () => { if (!signal.aborted) fn(); };
  if ('requestIdleCallback' in window) {
    const id = requestIdleCallback(run, { timeout: 1800 });
    signal.addEventListener('abort', () => cancelIdleCallback(id));
  } else {
    const id = setTimeout(run, 400);
    signal.addEventListener('abort', () => clearTimeout(id));
  }
}

function init() {
  teardown();
  const root = document.querySelector<HTMLElement>('[data-lumi]');
  if (!root) return;
  ac = new AbortController();
  const { signal } = ac;
  const stage = root.querySelector<HTMLElement>('[data-lumi-stage]')!;
  const canvas = root.querySelector<HTMLCanvasElement>('[data-lumi-canvas]')!;
  const bar = root.querySelector<HTMLElement>('[data-lumi-bar]');
  const pct = root.querySelector<HTMLElement>('[data-lumi-pct]');
  const waveBtn = root.querySelector<HTMLButtonElement>('[data-lumi-wave]');
  const setState = (s: 'idle' | 'loading' | 'ready' | 'fallback') => { root.dataset.state = s; };

  if (!webglOk()) { setState('fallback'); return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let onScreen = false;
  const sync = () => lumi?.setVisible(onScreen && !document.hidden);
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
  io.observe(stage);
  signal.addEventListener('abort', () => io.disconnect());
  document.addEventListener('visibilitychange', sync, { signal });

  const start = async () => {
    setState('loading');
    try {
      const { createLumi } = await import('./lumi3d/scene');
      const handle = await createLumi({
        canvas,
        host: stage,
        modelUrl: root.dataset.model!,
        modelBytes: Number(root.dataset.modelBytes) || 2_100_000,
        reduced,
        signal,
        onProgress: (f) => {
          bar?.style.setProperty('--p', f.toFixed(3));
          if (pct) pct.textContent = `${Math.round(f * 100)}%`;
        },
        onWave: (on) => waveBtn?.setAttribute('aria-pressed', String(on)),
      });
      if (signal.aborted) { handle.dispose(); return; }
      lumi = handle;
      sync();
      setState('ready');
    } catch (err) {
      if (signal.aborted) return;
      console.error('[lumi3d]', err);
      setState('fallback');
    }
  };

  waveBtn?.addEventListener('click', () => lumi?.wave(), { signal });
  if (saveData()) {
    // the 'fallback' state hides the load bar and the scene HUD until the visitor asks for the scene
    setState('fallback');
    offerLoad(root, signal, start).catch((err) => console.error('[lumi3d]', err));
    return;
  }
  // after first paint, when the main thread is free
  requestAnimationFrame(() => whenIdle(signal, start));
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', teardown);
