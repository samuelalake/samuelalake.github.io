# Homepage Animation Notes

This repo currently contains the built GitHub Pages output, not the original React source. The homepage animation logic lives in `assets/index-CkmA7TRj.js`, and the Munch icon animation styles live in `assets/index-DcLK9jS5.css`.

## Intended Behavior

- Hero typing is independent from the project-card sequence.
- Project cards are a one-shot sequence: Facebook -> Rem -> Wayfind -> Munch.
- Only one project card should actively animate at a time.
- If a visitor scrolls past a card before it plays, that card should jump to its final frame.
- Completed cards stay frozen at their final frame.
- The sequence does not loop back to Facebook after Munch completes.
- Munch uses a static PNG before/after playback and swaps to a cache-busted GIF only while playing.

## Current Implementation Shape

- `yu(...)` is the frame-sequence hook for SVG frame folders.
  - `isPlaying` starts advancing frames.
  - `holdFrame` is used when the card is idle or already complete.
- `usePortfolioVisible(selector)` gates animation by viewport visibility.
- `usePortfolioPast(selector)` marks cards as effectively passed once most of the media is above the viewport.
- `usePortfolioDelayedFlag(true, 800)` gives the page a short beat before card animations can begin.
- `Cx(...)` owns the homepage stage machine:
  - stage `0`: Facebook
  - stage `1`: Rem
  - stage `2`: Wayfind
  - stage `3`: Munch
  - stage `4`: done

## Munch-Specific Notes

- Before playing, Munch shows `projects/munch-evidence/avocado-gif-start.png`.
- While playing, Munch swaps to `avocado-gif-loop-twice-stop-closed.gif?play=N`.
- The `play=N` token forces browsers to restart GIF decoding on each fresh play.
- After playing or being skipped, `.repo-project-media-munch.is-complete` freezes the gradient app icon state.

## Editing Notes

- After changing JS or CSS, update the `?v=` cache-busting query in every HTML entry point.
- Run `node --check assets/index-CkmA7TRj.js` after editing the JS bundle.
- Verify in the browser from both slow-scroll and fast-scroll paths.
