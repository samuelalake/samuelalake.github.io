# Composa — Case Study Source Package

> FACTUAL source package for a portfolio case study. Not final prose. No code was
> edited; this is a read-only evidence dossier. Evidence discipline: primary
> evidence is current code / docs / git log; agent memory is treated as a LEAD to
> verify. Unsupported fields are marked `GAP:`. Confidential/internal items are
> flagged under Redactions.
>
> Composa is a WEB / DESKTOP video-editing tool (composa.app). Core-flow visuals
> must be flat web screenshots and annotated mockups, never phone device frames.

---

## 1. Source snapshot

### Authoritative repo

**`/Volumes/SatechiSSD/Composa/app`** → GitHub **`Composa-App/Composa`** (remote
`https://github.com/Composa-App/Composa.git`). This is the real, current product.

Why it is authoritative:
- **890 commits**, by far the most active of any Composa checkout. Working tree
  shows worktree merges as recent as **2026-08-21** (`Merge pull request #959`),
  and the latest owner-feedback intake (`docs/feedback/iteration-8.md`) was
  transcribed **2026-08-21** — the day this package was produced.
- It is a full application: Vite + React 19 + TypeScript, Supabase auth, Vercel
  deploy config, Playwright E2E suites, a headless document engine, and it
  consumes the design system as a pinned dependency rather than containing it.
- `package.json` name `composa-app`, version `0.1.0`.
- The `/Volumes/SatechiSSD/Composa` directory itself is **not** a repo — it is a
  container holding `app/` plus ~250 `wt-*` / `issue-*` git worktrees of that
  same repo (the disposable-worktree workflow described in agent memory
  `composa-preview-worktree-hygiene`).

### Branch / commit / date

- Local `app` checkout is on a **detached HEAD** at `0ed0e9a4` (a preview
  worktree checkout), **239 commits behind local `main`** (`cc413e1`, last
  subject `Add explicit OpenAI BYO Agent routing (#855)`, 2026-08-04).
- The live line of development is **`origin/main`**, referenced in
  `iteration-8.md` at `ad7b2f74` (2026-08-20/21). Local `main` is itself behind
  `origin/main`. **Takeaway for the writer: trust `origin/main` / the deployed
  site over any local checkout state; local worktrees are intentionally
  disposable and frequently stale** (this exact stale-checkout trap is documented
  as a paid-for pitfall — see §7).

### The other Composa checkouts (all superseded or stale — do NOT mine as current)

| Path | Remote | State | Verdict |
| --- | --- | --- | --- |
| `/Volumes/SatechiSSD/Composa/app` | `Composa-App/Composa` | 890 commits, active 2026-08-21 | **AUTHORITATIVE product** |
| `/Volumes/SatechiSSD/Developer/DesignSystem/Composa/react` | `Composa-UI/react` | 9 commits, last 2026-06-18 | Old annotated design-system **study snapshot** (tag `study/annotated-ds`); superseded |
| `/Volumes/SatechiSSD/Developer/DesignSystem/Composa/composa-editor` | `Composa-App/composa-editor` | 77 commits, last 2026-07-10 | Earlier standalone editor build; **absorbed into the app repo**, no longer the product |
| `/Volumes/SatechiSSD/Creative Tools/Video/composa` | `Composa-App/composa-editor` | 101 commits, last 2026-07-10 | Same editor repo, `reskin/composa-ui` branch; also historical |
| `/Volumes/SatechiSSD/Developer/DesignSystem/Composa/app` | (no remote) | 10 commits, last 2026-06-19 | June `tldraw headless` **spike**, "stopped near completion"; abandoned exploration |

The four source paths named in the brief (`/Volumes/SatechiSSD/Composa-app`,
`/Volumes/SatechiSSD/Developer/DesignSystem/Composa-app`,
`.../Composa-react`) **do not exist on disk** as written. The real locations are
the table above. `@composa/ui` (the shipped design system) lives at private repo
**`Composa-UI/react-ui`** and is pinned by commit SHA in the app's `package.json`
(`github:Composa-UI/react-ui#d9214005...`).

### Memory used (as LEADS, then verified against code/docs)

- `-Volumes-SatechiSSD-Composa/memory/` (29 files) — the live product memory.
  MEMORY.md index and: `composa-durable-state-lives-in-repo`,
  `composa-review-codex-before-merge`, `composa-verification-is-load-bearing`,
  `composa-drive-editor-locally`, `composa-preview-worktree-hygiene`,
  `composa-jules-outsourcing`, `composa-figma-parity-default`. All confirmed
  against `docs/` in the app repo.
