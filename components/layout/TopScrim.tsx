// ─── Top Scrim ─────────────────────────────────────────────────────────────────
// A frosted "safe zone" pinned to the top of the viewport. It sits *behind* the
// floating navbar (z-40, navbar is z-50) and progressively blurs any page content
// that scrolls underneath — so copy never collides messily with the nav as you
// scroll. Pure blur, no color tint. Always on, pointer-events-none (never blocks
// clicks). Identical on desktop and mobile (full width, fixed height).
//
// Tune the look with the two constants below:
//   • SCRIM_HEIGHT — how tall the frosted band is.
//   • LAYERS       — the progressive blur ramp (more layers = smoother fade).

// Ends at the navbar's bottom edge (pill = 10px top gap + 48px tall ≈ 58px) so the
// frost only covers the strip above/around the nav — never the content below it.
const SCRIM_HEIGHT = '60px';

// Each layer applies a stronger blur confined to a lower band, so the blur ramps
// up smoothly from crisp (bottom) to fully frosted (top).
const LAYERS = [
  { blur: 0.5, from: 0, to: 30 },
  { blur: 1.5, from: 15, to: 50 },
  { blur: 3, from: 35, to: 70 },
  { blur: 6, from: 55, to: 100 },
];

function bandMask(from: number, to: number) {
  const mid = (from + to) / 2;
  return `linear-gradient(to bottom, transparent ${from}%, black ${mid}%, black ${to}%, transparent 100%)`;
}

export function TopScrim() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
      style={{ height: SCRIM_HEIGHT }}
    >
      {/* Progressive blur ramp — pure blur, no color tint. */}
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: bandMask(layer.from, layer.to),
            WebkitMaskImage: bandMask(layer.from, layer.to),
          }}
        />
      ))}
    </div>
  );
}
