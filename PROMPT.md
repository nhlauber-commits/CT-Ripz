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

---

# Round 2: personality, logo, animations, stats, body font

Who does what:

| Part | Who | Branch | Needs first |
|---|---|---|---|
| 4. Design assets and logo | Nick, with Higgsfield | `design/higgsfield-kit` | nothing (can start now) |
| 5. Body font | Claude | `design/body-font` | Part 1 merged |
| 6. Stats tab | Claude | `feature/stats` | Part 1 merged |
| 7. Pack and legendary animations | Claude (code), using Nick's images from Part 4 when they exist | `feature/pack-animations` | Part 2 merged |

Run each part in its own session and merge it before starting a part that needs it.
Parts 5 and 6 touch different files and can run at the same time.

---

## Part 4 (Nick, Higgsfield): design assets with personality, and a new logo

Run this on Nick's computer, where Higgsfield is set up. Read `CLAUDE.md`, `BRIEF.md` and
`design/TEXTURES.md` first.

**Goal:** give the app a look with personality: its own patterns, visuals and colour, so it
feels like a real collector's brand and not a template. Higgsfield makes the images; the app
code (Parts 2 and 7) uses them. Keep the BRIEF's "Vault" idea (engraving, certificates, foil,
navy and gold) as the base, and add personality on top.

**1. Mood board first.** Generate 3 short directions (4–6 images each) and save them to
`design/moodboard/<direction>/`. Each direction shows a background, a panel surface, a pattern,
a pack wrapper and the logo idea together. Suggested directions:
- *Night vault*: navy and gold, banknote guilloché, velvet, foil.
- *Card-shop sign*: navy and gold plus one warm accent (oxblood or burnt orange),
  hand-painted gold-leaf lettering, enamel badges, pinstripe.
- *Trophy room*: navy and gold plus one cool accent (deep teal or racing green), brass plaques,
  embossed leather, engraved trophy linework.

Show the owner the three and wait for a pick. The pick may add **at most two accent colours**
to the palette; write their hex values in `design/TEXTURES.md` under a new "Palette" heading and
update BRIEF.md "Colour" to match. Rarity colours still stay small accents only.

**2. Pattern and texture kit** in the chosen direction. Add a row to `design/TEXTURES.md` for
each file, then generate it. Keep the existing rows (linen, guilloché, hatch, foil, border,
velvet stage) and add:
- `pattern-signature.jpg`: one signature repeat pattern that is ours alone (for example a
  lattice of tiny card shapes and stars), tileable, 512×512, ≤80 KB.
- `pack-wrapper-foil.jpg`: crinkled foil pack wrapper, neutral gold so the theme colour can
  tint it, tileable, 512×512, ≤80 KB.
- `ornament-divider.png`: engraved horizontal divider with a centre medallion, transparent,
  1200×120, ≤60 KB.
- `legendary-burst.png`: radial gold engraving burst (fine rays and stars, like the back of a
  banknote) for the legendary reveal, transparent, 1200×1200, ≤150 KB.
- `legendary-sparks.png`: a few loose gold foil flecks on transparent, for a particle sprite,
  512×512, ≤60 KB.

Same rules as the rest of that file: no people, no text, no logos or brands, seamless where
tiled, flat lighting, JPEG or WebP unless transparency is needed.

**3. New logo: a legendary card.** The logo is the icon of one of our own legendary cards, shown
as a card being pulled from a pack (upright 5:7 card tilted about -8°, a second card edge behind
it, gold legendary frame, notched rarity tab top right, as in BRIEF.md "Logo").
- Use one legendary card's art in the art window. Default pick: **Solardrake** (`monsters_96`),
  because it is our own creature and carries no real brand. Avoid cards that are real trademarks
  (Bugatti, McLaren, Ferrari, NBA, Super Bowl, World Cup, Berkshire). Ask the owner if they
  want a different card.
- Make the art window a simplified, engraved-style version of that card's art so it still reads
  at 24px.
- Deliver `public/brand/logo-mark.png` (1024×1024, transparent), `public/brand/logo-mark-64.png`
  (64×64, checked by eye at small size) and `public/brand/logo-lockup.png` (the mark with room
  for the wordmark; the "CT Ripz" wordmark itself stays live text in Big Shoulders Inline
  Display). Under 150 KB each.
- The code version of the logo (`Logo.jsx`, `public/favicon.svg`) gets redrawn in Part 2 or 7 to
  match the chosen mark; the PNG is the reference and the large hero version.

**Done when:** the files are in the repo at the paths above and ticked in `design/TEXTURES.md`,
`npm test` and `npm run build` pass, and the owner has picked a direction and a logo card.
Commit with plain messages; never commit `.env`.

---

## Part 5 (Claude): a warmer, more human body font

Read `CLAUDE.md` and `BRIEF.md` first. Work in the React app on `design/body-font` from `main`.

**Goal:** body text (labels, buttons, descriptions, stats) should feel more human and friendly
than Libre Franklin. The display face (Big Shoulders Display) and the wordmark face
(Big Shoulders Inline Display) stay.

**First, compare, then wait for a pick.** There is no Google font called "New Shoulder"; the
closest is Big Shoulders Text. Show these on one static page (`design/body-font.html`), each
setting the same real UI text (a store shelf, a stats table, the opening overlay caption,
a 13px label) at 375px and desktop width:
1. **Big Shoulders Text**: the text-size cut of our display family. Condensed, so check that
   small text stays readable.
2. **Alegreya Sans**: humanist, warm, with calligraphic touches.
3. **Source Sans 3**: humanist, very readable at small sizes.
4. **Fira Sans**: humanist, slightly sporty.
5. **Libre Franklin**, the current one, for comparison.

