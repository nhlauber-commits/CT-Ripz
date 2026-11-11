# src/: the React app

Vite + React + Tailwind CSS v4, plain JavaScript and JSX. The "Hyperprint" design lives
here; read [`docs/brief.md`](../docs/brief.md) before any visual work.

## Rules
- Ask before adding any library beyond React, Vite and Tailwind.
- Port first, then redesign (see [`docs/prompts/`](../docs/prompts/README.md), Part 1 then Part 2).
- One component per file in `src/components/`.
- Stats logic is pure functions in `src/state/stats.js`, called from the state module, never from components.
- State lives in one place (a hook or context in `src/state/`) that reads and writes the same
  localStorage key and shape as `pack-rip.html` (`packrip-v2`), wrapped in try/catch.
- Colours: tokens in `src/styles.css` (`@theme`: `bg-ink`, `text-yellow`, `border-legendary` …).
  Add new colours there, never as raw hex in components.
- Heavy SVG filters are defined once (in `App`) and shared, never per card.

## Where ported code goes
| From `pack-rip.html` | To | How |
|---|---|---|
| `T`, `R`, `TIERS`, `START`/`PAY`/`WAIT`/`CAP` | `src/data/` | copied unchanged |
| `hash`, `rng`, `M`, `PROP`, `sport`, `monster`, `car`, `motif`, `art`, `emblem` | `src/art/` | copied unchanged, pure functions; render `art(card)` with `dangerouslySetInnerHTML` |
| `KEY`, `IMG`, `ART`, `S`, `save`, `roll`, `dupeValue`, coin timer | `src/state/` | one hook or context |
| rendering, opening packs | `src/components/` | `TopBar`, `Wallet`, `Home`, `Store`, `PackOffer`, `Inventory`, `Binder`, `Stats`, `Card`, `OpeningOverlay` |

## Images
Load card art as `art/<theme>_<index>.jpg` and textures as `textures/<name>` (Vite serves
`public/` at the root). Until a texture file exists, use a code-made version.
Naming, sizes and who makes them: [`docs/images.md`](../docs/images.md).

## Before calling it done
`npm run build` and `npm test` pass. Look at it in the browser at 375px and desktop width,
and say what you could not check.
