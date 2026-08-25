# iPhone 17 Pro Max USDZ audit

## Decision

Use the downloaded model as a **source asset**, not as the compositor's canonical
runtime asset. Its geometry is suitable for a RealityKit prototype, but the file
needs one normalization/repair pass before it should be checked into the project
or used for deterministic exports.

## Source and attribution

- Title: `iPhone 17 Pro Max`
- Author: [MajdyModels](https://sketchfab.com/MG990)
- Source: [Sketchfab model](https://sketchfab.com/3d-models/iphone-17-pro-max-87fc1df741384124a8ce0226d2b2058d)
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Audited SHA-256: `959903f1d012b9c900add40f3166650e26350c4cd7aca76d8f85a3f057c02e50`

The author and source link must remain in the app credits and in any redistributed
model package. A normalized derivative remains subject to the same attribution.

## What passes

- The display is separate geometry with its own `screen_001` material.
- The display has UV coordinates, so a video material can replace the static screen.
- Frame, glass, back panel, lenses, and screen use separate materials.
- The stage declares centimeter units and a Y-up axis.
- The 3.4 MB archive is small enough for an interactive prototype.

The screen entity currently appears under a Sketchfab/FBX hierarchy and includes
`Cube_010_screen_001_0` in its name. The runtime loader searches semantically for
`screen` rather than depending on the full generated path.

## What needs repair

`usdchecker` reports two classes of correctable issues:

1. Mesh material bindings do not declare `MaterialBindingAPI`.
2. Two UV reader `varname` inputs are authored as tokens rather than strings.

The source also contains nested `100x` and `0.01x` transforms from the FBX export.
Apple's command-line USD renderer exhausted its Metal buffer path while attempting
to render the unmodified archive. That is a warning against embedding source-file
offsets throughout scene code.

RealityKit loads the archive and exposes the display mesh, but the imported
`glass_002` cover renders opaque over the screen. The spike disables that cover
while preserving lens glass. The display surface also arrives with its visible
face wound inward, so the spike reverses that node for the video material. The
production derivative should repair both conditions in the asset itself.

## Normalized runtime contract

A production import should produce a derivative that:

1. repairs USD schema warnings;
2. bakes the nested FBX transforms into a single predictable root;
3. centers the device at the origin with Y up and the screen facing the camera;
4. preserves a stable screen entity name such as `screen-surface`;
5. keeps the screen UVs and separate material slot;
6. preserves attribution metadata;
7. passes `usdchecker` and a RealityKit load/rotation/video-material smoke test.

Until that derivative exists, `NormalizedDeviceLoader` centers and scales the
source asset and calibrates its sideways authored front axis at runtime behind one
adapter. No scene should contain model-specific offsets or axis corrections.
