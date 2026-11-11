# Task prompts

Paste one part at a time into Claude Code (or Gemini CLI) from the repo root.
Run each part in its own session and merge it before starting a part that needs it.

## Round 1: port, visual identity, usability
The visual identity (Part 2) is the main goal; Part 1 sets it up, Part 3 polishes it.
Run them in order.

| Part | File | Branch | Needs first |
|---|---|---|---|
| 1. Port `pack-rip.html` to React, no visible changes | [part-1-react-port.md](part-1-react-port.md) | `port/react` | nothing |
| 2. Visual identity ("The Vault") | [part-2-vault-identity.md](part-2-vault-identity.md) | `design/vault` | Part 1 merged |
| 3. Usability pass | [part-3-usability.md](part-3-usability.md) | `ux/pass-1` | Part 2 merged |

## Round 2: personality, logo, animations, stats, body font

| Part | Who | File | Branch | Needs first |
|---|---|---|---|---|
| 4. Design assets and logo | Nick, with Higgsfield | [part-4-higgsfield-kit.md](part-4-higgsfield-kit.md) | `design/higgsfield-kit` | nothing (can start now) |
| 5. Body font | Claude | [part-5-body-font.md](part-5-body-font.md) | `design/body-font` | Part 1 merged |
| 6. Stats tab | Claude | [part-6-stats-tab.md](part-6-stats-tab.md) | `feature/stats` | Part 1 merged |
| 7. Pack and legendary animations | Claude (code), using Nick's images from Part 4 when they exist | [part-7-pack-animations.md](part-7-pack-animations.md) | `feature/pack-animations` | Part 2 merged |

Parts 5 and 6 touch different files and can run at the same time.
