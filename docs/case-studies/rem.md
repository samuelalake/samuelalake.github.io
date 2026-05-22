# Rem Case Study Skeleton

Status: working draft for issue #13. Remove or update this line before
converting the skeleton into a public case-study page.

## Case Thesis

Public headline candidate:

> Designing and building a cross-platform AI assistant that turns intent into
> permissioned action.

Rem proves Samuel can turn an AI-native product idea into a working
cross-platform system: an iOS and macOS assistant with chat, voice, Agenda,
tasks, connectors, gateway routing, OpenClaw integration, permissions, account
state, and an AI-orchestrated development loop.

The case should read as AI design engineering, not as a pitch deck. The strongest
signal is that Rem makes the abstract promise of an assistant concrete through
product architecture, trust boundaries, and implementation evidence.

## Source Of Truth

Use the built app, repo docs, source code, App Store review artifacts, and
current screenshots as product truth. Treat older Figma work as design history:
useful for showing exploration, but not authoritative when it conflicts with the
built product.

Primary evidence sources:

| Source | What It Supports |
|---|---|
| `README.md` in the Rem repo | Current product summary, surfaces, repo layout, build/test workflow. |
| `docs/product/VISION.md` in the Rem repo | Product promise, day-planning loop, iOS/Mac/gateway model, connectors, remote-control architecture, open questions. |
| `CLAUDE.md` in the Rem repo | Architecture, platform stack, gateway lifecycle, security/trust rules, key files. |
| `deploy/ARCHITECTURE.md` in the Rem repo | Backend, Fly gateways, OpenClaw wrapper, per-user gateway provisioning, pre-warmed pool, config patching. |
| `RemClaw/Sources/Gateway/README.md` in the Rem repo | iOS dual-session gateway architecture and command routing. |
| `RemClawMac/README.md` in the Rem repo | Mac app as first-class product, navigation, gateway host role. |
| `RemClaw/Sources/Settings/README.md` in the Rem repo | Settings, permissions, paired devices, billing, skills, legal/account surfaces. |
| `APP_STORE_REVIEW_FIXES.md` in the Rem repo | App Store review evidence, consent/compliance changes, IAP visibility, permission pruning. |
| `docs/ORCHESTRATION.md` and `AI_COLLABORATION.md` in the Rem repo | AI-orchestrated development workflow, review/visual QA expectations, issue/PR discipline. |

Do not quote secrets, local credentials, private tokens, or raw setup values from
local environment files.

## Intended Audience Fit

Rem should speak directly to roles that combine product design, implementation,
AI tools, and platform craft:

- Apple Human Interface Design / App Store / Xcode and AI developer tools roles:
  show iOS/macOS product craft, App Store review response, StoreKit/billing
  awareness, and developer-tool/runtime thinking.
- Oura-style AI-native product design roles: show a user-centered assistant
  product with trust, consent, data handling, and everyday workflows.
- Vercel/OpenAI/Glean/Stripe-style AI tooling roles: show AI workflows,
  gateway/runtime design, technical users, agentic development, and proof that
  Samuel can reason across product and infrastructure.
- Founding designer / design engineer roles: show that Samuel can define the
  product model, shape the UX architecture, and help build the system.

## Case Structure

### 1. Context

Rem is a personal AI assistant for conversational day planning and execution.
A user captures an intent through chat, voice, Agenda, or another low-friction
surface, then Rem helps turn it into a task, calendar event, note, connector
action, or gateway-executed step.

The product is not only "chat with tools." The product loop is:

```plaintext
capture intent
  -> understand timing and context
  -> create or update task, event, note, or action
  -> route execution through Agenda, Connector, or Gateway
  -> report the result or next decision back to the user
```

This gives the case a product center: Rem is about moving from intention to
execution with enough structure that the assistant can actually help.

### 2. Role

> Unverified: this role framing must be confirmed with Samuel before any public
> case page is generated.

Provisional role framing to verify with Samuel:

Samuel acted as product/design engineering lead across product vision, UX
architecture, AI interaction model, trust boundaries, and implementation
direction. The case should show him moving between:

- product strategy: defining Rem as a day-planning and execution loop rather
  than a generic chat app;
- UX architecture: separating iOS, Mac, backend, gateway, settings, connectors,
  permissions, and linked-device concepts into understandable surfaces;
- design engineering: shaping SwiftUI/iOS/macOS implementation patterns,
  settings IA, gateway connection states, and productized recovery flows;