- `-Volumes-SatechiSSD-Developer-DesignSystem-Composa-react/memory/` —
  `composa-roadmap`, `composa-ui3-marriage` (history of how the DS + editor were
  married; explains the multi-repo lineage). Historical, verified as lineage.
- `-Volumes-SatechiSSD-Developer-DesignSystem-Composa-app/memory/` — June 2026
  direction notes. Historical.

### Evidence-vs-current differences

- Memory `composa-roadmap` describes an architecture plan (tldraw compositing a
  `<video>` source-of-truth, "Figma Slides + Video"). The **shipped** app instead
  has a headless document engine + Canvas2D export twin + a three-lane master
  timeline. The tldraw plan was an early exploration; do not present it as the
  shipped architecture.
- Memory refers to a standalone `composa-editor` repo as where the editor is
  built. That was **absorbed** — the editor now lives inside `Composa-App/Composa`.

---

## 2. Project facts

- **Name:** Composa. Domain **composa.app** (live, hosted on Vercel).
- **One-sentence description:** A web/desktop video editor that starts from the
  design file — you paste a frame or motion from Figma, the layers arrive as
  layers (nothing flattened), and you add video and audio around them on a
  timeline. (Source: `docs/composa/product-brief.md` §1.)
- **Status:** **Live / deployed, in active V1 iteration — not a finished 1.0.**
  The public site, Supabase passwordless auth, projects home, and the editor are
  all deployed (production acceptance + deployment IDs recorded in
  `docs/ops/iteration-7-correction-production-acceptance-2026-08-07.md` and
  `docs/ops/deploy-rollback-2026-07-30.md`). Some flagship capabilities are still
  stubs (see §4 / §6). Owner feedback is at **Iteration 8** as of 2026-08-21.
- **Date range:** Design-system lineage begins **~June 2026**
  (`Composa-UI/react`, DesignSystem spike). The product app `Composa-App/Composa`
  runs from roughly **early July 2026** through **present (Aug 2026)**, 890
  commits. `GAP:` exact first-commit date of `Composa-App/Composa` not pulled;
  confirm with the owner if a precise start date is needed.
- **Role / ownership:** **Samuel Alake is the owner / director / designer** and
  the single human gate. The build is executed by AI agents under his
  verify-and-merge control. This is a distinctive, real part of the story and is
  documented, not inferred:
  - **Claude** worker agents do most build work (drive-verify then merge).
  - **Codex** (`chatgpt-codex-connector[bot]`) reviews every app PR with P1/P2
    inline comments (`composa-review-codex-before-merge`).
  - **Jules** — bounded single-repo UI tasks were outsourced to it to save
    credits (`composa-jules-outsourcing`).
  - **Fable / Opus** handoffs appear in `docs/handoffs/`.
  - Samuel stays the "director vs eng/PM/designer (AI)" role; "done means the
    feature, not the PR." (`product-brief.md` §7.)
  - `GAP:` whether anyone besides Samuel is a human collaborator/employee — reads
    as solo-founder-plus-agents, but confirm.

---

## 3. Context

### User problem
Designers already have the tool they think in — Figma — but no way to carry that
work into video without losing it. The path out of Figma is lossy: export frames
as images or flatten to SVG, and either way the layers stop being layers. The
composition stops being editable the moment it becomes a video asset, and motion
authored in Figma "has nowhere to land at all." (`product-brief.md` §1.)

### Product / business problem (the gap in video editing)
There is no editor where design work stays intact on the way into video. The
market splits into design tools that can't do timeline/video craft, and
video/developer tools (Remotion, Hyperagent) that generate output the user can't
then manipulate. Composa's wedge: **video editing that starts from the design
file, without the export round trip**, with an AI agent that works *inside* the
editor alongside the user rather than generating past them. (`product-brief.md`
§1–§4.)

### Constraints and why they mattered
- **Import fidelity is the price of entry, not a feature.** If a user pastes from
  Figma and it doesn't look right, the promise breaks immediately and the failure
  is attributed to Composa, not the format. (`product-brief.md` §2.)
