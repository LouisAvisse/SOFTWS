# Client / trust logos

Drop each customer's logo here, one file per company. Served from the site root,
so `public/logo/clients/edf.svg` is reachable at:

```
/logo/clients/edf.svg
```

## Files to add

Lowercase, kebab-case, one per company. SVG preferred (crisp + recolorable),
PNG works (transparent background, ~2x resolution):

| File                          | Company   |
|-------------------------------|-----------|
| `edf.svg`                     | EDF       |
| `lg.svg`                      | LG        |
| `sage.svg`                    | Sage      |
| `groupama.svg`                | Groupama  |
| `thermor.svg`                 | Thermor   |

Add more rows as the customer list grows.

## Where they show up

The homepage hero "trusted by" strip is rendered by
`components/ui/TrustLogos.tsx`. It currently uses hand-drawn monochrome
placeholders. Once the real files are here, the placeholders get swapped for
`next/image` references to `/logo/clients/*` (ask Claude to wire them up).

The strip is intentionally tasteful/monochrome: logos render in a muted gray
(`grayscale`) so the row stays calm and on-brand. If you'd rather show full-color
logos, that's a one-line change in `TrustLogos.tsx`.

There is also a scrolling marquee variant (`components/sections/LogoMarquee.tsx`)
used on the Product/Company pages — same files can feed it.
```