- AI development orchestration: using issue-driven agent workflows, independent
  review, visual QA, and docs as part of the build process.

Open verification questions:

- Which parts did Samuel personally design in Figma before implementation?
- Which implementation areas did Samuel directly code versus orchestrate through
  AI/code agents?
- Which App Store/TestFlight milestones can be shown publicly?
- Which metrics or user signals are available without overstating traction?

### 3. Product Problem

Most AI assistants stall at conversation: they can answer, but they do not become
the user's execution system. Rem explores what it takes to make an assistant that
can understand the user's day, route work to the right device or connector, and
stay legible enough for normal people to trust.

The hard product question:

How do you let a user ask naturally for help while still showing where the work
runs, which data is available, which permissions are active, and what the
assistant is allowed to do?

### 4. Constraints

- Cross-platform product: iOS is the everyday capture and command surface; Mac is
  a first-class app and local gateway host.
- Runtime architecture: normal assistant work routes through a gateway rather
  than the backend becoming the user's computer or memory.
- Trust boundary: phone-initiated Mac work must be capability-based, approved,
  scoped, and understandable, not raw remote desktop control.
- App Store requirements: AI data sharing consent, permission wording, IAP
  visibility, subscription copy, and unnecessary permissions had to be handled.
- Reliability: gateway setup, pairing, reconnection, and recovery must survive
  real network, app lifecycle, and multi-device failure modes.
- Product maturity: Rem is a working product in active development; some
  approval/audit UX remains an open product gap and should be presented honestly.

### 5. Key Product And Technical Decisions

#### Decision: Make iOS The Everyday Surface And Mac The Execution Host

The iPhone app owns quick capture, chat, voice, Agenda, inbox, settings,
permissions, gateway selection, linked devices, and connector setup. The Mac app
is not a hidden helper; it is a normal Dock/menu-bar app and a preferred local
gateway host for shell, files, clipboard, screen/app context, and local project
state.

Why it matters:

This maps to how people actually work. The phone is where intent appears; the
Mac is where many high-value tasks and local contexts live.

Evidence to show:

- iOS surfaces: chat, voice, Agenda, inbox, settings, permissions, linked devices.
- Mac surfaces: main window, menu bar, chat, tasks, settings, gateway status.
- Source evidence: `README.md`, `docs/product/VISION.md`, `RemClawMac/README.md`.

#### Decision: Use Gateways As The Routing And Runtime Layer

Rem separates account/backend responsibilities from assistant execution. The
backend handles identity, billing, gateway provisioning, encrypted metadata, and
connector/account plumbing. The gateway handles normal assistant work, operator
sessions, node sessions, and device capability routing.

Why it matters:

This avoids a vague "AI app" architecture. It gives Rem a real execution model:
the assistant can route work through a cloud gateway, local Mac gateway, LAN,
manual URL, future tailnet path, or paired device.

Evidence to show:

- Architecture diagram for iOS/Mac/backend/per-user gateway/OpenClaw.
- `deploy/ARCHITECTURE.md` showing backend, Fly per-user gateways, shared gateway
  image, config patching, and pre-warmed gateway pool.
- Source evidence in `backend/src/services/deploy.service.ts` for deploy phases,
  pool claim, onboarding/config patch, credential save, and auto-approve.

#### Decision: Model Capabilities, Connectors, And Permissions Separately

The product direction separates:

- Connected Accounts: who the user is and what services they authorized.
- Connectors: user-friendly integrations and permissions.
- MCP/custom tools: advanced substrate for power users.
- Gateways: where work runs and which devices can be reached.
- Permissions and privacy: what Rem can use and what the user can revoke.

Why it matters:

This makes the product legible to normal users while preserving a path for
advanced extensibility. It also supports job-fit for AI-native product design:
the work is not only visual polish, but product information architecture for a
new class of tools.

Evidence to show:

- Settings IA screenshots.
- Linked devices detail view showing platform, role, client, scopes, and unlink.
- Consent/onboarding screenshots.
- Source evidence: `RemClaw/Sources/Settings/README.md`,
  `RemClaw/Sources/Settings/SettingsView.swift`,
  `RemClaw/Sources/Settings/LinkedDevicesView.swift`,
  `RemClaw/Sources/Onboarding/AIDataSharingConsentView.swift`.

#### Decision: Treat Trust And Recovery As Product Surface

