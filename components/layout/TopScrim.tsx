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

// The band is a touch taller than the navbar's bottom edge (pill = 10px top gap
// + 48px tall ≈ 58px) so the blur has finished fading to nothing by the time it
// reaches the bar — content below the nav is always crisp.
const SCRIM_HEIGHT = '74px';
const NAV_BOTTOM_PCT = 80; // ≈58px / 74px — where the frost is fully gone

// Progressive blur, STRONG at the very top → clear at the navbar's bottom.
// Layers are stacked small→large blur; each larger blur is masked to a smaller
// band hugging the top, so backdrop-filters compound there into a heavy frost
// that thins out smoothly going down. `stop` = where that layer fades to nothing.
const LAYERS = [
  { blur: 1, stop: NAV_BOTTOM_PCT },
  { blur: 2.5, stop: 60 },
  { blur: 5, stop: 40 },
  { blur: 10, stop: 22 },
];

// Opaque from the top, fading out over the last ~22% before `stop`.
function topMask(stop: number) {
  const fadeStart = Math.max(0, stop - 22);
  return `linear-gradient(to bottom, #000 0%, #000 ${fadeStart}%, transparent ${stop}%)`;
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
            maskImage: topMask(layer.stop),
            WebkitMaskImage: topMask(layer.stop),
          }}
        />
      ))}
    </div>
  );
}
