'use client';

import { type ComponentType, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { LiveCallConsole } from '@/components/ui/LiveCallConsole';
import { SoftAppIcon } from '@/components/ui/SoftAppIcon';
import {
  Video, Mic, Captions, PhoneOff, Sparkles, BarChart3, ArrowRight,
  type LucideIcon,
} from 'lucide-react';

/* ============================================================================
   ValueRows — the homepage "why Soft" story, as alternating text / prototype
   rows (text-left·visual-right, then mirrored). Each row pairs the original
   pillar copy with a polished product-prototype illustration. Row 1 is a live
   video call so it's immediately clear this is a SaaS for live AI conversation.
   Copy is passed in verbatim; the illustrations are decorative chrome.
============================================================================ */

interface Item { title: string; body: string }
interface Props {
  headline: string;
  headlineItalic?: string;
  body: string;
  items: Item[];
}

// ── Shared panel frame ─────────────────────────────────────────────────────────
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* soft brand glow behind the prototype */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10"
        style={{
          background:
            'radial-gradient(58% 56% at 50% 42%, color-mix(in srgb, var(--brand) 16%, transparent), transparent 72%)',
        }}
      />
      {children}
    </div>
  );
}

// ── Row 1 — live video call with the AI ─────────────────────────────────────────
function CallVisual() {
  const reduce = useReducedMotion();
  const bars = [6, 11, 7, 13, 8, 12, 7, 10];
  return (
    <Panel>
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_36px_80px_-34px_rgba(20,18,16,0.4)]">
        {/* Video stage */}
        <div className="relative aspect-[4/3] bg-ink-deep">
          {/* status row */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3.5 py-3">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[9px] font-medium tracking-wide text-white/85">LIVE</span>
            </span>
            <span className="rounded-full bg-white/10 px-2 py-1 font-mono text-[9px] text-white/70 backdrop-blur-sm">
              04:12
            </span>
          </div>

          {/* AI participant */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(180deg, var(--brand-light), var(--brand))' }}>
              <span className="text-base font-bold text-white">AI</span>
              <span className="absolute -inset-1.5 rounded-full ring-2 ring-brand/40" />
            </div>
            {/* speaking meter */}
            <div className="flex h-3.5 items-end gap-[3px]">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-brand-light"
                  style={{ height: h }}
                  animate={reduce ? undefined : { scaleY: [1, 0.45, 1.15, 0.7, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.07 }}
                />
              ))}
            </div>
          </div>

          {/* name tag */}
          <div className="absolute bottom-2.5 left-2.5 z-10 rounded-md bg-white/10 px-2 py-1 backdrop-blur-sm">
            <span className="text-[10px] font-medium text-white">Enterprise Buyer</span>
            <span className="ml-1.5 text-[9px] text-white/55">AI Persona</span>
          </div>
          {/* self view */}
          <div className="absolute bottom-2.5 right-2.5 z-10 flex h-9 w-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.06]">
            <span className="text-[8px] font-medium text-white/60">You</span>
          </div>
        </div>

        {/* live caption */}
        <div className="border-t border-line px-4 py-3">
          <p className="text-[11.5px] leading-snug text-ink-3">
            <span className="font-semibold text-brand">“</span>
            We already have a vendor for this — why should we switch?
            <span className="font-semibold text-brand">”</span>
          </p>
        </div>

        {/* controls */}
        <div className="flex items-center justify-center gap-2.5 border-t border-mist px-4 py-3">
          <Ctl icon={Mic} />
          <Ctl icon={Video} />
          <Ctl icon={Captions} />
          <span className="flex h-8 w-10 items-center justify-center rounded-full bg-red-500 text-white">
            <PhoneOff className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Panel>
  );
}

function Ctl({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-ink-3">
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </span>
  );
}

// ── Row 2 — adaptive progression: a skill radar that flags the weakest axis ──────
// Decorative prototype data (not protected section copy). Six axes read as a
// filled shape rather than the sparse triangle three would give; the lowest
// score is the "gap" the recommended drill below then targets.
const RADAR_SKILLS = [
  { n: 'Objection', v: 56, gap: true },
  { n: 'Discovery', v: 88 },
  { n: 'Value', v: 72 },
  { n: 'Closing', v: 64 },
  { n: 'Rapport', v: 91 },
  { n: 'Negotiation', v: 69 },
];

// Geometry — top vertex first, clockwise. viewBox units ≈ rendered px / 1.6.
const R_CX = 120;
const R_CY = 100;
const R_MAX = 60;
const R_N = RADAR_SKILLS.length;
const radarAngle = (i: number) => (-90 + (360 / R_N) * i) * (Math.PI / 180);
const radarPoint = (i: number, radius: number): [number, number] => [
  R_CX + radius * Math.cos(radarAngle(i)),
  R_CY + radius * Math.sin(radarAngle(i)),
];
const ringPoints = (frac: number) =>
  RADAR_SKILLS.map((_, i) => radarPoint(i, R_MAX * frac).join(',')).join(' ');
