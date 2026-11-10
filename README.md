# CT Ripz

Pack-opening card game. The published page is `pack-rip.html`, built from `app.html`.

## Setup (once per computer)

Install Node.js 20 or newer, then in the repo folder:

```
npm install
```

## Working on it

- `npm run dev`: opens `app.html` in the browser and reloads as you edit.
- `npm run build`: compiles Tailwind and writes `pack-rip.html` (the file that gets published).
- `npm run check`: checks the built page against the rules in `BRIEF.md`.

Edit `app.html` and `src/tailwind.css`. Never edit `pack-rip.html` by hand; the build overwrites it.

## Using Tailwind

Tailwind classes work straight in `app.html`, including in the HTML strings the script builds. The theme reuses the page's own colours, so `bg-navy`, `bg-navy-raise`, `text-gold`, `border-gold`, `text-ink`, `text-legendary` and `font-display` match the existing design.
