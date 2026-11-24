/* JAKA Lumi in its home scene, for the site's hero. Ported from the Lumi app's web/home3d.html:
   same renderer settings, lights, materials and model handling. The app-only parts (arm view, gizmo,
   React Native messages, live state) are left out; an idle motion and a wave take their place. */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { buildWorld, disposeTree } from './world';

export interface LumiOptions {
  canvas: HTMLCanvasElement;
  /** The element the canvas fills; its size and its `--lumi-focus-x`, `--lumi-focus-y` and `--lumi-fill` CSS variables frame the robot. */
  host: HTMLElement;
  modelUrl: string;
  /** Size of the model file in bytes, for progress when the server sends no Content-Length. */
  modelBytes: number;
  /** prefers-reduced-motion: draw still frames, only when the view changes. */
  reduced: boolean;
  signal: AbortSignal;
  onProgress?: (fraction: number) => void;
  onWave?: (active: boolean) => void;
}

export interface LumiHandle {
  /** Draw frames only while the hero is on screen and the tab is visible. */
  setVisible(visible: boolean): void;
  /** Play the wave; false when one is already playing. */
  wave(): boolean;
  dispose(): void;
}

// framing, from the app: the robot stands on the pad, looked at a little from above and to its right
const FOV = 32;
const HOME_DIR = new THREE.Vector3(1.25, 0.57, 3.6).normalize();
const HOME_TARGET = new THREE.Vector3(0, 0.78, 0);
const ROBOT_H = 1.62; // floor to head top, m, with a small margin
const PAD_R = 1.02; // pad radius plus its glow, m
const POLAR_MIN = 0.12 * Math.PI, POLAR_MAX = 0.56 * Math.PI;

// sharpness adapts to the device (the app's logic): go down when the frames drawn fall below 75 % of the
// rate the loop is aiming for, back up above 85 %; a ratio that was too slow once is not tried again (prCeil),
// so the picture does not keep jumping
// sharpness first: draw at the screen's own density (Retina and phones 2x), step down only when a device is really too slow
const PR_TOP = Math.min(devicePixelRatio, 3), PR_MIN = Math.min(devicePixelRatio, 1.25);
const ACTIVE_FPS = 60;             // dragging or waving: every display frame, measured against 60 fps
const IDLE_FRAME_MS = 1000 / 32;   // the scene drifts slowly: ~30 fps is enough when nobody touches it
const SCROLL_FRAME_MS = 1000 / 12; // while the page scrolls, give the GPU to the scroll (not measured)
const PR_SETTLE_MS = 8000;
const FPS_WINDOW_MS = 2000;

// the arm's rest pose (J1..J6, rad) and the shoulder ring's colour for "enabled" (JAKA manuals), from the app
const ARM_JOINTS = ['l_a1', 'l_a2', 'l_a3', 'l_a4', 'l_a5', 'l_a6'] as const;
const ARM_REST = [0, 1.0, 0.5, 0, 1.57, 0];
const ARM_ENABLED: [number, number, number] = [0.15, 2.2, 0.55];
// the wave: the elbow opens so the hand stands up and out, swings about four times, then the arm settles back
const WAVE_POSE = [0, 1.15, -0.3, 0, 1.57, 0];
const WAVE_SWING = { joint: 2, amp: 0.35, hz: 1.1 }; // J3 (elbow), rad, swings per second
const WAVE_S = 4.2;

// after the visitor lets go the view rests this long, then sways gently round the front again
const IDLE_RESUME_MS = 4000;
const SWAY_AMP = 0.42, SWAY_RATE = 0.16; // rad, rad/s

async function fetchModel(url: string, bytes: number, signal: AbortSignal, onProgress?: (f: number) => void) {
  const res = await fetch(url, { signal });
  if (!res.ok || !res.body) throw new Error(`Model: HTTP ${res.status}`);
  const total = Number(res.headers.get('content-length')) || bytes;
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    onProgress?.(Math.min(1, loaded / total));
  }
  const buf = new Uint8Array(loaded);
  let at = 0;
  for (const c of chunks) { buf.set(c, at); at += c.byteLength; }
  return buf.buffer;
}

