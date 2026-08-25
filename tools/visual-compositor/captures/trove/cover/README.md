# Trove book-opening animation

This package contains two implementations of the same animation:

- `TroveBookAnimation.swift` — native SwiftUI, designed for iOS 17 and later.
- `trove-book-animation.html` — self-contained portfolio preview with no external assets.

## iOS

Add `TroveBookAnimation.swift` to your Xcode target, then use:

```swift
TroveBookAnimation()
    .frame(width: 340, height: 300)
```

Set `loops: false` when the animation should play only once:

```swift
TroveBookAnimation(loops: false)
```

The component uses SwiftUI shapes plus a licensed family of food SVGs, and respects Reduce Motion. Its 5.4-second loop opens the cover, flips through roughly eight intentionally illustrated food pages, then returns the sheets in reverse order before closing and recentering the cover. The editable SVG sources belong in the ignored `assets/licensed/` directory and must not be redistributed. When moving the component into an iOS target, add the selected SVGs to the asset catalog with their existing names.

The final `DINNER INSPIRATION` title uses Trove orange, matching the other page titles in both implementations.

`TroveBookAnimation` also accepts an optional `previewProgress` from `0...1`.
Use it only for deterministic QA or export; normal playback leaves it nil.
`FrameRenderer.swift` uses that hook to render fixed timeline checkpoints so
the closing interval can be reviewed without relying on screenshot timing.
Pass `--full` after the output directory to render all 163 frames of the
5.4-second, 30 fps portfolio loop.

## Portfolio

Open `trove-book-animation.html` in a browser. Click the animation or the replay button to restart it. The preview is responsive and includes a reduced-motion fallback.

## Palette

- Cover orange: `#EA6A2E`
- Cover shadow: `#C94F1F`
- Paper: `#FFFFFF`
- Ink: `#713523`
- Accent blue: `#6DB7C5`
- Background: `#FFF9EF`
