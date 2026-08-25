const manifestUrl = "./manifests/rem-chat-light.json";

const elements = {
  title: document.querySelector("#scene-title"),
  claim: document.querySelector("#scene-claim"),
  stage: document.querySelector("#stage"),
  cameraLayer: document.querySelector("#camera-layer"),
  device: document.querySelector("#device"),
  screen: document.querySelector("#device-screen"),
  frame: document.querySelector("#device-frame"),
  video: document.querySelector("#product-video"),
  overlays: document.querySelector("#overlay-layer"),
  play: document.querySelector("#play-toggle"),
  restart: document.querySelector("#restart"),
  timeline: document.querySelector("#timeline"),
  currentTime: document.querySelector("#current-time"),
  duration: document.querySelector("#duration"),
  trackList: document.querySelector("#track-list"),
  sourceStatus: document.querySelector("#source-status"),
  sourceCopy: document.querySelector("#source-copy"),
  variantButtons: [...document.querySelectorAll("[data-variant]")]
};

let manifest;
let animationFrame;
let overlayNodes = [];
let scrubbing = false;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mix(from, to, progress) {
  return from + (to - from) * progress;
}

function easeInOut(progress) {
  const p = clamp(progress, 0, 1);
  return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

function formatTime(seconds) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = (safeSeconds % 60).toFixed(2).padStart(5, "0");
  return `${minutes}:${remainder}`;
}

function trackValueAt(keyframes, time) {
  if (!keyframes.length) return { scale: 1, x: 0, y: 0 };
  if (time <= keyframes[0].time) return keyframes[0];
  if (time >= keyframes.at(-1).time) return keyframes.at(-1);

  const nextIndex = keyframes.findIndex((frame) => frame.time >= time);
  const previous = keyframes[nextIndex - 1];
  const next = keyframes[nextIndex];
  const progress = easeInOut((time - previous.time) / (next.time - previous.time));

  return {
    scale: mix(previous.scale, next.scale, progress),
    x: mix(previous.x, next.x, progress),
    y: mix(previous.y, next.y, progress)
  };
}

function applyCamera(time) {
  const camera = trackValueAt(manifest.tracks.camera, time);
  const translateX = camera.x * elements.stage.clientWidth;
  const translateY = camera.y * elements.stage.clientHeight;
  elements.cameraLayer.style.transform =
    `translate3d(${translateX}px, ${translateY}px, 0) scale(${camera.scale})`;
}

function applyOverlays(time) {
  overlayNodes.forEach(({ event, node }) => {
    const progress = (time - event.start) / event.duration;
    const active = progress >= 0 && progress <= 1;
    node.classList.toggle("is-active", active);

    if (!active) return;

    const pulse = Math.sin(clamp(progress, 0, 1) * Math.PI);
    node.style.setProperty("--cue-opacity", String(0.3 + pulse * 0.7));
    node.style.setProperty("--cue-scale", String(0.82 + pulse * 0.28));
  });
}

function render(time = elements.video.currentTime) {
  applyCamera(time);
  applyOverlays(time);

  const start = manifest.media.in;
  const end = manifest.media.out;
  const duration = end - start;
  const progress = clamp((time - start) / duration, 0, 1);

  if (!scrubbing) elements.timeline.value = String(progress);
  elements.currentTime.textContent = formatTime(time - start);

  if (!elements.video.paused && time >= end) {
    elements.video.currentTime = start;
  }

  animationFrame = requestAnimationFrame(() => render());
}

function buildOverlays() {
  elements.overlays.replaceChildren();
  overlayNodes = manifest.tracks.overlays.map((event) => {
    const node = document.createElement("div");
    node.className = "overlay-cue";
    node.dataset.kind = event.kind;
    node.style.left = `${event.x * 100}%`;
    node.style.top = `${event.y * 100}%`;
    node.style.setProperty("--cue-size", `${event.size * 100}%`);
    node.title = event.label;
    elements.overlays.append(node);
    return { event, node };
  });
}

