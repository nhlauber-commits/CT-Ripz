# `pack-rip.html`: hard technical rules

Read before editing `pack-rip.html`. These come from the owner's brief ([brief.md](brief.md));
the page breaks or is refused if they are not followed.

## The rules
- One file. No `<!doctype>`, `<html>`, `<head>` or `<body>` tags. Keep `<title>CT Ripz</title>`
  and the `claude:viewport-fit-sides` meta at the top.
- No build step, no frameworks, no npm. Plain HTML, CSS, JS.
- External resources: only Google Fonts stylesheets (`fonts.googleapis.com`). No external
  images, no other hosts, no fetch. Local images only from `public/art/`.
- Keep the single `<script>` block, with `<script>` and `</script>` each alone on its own line.
- Keep this order inside the script: data (`T`, `R`, `TIERS`), helpers, art code, then the comment
  line `/* ================= state ================= */`. Everything above that line must run
  without a DOM. `art(card)` stays a pure function returning a string that starts with `<svg`,
  with no `NaN` or `undefined`.
- Performance: Inventory shows up to 100 cards at once. Keep the average card SVG under 16,000
  bytes. Background textures are drawn once for the page, never per card.
- Works at 375px wide with no horizontal page scroll; side gutters written as
  `max(16px, env(safe-area-inset-*))`. Respect `prefers-reduced-motion`.
- Every colour comes from CSS custom properties on `:root`.
- Work in small, separate edits. Never rewrite the whole file in one edit.

## Textures in this file
Made in code only: SVG patterns and filters (`feTurbulence`, `feDisplacementMap`, `<pattern>`
guilloché from repeated paths), CSS gradients, inline data-URI SVG. Heavy filters go in ONE shared
`<defs>` and are referenced; never one filter per card.

## Before committing
`npm run check` must end with `CHECK OK` (it runs `check.sh`; never edit `check.sh`).
