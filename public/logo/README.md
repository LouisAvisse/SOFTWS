# Company logo

Put the Soft logo files in **this folder** (`public/logo/`).

Anything inside `public/` is served from the site root, so a file named
`public/logo/soft-logo.svg` is reachable in the browser and in code at:

```
/logo/soft-logo.svg
```

(Note: the URL does **not** include the word `public` — that part is implied.)

## Recommended files to drop here

| File                      | Use                                          |
|---------------------------|----------------------------------------------|
| `soft-logo.svg`           | Main logo (preferred — sharp at any size)    |
| `soft-logo-dark.svg`      | Version for dark backgrounds (footer, etc.)  |
| `soft-logomark.svg`       | Icon-only mark (square, for small spaces)    |
| `soft-logo.png`           | Fallback if you only have a raster file      |

SVG is best for logos (crisp at every resolution, tiny file size). PNG works too.

## How to use it in code

Once the file is here, reference it with Next.js's `Image` component, e.g.:

```tsx
import Image from 'next/image';

<Image src="/logo/soft-logo.svg" alt="Soft" width={96} height={28} priority />
```

The current navbar/footer use a small inline SVG "LogoMark" + the text "Soft".
When your real logo is in this folder, tell the developer (or ask Claude) to
swap that placeholder for `/logo/soft-logo.svg`.
