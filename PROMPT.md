# Prompt: port CT Ripz to React and make it easier to use

Paste everything below the line into Claude Code (or Gemini CLI) from the repo root.
Run it in two sessions: Part 1 first, merge it, then Part 2.

---

## Part 1: port `pack-rip.html` to React, with no visible changes

Read `CLAUDE.md` and `BRIEF.md` first. They are the rules for this job.

**Goal:** the React app in `src/` plays exactly like `pack-rip.html`: same cards, art, odds,
prices, coins, tabs, opening overlay and saved progress. A player should not be able to tell
which version they are using. Do not change the design or add features in this part.

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
   - The CSS and its `:root` tokens → `src/styles/`, unchanged. Keep the shared SVG
     `<defs>` (filters) rendered once in `App`, not per card.
3. Images: `art/<theme>_<index>.jpg` and `art/prelude.jpg` from `public/art/`.
4. Commit after each section with a plain message. Leave `pack-rip.html` and `check.sh` as they are.

**Done when:**
- `npm run build` succeeds and `npm run check` still ends with `CHECK OK`.
- A small Node test (`npm test`, no new libraries; use `node --test`) confirms: 8 themes,
  100 cards each, split 40/28/18/10/4, no duplicate names, every `art()` output starts with
  `<svg` and has no `NaN` or `undefined`, and the data in `src/data/` matches `pack-rip.html`.
- Side by side in the browser at 375px and desktop width, both versions look and behave the same:
  buying each pack tier, the flip reveal, selling duplicates, the free-coin timer, and reloading
  keeps progress.
- Tell me what you could not verify.

---

## Part 2: usability pass on the React app

Read `CLAUDE.md` and `BRIEF.md` first. Work on a branch `ux/pass-1` from `main` (after Part 1 is merged).
Keep the approved navy and gold look and every game parameter. This is about making the app
easier and more pleasant to use, not a new style.

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

**Rules:** small separate commits, one improvement each. Any new saved field is optional so old saves
still load. No new libraries without asking.

**Done when:** `npm run build` and `npm test` pass, each change is checked in the browser at 375px and
desktop width, and you give me a before/after list of what changed and what you could not verify.
