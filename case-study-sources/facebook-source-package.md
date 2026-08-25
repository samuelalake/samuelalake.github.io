# Facebook — Case Study Source Package

> FACTUAL source package for the Facebook portfolio case study. This is a **REWRITE pass**: the
> work was done at Meta, so there is **no local app repo and no agent-memory store** for this
> project. The only primary source is the existing portfolio case-study page plus the evidence
> assets on disk. Everything below is extracted from those two sources.
>
> **Confidentiality posture:** this is a PUBLIC portfolio about work at a big-tech employer.
> Claims are separated into EVIDENCED (backed by an asset shown on the page) vs CLAIMED/UNVERIFIED
> (asserted in prose with no backing artifact, or not independently confirmable). Confidentiality
> flags follow two rules: **"name scope not level"** (billion-user surfaces and which surfaces were
> touched — never IC level or seniority) and **"company OR specific internal metrics, not both."**

---

## 1. Source snapshot

- **Reviewed:** 2026-08-21
- **Existing case-study page:** `/Volumes/SatechiSSD/Developer/Apps/Web/samuelalake.github.io/.claude/worktrees/portfolio-redesign-58d67a/projects/facebook/index.html` (full narrative, headings, captions read).
- **Evidence directory:** `/Volumes/SatechiSSD/Developer/Apps/Web/samuelalake.github.io/.claude/worktrees/portfolio-redesign-58d67a/projects/facebook-evidence/` (16 files: 7 PNG, 4 MP4, 4 MOV, 1 hero SVG referenced from `/projects/facebook.svg`).
- **No repo. No memory store.** Do not fabricate either. Source of truth for this rewrite = the page prose + the assets. Where the page asserts something with no asset, it is marked `UNVERIFIED — needs Samuel to confirm`.
- **Cross-reference:** the page links to a companion case study `/projects/video-off-platform` ("Designing for web users on Facebook Video") for a deeper dive on one slice. Some Facebook-evidence assets (the incrementality/aggressiveness mockups) appear to belong to that companion study, not this overview.
- **Page's own disclaimer (verbatim intent):** "This page is a timeline of selected Facebook work, with some details intentionally abstracted, omitted where appropriate, or described using mostly publicly available materials." The page is already written defensively re: confidentiality — good, but claims still need a truth pass.

---

## 2. Project facts

- **Name:** Facebook
- **One-sentence description (from page):** Designing growth and engagement systems across the Facebook app — spanning video, feed, birthdays, and notifications — at billion-user scale.
- **Status + date range:** `2020–present` (per page meta). NOTE: "present" — confirm whether this is still current employment or should be an end date. `UNVERIFIED — needs Samuel to confirm current status/date range.`
- **Role / scope / ownership (scope, not level):**
  - Joined via **two internships** then returned **full time**.
    - Internship 1: **Facebook Jobs** — application-flow moments prompting job seekers to strengthen their info before applying.
    - Internship 2: **Live Audio Rooms** — listener-side web flows (discovery via notifications/stories/feed; consumption states: full-screen, in-feed, miniplayer).
  - Full-time surfaces: **Notifications** (described as longest-running, most senior work), **Video web / off-platform**, **Feed** (social context), **Birthdays**.
  - Cross-team governance: **reviewed and governed notification requests from other teams** — owning the coherence of a surface many teams write into.
  - **"Most senior work"** language is a scope/seniority signal — keep as *scope* ("longest-running, cross-team ownership of the notifications surface"), not a *level* claim. `Redaction guidance: name the surface and the cross-team governance, not an IC/seniority level.`

---

## 3. Context

