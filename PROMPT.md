# Prompt: port CT Ripz to React, give it its visual identity, then polish usability

Paste one part at a time into Claude Code (or Gemini CLI) from the repo root.
Run each part in its own session, in order, and merge each before starting the next.
The visual identity (Part 2) is the main goal; Part 1 sets it up, Part 3 polishes it.

---

## Part 1: port `pack-rip.html` to React, with no visible changes

Read `CLAUDE.md` and `BRIEF.md` first. They are the rules for this job.

**Goal:** the React app in `src/` plays exactly like `pack-rip.html`: same cards, art, odds,
prices, coins, tabs, opening overlay and saved progress. A player should not be able to tell
which version they are using. Do not change the design or add features in this part. The
redesign happens in Part 2, in React only, so it is done once.

**How to work:**
1. Create a branch `port/react` from `main`.
2. Move code from the `<script>` in `pack-rip.html` into modules, section by section,
   following the comment headers in that script:
   - `data` (`R`, `TIERS`, `START`/`PAY`/`WAIT`/`CAP`, `T`) → `src/data/`, copied unchanged.
   - `helpers` and the art code (`hash`, `rng`, `M`, `PROP`, `sport`, `monster`, `car`,
     `motif`, `art`, `emblem`) → `src/art/`, copied unchanged. `art(card)` stays a pure
     function returning an SVG string; render it with `dangerouslySetInnerHTML` inside
     the card component.
   - `state` (`KEY`, `IMG`, `ART`, `S`, `save`, `roll`, `dupeValue`, coin timer) →
     `src/state/` as one hook or context. Same localStorage key and shape, wrapped in
     try/catch, so a save made in `pack-rip.html` loads in the React app.
   - `rendering` and `opening packs` → components in `src/components/`: `TopBar`, `Wallet`,
     `Home`, `Store`, `PackOffer`, `Inventory`, `Binder`, `Card`, `OpeningOverlay`.
   - The CSS and its `:root` tokens → `src/styles/`, unchanged. Render the shared SVG
     `<defs>` (filters) once in `App`, not per card.
3. Images load as `art/<theme>_<index>.jpg` and `art/prelude.jpg` (Vite serves `public/` at the root).
4. Commit after each section with a plain message. Leave `pack-rip.html` and `check.sh` as they are.

**Done when:**
- `npm run build`, `npm test` and `npm run check` pass (GitHub runs them too; the run must be green).
- `npm test` is extended (`node --test`, no new libraries) to confirm: 8 themes, 100 cards each,
  split 40/28/18/10/4, no duplicate names, every `art()` output starts with `<svg` and has no
  `NaN` or `undefined`, and the data in `src/data/` matches `pack-rip.html`.
- Side by side in the browser at 375px and desktop width, both versions look and behave the same:
  buying each pack tier, the flip reveal, selling duplicates, the free-coin timer, and reloading
  keeps progress.
- Tell me what you could not verify.

---

## Part 2: visual identity ("The Vault")

Read `CLAUDE.md` and `BRIEF.md` first, especially "The job", "Art direction", "Fonts", "Logo"
and "What makes it look AI-made". Work on a branch `design/vault` from `main` after Part 1 is merged.
Work in the React app. Leave `pack-rip.html` as it is unless I ask.

**Goal:** a unique, elaborate, textured interface. The background is never blank. It should
look like an engraved certificate and a foil-stamped card box, not a template. Every game
parameter and the card art stay exactly as they are.

**First, design before building.** Show me, before you change the app:
1. A one-page design sheet as a static page (`design/sheet.html`) showing: the colour tokens,
   the two fonts at each size step, the background layers on their own and combined, a panel,
   primary and secondary buttons (normal, focus and disabled), and the legendary-card logo at
   24px, 48px and 128px.
2. A short note on how each screen (Home, Store, Inventory, opening overlay) will use these pieces
   differently, so the screens don't all look alike.
Wait for my go-ahead.

**Then build, one commit per piece:**
1. Fonts: Big Shoulders Display, Big Shoulders Inline Display (wordmark only) and Libre Franklin,
   replacing Fraunces and Plus Jakarta Sans in `index.html` and the tokens.
2. Background scene: linen texture, guilloché, engraved hatching, vignette, framed content area.
   Code-made first (SVG patterns and filters); swap in `public/textures/` images from Nick when
   they are in the repo (see `design/TEXTURES.md`).
3. Logo: the legendary-card icon as a component (`Logo.jsx`) with small and large detail levels,
   in the top bar and the Home hero, plus `public/favicon.svg`.
4. Surfaces and controls: certificate-style double-rule panels, foil buttons, shelf and binder
   treatments, per the brief.
5. Opening overlay: a stage that matches the vault (dark velvet or engraved backdrop, foil sweep on reveal).

**Rules:** colours only from CSS custom properties; heavy filters defined once and shared; no
new libraries without asking; `prefers-reduced-motion` turns off all motion; still 375px wide
with no horizontal scroll, 40px tap targets, visible focus.

**Done when:** build, test and check pass and the GitHub run is green. Each screen is checked
in the browser at 375px and desktop width, with screenshots before and after. Page weight stays
reasonable (list the texture and font bytes). Tell me what you could not verify.

---

## Part 3: usability pass

Read `CLAUDE.md` and `BRIEF.md` first. Work on a branch `ux/pass-1` from `main` after Part 2 is merged.
Keep the Part 2 look and every game parameter.

**First, look before changing anything.** Run the app, play it for a few minutes at 375px and at
desktop width, and write a short list of the 5–8 biggest friction points you find (with where they
happen). Show me that list and wait for my go-ahead before building.

**Areas to consider** (only fix what is actually a problem):
- **Opening packs:** can the player reveal all cards at once, skip the animation, and open
  another pack of the same kind without going back to the Store?
- **Inventory:** filter by theme and rarity, show owned/total per theme, and make duplicates
  easy to spot and sell in one step, with an in-page confirmation (never `confirm()`).
- **Coins:** make it clear when the next free 1,000 coins arrive and why the timer stops at 5,000.
- **Feedback:** short in-page messages for "not enough coins", "sold 3 duplicates for 120", etc.
- **New pulls:** mark cards seen for the first time; let the player jump from Home to a card in the binder.
- **Accessibility:** keyboard order, visible focus, 40px tap targets on phones, labels for screen readers,
  `prefers-reduced-motion` honoured in the overlay.

**Rules:** small separate commits, one improvement each, styled in the Part 2 look. Any new saved
field is optional so old saves still load. No new libraries without asking.

**Done when:** `npm run build` and `npm test` pass and the GitHub run is green. Each change is
checked in the browser at 375px and desktop width. Give me a before/after list of what changed and
what you could not verify.
