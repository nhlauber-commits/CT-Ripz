# Pack Rip: rules for this job

`pack-rip.html` is a single-file web app published as a sandboxed page. `prelude.jpg` sits beside it.
You are redoing the **visual design of the interface and the card artwork**. The game itself stays as it is.

## Do not change (the game's parameters)
- 8 themes, 100 cards each, split 40 Common / 28 Uncommon / 18 Rare / 10 Epic / 4 Legendary. Keep every card name, theme, category key and label in `T` exactly.
- Rarity odds and sell prices in `R`; the three pack tiers in `TIERS` (Single 1 card 100, Triple 3 cards 270, Mega 5 cards 425 with one Rare or better).
- Coins: start 1000, +1000 automatically every 30 seconds (`START`, `PAY`, `WAIT`).
- Three tabs: Home, Store, Inventory. Pack opening overlay with flip reveal. Selling duplicates. Saved state in localStorage under the same key and shape.
- `IMG` override: the Honda Prelude card shows `prelude.jpg` as its whole face. Keep that working.
- The Monsters theme uses original creatures only. No Pokémon names, characters or likenesses.
- Islam theme: no depictions of people; keep it to places, objects, geometric and calligraphic art.

## Hard technical rules (the page breaks or is refused otherwise)
- One file. No `<!doctype>`, `<html>`, `<head>` or `<body>` tags. Keep `<title>Pack Rip</title>` and the `claude:viewport-fit-sides` meta at the top.
- No build step, no frameworks, no npm. Plain HTML, CSS, JS.
- External resources: only Google Fonts stylesheets (`fonts.googleapis.com`). No external images, no other hosts, no fetch. All art is inline SVG / CSS generated in code. Textures must be made in code (SVG filters such as feTurbulence, CSS gradients, inline data-URI SVG).
- No `alert/confirm/prompt`. Wrap localStorage in try/catch (already done).
- Keep the single `<script>` block with `<script>` and `</script>` each alone on their own line.
- Keep this order inside the script: data (`T`, `R`, `TIERS`), helpers, art code, then the comment line `/* ================= state ================= */`. Everything above that line must run without a DOM. `art(card)` must stay a pure function returning a string that starts with `<svg`, with no `NaN` or `undefined` in it.
- Performance: the Inventory shows up to 100 cards at once. Keep the average card SVG under 14,000 bytes. Put heavy filters (turbulence, lighting) in ONE shared `<defs>` in the page and reference them; never define a filter per card. Use feTurbulence sparingly.
- Must work at 375px wide with no horizontal page scroll; keep the 16px side gutters written with `max(16px, env(safe-area-inset-*))`. Respect `prefers-reduced-motion`.
- Every colour comes from CSS custom properties on `:root`; the page sets its own background. A single dark look is fine.

## What good looks like
- Card art: **each theme has its own art direction and its own backdrops**, and cards inside a theme vary too. No cosmic/nebula/starfield backdrop except where it truly fits one card. Think materials and places: turf, hardwood court, infield clay, stadium lights; circuit boards, blueprint grids, brushed aluminium; banknote guilloche, ticker tape, ledger paper, vault steel; asphalt, garage, sunset road, track kerbs; chrome, neon, vapour; zellige tile, arabesque, carved stone, parchment; lab glass, pharmacy shelves, botanical paper; monster habitats (cave, reef, forest, storm, glacier).
- Subjects more realistic and less cartoonish: real proportions, gradients, shading, highlights, material texture.
- Interface: visually appealing and **textured** (grain, paper, metal, felt, foil), with real typographic hierarchy. Not flat panels. Avoid generic looks: purple-blue gradient heroes, everything centred, identical rounded cards everywhere.
- Keep the card layout family: metal frame tinted by rarity, full-bleed art, name top-left, rarity tab notched top-right, rarity bottom-left.

## Check
Run `sh check.sh` from the repo root. It must end with `CHECK OK`. Do not edit `check.sh`.
