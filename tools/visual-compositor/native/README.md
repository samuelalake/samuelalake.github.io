# Native device renderer spike

This is the deliberately narrow 3D presentation layer for the visual compositor.
It does not replace the browser editor. It proves that a normalized USDZ device
can rotate in real depth and accept an AVPlayer-backed screen material.

## Generate and build

```sh
cd tools/visual-compositor/native
xcodegen generate
xcodebuild -project VisualCompositorNative.xcodeproj \
  -scheme VisualCompositorNative \
  -destination 'platform=macOS' build
```

At launch the spike looks for:

- `VISUAL_COMPOSITOR_DEVICE`, or `~/Downloads/iPhone_17_Pro_Max.usdz`
- `VISUAL_COMPOSITOR_VIDEO`, or the generated Rem H.264 derivative when the app
  is launched from this repository

The source USDZ remains outside the repository until a normalized derivative is
produced and its CC BY 4.0 attribution is packaged with it.

## Interaction

- Drag horizontally to rotate the device.
- Use Front, Three-quarter, and Profile for repeatable presentation poses.
- Toggle playback to verify that the screen material remains attached while the
  device rotates.

The three poses use short springs. They are presentation cues, not a timeline
editor; authored camera/device tracks still belong in the shared scene manifest.
