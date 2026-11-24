/* Minimal custom controls for self-hosted post videos ([data-video]).
   Runs on every Astro page load; listeners are torn down between pages. */

let ac: AbortController | undefined;
const clock = (s: number) => {
  if (!Number.isFinite(s)) return '--:--';
  const t = Math.max(0, Math.floor(s || 0));
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
};

function setup(root: HTMLElement, signal: AbortSignal) {
  const video = root.querySelector('video')!;
  const frame = root.querySelector<HTMLElement>('.pv__frame')!;
  const seek = root.querySelector<HTMLInputElement>('[data-seek]')!;
  const time = root.querySelector<HTMLElement>('[data-time]')!;
  const barToggle = root.querySelector<HTMLButtonElement>('.pv__bar [data-toggle]')!;
  const mute = root.querySelector<HTMLButtonElement>('[data-mute]')!;
  let scrubbing = false;

  const state = (s: 'idle' | 'playing' | 'paused') => {
    root.dataset.state = s;
    barToggle.setAttribute('aria-label', (s === 'playing' ? barToggle.dataset.labelPause : barToggle.dataset.labelPlay) ?? '');
  };
  const progress = () => {
    const p = video.duration ? video.currentTime / video.duration : 0;
    if (!scrubbing) seek.value = String(Math.round(p * 1000));
    seek.style.setProperty('--p', `${(Number(seek.value) / 10).toFixed(2)}%`);
    time.textContent = clock(video.duration && root.dataset.state !== 'idle' ? video.duration - video.currentTime : video.duration);
  };
  const toggle = () => (video.paused || video.ended ? video.play().catch(() => state('paused')) : video.pause());

  root.querySelectorAll('[data-toggle]').forEach((b) => b.addEventListener('click', toggle, { signal }));
  video.addEventListener('click', toggle, { signal });
  video.addEventListener('play', () => state('playing'), { signal });
  video.addEventListener('pause', () => state('paused'), { signal });
  video.addEventListener('ended', () => state('paused'), { signal });
  video.addEventListener('timeupdate', progress, { signal });
  video.addEventListener('loadedmetadata', progress, { signal });
  seek.addEventListener('input', () => {
    scrubbing = true;
    if (video.duration) video.currentTime = (Number(seek.value) / 1000) * video.duration;
    progress();
  }, { signal });
  seek.addEventListener('change', () => { scrubbing = false; }, { signal });
  mute.addEventListener('click', () => {
    video.muted = !video.muted;
    root.toggleAttribute('data-muted', video.muted);
    mute.setAttribute('aria-label', (video.muted ? mute.dataset.labelUnmute : mute.dataset.labelMute) ?? '');
  }, { signal });
  root.querySelector('[data-fs]')?.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (frame.requestFullscreen) frame.requestFullscreen().catch(() => {});
    else (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen?.();
  }, { signal });
}

function init() {
  ac?.abort();
  ac = new AbortController();
  const { signal } = ac;
  document.querySelectorAll<HTMLElement>('[data-video]').forEach((v) => setup(v, signal));
}

document.addEventListener('astro:page-load', init);
// Stop playback before Astro swaps the page out.
document.addEventListener('astro:before-swap', () => document.querySelectorAll<HTMLVideoElement>('[data-video] video').forEach((v) => v.pause()));

export {};