const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b);
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

export async function createLumi(o: LumiOptions): Promise<LumiHandle> {
  const { canvas, host, reduced, signal } = o;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  // phones (small canvas, 3x screens) draw at full 3x; a big desktop canvas stops at 2x
  const PR_MAX = canvas.clientWidth * canvas.clientHeight > 600_000 ? Math.min(PR_TOP, 2) : PR_TOP;
  let pixelRatio = PR_MAX;
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.autoUpdate = false; // redrawn only when the robot moves
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 1.3;

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 400);
  let homeDist = 4;
  camera.position.copy(HOME_TARGET).addScaledVector(HOME_DIR, homeDist);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(HOME_TARGET);
  controls.enableDamping = !reduced;
  controls.enablePan = false;
  controls.enableZoom = false; // switched on per gesture: ctrl/cmd + wheel, or a pinch
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 0.8;
  controls.minPolarAngle = POLAR_MIN;
  controls.maxPolarAngle = POLAR_MAX;
  // OrbitControls takes every touch; vertical swipes must still scroll the page past the hero
  canvas.style.touchAction = 'pan-y';

  // ------------------------------------------------------------ lights (the app's)
  const key = new THREE.DirectionalLight(0xffffff, 2.8);
  key.position.set(2.5, 4, 2.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 12;
  Object.assign(key.shadow.camera, { left: -1.5, right: 1.5, top: 2, bottom: -1 });
  key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fe8ff, 2.0); rim.position.set(-3, 2.2, -3); scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0x9a7bff, 0.9); rim2.position.set(3, 1.5, -2.5); scene.add(rim2);
  scene.add(new THREE.HemisphereLight(0xe6f2ff, 0x081420, 0.8));
  const fill = new THREE.DirectionalLight(0xffffff, 1.1); fill.position.set(-1, 1.5, 4); scene.add(fill);

  const world = buildWorld(scene);

  // ------------------------------------------------------------ framing
  const sph = new THREE.Spherical(), homeSph = new THREE.Spherical(), off = new THREE.Vector3();
  homeSph.setFromVector3(HOME_DIR);

  function layout() {
    const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
    const css = getComputedStyle(host);
    const focusX = parseFloat(css.getPropertyValue('--lumi-focus-x')) || 0.5;
    const focusY = parseFloat(css.getPropertyValue('--lumi-focus-y')) || 0.5;
    const fillH = parseFloat(css.getPropertyValue('--lumi-fill')) || 0.84;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // the robot stands at (focusX, focusY) of the canvas: right of the copy on wide screens, below the HUD title
    camera.setViewOffset(w, h, -(focusX - 0.5) * w, -(focusY - 0.5) * h, w, h);
    const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const byHeight = ROBOT_H / fillH / (2 * tan);
    const halfRight = Math.min(focusX, 1 - focusX) * 2 * (w / h); // in units of the half view height
    const byWidth = PAD_R / 0.94 / (halfRight * tan);
    const prev = homeDist;
    homeDist = Math.max(byHeight, byWidth);
    controls.minDistance = homeDist * 0.6;
    controls.maxDistance = homeDist * 1.3;
    // keep the visitor's angle, scale the distance with the new framing
    off.copy(camera.position).sub(controls.target);
    off.multiplyScalar(homeDist / prev);
    camera.position.copy(controls.target).add(off);
    controls.update();
    homeSph.radius = homeDist;
    world.setPointScale(renderer.getPixelRatio() * h / 900);
    // setSize clears the canvas: draw again on the next display frame, even between throttled loop frames
    forceNext = true;
    requestFrame();
  }

  // ------------------------------------------------------------ robot
  const J: Record<string, THREE.Object3D> = {};
  const lamps: THREE.MeshStandardMaterial[] = [];
  let robot: THREE.Object3D;
  const setJoint = (name: string, v: number) => {
    const l = J[name];
    if (!l) return;
    if (name === 'l_1') l.position.y = v; else l.rotation.y = v;
  };

  const release = () => {
    renderer.setAnimationLoop(null);
    controls.dispose();
    disposeTree(scene);
    env.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };
  try {
    const data = await fetchModel(o.modelUrl, o.modelBytes, signal, o.onProgress);
    const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(data, '');
    robot = gltf.scene;
    scene.add(robot);
    signal.throwIfAborted();
  } catch (err) {
    release();
    throw err;
  }
  robot.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.castShadow = mesh.receiveShadow = true;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat.name === 'Lamp') { mat.color.setHex(0x6cc8ff); mat.emissive.setHex(0x2aa8ff); mat.emissiveIntensity = 1.5; lamps.push(mat); }
      if (mat.name === 'BrandLogo' && mat.map) { // printed logo: keep its own colours under the lights
        const map = mat.map;
        map.anisotropy = renderer.capabilities.getMaxAnisotropy();
        map.colorSpace = THREE.SRGBColorSpace;
        map.needsUpdate = true;
        mesh.material = new THREE.MeshBasicMaterial({ map, transparent: true, alphaTest: 0.04, toneMapped: false,
          depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
        mat.dispose();
      }
      if (mesh.name.startsWith('ring_shoulder')) { // the arm's status ring: green, "arm enabled"
        mat.dispose();
        mesh.material = new THREE.MeshBasicMaterial({ color: new THREE.Color(...ARM_ENABLED), toneMapped: false });
      }
    }
    if (obj.name.startsWith('joint_') && obj.children[0]) J[obj.name.slice(6)] = obj.children[0];
  });
  // the body at rest, as the app shows it: head at its bottom stop
  setJoint('l_3', 0); setJoint('l_4', (5 * Math.PI) / 180); setJoint('l_2', 0); setJoint('l_1', 0);
  ARM_REST.forEach((v, i) => setJoint(ARM_JOINTS[i], v));

  // ------------------------------------------------------------ motion
  let t = reduced ? 9 : 0; // scene time, s; a fixed moment when motion is reduced
  let waveAt = -1; // scene time the wave started, -1 when none
  let swayT = 0, swayBlend = 0;
  let homing = false;
  let interacting = false, lastInteract = -Infinity;
  const pose = ARM_REST.slice();

  function poseArm() {
    const idle = reduced ? 0 : 1;
    let w = 0, swing = 0;
    if (waveAt >= 0) {
      const s = t - waveAt;
      w = smooth(0, 0.9, s) * (1 - smooth(WAVE_S - 1.0, WAVE_S, s));
      swing = Math.sin(Math.max(0, s - 0.7) * Math.PI * 2 * WAVE_SWING.hz) * smooth(0.6, 1.1, s) * (1 - smooth(WAVE_S - 1.2, WAVE_S - 0.6, s));
      if (s >= WAVE_S) { waveAt = -1; o.onWave?.(false); schedule(); }
    }
    for (let i = 0; i < 6; i++) pose[i] = ARM_REST[i] + (WAVE_POSE[i] - ARM_REST[i]) * w;
    pose[WAVE_SWING.joint] += swing * WAVE_SWING.amp;
    // idle: a slow breath of the shoulder and the base, faded out while waving
    pose[0] += idle * (1 - w) * 0.09 * Math.sin(t * 0.45);
    pose[1] += idle * (1 - w) * 0.06 * Math.sin(t * 0.33 + 1.2);
    pose.forEach((v, i) => setJoint(ARM_JOINTS[i], v));
    setJoint('l_3', idle * 0.16 * Math.sin(t * 0.21) + w * 0.25); // the head turns a little, and towards its wave
  }

  function moveCamera(dt: number) {
    const now = performance.now();
    const k = (rate: number) => 1 - Math.exp(-dt * rate);
    off.copy(camera.position).sub(controls.target);
    sph.setFromVector3(off);
    if (homing) {
      const a = k(5);
      sph.theta += wrap(homeSph.theta - sph.theta) * a;
      sph.phi += (homeSph.phi - sph.phi) * a;
      sph.radius += (homeDist - sph.radius) * a;
      if (Math.abs(wrap(homeSph.theta - sph.theta)) < 1e-3 && Math.abs(homeSph.phi - sph.phi) < 1e-3) { homing = false; swayT = 0; swayBlend = 0; }
    } else if (!reduced && !interacting && now - lastInteract > IDLE_RESUME_MS) {
      swayT += dt;
      swayBlend = Math.min(1, swayBlend + dt / 3);
      const want = homeSph.theta + SWAY_AMP * Math.sin(swayT * SWAY_RATE);
      const a = k(1.2) * swayBlend;
      sph.theta += wrap(want - sph.theta) * a;
      sph.phi += (homeSph.phi - sph.phi) * a * 0.5;
      sph.radius += (homeDist - sph.radius) * a * 0.5;
    } else return;
    camera.position.setFromSpherical(sph).add(controls.target);
  }

  // ------------------------------------------------------------ interaction
  const opts = { signal } as const;
  controls.addEventListener('start', onStart);
  controls.addEventListener('end', onEnd);
  controls.addEventListener('change', requestFrame);
  function onStart() { interacting = true; homing = false; swayBlend = 0; schedule(); }
  function onEnd() { interacting = false; lastInteract = performance.now(); schedule(); }
  // zoom only on purpose: ctrl/cmd + wheel (and trackpad pinch, which browsers send as ctrl + wheel); a plain wheel scrolls the page
  host.addEventListener('wheel', (e) => { controls.enableZoom = e.ctrlKey || e.metaKey; }, { ...opts, capture: true, passive: true });
  host.addEventListener('pointerdown', (e) => { controls.enableZoom = e.pointerType === 'touch'; }, { ...opts, capture: true });
  function reset() {
    if (reduced) {
      camera.position.copy(controls.target).addScaledVector(HOME_DIR, homeDist);
      controls.update();
      return;
    }
    homing = true;
    lastInteract = -Infinity;
    schedule();
  }
  canvas.addEventListener('dblclick', reset, opts);
  // double tap on touch screens (the app's rule): one finger, short and still, twice within 320 ms
  const down = new Map<number, { x: number; y: number; t: number }>();
  let maxFingers = 0, lastTap = 0;
  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    down.set(e.pointerId, { x: e.clientX, y: e.clientY, t: performance.now() });
    maxFingers = Math.max(maxFingers, down.size);
  }, opts);
  const endPointer = (e: PointerEvent, cancelled: boolean) => {
    const d = down.get(e.pointerId);
    down.delete(e.pointerId);
    const multi = maxFingers > 1;
    if (down.size === 0) maxFingers = 0;
    if (!d || cancelled || multi) { lastTap = 0; return; }
    const now = performance.now();
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) >= 10 || now - d.t >= 250) { lastTap = 0; return; }
    if (now - lastTap < 320) { reset(); lastTap = 0; } else lastTap = now;
  };
  canvas.addEventListener('pointerup', (e) => endPointer(e, false), opts);
  canvas.addEventListener('pointercancel', (e) => endPointer(e, true), opts);

  // ------------------------------------------------------------ loop
  const clock = new THREE.Clock(false);
  const camDir = new THREE.Vector3();
  let visible = false, looping = false, frameReq = 0, frameNo = 0, forceNext = false;
  let frames = 0, fpsSince = performance.now(), born = performance.now();
  let gapInEffect = -1; // ms between drawn frames the loop is aiming for, 0 = every display frame

  // counts only loop frames, against the rate the throttle allows at that moment: frames the throttle
  // skips on purpose must not read as a slow GPU
  function resetFps(now: number) { frames = 0; fpsSince = now; }
  function adaptQuality(now: number, targetFps: number) {
    frames++;
    const span = now - fpsSince;
    if (span < FPS_WINDOW_MS) return;
    const fps = (frames * 1000) / span;
    resetFps(now);
    // only ever step down, and only after the start-up settles: stepping back up made the picture jump
    const slow = fps < targetFps * 0.7;
    const next = slow && now - born > PR_SETTLE_MS ? Math.max(PR_MIN, pixelRatio - 0.25) : pixelRatio;
    if (next !== pixelRatio) {
      pixelRatio = next;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight), false);
      world.setPointScale(pixelRatio * host.clientHeight / 900);
    }
  }

  let lastDraw = 0, scrollingUntil = 0;
  addEventListener('scroll', () => { scrollingUntil = performance.now() + 180; }, { passive: true, signal: o.signal });

  // the animation loop: full rate while dragging or waving, ~30 fps idle, ~12 fps while the page scrolls
  function tick() {
    const now = performance.now();
    const scrolling = now < scrollingUntil;
    const gap = interacting || waveAt >= 0 ? 0 : scrolling ? SCROLL_FRAME_MS : IDLE_FRAME_MS;
    if (gap !== gapInEffect) { gapInEffect = gap; resetFps(now); }
    if (!forceNext && frameNo > 0 && now - lastDraw < gap - 2) return;
    forceNext = false;
    // before drawing, so a new pixel ratio (which clears the canvas) is drawn in this same frame
    if (!scrolling) adaptQuality(now, gap ? 1000 / gap : ACTIVE_FPS);
    draw();
  }

  // one frame, never throttled: the loop decides when to call it, on-demand frames always draw
  function draw() {
    lastDraw = performance.now();
    const dt = Math.min(clock.getDelta(), 0.1);
    const animate = !reduced || waveAt >= 0;
    if (animate) t += dt;
    poseArm();
    if (animate || frameNo === 0) renderer.shadowMap.needsUpdate = reduced || frameNo % 4 === 0;
    moveCamera(dt);
    controls.update(dt);
    camera.getWorldDirection(camDir);
    world.update(t, camDir);
    renderer.render(scene, camera);
    frameNo++;
  }

  // animate while on screen, unless motion is reduced; then frames are drawn only when something changes
  function schedule() {
    const want = visible && (!reduced || waveAt >= 0 || homing || interacting);
    if (want === looping) return;
    looping = want;
    if (want) {
      // a paused loop (off screen, hidden tab) must not count its pause as slow frames
      gapInEffect = -1;
      clock.start();
      renderer.setAnimationLoop(tick);
    } else { renderer.setAnimationLoop(null); clock.stop(); }
  }
  // outside the loop (reduced motion, off-loop view changes): draw one frame on the next display frame;
  // inside the loop, layout() sets forceNext so the loop draws it
  function requestFrame() {
    if (looping || !visible || frameReq) return;
    frameReq = requestAnimationFrame(() => { frameReq = 0; clock.getDelta(); draw(); });
  }

  const ro = new ResizeObserver(layout);
  ro.observe(host);
  layout();
  // compile every shader in parallel (KHR_parallel_shader_compile) before the first frame,
  // so the page does not freeze for a second when the robot appears
  await renderer.compileAsync(scene, camera);
  if (signal.aborted) { ro.disconnect(); release(); signal.throwIfAborted(); }

  let disposed = false;
  return {
    setVisible(v) {
      visible = v;
      schedule();
      requestFrame();
    },
    wave() {
      if (waveAt >= 0) return false;
      waveAt = t;
      o.onWave?.(true);
      schedule();
      return true;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      renderer.setAnimationLoop(null);
      cancelAnimationFrame(frameReq);
      ro.disconnect();
      controls.removeEventListener('start', onStart);
      controls.removeEventListener('end', onEnd);
      controls.removeEventListener('change', requestFrame);
      release();
    },
  };
}
