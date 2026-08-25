# Rem — Case Study Source Package

> FACTUAL source package for a portfolio case study. This is validation material, not final prose.
> Every claim is tagged with evidence. `GAP:` marks a field evidence does not support. `REDACT:`
> marks material that must stay out of the public narrative. Do not treat `GAP:` items as facts.

---

## 1. Source snapshot

- **Primary repo:** `/Volumes/SatechiSSD/Developer/Apps/Swift/RemClaw` (private source of truth).
  - Branch reviewed: `feat/chat-1371-flash-premessage-tail`.
  - HEAD commit: `5457022a9` dated **2026-08-12 13:50:58 -0700**.
  - First commit: `Initial Commit` by `samuelalake`, **2026-02-07**. Project is ~6 months old at review time.
- **Public derived repo (not opened/edited here, referenced only):** `Rem-Assistant/Rem` on GitHub, Apache-2.0, went public **2026-08-12** (evidence: `project_open_core_live.md`). The private `RemClaw` is the source of truth; public is a derived carve. (Not fetched in this pass — memory-sourced, dated.)
- **Docs mined (primary evidence):**
  - `README.md`, `docs/product/VISION.md`, `docs/product/DECISIONS.md`, `docs/product/README.md`
  - `docs/product/` doc set (CAPABILITIES_IA, DAILY_BRIEF_LIFECYCLE, SECURITY_MODEL, MAC_CAPABILITY_SCOPES, PERMISSION_LIFECYCLE, RELAUNCH_DOGFOOD, AI_ORCHESTRATION_CASE_STUDY — titles read, not all fully read)
  - `docs/rebuild/00-OVERVIEW.md` (diagnosis/strategy package)
  - `Rem: AI Personal Assistant.storekit` (StoreKit config — contains pricing/SKU, see REDACT)
  - `docs/screenshots/` tree (product artifact evidence)
- **Agent memory files used (LEADS — verified against code/docs where possible):**
  - `MEMORY.md` (index), `project_product_thesis.md`, `project_task_taxonomy.md`,
    `project_open_core_live.md`, `project_open_core_launch_audit.md`, `project_autonomous_pipeline.md`,
    `project_resume_aug11.md`
- **Evidence-vs-current differences found:**
  - Memory `project_resume_aug11.md` said the live App Store build's privacy disclosure named the wrong AI provider ("Anthropic" while prod ran MiniMax). This is a **compliance-sensitive internal history item**, dated 2026-08-11. Treat as REDACT, not narrative. Whether it is still true today is **unverified in this pass** (I did not re-read the consent strings against the current binary).
  - Memory calls the product both "live on the App Store" (v1.0, 2026-04-07) and, separately, in an active "step back / diagnose / rebuild-strategy" phase (`docs/rebuild/`). Both are true at different altitudes: shipped product + ongoing reliability/simplification work. Distinguish "shipped" from "stable."
  - The runtime-substrate question has flip-flopped in the record: `project_product_thesis.md` (Jun-29) says "OpenClaw stays, no fork"; `project_autonomous_pipeline.md` (Aug-16) says a thin `RuntimeAdapter` is being scoped as "the first step of pulling OpenClaw out." **Current direction = keep OpenClaw default, add a thin runtime seam later (a config flip, not a rewrite).** Chronology matters; do not present the later exploration as a completed migration.

---

## 2. Project facts

- **Name:** **Rem** (user-facing, iOS + macOS). Internal repo/target names retain `RemClaw` for continuity (evidence: `README.md` "Naming" section).
- **One-sentence description:** Rem is a personal AI assistant for iPhone and Mac that captures a user's intent in chat, voice, or an agenda surface, turns it into structured tasks and events, and — with explicit approval — runs the work through a gateway the user controls (a cloud gateway or the user's own Mac). (Evidence: `README.md:1-18`, `VISION.md:1-23`.)
- **Status + date range:** **Live on the Apple App Store.** App id `6759550315` (evidence: `.storekit` `_applicationInternalID`, corroborated by `project_resume_aug11.md`), v1.0 released **2026-04-07** (memory-sourced, dated). Development began **2026-02-07** (first commit). Actively developed through at least **2026-08** (HEAD 2026-08-12; open-core launch 2026-08-12; autonomous-pipeline work 2026-08-16). Open-sourced (Apache-2.0) **2026-08-12**.
  - `GAP:` exact current App Store version and whether the listing is currently downloadable were not re-verified via the live store in this pass.
