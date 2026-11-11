# Part 3: usability pass

Read `CLAUDE.md` and `docs/brief.md` first. Work on a branch `ux/pass-1` from `main` after Part 2 is merged.
Keep the Part 2 look and every game parameter.

**First, look before changing anything.** Run the app, play it for a few minutes at 375px and at
desktop width, and write a short list of the 5–8 biggest friction points you find (with where they
happen). Show me that list and wait for my go-ahead before building.

**Areas to consider** (only fix what is actually a problem):
- **Opening packs:** can the player reveal all cards at once, skip the animation, and open
  another pack of the same kind without going back to the Store?
- **Inventory:** filter by theme and rarity, show owned/total per theme, and make duplicates
  easy to spot and sell in one step, with an in-page confirmation (never `confirm()`).
- **Coins:** make it clear when the next free 1,000 coins arrive and why the timer stops at 5,000.
- **Feedback:** short in-page messages for "not enough coins", "sold 3 duplicates for 120", etc.
- **New pulls:** mark cards seen for the first time; let the player jump from Home to a card in the binder.
- **Accessibility:** keyboard order, visible focus, 40px tap targets on phones, labels for screen readers,
  `prefers-reduced-motion` honoured in the overlay.

**Rules:** small separate commits, one improvement each, styled in the Part 2 look. Any new saved
field is optional so old saves still load. No new libraries without asking.

**Done when:** `npm run build` and `npm test` pass and the GitHub run is green. Each change is
checked in the browser at 375px and desktop width. Give me a before/after list of what changed and
what you could not verify.
