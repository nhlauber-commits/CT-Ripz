# CT Ripz: design brief

CT Ripz is a card-pack opening game. This brief is the owner's direction for how it looks
and the rules any agent working on it must follow. It applies to `pack-rip.html` and to the
React version in `src/`. Where the two differ, the section says so.

## The job: a unique, elaborate visual identity
The current page is navy and gold but reads as a plain, empty dark page. The owner wants the
opposite: **a rich, textured, crafted interface that nobody would mistake for an AI template.**
Every screen should feel like a physical object: an engraved certificate, a foil-stamped card
box, a collector's display case. Visual design is the priority of this job. Usability must not
get worse, but the main thing being judged is the look.

"Elaborate" means **detail made with intent** (engraving, linework, ornament, layered paper and
foil), not more effects. Glow, blur and gradients are not detail.

## Art direction: "The Vault"
A private card vault at night: banknote engraving, stock-certificate borders, a sports-card
shop's gold-leaf sign, all on deep navy.

**Background (never blank).** The page background is a composed scene in layers, back to front:
1. Deep navy base with a woven linen or laid-paper texture you can actually see (not a 3% grain).
2. Large guilloché pattern (the fine interlaced spirograph lines on banknotes) in a slightly lighter
   navy, centred behind the Home hero and repeated faintly on Store and Inventory.
3. Fine engraved hatching or crosshatch toward the edges, plus a soft vignette so the centre reads.
4. Gold hairlines framing the main content area, with engraved corner ornaments (crafted
   flourishes, not dots or rivets).

**Surfaces.** Panels are like inset paper plates: a slightly raised navy tone, a fine gold rule
inside a darker outer rule (a double border, like a certificate), and the same texture as
the page. Vary the panels by purpose: the hero is large and ornamented, Store shelves read like
a shop shelf with a gold edge strip, Inventory binders read like album pages with a stitched or
ruled spine. Do not give every box the same rounded corners and shadow.

**Gold.** Gold is foil, not flat yellow: use a short metallic sweep (2–3 stops of the gold tokens),
an engraved or embossed edge, and a texture where it covers a large area (buttons, wordmark,
dividers). Gold carries the brand, primary actions, rules and ornaments.

**Typography.** A strong, condensed American display face for the wordmark, headings, prices
and numbers; a sturdy grotesque for body text. Large, confident size steps. Numbers (coins, counts,
prices) are set big in the display face, like a price board. See "Fonts" below.

**Motion.** Few moments, all physical: the pack wrapper tears, the card flips, the foil catches
the light as the pointer moves. Nothing pulses or floats for no reason. All of it turns off under
`prefers-reduced-motion`.

**Colour.** Navy (three or four close tones) and gold (three tones) carry the whole interface,
plus one off-white for text. The five rarity colours appear only as small accents (a dot, an edge,
a label). Theme colours appear only on pack wrappers and as a thin accent on theme tiles.

## Fonts (Google Fonts only)
- **Display: Big Shoulders Display** (weights 700–900), a condensed American Gothic designed by
  Patric King for the City of Chicago's design system. It suits sign-style shop lettering and
  sports type. Use it for the wordmark, headings, pack names, prices and counts.
- **Wordmark accent: Big Shoulders Inline Display**, from the same family, used **only** for the "CT Ripz"
  wordmark and the Home hero title. Nowhere else.
- **Body: Libre Franklin** (400, 500, 600), a revival of Franklin Gothic, the classic American
  newspaper and sports-page face. Use it for all body text, labels and buttons.
- Remove Fraunces and Plus Jakarta Sans. Check the exact family names and weights on
  fonts.google.com when writing the `<link>`. Google sometimes merges families into one
  variable font; if so, use the merged family with the same weights.

## Logo: a legendary card
Replace the current square "C" mark with **an icon of a legendary card**:
- An upright card, about 5:7, slightly tilted (about -8°), with a second card edge peeking out
  behind it, as if pulled from a pack.
- Frame in gold foil using the legendary frame colours (`--gold-hi`, `--legendary`, `--flame`), with
  the notched rarity tab at the top right, the same shape as on the real cards.
- In the art window: a simple crest or star, engraved in gold on navy. A small "CT" monogram on
  the bottom edge only if it still reads at small sizes.