Rem's repo guidance explicitly prioritizes lifecycle thinking, typed structured
signals, source of truth, state transitions, recovery paths, and user-visible
copy. The gateway connection clients retain structured errors so pairing and
scope failures can be classified correctly instead of parsed from human-readable
strings.

Why it matters:

AI product trust is not just a privacy page. It shows up in pairing, device
identity, permissions, state recovery, and how much the user can infer when
something fails.

Evidence to show:

- Connection-state and recovery copy screenshots.
- Gateway/client source snippets showing dual sessions and structured errors.
- App Store review fixes showing permission pruning and explicit data consent.
- Source evidence: `CLAUDE.md`, `RemClaw/Sources/Gateway/GatewayClient.swift`,
  `RemClawMac/Sources/Gateway/MacGatewayClient.swift`,
  `APP_STORE_REVIEW_FIXES.md`.

#### Decision: Productize App Store And Billing Requirements Instead Of Hiding Them

Rem responded to App Store review by changing permission wording, removing
contacts/location when they lacked enough standalone value, adding explicit AI
data-sharing consent, making IAP findable, clarifying subscription value, and
updating App Store Connect metadata.

Why it matters:

This is strong Apple/platform-craft evidence: Samuel can navigate product,
policy, privacy, and UI requirements without treating review feedback as a
checkbox exercise.

Evidence to show:

- Consent screen.
- Settings upgrade/billing surface.
- App Store review fixes doc.
- StoreKit/subscription implementation evidence where approved.

#### Decision: Use AI-Orchestrated Development As A Product-Engineering System

Rem's development process uses issue-driven work, isolated branches/worktrees,
visual QA, independent review, merge discipline, and durable repo docs. The
workflow itself is part of the case because Rem is both an AI product and an
AI-assisted build process.

Why it matters:

For AI-native product/design-engineering roles, this proves Samuel can use
coding agents as collaborators while preserving product judgment, review quality,
and evidence discipline.

Evidence to show:

- `docs/ORCHESTRATION.md` and `AI_COLLABORATION.md`.
- A small diagram of the AI development loop:

```plaintext
issue or product question
  -> investigation / plan
  -> isolated branch or agent worktree
  -> implementation
  -> local validation and visual QA
  -> independent review
  -> merge and issue update
```

### 6. Evidence Gallery Plan

| Evidence | Strength | Needed For | Status | Notes |
|---|---:|---|---|---|
| iOS home/Agenda/chat/voice screenshots | High | Shows everyday assistant surface and intent-to-action loop. | needs capture | Capture after target flow list is approved. |
| iOS Settings/permissions/connectors/linked devices | High | Shows trust boundaries, settings IA, and productized capability model. | needs capture | Must avoid private account data. |
| Mac main window/menu bar/settings/gateway status | High | Shows Mac as first-class app and local gateway host. | needs capture | Must use a safe local/demo state. |
| Architecture diagram: iOS, Mac, backend, per-user gateway, OpenClaw | High | Makes the system understandable in two minutes. | needs capture | Create as a portfolio diagram. |
| App Store review fixes summary | Medium-high | Shows platform judgment and compliance response. | available | Summarize carefully; do not quote raw review correspondence without checking public-sharing rules. |
| Source snippets for gateway dual sessions and command routing | Medium-high | Proves implementation depth without exposing secrets. | available | Public path/name usage must be verified. |
| Deploy architecture and pre-warmed pool | Medium | Shows backend/gateway maturity and onboarding performance thinking. | available | Use as architecture evidence, not traction evidence. |
| TestFlight/App Store/Gmail evidence | Medium-high | Proves product status. | needs capture | Needs verified artifact list and public-safe handling. |
| Older Rem Figma | Medium | Shows design history and early exploration. | optional | Use selectively; not product truth. |

### 7. Draft Case Narrative

> Not for direct rendering: this section is for conversion to public prose. It
> should not be rendered as a standalone public section heading without editorial
> revision.

Rem started as a question: what would it take for a personal AI assistant to
move from conversation into useful execution?

The answer became a product architecture. On iPhone, Rem gives the user fast
capture, chat, voice, Agenda, inbox, settings, permission control, connector
setup, and gateway selection. On Mac, Rem becomes both a normal desktop app and
a local capability host. The backend handles account and provisioning work, but
the assistant's actual work routes through gateways that know which devices and
capabilities are available.

The design challenge was making that technical model feel understandable. A user
should not have to think in terms of OpenClaw, node sessions, operator sessions,
or config patches. They should be able to see what Rem can use, which devices
are linked, where work runs, and what permissions are active.

