# Part 1: port `pack-rip.html` to React, with no visible changes

Read `CLAUDE.md` and `docs/brief.md` first. They are the rules for this job.

**Goal:** the React app in `src/` plays exactly like `pack-rip.html`: same cards, art, odds,
prices, coins, tabs, opening overlay and saved progress. A player should not be able to tell
which version they are using. Do not change the design or add features in this part. The
redesign happens in Part 2, in React only, so it is done once.

**How to work:**
1. Create a branch `port/react` from `main`.
2. Move code from the `<script>` in `pack-rip.html` into modules, section by section,
   following the comment headers in that script:
   - `data` (`R`, `TIERS`, `START`/`PAY`/`WAIT`/`CAP`, `T`) → `src/data/`, copied unchanged.
   - `helpers` and the art code (`hash`, `rng`, `M`, `PROP`, `sport`, `monster`, `car`,
     `motif`, `art`, `emblem`) → `src/art/`, copied unchanged. `art(card)` stays a pure
     function returning an SVG string; render it with `dangerouslySetInnerHTML` inside
     the card component.
   - `state` (`KEY`, `IMG`, `ART`, `S`, `save`, `roll`, `dupeValue`, coin timer) →
     `src/state/` as one hook or context. Same localStorage key and shape, wrapped in
     try/catch, so a save made in `pack-rip.html` loads in the React app.
   - `rendering` and `opening packs` → components in `src/components/`: `TopBar`, `Wallet`,
     `Home`, `Store`, `PackOffer`, `Inventory`, `Binder`, `Card`, `OpeningOverlay`.
   - The CSS and its `:root` tokens → `src/styles/`, unchanged. Render the shared SVG
     `<defs>` (filters) once in `App`, not per card.
3. Images load as `art/<theme>_<index>.jpg` and `art/prelude.jpg` (Vite serves `public/` at the root).
4. Commit after each section with a plain message. Leave `pack-rip.html` and `check.sh` as they are.

**Done when:**
- `npm run build`, `npm test` and `npm run check` pass (GitHub runs them too; the run must be green).
- `npm test` is extended (`node --test`, no new libraries) to confirm: 8 themes, 100 cards each,
  split 40/28/18/10/4, no duplicate names, every `art()` output starts with `<svg` and has no
  `NaN` or `undefined`, and the data in `src/data/` matches `pack-rip.html`.
- Side by side in the browser at 375px and desktop width, both versions look and behave the same:
  buying each pack tier, the flip reveal, selling duplicates, the free-coin timer, and reloading
  keeps progress.
- Tell me what you could not verify.
