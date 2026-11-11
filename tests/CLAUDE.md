# tests/: npm test and the structural check

- `npm test` runs every `*.test.mjs` here with Node's built-in runner (`node --test`).
  No test libraries; use `node:test` and `node:assert/strict`.
- `art-files.test.mjs` checks that the `ART` and `IMG` lists in `pack-rip.html` match the files
  in `public/art/` and that each image is under 300 KB.
- `npm run check` runs `check.sh` (structural check of `pack-rip.html`) through
  `tools/run-check.mjs`, which stands in Node for Apple's `jsc` on Windows and Linux.
  **Never edit `check.sh`.**
- CI (`.github/workflows/ci.yml`) runs check, test and build on every push and pull request.
