# B-Corp certification logo

Drop the two B-Corp logo files here. Served from the site root, so
`public/logo/bcorp/bcorp-white.svg` is reachable at:

```
/logo/bcorp/bcorp-white.svg
```

## Files to add

Two color variants — one for dark backgrounds, one for light. SVG preferred
(crisp + small); PNG works too (transparent background, ~2x resolution).

| File               | Use on…            | Where it appears                         |
|--------------------|--------------------|------------------------------------------|
| `bcorp-white.svg`  | **dark** backgrounds  | Footer (`bg-ink-deep`)                |
| `bcorp-black.svg`  | **light** backgrounds | Company page history timeline (`bg-canvas`) |

(If you only have one master file, send it and we'll generate the second
variant by recoloring, like we did for the Soft logo.)

## Where they replace the current placeholders

Both spots currently use a hand-drawn inline SVG "B Corp" badge:
- `components/layout/Footer.tsx` — the `BCorp()` component (dark footer → white)
- `components/ui/VerticalTimeline.tsx` — the `BCorp()` component shown on the
  "B-Corp Certified" milestone (light section → black)

Once the files are here, tell Claude and they'll be wired in via `next/image`,
sized to match, and QA'd with a screenshot.