- **User problem:** At billion-user scale, the screen is only one layer. Users experience one coherent app, but dozens of teams write into shared surfaces (notifications, feed, birthdays), and each team optimizes its own goal — risking a fragmented, noisy experience.
- **Product/business problem:** Growth and engagement — moving people from lightweight/off-platform/logged-out consumption toward deeper, longer-term Facebook usage; getting people reachable (notifications enabled); making entry points feel contextual instead of promotional.
- **Constraints (from prose):**
  - Large-org structure: orgs → teams → workstreams → surfaces nested in surfaces; designers own very specific parts. Progress comes from reducing an ambiguous problem to the smallest useful shippable decision.
  - Motion/interaction states are hard to convey with static mocks → prototyping became a necessity.
  - Surface ownership is shared across many teams; guidelines + product judgment govern what belongs.
  - Public-portfolio confidentiality constraints (details abstracted/omitted).

---

## 4. Current / final solution (surfaces & flows shown)

Each item: what it is → evidence asset → what it proves. "Proves" is bounded by what the asset actually shows (most assets are clean design mockups/prototypes, not shipped-metric proof).

### 4.1 Live Audio Rooms (Internship 2) — listener-side web
- **What:** Desktop/web listener experience for discovering and consuming live audio rooms.
- **Evidence:**
  - `facebook-evidence/huddle-web-speaker-grid.mp4` (1280×798, ~59s) — desktop prototype, listener-side speaker grid. *(On page: "Live Audio Rooms prototype," carousel item 1 of 3.)*
  - `facebook-evidence/techcrunch-live-audio-rooms.png` (1398×1052) — public TechCrunch launch coverage, June 21 2021. Linked source: techcrunch.com/2021/06/21/facebook-officially-launches-live-audio-rooms-and-podcasts-in-the-u-s/
  - Additional (present on disk, carousel implies 3 total but only 1 video wired in the reviewed HTML): `huddle-comet-grid-feed-entry.mp4` (1280×798, ~29s), `huddle-comet-grid-stories-entry.mp4` (1280×798, ~33s) — feed-entry and stories-entry prototypes. **These two are NOT referenced in the reviewed index.html** — likely the missing carousel items 2 & 3.
- **Proves:** EVIDENCED that Live Audio Rooms shipped publicly (TechCrunch, June 2021) and that Samuel produced web listener-side prototypes. Does NOT independently prove authorship of the shipped design — the prototypes are the authorship evidence; the article confirms the product launched. `"Huddle"/"Comet" in filenames are internal codenames — see Redactions.`

### 4.2 Notifications surface + reachability
- **What:** (a) the main notifications surface (scan/understand/dismiss/preview/act, with gesture + quick-action patterns); (b) reachability — contextual permission prompts and push upsells.
- **Evidence:**
  - `facebook-evidence/notifications-surface-recording.mp4` (588×1280, ~5s) — shown in a device frame; captioned "Notification permission prompt … optimized … reduce distraction and communicate value."
  - `facebook-evidence/push-turn-on-prompt.png` (938×1784) — captioned "Contextual push upsell … launched work encouraging users in app to turn on notifications."
- **Proves:** EVIDENCED that Samuel produced permission-prompt / push-upsell designs. "Launched" is asserted in the caption but not independently verifiable from the asset → `UNVERIFIED — confirm which of these actually shipped vs. were proposals.`

### 4.3 Video web / off-platform → app & login upsells
- **What:** Moving web/off-platform viewers into deeper usage via contextual "open the app" / "log in" prompts.
- **Evidence:**
  - `facebook-evidence/logged-out-sheet.png` (750×1624) — shown in device frame; captioned "Contextual app entry and login on web."
  - Unused-on-this-page but present: `login-incrementality.png`, `app-incrementality.png`, `aggressiveness-scale.png` (all 1920×540) — clean comparison mockups of upsell variants (Unobtrusive / Blocking / Redirect; and two "Get the full experience" sheet variants; and Open-app/Log-in vs Continue/Not-you states). **These are design-exploration mockups with NO visible numbers.** Likely belong to the `video-off-platform` companion study.
- **Proves:** EVIDENCED design exploration of upsell aggressiveness and logged-out entry patterns. Deeper narrative deferred to the companion case study.

