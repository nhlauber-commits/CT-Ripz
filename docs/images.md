# Images (`public/`)

All images live in `public/`, which Vite serves at the site root. Two folders, one convention:

| Folder | Holds | `pack-rip.html` loads | React loads |
|---|---|---|---|
| `art/` | Card art (Higgsfield, by Nick) and `prelude.jpg` | `public/art/<file>` | `art/<file>` |
| `textures/` | Background and surface textures (React only) | never (it makes textures in code) | `textures/<file>` |

## Card art (`art/`)
- File name: `<themeId>_<cardIndex>.jpg`. It only shows once its `"<themeId>:<cardIndex>"` key
  is also in the `ART` list in `pack-rip.html`. `npm test` fails if the list and the folder disagree.
- `prelude.jpg` is the Honda Prelude card's whole face (the `IMG` override), not just its art.
- JPEG, about 50 KB each, 300 KB at most.
- Monsters: original creatures only, no Pokémon names or likenesses. Islam: no people.
- Do not change existing card art.

## Textures (`textures/`)
- JPEG or WebP (PNG only for transparency), tileable unless stated, about 150 KB each at most,
  about 1 MB total.
- Requested in [`design/TEXTURES.md`](../design/TEXTURES.md), which lists every file and its size.

## Who makes images
Only Nick, in Higgsfield, on his computer. Everyone else (and their agents) adds a request
(textures: `design/TEXTURES.md`; card art: a list of card keys and descriptions) and keeps the
code-made fallback until Nick commits the file. Nick enables Higgsfield by adding
`"enabledMcpjsonServers": ["higgsfield"]` to his own `.claude/settings.local.json` and signing in with `/mcp`.
