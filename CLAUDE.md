# CT Ripz

A card-pack opening game: 8 themes of 100 cards, three pack tiers, a coin wallet,
Home / Store / Inventory tabs, and a flip-reveal opening overlay.

**Current priority: a unique, elaborate, textured visual identity ("The Vault").**
`BRIEF.md` is the owner's direction; read it before any visual work. A plain or blank-looking
result is a failed result, however tidy it is.

The project is moving from one HTML file to a React app. Until the port is done,
both exist:

| Path | What it is |
|---|---|
| `pack-rip.html` | The current, playable game. One self-contained file. Source of truth for game data and behaviour. |
| `src/` | The React version (Vite + Tailwind CSS v4): a port of `pack-rip.html` that plays the same (`data/`, `art/`, `state/`, `components/`, `styles/`). The redesign happens here. |
| `src/styles.css` | Tailwind import and the colour tokens (`@theme`): `bg-navy`, `text-gold`, `border-legendary` etc. Add new colours there, not as raw hex in components. Tailwind's reset (preflight) is left out so the ported game looks the same as `pack-rip.html`. |
| `src/styles/game.css` | The game's styles and `:root` tokens, copied from `pack-rip.html`. |
| `public/art/` | Card art (Higgsfield, made by Nick), plus `prelude.jpg`. Both versions load images from here. |
| `public/textures/` | Background and surface textures for the React version (Higgsfield, made by Nick). |
| `BRIEF.md` | The owner's design brief: art direction, fonts, logo, rules. |
| `PROMPT.md` | Prompts for the next rounds of work: React port, visual identity, usability. |
| `design/TEXTURES.md` | Texture requests for Nick to generate in Higgsfield. |
| `check.sh` | Structural check for `pack-rip.html`. Do not edit it. |
| `tools/run-check.mjs` | Runs `check.sh` on Windows/Linux too (Node stands in for Apple's `jsc`). |
| `tests/` | `npm test` (Node's built-in test runner). |
| `.github/workflows/ci.yml` | Runs check, test and build on every push and pull request. |
| `.mcp.json` | MCP servers for the project (Higgsfield, used on Nick's computer only). |
| `.env.example` | Which keys are needed. Copy to `.env`; never commit `.env`. |

## Commands
- `npm install` once, then `npm run dev` to run the React app, `npm run build` to build it.
- `npm test` checks that the `ART` list and the files in `public/art/` match, and that the game
  data, art code and CSS in `src/` still match `pack-rip.html` (until the redesign changes the CSS).
- `npm run check` must end with `CHECK OK` before any commit that touches `pack-rip.html`.
- With `npm run dev` running, the old game is also at `http://localhost:5173/pack-rip.html`.
  Opening `pack-rip.html` directly from the repo folder works too.
- GitHub runs `npm run check`, `npm test` and `npm run build` on every push and pull request.
  Do not merge a pull request with a red run.

## Rules that never change (both versions)
These come from `BRIEF.md` and apply to the React version too.
- 8 themes, 100 cards each, split 40 Common / 28 Uncommon / 18 Rare / 10 Epic / 4 Legendary.
  Keep every card name, theme, category key and label exactly as in `T`.
- Rarity odds and sell prices (`R`); pack tiers (`TIERS`): Single 1 card 100,
  Triple 3 cards 270, Mega 5 cards 425 with one Rare or better.
- Coins: start 1000, +1000 every 60 seconds only while under 5000 (`START`, `PAY`, `WAIT`, `CAP`).
- Saved state stays in localStorage under the same key (`packrip-v2`) and shape. New fields
  must be optional; old saves must still load.
- Monsters theme: original creatures only, no Pokémon names or likenesses.
  Islam theme: no depictions of people.
- Look: navy and gold, elaborate and textured, as described in BRIEF.md "Art direction".
  Fonts: Big Shoulders Display, Big Shoulders Inline Display (wordmark only), Libre Franklin.
  Logo: a legendary card icon. Rarity colours only as small accents. Every colour from CSS
  custom properties. Avoid everything in BRIEF.md "What makes it look AI-made".
- No `alert`, `confirm` or `prompt`. Every control works with keyboard and touch, has a
  visible focus state, and is at least 40px tall on phones. Works at 375px wide, no
  horizontal scroll. Respect `prefers-reduced-motion`.

## Rules for `pack-rip.html` only
BRIEF.md's "Hard technical rules" still apply to this file while it exists: one file,
no build step, no external hosts except Google Fonts, single `<script>` block, art code
above the `/* === state === */` line runs without a DOM, average card SVG under 16,000 bytes.
Textures here must be made in code (SVG patterns and filters, CSS gradients).
Make small separate edits; never rewrite the whole file at once.

## Rules for `src/` (React)
- Plain JavaScript + JSX with React and Vite. Ask before adding any other library.
- Port first, then redesign (see PROMPT.md). Game data (`T`, `R`, `TIERS`, economy constants)
  moves to `src/data/` unchanged; the card art functions (`art()`, `motif()`, `monster()`,
  `car()`, `sport()`, `M`, `PROP`) move to `src/art/` unchanged and stay pure functions.
- One component per file in `src/components/`. Keep state in one place
  (a hook or context) that reads and writes the same localStorage key as `pack-rip.html`.
- Texture images may be used from `public/textures/`, loaded as `textures/...`.

## Image paths (one convention)
- Every image lives in `public/art/` (card art) or `public/textures/` (React textures).
- `pack-rip.html` loads `public/art/<theme>_<index>.jpg` (relative to the repo root).
- React loads `art/<theme>_<index>.jpg` and `textures/<name>` (Vite serves `public/` at the root).

## Card art and textures (Higgsfield, on Nick's computer)
- Higgsfield runs on Nick's computer, not everyone's. Other contributors (and their agents)
  do not generate images. Write what is needed in `design/TEXTURES.md` (textures) or as a
  list of card keys and descriptions (card art), and Nick generates and commits the files.
  Never block on missing images: use the code-made fallback until the file arrives.
- Card art files are `public/art/<themeId>_<cardIndex>.jpg`. A new image only shows when its
  `"<themeId>:<cardIndex>"` key is also added to the `ART` list. `npm test` fails if the list
  and the folder disagree.
- The Honda Prelude card uses `public/art/prelude.jpg` as its whole face (the `IMG` override).
- Same rules as above for Monsters and Islam. Keep card images small (JPEG, about 50 KB each,
  300 KB at most).
- Nick: to turn Higgsfield on, add `"enabledMcpjsonServers": ["higgsfield"]` to your own
  `.claude/settings.local.json` (not committed), then sign in with `/mcp`.

## Git
- Work on a branch, not `main`. Small commits with plain messages.
- The GitHub repo is `nhlauber-commits/CT-Ripz`.