Check the exact family names and weights on fonts.google.com. Recommend one, say why, and wait
for the owner's go-ahead.

**Then:** change the Google Fonts `<link>` in `index.html` and the body font token in one place,
load only the weights used (400, 500, 600 at most), and update the font lists in `BRIEF.md`
("Fonts" and "What makes it look AI-made") and `CLAUDE.md` so the rules match. Leave
`pack-rip.html` as it is unless the owner asks.

**Done when:** build and test pass, the GitHub run is green, every screen is checked at 375px and
desktop width (no text overflow or clipped buttons), and you list the font bytes added or removed.

---

## Part 6 (Claude): Stats tab

Read `CLAUDE.md` and `BRIEF.md` first. Work in the React app on `feature/stats` from `main`.

**Goal:** a fourth tab, **Stats**, next to Home, Store and Inventory, showing the player's
history in the Vault look.

**What it shows:**
- **Totals:** packs opened (by tier: Single / Triple / Mega), cards opened, unique cards found
  out of 800, completion per theme (owned/100), coins spent on packs, coins earned from selling.
- **Best pulls:** the top 10 cards ever pulled, ranked by rarity, then sell value, then newest.
  Show the card, its theme and when it was pulled.
- **Latest pulls:** the last 20 cards pulled, newest first, with pack tier and time.
- **Duplicates:** duplicates pulled, duplicates held now, duplicates sold, and the value of the
  duplicates held now (`dupeValue`).
- **By rarity:** how many of each rarity pulled, next to the expected share from the `R` odds
  (a small bar per rarity, rarity colour only as the accent).
- **Luck:** packs since the last Legendary, and the first Legendary ever pulled.

Each card shown opens the same card view as the binder. Numbers are set big in the display face,
like a price board. Avoid a row of equal boxes (see BRIEF.md "What makes it look AI-made").

**Saved data (must stay compatible):**
- Add one optional object `S.stats` to the `packrip-v2` save, for example
  `{v:1, packs:{single,triple,mega}, cards, byRarity:[5 numbers], dupesPulled, dupesSold,
  coinsSpent, coinsFromSales, best:[...], log:[...], sinceLegendary, firstLegendary}`.
  `best` holds at most 10 entries and `log` at most 50 (`{k: card key, t: time, p: tier}`),
  so the save stays small.
- Old saves have no `stats`: build it on load from what exists (`S.opened` for total packs,
  `S.owned` for unique cards and held duplicates, `S.recent` for the first latest pulls), and
  show "since stats began" next to numbers that cannot be rebuilt.
- `pack-rip.html` keeps unknown fields when it saves (it loads with `Object.assign`), so playing
  the old version must not wipe `stats`. Test it: save in React, play in `pack-rip.html`,
  reload React.
- "Start over" also clears `stats`, using the existing in-page confirmation.
- Stat updates live in the state hook (one place), called when buying a pack and selling
  duplicates, not in components.

**Also update** `BRIEF.md` and `CLAUDE.md` where they say three tabs, and extend `npm test` with
tests that an old save without `stats` loads and that `best` and `log` never grow past their limits.

**Done when:** build and test pass, the GitHub run is green, the tab is checked at 375px and
desktop width (keyboard order, 40px tap targets, visible focus, no horizontal scroll), with
screenshots. Tell me what you could not verify.

---

## Part 7 (Claude): pack-opening animations and a special legendary pull

Read `CLAUDE.md` and `BRIEF.md` ("Motion") first. Work in the React app on
`feature/pack-animations` from `main` after Part 2 is merged. Animations are code (CSS and small
JS; no new libraries without asking). Use Nick's images from Part 4 when they are in the repo
(`legendary-burst.png`, `legendary-sparks.png`, `pack-wrapper-foil.jpg`); until then use a
code-made stand-in so nothing waits.

**Every pack:**
1. The pack drops onto the velvet stage and settles with a small physical bounce.
2. The player tears it: drag or swipe across the top, or press Enter, Space or a "Tear open"
   button. The foil wrapper rips along a jagged line and the top flies off.
3. The cards slide up out of the pack as a face-down stack, then deal out into place.
4. Each card flips on tap or key press. "Reveal all" and "Skip" are always there.
5. Build-up: before a Rare or better flips, the card back shivers slightly and its edge picks up
   the rarity colour as a thin rim (no glow halos, per the brief).

Mega packs deal the guaranteed Rare-or-better card last.

**Legendary pull:**
- Before the flip: the stage dims, the card lifts and turns slowly, and a gold engraved line
  traces its frame.
- On the flip: `legendary-burst.png` (or a code-drawn ray burst) turns slowly behind the card, a
  short shower of foil flecks falls, a foil sweep crosses the card, and the screen shakes briefly.
  A gold plaque under the card reads "LEGENDARY" and the card name in the display face.
  Optional short vibration on phones (`navigator.vibrate`) where allowed.
- About 2.5 seconds in all, skippable with a tap or key press.
- A Legendary pulled for the first time also gets a "New to the Vault" stamp; if Part 6 is
  merged, Stats records it.
- Epic gets a smaller version (rim plus foil sweep, no burst) so Legendary stays special.

**Rules:** keep it smooth on a mid-range phone (animate only `transform` and `opacity`, no layout
animation, one particle canvas or a few sprites, not hundreds of DOM nodes). Under
`prefers-reduced-motion`: no shake, particles or rotation; cards fade in face up and the
legendary plaque still appears. Odds, pack contents and costs do not change: the animation only
shows the result `roll` already decided.

**Done when:** build and test pass, the GitHub run is green, each tier and a forced Legendary (a
dev-only switch, never in the production build) are checked in the browser at 375px and desktop
width, with screenshots or a short recording of each stage, plus a run with reduced motion on.
Tell me what you could not verify.
