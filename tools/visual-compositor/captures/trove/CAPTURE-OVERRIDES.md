# Trove capture-only overrides

These hooks exist to produce deterministic portfolio recordings without using
a real account, changing a real retailer cart, or depending on the simulator's
location. They are capture fixtures—not shipped product behavior.

Apply them only to a disposable checkout pinned to the source commit recorded
in `sources.json`. Keep every hook inside `#if DEBUG` or behind a Debug-only
value. Never patch Claude's active working tree just to make a recording.

## 1. Onboarding identity bypass

Environment:

```text
MUNCH_SHOW_ONBOARDING=1
MUNCH_CAPTURE_USER_NAME=Samuel
MUNCH_CAPTURE_BOOK_ANIMATION=1
```

Expected behavior:

1. `ContentView` opens `OnboardingSheet` at step `0` when
   `MUNCH_CAPTURE_USER_NAME` is present. The ordinary `MUNCH_SHOW_ONBOARDING`
   screenshot path may continue to open at step `1` when no capture name is
   supplied.
2. `OnboardingOverview.welcomeStep` renders a complete returning-user state
   when there is no authenticated user but a capture name exists: a primary
   `Continue as Samuel` button, `Not you?`, and the Apple/Google alternatives.
   Do not use the bare identity state in the recording.
3. That button calls `advanceAfterSignIn()` without `skipWalkthrough`, taking
   the capture into the new-user explainer at step `1`.
4. No auth session, token, profile row, or onboarding completion is synthesized.

The existing signed-in `Continue as {displayName}` path skips the walkthrough
as returning-user behavior. Do not reuse that behavior for this recording.

## 2. Official Trove attribution fixture

Environment:

```text
MUNCH_CAPTURE_TROVE_ATTRIBUTION=1
```

The Plan seed should use the same official Trove profile identity that appears
first in Discover:

- owner id: `d0760fdd-4cf6-4260-b9c3-88cf9ef43c19`;
- display name fallback: `Trove`;
- avatar: resolve through the same public handle/profile path used by Discover.

Do not capture a synthetic `TC` avatar or claim the fixture is the viewer's real
account. The goal is visual and narrative consistency between Discover and the
planned recipe, not fake authentication.

## 2A. Signed-in profile and People-list fixture

Environment:

```text
MUNCH_CAPTURE_SOCIAL_PROFILE=1
```

The signed-in shell must look authenticated rather than falling back to a
generic profile icon:

- render the signed-in account's real profile photo in the Profile tab;
- if the capture account is the official Trove account, exclude Trove from the
  Discover People rail and the People `See all` results;
- keep another public profile such as MealDB available so the recording can
  demonstrate opening a profile and following it;
- do not synthesize a second Trove identity merely to fill the first People
  position.

The social-profile recording sequence is: own Profile -> Discover -> People
`See all` -> MealDB -> `Follow` -> stop. This is a capture fixture only when the
same states cannot be reached deterministically with the signed-in account.

## 3. Retailer chooser fixture

Environment:

```text
MUNCH_CAPTURE_RETAILERS=1
```

In Debug capture builds, add a deterministic Kroger rail alongside the existing
Amazon Fresh link-out rail. It may reuse the in-memory preview adapter, but its
capture label and store result should read Kroger. The fixture should implement
only enough behavior for the reversible chooser state:

- retailer name `Kroger`;
- one deterministic nearby store;
- no connection, catalog search, cart mutation, or handoff is exercised;
- Amazon Fresh remains the second visible option.

The recording sequence is: grocery list -> item menu -> `Stocked` -> updated
list -> `Get Ingredients` -> Kroger and Amazon Fresh chooser -> stop.

This proves the multi-retailer concept and list state without claiming live
Kroger availability at the simulator's location.

## 4. Owned onboarding visual

Use `cover/TroveBookAnimation.swift` as a standalone first media card above the
numbered explainer list, inset to the same safe-area/card margins as recipe
media. Its page color is white and the containing card uses a muted Trove
orange. The component already supports deterministic `previewProgress` for
QA/export and respects Reduce Motion. Play it once and let the full 5.4-second
sequence finish before tapping `Get started`. Keep the later preference and
notification screens as native product UI.

The verified capture implementation renders the animation before explainer row
one when `MUNCH_CAPTURE_BOOK_ANIMATION=1`; it does not enable placeholder art
for the remaining rows. Row one should explicitly describe discovery through
people as well as the open web.

## Truth labels

Every resulting source manifest entry must name the override environment and
use `truthLabel: fixture`. Portfolio copy may describe the real product behavior
shown, but must not describe the capture identity, Kroger availability, or
offline seed as a live account/network result.
