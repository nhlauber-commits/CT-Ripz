# Part 4 (Nick, Higgsfield): design assets with personality, and a new logo

Run this on Nick's computer, where Higgsfield is set up. Read `CLAUDE.md`, `docs/brief.md` and
`design/TEXTURES.md` first.

**Goal:** give the app a look with personality: its own patterns, visuals and colour, so it
feels like a real collector's brand and not a template. Higgsfield makes the images; the app
code (Parts 2 and 7) uses them. Keep the BRIEF's "Vault" idea (engraving, certificates, foil,
navy and gold) as the base, and add personality on top.

**1. Mood board first.** Generate 3 short directions (4–6 images each) and save them to
`design/moodboard/<direction>/`. Each direction shows a background, a panel surface, a pattern,
a pack wrapper and the logo idea together. Suggested directions:
- *Night vault*: navy and gold, banknote guilloché, velvet, foil.
- *Card-shop sign*: navy and gold plus one warm accent (oxblood or burnt orange),
  hand-painted gold-leaf lettering, enamel badges, pinstripe.
- *Trophy room*: navy and gold plus one cool accent (deep teal or racing green), brass plaques,
  embossed leather, engraved trophy linework.

Show the owner the three and wait for a pick. The pick may add **at most two accent colours**
to the palette; write their hex values in `design/TEXTURES.md` under a new "Palette" heading and
update docs/brief.md "Colour" to match. Rarity colours still stay small accents only.

**2. Pattern and texture kit** in the chosen direction. Add a row to `design/TEXTURES.md` for
each file, then generate it. Keep the existing rows (linen, guilloché, hatch, foil, border,
velvet stage) and add:
- `pattern-signature.jpg`: one signature repeat pattern that is ours alone (for example a
  lattice of tiny card shapes and stars), tileable, 512×512, ≤80 KB.
- `pack-wrapper-foil.jpg`: crinkled foil pack wrapper, neutral gold so the theme colour can
  tint it, tileable, 512×512, ≤80 KB.
- `ornament-divider.png`: engraved horizontal divider with a centre medallion, transparent,
  1200×120, ≤60 KB.
- `legendary-burst.png`: radial gold engraving burst (fine rays and stars, like the back of a
  banknote) for the legendary reveal, transparent, 1200×1200, ≤150 KB.
- `legendary-sparks.png`: a few loose gold foil flecks on transparent, for a particle sprite,
  512×512, ≤60 KB.

Same rules as the rest of that file: no people, no text, no logos or brands, seamless where
tiled, flat lighting, JPEG or WebP unless transparency is needed.

**3. New logo: a legendary card.** The logo is the icon of one of our own legendary cards, shown
as a card being pulled from a pack (upright 5:7 card tilted about -8°, a second card edge behind
it, gold legendary frame, notched rarity tab top right, as in docs/brief.md "Logo").
- Use one legendary card's art in the art window. Default pick: **Solardrake** (`monsters_96`),
  because it is our own creature and carries no real brand. Avoid cards that are real trademarks
  (Bugatti, McLaren, Ferrari, NBA, Super Bowl, World Cup, Berkshire). Ask the owner if they
  want a different card.
- Make the art window a simplified, engraved-style version of that card's art so it still reads
  at 24px.
- Deliver `public/brand/logo-mark.png` (1024×1024, transparent), `public/brand/logo-mark-64.png`
  (64×64, checked by eye at small size) and `public/brand/logo-lockup.png` (the mark with room
  for the wordmark; the "CT Ripz" wordmark itself stays live text in Big Shoulders Inline
  Display). Under 150 KB each.
- The code version of the logo (`Logo.jsx`, `public/favicon.svg`) gets redrawn in Part 2 or 7 to
  match the chosen mark; the PNG is the reference and the large hero version.

**Done when:** the files are in the repo at the paths above and ticked in `design/TEXTURES.md`,
`npm test` and `npm run build` pass, and the owner has picked a direction and a logo card.
Commit with plain messages; never commit `.env`.
