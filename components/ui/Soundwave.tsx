'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/* ============================================================================
   Soundwave — a scrolling speech-amplitude meter (the "voice memo" look).

   A waveform shows AMPLITUDE OVER TIME, not frequency. So this is a scrolling
   level meter: every tick a JS signal generator emits one loudness sample, the
   samples scroll across as frozen history (newest on the right), and the bars
   mirror symmetrically around the centre line.

   The generator is built to read as real speech (see Spec):
     • Syllabic envelope — loudness rises and falls at 4–8 Hz (summed sines,
       de-tuned so it never looks like one clean sine).
     • Word/sentence gate — slow noise occasionally drops output to ~0, so there
       are real dips between words and full pauses between sentences. Bars DO
       fall silent; they are not all perpetually moving.
     • Fine jitter — per-sample grain so no two samples match.
     • Plosive spikes — rare sharp peaks (p/t/k, stressed vowels). Most samples
       sit low-to-medium; very few hit maximum → a jagged, spiky profile.
     • Attack / decay — the live level rises almost instantly and falls slowly,
       exactly like a hardware level meter. That asymmetry is baked into the
       history, so spikes have a sharp leading edge and a trailing decay.

   CONVEYOR MODEL: the bars are a belt that physically scrolls right→left via a
   single transform: translateX on the track. Each bar is born at the right with
   a height sampled from the speech generator and KEEPS that height for its whole
   journey across the screen — it never re-morphs. When the belt has advanced one
   bar-pitch we recycle: drop the bar that left on the left, append a fresh sample
   on the right, and snap the transform back by one pitch (seamless). This reads
   far more naturally than a level meter whose every bar is perpetually wobbling.

   The resting profile is deterministic, so SSR / reduced-motion already render a
   plausible frozen waveform before any JS runs.
============================================================================ */

interface SoundwaveProps {
  /** Initial / SSR bar count. The live count adapts to width (constant pitch). */
  barCount?: number;
  className?: string;
}

// ── Tuning ──────────────────────────────────────────────────────────────────
const SCROLL_HZ = 4; // bars that scroll past per second → scroll SPEED dial
const ATTACK_TAU = 0.022; // s — near-instant rise on a sound onset
const DECAY_TAU = 0.19; // s — slower fall (level-meter ballistics)
const MIN_H = 0.05; // shortest a bar gets (silence) — a small round dot
const BAR_PITCH = 24; // px per bar (bar + gap) → responsive bar count
const BAR_RATIO = 0.5; // bar width as a fraction of its pitch (rest is the gap)
const EXTRA_BARS = 2; // off-screen-right bars queued to scroll in
const MIN_BARS = 14;
const MAX_BARS = 80;

// ── Value noise (deterministic, smooth) ──────────────────────────────────────
const frac = (n: number) => n - Math.floor(n);
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
function hash(n: number): number {
  return frac(Math.sin(n * 12.9898 + 78.233) * 43758.5453);
}
function noise(x: number, lane: number): number {
  const xi = Math.floor(x);
  const f = x - xi;
  const u = f * f * (3 - 2 * f);
  return hash(xi + lane * 131.7) * (1 - u) + hash(xi + 1 + lane * 131.7) * u;
}

// Raw speech loudness at time t → [0,1]. Irregular by construction.
function rawAmplitude(t: number): number {
  // Syllabic envelope: 4–8 Hz, three de-tuned sines so it isn't a clean sine.
  const syl =
    0.45 +
    0.55 *
      (0.5 * Math.sin(2 * Math.PI * 4.6 * t) +
        0.3 * Math.sin(2 * Math.PI * 6.7 * t + 1.7) +
        0.2 * Math.sin(2 * Math.PI * 7.9 * t + 3.1)); // ~0..1
  // Phrase dynamics: loudness drifts over seconds.
  const dyn = 0.5 + 0.5 * noise(t * 1.7, 3);
  // Word / sentence gate: slow noise → real dips and full pauses.
  const gate = smoothstep(0.3, 0.46, noise(t * 0.8, 5));
  // Fine grain.
  const jit = 0.8 + 0.2 * noise(t * 17, 7);
  let a = syl * dyn * gate * jit;
  // Rare plosive spikes (p/t/k, stressed syllables).
  const sp = noise(t * 6.0, 9);
  if (sp > 0.9) a = a + (sp - 0.9) * 5 * 0.7;
  return Math.max(0, Math.min(1, a));
}

