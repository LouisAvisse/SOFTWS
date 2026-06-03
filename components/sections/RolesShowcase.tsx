'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { Users, TrendingUp, Headphones, BookOpen, ArrowRight, type LucideIcon } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface RoleData {
  label: string;
  body: string;
  scenario: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
}

interface RolesShowcaseProps {
  eyebrow: string;
  headline: string;
  roles: RoleData[];
  learnMoreLabel: string;
  avgLabel: string;
}

const ROLE_ICONS: LucideIcon[] = [TrendingUp, Users, Headphones, BookOpen];

// ─── Scroll choreography ───────────────────────────────────────────────────────
// A short lead beat (title only), then each card gets an equal slice of scroll
// to fly up and land; a short tail holds the finished pile. The lead is kept
// small so the first card arrives almost as soon as the section pins, instead
// of leaving a long empty stage on entry.
const LEAD = 0.05;
const TAIL = 0.05;

// ─── Metric bar ──────────────────────────────────────────────────────────────

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[12px] text-body">{label}</span>
        <span className="font-mono text-[12px] font-semibold text-ink">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ─── A single role card (static content) ──────────────────────────────────────

function RoleCard({
  role,
  icon: Icon,
  index,
  total,
  learnMoreLabel,
  avgLabel,
}: {
  role: RoleData;
  icon: LucideIcon;
  index: number;
  total: number;
  learnMoreLabel: string;
  avgLabel: string;
}) {
  const m1 = parseInt(role.metric1Value, 10) || 0;
  const m2 = parseInt(role.metric2Value, 10) || 0;
  const avg = Math.round((m1 + m2) / 2);

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-line bg-white p-5 shadow-[0_24px_56px_-30px_rgba(20,18,16,0.36)] lg:p-6">
      <div className="flex items-start gap-3.5">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-inset ring-brand/15">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-faint">
            {role.scenario}
          </p>
          <h3 className="mt-0.5 text-lg font-semibold text-ink lg:text-[20px]">{role.label}</h3>
        </div>
        <div className="ml-auto flex flex-col items-end pl-3">
          <span className="font-mono text-[22px] font-bold leading-none text-ink">{avg}</span>
          <span className="mt-0.5 text-[10px] text-faint">{avgLabel}</span>
        </div>
      </div>

      <p className="mt-3 max-w-[46ch] text-[13.5px] leading-relaxed text-ink-3">{role.body}</p>

      <div className="mt-5 space-y-3">
        <MetricBar label={role.metric1Label} value={m1} />
        <MetricBar label={role.metric2Label} value={m2} />
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-mist pt-3.5">
        <span className="text-[11px] font-medium text-faint">{`${index + 1} / ${total}`}</span>
        <Link
          href="/use-cases"
          className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors hover:text-brand"
        >
          {learnMoreLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

// ─── A card wrapped in scroll-driven stacking motion ───────────────────────────

function StackCard({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const span = (1 - LEAD - TAIL) / total;
  const start = LEAD + index * span;
  const end = start + span;
  const depth = total - 1 - index; // cards that will eventually land on top
  const restTilt = depth === 0 ? 0 : index % 2 ? 0.8 : -0.8;

  // Fly up from below → land as the top sheet → recede into a thin stacked edge
  // (only ~10px per card peeks) as later sheets land on top.
  const y = useTransform(progress, [start, end, 1], [440, 0, -depth * 10]);
  const scale = useTransform(progress, [start, end], [0.92, 1]);
  const rotate = useTransform(progress, [start, end, 1], [index % 2 ? 3.5 : -3.5, 0, restTilt]);
  const opacity = useTransform(progress, [start, start + span * 0.28], [0, 1]);

  return (
    <motion.div
      style={{ y, scale, rotate, opacity, zIndex: index }}
      className="absolute inset-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

// ─── Progress dot ──────────────────────────────────────────────────────────────

function StackDot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  const span = (1 - LEAD - TAIL) / total;
  const landed = LEAD + index * span + span * 0.7;
  const scale = useTransform(progress, [landed - 0.02, landed], [1, 1.5]);
  const opacity = useTransform(progress, [landed - 0.02, landed], [0.3, 1]);
  return (
    <motion.span style={{ scale, opacity }} className="h-1.5 w-1.5 rounded-full bg-brand" />
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────

function Header({ eyebrow, headline }: { eyebrow: string; headline: string }) {
  return (
    <>
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">{eyebrow}</p>
      <h2
        className="display-heading text-ink"
        style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.1 }}
      >
        {headline}
      </h2>
    </>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function RolesShowcase({ eyebrow, headline, roles, learnMoreLabel, avgLabel }: RolesShowcaseProps) {
  const total = roles.length;
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Progress 0→1 across the pinned scroll: 0 when the section top reaches the
  // viewport top, 1 when its bottom reaches the viewport bottom. Computed
  // directly from geometry for a reliable, predictable mapping.
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const denom = r.height - window.innerHeight;
      const p = denom > 0 ? Math.min(1, Math.max(0, -r.top / denom)) : 0;
      scrollYProgress.set(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [scrollYProgress]);

  // Reduced motion / no-scroll fallback: a clean stacked list, no pinning.
  if (reduce) {
    return (
      <section className="section-padding bg-canvas">
        <div className="mx-auto max-w-content px-6">
          <div className="mb-12 text-center">
            <Header eyebrow={eyebrow} headline={headline} />
          </div>
          <div className="mx-auto grid max-w-[540px] gap-4">
            {roles.map((role, i) => (
              <RoleCard
                key={i}
                role={role}
                icon={ROLE_ICONS[i % ROLE_ICONS.length]}
                index={i}
                total={total}
                learnMoreLabel={learnMoreLabel}
                avgLabel={avgLabel}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-canvas"
      style={{ height: `${total * 56 + 40}vh` }}
    >
      {/* Title + deck are centered as one group in the pinned viewport, so the
          heading sits right above the pile with balanced breathing room above
          and below — connected, not stranded at the top with a void beneath. */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 pt-[60px]">
        <div className="w-full max-w-content text-center">
          <Header eyebrow={eyebrow} headline={headline} />
          <div className="mt-5 flex items-center justify-center gap-2">
            {roles.map((_, i) => (
              <StackDot key={i} index={i} total={total} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        <div
          className="relative w-full max-w-[540px]"
          style={{ height: 'clamp(242px, 31vh, 276px)', marginTop: 'clamp(30px, 5vh, 60px)' }}
        >
            {roles.map((role, i) => (
              <StackCard key={i} index={i} total={total} progress={scrollYProgress}>
                <RoleCard
                  role={role}
                  icon={ROLE_ICONS[i % ROLE_ICONS.length]}
                  index={i}
                  total={total}
                  learnMoreLabel={learnMoreLabel}
                  avgLabel={avgLabel}
                />
              </StackCard>
            ))}
        </div>
      </div>
    </section>
  );
}
