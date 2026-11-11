# CT Ripz

A card-pack opening game: 8 themes of 100 cards, three pack tiers, a coin wallet,
Home / Store / Inventory / Stats tabs, and a flip-reveal opening overlay.

**Current priority: a vibrant, textured, high-contrast, very stimulating look ("Hyperprint").**
A plain, flat or quiet result is a failed result, however tidy it is.

The game is moving from one HTML file (`pack-rip.html`, playable, source of truth for game
data and behaviour, still in the old navy and gold look) to a React app in `src/` (playable,
and where the Hyperprint design lives).

## How context is organised
1. **This file**: always loaded. Only what applies to every task.
2. **Folder `CLAUDE.md` files**: load when you work in that folder.
   `src/` (React), `design/` (texture requests), `tests/` (tests and check).
3. **`docs/`**: reference. Read the one the task needs, or search it:
   - Any visual work: [`docs/brief.md`](docs/brief.md), the owner's design brief. Read it first.
   - Editing `pack-rip.html`: [`docs/pack-rip.md`](docs/pack-rip.md), hard technical rules.
   - Adding or using images (card art, textures, paths, sizes): [`docs/images.md`](docs/images.md).
   - A numbered task ("Part 1" to "Part 7"): [`docs/prompts/`](docs/prompts/README.md).

## Commands
- `npm install` once; `npm run dev` runs the React app (old game at `/pack-rip.html`).
- `npm run build`, `npm test`, `npm run check` (`check` must end with `CHECK OK` before any
  commit that touches `pack-rip.html`). GitHub runs all three; never merge a red run.

## Rules that never change (both versions)
- 8 themes, 100 cards each, split 40 Common / 28 Uncommon / 18 Rare / 10 Epic / 4 Legendary.
  Keep every card name, theme, category key and label exactly as in `T`.
- Odds and sell prices (`R`); pack tiers (`TIERS`): Single 1 card 100, Triple 3 cards 270,
  Mega 5 cards 425 with one Rare or better.
- Coins: start 1000, +1000 every 60 seconds only while under 5000 (`START`, `PAY`, `WAIT`, `CAP`).
- Save stays in localStorage under `packrip-v2`, same shape. New fields optional; old saves load.
  Player history is one optional `stats` object (`src/state/stats.js`).
- Monsters theme: original creatures only, no Pokémon names or likenesses.
  Islam theme: no depictions of people.
- Look (React app): ink and cream with hot pink, cyan, yellow, orange, lime and violet; halftone,
  sunburst rays, stripes and grain; sticker panels with thick outlines and hard offset shadows.
  Fonts: Dela Gothic One (titles), Anton (display), Bricolage Grotesque (body).
  Every colour from CSS custom properties.
- No `alert`, `confirm` or `prompt`. Every control works with keyboard and touch, has a
  visible focus state, and is at least 44px tall on phones. Works at 375px wide with no
  horizontal scroll. Respect `prefers-reduced-motion`.

## Images
Higgsfield (image generation) runs on Nick's computer only. Everyone else writes requests
(see `docs/images.md`) and uses a code-made fallback until the file arrives. Never block on images.

## Git
- Work on a branch, not `main`. Small commits with plain messages. Never commit `.env`.
- The GitHub repo is `nhlauber-commits/CT-Ripz`.
