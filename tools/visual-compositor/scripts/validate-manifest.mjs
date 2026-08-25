import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

const manifestPath = process.argv[2];

if (!manifestPath) {
  console.error("Usage: node validate-manifest.mjs MANIFEST_JSON");
  process.exit(64);
}

const absolutePath = resolve(manifestPath);
const manifest = JSON.parse(await readFile(absolutePath, "utf8"));
const errors = [];

function requireValue(condition, message) {
  if (!condition) errors.push(message);
}

function isNormalized(value) {
  return Number.isFinite(value) && value >= 0 && value <= 1;
}

requireValue(manifest.schemaVersion === 1, "schemaVersion must be 1");
requireValue(Boolean(manifest.id), "id is required");
requireValue(Boolean(manifest.claim), "claim is required");
requireValue(Boolean(manifest.media?.master), "media.master is required");
requireValue(Boolean(manifest.media?.web), "media.web is required");
requireValue(manifest.media?.out > manifest.media?.in, "media.out must follow media.in");
requireValue(Boolean(manifest.device?.frame), "device.frame is required");
requireValue(["light", "dark"].includes(manifest.composition?.colorMode),
  "composition.colorMode must be light or dark");
requireValue(["auto", "project"].includes(manifest.composition?.cursor?.mode),
  "composition.cursor.mode must be auto or project");
requireValue(manifest.composition?.cursor?.mode !== "project" ||
  Boolean(manifest.composition.cursor.project),
  "composition.cursor.project is required when cursor mode is project");
requireValue(Boolean(manifest.variants?.[manifest.composition?.defaultVariant]),
  "composition.defaultVariant must name a declared variant");

for (const [name, variant] of Object.entries(manifest.variants ?? {})) {
  requireValue(Number.isInteger(variant.width) && variant.width > 0,
    `${name}.width must be a positive integer`);
  requireValue(Number.isInteger(variant.height) && variant.height > 0,
    `${name}.height must be a positive integer`);
  requireValue(variant.width % 2 === 0 && variant.height % 2 === 0,
    `${name} dimensions must be even for H.264 export`);
  requireValue(variant.deviceHeight > 0 && variant.deviceHeight <= 1,
    `${name}.deviceHeight must be in (0, 1]`);
}

let previousCameraTime = -Infinity;
for (const frame of manifest.tracks?.camera ?? []) {
  requireValue(frame.time >= previousCameraTime, "camera keyframes must be time-sorted");
  requireValue(Number.isFinite(frame.scale) && frame.scale > 0,
    "camera scale must be positive");
  previousCameraTime = frame.time;
}

for (const overlay of manifest.tracks?.overlays ?? []) {
  requireValue(["focus", "tap", "cursor"].includes(overlay.kind),
    `${overlay.id ?? "overlay"} has an unsupported kind`);
  requireValue(isNormalized(overlay.x) && isNormalized(overlay.y),
    `${overlay.id ?? "overlay"} coordinates must be normalized`);
  requireValue(overlay.start >= manifest.media.in && overlay.start <= manifest.media.out,
    `${overlay.id ?? "overlay"} starts outside the media range`);
  requireValue(overlay.duration > 0, `${overlay.id ?? "overlay"} duration must be positive`);
}

if (errors.length) {
  console.error(`Invalid scene: ${manifest.id ?? absolutePath}`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Valid scene: ${manifest.id}`);
console.log(`Duration: ${(manifest.media.out - manifest.media.in).toFixed(2)}s`);
console.log(`Variants: ${Object.keys(manifest.variants).join(", ")}`);
console.log(`Tracks: camera (${manifest.tracks.camera.length}), overlays (${manifest.tracks.overlays.length})`);
