# Trove capture plan

This folder defines clean product recordings for the Trove case study. Capture
and composition stay separate: raw recordings contain only the real iPhone UI.
Device framing, cursor movement, zoom, layout, and cover treatment belong in the
visual compositor so they remain editable.

## Pinned product state

- Repository: `/Volumes/SatechiSSD/Developer/Apps/Swift/Munch`
- Source worktree inspected: `.claude/worktrees/devicecomb3`
- Branch at inspection: `integration-aug7-v19`
- Pinned commit: `2e689f2433544e836eaf0d51fa161856e7469dd2`
- Clean capture source: `/private/tmp/trove-capture-2e689f24`
- Built app: `/Volumes/SatechiSSD/_munchbuild/trove-portfolio-import/dd/Build/Products/Debug-iphonesimulator/Munch.app`
- Bundle identifier: `ade-studios.Munch-RKCK`
- Build result: succeeded on August 24, 2026

The capture build is detached from Claude's active dirty worktree. Do not capture
from the repository root or overwrite the existing `Trove ProMax` simulator.

### Revised capture build

The corrected onboarding and retailer fixtures are implemented and compiled in
a second detached checkout:

- Capture checkout: `/Volumes/SatechiSSD/Developer/Apps/Swift/Munch/.claude/worktrees/codex-trove-capture-e157`
- Built app: `/Volumes/SatechiSSD/_munchbuild/trove-capture-e157/dd/Build/Products/Debug-iphonesimulator/Munch.app`
- Disposable simulator: `Codex Trove Capture 2e689f24` (`E579FDE3-815F-4A10-BDD5-5A41D284CC06`)
- Build verification: succeeded on August 24, 2026
- Visual QA: `qa/onboarding-signin.png` and
  `qa/onboarding-book-first-page.png`

The checkout contains only Debug capture changes plus the owned
`TroveBookAnimation.swift`; Claude's active worktree remains untouched. The
implementation follows `CAPTURE-OVERRIDES.md`.

## Capture environment

Use a disposable iPhone 17 Pro Max simulator on iOS 26.2. The capture device
should start empty, use a deterministic 9:41 status bar, and run the Debug build
with these controls:

- launch argument `MUNCH_TEST_USER` for the signed-in mock cook;
- launch argument `MUNCH_SKIP_ONBOARDING` when recording core flows;
- environment variable `MUNCH_SEED_ATTRIBUTION_DEMO=1` for two deterministic
  imported recipes at the top of Discover;
- optional environment variable `MUNCH_SEED_DEMO=1` for offline saved recipes
  and the `Weeknight Dinners` collection.

Do not include taps, a portfolio cursor, a device frame, or editorial camera
movement in the source recording.

### Capture status

After local disk space was restored, the pinned app was installed on disposable
simulator `E579FDE3-815F-4A10-BDD5-5A41D284CC06`. The existing `Trove ProMax`,
`models-1370-scratch`, and `RemAgent` simulators were not modified.

The current media is evidence, not an all-approved final set. `TROVE-03 — Cook`
is the closest to final and remains the accepted baseline. The existing
`trove-02-import` files show **Save from Discover**: a recipe already visible in
Trove is opened at its source and copied into the user's private collection.
They must not be used to stand in for the two true import entry points.

Targeted recaptures remain for Plan, Shop, and onboarding:

- **Plan:** retain the interaction, but replace the synthetic `TC` identity
  with the same official Trove profile/avatar visible first in Discover.
- **Shop:** show the list as a maintainable grocery state, set one item to
  `Stocked`, then end on a capture-only retailer chooser containing Kroger and
  Amazon Fresh. Do not enter either retailer.
- **Onboarding:** begin on the complete returning-user composition: `Continue
  as Samuel`, a `Not you?` route, and the Apple/Google alternatives. Do not show
  the bare identity page. Use the Debug-only bypass to proceed through the
  new-user walkthrough. The repaired book animation is the first media card,
  above the numbered explainer list.
- **Profiles and following:** the authenticated Profile tab must use the
  signed-in account's profile photo, not a generic icon. When signed in as
  Trove, filter Trove out of the People rail and `See all` results; record own
  Profile -> Discover -> People `See all` -> MealDB -> Follow.

Two true import recordings are still pending: Safari/Instagram through the
share extension, and the in-app Add-by-link path. The Safari capture requires a
specific supported Instagram URL from the project owner. Capture-only fixture
hooks are specified in `CAPTURE-OVERRIDES.md`; they must remain Debug-only and
must never be described as production authentication or retailer availability.

`TROVE-01 — Discover` is intentionally a static poster because the Save clip
already begins on Discover and supplies its useful transition. A second motion
clip would repeat rather than explain. `TROVE-05 — Onboarding` remains draft
evidence until it is recaptured from the identity screen with the owned book
animation in the explainer layer.

## Required sources

### TROVE-01 — Discover

**Claim:** People can find recipes through other cooks and the open web.

**Preferred proof:** a short recording that starts on Discover, reveals the
attribution demo recipes, and opens one recipe detail. If scrolling does not add
meaning, use a strong static Discover state plus the recipe detail as a second
still.

**End state:** the selected recipe is open and its creator/source is legible.

### TROVE-02 — Bring recipes into Trove

