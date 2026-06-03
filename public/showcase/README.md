# Showcase assets — Discovery-call console

Drop the exported design here so Claude can build the homepage showcase
(the "Static Training is Dead. Soft is Adaptive." section).

## What to drop

| File (suggested name)      | What it is                                            |
|----------------------------|-------------------------------------------------------|
| `discovery-console.svg`    | The full Discovery-call console frame (whole design)  |
| `maya.png` / `maya.jpg`    | (optional) Maya Okonkwo portrait, if easy to export   |
| `you.png` / `you.jpg`      | (optional) The rep "You" webcam frame, if easy         |

The SVG is used as the **source of truth** (exact colors, spacing, and the
embedded photos get extracted from it). The final showcase is then rebuilt in
code so it's themeable, animatable, and responsive — not the raw SVG inlined.

## Export tips (Figma)

- Export the **entire console frame** at 2x.
- **Include images** (don't flatten/remove them) — the two photos are needed.
- If possible, keep **text as text** (not outlined) so font sizes/weights read cleanly.

Once the file is here, tell Claude the filename and they'll take it from there.
