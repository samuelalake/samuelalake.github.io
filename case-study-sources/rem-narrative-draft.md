# Rem — narrative draft (v1, from scratch, for Samuel's review)

Director's draft in Samuel's voice, from `rem-source-package.md`, written as if no Rem page
existed yet. Rules applied: no invented metrics; redactions applied (no provider, pricing,
secrets, dogfood numbers); honest "live but hardening"; founder/role flagged; AI-build lessons
generalized only. A separate reconciliation note (vs the current Codex page) follows at the end.

---

## Cover
**[pattern: cover]** · **[asset: the Rem face mark, white on brand blue `#0C50FF` (`AppIcon` / `RemFaceMark`)]**

Kicker: `REM · iOS + macOS · 2026`

**Title:** Turning everyday intent into work an assistant can actually do

**Lede:** Rem is a personal assistant for iPhone and Mac that takes what you say in chat, voice, or your agenda, turns it into real tasks and events, and, once you approve, runs the work through a gateway you control: a cloud gateway or your own Mac.

---

## Metadata
**[pattern: metadata row]**

- **Role:** Co-founder, product design and engineering
- **Timeline:** 2026 (live on the App Store, actively hardening)
- **Platform:** iOS and macOS, SwiftUI
- **Skills:** Product design, design engineering, systems design

> `[CONFIRM — the one open fact]` The record shows you as the dominant author (~2,485 of ~3,100 commits) alongside a separate product decision-maker ("founder O"). That picks **co-founder** (you own product, design, most of the build). If O is an early collaborator rather than a founder, it becomes **Founder**. Confirm and I set Role and Team exactly. Do not state a team headcount until then.

---

## Project context
**[label: THE PROBLEM]** · **[pattern: claim heading + short lede]**

**Heading:** Capture tools hold your intentions, then hand the work back to you

**Lede:** People carry a mess of intentions across clients, commitments, and to-dos. A task app captures them as a flat list, a chat assistant captures them as a transcript, and either way you still have to administer the tool. The bet behind Rem: the assistant should orient you, not add one more thing to manage.

> `[design principle, carries the whole product]` The task is the object that persists; the conversation that produced it is fleeting. Everything in Rem follows from that.

---

## Solution / the work
**[label: THE PRODUCT]** · Show the shipped product and its loop first. All screens are clean and PII-free; several are fixture renders. `[NOTE: real populated screens are the biggest asset gap, see reconciliation.]`

**Heading:** One loop: capture, orient, work, brief, repeat

Rem is a real cross-platform native app, not a chat wrapper. The iPhone is the everyday command surface; the Mac is a first-class app and the preferred place to run work locally. The product is organized as one operating loop.

### Capture: get intent in before it evaporates
**[pattern: core-flow step, device frame]** · **[asset: iOS Today / capture surface (`issue-421`); `[NEEDS] a real capture-becoming-a-task screen]`]**

You capture in chat, in voice, or from the agenda, in whatever words you'd use out loud. Rem turns it into a task, an event, or a connector action. Onboarding is a short conversation, not a setup wizard.

**Caption:** The capture surface. Intent goes in as talk; it comes out as a structured task.

### Orient: the day as one agenda
**[pattern: core-flow step, device frame]** · **[asset: Mac main window (`issue-500`), iOS agenda card light/dark (`issue-486`); `[NEEDS] a populated agenda]`]**

The agenda is the Today surface on both iPhone and Mac: calendar as timed context, tasks as executable intent, in one place.

**Caption:** The agenda on Mac and iPhone. Calendar and tasks share one surface.

### Work: the assistant does the next step, with your approval
**[pattern: core-flow step, device frame]** · **[asset: approval-pending gateway (`issue-643`), diagnostics "Thinking" + browser-action record (`issue-618`); `[NEEDS] a real end-to-end approve→run→result]`]**

This is the hard part and the differentiator. You ask in natural language; Rem proposes an action, waits for your approval, then runs it through the gateway, a browser action, a connector, or a real action on your Mac, and reports back in the task's own log. Nothing touches your accounts or your computer without a confirm step.

**Caption:** Approval is load-bearing. The assistant proposes, you approve, then the work runs and reports back, on infrastructure you control.
> `[HONESTY — good candid material]` Your own docs name an open safety gap: the approval, scoping, and audit UX for phone-initiated Mac control is still product work in progress. Saying that out loud is a strength, not a weakness.

### Brief: one update surface instead of ten notifications
**[pattern: image-text row, device frame]** · **[asset: `[NEEDS] a real Daily Brief screen — none located in the repo]`]**

Runs roll up into one Daily Brief: a morning orientation and an end-of-day sign-off. When there's nothing worth saying, it stays quiet rather than manufacturing a notification.

**Caption:** The Daily Brief. Proactive when there's signal, silent when there isn't.

### The substrate: connectors and gateways
**[pattern: core-flow step / IA, device frame]** · **[asset: connectors + gateway switcher (`issue-489`), Mac settings + gateways (`issue-408`)]**

Underneath the loop, Settings turns a fragile per-user daemon into legible parts: connected accounts, connectors, and gateways (cloud, your Mac, and the ways to reach it). This is the bulk of the design labor, and it's what makes the "work" step trustworthy.

**Caption:** Connectors and gateways, the plumbing made legible.
> `[flow-count note]` This is the flow to fold into "Work" if the page needs four instead of five. It's a large surface with its own decisions, so I'd keep it distinct.

---

## Key design moments
**[label: THE DECISIONS THAT SHAPED IT]** · **[pattern: decision callouts]**

### Assistant-led, approval-gated, never ambient control
The Mac already exposes shell, files, and clipboard through the gateway, so raw phone-to-Mac control would be unsafe. The design invokes specific, user-approved capabilities with clear scopes and an auditable log, instead of handing the assistant the keys. The approval step is the product, not a speed bump.

