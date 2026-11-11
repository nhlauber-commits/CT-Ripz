# Part 5 (Claude): a warmer, more human body font

Read `CLAUDE.md` and `docs/brief.md` first. Work in the React app on `design/body-font` from `main`.

**Goal:** body text (labels, buttons, descriptions, stats) should feel more human and friendly
than Libre Franklin. The display face (Big Shoulders Display) and the wordmark face
(Big Shoulders Inline Display) stay.

**First, compare, then wait for a pick.** There is no Google font called "New Shoulder"; the
closest is Big Shoulders Text. Show these on one static page (`design/body-font.html`), each
setting the same real UI text (a store shelf, a stats table, the opening overlay caption,
a 13px label) at 375px and desktop width:
1. **Big Shoulders Text**: the text-size cut of our display family. Condensed, so check that
   small text stays readable.
2. **Alegreya Sans**: humanist, warm, with calligraphic touches.
3. **Source Sans 3**: humanist, very readable at small sizes.
4. **Fira Sans**: humanist, slightly sporty.
5. **Libre Franklin**, the current one, for comparison.

Check the exact family names and weights on fonts.google.com. Recommend one, say why, and wait
for the owner's go-ahead.

**Then:** change the Google Fonts `<link>` in `index.html` and the body font token in one place,
load only the weights used (400, 500, 600 at most), and update the font lists in `docs/brief.md`
("Fonts" and "What makes it look AI-made") and `CLAUDE.md` so the rules match. Leave
`pack-rip.html` as it is unless the owner asks.

**Done when:** build and test pass, the GitHub run is green, every screen is checked at 375px and
desktop width (no text overflow or clipped buttons), and you list the font bytes added or removed.
