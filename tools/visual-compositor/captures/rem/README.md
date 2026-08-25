# Rem capture and composition plan

This folder turns the approved Rem solution story into a reproducible media
brief. It deliberately separates product evidence from presentation so a clean
capture can later be used as a static image, a browser-composited video, or a
native 3D device presentation.

## Truth labels

Every source must carry one of these internal labels before it is composed:

- **live** — recorded from a working product flow without altered state.
- **fixture** — rendered by a deterministic product fixture using real product UI.
- **reconstruction** — assembled from real product components or screenshots to
  demonstrate an evidenced state that is difficult to reproduce live.
- **concept** — future-facing or illustrative work that must be identified as
  such in the case study.

Fixture and reconstruction are acceptable for portfolio media. They are not
permission to invent a shipped capability, hide a broken interaction, or depict
a future concept as production behavior. Keep the label in the source manifest;
the public caption only needs disclosure when the distinction changes the claim.

## Format rule

Use the lightest format that proves the adjacent claim:

- Use a **static image** for a state, hierarchy, comparison, or exact UI.
- Use a **short video** for timing, causality, a transition, or system response.
- Use a **sequence of stills** when a live path is unreliable but the individual
  states are evidenced.
- Give every video a deliberate poster frame and reduced-motion fallback.

Do not bake the portfolio cursor, zoom, device, or camera movement into the raw
product recording. Those belong to the compositor interaction and presentation
tracks, where they remain editable.

## Required artifacts

### REM-01 — Capture

**Claim:** Someone can talk or type in their own words; Rem clarifies the intent
and turns it into work.

**Preferred proof:** an 8–12 second video only if the current build reliably
performs the complete transition from natural-language input to a saved task,
event, or approved action.

**Fallback:** a two- or three-state still sequence:

1. natural-language input in chat;
2. clarification or structured interpretation;
3. resulting task/event state.

**Important:** do not stage a poll or choice UI unless it exists and works in the
pinned build used for capture. The current story does not depend on polls.

**Capture script:**

1. Start from a clean conversation.
2. Enter one plausible intent with useful ambiguity, such as “Block an hour
   tomorrow afternoon to finish the portfolio review.”
3. Show only the clarification needed to produce a trustworthy result.
4. End on the created work item, not on a generic assistant response.

**Status:** needs product-path verification. Existing conversational recordings
can establish the visual treatment but do not yet prove the complete claim.

### REM-02 — Orient

**Claim:** Tasks and calendar commitments appear together in one agenda.

**Preferred proof:** a static, populated iPhone agenda. The claim is spatial and
hierarchical; motion adds little unless the agenda visibly replans.

**Seed state:**

- two timed calendar commitments;
- three tasks, including the item created in REM-01;
- one current or next item with clear emphasis;
- no disconnected-calendar, empty, debug, or error state.

**Optional motion:** a 4–6 second transition from the newly created task into its
position in the agenda, if that transition exists in the product.

**Status:** needs a populated fixture or a controlled account. Existing agenda
screens are mostly empty or connection-diagnostic states and should not be used.

### REM-03 — Work

**Claim:** Rem proposes an action, waits for confirmation, runs it through a
gateway or connector, and reports the result.

**Preferred proof:** a 10–15 second video. This is the strongest motion candidate
because causality and human control are the product value.

**Capture script:**

1. Open a task with a small, reversible next action.
2. Show Rem's proposed action and the target clearly.
3. Pause long enough for the approval boundary to register.
4. Accept the action.
5. Show running status without lingering on implementation detail.
6. End on the reported result in the task log.

**Static fallback:** four tight frames labeled internally as propose, approve,
run, and report.

**Status:** current code and demo documentation describe this path; it still needs
an isolated capture account/device and a verified reversible action.

### REM-04 — Brief

**Claim:** Rem gathers useful updates into one brief and can remain quiet when
nothing needs attention.

**Preferred proof:** start with one strong static brief state. Add a 6–10 second
video only if opening, listening, or progressive disclosure materially explains
the experience.

**Seed state:** three concise updates with distinct sources and one clear next
action. Avoid a generic AI summary or an overfilled notification feed.

**Optional sequence:** entry point → brief → compact voice/listening state.

**Status:** needs current product-state verification and a seeded brief.

### REM-05 — Onboarding

**Claim:** A new user understands what Rem does, how it acts, and where they stay
in control.

**Preferred proof:** a full-width 16:9 composition containing three real onboarding
states. This should be designed as a static artifact first and may then become a
6–8 second stepped animation.

**Proposed states:**

1. value summary / capture intent;
2. start in chat or capture from the Lock Screen;
3. gateway control / approve before Rem acts.

**Known owned sources:**

- `/Volumes/SatechiSSD/Developer/Apps/Swift/RemClaw/docs/screenshots/issue-309/wave2-onboarding-value-summary.jpg`
- `/Volumes/SatechiSSD/Developer/Apps/Swift/RemClaw/docs/screenshots/wave2-status-ui/post-setup-nux-iphone-frame-final-light.png`
- `/Volumes/SatechiSSD/Developer/Apps/Swift/RemClaw/docs/screenshots/wave2-status-ui/post-setup-nux-iphone-frame-final-dark.png`
- `/Volumes/SatechiSSD/Developer/Apps/Swift/RemClaw/docs/screenshots/issue-751/post-setup-nux/ios-launch.png`
- `/Volumes/SatechiSSD/Developer/Apps/Swift/RemClaw/docs/screenshots/issue-309/wave2-final-post-setup-nux/ios-launch.png`

The current product also exposes deterministic onboarding and post-setup fixture
launch arguments. Prefer a fresh capture from a pinned build if those fixtures
match the approved narrative; otherwise use the existing owned evidence and note
its source revision in the manifest.

## Capture environment

Fresh capture must use a disposable simulator created for portfolio work. Do not
boot, erase, rename, or otherwise modify the existing founder simulators.

For each fresh source, record:

- Rem repository commit SHA and branch;
- simulator device and iOS runtime;
- light/dark appearance;
- live/fixture/reconstruction/concept label;
- seed data and any launch arguments;
- raw dimensions, frame rate, and duration;
- whether audio is intentional;
- the exact adjacent case-study claim.

## Export targets

Keep one clean master and derive presentation variants from it:

- source master: native resolution, no device frame, no editorial cursor;
- case-study landscape: 16:9, with poster frame;
- case-study portrait: 4:5 where a taller phone materially improves legibility;
- still fallback: PNG or high-quality WebP at the final crop;
- optional cover: derived only after the interior artifacts are approved.

## First production order

1. Compose the onboarding still from owned evidence.
2. Verify and seed the populated agenda still.
3. Record the approve-run-report work flow.
4. Verify capture-to-work behavior; record it or use an evidenced still sequence.
5. Seed the brief and decide whether its interaction earns motion.

This order avoids making the hardest or least reliable flow block the useful
visual work, while preserving the story order in the published case study.