- **Role / collaborators / ownership:**
  - **Samuel Alake** is the dominant author and lead product designer & engineer. Commit counts (`git shortlog -sn --all`): `samuelalake` 2068 + `Samuel Alake` 417 = **~2485 commits**, versus all others combined ~120. This strongly supports "lead product designer & engineer."
  - Other human contributors: **Francis Oledibe** (`Francis Oledibe` 19 + `oledibefrancis` 51 = ~70; merged PR #1 early), **David Olaniran** (14), **Obaloluwa123** (8), **Vanessa Li** (1), plus AI/bot commits (`Claude` 125, `google-labs-jules[bot]`).
  - A **"founder" (referred to in memory/docs as "O")** is the product decision-maker, distinct from the day-to-day builder. `project_product_thesis.md`: "Stated by founder O, 2026-06-29." `DECISIONS.md`: "Standing decisions the founder has made."
  - `GAP:` The identity of "founder O" and the exact relationship to Samuel (is Samuel the founder, a co-founder, or the lead builder working with a separate founder?) is **not resolved by evidence** and must be confirmed by the user. The "~3-person team" framing is roughly consistent with the human contributor set (Samuel + founder + Francis, occasional others) but is not independently stated in any doc I read. Do not assert team size in the narrative without confirmation.

---

## 3. Context

- **User problem (from `VISION.md:8-15`, `project_product_thesis.md`):** People carry a mess of intentions across clients, commitments, and to-dos. Capture tools leave that intent as a chat transcript or a flat list; the human still has to administer the tool. Rem's stated intent is to **"orient the human"** — take the mess and turn it into structured, scheduled, worked tasks, and keep the person on track *without making them manage it*. The design bet: **the task is the persistent object; the conversation that produced it is fleeting.**
- **Product/business problem:**
  - Deliver task-centric **human–agent collaboration**: agents don't just answer, they file, schedule, do the doable autonomously, and report back (`project_product_thesis.md`).
  - Make agent execution **trustworthy and legible to normal users** — a phone should ask for help in natural language without knowing whether the capability runs locally, on the Mac, in a cloud connector, or over MCP (`VISION.md:55-66`).
  - Monetize via a Pro subscription with higher AI request limits (evidence: `.storekit`; details are REDACT).
- **Constraints and why they mattered (all evidence-backed):**
  - **Approval is load-bearing.** The agent proposes; the user decides; then work happens (`DECISIONS.md:26-30`). This constrains every execution flow — nothing acts on the user's accounts/computer without a confirm step.
  - **The backend must not become the user's computer, memory, or tool runtime.** Assistant work routes through a gateway the user controls (`VISION.md:20-23, 94-103`). This is a privacy/architecture constraint that shaped the whole remote-control model.
  - **Powerful local Mac capabilities (shell, files, clipboard, screen) already flow through the gateway**, so approval/scoping/audit UX is explicitly flagged as *product work still required* before phone-initiated Mac control is honestly "fully permissioned" (`VISION.md:213-218`). A real, admitted safety gap — good candid material.
  - **Reliability was the dominant engineering constraint.** `docs/rebuild/00-OVERVIEW.md` reframes "rebuild the app simpler" into "why is it so buggy?" and clusters the bugs into three animals — identity/data-loss (login mints a new userId and orphans tasks), pairing/connection (the real OpenClaw seam), and per-user gateway ops — all living at "one seam: the per-user OpenClaw gateway."
  - **Model-provider disclosure = App Store compliance risk.** The privacy consent gate is the *legal basis* and is compiled into the binary (`project_resume_aug11.md`). This constrained how/where the AI provider could be named. (Specifics = REDACT.)

---

## 4. Current / final solution

The finished product is **Rem, live on iOS + macOS**, built around one product spine — the operating loop **Capture → Orient → Work → Brief → Repeat** (`VISION.md:121-179`). The iPhone is the everyday command surface; the Mac is a first-class app and the preferred local gateway host (`README.md:8-18`, `VISION.md:53-92`).

**Screen-evidence caveat (important for the case study):** most committed screenshots are **empty-states** or **DEBUG fixture renders** (`--rem-<screen>-fixture` modes that render clean, synthetic, PII-free UI — the app has ~28-34 such fixtures per `project_open_core_live.md` / `project_autonomous_pipeline.md`). Populated screens with *real* user data are deliberately scarce because product examples are kept synthetic (`DECISIONS.md:12-14`). So the strongest legible visuals are fixtures and empty states, not real-data screens. Flag where a real populated screen is missing.

### Proposed core flows

Smallest set that makes the product legible: **5 flows.** Flows 1–4 are the operating loop's beats; flow 5 is the enabling substrate (gateways/connectors) that makes execution trustworthy. Each is justified below.

**Flow 1 — Capture an intent → structured task/event (Capture + Orient)**
- *User goal:* get a real-life intention into the app before it evaporates, without filling out a form.
- *What happens:* user captures in chat, voice, or the Agenda "+"; Rem turns it into a task, event, note, or connector action. Onboarding is conversational ("what should we call you," "what are you working on"), deliberately diverging from OpenClaw's daemon-setup onboarding (`VISION.md:135-150`).
- *Evidence path:* `docs/screenshots/issue-421/00-launch.png` (iOS "Today / No agenda yet" with "Add New | Schedule" affordances); `VISION.md:104-186`; taxonomy in `project_task_taxonomy.md` (Task / Automation / Signal / Output).
- *What it proves:* the product's central object is the task, and capture is low-friction and multi-surface.
- *Missing:* a real screen showing a captured chat message *becoming* a task (the transform). `GAP:` populated capture→task screenshot.

**Flow 2 — Plan the day on the Agenda (Orient, the daily surface)**
- *User goal:* see today as one planning surface combining Calendar (timed context) and Tasks (executable intent).
- *What happens:* Agenda is the Today surface across iOS and Mac; Calendar is timed context, Tasks are executable intent (`VISION.md:170-175`).
- *Evidence path:* `docs/screenshots/issue-500/rem-main-window-final.png` (Mac Agenda/Inbox/Sessions/Settings shell with persistent Chat button); `docs/screenshots/issue-408/01-main-window-agenda.png`; `docs/screenshots/issue-486/ios-agenda-calendar-card-{light,dark}.jpg`.
- *What it proves:* Rem is a real cross-platform native app with a coherent Agenda-centric IA, not a chat wrapper.
- *Missing:* a *populated* agenda (both current finals show empty-state). `GAP:` populated agenda with tasks + events.

**Flow 3 — The assistant works a task through an approved gateway action (Work + remote-control + approval gate)**
- *User goal:* ask in natural language and have Rem actually do the next step (run a browser action, touch the Mac, hit a connector), then report back — without handing over ambient control.
- *What happens:* iPhone request → active gateway operator session → agent chooses an approved capability → Mac node (or cloud) performs it → result streams back (`VISION.md:188-227`). Execution is gated on explicit user approval (`DECISIONS.md:26-30`). Agent-authored progress is recorded in the task's append-only comment log, rendered with Rem's face mark, not a generic sparkle (`DECISIONS.md:110-116`).
- *Evidence path:* `docs/screenshots/issue-643/approval-fixtures/approval-pending.png` (Cloud Gateway detail: "Waiting for approval…", Devices & Pairing / Skills / Custom MCP Servers, gateway-update preflight gating); `docs/screenshots/issue-618/chat-diagnostics-fixture/ios-diagnostics-expanded.png` (a "Thinking" block preserving sanitized runtime output while the visible reply stays conversational + a "Successful Browser Action: Opened Chrome with …" record).
- *What it proves:* the hard part — trustworthy, permissioned agent *execution* with a visible approval and audit surface — is real and designed, not hand-waved. This is the differentiator.
- *Missing:* a clean end-to-end "approve → Mac runs shell/files → concise result" sequence in one artifact. `GAP:` a real remote-Mac-control result screen.

**Flow 4 — The Daily Brief (Brief)**
- *User goal:* stay oriented with one dependable update surface instead of ten notifications.
- *What happens:* runs roll up into **one daily brief** — a morning orientation and an end-of-day sign-off — that is dynamic (reflects latest runs when read). Base-default routines ship on so the loop delivers value day one (`VISION.md:158-169`). The brief is push and goes quiet when everything is stale; suggestions are pull and can resurface (`DECISIONS.md:120-161`).
- *Evidence path:* `docs/product/DAILY_BRIEF_LIFECYCLE.md` (title read; contents not fully read — recommend reading before writing narrative); `project_task_taxonomy.md` (brief = triage done properly; two-session model `rem-brief-author-…` authoring vs `rem-today-…` user-facing).
- *What it proves:* Rem is proactive (routines run the loop on a cadence), not merely responsive; and the team made deliberate restraint decisions (empty brief is fine; don't nag).
- *Missing:* `GAP:` a real Brief screen artifact was not located in this pass — search `docs/screenshots/` for a brief/today render or capture one.

**Flow 5 — Connect a gateway / connectors (the enabling substrate)**
- *User goal:* connect apps and a place for Rem to run work without learning OpenClaw internals or MCP.
- *What happens:* Settings teach a hierarchy — Connected Accounts (identity), Connectors (user-friendly integrations, MCP as advanced substrate underneath), Gateways (cloud + local Mac + linked devices + reachability: LAN, Wake-on-LAN, tailnet, tunnel) (`VISION.md:252-334`, `CAPABILITIES_IA.md`). Composio is taking over Connectors (`project_composio_ia_decision.md` — memory lead).
- *Evidence path:* `docs/screenshots/issue-489/ios-{add-connection-sheet,gateway-switcher-menu,gateway-detail-header-menu}.jpg`; `docs/screenshots/issue-408/{02-settings-root,03-local-gateway-detail,04-all-connections}.png`; `docs/screenshots/issue-464/ios-connectors-calendar-row.jpg`.
- *What it proves:* the productization work — turning a fragile per-user daemon into legible Connectors/Gateways/Devices UI — which is the bulk of the design labor and the reliability story.
- *Justification for keeping this as a distinct flow:* it is a large, distinct product surface (Settings IA) with its own decision doc, and it is what makes flow 3 trustworthy. Folding it into flow 3 would hide the majority of the design work. If the case study needs 4 flows, this is the one to compress, not cut.

---

## 5. Decisions (observation/constraint → choice → artifact → consequence → evidence)

1. **Cloud gateway as onboarding + fallback, but Mac-local stays first-class.**
   - Observation: users have different privacy/reliability/networking needs; cloud is easiest to onboard but can't do Mac-local shell/files/clipboard when the Mac is offline.
   - Choice: support multiple gateway models (Local Mac, Cloud, LAN/Bonjour, Wake-on-LAN, Tailnet, manual URL); model *deployment* (`GatewayProvider`) separately from *reachability* (`GatewayTransport`).
   - Artifact: `VISION.md:229-250`; `Shared/Gateway/GatewayTransport.swift`; gateway-detail screenshots (`issue-643`, `issue-408`).
   - Consequence: cloud gateways are "onboarding, reliability, and fallback infrastructure," explicitly *not* a replacement for the local-first Mac path (Non-Goals, `VISION.md:366-378`).
   - Evidence source: `VISION.md`.

2. **Assistant-led, approval-gated execution — never ambient control.**
   - Observation: the Mac already exposes shell/files/clipboard through the gateway; raw ambient phone→Mac control would be unsafe.
   - Choice: the phone asks the gateway to invoke *specific, user-approved* capabilities with clear scopes and auditable logs; approval is load-bearing.
   - Artifact: `VISION.md:208-227`, `DECISIONS.md:26-30`, `MAC_CAPABILITY_SCOPES.md` / `PERMISSION_LIFECYCLE.md` (titles read); approval-pending fixture (`issue-643`).
   - Consequence: an admitted current safety gap — approval/scoping/audit UX is named as product work still required (candid, honest).
   - Evidence source: `VISION.md`, `DECISIONS.md`.

3. **The task is the persistent object; conversation is fleeting.**
   - Observation: capture tools leave intent as transcripts/flat lists the human must administer.
   - Choice: task-centric human–agent collaboration; four object types (task/note/folder/list), a strict Task/Automation/Signal/Output taxonomy; "recurring task" is not a thing — it's an Automation (`RoutineSchedule`).
   - Artifact: `project_product_thesis.md`, `project_task_taxonomy.md`, `DECISIONS.md:60-97`.
   - Consequence: routines (agent works a task on a cadence, leaves an attributed comment) are "dead-center"; chat-title polish is peripheral. Yardstick for every scope call.
   - Evidence source: memory (dated 2026-06-29 / 2026-07-17) + `DECISIONS.md`.

4. **Memory stays thin — no dedicated memory store.**
   - Observation: three memory attempts failed (backend `user_memory` produced lossy restatements of tasks; OpenClaw dreaming "returned poems"; memory-wiki never delivered) — all tried to synthesize a record nobody had written.
   - Choice: thin memory = task descriptions + searchable past conversations. Test: "if it's derivable from a task, it isn't memory."
   - Artifact: `DECISIONS.md:32-57`.
   - Consequence: rules out rebuilding a memory table or re-enabling dreaming; would only change if user-authored Notes exist.
   - Evidence source: `DECISIONS.md` (measured against 7 real rows — REDACT the raw account measurements).

5. **Suggestion relevance is judged through the user's own gateway against their live tasks/folders.**
   - Observation: every `channel_signals` row became a suggestion via a string template, producing nonsense like "Reply to Railway <alerts@…>".
   - Choice: judge relevance against the user's live tasks/folders (the only trustworthy model of what they care about) with a mandatory human-floor fallback for new users; a model failure surfaces signals *unjudged*, never drops them.
   - Artifact: `DECISIONS.md:163-199` (and the four object types / signal-is-never-a-task rule).
   - Consequence: fixes the "reply to a robot" failure; protects new-user first impression.
   - Evidence source: `DECISIONS.md`.

6. **Rem "managed AI" = whatever billing meters; retire the backend's direct-model fallback.**
   - Observation: a direct provider fallback meant some turns ran off-gateway and unmetered.
   - Choice: all assistant turns route through the user's own gateway on the Rem-managed provider; delete the *fallback* (not the *provider* — "one word, total in consequence").
   - Artifact: `DECISIONS.md:201-215`; `gateway-defaults.ts`.
   - Consequence: honest, retryable failure when the gateway is unreachable instead of silent off-gateway execution. **The specific provider name and the historical wrong-provider disclosure are REDACT.**
   - Evidence source: `DECISIONS.md` + `project_resume_aug11.md`.

7. **Voice: suspend the mic during playback (no echo) at the cost of voice-triggered barge-in.**
   - Observation: an open mic during Rem's speech causes AI output to re-enter as input (echo).
   - Choice: mic suspended during playback; interrupt via tap-to-interrupt, not open-mic barge-in.
   - Artifact: `DECISIONS.md:217-227`.
   - Consequence: preserves the founder's actual requirement ("AI output no longer goes in as my input").
   - Evidence source: `DECISIONS.md`.

8. **Open-core: private RemClaw is source of truth; public Rem is a derived carve behind interfaces.**
   - Observation: to open-source without giving away the moat.
   - Choice: moat features behind interfaces (hosted provisioning, entitlement) with default-open public stubs; republish via a carve *script* (principle stated; script still unbuilt as of Aug-16).
   - Artifact: `project_open_core_live.md`, `project_open_core_launch_audit.md`; public repo `Rem-Assistant/Rem` (Apache-2.0).
   - Consequence: public repo went briefly "dead on clone" (clients failed closed on a carved-out `/usage/consume` 404) — a real, honest open-core lesson. (Internal fix branch names = REDACT.)
   - Evidence source: memory (dated Aug-12 / Aug-16); not re-verified against the live public clone in this pass.

---

## 6. Impact

- **Shipped scope (evidence-backed):**
  - A **live, cross-platform (iOS + macOS) AI assistant on the App Store** (app id `6759550315`), with conversational onboarding, chat, voice, Agenda, Inbox, Sessions, Settings, Connectors, multi-model gateway management (cloud + local Mac + LAN/Wake-on-LAN/tailnet/tunnel), StoreKit Pro subscription, a Widget target, and a native Mac menu-bar app. (Evidence: repo target layout `README.md:38-49`; screenshots; `.storekit`.)
  - **Approval-gated agent execution** with browser actions, connector actions, and Mac capability routing, plus a sanitized "Thinking" diagnostics surface (fixture evidence, `issue-618`).
  - **Open-sourced under Apache-2.0** (`Rem-Assistant/Rem`, 2026-08-12) with a documented open-core maintenance model.
  - **~3,100 commits over ~6 months** (Feb–Aug 2026), Samuel authoring ~2,485 of them.
  - A substantial **product-documentation corpus** (`docs/product/`, `docs/rebuild/`) that reads as durable design/architecture thinking.
- **Sourced quantitative, public-safe evidence:** App id and live status; commit counts; date range; Apache-2.0 license. **That is the extent of public-safe numbers.**
- **Qualitative evidence:** the VISION and DECISIONS docs show a coherent, opinionated product thesis and a track record of reversing one's own instincts based on measured failure (memory, suggestions, dismissals, empty brief).
- **Current state:** shipped but in an active **reliability/simplification phase** (`docs/rebuild/`) — the honest framing is "live product, still hardening the per-user-gateway seam," plus an emerging autonomous build-pipeline effort.
- **Unverified / do-not-claim:**
  - `GAP:` No user counts, retention, revenue, ratings, download numbers, or NPS were found. **Do not invent or imply any.**
  - `GAP:` "v1.0 released 2026-04-07" and "approved after the 4th rejection" are memory-sourced; re-confirm the release date/version from App Store Connect before publishing.
  - `GAP:` Whether the current live build's provider disclosure is accurate is unverified — keep the whole topic out of the narrative regardless (REDACT).

---

## 7. Reflection (candid, evidence-cited — the section most prone to slop)

Each lesson is tied to a specific documented decision or finding; nothing here is generic.

1. **"When in doubt, make the task" was our instruction, not a model failure.** REMCLAW.md literally told the agent to task everything ("Anything the user needs to do… When in doubt, make the task"), so "Ada asked about Friday" became a task. The fix was to change the *instruction* (a "task test"), and to coach rather than refuse. Lesson: check what you told the agent before blaming the model. (`project_task_taxonomy.md`.)

2. **Consolidation invents a narrative when none was authored.** Three memory systems failed the same way — they tried to synthesize a record nobody wrote. The judgment change: memory should be *authored* (tasks, and later Notes), not *derived*. "If it's derivable from a task, it isn't memory." (`DECISIONS.md:32-57`.)

3. **Restraint is a feature: an empty brief beats a spent turn.** Samuel's earlier instinct was to surface a one-time "want to clear these?" brief; he reversed it — when every task is stale, author *nothing*, because "spend without value is worse than an honest empty state," and "the solve is design." A concrete case of choosing not to run the agent. (`DECISIONS.md:150-161`.)

4. **The bugs were three animals experienced as one.** For a long time "OpenClaw is cursed" hid three distinct root causes (identity/data-loss, pairing, per-user gateway ops). The lesson — stop, diagnose to file:line, and separate the animals before rewriting — turned a planned rewrite into a diagnosis+strategy package and a staged fix. (`docs/rebuild/00-OVERVIEW.md`.)

5. **Assumption revised on the runtime substrate.** In June the call was "OpenClaw stays, no fork — our pain is config/integration, not the engine." By August, after `boop` showed a "Rem without OpenClaw" shape, the direction shifted to scoping a thin `RuntimeAdapter` as the *first incremental step* of pulling OpenClaw out of turn-execution — while keeping OpenClaw the default so it's a config flip, not a rewrite. The tradeoff learned: keep device-control (the V2 wedge) as an OpenClaw capability; don't let the thin runtime reinvent the task store. (`project_product_thesis.md` vs `project_autonomous_pipeline.md`.)

6. **Prose does not stop a coding agent; roles and gates do.** Agents reached production twice in one session despite CLAUDE.md and AI_FAILURE_MODES.md being in context. The lesson Samuel drew: remove the affordance (read-only roles, value-fingerprint secret scanning, deployed-build-is-the-contract), don't add another warning. (`project_resume_aug11.md`; `feedback_*` memory set.) *Note: this is an AI-engineering-process lesson; include only if the case study covers how Rem is built, and keep the production-incident specifics out (REDACT).*

`GAP:` "What Samuel would do differently" as a first-person statement is not directly recorded — the above are inferred from his documented reversals. If the case study wants an explicit "what I'd do differently" quote, the user should supply it.

---

## 8. Evidence inventory

| Path | Claim it proves | Type | Dims/notes | Intended presentation | Missing variant / permission |
|---|---|---|---|---|---|
| `RemClaw/Assets.xcassets/AppIcon.appiconset/Logo.png` | Rem brand identity (white "face" mark on brand blue `#0C50FF`) | Final / brand | 1024×1024 PNG, square | Hero / cover, favicon, section marks | Clean transparent-bg wordmark variant `GAP:` |
| `docs/screenshots/issue-500/rem-main-window-final.png` | Native Mac app shell: Agenda/Inbox/Sessions/Settings + persistent Chat | Final | ~966×744, light | Product hero (Mac) | Populated (non-empty) agenda `GAP:` |
| `docs/screenshots/issue-421/00-launch.png` | iOS Today/Agenda capture surface with Add/Schedule | Final | 1206×2622 iPhone, light | Flow 1/2 visual | Populated agenda `GAP:` |
| `docs/screenshots/issue-643/approval-fixtures/approval-pending.png` | Cloud Gateway detail + "Waiting for approval" + Devices/Skills/MCP + update preflight | Final fixture | 1206×2622, light | Flow 3/5 (execution + approval) | Real (non-fixture) gateway with paired Mac `GAP:` |
| `docs/screenshots/issue-618/chat-diagnostics-fixture/ios-diagnostics-expanded.png` | Sanitized "Thinking" block + conversational reply + "Successful Browser Action" record | Final fixture | 1206×2622, light | Flow 3 (agent works, reports back) | Real end-to-end run artifact `GAP:` |
| `docs/screenshots/issue-486/ios-agenda-calendar-card-{light,dark}.jpg` | Agenda calendar card, light + dark parity | Final | iPhone, both themes | Flow 2, theme/craft proof | — |
| `docs/screenshots/issue-489/ios-{add-connection-sheet,gateway-switcher-menu,...}.jpg` | Connectors + gateway switching IA | Final | iPhone | Flow 5 | — |
| `docs/screenshots/issue-408/0{1-4}-*.png` | Mac Agenda + Settings root + local gateway detail + all connections | Final | Mac | Flow 2/5 | — |
| `docs/screenshots/issue-445/connection-recovery-fixtures/0{1-4}-*.png` | Connection-recovery UX (cloud waking, Mac unavailable, device repair) | Final fixture | iPhone | Reliability story | — |
| `docs/screenshots/issue-401/0{1-5}-main-settings-*.png` | Mac Settings IA (root/billing/permissions/accounts/about) | Final | Mac | Flow 5 / IA | Billing screen = REDACT-check (pricing) |
| `docs/product/VISION.md` | Product thesis, surfaces, gateway model, remote-control architecture | Supporting (doc) | text | Pull-quotes, diagrams | — |
| `docs/product/DECISIONS.md` | The reasoned standing decisions | Supporting (doc) | text | Decisions section, quotes | Examples are synthetic by design |
| `docs/rebuild/00-OVERVIEW.md` | Diagnosis/strategy method; "three animals" | Supporting (doc) | text | Reflection / process | — |
| `git shortlog -sn --all` | Authorship / role evidence | Impact (data) | ~2485 vs ~120 | Role claim | — |
| `Rem: AI Personal Assistant.storekit` | Live app id + Pro subscription | Impact/supporting | JSON | App-id claim only | Pricing/SKU/group = REDACT |

---

## 9. Candidate cover

**Primary: the Rem app icon** — `RemClaw/Assets.xcassets/AppIcon.appiconset/Logo.png` (a white rounded "face"/starburst mark on brand blue `#0C50FF`, 1024×1024). It is the strongest branded, product-owned asset, ties to the `RemFaceMark` identity used throughout the app (`DECISIONS.md:110-116`), and reproduces cleanly at any size. `#0C50FF` is the confirmed brand blue (`MEMORY.md` architecture quick-facts).

**Secondary (product hero):** `docs/screenshots/issue-500/rem-main-window-final.png` (Mac app shell) or `issue-421/00-launch.png` (iOS Today) — both are clean and PII-free, but both show empty states. If a populated hero is wanted, a fresh fixture render or capture is needed (`GAP:`).

---

## 10. Open items & Redactions

### Highest-value open questions (only the user can answer)

1. **Founder identity & Samuel's exact title/relationship.** Who is "founder O," and is Samuel the founder, co-founder, or lead product designer & engineer working with a separate founder? What team size/role framing is accurate and shareable? (Evidence shows Samuel as dominant author + a distinct decision-making "founder"; identity unresolved.)
2. **How much of the AI-provider story can be told?** The model provider, the managed-AI framing, and especially the historical wrong-provider disclosure are compliance-sensitive. Confirm what is public-safe. (Default: keep the provider swap and disclosure history out entirely.)
3. **Is the runtime-substrate direction to be presented at all,** and if so as "kept OpenClaw, scoping a thin runtime seam" (current) rather than "migrated off OpenClaw" (not true)?
4. **Which screens can be shown as real vs must stay fixtures?** Real populated agenda/brief/remote-control screens are the biggest visual gap. Can the user capture fresh fixture renders (PII-free) for the hero flows?
5. **Any public-safe outcome metrics** (downloads, active users, ratings, Pro conversions) the user is willing to share? None exist in the repo; do not invent.
6. **Re-confirm the App Store facts** (current live version, release date) from App Store Connect before publishing.

### Redactions (keep OUT of the public narrative)

- **Pricing / SKU / subscription IDs:** Pro at $14.99/mo, `com.remapp.rem.pro.monthly`, subscription group `21954380` (`.storekit`). Memory explicitly lists these as scrub targets for the public repo.
- **Secrets & infra identifiers (memory-sourced):** `BACKEND_SERVICE_TOKEN`, Apple IAP shared secret, setup password, TestBed token; gateway id `remclaw-f6e34084`; Railway hostnames (`backend-production-7d876`, `backend-staging-b87e`); private LAN IPs. Never publish; if any appear in screenshots, blur.
- **Specific AI-provider details & the wrong-disclosure history** (MiniMax/GMI/`api.gmi-serving.com`; the Anthropic-vs-actual consent-string issue). Compliance-sensitive; exclude.
- **Internal metrics from Samuel's own dogfood account** ("judged=40", the 7 measured memory rows, dismissal counts). These are personal-account measurements, not product metrics — do not present as impact numbers.
- **Founder immigration / personal specifics** (H1B/NIW references in example tasks and `reference_niw_petition_workspace`). Private.
- **Investor / fundraising specifics** (engaging "Alex" at Freestyle/OCV via LinkedIn). Private.
- **Internal orchestration/AI-process incidents** (agents reaching production; open-core "dead on clone"; carve-script gaps; internal branch names). Fine as generalized craft lessons only, with specifics removed.

### Uncertain chronology / facts needing confirmation

- v1.0 date (2026-04-07) and "4 rejections" — memory-sourced, dated 2026-08-11; re-verify.
- Public repo current state — memory said it went briefly "dead on clone" then had staged fixes (not pushed); not re-checked against the live clone here.
- Composio-replaces-Connectors and "GMI managed provider" are current-as-of-memory directions; confirm they're still in force before stating as final.
