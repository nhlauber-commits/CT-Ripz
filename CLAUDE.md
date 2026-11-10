# CT Ripz

A card-pack opening game: 8 themes of 100 cards, three pack tiers, a coin wallet,
Home / Store / Inventory tabs, and a flip-reveal opening overlay.

The project is moving from one HTML file to a React app. Until the port is done,
both exist:

| Path | What it is |
|---|---|
| `pack-rip.html` | The current, playable game. One self-contained file. Source of truth for game data and behaviour. |
| `src/` | The React version (Vite). Only a shell so far; game code gets ported here as components. |
| `public/art/` | Card art made in Higgsfield, plus `prelude.jpg`. Both versions load images from here. |
| `BRIEF.md` | The owner's design brief for the current page. |
| `PROMPT.md` | The prompt for the next round of work (the React port and usability pass). |
| `check.sh` | Structural check for `pack-rip.html`. Do not edit it. |
| `tools/run-check.mjs` | Runs `check.sh` on Windows/Linux too (Node stands in for Apple's `jsc`). |
| `.mcp.json` | MCP servers for the project (Higgsfield). |
| `.env.example` | Which keys are needed. Copy to `.env`; never commit `.env`. |

## Commands
- `npm install` once, then `npm run dev` to run the React app, `npm run build` to build it.
- `npm run check` must end with `CHECK OK` before any commit that touches `pack-rip.html`.
- Open `pack-rip.html` directly in a browser to play the current game.

## Rules that never change (both versions)
These come from `BRIEF.md` and apply to the React version too.
- 8 themes, 100 cards each, split 40 Common / 28 Uncommon / 18 Rare / 10 Epic / 4 Legendary.
  Keep every card name, theme, category key and label exactly as in `T`.
- Rarity odds and sell prices (`R`); pack tiers (`TIERS`): Single 1 card 100,
  Triple 3 cards 270, Mega 5 cards 425 with one Rare or better.
- Coins: start 1000, +1000 every 60 seconds only while under 5000 (`START`, `PAY`, `WAIT`, `CAP`).
- Saved state stays in localStorage under the same key and shape. New fields must be
  optional; old saves must still load.
- Monsters theme: original creatures only, no Pokémon names or likenesses.
  Islam theme: no depictions of people.
- Look: navy and gold, as described in BRIEF.md "What good looks like". Rarity colours only
  as small accents. Every colour from CSS custom properties.
- No `alert`, `confirm` or `prompt`. Every control works with keyboard and touch, has a
  visible focus state, and is at least 40px tall on phones. Works at 375px wide, no
  horizontal scroll. Respect `prefers-reduced-motion`.

## Rules for `pack-rip.html` only
BRIEF.md's "Hard technical rules" still apply to this file while it exists: one file,
no build step, no external hosts except Google Fonts, single `<script>` block, art code
above the `/* === state === */` line runs without a DOM, average card SVG under 16,000 bytes.
Make small separate edits; never rewrite the whole file at once.

## Rules for `src/` (React)
- Plain JavaScript + JSX with React and Vite. Ask before adding any other library.
- Port, do not redesign: game data (`T`, `R`, `TIERS`, economy constants) moves to
  `src/data/` unchanged; the card art functions (`art()`, `motif()`, `monster()`, `car()`,
  `sport()`, `M`, `PROP`) move to `src/art/` unchanged and stay pure functions.
- One component per file in `src/components/`. Keep state in one place
  (a hook or context) that reads and writes the same localStorage key as `pack-rip.html`.
- Load card images from `art/<theme>_<index>.jpg` (served from `public/art/`).

## Card art (Higgsfield)
- Files are `public/art/<themeId>_<cardIndex>.jpg`. A new image only shows when its
  `"<themeId>:<cardIndex>"` key is also added to the `ART` list.
- The Honda Prelude card uses `public/art/prelude.jpg` as its whole face (the `IMG` override).
- Use the Higgsfield MCP server to generate art. Same rules as above for Monsters and Islam.
  Keep images small (JPEG, about 50 KB each).

## Git
- Work on a branch, not `main`. Small commits with plain messages.
- The GitHub repo is `nhlauber-commits/CT-Ripz`.