### The task is the persistent object
Rem is built on a strict idea of what a task is, and what isn't one. A "recurring task" isn't a task, it's an automation that works a task on a cadence and leaves an attributed note. That one distinction decides what gets built and what stays peripheral.

### Memory stays thin, on purpose
Three attempts at a dedicated memory store all failed the same way: they tried to synthesize a record no one had written. The decision was to keep memory thin, task descriptions plus searchable past conversations, with one test: if it's derivable from a task, it isn't memory.

### Gateways: cloud to onboard, Mac to trust
Cloud is the easiest way in and the reliable fallback; the Mac is the first-class, local-first path. Modeling where work runs separately from how the phone reaches it let one product serve very different privacy and networking needs without a rewrite for each.

---

## Impact / where it stands
**[label: WHERE IT STANDS]** · **[pattern: outcome grid, honest, no invented metrics]**

- **Live on the App Store**, cross-platform on iOS and macOS: conversational onboarding, chat, voice, agenda, connectors, and multi-model gateway management (cloud, local Mac, and LAN / Wake-on-LAN / tailnet / tunnel reachability), plus a Mac menu-bar app and a widget.
- **Approval-gated agent execution** with browser actions, connector actions, and Mac capability routing.
- **Open-sourced under Apache-2.0**, with an open-core model that keeps the hosted pieces behind interfaces.
- Built over about six months, roughly 3,100 commits, most of them mine.

> Honest ceiling: shipped, and in an active reliability-and-simplification phase. No user, retention, or revenue numbers, so none are shown.

---

## Reflection
**[label: REFLECTION]** · **[pattern: 2-col lesson + gloss — every lesson tied to a real decision]**

- **Check what you told the agent before blaming the model.** Rem tasked everything because the instructions literally said to. The fix was the instruction and a coaching tone, not a better model.
- **Memory should be authored, not derived.** Every attempt to synthesize a memory nobody wrote produced noise. If a task already holds it, it isn't memory.
- **Restraint is a feature.** An empty brief beats a brief that spends a turn to say nothing. Sometimes the right call is not to run the agent.
- **Diagnose before you rewrite.** "The engine is cursed" hid three separate bugs. Naming them to file and line turned a planned rewrite into a staged fix.

> `[AI-build thread — woven, generalized, per your call]` The truest process lesson: prose in a config file doesn't stop a coding agent; roles and gates do. Include it only if Rem's page covers how it's built, with the specific incidents kept out. This is the thread that also belongs on About / the homepage.

---

## Open items rolled up (for your review)
1. Co-founder vs founder (the "founder O" relationship). Picks Role and Team.
2. How much of the AI-provider story is public-safe? Default: none of it.
3. Runtime direction phrased as "kept the engine, scoping a thin seam," not "migrated off it." OK?
4. Can you capture fresh PII-free fixture renders for the hero flows (populated agenda, a real approve-run-result, a Daily Brief)? Biggest visual gap.
5. Any public-safe outcome metric at all, or keep it all qualitative?
6. Re-confirm the App Store release date/version before this becomes the durable record.

---

# Reconciliation note — this draft vs the current Codex Rem page

Reconciliation IS needed, and it is a **merge, not a replace**. The two are complementary:
the live page has the stronger context spine; this draft has the content the live page is
still missing, plus a few real factual fixes.

## Keep from the live page (it's better here)
- The **Problem / Opportunity split** ("work is split across apps that capture but never follow through" / "voice to capture, a controlled runtime as the moat"). Cleaner than my folded-into-context version.
- The **Research + interaction-model exploration** (who leads a voice interaction; HUXE vs Todoist Ramble; assistant-led vs user-led; returning to a familiar chat model). My from-scratch draft under-weights this; the live page's version is good, keep it.
- The **execution-layer** section framing and the **open-core** impact angle.
- The role grid already leans founder: "Initiated the idea, brought collaborators in, and set the strategy." Good.

## Graft in from this draft (the live page is missing it)
1. **The Solution / core-flows section is a live placeholder** ("intentionally scaffolded... replace the placeholder media and copy," "Core flow placeholder" ×2, "Onboarding" placeholder). This draft fills it with the **5 real flows**: Capture, Orient (agenda), Work (approval-gated execution, the differentiator), Brief, and the Connectors/Gateways substrate. **This is the biggest gap to close.**
2. **Reflection is a live placeholder** ("Placeholder for the first/second project lesson"). This draft supplies **4 real, evidence-tied lessons** (check the instruction before the model; authored-not-derived memory; restraint / empty brief; diagnose the three animals before rewriting).

## Fix on the live page (factual)
1. **Kicker says "Rem · 2025."** Evidence: first commit Feb 2026, v1.0 Apr 2026. Should be **2026**.
2. **Metadata contradicts the page's own role grid.** Metadata reads "Lead Product Designer & Engineer" + team "2 engineers, 1 designer," but the grid says "initiated the idea, set the strategy" (founder). Reconcile to **co-founder** framing (pending the founder-O confirmation). Right now the page argues both.
3. **Impact: "reaches users across both major mobile platforms."** Evidence shows **iOS + macOS**, not iOS + Android. Verify and likely change to "iOS and macOS."
4. **Impact: "More than 100 people joined the waitlist" and "accepted into Beta University's pre-accelerator."** These are **not in the repo evidence** the SME mined. If they're real facts you have, they're good, public-safe outcomes, keep them. If aspirational or placeholder, cut. Confirm.

## Net
Graft this draft's **Solution core-flows** and **Reflection** onto the live page's existing Problem / Opportunity / Research spine, and apply the four factual fixes. Codex owns the Rem page, so this is a hand-off, not something I'll edit.
