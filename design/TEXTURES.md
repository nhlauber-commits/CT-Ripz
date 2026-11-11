# Texture requests (for Nick, in Higgsfield)

Higgsfield runs on Nick's computer. This file is the hand-off: anyone (or any agent) who
needs an image adds a row here; Nick generates it, saves it to the path given, ticks it off
and commits. The React app uses a code-made fallback until each file exists, so nothing waits.

## Rules for every texture
- Palette: deep navy (around `#0b1528`) and gold (around `#d4af37`) only. No other hues.
- No people, no text, no logos, no recognisable brands.
- Seamless and tileable unless the row says otherwise (check the edges by tiling it 2×2).
- Flat, even lighting: no strong light from one side, so tiles don't show seams.
- Save as JPEG (or WebP) at about 80% quality; PNG only where the row needs transparency. Target size in the table; 150 KB at most.
- Path is `public/textures/<file>`. The app loads it as `textures/<file>`.

## Requests

| Done | File | Size | Use | Prompt |
|---|---|---|---|---|
| [ ] | `linen-navy.jpg` | 512×512, tileable, ≤80 KB | Base texture for the whole page and panels | Seamless close-up of deep navy bookbinding linen cloth, fine visible weave, subtle fibre variation, even flat lighting, no shadows, top-down, tileable texture |
| [ ] | `guilloche-navy.jpg` | 1600×1600, not tiled, ≤150 KB | Large rosette behind the Home hero, faint on other screens | Banknote guilloché rosette, fine interlaced spirograph line engraving, slightly lighter navy lines on deep navy background, centred, symmetrical, intricate, no text, flat scan |
| [ ] | `hatch-navy.jpg` | 512×512, tileable, ≤60 KB | Engraved crosshatch toward the page edges | Seamless fine copperplate engraving crosshatch pattern, thin navy lines on slightly darker navy, banknote intaglio style, even density, tileable |
| [ ] | `foil-gold.jpg` | 512×512, tileable, ≤80 KB | Gold foil for primary buttons, wordmark and dividers | Seamless brushed gold leaf foil stamping texture, fine metallic grain, soft even sheen, no strong highlights, warm gold, tileable |
| [ ] | `certificate-border.png` | 1200×1200, transparent, ≤150 KB | Engraved corner ornaments for framed panels (9-slice) | Ornate stock certificate engraved border corners, thin gold line flourishes and scrollwork, transparent background, symmetrical, banknote engraving style, no text |
| [ ] | `velvet-stage.jpg` | 1600×1000, not tiled, ≤150 KB | Backdrop for the pack-opening overlay | Deep navy velvet display case lining, soft spotlight from above fading to dark edges, subtle fabric texture, empty, no objects |

## Notes
- If a result has visible seams or a coloured cast, regenerate rather than fixing it in code.
- When a file is added, also tick it here in the same commit.
