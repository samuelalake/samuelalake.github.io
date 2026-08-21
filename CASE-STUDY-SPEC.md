# Case-study patterns — the spec

The single source of truth for building a case-study page. Every project page
(Rem, Facebook, Composa, Trove) is built from this. When an agent owns a page,
it follows this document plus the project's own **truth input** (see §7).

Reference case studies (Rachel Chen): `rachelchen.tech/projects/openai`
(mobile / device-heavy) and `rachelchen.tech/projects/pokergpt` (web / desktop).

---

## 1. The anti-slop contract (read first)

1. **Never invent a lesson, a metric, a moment, or a decision.** If it is not in
   the project's truth input or its real source material, it does not go on the
   page. A reflection you made up reads as slop because it is.
2. **Voice comes from the `writing-style` skill.** Load it before writing any
   prose. This spec governs layout and image patterns; that skill governs words.
3. **Shipped vs explored, past vs present, scope not level** — per writing-style.
4. When you lack real material for a section, leave a clearly-marked
   `<!-- NEEDS: ... -->` placeholder and list it in your report. Do not paper
   over the gap with generated copy.

---

## 2. Page structure

Order top to bottom. Not every project uses every section; drop what has no real
material rather than padding it.

1. **Cover** — branded hero, straight from the homepage card asset (§4.1).
2. **Metadata** — Role / Timeline / Team / Skills.
3. **Context** (Overview → Problem → Opportunity) — why this exists.
4. **Solution** — the one-line what-it-is, plus the payoff.
5. **Core flows** — the shipped experience, walked step by step (§4.3). Put an
   **Onboarding** sub-section here when the project has one (Rachel does).
6. **Key design moments** — research, exploration, prototyping, design decisions,
   designing under constraints. This is the middle of the page and the part that
   shows judgement. Draw these from the truth input.
7. **Impact / Where it landed** — the concrete outcome first, then meaning.
8. **Reflection** — real lessons only, as a grid of one-liner + gloss (§4).

Maps to the 7-part frame: cover, metadata, context, final artifacts (solution +
core flows), key design moments, impact, reflections.

---

## 3. Type & layout signature

- **Reading column** `--cs-read: 760px`, centered. Images sit at this width, never
  edge-to-edge wider than the text.
- **Micro-labels are monospace** uppercase (`--cs-mono`): section eyebrows, frame
  labels, metadata `dt`, flow step numbers, the back link.
- **Display headings** use `--font-display` (Hubot Sans). **Body** is sans.
- **Outer image containers are square — no border-radius.** Phones inside keep
  their rounded bezel; that is the only roundness.
- **Fixed left section nav** (`.cs-nav`) with scroll-spy, plus a `← Selected work`
  back link. Collapses under 1200px to an inline back link.
- No divider lines inside info grids.

---

## 4. Image patterns (the catalog)

Pick by content type. The wrong container is the most common mistake.

**4.1 Cover** — `.cs-cover > .cs-cover-media` (16:9). Use the exact asset the
homepage card uses for this project (usually the branded logo/animation `seq`).
Never a product screenshot as the cover.

**4.2 Product reveal / final artifacts** — real photography or hero shots, 2-up
or full width, `.cs-figure` (flat, square, no frame).

**4.3 Core-flow step** — mobile screen in a **phone device frame** inset in a
**square container** (`.cs-device` → `.cs-device-screen`). **Media always on the
left, text always on the right, unchanging down the sequence** (`.cs-flow`). One
step per row. For web products, use a flat `.cs-figure` on the left instead of a
device frame — the flow structure is identical, minus the phone.

**4.4 Onboarding** — a full-width contextual/lifestyle image under core flows.

**4.5 Collage / exploration frame** — ONLY for messy, freeform, overlapping piles
of research or exploration artifacts. Tinted square, mono label inside top-left,
no radius (`.cs-figma` → `.cs-figma-frame` → `.cs-figma-label`). Clean rectangular
screenshots do NOT go in here (that is double-containment — they carry their own
background).

**4.6 Clean screenshot grid** — plain 2-up/3-up shots (`.cs-media` → `.cs-grid-2`
/ `.cs-grid-3`), caption below, no frame. Optional `.cs-media-label` above.

**4.7 Prototyping concepts** — grouped device frames with a mono caption under
each and text to the right.

