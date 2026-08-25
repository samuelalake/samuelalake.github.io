# Composa, narrative draft (v1, for Samuel's review)

Director's draft in Samuel's voice, from `composa-source-package.md` + Samuel's
"Mental Model of Composa" doc. Decisions applied: **product-first, AI-process as a
supporting thread**; honest status (live on composa.app, active V1, the paste-from-Figma
promise is written truthfully, since the decoder is still a stub); no invented metrics;
redactions applied. Each section notes **[label]**, **[pattern]**, **[asset]**.

---

## Cover
**[pattern: cover]** · **[asset: the stacked-diamond Composa mark (violet `#795EE4`, `ComposaMark.tsx`), or a clean full editor capture, `[NEEDS clean re-shoot]`, existing shots carry debug chrome]**

Kicker: `COMPOSA · WEB · 2026`

**Title:** If you can use Figma, you can make video

**Lede:** Composa is a web editor that turns design into motion without leaving the mental model designers already have. You paste from Figma, keep your layers, add video and audio, and animate on the canvas, with an AI agent closing the gap between intent and keyframes.

---

## Metadata
**[pattern: metadata row]**

- **Role:** Founder, product design and engineering
- **Timeline:** 2026 (live, in active V1)
- **Platform:** Web, React, Supabase
- **Skills:** Product design, design engineering, systems design

---

## Project context
**[label: THE PROBLEM]** · **[pattern: claim heading + short lede + programmatic illustration]**

**Heading:** Moving a design into video means giving up the design

**Lede:** Designers already know how to compose in Figma. To animate that work, they export it into a video tool with a different mental model, and the export flattens their layers into a static image or an SVG they can no longer edit. The craft resets, and the file loses its structure.

**[pattern: explanation diagram, the two frictions. NEEDS a clean SVG.]**
Two costs, every time: a cognitive one, relearning a timeline tool that works nothing like the canvas you designed on; and a technical one, losing layer-based editability and quality on the way out of Figma.

---

## Solution / the work
**[label: THE PRODUCT]** · Show the editor and the core loop first. All screens `[NEEDS clean capture]`.

### The core loop: paste from Figma, add media, animate on the canvas
**[pattern: core-flow, full-width editor + steps]** · **[asset: `[NEEDS] editor with a pasted Figma frame → timeline with video/audio → animated result]`]**

Composa's whole promise is one loop. You paste a frame or motion from Figma, combine those vector layers with video and audio in one space, and animate with controls that feel like the design tools you came from. The layers stay layers.

**Caption:** The editor: Figma-native layers, a master timeline, and canvas animation in one space.
> `[HONESTY, important]` Paste-from-Figma with layers intact is the headline and the wedge, and the decoder that makes it lossless (`.fig` kiwi binary; motion import) is still in progress. Write this as the product's thesis and current focus, not as a finished, shipped guarantee. The editor, timeline, Web Audio, and export are real and live; full Figma parity is the thing being closed.

### Animation with a mental model, not a keyframe editor
**[pattern: image-text row]** · **[asset: `[NEEDS] the Build-In / Action / Build-Out preset UI]`]**

Instead of hand-tuning easing curves, motion is organized into presets a designer already understands: Build-In, Action, and Build-Out, borrowed from Keynote, with a keyframe model closer to Gizmo's diamonds than a video timeline. Familiar mental models do the work that hours of keyframe configuration used to.

**Caption:** Motion as presets, not curves.

### AI that closes the effort gap, without taking the controls
**[pattern: image-text row]** · **[asset: `[NEEDS] the in-editor AI agent acting on the canvas]`]**

The friction in motion design is effort and domain knowledge, not just tool complexity. Composa's AI works inside the editor, so you direct intent in natural language while keeping full manual control. It understands the canvas and timeline well enough to act like an editor, and understands uploaded video and audio well enough to do context-aware edits. When it generates something complex, it abstracts the math into simple controls you can still turn.

**Caption:** An in-editor co-pilot, not a headless generator. You stay in control; the AI does the heavy lifting.

---

## Key design moments
**[label: HOW IT'S BUILT]** · **[pattern: decision callouts]**

### Designing for AI without letting the shell cap it
The risk in an AI-native editor is that the app's own UI limits what the AI can make. Composa's answer is to let the AI work at a lower level and hand back custom controls for what it generates, the way Figma exposes a shader as sliders. The architecture stays flexible because the interface is generated to fit the capability, not the other way around.

### Open-core as the moat, not a plugin sandbox
The obvious threat is Figma adding video or buying a competitor. Rather than build a closed wrapper, Composa is open-core: users get the canvas primitives and the codebase, not just a plugin surface. The bet is that when a tool hits a ceiling, its community builds past it faster than any single closed team.

> `[AI-build thread, product-first, woven]` Composa is where your build process legitimately belongs in the story: an agent-directed build with a verify gate and GitHub as the system of record. Frame it as how the product gets made at speed, still never as "I use AI" as a headline. Your call on how prominent.

---

## Impact / where it stands
**[label: WHERE IT STANDS]** · **[pattern: outcome grid, honest, no invented metrics]**

- **Live on composa.app:** landing, passwordless auth, projects, and a genuinely deep editor, Figma-grade auto-layout, a multi-lane master timeline, Web Audio, a Keynote-derived animation model, a canvas export twin, and an in-editor AI agent.
- **In active V1:** the design-to-video loop works; full Figma paste parity is the current focus.

> Honest ceiling: no user, traffic, or revenue numbers yet. Written to say exactly that.

---

## Reflection
**[label: REFLECTION]** · **[pattern: 2-col lesson + gloss]**

- **Meet people where their skills already are.** The wedge is not a better timeline; it is not making designers learn one at all.
- **Keep the human in the editor.** Headless AI generates but cannot be steered. The value is intent plus direct control in the same place.
- **Let the AI generate the controls.** When the interface is generated to fit what the AI makes, the app shell stops being the ceiling.
- **Ship the loop that proves the value.** Everything past paste-to-animate is vision; the loop is what earns the right to build it.

> `[from your doc]` These map directly to your "Mental Model" doc (cognitive/technical friction, in-editor co-pilot, AI control-abstraction, the core MVP loop). Adjust any that overreach the current build.

---

## Open items rolled up (for your review)
1. How prominent should the AI-agent build process be, a visible thread, or a light mention? (You said product-first; confirm the weight.)
2. Confirm the honest status line and how to phrase the paste-from-Figma parity (thesis + in-progress vs anything stronger).
3. Real numbers: anything public-safe to cite (surfaces, editor capabilities), or keep it all qualitative? (SME found no metrics.)
4. Cover: the violet stacked-diamond mark, a clean editor capture, or the (unbuilt) launch film?
5. Media: needs a clean capture pass of the editor and the core loop, I can script that once layout is set.
