# Part 7 (Claude): pack-opening animations and a special legendary pull

Read `CLAUDE.md` and `docs/brief.md` ("Motion") first. Work in the React app on
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
