import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const toolsDir = dirname(fileURLToPath(import.meta.url));
const root = dirname(toolsDir);
const sourceLogo = await readFile(join(root, "projects/rem.svg"), "utf8");
const outlineMatch = sourceLogo.match(/<path fill-rule="evenodd" clip-rule="evenodd" d="([^"]+)"/);

if (!outlineMatch) throw new Error("Could not find the Rem outline path in projects/rem.svg");

const outline = outlineMatch[1];
const loaderPath = `${outline.split("Z")[0]}Z`;
const outputDir = join(root, "projects/rem-thinking-transition");
const originalDir = join(root, "projects/rem-logo-transition-inverted");
const background = "#0C50FF";
const foreground = "white";
const loadingFrames = 36;
const transitionFrames = 8;
const totalFrames = loadingFrames + transitionFrames;

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const ease = (value) => 1 - Math.pow(1 - value, 3);
const pad3 = (value) => String(value).padStart(3, "0");

for (let frame = 0; frame < totalFrames; frame += 1) {
  const isTransition = frame >= loadingFrames;
  const transitionProgress = isTransition
    ? ease((frame - loadingFrames) / Math.max(1, transitionFrames - 1))
    : 0;
  const moveProgress = isTransition
    ? ease(Math.max(0, (transitionProgress - 0.2) / 0.8))
    : 0;
  const cycleProgress = (frame % 12) / 11;
  const drawn = isTransition ? 100 : Math.min(100, cycleProgress * 118);
  const loaderX = 548 + (690 - 548) * moveProgress;
  const loaderY = 458 + (260 - 458) * moveProgress;
  const loaderScale = 1.5 + (5.4 - 1.5) * moveProgress;
  const textOpacity = Math.max(0, 1 - transitionProgress * 4);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <rect width="1920" height="1080" fill="${background}"/>
  <g transform="translate(${loaderX.toFixed(3)} ${loaderY.toFixed(3)}) scale(${loaderScale.toFixed(4)})">
    <path d="${loaderPath}" fill="none" stroke="${foreground}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="${drawn.toFixed(3)} 100"/>
  </g>
  <text x="738" y="586" fill="${foreground}" opacity="${textOpacity.toFixed(4)}" font-family="Arial, Helvetica, sans-serif" font-size="116" font-weight="700" letter-spacing="-3">Thinking</text>
</svg>`;

  await writeFile(join(outputDir, `${pad3(frame)}.svg`), svg);
}

const originalFrames = (await readdir(originalDir)).filter((name) => name.endsWith(".svg"));
let recolored = 0;

for (const name of originalFrames) {
  const path = join(originalDir, name);
  const source = await readFile(path, "utf8");
  const backgroundToken = "__REM_COVER_BACKGROUND__";
  const next = source
    .replace(
      /<path fill="(?:white|#F6E35A|#0C50FF)" transform="translate\(960 540\.5\)" d="M-960 -540\.5/,
      `<path fill="${backgroundToken}" transform="translate(960 540.5)" d="M-960 -540.5`,
    )
    .replaceAll('fill="#0C50FF"', 'fill="white"')
    .replaceAll('fill="#F6E35A"', 'fill="white"')
    .replace(/<path(?=\s+transform=)(?![^>]*\b(?:fill|stroke)=)/g, '<path fill="white"')
    .replace(`fill="${backgroundToken}"`, `fill="${background}"`);
  if (next !== source) await writeFile(path, next);
  if (next.includes(`<path fill="${background}" transform="translate(960 540.5)" d="M-960 -540.5`)) recolored += 1;
}

if (recolored !== originalFrames.length) {
  throw new Error(`Recolored ${recolored} of ${originalFrames.length} original Rem frames`);
}

console.log(`Generated ${totalFrames} Thinking frames and recolored ${recolored} original Rem frames.`);