### 4.4 Feed — social context
- **What:** Header signal + participation-cue work on social context (why content is relevant via connections).
- **Evidence:** NONE on the page or in the evidence dir. `Gap — no asset for Feed / social-context work.`
- **Proves:** Nothing evidenced. Prose-only.

### 4.5 Birthdays
- **What:** Cross-surface birthday experience — thank-you afterward, scheduling wishes, personalizing own birthday, lower-effort creation formats.
- **Evidence:** `facebook-evidence/birthday-days-until.png` (938×1784) — captioned "Birthday countdown … celebrate and express before the moment, not only count down."
- **Proves:** EVIDENCED one birthday surface design (countdown). Other birthday sub-flows (thank-you, scheduling, personalization, low-effort creation) are prose-only → `Gap — only one of several described birthday flows has an asset.`

---

## 5. Decisions (observation/constraint → choice → artifact → consequence)

1. **Prototyping over static mocks** — *Observation:* motion, entry states, active speakers, room transitions couldn't be conveyed statically (Live Audio Rooms). → *Choice:* Origami prototypes + video recordings to make interactions tangible. → *Artifact:* `huddle-web-speaker-grid.mp4` (+ comet-grid feed/stories prototypes). → *Consequence:* prototyping became a defining thread and a tool for influence. **EVIDENCED** (prototype videos exist).
2. **Contextual timing for permission prompts** — *Observation:* generic promotion feels like noise; a prompt tied to current activity feels useful. → *Choice:* new contextual entry points + optimize existing upsells; reduce distraction, communicate value. → *Artifact:* `notifications-surface-recording.mp4`, `push-turn-on-prompt.png`. → *Consequence:* asserted as launched work. **PARTIALLY EVIDENCED** (designs exist; "launched"/impact `UNVERIFIED`).
3. **Governing a shared surface** — *Observation:* many teams write into notifications; users see one surface. → *Choice:* use guidelines + product judgment to review other teams' notification requests. → *Artifact:* none (process work). → *Consequence:* owning surface coherence. **ASSERTED** (no artifact; inherent to review work).
4. **Value-vs-friction for logged-out/off-platform upsells** — *Observation:* need enough experienced value before asking someone to sign in/open app. → *Choice:* audits, experiment proposals, upsell patterns; range of aggressiveness. → *Artifact:* `logged-out-sheet.png` + (companion) `aggressiveness-scale.png`, `app-incrementality.png`, `login-incrementality.png`. → *Consequence:* shipped contextual upsells. **PARTIALLY EVIDENCED** (mockups exist; shipping/impact `UNVERIFIED`).
5. **Shared model for a cross-surface moment (Birthdays)** — *Observation:* a birthday touches notifications, feed, profile, creation at once. → *Choice:* design for a shared model so it doesn't splinter across owning teams. → *Artifact:* `birthday-days-until.png` (one slice). → *Consequence:* lesson about shared models. **PARTIALLY EVIDENCED.**
6. **Prototyping culture / influence beyond team** — *Observation:* prototyping should spread. → *Choice:* built a "Prototyping Zine" in Framer; explored AI-assisted code prototyping + loading real product data into prototypes. → *Artifact:* none provided. → *Consequence:* "became a reference case for broader investment." **ASSERTED / UNVERIFIED** — no artifact; "reference case" is a strong claim needing confirmation.

---

## 6. Impact

