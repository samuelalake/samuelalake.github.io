# Trove — Case Study Source Package

> FACTUAL source package for a NEW portfolio case study. Not final prose. Read-only research; no code was changed.
> Evidence discipline: primary evidence = current code / docs / git log / design files. Agent memory = LEADS (dated, verify). Unsupported fields marked `GAP:`. Historical (Munch) vs current (Trove) is called out throughout.

> **Portfolio update, Aug 24:** the owned 2D Trove book animation is now the
> approved cover direction, using brand orange `#EA6A2E`. The problem diagram
> was removed. Current capture direction distinguishes Safari share import,
> in-app Add-by-link, and Save from Discover rather than treating them as one
> flow.

---

## 1. Source snapshot

- **Repo (on disk):** `/Volumes/SatechiSSD/Developer/Apps/Swift/Munch` — still named **"Munch"** on disk. This is the Munch → Trove app.
- **Checked-out branch at read time:** `codex-munch-revival-checkpoint`, HEAD `d618be13` dated **2026-08-05** ("Fix: profile photo survives container/UUID changes (#115)(#156)").
- **The actual launch line is elsewhere:** memory + git show the launch-candidate branch is **`integration-aug7-v19`** (worktree `devicecomb3`), which was merged to `main` via **PR #303 + #311 on 2026-08-10** ("main now IS v19"). App-Store build 4 fix committed on that branch at `cc33c197` (2026-08-19). So the branch I read (`codex-munch-revival-checkpoint`) is an older checkpoint; the current product truth for late-Aug 2026 lives on the v19/main line and in memory, not the checkpoint working tree.
- **Rename commit:** `60ae6d28` **"Rebrand: Munch → Trove"**, dated **2026-08-04**, PR #124.
- **Origin of the codebase:** `Initial Commit` **2022-04-03** (original student prototype). "Cleaned code to support eng handoff" 2022-06-09. Revived and rebuilt in 2026.
- **Memory used (LEADS, from `.../Munch/memory/`):** MEMORY.md, munch-current-state, munch-direction-aug2026, trove-launch-gate-aug2026, trove-social-redesign-aug2026, trove-accounts-attribution-aug6, trove-near-launch-aug7, trove-amazon-commerce, trove-launch-candidate-aug10, trove-ifr-discover, trove-directions-data-model, trove-share-import-diagnosis, trove-server-extractor, trove-social-suggestion-tension, trove-appstore-build4, trove-domain-usetrove-co, trove-resolver-deploy. (Also read: reuse-established-patterns, working-autonomy, remclaw-pattern-reference.)

