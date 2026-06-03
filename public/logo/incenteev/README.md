# Incenteev logo

The trust chip above the client logos on the home page ("Trusted by **Incenteev**
clients") renders the file at:

```
/logo/incenteev/incenteev.svg
```

## Replace the placeholder

`incenteev.svg` here is a **placeholder** wordmark. Drop the real Incenteev logo
in at the same path (keep the filename) and it appears automatically — no code
change needed.

- **Format:** SVG preferred (crisp, tiny). Transparent PNG at ~2x also works.
- **Color:** the chip sits on the light warm-paper hero, so a dark / full-color
  logo reads best. It renders at `h-3.5` (~14px tall), width auto.
- **Aspect:** a horizontal wordmark (or mark + wordmark) suits the inline chip.
  A square-only mark will look cramped between the surrounding text.

If you only have a tall/square mark, send it and we'll set the chip to show the
mark alone, or pad the artwork into a wider canvas.

## Where it's wired

- `components/sections/HeroVoice.tsx` — the `TrustChip` component, rendered above
  `<TrustLogos />` in the hero's trust strip.
- Copy lives in `messages/en.json` under `home.hero.trust`
  (`prefix` / `logoAlt` / `suffix`).
