'use client';

import { type ReactNode, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW_MID, SW_THIN, useIlloId } from '@/components/illustrations/_shared';

// ─── Animation ───────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Pillar illustrations — refined line + brand-blue accent ─────────────────

function PracticeIllustration() {
  const id = useIlloId();
  const c = illoColors('light');
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <AccentDefs id={id} />
      <Glow id={id} cx={128} cy={80} r={46} />
      {/* Conversation panel */}
      <rect x="26" y="26" width="148" height="108" rx="14" fill={c.panel} stroke={c.inkFaint} strokeWidth={SW_MID} />
      {/* Incoming lines */}
      <rect x="42" y="46" width="62" height="16" rx="8" stroke={c.inkMid} strokeWidth={SW_THIN} />
      <rect x="42" y="98" width="46" height="16" rx="8" stroke={c.inkMid} strokeWidth={SW_THIN} />
      {/* Outgoing — brand-blue reply with voice dots */}
      <rect x="92" y="72" width="66" height="18" rx="9" fill={`url(#${id}-accent)`} />
      {[110, 125, 140].map((x) => (
        <circle key={x} cx={x} cy="81" r="2.4" fill={c.accentInk} />
      ))}
    </svg>
  );
}

function AdaptIllustration() {
  const id = useIlloId();
  const c = illoColors('light');
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <AccentDefs id={id} />
      <Glow id={id} cx={100} cy={52} r={40} />
      {/* Branches from a single start */}
      <path d="M 100 120 C 100 96 64 86 60 66" stroke={c.inkFaint} strokeWidth={SW_MID} fill="none" strokeLinecap="round" />
      <path d="M 100 120 C 100 96 140 86 140 66" stroke={c.inkFaint} strokeWidth={SW_MID} fill="none" strokeLinecap="round" />
      <path d="M 100 120 L 100 70" stroke={c.accent} strokeWidth={SW_MID} fill="none" strokeLinecap="round" />
      {/* Side nodes */}
      <circle cx="60" cy="58" r="8" fill={c.panel} stroke={c.inkMid} strokeWidth={SW_MID} />
      <circle cx="140" cy="58" r="8" fill={c.panel} stroke={c.inkMid} strokeWidth={SW_MID} />
      {/* Chosen node — accent */}
      <circle cx="100" cy="54" r="12" fill={`url(#${id}-accent)`} />
      {/* Start node */}
      <circle cx="100" cy="124" r="8" fill={c.panel} stroke={c.ink} strokeWidth={SW_MID} />
    </svg>
  );
}

function DashboardIllustration() {
  const id = useIlloId();
  const c = illoColors('light');
  const bars = [
    { x: 50, h: 34, fill: c.inkFaint },
    { x: 74, h: 52, fill: c.inkMid },
    { x: 98, h: 40, fill: c.inkFaint },
  ];
  return (
    <svg viewBox="0 0 200 160" fill="none" className="h-full w-full">
      <AccentDefs id={id} />
      <Glow id={id} cx={128} cy={84} r={46} />
      {/* Panel */}
      <rect x="24" y="28" width="152" height="104" rx="14" fill={c.panel} stroke={c.inkFaint} strokeWidth={SW_MID} />
      <line x1="44" y1="112" x2="156" y2="112" stroke={c.inkFaint} strokeWidth={SW_THIN} strokeLinecap="round" />
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={112 - b.h} width="12" height={b.h} rx="4" fill={b.fill} />
      ))}
      {/* Tallest bar — accent */}
      <rect x="122" y="46" width="12" height="66" rx="4" fill={`url(#${id}-accent)`} />
      <circle cx="128" cy="46" r="3.5" fill={c.accent} />
    </svg>
  );
}

const ILLUSTRATIONS = [PracticeIllustration, AdaptIllustration, DashboardIllustration];

// ─── Types ───────────────────────────────────────────────────────────────────

interface Pillar {
  icon: ReactNode;
  title: string;
  body: string;
  visual?: ReactNode;
}

interface ThreePillarsProps {
  headline?: string;
  sectionLabel?: string;
  sectionHeadline?: string;
  sectionHeadlineItalic?: string;
  sectionBody?: string;
  pillars: [Pillar, Pillar, Pillar];
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ThreePillars({
  sectionLabel,
  sectionHeadline,
  sectionHeadlineItalic,
  sectionBody,
  pillars,
}: ThreePillarsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-20 lg:py-28 bg-canvas">
      <div className="max-w-content mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {/* ── Featured headline card (spans 2 cols on lg) ── */}
          {sectionHeadline && (
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 lg:col-span-2 row-span-1"
            >
              <div
                className="h-full rounded-2xl border border-line/80 p-8 lg:p-10 flex flex-col justify-center"
                style={{ background: '#FFFFFF' }}
              >
                {sectionLabel && (
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint mb-4">
                    {sectionLabel}
                  </p>
                )}
                <h2
                  className="font-bold text-ink mb-4"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
                >
                  {sectionHeadline}{' '}
                  {sectionHeadlineItalic && (
                    <span className="not-italic">{sectionHeadlineItalic}</span>
                  )}
                </h2>
                {sectionBody && (
                  <p className="text-sm text-muted leading-snug max-w-lg">
                    {sectionBody}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Pillar card 1 (tall card on right of headline) ── */}
          <motion.div variants={itemVariants} className="lg:row-span-1">
            <BentoCard pillar={pillars[0]} index={0} tall />
          </motion.div>

          {/* ── Pillar cards 2 & 3 (bottom row, half each) ── */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <BentoCard pillar={pillars[1]} index={1} />
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2">
            <BentoCard pillar={pillars[2]} index={2} wide />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Bento card ──────────────────────────────────────────────────────────────

function BentoCard({ pillar, index, tall, wide }: { pillar: Pillar; index: number; tall?: boolean; wide?: boolean }) {
  const Illustration = ILLUSTRATIONS[index];

  return (
    <div
      className="group h-full rounded-2xl border border-line/80 overflow-hidden transition-all duration-300 hover:border-edge hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
      style={{ background: '#FFFFFF' }}
    >
      <div className={`flex flex-col h-full ${tall ? 'min-h-[320px]' : ''}`}>
        {/* Illustration area */}
        <div className={`relative overflow-hidden border-b border-mist bg-surface/50 flex items-center justify-center ${tall ? 'flex-1 min-h-[160px]' : 'h-[140px]'} ${wide ? 'lg:h-[160px]' : ''}`}>
          <div className={`${wide ? 'w-48 h-36' : 'w-40 h-32'} transition-transform duration-500 group-hover:scale-105`}>
            {Illustration && <Illustration />}
          </div>
        </div>

        {/* Text area */}
        <div className={`p-6 ${wide ? 'lg:p-7' : ''}`}>
          <h3 className="text-[15px] font-semibold text-ink mb-1.5">{pillar.title}</h3>
          <p className="text-[13px] text-muted leading-snug">{pillar.body}</p>
        </div>
      </div>
    </div>
  );
}