- **Shipped scope (EVIDENCED / public):** Live Audio Rooms launched publicly (TechCrunch, June 2021). This is the one impact claim backed by an independent public source.
- **Shipped scope (ASSERTED, needs confirmation):** push/notification upsells "launched"; contextual app-entry/login upsells "shipped"; feed header-signal & participation-cue work "shipped." None have public sources or metrics on the page. → `Each needs Samuel to confirm shipped vs. proposed, and to keep any framing public-safe.`
- **Quantitative claims:** **NONE stated on the page** (good — no numbers to redact). The filenames `*-incrementality.png` and `aggressiveness-scale.png` carry internal experiment jargon ("incrementality" = an internal lift/experiment concept) but the **images themselves contain no visible metrics**. → `Redaction guidance: rename these files before any public deploy to strip internal jargon; do NOT introduce any specific internal metric into the prose.`
- **Qualitative evidence:** design mockups + prototype videos (listed in §8). Strongest is the prototyping thread.
- **Current state:** page says `2020–present`; ongoing surface. `UNVERIFIED — confirm employment status.`

---

## 7. Reflection (page's stated lessons + flags)

The page's reflection is thematically coherent and reads as genuine (scale changes the job of design; break work into smallest useful decision; find the wedge between surfaces; prototype when mocks can't carry interaction; make work visible for alignment; design for one coherent product across many teams). Flags:

- These lessons are **plausible and specific to Samuel's described experience** — not obviously generic filler. Keep.
- One phrase to sanity-check: prototyping work "became a reference case for broader investment in richer, data-backed prototypes" — reads slightly self-aggrandizing and is unbacked. `Flag: confirm or soften; replace with a concrete artifact (the Zine, a specific prototype) if one can be shown.`
- "Most senior work" (in Notifications section) — keep as scope, not level (see §2).

---

## 8. Evidence inventory

| # | Path (under `projects/facebook-evidence/` unless noted) | Claim it proves | Type | Dims / duration | Intended presentation | Missing variant / note |
|---|---|---|---|---|---|---|
| 1 | `huddle-web-speaker-grid.mp4` | LAR web listener prototype (authorship) | video | 1280×798, ~59s | Two-up media block, carousel item 1/3, inset | `.mov` master also on disk (74 MB). Filename codename "huddle." |
| 2 | `huddle-comet-grid-feed-entry.mp4` | LAR feed-entry prototype | video | 1280×798, ~29s | **Not wired into reviewed HTML** — likely carousel 2/3 | `.mov` master (47 MB). Codenames "huddle"/"comet." |
| 3 | `huddle-comet-grid-stories-entry.mp4` | LAR stories-entry prototype | video | 1280×798, ~33s | **Not wired in** — likely carousel 3/3 | `.mov` master (78 MB). Codenames "huddle"/"comet." |
| 4 | `techcrunch-live-audio-rooms.png` | LAR launched publicly, June 2021 | screenshot | 1398×1052 | Two-up, with external "Source" link | Public, safe. Preloaded as hero-adjacent on page. |
| 5 | `notifications-surface-recording.mp4` | Notification permission prompt design | video | 588×1280, ~5s | In iPhone device frame | `.mov` master (6 MB). Very short (5s) — may want a longer cut. |
| 6 | `push-turn-on-prompt.png` | Contextual push upsell ("launched") | screenshot | 938×1784 | Two-up, inset | "Launched" is asserted, not proven. |
| 7 | `birthday-days-until.png` | Birthday countdown surface | screenshot | 938×1784 | Two-up, inset | Only 1 of several described birthday flows. |
| 8 | `logged-out-sheet.png` | Contextual app entry / login on web | screenshot | 750×1624 | In iPhone device frame | — |
| 9 | `aggressiveness-scale.png` | Upsell aggressiveness variants (Unobtrusive/Blocking/Redirect) | mockup | 1920×540 | **Unused on this page** — likely video-off-platform study | No visible metrics; filename jargon "aggressiveness-scale." |
| 10 | `app-incrementality.png` | "Get the full experience" sheet variants | mockup | 1920×540 | **Unused on this page** | No visible metrics; filename jargon "incrementality." |
| 11 | `login-incrementality.png` | Logged-out entry states (Open app/Log in vs Continue/Not you) | mockup | 1920×540 | **Unused on this page** | No visible metrics; filename jargon "incrementality." |
| 12 | `/projects/facebook.svg` (page root, not evidence dir) | Facebook brand logo / title mark | svg | — | Article title logo + homepage card (tab-switch SVG animation) | Candidate cover — see §9. |
| — | 4× `.mov` masters (items 1,2,3,5) | high-res source masters | video | large (6–78 MB) | Not web-embedded | Keep as masters; ship `.mp4` only. |

