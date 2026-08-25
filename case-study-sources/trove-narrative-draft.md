# Trove, narrative draft (v1, for Samuel's review)

Director's draft in Samuel's voice, from `trove-source-package.md`. Decisions applied:
**current product leads, pivot history light** (your call); **honest status = "in App Store review,"
not launched**; AI-build process woven in as working style, never announced as "I use AI";
no invented metrics; redactions applied. Every visual is `[NEEDS CAPTURE]`, the repo has zero
current-Trove screenshots. Each section notes **[label]**, **[pattern]**, **[asset]**.

---

## Cover
**[pattern: cover]** · **[asset: `projects/trove-evidence/trove-book-cover.mp4`, owned 2D book animation on a muted Trove-orange ground; no replay control]**

Kicker: `TROVE · iOS · 2026`

**Title:** A private cookbook built from the recipes you find everywhere

**Lede:** Trove is an iOS app for pulling recipes out of Instagram, TikTok, YouTube, and blogs into one place you can actually cook from. You save a recipe as a card, import your own editable copy with the steps, plan it into your week, and turn the week into one grocery list.

---

## Metadata
**[pattern: metadata row]**

- **Role:** Founder, design and engineering (solo)
- **Timeline:** 2026 (in App Store review)
- **Team:** Solo
- **Skills:** Product design, iOS engineering, systems design

> `[CONFIRM]` Status line reads "in App Store review" (build 4, submitted Aug 2026). Do not write "launched" until it clears review.

---

## Project context
**[label: THE PROBLEM]** · **[pattern: claim heading + short lede; no diagram]**

**Heading:** Recipes live everywhere, and nowhere you can cook from

**Lede:** People find recipes across Instagram, TikTok, YouTube, and blogs. Those sources scatter, change, and disappear, and none of them let you plan or shop what you saved. Trove keeps a reference to the original and gives you a private, editable copy to cook from.

The Source / Card / Copy model remains useful source material, but it does not need a standalone diagram in the problem section. Let the import and attribution media explain it through real product behavior.

---

## Solution / the work
**[label: THE PRODUCT]** · Show the finished experience first, as the core loop. All screens `[NEEDS CAPTURE]` (device-framed, media-left).

### Discover, find recipes worth cooking
**[pattern: core-flow step, device frame]** · **[asset: `[NEEDS] Discover feed + People/Recipes search]`]**

Trove opens on a feed of recipe cards from other cooks and the open web, with search that spans recipes and people. A card carries the cover, the ingredients, and where it came from, but not the steps.

**Caption:** The Discover feed and search. Cards show enough to judge a recipe, not enough to republish it.

### Bring recipes in from wherever you find them
**[pattern: core-flow step with two-state carousel]** · **[asset: `[NEEDS] Safari/share-extension import and in-app Add-by-link import]`]**

From Safari, someone can share a recipe directly to Trove without leaving the browsing flow. Inside the app, they can also tap Add and paste a link. Both paths create a private, editable copy.

**Caption:** Two ways into the same private copy: share from another app, or paste a link inside Trove.
> Save from Discover belongs in the attribution/originality decision below, not this core-import carousel.

### Plan the week and cook
**[pattern: core-flow step, device frame]** · **[asset: `[NEEDS] Meal Plan + guided cooking with timers]`]**

You plan recipes from your Trove into the week, then cook from guided steps with timers that keep going when you leave the app.

**Caption:** Weekly plan and guided cooking.

### One consolidated grocery list
**[pattern: core-flow step, device frame]** · **[asset: `[NEEDS] Grocery list with merged ingredients + retailer handoff]`]**

The week becomes one shopping list, with the same ingredient across recipes merged into a single line. Someone can move an item from **To buy** to **Stocked** as their pantry changes, then hand the remaining list to a retailer.

**Caption:** A week of recipes as one consolidated list, with retailer handoff. `[CONFIRM: Kroger cart-write is verified end-to-end; Amazon is an affiliate handoff for launch.]`

---

## Key design moments
**[label: DESIGN DECISIONS]** · **[pattern: image-text rows / decision callouts]**

### Build for two kinds of constraints
The first constraint comes from recipe publishers and bloggers. Their sites depend on traffic, while users still need a clear path back to the original page or video when it helps them cook. The second comes from grocery commerce: retailer capabilities vary by partner, traction, and location.