function buildTrackList() {
  const tracks = [
    ["Camera", `${manifest.tracks.camera.length} keyframes`],
    ...manifest.tracks.overlays.map((event) => [event.label, event.kind])
  ];

  elements.trackList.replaceChildren(
    ...tracks.map(([label, type]) => {
      const item = document.createElement("li");
      const name = document.createElement("span");
      const code = document.createElement("code");
      name.textContent = label;
      code.textContent = type;
      item.append(name, code);
      return item;
    })
  );
}

function applyScreenInset() {
  const { x, y, width, height } = manifest.device.screenInset;
  Object.assign(elements.screen.style, {
    left: `${x * 100}%`,
    top: `${y * 100}%`,
    width: `${width * 100}%`,
    height: `${height * 100}%`
  });
}

function setVariant(name) {
  const variant = manifest.variants[name];
  if (!variant) return;

  elements.stage.dataset.variant = name;
  elements.stage.style.setProperty("--device-height", `${variant.deviceHeight * 100}%`);
  elements.variantButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.variant === name));
  });
}

function setSourceState(state, copy) {
  elements.sourceStatus.className = `status-dot is-${state}`;
  elements.sourceCopy.textContent = copy;
}

function resolveCursorColor(composition) {
  const cursor = composition.cursor ?? {};
  if (cursor.mode === "project" && cursor.project) return cursor.project;
  return composition.colorMode === "dark"
    ? cursor.dark ?? "#d8dde5"
    : cursor.light ?? "#3f4652";
}

async function initialize() {
  const response = await fetch(manifestUrl);
  if (!response.ok) throw new Error(`Manifest failed to load (${response.status})`);
  manifest = await response.json();

  elements.title.textContent = manifest.title;
  elements.claim.textContent = manifest.claim;
  elements.stage.style.setProperty("--stage-background", manifest.composition.background);
  elements.stage.style.setProperty("--stage-foreground", manifest.composition.foreground);
  elements.stage.style.setProperty("--accent", manifest.composition.accent);
  elements.stage.style.setProperty("--cursor-color", resolveCursorColor(manifest.composition));
  elements.frame.src = manifest.device.frame;
  elements.video.src = manifest.media.web;
  elements.video.poster = manifest.media.poster;

  applyScreenInset();
  buildOverlays();
  buildTrackList();
  setVariant(manifest.composition.defaultVariant);

  const sceneDuration = manifest.media.out - manifest.media.in;
  elements.duration.textContent = formatTime(sceneDuration);

  elements.video.addEventListener("loadedmetadata", () => {
    elements.video.currentTime = manifest.media.in;
    setSourceState("ready", "H.264 derivative loaded; the HEVC master remains untouched.");
    render(manifest.media.in);
  }, { once: true });

  elements.video.addEventListener("error", () => {
    setSourceState(
      "error",
      "Derivative unavailable. Run scripts/normalize-video.sh from the repository root."
    );
  });

  elements.video.addEventListener("play", () => {
    elements.play.textContent = "Pause";
  });

  elements.video.addEventListener("pause", () => {
    elements.play.textContent = "Play";
  });

  elements.play.addEventListener("click", async () => {
    if (elements.video.paused) {
      if (elements.video.currentTime >= manifest.media.out) {
        elements.video.currentTime = manifest.media.in;
      }
      await elements.video.play();
    } else {
      elements.video.pause();
    }
  });

  elements.restart.addEventListener("click", async () => {
    elements.video.currentTime = manifest.media.in;
    render(manifest.media.in);
    await elements.video.play();
  });

  elements.timeline.addEventListener("pointerdown", () => {
    scrubbing = true;
  });

  window.addEventListener("pointerup", () => {
    scrubbing = false;
  });

  elements.timeline.addEventListener("input", () => {
    const progress = Number(elements.timeline.value);
    elements.video.currentTime = mix(manifest.media.in, manifest.media.out, progress);
    render(elements.video.currentTime);
  });

  elements.variantButtons.forEach((button) => {
    button.addEventListener("click", () => setVariant(button.dataset.variant));
  });
}

initialize().catch((error) => {
  console.error(error);
  setSourceState("error", error.message);
});

window.addEventListener("beforeunload", () => cancelAnimationFrame(animationFrame));
