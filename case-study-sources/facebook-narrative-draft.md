# Facebook, narrative draft (v1, for Samuel's review)

Director's draft in Samuel's voice, built from `facebook-source-package.md`. Rules applied:
no invented metrics, company named so **zero internal numbers**, scope not level, honest
shipped-vs-explored (unproven "shipped" claims are written as **designed / explored** and
flagged `[CONFIRM]`), internal codenames redacted. Each section notes its **[label]**,
**[pattern]**, and **[asset]** so it drops into the page system. Flags are for you, not the page.

---

## Cover
**[pattern: cover / branded mark]** · **[asset: `/projects/facebook.svg`, the same mark the homepage card animates]**

Kicker: `FACEBOOK · 2020–PRESENT` `[CONFIRM: still current, or end date?]`

**Title:** Designing growth and engagement at billion-user scale

**Lede:** Six years of work across Facebook's shared surfaces: video, notifications, feed, birthdays, and live audio. The screen is one layer; the harder problem is that dozens of teams write into the same surfaces, and the user still expects one coherent app.

---

## Metadata
**[pattern: metadata row, no dividers]**

- **Role:** Product designer, growth and engagement surfaces
- **Timeline:** 2020–present `[CONFIRM]`
- **Context:** Meta, across several product orgs and many partner teams
- **Skills:** Product design, prototyping, systems design

> `[REDACT-KEEP]` "Most senior work" stays as *scope* (longest-running, cross-team ownership of notifications), never a level or ladder claim.

---

## Project context
**[label: PROJECT CONTEXT]** · **[pattern: claim heading + short lede + 3-col responsibilities grid]**

**Heading:** At billion-user scale, the screen is the easy part

**Lede:** Users experience one app. Behind it, dozens of teams write into shared surfaces, and each optimizes its own goal. The work was to keep those surfaces coherent while still moving growth, and to reduce an ambiguous problem to the smallest decision worth shipping.

**Grid (responsibilities):**
- **Reachability**, designed the moments that ask people to turn on notifications, tied to what they are already doing.
- **Cross-surface coherence**, reviewed and governed notification requests from other teams, owning how one surface reads when many teams write into it.
- **Off-platform to app**, designed contextual entry from web and logged-out states into deeper usage.

---

## Solution / the work
**[label: THE WORK]** · Show the finished, evidenced work first. Live Audio Rooms leads because it is the one piece with a public source.

### Live Audio Rooms, the web listener experience
**[pattern: core-flow / device-or-web frame + carousel]** · **[asset: `huddle-web-speaker-grid.mp4` → RENAME `live-audio-rooms-web-speaker-grid.mp4`; plus the two unwired prototypes as carousel 2 and 3 `[CONFIRM wire-in]`]**

Live Audio Rooms launched publicly in 2021. As an intern on the listener side, I designed the web experience for finding a room and listening in: discovery from notifications, stories, and feed, then the consumption states from full-screen to in-feed to miniplayer. Static mocks could not carry the timing of a live room, so I prototyped the interactions and recorded them.

**Caption:** Web listener flow: the speaker grid and the shift between full-screen and in-feed listening.
**[asset: `techcrunch-live-audio-rooms.png`]** **Caption:** Live Audio Rooms launched in the U.S., June 2021 (TechCrunch). *[This is the one publicly sourced outcome on the page.]*

### Reachability, asking at the right moment
**[pattern: image-text row, device frame]** · **[asset: `notifications-surface-recording.mp4`, `push-turn-on-prompt.png`]**

A permission prompt reads as noise when it is generic and as useful when it is tied to what someone is doing. I designed contextual permission moments and reworked the in-app push upsell so the ask communicated value instead of interrupting.

**Caption:** Contextual permission prompt, designed to reduce distraction and state the value of turning notifications on.
> `[CONFIRM: shipped or proposal?]` The current page says this "launched." Written here as "designed" until you confirm; upgrade to "shipped" where accurate.