// Deterministic frozen waveform for SSR / reduced motion — irregular, spiky,
// with a couple of quiet gaps, so it reads as a real recording at rest.
function staticProfile(i: number, n: number): number {
  const x = i / Math.max(1, n - 1);
  let v = 0.18 + 0.5 * noise(i * 0.55 + 2.1, 1); // low–medium, correlated
  const sp = noise(i * 0.5 + 7.3, 2);
  if (sp > 0.84) v += (sp - 0.84) * 4; // occasional spike
  v *= 0.45 + 0.55 * smoothstep(0.18, 0.42, noise(x * 3.0 + 1.1, 4)); // quiet gaps
  return Math.max(MIN_H, Math.min(1, v));
}

export function Soundwave({ barCount = 44, className }: SoundwaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Visible bars + an off-screen buffer on the right that scrolls into view.
  const [count, setCount] = useState(barCount + EXTRA_BARS);

  // Resting profile — used for the initial (SSR / reduced-motion) render.
  const bases = useMemo(
    () => Array.from({ length: count }, (_, i) => staticProfile(i, count)),
    [count],
  );

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const bars = Array.from(track.querySelectorAll<HTMLElement>('[data-bar]'));
    const n = bars.length;
    if (n === 0) return;

    // ── Layout: fixed bar pitch so a bar holds a constant width as it travels,
    //    and the visible count adapts to width (constant thickness + speed). ──
    let pitch = BAR_PITCH;
    const relayout = () => {
      const w = container.clientWidth;
      if (!w) return;
      const vis = Math.max(MIN_BARS, Math.min(MAX_BARS, Math.round(w / BAR_PITCH)));
      if (vis + EXTRA_BARS !== n) {
        setCount(vis + EXTRA_BARS); // re-render with the right bar count → effect re-runs
        return;
      }
      pitch = w / vis;
      const barW = Math.min(12, Math.max(4, pitch * BAR_RATIO));
      const gap = pitch - barW;
      track.style.width = `${n * pitch}px`;
      bars.forEach((bar) => {
        bar.style.width = `${barW}px`;
        bar.style.marginRight = `${gap}px`;
      });
    };
    relayout();
    const ro = new ResizeObserver(relayout);
    ro.observe(container);

    // Belt of heights — index 0 = leftmost (about to exit), n-1 = newest (right).
    const heights = bases.slice();
    const paint = () =>
      bars.forEach((bar, i) => {
        bar.style.height = `${(Math.max(MIN_H, heights[i]) * 100).toFixed(2)}%`;
      });
    paint();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => ro.disconnect();
    }

    let level = 0.2; // current loudness, with attack/decay applied
    let offset = 0; // px the belt has scrolled within the current pitch step
    const t0 = Math.random() * 1000; // vary the speech per load
    let raf = 0;
    let start = 0;
    let last = 0;

    const frame = (now: number) => {
      if (!start) {
        start = now;
        last = now;
      }
      const t = t0 + (now - start) / 1000;
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;

      // Keep a live speech level (fast attack / slow decay) so each new bar that
      // enters gets a natural, correlated-but-random height.
      const targetLevel = rawAmplitude(t);
      const tau = targetLevel > level ? ATTACK_TAU : DECAY_TAU;
      level += (targetLevel - level) * (1 - Math.exp(-dt / tau));

      // Scroll the whole belt left at a constant speed. Bars keep their heights;
      // only their position changes — that is the natural part.
      offset -= pitch * SCROLL_HZ * dt;
      while (offset <= -pitch) {
        offset += pitch;
        heights.shift(); // the bar that scrolled off the left is gone
        heights.push(level); // a fresh sample is born on the right
        paint(); // heights only change here, once per bar — never mid-travel
      }
      track.style.transform = `translateX(${offset}px)`;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [bases]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'relative h-full w-full overflow-hidden',
        // length-wise fade so bars enter / leave softly at both ends
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        '[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div ref={trackRef} className="absolute inset-y-0 left-0 flex items-center" style={{ willChange: 'transform' }}>
        {bases.map((base, i) => (
          <span
            key={i}
            data-bar
            className="block shrink-0 rounded-full"
            style={{
              width: '8px',
              height: `${(base * 100).toFixed(2)}%`,
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--brand) 46%, #ffffff) 0%, color-mix(in srgb, var(--brand) 80%, #ffffff) 52%, var(--brand) 100%)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