const valuePoints = RADAR_SKILLS.map((s, i) => radarPoint(i, (s.v / 100) * R_MAX).join(',')).join(' ');

function AdaptVisual() {
  const reduce = useReducedMotion();
  // Observe an HTML element, not the SVG <g>: WebKit/Safari does not reliably
  // fire IntersectionObserver on SVG sub-elements, so a whileInView on the
  // group never resolved on iOS and the value shape shipped stuck at opacity 0.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <Panel>
      <div ref={ref} className="rounded-2xl border border-line bg-white p-6 shadow-[0_36px_80px_-34px_rgba(20,18,16,0.4)] lg:p-7">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-faint">Skill Map</p>
            <p className="text-sm font-semibold text-ink">Adapts to you</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-mist px-2 py-0.5 text-[10px] font-medium text-muted">
            <span className="relative flex h-1.5 w-1.5">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            Updated live
          </span>
        </div>

        {/* Radar */}
        <div className="text-brand">
          <svg
            viewBox="0 0 240 200"
            className="w-full"
            role="img"
            aria-label="Skill radar across six competencies, with Objection Handling flagged as the current gap"
          >
            {/* grid rings + spokes */}
            <g style={{ stroke: 'var(--line)' }} fill="none" strokeWidth={1}>
              {[0.25, 0.5, 0.75, 1].map((f) => (
                <polygon key={f} points={ringPoints(f)} strokeOpacity={f === 1 ? 0.9 : 0.5} />
              ))}
              {RADAR_SKILLS.map((_, i) => {
                const [x, y] = radarPoint(i, R_MAX);
                return <line key={i} x1={R_CX} y1={R_CY} x2={x} y2={y} strokeOpacity={0.45} />;
              })}
            </g>

            {/* value shape */}
            <defs>
              <radialGradient id="radarFill" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.34} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0.12} />
              </radialGradient>
            </defs>
            <motion.g
              initial={reduce ? false : { scale: 0.78, opacity: 0 }}
              animate={reduce ? undefined : inView ? { scale: 1, opacity: 1 } : { scale: 0.78, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <polygon
                points={valuePoints}
                fill="url(#radarFill)"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinejoin="round"
              />
              {RADAR_SKILLS.map((s, i) => {
                const [x, y] = radarPoint(i, (s.v / 100) * R_MAX);
                return s.gap ? (
                  <g key={i}>
                    {!reduce && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={4}
                        fill="currentColor"
                        animate={{ r: [4, 9], opacity: [0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <circle cx={x} cy={y} r={4} fill="currentColor" stroke="#fff" strokeWidth={1.5} />
                  </g>
                ) : (
                  <circle key={i} cx={x} cy={y} r={2.4} fill="currentColor" stroke="#fff" strokeWidth={1} />
                );
              })}
            </motion.g>

            {/* axis labels */}
            <g fontSize={9}>
              {RADAR_SKILLS.map((s, i) => {
                const [x, y] = radarPoint(i, R_MAX + 15);
                const c = Math.cos(radarAngle(i));
                const anchor = Math.abs(c) < 0.35 ? 'middle' : c > 0 ? 'start' : 'end';
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    style={{ fill: s.gap ? 'var(--brand)' : 'var(--muted)', fontWeight: s.gap ? 700 : 500 }}
                  >
                    {s.n}
                  </text>
                );
              })}
            </g>
          </svg>
        </div>

        {/* recommended next — targets the flagged gap */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-brand/20 bg-brand/[0.06] px-3.5 py-3">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-brand">Recommended next</p>
            <p className="mt-0.5 text-[13px] font-semibold text-ink">Price Objection Drill</p>
          </div>
          <span className="flex items-center gap-1 rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-semibold text-white">
            Start <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </Panel>
  );
}

// Catmull-Rom → cubic-bézier, for a smooth sparkline through the data points.
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

// ── Row 3 — measurable readiness dashboard ──────────────────────────────────────
function ReadinessVisual() {
  // Weekly readiness across the quarter, landing on the headline 84%.
  const series = [49, 54, 51, 60, 66, 71, 77, 84];
  const lastQ = 66; // last quarter's average → the "↑18% vs last" reference line
  const team = [
    { i: 'S', n: 'Sarah M.', v: 94, d: '+8' },
    { i: 'J', n: 'James L.', v: 87, d: '+12' },
    { i: 'L', n: 'Léa D.', v: 81, d: '+5' },
  ];

  // Chart geometry (viewBox units). Domain padded so the curve uses the height.
  const W = 304, H = 92, padX = 5, padTop = 11, padBot = 8;
  const dMin = 42, dMax = 92;
  const usableH = H - padTop - padBot;
  const baseY = H - padBot;
  const px = (i: number) => padX + (i * (W - padX * 2)) / (series.length - 1);
  const py = (v: number) => padTop + (1 - (v - dMin) / (dMax - dMin)) * usableH;
  const pts = series.map((v, i) => ({ x: px(i), y: py(v) }));
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(2)},${baseY} L ${pts[0].x.toFixed(2)},${baseY} Z`;
  const lastY = py(lastQ);
  const end = pts[pts.length - 1];

  return (
    <Panel>
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_36px_80px_-34px_rgba(20,18,16,0.4)] lg:p-7">
        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-faint">Team Readiness</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">This quarter</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[26px] font-bold leading-none text-ink">84<span className="text-base">%</span></p>
            <p className="mt-1 text-[10px] font-semibold text-emerald-600">↑ 18% vs last</p>
          </div>
        </div>

        {/* readiness trend — this quarter climbing past last quarter's line */}
        <div className="relative mt-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="readyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* last-quarter reference */}
            <line x1={padX} y1={lastY} x2={W - padX} y2={lastY}
              stroke="var(--edge)" strokeWidth="1" strokeDasharray="3 3" />
            {/* this quarter */}
            <path d={area} fill="url(#readyFill)" />
            <path d={line} stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* endpoint */}
            <circle cx={end.x} cy={end.y} r="6.5" fill="var(--brand)" opacity="0.14" />
            <circle cx={end.x} cy={end.y} r="3.5" fill="var(--brand)" stroke="#fff" strokeWidth="2" />
          </svg>
          <span
            className="pointer-events-none absolute right-0 text-[9px] font-medium text-faint"
            style={{ top: `${(lastY / H) * 100}%`, transform: 'translateY(-135%)' }}
          >
            last qtr
          </span>
        </div>
        <div className="mt-1.5 flex justify-between px-0.5 text-[9px] font-medium text-faint">
          <span>Apr</span><span>May</span><span>Jun</span>
        </div>

        {/* team rows */}
        <div className="mt-5 space-y-2.5 border-t border-mist pt-4">
          {team.map((m) => (
            <div key={m.n} className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-mist text-[10px] font-semibold text-body">
                {m.i}
              </span>
              <span className="w-16 truncate text-[11px] font-medium text-ink-3">{m.n}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist">
                <div className="h-full rounded-full bg-brand" style={{ width: `${m.v}%` }} />
              </div>
              <span className="w-8 text-right font-mono text-[11px] text-ink-2">{m.v}%</span>
              <span className="w-7 text-right text-[10px] font-medium text-emerald-600">{m.d}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

const VISUALS: ComponentType[] = [CallVisual, AdaptVisual, ReadinessVisual];
const ROW_ICONS: LucideIcon[] = [Video, Sparkles, BarChart3];

// ── Section ─────────────────────────────────────────────────────────────────────
export function ValueRows({ headline, headlineItalic, body, items }: Props) {
  return (
    <section className="section-padding overflow-hidden bg-canvas">
      <div className="mx-auto max-w-content px-6">
        {/* Thesis text first */}
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="display-heading text-ink" style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.1 }}>
            {headline}
            {headlineItalic && (
              <>
                {' '}
                <SoftAppIcon className="inline-block h-[1.05em] w-[1.05em] translate-y-[0.13em] align-baseline mr-[0.12em] drop-shadow-[0_2px_7px_rgba(68,114,202,0.3)]" />
                {headlineItalic}
              </>
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-snug text-muted">{body}</p>
        </FadeIn>

        {/* Product showcase — below the thesis. Held to a focused width so the
            dense console reads as a crisp product shot with breathing room on
            either side, not a full-bleed banner. */}
        <FadeIn className="mx-auto mb-20 w-full max-w-[920px] lg:mb-28">
          <div className="relative">
            {/* soft brand glow behind the console */}
            <div
              aria-hidden="true"
              className="absolute -inset-x-8 -top-10 bottom-[-6%] -z-10"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 40%, color-mix(in srgb, var(--brand) 18%, transparent), transparent 72%)',
              }}
            />
            <LiveCallConsole />
          </div>
        </FadeIn>

        {/* Alternating rows */}
        <div className="space-y-20 lg:space-y-28">
          {items.map((item, i) => {
            const Visual = VISUALS[i % VISUALS.length];
            const Icon = ROW_ICONS[i % ROW_ICONS.length];
            const textLeft = i % 2 === 0;
            return (
              <div key={i} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Text */}
                <FadeIn
                  direction={textLeft ? 'left' : 'right'}
                  className={textLeft ? 'lg:order-1' : 'lg:order-2'}
                >
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-inset ring-brand/15">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3
                    className="font-semibold text-ink"
                    style={{ fontSize: 'clamp(1.45rem, 2.2vw, 1.85rem)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[44ch] text-[15px] leading-snug text-body lg:text-base">
                    {item.body}
                  </p>
                </FadeIn>

                {/* Visual */}
                <FadeIn
                  direction={textLeft ? 'right' : 'left'}
                  delay={0.1}
                  className={textLeft ? 'lg:order-2' : 'lg:order-1'}
                >
                  <Visual />
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