### Off-platform to app, entry without friction
**[pattern: image-text row, device frame]** · **[asset: `logged-out-sheet.png`]**

Web and logged-out viewers meet Facebook at its shallowest. I designed contextual app-entry and login moments that waited until someone had felt enough value to be worth the ask.

**Caption:** Contextual app entry and login on web.
> `[CONFIRM: shipped or proposal?]` The deeper aggressiveness-and-incrementality exploration lives in the companion *Video for web users* study; keep those three mockups there, not here. `[REDACT: rename `*-incrementality`, `aggressiveness-scale` files before deploy.]`

### Birthdays, a moment that touches four surfaces
**[pattern: image-text row, device frame]** · **[asset: `birthday-days-until.png`]**

A birthday shows up in notifications, feed, profile, and creation at once. I designed for the shared moment rather than one surface, starting with letting people celebrate and express before the day, not only count down to it.

**Caption:** Birthday countdown: express before the moment, not only after.
> `[GAP]` Only the countdown has an asset. Thank-you, scheduling, personalization, and low-effort creation are described but unshown. Prose stays modest until there is media.

### Feed, social context
**[pattern: prose only, no asset]**

`[GAP: no evidence.]` I recommend cutting Feed to one honest line inside Context (already covered by "cross-surface coherence") rather than giving it a section it cannot support with an artifact. `[CONFIRM: anything showable?]`

---

## Key design moments
**[label: HOW THE WORK GOT MADE]** · **[pattern: image-text rows / evidence board for the prototyping thread]**

### Prototyping became the way I made decisions legible
Motion, entry states, and live transitions could not be argued from static mocks, so I prototyped them. The recordings did two jobs: they made the interaction real for the team, and they became how I built alignment across teams that each owned a piece.

**Caption:** The Live Audio Rooms prototypes stood in for a spec no static mock could carry.
> `[CONFIRM/SOFTEN]` The page claims this prototyping "became a reference case for broader investment." Strong and unbacked. Written here as the lower-bound truth (prototyping as an alignment tool). If you can show the Framer prototyping zine or an AI-assisted, data-loaded prototype, that artifact earns the stronger claim back.

### Governing a surface many teams write into
Notifications is one surface with many authors. I reviewed other teams' notification requests against guidelines and product judgment, so the surface stayed coherent for the person reading it, not just optimal for each team sending to it.

---

## Impact
**[label: WHERE IT LANDED]** · **[pattern: outcome grid, no invented numbers]**

- **Live Audio Rooms shipped** publicly in 2021 (TechCrunch). `[EVIDENCED]`
- **Reachability and off-platform entry:** designed and `[CONFIRM: which shipped]`. Kept free of internal figures by design, since the employer is named.
- **Prototyping:** shifted how I and nearby teams made interaction decisions. `[qualitative, keep modest]`

> No metrics appear here on purpose. Company named means no internal numbers, per the confidentiality rule.

---

## Reflection
**[label: REFLECTION]** · **[pattern: 2-col lesson + gloss]**

- **Scale changes the job.** The design is rarely the bottleneck; keeping one surface coherent while many teams write into it is.
- **Reduce to the smallest useful decision.** Progress at a large org came from cutting an ambiguous problem down to the one change worth shipping.
- **Prototype when a mock cannot carry the interaction.** For anything with timing or state, the prototype was the argument.
- **Design for one product, not one team.** The person sees a single app; the work is making many teams add up to that.

---

## Open items rolled up (for your 30-min-back review)
1. Status: `2020–present` or an end date?
2. Shipped vs proposal for: push/notification upsells, app-entry/login upsells. (Feed I recommend cutting.)
3. Prototyping "reference case" claim: confirm with an artifact, or keep the softer version I wrote.
4. Wire the two unused Live Audio Rooms prototypes in as carousel 2 and 3?
5. OK to move the three `incrementality`/`aggressiveness` mockups to the companion study and rename the codename files before deploy?
