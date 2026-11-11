# Part 6 (Claude): Stats tab

Read `CLAUDE.md` and `docs/brief.md` first. Work in the React app on `feature/stats` from `main`.

**Goal:** a fourth tab, **Stats**, next to Home, Store and Inventory, showing the player's
history in the Vault look.

**What it shows:**
- **Totals:** packs opened (by tier: Single / Triple / Mega), cards opened, unique cards found
  out of 800, completion per theme (owned/100), coins spent on packs, coins earned from selling.
- **Best pulls:** the top 10 cards ever pulled, ranked by rarity, then sell value, then newest.
  Show the card, its theme and when it was pulled.
- **Latest pulls:** the last 20 cards pulled, newest first, with pack tier and time.
- **Duplicates:** duplicates pulled, duplicates held now, duplicates sold, and the value of the
  duplicates held now (`dupeValue`).
- **By rarity:** how many of each rarity pulled, next to the expected share from the `R` odds
  (a small bar per rarity, rarity colour only as the accent).
- **Luck:** packs since the last Legendary, and the first Legendary ever pulled.

Each card shown opens the same card view as the binder. Numbers are set big in the display face,
like a price board. Avoid a row of equal boxes (see docs/brief.md "What makes it look AI-made").

**Saved data (must stay compatible):**
- Add one optional object `S.stats` to the `packrip-v2` save, for example
  `{v:1, packs:{single,triple,mega}, cards, byRarity:[5 numbers], dupesPulled, dupesSold,
  coinsSpent, coinsFromSales, best:[...], log:[...], sinceLegendary, firstLegendary}`.
  `best` holds at most 10 entries and `log` at most 50 (`{k: card key, t: time, p: tier}`),
  so the save stays small.
- Old saves have no `stats`: build it on load from what exists (`S.opened` for total packs,
  `S.owned` for unique cards and held duplicates, `S.recent` for the first latest pulls), and
  show "since stats began" next to numbers that cannot be rebuilt.
- `pack-rip.html` keeps unknown fields when it saves (it loads with `Object.assign`), so playing
  the old version must not wipe `stats`. Test it: save in React, play in `pack-rip.html`,
  reload React.
- "Start over" also clears `stats`, using the existing in-page confirmation.
- Stat updates live in the state hook (one place), called when buying a pack and selling
  duplicates, not in components.

**Also update** `docs/brief.md` and `CLAUDE.md` where they say three tabs, and extend `npm test` with
tests that an old save without `stats` loads and that `best` and `log` never grow past their limits.

**Done when:** build and test pass, the GitHub run is green, the tab is checked at 375px and
desktop width (keyboard order, 40px tap targets, visible focus, no horizontal scroll), with
screenshots. Tell me what you could not verify.