- Inline SVG built from the CSS colour tokens, so it matches the real cards. It must read clearly at
  24px (top bar) and look detailed at 96px or more (Home hero). Two levels of detail are fine:
  a simple version for small sizes and a detailed one for the hero.
- Also use it as the favicon (an SVG data URI in `pack-rip.html`, `public/favicon.svg` in React).
- Keep the `<h1>CT <span>Ripz</span></h1>` wording beside it.

## What makes it look AI-made (never do these)
- Blank or flat backgrounds; a single noise layer at near-zero opacity passed off as "texture".
- Glows, neon halos, coloured shadows, glassmorphism or frosted blur, purple and blue gradients.
- Pill-shaped buttons and chips everywhere; every card or panel with identical radius and shadow.
- Generic emoji or icon-library icons used as decoration.
- Monospace "terminal" labels used as decoration; fake taglines above the title.
- Ornament with no system: random dots, rivets, sparkles. Every ornament comes from the
  engraving and certificate language above.
- Inter, Roboto, Poppins, or any font not listed in "Fonts".
- Centred hero, three equal feature boxes, the same section layout repeated on every screen.

## Where textures come from
- **`pack-rip.html`:** textures must be made in code: SVG patterns and filters (`feTurbulence`,
  `feDisplacementMap`, `<pattern>` guilloché built from repeated paths), CSS gradients, inline
  data-URI SVG. Heavy filters go in ONE shared `<defs>` and are referenced; never one filter per card.
- **React version:** may also use texture images in `public/textures/` (JPEG or WebP, tileable,
  at most about 150 KB each, about 1 MB total). These are made with Higgsfield by Nick (see
  [`design/TEXTURES.md`](../design/TEXTURES.md)). Until a file arrives, use the code-made version so nothing is blocked.

## Buttons and controls
- Primary: gold foil fill with navy text, engraved edge, sharp or 2–3px corners.
- Secondary: gold rule outline on navy, gold text.
- Disabled: clearly muted (navy fill, muted text, no foil).
- Every control works with keyboard and touch, has a visible gold focus ring, and is at least
  40px tall on phones. Never `alert`, `confirm` or `prompt`; build confirmations into the page.

## Cards
Keep the card layout: metal frame tinted by rarity, full-bleed art, name top-left, rarity tab
notched top-right, rarity bottom-left. Do not change the card art. You may refine how cards
sit on the page (binder slots, display-case shelves, shadows that suit the surface).

## Do not change (the game's parameters)
- 8 themes, 100 cards each, split 40 Common / 28 Uncommon / 18 Rare / 10 Epic / 4 Legendary.
  Keep every card name, theme, category key and label in `T` exactly.
- Rarity odds and sell prices in `R`; the three pack tiers in `TIERS` (Single 1 card 100,
  Triple 3 cards 270, Mega 5 cards 425 with one Rare or better).
- Coins: start 1000, +1000 automatically every 60 seconds, but only while the balance is under
  5000 (`START`, `PAY`, `WAIT`, `CAP`).
- Three tabs: Home, Store, Inventory. Pack opening overlay with flip reveal. Selling duplicates.
- Saved state in localStorage under the same key (`packrip-v2`) and shape. New fields optional;
  old saves must still load.
- The art code (`art()`, `motif()`, `monster()`, `car()`, `sport()`, `M`, `PROP`), the `ART` and
  `IMG` lists, and the image files in `public/art/`.
- `IMG` override: the Honda Prelude card shows `public/art/prelude.jpg` as its whole face.
- Monsters theme: original creatures only. No Pokémon names, characters or likenesses.
- Islam theme: no depictions of people; places, objects, geometric and calligraphic art only.

## Image paths
See [images.md](images.md): card art in `public/art/`, React textures in `public/textures/`.

## Hard technical rules for `pack-rip.html`
See [pack-rip.md](pack-rip.md). The page breaks or is refused if they are not followed.

## Check
- `npm run check` must end with `CHECK OK` (it runs `check.sh`; do not edit `check.sh`).
- `npm test` and `npm run build` must pass. GitHub runs all three on every push and pull request.
- Look at the result in a browser at 375px and at desktop width before calling it done, and say
  what you could not check.
