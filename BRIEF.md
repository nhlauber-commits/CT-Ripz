# CT Ripz: rules for this job

`pack-rip.html` is a single-file web app published as a sandboxed page. `prelude.jpg` sits beside it.

**Edit `app.html`, not `pack-rip.html`.** `app.html` is the source. `npm run build` compiles Tailwind into it and writes `pack-rip.html`, which is the file that gets published. Any change made directly to `pack-rip.html` is overwritten on the next build.
You are redoing the **visual design of the interface only**. The game and the card artwork stay as they are.

## Scope for this job: make the app easier and more pleasant to use
- The navy and gold look is approved. Keep it. This job is about usability, not a new visual style.
- You MAY change the interface script (rendering, event handlers, new small features) and add new elements, ids and classes.
- Do NOT change: the card data in `T`; the art code (`art()`, `motif()`, `monster()`, `car()`, `sport()`, the `M` and `PROP` drawing tables); the `ART` and `IMG` lists; anything in `art/`; the economy constants (`R`, `TIERS`, `START`, `PAY`, `WAIT`, `CAP`); the localStorage key. You may add optional fields to the saved state, but old saves must still load.
- Never use `alert`, `confirm` or `prompt`. Build confirmations and messages into the page.
- Every new control must work with keyboard and touch, have a visible focus state, and be at least 40px tall on phones.
- Work in small, separate edits. Do not rewrite the whole file in one edit.

## Do not change (the game's parameters)
- 8 themes, 100 cards each, split 40 Common / 28 Uncommon / 18 Rare / 10 Epic / 4 Legendary. Keep every card name, theme, category key and label in `T` exactly.
- Rarity odds and sell prices in `R`; the three pack tiers in `TIERS` (Single 1 card 100, Triple 3 cards 270, Mega 5 cards 425 with one Rare or better).
- Coins: start 1000, +1000 automatically every 60 seconds, but only while the balance is under 5000 (`START`, `PAY`, `WAIT`, `CAP`).
- Three tabs: Home, Store, Inventory. Pack opening overlay with flip reveal. Selling duplicates. Saved state in localStorage under the same key and shape.
- `IMG` override: the Honda Prelude card shows `prelude.jpg` as its whole face. Keep that working.
- The Monsters theme uses original creatures only. No Pokémon names, characters or likenesses.
- Islam theme: no depictions of people; keep it to places, objects, geometric and calligraphic art.

## Hard technical rules (the page breaks or is refused otherwise)
- The built `pack-rip.html` must be one file. No `<!doctype>`, `<html>`, `<head>` or `<body>` tags. Keep `<title>CT Ripz</title>` and the `claude:viewport-fit-sides` meta at the top.
- Build: Vite + Tailwind CSS v4 (`npm install` once, then `npm run dev` to work on it and `npm run build` to produce `pack-rip.html`). No UI frameworks (no React, Vue etc.): plain HTML and JS plus Tailwind classes.
- Tailwind's colours and fonts point at the `:root` variables in `app.html` (`bg-navy`, `text-gold`, `border-rare`, `font-display` and so on). Add new colours to `:root` first, then map them in `src/tailwind.css`. Tailwind's reset (Preflight) is deliberately off; the page keeps its own base styles.
- External resources: only Google Fonts stylesheets (`fonts.googleapis.com`). No external images, no other hosts, no fetch. All art is inline SVG / CSS generated in code. Textures must be made in code (SVG filters such as feTurbulence, CSS gradients, inline data-URI SVG).
- No `alert/confirm/prompt`. Wrap localStorage in try/catch (already done).
- Keep the single `<script>` block with `<script>` and `</script>` each alone on their own line.
- Keep this order inside the script: data (`T`, `R`, `TIERS`), helpers, art code, then the comment line `/* ================= state ================= */`. Everything above that line must run without a DOM. `art(card)` must stay a pure function returning a string that starts with `<svg`, with no `NaN` or `undefined` in it.
- Performance: the Inventory shows up to 100 cards at once. Keep the average card SVG under 16,000 bytes. Put heavy filters (turbulence, lighting) in ONE shared `<defs>` in the page and reference them; never define a filter per card. Use feTurbulence sparingly.
- Must work at 375px wide with no horizontal page scroll; keep the 16px side gutters written with `max(16px, env(safe-area-inset-*))`. Respect `prefers-reduced-motion`.
- Every colour comes from CSS custom properties on `:root`; the page sets its own background. A single dark look is fine.

## What good looks like (owner feedback on the current design: it reads as AI-generated; fix that)
- The app is called **CT Ripz**. Keep the `<h1>CT <span>Ripz</span></h1>` wording.
- **Two main colours only: a dark navy blue and gold.** Navy for the page and surfaces (two or three close navy tones for depth), gold for the brand, key actions, rules and highlights. One off-white for text. Nothing else carries the interface.
- The five rarity colours stay because they carry meaning, but only as small accents (a dot, a thin edge, a label). Theme colours may appear only on the pack wrappers and as a thin accent on theme tiles.
- Remove the things that make it look machine-made: glows and neon halos around everything, decorative rivets and corner dots, gradients on every surface, the faux tagline above the title, pill shapes everywhere, uniform rounded tiles with identical drop shadows, monospace labels used as decoration, stacked inner and outer shadows.
- Aim for the confidence of a printed collector catalogue or a good sports-card shop sign: flat navy fields, fine gold linework and rules, strong typography with a clear size hierarchy, generous spacing, sharp or only slightly rounded corners, very few effects. One distinctive display face used with restraint plus one quiet text face (Google Fonts only).
- Texture is welcome but subtle and consistent: one paper or linen grain across navy surfaces, made in CSS or inline SVG. No brushed-metal panels.
- Buttons: solid gold with navy text for the primary action; outlined gold for secondary. Disabled states clearly muted.
- Keep the card layout family: metal frame tinted by rarity, full-bleed art, name top-left, rarity tab notched top-right, rarity bottom-left. Do not restyle the cards beyond what is needed to sit well on navy.

## Check
Run `npm run build`, then `npm run check` (works on any computer) or `sh check.sh` (Mac only) from the repo root. Both must end with `CHECK OK`. Do not edit `check.sh`.