**Munch → Trove rename status (verified):**
- **Executed** 2026-08-04 (PR #124): `CFBundleDisplayName = Trove` (app + share extension), centralized orange accent `Color.trove` `#EA6A2E` (81 `.green` refs swapped), placeholder `frying.pan.fill` app icon, removed onboarding/import media placeholders, centered welcome.
- **Deliberately UNCHANGED:** bundle id `ade-studios.Munch-RKCK`, App Group, Xcode project/scheme names, and all code symbols (`MunchStore`, `MunchMatching`, `MUNCH_*` flags). This is why the repo still reads "Munch" everywhere in code.
- Supabase project is named **"trove"** (`pfkhrnbgxaamrugdlqxm`); domain **usetrove.co** acquired 2026-08-06; App Store display name is **Trove** (listing needs a unique variant — bare "Trove" is taken by a loyalty app, so "Trove: …").

**Evidence-vs-current differences (IMPORTANT):**
- **The committed public docs are STALE and still describe pre-rename "Munch."** `README.md`, `docs/product-direction.md`, `docs/case-study-notes.md`, and `docs/app-store/listing-copy.md` all describe Munch as a *"nutrition starter app for teams exploring meal planning as behavior-change software"* with CareKit/ResearchKit seams. The README on the launch-candidate branch (`integration-aug7-v19`) **still says "Munch … nutrition starter app."** Do **not** source current-product claims from these docs — they predate both the rename and the social/commerce pivot. Current truth = git log of the v19 line + memory.
- **CareKit / ResearchKit / HealthKit were removed**, contradicting the README's whole framing (see §4/§5). ResearchKit removed June 2026; CareKit + HealthKit removed Aug 2026 to clear App Store rejection 2.5.1.
- **`docs/images/*.jpg` are OLD Munch screenshots** (ResearchKit guided cooking, Activity tab, Kroger OAuth, avocado-era). They do **not** represent current Trove UI.

---

## 2. Project facts

- **Name:** **Trove** (formerly **Munch**). Rename 2026-08-04.
- **One-sentence description (current product):** Trove is an iOS app for **discovering, saving, and importing recipes from across the social web** — you browse recipe "cards" from other cooks and open sources, import your own private editable copy with directions, plan them into your week, and turn them into a consolidated grocery list.
- **Product model (canonical, from `docs/PRODUCT_MODEL.md` on the product-model-doc branch):** *"Trove is a social graph of pointers; cooking happens on personal snapshots you pull from those pointers."* Three objects — **Source** (the original out in the world), **Card** (Trove's shareable pointer: title + ingredients + attribution + link + cover, **no directions**, everyone sees the same one), **Copy** (your private editable snapshot **with** directions, frozen at import). Two verbs — **Save** (bookmark a Card) and **Import** ("Add to my Trove" — materialize a Copy). Import implies Save; Save does not imply Import.
- **Status:** Near-launch / in App Store review. **App Store build 4 resubmitted 2026-08-20, state "Waiting for Review"** (after a Guideline 2.5.1 rejection was fixed by removing CareKit/HealthKit). Earlier reached **TestFlight** as "Munch 1.0 (1)" on **2026-06-15** (external beta, testers Francis Oledibe + David Olaniran).
- **Date range:** original prototype **2022**; revival + rebuild **2026** (heavy activity May–Aug 2026); rename **Aug 4 2026**; App Store submission **Aug 2026**.
- **Role / ownership:** Samuel Alake — solo founder / product designer / iOS developer, working with heavy AI-agent assistance (his stated working style: delegates execution, GitHub as system of record, feedback-driven "iteration table" workflow, adversarial review + drive-the-real-app before merge). Company entity **Wayfind LLC** (Apple Team `R6A892D599`), which he submitted to rename to **Ade Studios LLC**. `GAP:` no other engineers/designers evidenced — appears solo.
- **Collaborators / testers (public-safety check needed):** Jonathan Zhou (early tester, the "trapped on welcome screen" P0 reporter; also the person whose Reddit post surfaced the name-collision competitor), Francis Oledibe, David Olaniran. `REDACT/CONFIRM:` these are third-party individuals — get Samuel's OK before naming testers publicly.

---

## 3. Context

**User problem (from product docs + model):**
- People find recipes everywhere — Instagram, TikTok, YouTube, recipe blogs — but those live in disconnected places, can change or disappear, and aren't cookable/plannable in one place.
- Trove's answer: keep a **reference** to the source (title, ingredients, attribution, thumbnail) as a shareable Card, and let you pull a **private editable Copy with directions** you actually cook from, then plan and shop it.

**Product / business problem:**
- The original **Munch was a 2022 student prototype** that had been abandoned; the first 2026 arc "revived" it as a buildable open-source SwiftUI starter (recipes + meal plan + grocery + preferences), explicitly leaving CareKit/ResearchKit/CardinalKit "seams" for a health/behavior-change angle.
- **Commercial thesis:** grocery/commerce is the funding path — planned recipes → consolidated list → retailer cart handoff (Kroger API verified end-to-end; Amazon affiliate). Nutrition/dietitian/telehealth were named as a *long-term* company direction but explicitly kept **out of launch scope**.

**The Munch → Trove pivot (evidenced — two forces at once):**
1. **Name collision (the trigger, 2026-08-04, issue #119 → PR #124):** a competitor shipped *"Munch — Your Social Recipe App"* (App Store id6767927842, also on Product Hunt) — same name **and** same "social recipe" concept. Samuel found it via a Reddit Figma-motion post (gave the OP, Jonathan Zhou, his TestFlight). Decision: rename to Trove and differentiate on the real moat — native Apple commerce rails + on-device AI + the meal-plan→grocery loop.
2. **A deeper repositioning (mid-2026):** the product moved away from the "nutrition / behavior-change / CareKit-ResearchKit starter" framing toward **social recipe discovery + import + commerce**. Evidence: ResearchKit removed (June 2026, to drop the only git-lfs/submodule dep); the whole social layer built (Discover, Save-as-flywheel, profiles, follow, attribution); then CareKit + HealthKit fully removed (Aug 2026) — which finally **contradicts the README's stated identity**. The rename is the visible marker of a positioning change that was already underway.

**Constraints (evidenced):**
- **Directions / copyright:** Trove generally can't republish source directions. Community/catalog Cards deliberately withhold steps; you get directions only in your own imported Copy. `.mealdb` rows are licensed (directions shown); `.catalog` (open-web indexed) rows have **no** directions stored (indexer only kept title/ingredients/nutrition/attribution); `.imported` directions are stripped at publish. (`trove-directions-data-model`, verified via service-role query.)
- **Legal / attribution:** all indexed recipes owned by one canonical official **@trove** account so liability sits with the entity, not Samuel personally (#193). Open-web indexing honors robots + a curated per-domain allowlist, never rehosts directions (#171). Competitor myrecipes.com (People Inc.) is legally walled off (AI/TDM banned) — so scraping it is out.
- **Solo + tight machine:** chronic disk pressure (build to SSD paths), agent-driven builds, can't enter Apple ID/secrets (Samuel does auth/secret/merge/upload steps himself).
- **Platform:** iOS 17 deployment floor (app + share extension); on-device AI paths need iOS 26 + Apple Intelligence (so they no-op on the simulator).
- **Portfolio metadata:** Team — Solo.

---

## 4. Current / final solution (Trove today)

Mobile iOS app — **device-framed screens apply**. Core flows, current state:

**A. Discover (browse + search).**
- *User goal:* find recipes worth cooking from other cooks and the open web.
- *What happens:* a feed of recipe **Cards** reading community content (`community_recipes` in Supabase), plus **search** with a segmented **Recipes | People** picker. A newer **shelf-based "IFR" Discover** (For You / From cooks you follow / cuisine shelves / Popular on Trove — the "row of rows" model) is built but **behind DEBUG flag `MUNCH_SHOW_IFR`**; Samuel is treating it as the direction but hadn't flipped it to default.
- *Evidence:* `Munch/DiscoverShelvesView.swift`, `RecipesViewController.swift` (`discoverContent`), store helpers in `StoreModel.swift`; leads in `trove-ifr-discover`, `trove-social-redesign-aug2026`.
- *Proves:* social discovery + ranking (v2 ranker: follow 5.0 / cuisine 3.0 / circle 2.0 / save 1.5 / time 1.0).

**B. Recipe Card detail + attribution.**
- *User goal:* judge a recipe and see where it's from.
- *What happens:* Card shows cover + ingredients + **two-line attribution** — **"Added by {owner}"** on top (Trove / MealDB / a poster) and **"From {original source}"** below (favicon + friendly name; UGC shows handle, e.g. "YouTube · zeezee"). Community/catalog cards **withhold directions**; `.mealdb` cards show directions + Cook Now. Footer primary = **"Add to my Trove"** (import) → opens the in-app browser. A **"Saved by …" facepile** aggregates original contributor + everyone who saved.
- *Evidence:* shared `RecipeAttributionView`, `RecipeSourceInfo`, `RecipeSaversFacepile`; leads in `trove-social-redesign-aug2026`, `trove-launch-candidate-aug10`, `trove-directions-data-model`.
- *Proves:* the Source/Card/Copy model made visible; the copyright-safe "pointer" design.

**C. Import ("Add to my Trove").**
- *User goal:* get a private, cookable copy with directions.
- *What happens:* tap "Add to my Trove" → the app's **branded in-app web browser** opens the source page → in-browser import (RecipeImportPipeline: JSON-LD → AI/resolver fallback) → a **Review sheet** (edit / audience Everyone|Only-me / add-to-collection / Save) → a private editable **Copy** captioned *"Your copy — edit the steps to make it yours."*
- *Evidence:* `RecipeWebBrowser`, `RecipeImportPipeline`, `AddRecipeFlow`, share-extension (`MunchShareExtension`) for Safari→Trove import; leads in `trove-near-launch-aug7`, `trove-share-import-diagnosis`.
- *Proves:* the core payoff (directions after import) + the resilience surface (importing shimmer / import-ready / dead-link fallback / multi-recipe disambiguation).
- *Known defect (dogfood, Aug 20):* import silently drops directions on **some** pages (Allrecipes "Poulet Roti" got 0 steps; "Tajine de Poulet" got full steps) — root cause: AI extractor edge fn dormant (no `ANTHROPIC_API_KEY`) → on-device AI returns nothing on sim → JSON-LD path doesn't reliably map `recipeInstructions`.

**D. Save + Collections.**
- *User goal:* bookmark and organize.
- *What happens:* tapping bookmark saves the Card to a private catch-all **"Saved"** immediately (IG-exact), then a manage sheet; **Collections** are the opt-in org + public-share unit (new-collection = cover + name sheet). **Like was removed** — Save is the sole social signal / flywheel.
- *Evidence:* `RecipeCollection` model, Saved/Collections UI; leads in `trove-social-redesign-aug2026`.

**E. Meal Plan + guided cooking.**
- *User goal:* plan the week and cook.
- *What happens:* per-day **"+"** opens a picker from **your Trove**; weekly progress rings; **Cook Now** → guided cooking (per-step smart+manual timers that fire local notifications, minimize-to-mini-bar, finish → rating/notes → cook history).
- *Evidence:* `CookingSession`/`CookingView`/`CookingMiniBar`, `MealPlanRecipePickerView`, `CookHistorySheet`; leads throughout `munch-current-state`.

**F. Grocery + commerce rails.**
- *User goal:* turn planned recipes into a shop.
- *What happens:* week-scoped **consolidated** shopping list (same ingredient across recipes merged), **To Buy / Stocked** states, bulk-select, user-added items, All-Items/By-Recipe toggle; retailer rails behind an adapter (**Kroger** OAuth cart-write verified end-to-end; **Amazon** affiliate handoff). Commerce lives in a separate private SPM package (`munch-commerce` / `MunchCommerce`).
- *Evidence:* `GroceryFulfillmentProviding`, `MunchMatching` (ingredient normalization/parsing), `spikes/kroger/`, `docs/retailer-rails.md`; leads in `trove-amazon-commerce`.
- *Decision:* **ship affiliate links for launch, do NOT build the in-app API cart** (Amazon Creators/PA-API gated on ongoing sales volume — flaky at zero users).

**G. Profile + social graph.**
- *User goal:* a public "kitchen" + follow other cooks.
- *What happens:* profile = **Saved | Posted** (Posted = your published Cards, public/private with padlock badge; Saved = saves + collections, 2-column grids); public profiles browsable; **Follow**; **People search**. The authenticated Profile tab uses the signed-in user's profile photo. People results should exclude the signed-in account, so @trove must not appear as its own first result when the capture is logged in as Trove. System accounts @trove, @mealdb, @chefsam, @samuelalake seed the graph.
- *Evidence:* `PublicCookProfileView`, `PostedRecipesRail`, `FollowButton`, `handles` table; leads in `trove-accounts-attribution-aug6`, `trove-near-launch-aug7`.

**H. Onboarding + auth.**
- *What happens:* sign-in required (guest gated off) — **email magic-link + Apple + Google** (all black-filled buttons, official multicolor Google "G"); taste-preference step (star = "interested"); notification priming; a scrollable 1-2-3 walkthrough. Optional in-app coach-marks (`GuidedFlow`) behind `MUNCH_SHOW_GUIDED`.
- *Evidence:* sign-in screen (#175), `EducationWalkthrough.swift`, `GuidedFlow.swift`, `AuthService.swift`; leads in `trove-social-redesign-aug2026`, `trove-near-launch-aug7`.

**Backend (current):** Supabase (Postgres + RLS + full-text search), **hand-rolled `SupabaseClient`** in `RecipeSync.swift` (no Supabase Swift SDK); auth via GoTrue REST (Apple native id_token, magic-link, Google id_token with "skip nonce"); **video-resolver** on Railway (yt-dlp + DataImpulse residential proxy + on-device Apple Intelligence transcription); **open-web recipe indexer** (services/recipe-indexer) seeding directions-withheld @trove cards; **import-recipe edge function** (Deno, model-agnostic, Haiku default) — *built + tested but needs deploy + `ANTHROPIC_API_KEY` to go live*.

**Which real product screens EXIST vs are MISSING (media):**
- **Exist as live UI** (verified on sim per memory): Discover feed + search, Card detail with attribution + "Add to my Trove", in-app browser import + Review sheet, Meal Plan + picker, guided cooking + mini-bar, Grocery consolidated list + Kroger/Amazon rails, Profile Saved|Posted, sign-in (Apple/magic-link/Google), onboarding walkthrough + taste step, IFR shelves (behind flag).
- **Full-height "true-to-scale" recipe captures** are producible via the `trove-fullheight-capture` skill (DEBUG `ImageRenderer`, `SIMCTL_CHILD_TROVE_CAPTURE=1`) — but those captures **live in scratchpad / were sent to Samuel, NOT committed to the repo**. See §8 media gaps.
- **`docs/images/*.jpg` are the OLD Munch build** (ResearchKit, Activity, Kroger, avocado era) — not current Trove.

---

## 5. Decisions (observation/constraint → choice → artifact → consequence → evidence)

1. **Name collision** (competitor "Munch — Your Social Recipe App") → **rename to Trove** + differentiate on commerce/AI moat → PR #124 (`Color.trove` #EA6A2E, display name, placeholder icon), domain usetrove.co, Supabase project "trove" → app is Trove in the store, still "Munch" in code/bundle id. *Evidence: commit 60ae6d28; `munch-direction-aug2026`, `trove-domain-usetrove-co`.*
2. **Can't republish directions (copyright)** → **Source/Card/Copy model**: Cards withhold steps, importing makes a private Copy → footer becomes "Add to my Trove", not "Cook Now"; catalog cards link out → `docs/PRODUCT_MODEL.md`, `RecipeAttributionView`, directionsSource enum. *Evidence: `trove-directions-data-model`, `trove-near-launch-aug7`.*
3. **Social engagement without a like button** → **Save is the only social action** (Like removed) → IG-exact save-then-manage sheet, Collections as share unit, "Saved by" facepile → Save doubles as the flywheel signal. *Evidence: `trove-social-redesign-aug2026`, `trove-launch-candidate-aug10`.*
4. **CloudKit couldn't do community + search well; sync bugs** → **all-in on Supabase** (Postgres/RLS/FTS) behind existing `RecipeSyncProviding` → provider swap, not rewrite; absorbs account/social bugs → Supabase is now the whole backbone (with an xcconfig `//`-truncation gotcha that once silently killed the entire backend). *Evidence: `munch-direction-aug2026`, `trove-launch-candidate-aug10`.*
5. **App Store rejection 2.5.1** (HealthKit/CareKit present without user-facing function) → **remove all CareKit/HealthKit** (`NoopCareTaskScheduler`, drop CareKitStore + SPM) → build 4, resubmitted → also finalizes the pivot away from the "behavior-change/health starter" identity. *Evidence: `trove-appstore-build4`, commit cc33c197.*
6. **ResearchKit was the only git-lfs/submodule dependency** → **remove it** (June 2026), native SwiftUI owns onboarding/capture/guided-cooking, keep a `#if canImport(ResearchKit)` seam → dependency-light buildable starter. *Evidence: README, `case-study-notes.md`, `munch-current-state`.*
7. **Amazon API cart is gated on ongoing sales volume + a deprecating API** → **ship plain affiliate links for launch, defer the in-app API cart** → not a launch blocker; revisit post-traffic. *Evidence: `trove-amazon-commerce` (definitive 2026-08-09).*
8. **Directions-private-by-default "manufactures an impression of privacy"** → a social suggestion/edit layer would puncture it → **defer the community-note / suggestion-vs-edit layer**; keep the design brief split into "rigid import (convergent)" + "exploratory social (divergent, unresolved)". *Evidence: `trove-social-suggestion-tension` (the explicitly UNRESOLVED core design question).*
9. **On-device AI returns nothing on sim / older devices** → **Haiku edge fn as server backbone + on-device as free fast-path** (recommended, pending Samuel) → import robustness still fragile until the edge fn is deployed. *Evidence: `trove-launch-candidate-aug10`, `trove-server-extractor`, `trove-directions-data-model`.*

---

## 6. Impact

**Shipped scope (verified-buildable, mostly not-yet-public):**
- Full social recipe app end-to-end: Discover + search, Source/Card/Copy import, Save/Collections, Meal Plan, guided cooking + timers, consolidated Grocery + Kroger/Amazon rails, Profiles + Follow + People search, Supabase auth (Apple/magic-link/Google), delete-account edge function, open-web indexer, video-resolver.
- **On TestFlight** as Munch 1.0(1) since **2026-06-15** (2 external testers). **App Store build 4 "Waiting for Review"** since **2026-08-20**.

**Quantitative evidence (real; public-safety-flagged where internal):**
- Content seeded: **789 MealDB recipes** (owned by @mealdb) + **~205 @trove open-web-indexed cards**; ~150+ directions-withheld catalog cards across 7 cuisines; MealDB enrichment ~493/789. *(These are internal seed counts — fine to characterize as "hundreds of recipes across cuisines"; confirm before citing exact numbers publicly.)*
- Engineering volume: **300+ GitHub PRs / issues** referenced across the arc; ~28 integration worktrees consolidated into the v19 launch candidate. *(Directional, from memory; verify against GitHub if a number is used.)*
- `REDACT:` Supabase project ref, system-account UUIDs, resolver URLs/keys, Apple Team IDs, MealDB key, GID client id, tester emails/phone — all present in memory, **none public-safe**.

**Qualitative evidence:**
- Live dogfooding drove the design (the Aug 5–6 "big design round," the directions-privacy discomfort, the "save vs Save to my recipes" wording clash Samuel flagged).
- Real tester signal: Jonathan Zhou's onboarding dead-end (P0 #117) reshaped the sign-in/welcome flow.

**Current state:** in App Store review; feature-complete per Samuel ("feature set essentially complete; remaining = copy pass + onboarding art + App Store"). Remaining true blockers are operational (his Apple ID/signing/secret steps) + the import-directions extraction fix + deploying the edge fn.

**Unverified / cannot-claim:**
- Not shipped to the public App Store yet (in review, not approved).
- No real-user retention/engagement metrics (pre-launch).
- On-device AI import + Apple/Google sign-in were **never fully device-verified by an agent** (sim can't do them) — Samuel's own device passes are the only evidence, some still pending.
- IFR Discover, guided coach-marks are behind DEBUG flags — not the default shipped experience.

---

## 7. Reflection (grounded in Samuel's notes — cite per lesson)

- **Assumption revised — "social layer = facepiles/who-saved-this":** Samuel corrected this as *missing the point*; the real, still-unresolved question is the community-note / suggestion vs canonical-edit model under directions-private-by-default. He noticed the app "manufactures an impression of privacy" that a social layer would puncture, and chose to *not* resolve it for v1 rather than ship something that breaks the promise. *Evidence: `trove-social-suggestion-tension`.*
- **Tradeoff learned — reviving architecture ≠ reviving the product:** the honest lesson written in `case-study-notes.md` is that "reviving the architecture and reviving the final UI are related but different milestones." The 2026 arc then went further and *changed the product itself* (health-starter → social recipe app), which the still-stale README hasn't caught up to — evidence that positioning outran documentation.
- **Change in judgment — health framing dropped:** CareKit/ResearchKit/HealthKit went from "the moat / Apple-featuring angle" to removed (partly forced by App Store 2.5.1, partly because the real value was the recipe→plan→grocery loop). *Evidence: `trove-appstore-build4`, README vs current.*
- **Commerce realism:** he wanted in-app Amazon carts; the research said the API is gated + deprecating, so he took the straight ship/no-ship answer — affiliate links now, API cart later. A "build the impressive thing" instinct traded for "ship the thing that works at zero users." *Evidence: `trove-amazon-commerce`.*
- **What he'd do differently (grounded):** the import-directions extraction should have been hardened earlier (it's the core payoff and still silently fails on some pages); and the AI strategy (on-device vs hosted Haiku) was left pending too long, keeping import fragile. *Evidence: `trove-directions-data-model`, `trove-server-extractor`.*
- **Process reflection:** Samuel built a "feedback-driven development table" workflow (issues-first, small PRs, adversarial review + drive-the-real-app before merge, GitHub as system of record) because *feedback kept evaporating between sessions*. *Evidence: `munch-direction-aug2026`, `working-autonomy`.*

---

## 8. Evidence inventory

| Artifact | Path | Claim it supports | Type | Dims/notes | Intended presentation | Missing variant |
|---|---|---|---|---|---|---|
| Owned Trove book cover | `projects/trove-evidence/trove-book-cover.mp4` | Trove's recipe journey and brand | MP4 + poster | 1520×1188, 5.43s, 30fps | case-study hero and first onboarding explainer | approved 2D direction; no replay control in hero |
| App icon (current) | `Munch/Assets.xcassets/AppIcon.appiconset/AppIcon.png` | Trove branding | PNG | **1024×1024** | icon chip only | **Placeholder `frying.pan` — do not use as hero** |
| Old Munch screens | `docs/images/*.jpg` (~40 files) | Historical Munch UI only | JPG | phone screenshots | "before" / history strip ONLY | These are **not** Trove; current-Trove equivalents are missing from repo |
| Retailer logos | `Munch/Assets.xcassets/RetailerKroger`, `RetailerAmazon` | commerce rails | PNG | small | grocery-rail detail | — |
| Product model doc | `docs/PRODUCT_MODEL.md` (product-model-doc branch) | Source/Card/Copy thesis | MD | text | pull-quote / diagram source | needs a real diagram render |
| Full-height recipe capture | `~/.claude/skills/trove-fullheight-capture` (skill) | true-to-scale Trove recipe screen | PNG (generated on demand) | full scroll height | device-framed hero | **captures live in scratchpad / sent to Samuel — none in repo; must re-capture** |
| App Store 6.9" marketing shots | scratchpad (AppKit compositor, Munch-era) | store framing | PNG | 1320×2868 | store-style hero row | **Munch-era headlines/branding — need Trove re-render** |
| Stale listing copy | `docs/app-store/listing-copy.md` | positioning (HISTORICAL) | MD | — | do NOT quote as current | current Trove listing copy is a `GAP:` |
| Git history | repo `git log` | rename + build timeline | — | — | timeline | — |

**Old Munch assets the brief flagged (confirmed status):**
- **Avocado icon** — real: the pre-rename Munch app icon was a custom avocado illustration (#74, June 2026), since replaced by the `frying.pan` placeholder. Historical only.
- **Avocado GIFs** — `GAP:` not found in the repo; may be Figma/marketing artifacts Samuel holds elsewhere. Confirm.
- **CareKit context** — the `CareKit-2-2.1-slider/` SPM folder still sits in the repo tree but the framework was **removed from the build**; historical, not current.
- **Award photo** — `GAP:` not found in repo or memory. Confirm what/where this is (possibly a student-prototype award).

---

## 9. Cover

- **Approved direction:** the owned 2D Trove book animation at
  `projects/trove-evidence/trove-book-cover.mp4`, on a muted orange ground.
- The book cover and page-title accent use Trove orange `#EA6A2E`; the pages
  stay white so the book remains legible on the muted orange ground. The final
  `DINNER INSPIRATION` title matches that accent.
- The case-study hero loops without a replay control. The same animation may be
  reused on onboarding's first explainer page.
- Keep the placeholder `frying.pan` app icon out of the hero.

---

## 10. Open items & Redactions

**Highest-value user-only questions:**
1. **Munch→Trove framing:** how much of the case study is the *name collision* story vs the deeper *health-starter → social-recipe-app pivot*? Both are real and evidenced; which is the spine? Should CareKit/ResearchKit even appear (as "removed"), or is that a distraction?
2. **What is the honest launch status to state?** "In App Store review (build 4, Waiting for Review)" is current as of Aug 20 2026 — confirm before writing "launched."
3. **The unresolved social layer** (suggestion vs edit under directions-privacy) — is that a *reflection/tension* to feature, or something to omit since it's undecided?
4. **Real app icon + hero media** — does a finished Trove icon / brand hero exist anywhere (Figma, Downloads)? Cover depends on it.
5. **Numbers:** OK to cite recipe counts (789 MealDB / ~205 @trove) and PR volume publicly, or keep them vague?
6. **Testers named publicly?** (Jonathan Zhou / Francis / David) — get consent or anonymize.

**Biggest media gaps (substantial):**
- **No committed current-Trove screenshots at all** — every `docs/images` shot is old Munch. All current-product visuals must be freshly captured (Discover, Card+attribution, import/Review, Meal Plan, guided cooking, Grocery, Profile Saved|Posted, sign-in).
- No real app icon; no branded hero; no diagram of the Source/Card/Copy model.
- Full-height captures and marketing composites exist only in scratchpad / sent to Samuel — not in the repo.

**Redactions (public portfolio — do NOT publish):**
- Supabase project ref (`pfkhrnbgxaamrugdlqxm`), all system-account UUIDs, resolver URLs + config keys, Anthropic/MealDB/Google client secrets & ids, Apple Team IDs (`R6A892D599` etc.), bundle id internal seams, tester emails/phone, DataImpulse proxy details.
- Internal seed counts / infra topology — characterize qualitatively unless Samuel approves specifics.

**Uncertain chronology / facts to confirm:**
- The read working tree (`codex-munch-revival-checkpoint`, Aug 5) is **behind** the real launch line (`integration-aug7-v19`/main, Aug 10–19). Confirm the exact `main` state and whether build 4 is now approved/live (it was "Waiting for Review" Aug 20).
- Exact original-prototype date/context (2022 student project) — README/git say 2022 but the "student prototype" specifics are `GAP:`.
- Whether IFR Discover shipped as default in the submitted build (it was behind a flag at last note).