This story has three distinct entry points. Do not collapse them into one
generic “Import” clip.

#### TROVE-02A — Import from Safari / Instagram

**Claim:** Someone can bring a recipe they encounter outside Trove into the app
without breaking their browsing flow.

**Preferred proof:** open a supported Instagram recipe in Safari, invoke the
Trove share extension, confirm `Save to Trove`, and end on the imported recipe
in Trove. Use the exact URL supplied by the project owner and truth-label any
capture fixture. Do not fabricate successful extraction from an unsupported
post.

#### TROVE-02B — Import a link inside Trove

**Claim:** Someone who already has a recipe URL can add it directly from Trove.

**Preferred proof:** tap the Add button, choose the link-import action, paste a
supported URL, review the result, save, and end on the private recipe.

#### TROVE-02C — Save from Discover

**Claim:** A recipe discovered inside Trove can still be visited at its original
source and saved as a private, editable copy.

**Existing evidence:** the current `trove-02-import` files show this path:

1. open `10-Minute Garlic Spaghetti` from Discover;
2. show source attribution on recipe detail;
3. open the original source in Trove's in-app browser;
4. choose `Add to my Trove`;
5. review the imported recipe in the real editor;
6. save and end on the private copy in Trove.

Keep the legacy filenames for traceability, but label the artifact **Save from
Discover** wherever it appears in the portfolio.

### TROVE-03 — Plan and cook

**Claim:** A saved recipe can be placed into the week and followed one step at a
time with cooking guidance.

**Preferred proof:** two separate short recordings rather than one long tour:

- **Plan:** private recipe -> `Add to Meal Plan` -> choose day/slot -> weekly
  plan with the recipe visible. The attribution must use the official Trove
  profile/avatar fixture, not the synthetic `TC` capture identity.
- **Cook:** planned or saved recipe -> `Cook Now` -> advance through two guided
  steps -> show the timer or compact cooking state if it works in the pinned
  build.

### TROVE-04 — Shop

**Claim:** Ingredients from several recipes become one maintainable list, with a
pantry distinction and a retailer handoff.

**Preferred proof:** one short recording that opens the grocery list, opens an
item's menu, changes it to `Stocked`, shows the updated list state, then opens
the store sheet. The final sheet should show capture-only Kroger and Amazon
Fresh rows and stop there—before retailer navigation, account connection, cart
mutation, or purchase.

### TROVE-05 — Onboarding

**Claim:** A new cook understands the loop from discovery to import, planning,
and grocery before entering the product.

**Preferred proof:** a clean phone recording beginning on the complete
returning-user sign-in state: `Continue as Samuel`, `Not you?`, and the
Apple/Google options. Do not record the bare identity page. Use the Debug-only
capture bypass to enter the walkthrough without a real account, then continue
through the real onboarding pages. Launch
without `MUNCH_SKIP_ONBOARDING`; use `MUNCH_SHOW_ONBOARDING=1` with
`MUNCH_CAPTURE_USER_NAME=Samuel` and `MUNCH_CAPTURE_BOOK_ANIMATION=1` for the
deterministic capture path.

Use the repaired 2D book animation from `cover/` as a standalone media card
above the numbered explainer list, inset to the same safe-area/card margins as
recipe media. Let its full 5.4-second non-looping sequence finish before tapping
`Get started`. Its pages are white for contrast against the muted orange card.
The first explainer item must mention finding recipes through people as well as
the open web. The animation is owned media and may also serve as the portfolio
cover. The remaining onboarding screens should stay product-native rather than
becoming a separate editorial board.

### TROVE-06 — Profiles and following

**Claim:** Recipes become easier to trust and rediscover when people can see who
shared them and choose whose finds they want to follow.

**Preferred proof:** begin on the signed-in user's Profile so the account avatar
is visible in the Profile tab, move to Discover, open `See all` from the People
rail, open MealDB, and follow the profile. If the signed-in account is Trove,
Trove must not appear as the first People result—or anywhere as a followable
version of itself.

**End state:** MealDB is visibly followed. Stop before community suggestions or
shared editing; those are future direction, not V1 proof.

## Output contract

For every accepted flow, produce:

- `trove-0N-<flow>-master.mov` — native clean simulator recording;
- `trove-0N-<flow>.mp4` — H.264 web derivative;
- `trove-0N-<flow>-poster.jpg` — deliberate poster frame;
- a manifest entry with commit, simulator/runtime, launch flags, duration,
  dimensions, truth label, and adjacent case-study claim.

Keep each clip focused on one claim. Prefer 6–15 seconds, trim setup and dead
time, keep audio off unless it is part of the product behavior, and preserve a
static fallback for reduced motion.

## Production order

1. Record onboarding from the complete returning-user state with the
   capture-only identity bypass; let the owned book animation finish before
   tapping `Get started`.
2. Record Safari/share import after the project owner supplies a supported
   Instagram URL.
3. Record Add-by-link inside Trove.
4. Recapture Plan with official Trove attribution.
5. Recapture Shop through the stocked state and two-retailer chooser.
6. Record the profile/follow flow with an authenticated tab avatar and a
   self-filtered People list.
7. Keep Cook unless a later narrative pass changes its claim.
8. Keep Discover static unless motion explains something the import clips do
   not.
