# CT Ripz (Gemini)

The project rules live in CLAUDE.md so both agents follow one source:

@./CLAUDE.md

Gemini-specific notes:
- Folder rules are in `src/CLAUDE.md`, `design/CLAUDE.md` and `tests/CLAUDE.md`. Gemini does not
  load them by itself: read the one for the folder you are working in.
- MCP servers for Gemini CLI go in `.gemini/settings.json`, not `.mcp.json`.
- Higgsfield is only used on Nick's computer. If you are Nick's Gemini and need it, add the
  URL listed in `.mcp.json` to your own `.gemini/settings.json`. Everyone else: do not generate
  images; add requests to `design/TEXTURES.md` instead.
