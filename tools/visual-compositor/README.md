# Visual compositor lab

This is a deliberately small, manifest-driven compositor for portfolio product
media. It keeps product capture separate from presentation so the same scene can
later be consumed by a native SwiftUI / RealityKit renderer.

The first scene uses the existing Rem conversational recording to prove:

- browser-safe source normalization
- a real SVG device frame
- deterministic camera keyframes
- editable focus, tap, and cursor overlays
- 16:9, square, and 4:5 presentation presets
- a reduced-motion fallback

The case-study copy and page structure are intentionally out of scope. This lab
may consume artifacts from newer portfolio branches without becoming the source
of truth for their narrative.

Project capture briefs live under `captures/`. The
[Rem capture plan](captures/rem/README.md) maps each approved solution claim to
static, motion, fixture, and fallback evidence before compositor work begins.

## Prepare the first source

From the repository root:

```sh
tools/visual-compositor/scripts/normalize-video.sh \
  projects/rem-evidence/rem-chat-conversational-light.mov \
  tools/visual-compositor/generated/rem-chat-light.mp4 \
  tools/visual-compositor/generated/rem-chat-light-poster.jpg \
  7
```

The original HEVC master is left untouched. Generated derivatives are ignored by
Git because they can be reproduced from the checked-in source.

## Preview

Serve the repository root over HTTP, then open:

```text
/tools/visual-compositor/
```

For example:

```sh
python3 -m http.server 4173
```

Validate a scene before previewing it:

```sh
node tools/visual-compositor/scripts/validate-manifest.mjs \
  tools/visual-compositor/manifests/rem-chat-light.json
```

## Scene contract

`manifests/rem-chat-light.json` is the portable contract. Time is expressed in
seconds. Screen-space positions are normalized from `0` to `1`, independent of
the export resolution.

The browser renderer currently understands:

- `camera`: scale and normalized x/y translation keyframes
- `focus`: non-interactive editorial emphasis around a real state change
- `tap`: touch feedback added as a presentation layer
- `cursor`: pointer position and visibility for web products

Cursor color defaults to neutral grey and follows `composition.colorMode`.
Individual projects can opt into an accent by setting `cursor.mode` to `project`
and supplying `cursor.project`; projects do not need to invent a cursor treatment.

Only `camera` and `focus` are active in the Rem scene because the source recording
begins after the initiating tap. Adding a fictional tap would misrepresent the
captured interaction.

## Native renderer spike

`native/` contains the first SwiftUI + RealityKit consumer. It loads the source
USDZ through one normalization adapter, replaces the separate screen material
with an AVPlayer video material, and exposes repeatable front/three-quarter/profile
poses plus drag rotation.

The [device audit](device-models/iphone-17-pro-max-audit.md) explains why the
download remains a source asset until its USD schema and imported FBX transforms
are repaired. Attribution is MajdyModels / CC BY 4.0.

## Native renderer handoff

The future native renderer should decode this same scene document and map:

- `media.web` to an AVPlayer-backed screen material
- `device.frame` to the basic flat preview fallback
- the later USDZ asset to RealityKit device geometry
- `camera` to typed camera transforms
- interaction tracks to 2D or screen-anchored overlays
- `variants` to export resolution and safe-area presets

Preview and export must sample the same timeline clock. Per-project offsets should
not be embedded in renderer code; device normalization belongs in an import step.