The engineering challenge was making the model real. Rem uses SwiftUI on iOS and
macOS, a Node/Express backend, Fly-hosted per-user gateways, OpenClawKit,
OpenClawChatUI, credential storage, pairing, reconnection, command routing,
StoreKit, usage tracking, and App Store review-driven privacy changes. The code
reflects product decisions: iOS and Mac both maintain node and operator gateway
sessions; device capabilities are advertised explicitly; settings expose
permissions and linked devices; and sensitive gateway work is treated as a
stateful lifecycle, not a happy-path connection.

The result is a working AI-native product system in active development. It is
not finished, and the case should not pretend it is. The most important learning
is that trustworthy AI assistance requires product architecture: visible
permissions, clear routing, recoverable connection states, platform-compliant
data consent, and a build process that can keep design and engineering aligned.

### 8. Outcome And Current Status

Working status:

- iOS app, macOS app, backend, gateway wrapper, and OpenClaw integration exist.
- App Store review feedback produced concrete product/privacy/compliance changes.
- Gateway, pairing, connector, and settings architecture is active product work.
- AI-assisted development workflow is documented and part of the build system.

Do not overclaim:

- Do not claim mature public traction unless verified.
- Do not claim fully permissioned phone-to-Mac control as complete; current docs
  identify stronger approval, scoping, and audit UX as product work still
  required.
- Do not make older Figma appear more current than the built app.

### 9. Role-Fit Proof

Rem proves Samuel can:

- design AI-native workflows around real user jobs rather than generic chat;
- bridge consumer product thinking with platform/runtime architecture;
- work across iOS, macOS, backend, gateways, OpenClaw, and connector systems;
- reason about trust boundaries, permissions, data consent, and recovery states;
- use AI coding systems as collaborators while maintaining product judgment and
  review discipline;
- explain complex technical systems in a hiring-friendly portfolio format.

## Screenshot And Evidence Gaps

Highest-priority captures:

1. iOS Agenda and chat/voice flow showing intent capture and execution planning.
2. iOS Settings showing account, gateway, permissions, linked devices, billing,
   and connector/skills surfaces.
3. Mac app showing Agenda/Chat/Settings plus gateway status or menu bar access.
4. Gateway/deploy architecture diagram for the case page.
5. App Store/TestFlight proof artifact that can be referenced without exposing
   private account data.
6. Source/code artifact screenshot or diagram showing dual iOS/Mac sessions and
   node/operator roles.

Questions for Samuel before publishing:

- Which Rem screenshots are acceptable to show publicly?
- Should the case use "Rem" only, or mention the internal `RemClaw` repo name in
  evidence captions?
- Can source file paths such as `RemClaw/Sources/...` be referenced publicly, or
  should code evidence be abstracted into diagrams and redacted snippets?
- Can App Store review submission ID or review date be public, or should it be
  summarized more generally?
- Which AI development tools should be named publicly: Codex, Claude, Cursor,
  Symphony, or a more generic "AI coding agents" label?
- Should the public case page use first person throughout, or keep third-person
  captions around source/evidence artifacts?

## Rubric Self-Review

| Rubric Item | Current Strength | Gap |
|---|---|---|
| Thesis clarity | Strong | Needs final one-line public headline. |
| Role clarity | Medium | Samuel must verify direct design/code/orchestration ownership boundaries. |
| Product context | Strong | Need one concise user story for the top of the public case. |
| Decision quality | Strong | Key decisions are clear; needs screenshots/diagrams to make them skimmable. |
| Evidence strength | Medium | Docs/code are strong; visual and TestFlight/App Store evidence still needed. |
| Impact or learning | Medium | Strong learning story; product outcome metrics need verification. |
| Job-description fit | Strong | Especially Apple HID/App Store/Xcode AI tools, Oura, Vercel, AI tooling roles. |
| Skimmability | Medium | Needs a visual architecture diagram and selected screenshots. |
| Precision | Strong | Explicitly avoids overclaiming remote control and product maturity. |
| Memorable takeaway | Strong | Rem = AI design engineering through working product architecture. |

## Recommended Next Pass

Before implementing a public case-study page, run the visual evidence issues:

1. Capture target iOS, Mac, and architecture evidence.
2. Verify which App Store/TestFlight artifacts can be shown.
3. Convert this skeleton into a shorter public case narrative with a strong
   first screen: thesis, role, system diagram, and three proof blocks.
