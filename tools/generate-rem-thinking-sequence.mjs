import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const toolsDir = dirname(fileURLToPath(import.meta.url));
const root = dirname(toolsDir);
const sourceLogo = await readFile(join(root, "projects/rem.svg"), "utf8");
const loaderPathMatch = sourceLogo.match(/<path fill-rule="evenodd" clip-rule="evenodd" d="([^"]+)"/);
const outputDir = join(root, "projects/rem-thinking-transition");
const originalDir = join(root, "projects/rem-logo-transition-inverted");
const firstLogoFrame = await readFile(join(originalDir, "000.svg"), "utf8");
const outerShapeMatch = firstLogoFrame.match(/<path fill="[^"]+" transform="matrix\(2\.41892[^>]+ d="([^"]+)"/);
const innerShapeMatch = firstLogoFrame.match(/<path fill="[^"]+" transform="matrix\(6\.6551[^>]+ d="([^"]+)"/);

if (!loaderPathMatch) throw new Error("Could not find the Rem outline path in projects/rem.svg");
if (!outerShapeMatch) throw new Error("Could not find the Rem outer shape path in frame 000");
if (!innerShapeMatch) throw new Error("Could not find the Rem inner shape path in frame 000");

const loaderPath = `${loaderPathMatch[1].split("Z")[0]}Z`;
const outerShape = outerShapeMatch[1];
const innerShape = innerShapeMatch[1];
const background = "#EEF0F3";
const foreground = "#0C50FF";
const loadingFrames = 36;
const transitionFrames = 22;
const totalFrames = loadingFrames + transitionFrames;

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const ease = (value) => 1 - Math.pow(1 - value, 3);
const clamp = (value) => Math.max(0, Math.min(1, value));
const pad3 = (value) => String(value).padStart(3, "0");

for (let frame = 0; frame < totalFrames; frame += 1) {
  const isTransition = frame >= loadingFrames;
  const transitionProgress = isTransition
    ? ease((frame - loadingFrames) / Math.max(1, transitionFrames - 1))
    : 0;
  const moveProgress = isTransition
    ? ease(clamp((transitionProgress - 0.18) / 0.50))
    : 0;
  const cycleProgress = (frame % 12) / 11;
  const drawn = isTransition ? 100 : Math.min(100, cycleProgress * 118);
  const loaderX = 780 + (960.146 - 780) * moveProgress;
  const loaderY = 540.204;
  const loaderScale = 1.5 + (6.6551 - 1.5) * moveProgress;
  const textOpacity = 1 - ease(clamp(transitionProgress / 0.18));
  const resolveProgress = isTransition
    ? ease(clamp((transitionProgress - 0.68) / 0.18))
    : 0;
  const innerProgress = isTransition
    ? ease(clamp((transitionProgress - 0.86) / 0.14))
    : 0;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <rect width="1920" height="1080" fill="${background}"/>
  <g transform="translate(${loaderX.toFixed(3)} ${loaderY.toFixed(3)}) scale(${loaderScale.toFixed(4)})">
    <path d="${loaderPath}" transform="translate(-49.5398 -50.1997)" fill="none" stroke="${foreground}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="${drawn.toFixed(3)} 100" opacity="${(1 - resolveProgress).toFixed(4)}"/>
  </g>
  <path d="${outerShape}" fill="${foreground}" opacity="${resolveProgress.toFixed(4)}" transform="matrix(2.41892 0 0 2.41892 960.146 540.204)"/>
  <path d="${innerShape}" fill="${foreground}" opacity="${innerProgress.toFixed(4)}" transform="matrix(6.6551 0 0 6.65509 959.937 557.116)"/>
  <text x="860" y="575" fill="${foreground}" opacity="${textOpacity.toFixed(4)}" font-family="Arial, Helvetica, sans-serif" font-size="90" font-weight="450" letter-spacing="-2">Thinking</text>
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
    .replaceAll('fill="white"', `fill="${foreground}"`)
    .replaceAll('fill="#F6E35A"', `fill="${foreground}"`)
    .replace(/<path(?=\s+transform=)(?![^>]*\b(?:fill|stroke)=)/g, `<path fill="${foreground}"`)
    .replace(`fill="${backgroundToken}"`, `fill="${background}"`);
  if (next !== source) await writeFile(path, next);
  if (next.includes(`<path fill="${background}" transform="translate(960 540.5)" d="M-960 -540.5`)) recolored += 1;
}

if (recolored !== originalFrames.length) {
  throw new Error(`Recolored ${recolored} of ${originalFrames.length} original Rem frames`);
}

console.log(`Generated ${totalFrames} Thinking frames and recolored ${recolored} original Rem frames.`);
