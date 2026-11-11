# Part 2: visual identity ("The Vault")

Read `CLAUDE.md` and `docs/brief.md` first, especially "The job", "Art direction", "Fonts", "Logo"
and "What makes it look AI-made". Work on a branch `design/vault` from `main` after Part 1 is merged.
Work in the React app. Leave `pack-rip.html` as it is unless I ask.

**Goal:** a unique, elaborate, textured interface. The background is never blank. It should
look like an engraved certificate and a foil-stamped card box, not a template. Every game
parameter and the card art stay exactly as they are.

**First, design before building.** Show me, before you change the app:
1. A one-page design sheet as a static page (`design/sheet.html`) showing: the colour tokens,
   the two fonts at each size step, the background layers on their own and combined, a panel,
   primary and secondary buttons (normal, focus and disabled), and the legendary-card logo at
   24px, 48px and 128px.
2. A short note on how each screen (Home, Store, Inventory, opening overlay) will use these pieces
   differently, so the screens don't all look alike.
Wait for my go-ahead.

**Then build, one commit per piece:**
1. Fonts: Big Shoulders Display, Big Shoulders Inline Display (wordmark only) and Libre Franklin,
   replacing Fraunces and Plus Jakarta Sans in `index.html` and the tokens.
2. Background scene: linen texture, guilloché, engraved hatching, vignette, framed content area.
   Code-made first (SVG patterns and filters); swap in `public/textures/` images from Nick when
   they are in the repo (see `design/TEXTURES.md`).
3. Logo: the legendary-card icon as a component (`Logo.jsx`) with small and large detail levels,
   in the top bar and the Home hero, plus `public/favicon.svg`.
4. Surfaces and controls: certificate-style double-rule panels, foil buttons, shelf and binder
   treatments, per the brief.
5. Opening overlay: a stage that matches the vault (dark velvet or engraved backdrop, foil sweep on reveal).

**Rules:** colours only from CSS custom properties; heavy filters defined once and shared; no
new libraries without asking; `prefers-reduced-motion` turns off all motion; still 375px wide
with no horizontal scroll, 40px tap targets, visible focus.

**Done when:** build, test and check pass and the GitHub run is green. Each screen is checked
in the browser at 375px and desktop width, with screenshots before and after. Page weight stays
reasonable (list the texture and font bytes). Tell me what you could not verify.
