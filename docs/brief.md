# CT Ripz: design brief

CT Ripz is a card-pack opening game. This brief is the direction for how it looks and the
rules any agent working on it must follow. The look described here is the React app in `src/`.
`pack-rip.html` still has the older navy and gold look and is kept as the source of truth for
game data and behaviour, not for design.

## The job: vibrant, textured, high contrast, very stimulating
The interface should feel like a screen-printed gig poster covered in stickers: loud colour,
visible print texture, thick outlines, things sitting crooked, things moving. **A plain, flat or
quiet screen is a failed screen.** Usability must not get worse, but the look is what is judged.

The reference page is [`design/ripz-template.html`](../design/ripz-template.html). The older
"Vault" study (`design/vault-template.html`) is kept for history only.

## Art direction: "Hyperprint"
Overprinted ink, halftone, die-cut stickers, holo foil.

**Background (never blank).** A composed scene in layers, back to front:
1. Slowly spinning sunburst rays in two close tones. The pair changes per tab
   (Home violet, Store teal, Inventory magenta, Stats blue).
2. Two halftone dot fields, pink from one corner and cyan from the other, fading out.
3. Print grain over everything, then a soft dark edge so the centre reads.

**Surfaces.** Panels are die-cut stickers: a thick cream keyline and a hard offset shadow in a
contrasting colour, no blur. Mix dark ink panels with bright paper panels (cream, yellow, cyan,
lime, pink). Vary them by purpose: the hero is a pink sunburst poster, the Store shelf is a
sunburst in the chosen theme's colours with a perforated ticket strip, the binder is a dot-grid
album page with a hazard-stripe spine. Tilt some pieces a degree or two.

**Colour.** Near-black ink and cream paper, plus five print colours: hot pink, cyan, yellow,
orange and lime, with violet as a sixth. Use them at full strength, side by side. Rarity colours
and theme colours are used boldly too (card frames, bars, theme tiles, packs, binder tabs).
Text must still pass 4.5:1: ink on the bright colours, cream or yellow on ink. White on the
plain pink does not pass for small text; use the darker pink.

**Texture.** Halftone dots, sunburst rays, hazard stripes, checkerboard, print grain and holo
foil. Every large area carries at least one.

**Typography.** Display titles are printed out of register: an ink shadow plus a second colour
slipped further off. Numbers (coins, counts, prices) are set very big, like a price board.

**Motion.** Plenty of it, and physical: the ticker scrolls, rays and sunbursts turn, packs
wobble on hover and shake before they open, cards deal in and flip with a bounce, pack art
drifts and glints, a Legendary gets its own reveal (flash, gold rays, spinning sun). Foil
follows the pointer. All of it turns off under `prefers-reduced-motion`. Keep it cheap: no
per-frame filters on moving things, and pause what is hidden behind an open dialog.

## Fonts (Google Fonts only)
- **Titles: Dela Gothic One.** The "CT Ripz" wordmark and screen titles.
- **Display: Anton.** Headings, labels, tabs, buttons, card names, prices and counts.
- **Body: Bricolage Grotesque** (400 to 800). Body text and small caps labels.

## Logo: a legendary card
An upright card tilted about -8 degrees with a second card peeking out behind it: yellow frame,
pink art window, cream star, cyan rarity tab and back card, all outlined in ink. Inline SVG from
the CSS tokens. A simple version for small sizes and a detailed one (halftone, burst, "CT") for
the hero. Also the favicon (`public/favicon.svg`). Keep the `<h1>CT <span>Ripz</span></h1>`
wording beside it.

## Never do these
- Blank or flat backgrounds; a single faint noise layer passed off as texture.
- Soft glows, blurred shadows, glassmorphism or frosted blur. Shadows are hard and offset.
- Pastel or washed-out colour; grey-on-grey; the old navy and gold palette.
- Every panel with the same colour, radius and shadow; the same section layout on every screen.
- Generic emoji or icon-library icons used as decoration.
- Any font not listed in "Fonts".
- Colour as raw hex in components. Every colour is a token in `src/styles.css`.

## Where textures come from
Textures are made in code: CSS gradients (`repeating-conic-gradient`, `radial-gradient` dots,
stripes), SVG patterns and one shared grain filter. Heavy filters go in ONE shared `<defs>` and
are referenced; never one filter per card. The React app may also use texture images in
`public/textures/` (see [`design/TEXTURES.md`](../design/TEXTURES.md)); until a file arrives,
use the code-made version so nothing is blocked.

## Buttons and controls
- Primary: yellow fill, ink text, 3px ink border, hard offset shadow; it presses into the shadow.
- Secondary: the same shape in cream.
- Disabled: grey stripes, dashed border, no shadow.
- Every control works with keyboard and touch, has a visible focus ring (white on dark, ink on
  paper), and is at least 44px tall on phones. Never `alert`, `confirm` or `prompt`; build
  confirmations into the page. Anything shown on hover must also show on focus and on tap.

## Cards
Keep the card layout: frame in the rarity colour, full-bleed art, name top-left, rarity tab
notched top-right, rarity bottom-left. Do not change the card art. Small labels have a minimum
size so they stay readable on phone-sized cards. Legendary frames are holo foil.

## Packs
Each pack shows one Legendary from its theme inside the yellow sunburst: Mega shows the theme's
flagship (`em`), Single and Triple show two of the others.

## Do not change (the game's parameters)
- 8 themes, 100 cards each, split 40 Common / 28 Uncommon / 18 Rare / 10 Epic / 4 Legendary.
  Keep every card name, theme, category key and label in `T` exactly.
- Rarity odds and sell prices in `R`; the three pack tiers in `TIERS` (Single 1 card 100,
  Triple 3 cards 270, Mega 5 cards 425 with one Rare or better).
- Coins: start 1000, +1000 automatically every 60 seconds, but only while the balance is under
  5000 (`START`, `PAY`, `WAIT`, `CAP`).
- Four tabs: Home, Store, Inventory, Stats. Pack opening overlay with flip reveal. Selling
  duplicates.
- Saved state in localStorage under the same key (`packrip-v2`) and shape. New fields optional;
  old saves must still load. Player history lives in one optional `stats` object
  (`src/state/stats.js`); `best` holds at most 10 entries and `log` at most 50.
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
