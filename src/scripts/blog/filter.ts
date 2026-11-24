/* Blog index category filter: chips toggle [data-cat] items and hide year groups left empty.
   Runs on every Astro page load; listeners are torn down between pages. */

let ac: AbortController | undefined;

function init() {
  ac?.abort();
  ac = new AbortController();
  const { signal } = ac;
  const wrap = document.querySelector('[data-filters]');
  if (!wrap) return;
  const chips = [...wrap.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    document.querySelectorAll<HTMLElement>('[data-cat]').forEach((it) => { it.hidden = f !== 'all' && it.dataset.cat !== f; });
    document.querySelectorAll<HTMLElement>('[data-year]').forEach((y) => { y.hidden = !y.querySelector('[data-cat]:not([hidden])'); });
  }, { signal }));
}

document.addEventListener('astro:page-load', init);

export {};
