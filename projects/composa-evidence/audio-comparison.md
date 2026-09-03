# Audio adjustment comparison

Source recordings supplied by Samuel on 2026-09-03 (originals retained on Desktop):

- Composa: `Screen Recording 2026-09-03 at 11.32.55 AM.mov`, 1680×1050, about 28 seconds.
- Sequence: `Screen Recording 2026-09-03 at 11.24.41 AM.mov`, 1680×1050, about 6 seconds. Reference UI, not Composa.

Web derivatives retain full recording bounds and audio: 1440×900, 30 fps,
H.264/yuv420p, AAC, fast-start MP4. Posters are frames at 2 seconds.

## Framing source

- [Composa frame](https://www.figma.com/design/zztzz39bzzWFxP8nCxvxUW/Untitled?node-id=8-17)
- [Sequence frame](https://www.figma.com/design/zztzz39bzzWFxP8nCxvxUW/Untitled?node-id=7-11)

Both references use a white 600×600 frame and a 1006×628.75 recording layer
at x=-576, y=70. `.np-audio-crop` preserves these proportions in CSS, rather
than baking a crop into the media. The right inspector remains the focal point.
Following review, the outer stages use the site's soft-grey theme token and
standard board-tag labels. The source recording pixels and Figma crop remain unchanged.

Media effects uses the exact screenshot asset exported from Figma node `7:6`
in the same file, with the same crop. Composa's counterpart is explicitly pending.
The inline product favicon is the original asset from `https://composa.app/favicon.svg`.

The comparison uses the existing two-column grid and its mobile stack breakpoint.
Each clip has independent shared playback controls and starts muted.

Source and media checks passed. Browser visual QA was blocked by a full startup
disk during integration; verify desktop/mobile framing in the local preview.