**4.8 Where-we-landed** — device frames in square containers (gradient bg via
`.cs-device.bg-gradient`), 2-up, caption tied to a named insight.

**4.9 Comparison** — competitor/reference screens device-framed in a 16:9
container (`.cs-device.wide`), 2-up.

**4.10 Constraint diagram** — a custom explanatory diagram in a light square, plus
mono "considerations" Q&A. This is the design-decisions-under-constraints beat.

---

## 5. Reusable components (markup)

All classes live in `case-study.css`. Page shell:

```html
<main class="cs">
  <nav class="cs-nav" aria-label="Sections">
    <a class="cs-nav-back" href="/">← Selected work</a>
    <ul class="cs-nav-list"><li><a href="#SECTION_ID">Label</a></li>…</ul>
  </nav>
  <a class="cs-back" href="/">← Selected work</a>            <!-- narrow fallback -->
  <section class="cs-hero"><p class="cs-kicker">…</p><h1 class="cs-title">…</h1><p class="cs-lede">…</p></section>
  <div class="cs-cover"><img class="cs-cover-media seq" data-seq="/projects/<card-seq>" data-count="N" src="…/000.svg" alt="…" /></div>
  <dl class="cs-meta">…</dl>
  <section class="cs-section" id="SECTION_ID"><p class="cs-label">Eyebrow</p><h2>Thesis heading</h2><p>…</p></section>
</main>
```

Device frame (mobile). Light/dark pairs use `.only-light` / `.only-dark`:

```html
<div class="cs-device bg-gradient"><div class="cs-device-screen">
  <img class="only-light" src="…-light.png" alt="…" /><img class="only-dark" src="…-dark.png" alt="…" />
</div></div>
```

Core flow (media left, text right — do not alternate sides):

```html
<div class="cs-flow">
  <div class="cs-flow-step">
    <figure class="cs-flow-media"><div class="cs-device bg-gradient"><div class="cs-device-screen">…</div></div></figure>
    <div class="cs-flow-text"><p class="cs-flow-num">01 · Capture</p><h3>…</h3><p>…</p></div>
  </div>
</div>
```

Every section that appears in `.cs-nav-list` needs a matching `id` on its
`<section class="cs-section">`. Scroll-spy is in `homepage.js` (loaded on every
case page); it highlights the last section whose top has passed.

---

## 6. Language (with the writing-style skill)

The skill sets the voice; these are the case-study specifics observed in Rachel's
pages, which read as easy and honest:

- **Question-led framing** for problems: "What if…", "How might we…".
- **Thesis headings in plain words**, stating the point, not being clever.
- **Short sentences, concrete nouns, first person.** Honest asides over polish.
- **Reflection = punchy lesson + one-line gloss.** Never a paragraph of wisdom.
- No jargon, no rhythm-triads, no invented numbers, no em dashes.

---

## 7. Truth input (provided per project, by Samuel)

Before an agent builds a page, it needs rough bullets — Samuel's words, not
generated — covering:

- **Facts**: role, team, timeline, status (shipped/explored), what it is in one line.
- **Context**: the real problem and why it mattered.
- **Design moments**: the 2–5 real decisions, forks, or things learned along the
  way. These become §2.6. If a moment was "written over" during iteration, name it.
- **Outcome**: what actually happened. Real numbers only if they exist.
- **Lesson**: the true throughline. One or two. This is §2.8.

No truth input → the agent builds structure and marks every prose block
`<!-- NEEDS -->`. It does not invent.

---

## 8. Assets & transcode conventions

- Images at reading width; light/dark pairs as `.only-light` / `.only-dark`.
- Videos: web-optimized `.mp4` (h264, no audio, ≤1280px long edge, faststart).
  Keep the heavy source `.mov` locally; exclude it from deploy via `.vercelignore`.
- Cover asset = the homepage card asset for that project.

---

## 9. Per-project status

- **Rem** — piloted on this spec. Thin on real product screens (2 stills + video);
  core-flow screens are representative placeholders pending real capture/confirm/act
  shots. Copy still needs a truth-input pass with the eng.
- **Facebook** — old template, not yet migrated. 3 phone stills + product videos
  (transcoded). No light/dark pairs.
- **Composa** — web/desktop video editor. No page, no assets yet. Use §4.3 web
  (flat, no device frame) and §4.10 annotated web mockups. Everything pending.
- **Trove** — replaces Munch. No page, no assets yet. Everything pending.
