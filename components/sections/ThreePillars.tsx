'use client';

import { type ReactNode, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

// ─── Animation ───────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Isometric illustrations (fine-line, minimal) ────────────────────────────

function PracticeIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Isometric chat interface */}
      <g stroke="#d4d4d8" strokeWidth="1">
        {/* Main panel */}
        <path d="M30 120 L100 80 L170 120 L100 160 Z" fill="#fafafa" />
        <path d="M30 120 L30 80 L100 40 L100 80" fill="#f4f4f5" />
        <path d="M100 40 L170 80 L170 120 L100 80" fill="#f0f0f1" />
        {/* Chat bubbles */}
        <rect x="50" y="65" width="40" height="12" rx="3" fill="white" stroke="#e4e4e7" />
        <rect x="95" y="50" width="35" height="12" rx="3" fill="#18181b" stroke="#18181b" />
        <rect x="55" y="80" width="30" height="12" rx="3" fill="white" stroke="#e4e4e7" />
        {/* Mic icon */}
        <circle cx="145" cy="55" r="10" fill="white" stroke="#d4d4d8" />
        <rect x="143" y="49" width="4" height="8" rx="2" fill="#a1a1aa" />
        <path d="M140 55 Q140 61 145 61 Q150 61 150 55" stroke="#a1a1aa" strokeWidth="0.8" fill="none" />
      </g>
    </svg>
  );
}

function AdaptIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Isometric branching path */}
      <g stroke="#d4d4d8" strokeWidth="1">
        {/* Base platform */}
        <path d="M30 130 L100 90 L170 130 L100 170 Z" fill="#fafafa" />
        <path d="M30 130 L30 100 L100 60 L100 90" fill="#f4f4f5" />
        <path d="M100 60 L170 100 L170 130 L100 90" fill="#f0f0f1" />
        {/* Path nodes */}
        <circle cx="70" cy="95" r="6" fill="white" stroke="#d4d4d8" />
        <circle cx="100" cy="75" r="7" fill="#18181b" stroke="#18181b" />
        <circle cx="130" cy="95" r="6" fill="white" stroke="#d4d4d8" />
        <circle cx="85" cy="55" r="5" fill="white" stroke="#e4e4e7" />
        <circle cx="115" cy="55" r="5" fill="white" stroke="#e4e4e7" />
        {/* Connecting lines */}
        <line x1="76" y1="92" x2="93" y2="78" stroke="#d4d4d8" strokeWidth="0.8" />
        <line x1="107" y1="78" x2="124" y2="92" stroke="#d4d4d8" strokeWidth="0.8" />
        <line x1="96" y1="69" x2="88" y2="58" stroke="#e4e4e7" strokeWidth="0.8" />
        <line x1="104" y1="69" x2="112" y2="58" stroke="#e4e4e7" strokeWidth="0.8" />
        {/* Arrow tip */}
        <path d="M100 68 L97 73 L103 73 Z" fill="#18181b" />
      </g>
    </svg>
  );
}

function DashboardIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Isometric dashboard */}
      <g stroke="#d4d4d8" strokeWidth="1">
        {/* Main screen */}
        <path d="M25 125 L100 85 L175 125 L100 165 Z" fill="#fafafa" />
        <path d="M25 125 L25 85 L100 45 L100 85" fill="#f4f4f5" />
        <path d="M100 45 L175 85 L175 125 L100 85" fill="#f0f0f1" />
        {/* Bar chart bars */}
        <rect x="50" y="78" width="8" height="20" rx="1" fill="#e4e4e7" />
        <rect x="62" y="68" width="8" height="30" rx="1" fill="#d4d4d8" />
        <rect x="74" y="60" width="8" height="38" rx="1" fill="#18181b" />
        <rect x="86" y="72" width="8" height="26" rx="1" fill="#a1a1aa" />
        {/* Score circle */}
        <circle cx="140" cy="70" r="16" fill="white" stroke="#e4e4e7" />
        <circle cx="140" cy="70" r="12" fill="none" stroke="#18181b" strokeWidth="2" strokeDasharray="50 25" />
        <text x="140" y="73" textAnchor="middle" fontSize="8" fontWeight="700" fill="#18181b" fontFamily="system-ui">84</text>
        {/* Trend line */}
        <polyline points="45,100 65,94 85,96 105,88 125,82 145,78" stroke="#a1a1aa" strokeWidth="0.8" fill="none" />
      </g>
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
    <section className="py-20 lg:py-28" style={{ background: '#FAFAF9' }}>
      <div className="max-w-[1050px] mx-auto px-6">
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
                className="h-full rounded-2xl border border-zinc-200/80 p-8 lg:p-10 flex flex-col justify-center"
                style={{ background: '#FFFFFF' }}
              >
                {sectionLabel && (
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400 mb-4">
                    {sectionLabel}
                  </p>
                )}
                <h2
                  className="font-bold text-zinc-900 mb-4"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
                >
                  {sectionHeadline}{' '}
                  {sectionHeadlineItalic && (
                    <span className="italic">{sectionHeadlineItalic}</span>
                  )}
                </h2>
                {sectionBody && (
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-lg">
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
      className="group h-full rounded-2xl border border-zinc-200/80 overflow-hidden transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
      style={{ background: '#FFFFFF' }}
    >
      <div className={`flex flex-col h-full ${tall ? 'min-h-[320px]' : ''}`}>
        {/* Illustration area */}
        <div className={`relative overflow-hidden border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-center ${tall ? 'flex-1 min-h-[160px]' : 'h-[140px]'} ${wide ? 'lg:h-[160px]' : ''}`}>
          <div className={`${wide ? 'w-48 h-36' : 'w-40 h-32'} transition-transform duration-500 group-hover:scale-105`}>
            {Illustration && <Illustration />}
          </div>
        </div>

        {/* Text area */}
        <div className={`p-6 ${wide ? 'lg:p-7' : ''}`}>
          <h3 className="text-[15px] font-semibold text-zinc-900 mb-1.5">{pillar.title}</h3>
          <p className="text-[13px] text-zinc-500 leading-relaxed">{pillar.body}</p>
        </div>
      </div>
    </div>
  );
}