### Keep attribution and originality intact
Trove keeps the publisher and original source visible wherever a recipe appears, so users can find the page or video again when they need it. When someone saves a recipe already in the community, Trove sends them to the publisher before creating the private copy. The source receives the visit, and the user imports the directions from the original.

**[pattern: two-state carousel with stepped progress]** · **[asset: `[NEEDS] attribution UI still with left-side callout; Save-from-Discover recording]`]**

### Save is the only social action
There is no like. Saving a recipe is the whole social signal: it bookmarks the card for you and feeds what other people discover. One action, doing both jobs, keeps the social layer honest and simple.

### Use commerce technology that works now
Retail integrations depend on traction and geography. Trove uses Kroger where direct cart support is available; otherwise Amazon stays available as an affiliate handoff.

### How might we make finding recipes feel social?
Recipes usually reach people through other people. V1 makes that visible with profiles, a People directory, following, and saves that connect each recipe to who shared it. Community suggestions remain a future direction once the line between shared input and a private copy is clear.

**[pattern: one device recording]** · **[asset: `[NEEDS] own Profile -> Discover -> People See all -> MealDB -> Follow]`]**

The authenticated Profile tab uses the signed-in user's photo. If the capture account is Trove, Trove must be filtered out of its own People results.

### Build for different tastes
Early feedback showed that people struggled to identify cuisines they wanted. I grouped recipes into sections, then let people star categories as preferences that shape what appears in their feed.

**[pattern: two-column before/after media]** · **[assets: `[NEEDS] older list-style branch; current Mediterranean See all -> category landing -> Save preference]`]**

> `[REFLECTION candidate, CONFIRM]` The most interesting unresolved decision: because your copy is private by default, the app "manufactures an impression of privacy" that a social suggestion or shared-edit layer would puncture. I chose not to resolve that for v1 rather than ship something that breaks the promise. Strong, candid, and true to the notes. Feature it in Reflection, or omit if you would rather not show an open question.

---

## Impact / where it stands
**[label: WHERE IT STANDS]** · **[pattern: outcome grid, honest, no invented metrics]**

- **Feature-complete and building end to end:** discovery, import, save and collections, meal plan, guided cooking, consolidated grocery with retailer rails, profiles and follow, and sign-in.
- **On TestFlight since mid-2026; in App Store review** as of August 2026 (build 4, after clearing a health-data rejection by removing the unused health frameworks).
- Seeded with hundreds of recipes across cuisines. `[CONFIRM: OK to cite 789 + ~205 exactly, or keep it "hundreds"?]`

> Honest ceiling: not public yet, so no user or retention numbers. Written to say exactly that.

---

## Reflection
**[label: REFLECTION]** · **[pattern: 2-col lesson + gloss]**

- **Reviving the architecture is not reviving the product.** Getting an old codebase to build again is a different milestone from deciding what it should be. Trove started as a 2022 project and only became itself in 2026 when the product, not just the code, changed.
- **The framing followed the value, not the plan.** It began as a health and behavior-change app. The part people actually used was the recipe-to-plan-to-grocery loop, so the health framing came out, forced partly by review and partly by honesty about where the value was.
- **Ship the thing that works now.** I traded the impressive in-app cart for the affiliate handoff that works at zero users, and kept the ambitious version for when there is traffic.
- **Harden the payoff first.** Importing steps is the whole point, and it still fails quietly on some pages. The lesson is to make the core payoff reliable before building around it.

> `[AI-build thread, woven not announced]` Where the process shows: "I ran an issues-first workflow and drove the real app on device before merging anything, because feedback kept evaporating between sessions." True, craft-level, and it never says "I used AI." The generalized version of how you work belongs on About or the homepage per your call.

---

## Open items rolled up (for your review)
1. Confirm status line: "in App Store review" (or has build 4 cleared since Aug 20?).
2. OK to cite exact recipe counts (789 / ~205) and PR volume, or keep vague?
3. Feature the unresolved social-suggestion tension in Reflection, or omit?
4. Name testers (Jonathan / Francis / David) with consent, or anonymize?
5. Real Trove app icon / hero, does one exist, or do we capture a full-height recipe screen for the cover?
6. Media: everything needs fresh capture, I can script the full set (Discover, Card+import, Meal Plan, cooking, Grocery, Profile, sign-in) via the `trove-fullheight-capture` skill + the iOS Simulator when you're ready.