Device-frame asset (shared, not Facebook-specific): `/projects/wayfind-evidence/iphone-14-pro-no-notch.svg`.

---

## 9. Candidate cover

- **Primary recommendation:** `/projects/facebook.svg` — the branded Facebook title mark. The homepage card already uses a **tab-switch SVG animation** built around this mark, so it is the established brand/hero motif; reuse it for cover continuity.
- **Alternative hero (if a screenshot cover is wanted):** `techcrunch-live-audio-rooms.png` — the only asset with an independent public source and clear "this shipped" signal; strong for credibility. Landscape (1398×1052), good aspect for a hero card.
- **Motion option:** `huddle-web-speaker-grid.mp4` — the richest prototype, but codename "huddle" in filename (rename before public use).

---

## 10. Open items & Redactions

### Highest-value open questions (for Samuel)
1. **Status/date range:** is `2020–present` still accurate, or should this show an end date?
2. **Shipped vs. proposed:** for each of — push/notification upsells, contextual app-entry/login upsells, feed header-signal & participation-cue work — which actually **shipped** vs. were proposals/experiments? The page states/implies "launched/shipped" without backing.
3. **"Reference case for broader investment" (prototyping):** confirm this claim or soften it; can the Prototyping Zine or an AI-assisted prototype be shown as the artifact?
4. **Carousel completeness:** should `huddle-comet-grid-feed-entry.mp4` and `huddle-comet-grid-stories-entry.mp4` be wired in as LAR carousel items 2 & 3? They exist but aren't referenced in the reviewed HTML.
5. **Feed evidence gap:** Feed / social-context work has zero assets. Is there anything showable, or should this stay prose-only?
6. **Asset ownership split:** confirm the three unused `*-incrementality` / `aggressiveness-scale` mockups belong to the `video-off-platform` companion study (and should be removed from the Facebook overview to avoid confusion).

### Biggest unverified claims (do not carry forward as truth)
- "Launched"/"shipped" on notifications, push upsells, app-entry/login upsells, and Feed work — asserted, no backing artifact or public source.
- Prototyping "became a reference case for broader investment."
- "Most senior work" — keep as scope framing, not a level.
- `2020–present` status.

### Confidentiality flags / redactions
- **Internal codenames in filenames:** `huddle-*` and `*-comet-*` ("Huddle," "Comet") are internal codenames. Rename these files before any public deploy (e.g., `live-audio-rooms-web-*.mp4`). Filenames are visible in page source / network requests.
- **Internal experiment jargon in filenames:** `login-incrementality.png`, `app-incrementality.png`, `aggressiveness-scale.png` — "incrementality" is an internal metrics/experiment term. Rename before public use; the *images* are clean (no numbers), so only the filenames leak jargon.
- **"Company OR specific internal metrics, not both":** the page names the employer (Facebook) — so it must carry **zero specific internal metrics**. It currently does (no numbers stated). Maintain that: do not add any internal figure (DAU lift, experiment results, reachability rates) to the prose.
- **"Name scope not level":** keep to surfaces touched and cross-team governance (notifications governance, billion-user scale). Do not state IC level, ladder, or title/seniority beyond intern → full-time.
- **No confidential numeric charts found** in the evidence dir — the "incrementality" files are mockups, not dashboards. Good.

### Missing media
- Feed / social-context: no asset.
- Birthdays: only countdown; thank-you, scheduling, personalization, low-effort-creation flows unshown.
- Prototyping influence: no artifact for the Framer Zine or AI-assisted/data-backed prototypes.
- Facebook Jobs (internship 1): described but no asset.
