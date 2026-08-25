# Rem diagram specs — narrative handoff

Status: narrative and layout direction migrated to `projects/rem/index.html`; final media and Figma composition are still deferred.

## 1. Design explorations

### Claim

Rem needed one interaction model that could support typing, talking, listening, and proactive context without making each mode feel like a separate product.

### Reference audit

- Gemini, Claude, and Codex: prompt-first conversation and keyboard-led control.
- HUXE: assistant-led context packaged as a daily brief.
- Todoist Ramble: loose user input turned into structured task context.
- Existing Rem evidence:
  - `projects/rem-evidence/huxe-daily-brief-poster.jpg`
  - `projects/rem-evidence/huxe-daily-brief-web.mp4`
  - `projects/rem-evidence/todoist-ramble-poster.jpg`
  - `projects/rem-evidence/todoist-ramble-web.mp4`

### Sequence

1. One combined reference board containing the HUXE and Todoist Ramble diagrams or illustrations.
2. `Before`: two equal 4:5 stages for the dense all-in-one and minimal voice-only directions.
3. `After`: three equal 4:5 stages in one row for chat plus voice, Daily Brief listening, and Live Activity.

## 2. Product positioning

### Framing

These are vision positions, not claims about the current release. The Figma competitor collage is the survey; one combined diagram contains the three positioning questions.

The combined diagram uses:

- One `PRODUCT POSITIONING` chapter label, not a repeated title inside every row
- One card containing three questions separated by simple divider lines
- Category labels above each axis
- Competitor lists stacked vertically below each axis
- A one-axis line with end ticks and an optional middle tick
- Neutral dots above competitor names and one blue dot above the Rem label
- Rem’s name directly below its blue dot; do not repeat Rem in a competitor list
- One short runtime note with no contained callout UI

### Assumptions

The positioning needs to establish the tradeoff before showing the axes:

- People will want more privacy than a conventional cloud assistant offers.
- People will want less setup than a fully local agent requires.
- Rem should therefore behave more like a portable cloud backup: convenient to use, but possible to back up, move, or delete.

### Spectrum 1 — Runtime

Question: `Where does your agent run?`

- Cloud: Claude, OpenAI
- Local: Clovy, Hermes, OpenClaw
- Rem marker: middle

Side note: `Rem’s position: a gateway you can back up, move, or delete.`

Verified correction: do not use Clicky as local-runtime evidence. Its product is a voice-forward Mac interface, while its official privacy material describes requests routed through backend AI providers.

### Spectrum 2 — Interaction

Question: `How do you control it?`

- Keyboard-driven: Claude, OpenAI
- Voice-driven: Clicky
- Rem marker: near the voice-driven end

Verified product identity: Clicky is `heyclicky.com`. It is a Mac assistant controlled by hotkey and voice that can use the active screen as context and spawn agents.

### Spectrum 3 — Machine access

Question: `Where do you control it from?`

- Work on desktop: Claude, OpenAI
- Mobile assistant: `AGI` — confirm the exact product reference before publication
- Phone as remote: Rem
- Rem marker: near the phone-as-remote end

## 3. Competitor research collage

Candidate evidence: Claude computer use, Clicky overlay, Clovy, OpenClaw, Hermes, Codex mobile control, and wearable references. The collage should remain a research artifact, visually distinct from the final positioning spectrums.

The existing local site has reusable Claude and Codex/OpenAI icons in `tools/`. Clicky, Clovy, Hermes, OpenClaw, and the unresolved AGI reference still need sourced icons during final media production.

## 4. Future explorations

Bring back a two-item concept block below the positioning diagram:

- Mac: a future home for approved work, status, and recovery
- Wearables: future capture and lightweight updates without reaching for the phone

Both are concepts, not current shipped platforms. The block may be gated until the supporting mockups exist.

## 5. Verification sources

- Clicky: https://www.heyclicky.com/
- Clovy repository: https://github.com/open-software-network/os-clovy
- Clovy changelog: https://www.opensoftware.co/clovy/changelog

Clovy is the renamed continuation of June-era technical identities. Its official repository states that the app and agent run on the Mac and that June-era names remain compatibility aliases.

## 6. Open item

- Confirm which product `AGI` refers to before the third spectrum becomes public copy.