- **DOM cannot do vector booleans** — an architecture constraint (documented in a
  render-architecture spike), which is why SVG/vector fidelity is a decision, not
  a bug fix. (`product-brief.md` §6.)
- **AudioContext is scarce hardware** (~6 per page); rebuilding one on a React
  dependency change silently killed playback for a whole session.
  (`product-brief.md` §8.)
- **CI is dark** (billing, issue #433), so local gates + human drive-verification
  are the only arbiter of "done." (`product-brief.md` §8.)
- **Figma's competitive threat** — the defensible position is the timeline and
  video craft around the design work, the part Figma is structurally unlikely to
  do well. (`product-brief.md` §4.)

---

## 4. Current / final solution (the shipped product first)

The finished, deployed product today is a **four-surface web application**:
Landing → Auth/Onboarding → Projects/Home → Editor. Routes are `/`, `/auth`,
`/onboarding`, `/projects`, `/editor/<projectId>`
(`docs/workstreams/product-surfaces.md`).

### Core flow A — Sign in and open a project
- **User goal:** get from the marketing site into a real editing session.
- **What happens:** Landing (`/`) routes to Auth. Auth is **passwordless email
  magic-link** via Supabase (DEC-034 — the password method was deliberately
  dropped because `signInWithOtp` creates the account and no Composa-created user
  ever has a password). On success the user lands at Projects/Home (`/projects`),
  a file browser of projects with grid/list thumbnails, and opens one into
  `/editor/<projectId>`.
- **Evidence:** `docs/workstreams/product-surfaces.md` (route table, auth
  contract); `verify-evidence/projects-home-feedback/*.png` (grid at 1440/2560,
  loading, trash-card hover); `verify-evidence/291-*thumbnail*` (project/video
  thumbnails, list/grid/folder).
- **What it proves:** real authenticated multi-surface product with a working
  file-browser home, not a single-screen demo.

### Core flow B — Design on the canvas (Figma-grade)
- **User goal:** author a composition on a real design surface.
- **What happens:** a canvas with auto-layout and grid — fixed and hug tracks,
  row/column gaps, per-axis alignment, explicit cell placement, and a horizontal
  wrap modifier that matches Figma (Grid "Phase A" shipped, DEC-047/048). The
  authoring home shows the *authored* composition (an element that fades in from
  zero is still visible and draggable), while playback/scrub show the *evaluated*
  frame (DEC-050, DEC-011).
- **Evidence:** `verify-evidence/587-design-home-authored.png` +
  `587-scrubbed-evaluated.png` (the authored-vs-evaluated distinction);
  `verify-evidence/719-auto-layout-direction/*` (before freeform → after inferred
  horizontal auto-layout); `verify-evidence/711-*`, `wt-711-grid-ui`,
  `wt-760-padding-ui` worktrees.
- **What it proves:** the "real design canvas" claim — Figma-grade layout, not
  slide chrome.

### Core flow C — Scenes on the master timeline
- **User goal:** arrange compositions, video, and audio in time.
- **What happens:** a master timeline with **three real lanes (compositions,
  video, audio)**, waveforms, drag-and-drop clip placement, collapse controls,
  and clip context menus. Audio plays via Web Audio, wired to play and scrub.
- **Evidence:** `verify-evidence/481/timeline-empty-state-481-redesign.png`;
  `verify-evidence/725-video-edge-clip/*`; `verify-evidence/745-timer-duration/*`;
  `wt-585-timeline-transport-ui`, `wt-750-timeline-anatomy-ui` worktrees;
  `docs/workstreams/timeline-motion.md`.
- **What it proves:** the "scenes play as one video" mechanism — a genuine
  multi-lane NLE timeline, the part Figma is unlikely to build.

### Core flow D — Animate (Keynote-derived motion model)
- **User goal:** give elements motion without hand-keyframing everything.
- **What happens:** animation presets borrowed from Keynote — **Build in / Action
  / Build out** — plus keyframes, a motion gizmo, a keyframe diamond, and easing.
- **Evidence:** `verify-evidence/712-corner-radius-animation/midpoint-20px.png`;
  `verify-evidence/658-rollup/`; `wt-303-anim-dialog`, `wt-758-paint-animation-ui`,
  `wt-i4-animation-final-app` worktrees; `docs/workstreams/timeline-motion.md`.
- **What it proves:** a coherent, referenced animation model rather than raw
  keyframe plumbing.

### Core flow E — Export
- **User goal:** get one video out.
- **What happens:** a **Canvas2D export twin** with text wrapping that matches the
  DOM canvas, guarded by a parity test.
- **Evidence:** `docs/workstreams/export-release-quality.md`; parity tests noted
  in `product-brief.md` §6; `verify-evidence/721-export-*` worktrees.
- **What it proves:** the pipeline can render the composed timeline to a single
  video output.

### Core flow F — The in-editor AI agent
- **User goal:** direct a change in words and have it appear in the editor.
- **What happens:** an **Agent chat panel** inside the editor (`src/app/agent-chat/`,
  with card renderers); asking the agent for a change produces bars on the
  timeline. OpenAI BYO (bring-your-own-key) agent routing shipped (PR #855,
  2026-08-04).
- **Evidence:** `src/app/agent-chat/`; `verify-evidence/520-521/*` (chat chip
  bonded, zero-chats, new-chat states); `docs/workstreams/agent-chat.md`;
  `wt-241-openai-byo` worktree.
- **What it proves:** the differentiator — the agent works *inside* the editor
  alongside the user, keeping the result manipulable.

### Which real UI screens EXIST vs are MISSING (as runtime evidence)
- **Exist (runtime screenshots captured):** Projects/Home (grid, list, loading,
  trash-card), project/video thumbnails, editor canvas (authored + evaluated),
  auto-layout, grid, timeline empty + populated, animation (corner-radius, paint,
  combined-card), agent chat, blend-mode parity, master-creation of shapes,
  export/type-settings dialogs, avatar identity, video edge clips. See §8.
- **Missing / incomplete (product-level):**
  - **Figma paste is a stub (#598).** Paste routes through the paste event and
    decodes HTML, but the **real fig-kiwi binary decoder is not built** — this is
    "the single biggest item for loop 1." **This is the headline feature of the
    product's own pitch and it does not yet fully work.**
  - **Figma motion import (#599)** — blocked by #598; "the sharpest version of the
    value proposition and it does not exist yet."
  - **SVG / vectors** — known parity gap, blocked on a render-architecture
    decision (DOM can't do vector booleans).
  - **Audio effects (#620)** are inspector-only / inert (only volume is wired).
  - **The landing launch film** is not produced — the hero slot renders reserved
    space (`placeholder: "space"`). See §9 and §10.

---

## 5. Decisions (observation/constraint → choice → artifact → consequence → evidence)

Composa keeps a formal decision log: **`docs/workstreams/decisions.md`, DEC-001
through DEC-079 (79 decisions).** High-value ones for a case study:

1. **DEC-001 — the reskin-clean shell is canonical.** Observation: the design
   system had drifted from the editor. Choice: adopt the distributed shell (nav
   rail · navigator · canvas · inspector; no floating undo/redo). Consequence:
   engine/product adapt to the shell, not vice-versa. Evidence:
   `decisions.md` DEC-001; memory `composa-ui3-marriage`.

2. **DEC-034 — passwordless email link is the only auth method.** Observation:
   `signInWithOtp` creates accounts, so no Composa user ever sets a password.
   Choice: drop the password method entirely rather than tell users a password
   they never set was wrong. Consequence: simpler, truthful auth; recovery/legal
   deferred. Evidence: `product-surfaces.md` "Current #83 implementation."

3. **DEC-050 / DEC-011 — authored-vs-evaluated canvas.** Observation: an element
   that fades in from 0 opacity would be invisible and undraggable at the
   authoring home. Choice: authoring home shows the authored composition;
   playback/scrub show the evaluated frame. Consequence: elements stay editable;
   fixes a "dragging feels impossible" UX trap. Evidence: `product-brief.md` §6;
   `verify-evidence/587-*`.

4. **DEC-047 / DEC-048 — Grid + wrap match Figma (superseding DEC-008).**
   Observation: Composa's grid diverged from Figma. Choice: real 2D grid + two-gap
   horizontal wrap, matching Figma. Consequence: import parity; a real
   >4-child overlap bug (#570) was caught and fixed. Evidence: `decisions.md`;
   memory `composa-figma-parity-default`.

5. **DEC-055 — defer what cannot be delivered.** Choice: a menu entry with no
   destination is *removed*, not shown disabled. Consequence: no dead-end UI.
   Evidence: `product-brief.md` §7.

6. **DEC-056 — the animatable-property roster is decided.** Observation: only
   transforms (position/scale/rotation/width/height/opacity) can be keyframed;
   corner radius, colour, stroke weight, effect amounts cannot (#625). Choice:
   from the owner's 2026-07-28 walkthrough, the fuller roster is decided — it is
   build work, not a pending decision, and is "upstream of any serious animation
   work." Evidence: `product-brief.md` §6.

7. **Recolour the brand mark violet (2026-08-20).** Observation: the stacked-
   diamond mark was the last Figma-blue surface after the violet token swap, and
   it's the first thing a user sees in the browser tab. Choice: recolour to
   `#795EE4` in all four places it ships. Evidence: `src/app/routes/ComposaMark.tsx`
   header comment; commit `6168ca6e`.

8. **Process decision — GitHub Issues is the single source of truth
   (2026-07-29).** Observation: `whats-left.md` had become a shadow tracker that
   diverged from GitHub ("dual-source-of-truth rot"). Choice: retire the markdown
   backlog; every item becomes a GitHub issue; PRs close with `Closes #N`.
   Consequence: the working method that "makes the work survive a session ending."
   Evidence: `docs/composa/whats-left.md` deprecation banner; `product-brief.md` §7.

---

## 6. Impact

### Shipped scope (real, public-safe)
- A **live product at composa.app** (Vercel) with four deployed surfaces:
  Landing, passwordless Auth/Onboarding, Projects/Home, and the Editor.
- A working editor with: Figma-grade **auto-layout + grid** (Phase A), a
  **three-lane master timeline** (compositions/video/audio) with waveforms and
  drag-drop, **Web Audio** playback, a **Keynote-derived animation model**
  (Build in/Action/Build out, gizmo, keyframes, easing), a **Canvas2D export
  twin** with parity tests, and an **in-editor AI agent** with OpenAI BYO routing.
- A **design system** (`@composa/ui`, private `Composa-UI/react-ui`) consumed by
  commit-pin, plus a **Figma plugin** (`figma-plugin/`).

### Quantitative evidence (verified, public-safe)
- **890 commits** on the product repo; **79 logged decisions** (DEC-001–079);
  **1,092 runtime evidence screenshots** in `verify-evidence/`.
- Verification scale (from `iteration-7` production-acceptance doc): app suite
  **202 test files, 1,761 tests passing** (3 skipped), TypeScript clean, a
  **6,558-module** production build; canonical UI **838 tests**. Two independent
  reviews reported no blockers.
- Owner feedback has reached **Iteration 8** (2026-08-21).
- `GAP:` NO user/traffic/revenue/adoption metrics exist — this is a
  pre-launch/early product. Do not imply user numbers.

### Qualitative evidence
- A distinctive **AI-agent-run engineering process** with a human verify-and-merge
  gate, a formal decision log, GitHub-as-source-of-truth, and drive-verification
  ("done means the feature, not the PR"). This is itself a portfolio-worthy story
  about *how* one designer ships a complex product.

### Current state
- Live and iterating; the flagship **Figma-paste decoder (#598) and motion import
  (#599) are still stubs** — the core promise is partially delivered. Be precise:
  the *editor* is real and deep; the *paste-from-Figma round-trip* that headlines
  the pitch is not yet fully working.

### Unverified / do-not-claim
- `GAP:` Any claim that Figma paste "works" end-to-end — it does not (stub).
- `GAP:` Any user-facing metric, launch date, or funding status.

---

## 7. Reflection (grounded in Samuel's own notes)

Each lesson is documented, not inferred. Cite per lesson.

1. **Tests that pass are not evidence the feature works.** The audio work shipped
   "fixed" twice on unit tests that awaited a call the real app never awaits and
   stubbed the very object that was broken. Judgment change: when output can't be
   asserted in the DOM (sound, smoothness, feel), instrument the running app or
   say plainly it's unverified. Evidence: `product-brief.md` §8; memory
   `composa-verification-is-load-bearing`.

2. **A stale preview manufactures phantom regressions.** A preview checkout was
   found **313 commits behind main**, so already-fixed work looked broken.
   Assumption revised: always verify the serving HEAD before trusting any UI;
   delete worktrees when their PR merges (pruned 45→5). Evidence: `product-brief.md`
   §8; memory `composa-preview-worktree-hygiene`. (This same trap recurs in
   Iteration 8: three "still broken" rows may be a stale `dev.composa.app`, not
   regressions.)

3. **Don't decide design-system-vs-app by grep.** Grep matches the app passing
   props to a DS component, which reads as an app-side fix; the real fix can be a
   coordinated change across two repos + a repin. Evidence: `product-brief.md` §8;
   memory `composa-ds-vs-app-triage`.

4. **Lead with the mechanism, not the analogy.** The landing said "It's like
   Figma met Keynote and had a video-editor baby" — an analogy that makes the
   visitor decode two other brands before understanding Composa. The reframe: lead
   with the unique chain (real design canvas → compositions become scenes → play
   as one video → an agent animates it). Tradeoff learned: memorable analogy vs
   self-defining clarity. Evidence: `docs/composa/landing-reframe.md`.

5. **Absorb the review even when you're the merger.** Samuel caught himself
   admin-merging ~25 PRs past Codex's P1/P2 comments; a sweep found real shipped
   bugs (a grid >4-child overlap). Judgment change: read and triage the reviewer
   before merging, even in autonomous mode. Evidence: `whats-left.md` Codex-sweep
   note; memory `composa-review-codex-before-merge`.

6. **What Samuel would do differently / open on his own terms:** whether to invest
   in the real Figma decoder (#598) now given it gates the whole promise; whether
   to lift animatable-properties (#625) before stress-testing animation; and the
   render-architecture question for vectors (DOM can't do booleans). Evidence:
   `product-brief.md` §9. These are his stated open questions, not resolved
   lessons.

---

## 8. Evidence inventory

All paths under `/Volumes/SatechiSSD/Composa/app/` unless noted. `verify-evidence/`
holds **1,092** runtime screenshots; the highest-value, case-study-ready ones:

| Artifact | Claim it supports | Type | Presentation | Missing variant |
| --- | --- | --- | --- | --- |
| `verify-evidence/587-design-home-authored.png` + `587-scrubbed-evaluated.png` | Authored-vs-evaluated canvas (DEC-050) | Runtime screenshot pair | Inline, side-by-side annotated | Clean hero-res, no debug chrome |
| `verify-evidence/481/timeline-empty-state-481-redesign.png` | Master timeline (empty state) | Screenshot | Inline / annotated | Populated 3-lane hero shot |
| `verify-evidence/719-auto-layout-direction/719-before...` + `...after-inferred-horizontal-auto-layout.png` | Figma-grade auto-layout | Before/after pair | Board, annotated | — |
| `verify-evidence/712-corner-radius-animation/midpoint-20px.png` | Keyframed animation | Screenshot | Inline | Full timeline+gizmo hero |
| `verify-evidence/520-521/*.png` | In-editor AI agent chat | Screenshots (3 states) | Board | Agent producing timeline bars (the money shot) |
| `verify-evidence/projects-home-feedback/15-grid-1440.png` / `15-grid-2560.png` | Projects/Home file browser | Responsive screenshots | Inline | Post-fix five-across (FB-014) |
| `verify-evidence/291-*thumbnail*` (grid/list/folder/video) | Project + video thumbnails | Screenshots | Board | — |
| `verify-evidence/482-{light,dark}-candidate-full.png` | Editor shell, light + dark | Screenshots | Hero candidate | — |
| `verify-evidence/603-blend-mode-parity/*` | Blend-mode parity vs Figma | Screenshots | Annotated | — |
| `verify-evidence/649-master-creation-proof/*` | Shape creation (frame/rect/ellipse/line/text) | Screenshots | Board | — |
| `verify-evidence/725-video-edge-clip/*` | Video clip on timeline | Screenshots | Inline | — |
| `verify-evidence/431/type-settings-*` | Type/dialog inspector | Screenshots | Inline | — |
| `src/app/routes/ComposaMark.tsx` + `public/favicon.svg` | Brand mark (stacked diamond, violet `#795EE4`) | SVG source | Logo / cover | High-res branded lockup |
| `public/landing/README.md` + `.../landing-film-manifest.ts` | Landing story architecture | Doc + config | Reference only | **The 24s launch film itself (not produced)** |

Notes on presentation: these are **web screenshots**, correct for a
web/desktop tool — present flat, in-browser, or as annotated mockups. **Never**
put them in phone device frames. Most carry debug/verification chrome and are
sized for proof, not beauty; a clean capture pass is recommended for hero use
(see §10).

---

## 9. Candidate cover

**No portfolio/hero assets exist for Composa yet.** Candidates, best first:

1. **The editor shell, light or dark, full-bleed** —
   `verify-evidence/482-light-candidate-full.png` /
   `482-dark-candidate-full.png`. Shows the whole product (nav rail · canvas ·
   inspector · timeline) in one frame; strongest single "this is the product"
   image. Recommend a fresh clean capture at hero resolution.
2. **The brand mark** — `src/app/routes/ComposaMark.tsx` / `public/favicon.svg`:
   a stacked-diamond glyph with a violet accent edge (`#795EE4`) beside the
   "Composa" wordmark. The real, current logo; ideal for a title card / cover
   lockup. It is vector, so it scales cleanly.
3. **A canvas → timeline → agent composite** — assembled from
   `587-design-home-authored.png` + `481-timeline` + `520-521` agent shots to
   tell the four-beat story in one board. Matches the intended landing narrative.
4. **The (future) launch film** — the intended hero is the 24-second continuous
   product recording described in `public/landing/README.md` (beats: open →
   animate → canvas → agent). **It does not exist yet** and would be the single
   best cover if produced.

---

## 10. Open items & Redactions

### Highest-value questions for Samuel (the writer needs these)
1. **How to frame the paste-from-Figma promise honestly?** The product's headline
   ("paste from Figma, layers stay layers") is the pitch, but the fig-kiwi decoder
   (#598) and motion import (#599) are **stubs**. Is the case study about the
   editor that exists, the vision, or the AI-run process — or all three, clearly
   separated?
2. **Is the AI-agent-run engineering process part of the story, or kept
   private?** It is arguably the most distinctive angle (director + agents +
   verify gate + decision log), but it exposes internal workflow. Include or redact?
3. **What is the true project start date and current stage** (private beta? open?
   pre-launch?) — needed for the date range and any status claim. No metrics exist.
4. **Which hero asset** — commission the 24s launch film, use a clean editor
   capture, or the brand-mark title card? (See §9.)
5. **Which core flow is the spine of the case study** — the design-canvas-to-video
   loop, or the AI agent? The competitive wedge is stated as "the timeline and
   video craft" (Figma-unlikely), but the agent is the differentiator.
6. **Collaborators/credit** — confirm this is solo-founder + AI agents, and how to
   name/credit the agents (Claude/Codex/Jules) if at all.

### Biggest media gaps (there are many — say so plainly)
- **No launch film / hero video** — the intended centerpiece is unbuilt
  (`placeholder: "space"`).
- **No clean, un-instrumented product screenshots** — every existing capture
  carries verification/debug chrome and proof-sizing; a fresh capture pass of each
  core flow (canvas, timeline, animation, agent, projects home) is needed for
  publication quality.
- **No branded lockup / cover art** — only the raw SVG mark and favicon exist.
- **No annotated diagrams** of the architecture (canvas + engine + timeline +
  export twin) — would have to be authored.
- Existing screenshots are keyed to GitHub issue numbers, not to a portfolio
  narrative; they need re-selection and re-shooting.

### Redactions (public portfolio)
- **`@composa/ui` lives in a private repo** (`Composa-UI/react-ui`); don't expose
  its internals or the pinned commit SHA as if public.
- **Vercel deployment IDs, Supabase config, deploy/rollback ops docs, security
  audits** (`docs/ops/oss-secret-audit.md`, `supabase-new-api-key-cutover.md`) —
  internal infra; do not reproduce.
- **The AI-agent workflow, credit budgets, and Codex/Jules usage** — decide with
  Samuel before publishing (see question 2).
- **Owner's private feedback docs** (`docs/feedback/iteration-*`) are internal
  intake; quote only with permission.

### Uncertain chronology / facts to confirm
- Local `main` and the detached-HEAD checkout are **behind `origin/main`**; the
  deployed reality is `origin/main` / `dev.composa.app`. Any "current state" claim
  should be checked against the live site, not the local tree.
- `GAP:` exact first-commit date and whether the June DesignSystem work counts as
  "Composa" start or a precursor.
- Iteration 8 (2026-08-21) itself flags that three "still-broken" owner reports
  may be a stale deployment rather than regressions — a live-site check is needed
  before trusting current-state screenshots.

---

_Prepared read-only. One file created (this document). No code, docs, or config in
any Composa repo was modified._
