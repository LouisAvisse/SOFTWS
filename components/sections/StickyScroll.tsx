'use client';

import { type ReactNode, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step {
  label: string;
  title: string;
  body: string;
  visual?: ReactNode;
}

interface StickyScrollProps {
  headline: string;
  intro?: string;
  steps: Step[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;
const NUM = 4;

// ─── Step visuals ────────────────────────────────────────────────────────────

function RehearseVisual() {
  return (
    <div className="bg-white rounded-xl border border-line/80 p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">AI</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-ink-2">Enterprise Buyer</p>
          <p className="text-[10px] text-faint">AI Persona</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-faint font-mono">Live</span>
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="bg-surface rounded-lg px-3 py-2 max-w-[88%]">
          <p className="text-[11px] text-body leading-relaxed">&ldquo;We already have a vendor for this. Why should we switch?&rdquo;</p>
        </div>
        <div className="bg-ink rounded-lg px-3 py-2 max-w-[82%] ml-auto">
          <p className="text-[11px] text-white leading-relaxed">&ldquo;Totally fair — most teams we work with had one too. The difference is...&rdquo;</p>
        </div>
        <div className="bg-surface rounded-lg px-3 py-2 max-w-[60%]">
          <p className="text-[11px] text-faint italic">Typing...</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-mist mt-3">
        <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center border border-red-200">
          <div className="w-2 h-2 rounded-full bg-red-400" />
        </div>
        <div className="flex-1 h-5 bg-surface rounded border border-mist flex items-center px-2">
          <div className="flex gap-px">
            {[4, 8, 5, 10, 6, 12, 7, 9, 5, 11, 6, 8].map((h, i) => (
              <div key={i} className="w-0.5 bg-edge rounded-full" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
        <span className="text-[10px] text-faint font-mono">02:34</span>
      </div>
    </div>
  );
}

function AnalyzeVisual() {
  const scores = [
    { label: 'Objection Handling', value: 82 },
    { label: 'Discovery Quality', value: 91 },
    { label: 'Value Articulation', value: 68 },
  ];
  return (
    <div className="bg-white rounded-xl border border-line/80 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] text-faint uppercase tracking-wider font-medium">Scorecard</p>
          <p className="text-sm font-semibold text-ink">Discovery Call</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-mono text-ink">84<span className="text-sm">%</span></p>
          <p className="text-[10px] text-emerald-600 font-medium">+12 vs last</p>
        </div>
      </div>
      <div className="space-y-3">
        {scores.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted">{s.label}</span>
              <span className="font-mono font-semibold text-ink-2">{s.value}%</span>
            </div>
            <div className="h-1.5 bg-mist rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full" style={{ width: `${s.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdaptVisual() {
  const drills = [
    { name: 'Price Objection Drill', tag: 'Hard', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
    { name: 'Discovery Deep-Dive', tag: 'Medium', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
    { name: 'Closing Sequence', tag: 'New', cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  ];
  return (
    <div className="bg-white rounded-xl border border-line/80 p-5 shadow-sm">
      <p className="text-[10px] text-faint uppercase tracking-wider font-medium mb-0.5">Your Drill Pack</p>
      <p className="text-sm font-semibold text-ink mb-4">Personalized for you</p>
      <div className="space-y-2">
        {drills.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between bg-surface border border-mist rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-faint font-mono">{i + 1}.</span>
              <p className="text-[11px] font-medium text-ink-3">{d.name}</p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${d.cls}`}>{d.tag}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] text-faint">Weekly progress</span>
          <span className="text-[10px] font-mono text-ink-2 font-semibold">65%</span>
        </div>
        <div className="h-1.5 bg-mist rounded-full overflow-hidden">
          <div className="h-full bg-brand rounded-full" style={{ width: '65%' }} />
        </div>
      </div>
    </div>
  );
}

function ScaleVisual() {
  const team = [
    { name: 'Sarah M.', role: 'AE', score: 94, delta: '+8' },
    { name: 'James L.', role: 'SDR', score: 87, delta: '+12' },
    { name: 'Léa D.', role: 'CS', score: 81, delta: '+5' },
    { name: 'Tom R.', role: 'AM', score: 76, delta: '+15' },
  ];
  return (
    <div className="bg-white rounded-xl border border-line/80 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] text-faint uppercase tracking-wider font-medium">Team Dashboard</p>
          <p className="text-sm font-semibold text-ink">Q1 Readiness</p>
        </div>
        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">↑ 18% avg</span>
      </div>
      <div className="space-y-2.5">
        {team.map((m) => (
          <div key={m.name} className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-line flex items-center justify-center text-[10px] font-medium text-body flex-shrink-0">
              {m.name[0]}
            </div>
            <div className="w-14 truncate">
              <p className="text-[11px] font-medium text-ink-3 truncate">{m.name}</p>
              <p className="text-[9px] text-faint">{m.role}</p>
            </div>
            <div className="flex-1 h-1.5 bg-mist rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full" style={{ width: `${m.score}%` }} />
            </div>
            <span className="text-[11px] font-mono text-ink-2 w-7 text-right">{m.score}%</span>
            <span className="text-[10px] text-emerald-600 font-medium w-6 text-right">{m.delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEP_VISUALS = [RehearseVisual, AnalyzeVisual, AdaptVisual, ScaleVisual];

// ─── Stepper Design Architecture ──────────────────────────────────────────────

export function StickyScroll({ headline, intro, steps }: StickyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section className="bg-canvas py-24 md:py-32 overflow-hidden" id="how-it-works">
      <div className="max-w-content mx-auto px-6">
        
        {/* Headline Row */}
        <FadeIn className="text-center mb-20 md:mb-28">
          <h2
            className="display-heading text-ink mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            {headline}
          </h2>
          {intro && <p className="text-sm text-muted leading-relaxed">{intro}</p>}
        </FadeIn>

        {/* Vertical Stepper Container */}
        <div className="relative" ref={containerRef}>
          
          {/* Static Background Track Line */}
          <div className="absolute top-2 md:top-6 bottom-4 md:bottom-2 left-[15px] md:left-[39px] w-[1px] bg-line" />
          
          {/* Dynamic Scroll-Fill Track Line */}
          <motion.div
            className="absolute top-2 md:top-6 bottom-4 md:bottom-2 left-[14px] md:left-[38px] w-[3px] rounded-full bg-brand origin-top"
            style={{ scaleY: prefersReduced ? 1 : scrollYProgress }}
          />

          <div className="flex flex-col gap-20 md:gap-32 relative z-10 pb-8">
            {steps.slice(0, 4).map((step, i) => {
              const Visual = STEP_VISUALS[i % STEP_VISUALS.length];
              
              return (
                <motion.div 
                  key={i}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20%' }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="relative flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-24 pl-12 md:pl-28"
                >
                  {/* Step Dot Ring */}
                  <div className="absolute left-[11.5px] md:left-[35.5px] top-[14px] md:top-1/2 md:-translate-y-1/2 w-[8px] h-[8px] rounded-full bg-brand ring-[4px] ring-white outline outline-1 outline-brand/30 z-10" />

                  {/* Left: Text Structure */}
                  <div className="w-full md:w-[45%] text-left shrink-0">
                    <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-[6px] border border-line bg-white mb-6 shadow-sm">
                      <span className="text-[10px] font-bold tracking-widest text-[#5c5c5c] uppercase">
                        {step.label || `STEP ${i + 1}`}
                      </span>
                    </div>
                    
                    <h3 className="text-[28px] md:text-[34px] font-bold text-ink mb-4 tracking-tight leading-snug">
                      {step.title}
                    </h3>
                    
                    <p className="text-[15px] text-muted leading-relaxed max-w-sm">
                      {step.body}
                    </p>
                  </div>

                  {/* Right: Visual Block */}
                  <div className="w-full flex-1 flex items-center justify-center p-6 md:p-10 bg-canvas rounded-[24px] border border-mist/80 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] relative min-h-[250px] md:min-h-[350px]">
                     <div className="relative w-full max-w-[420px] transform hover:-translate-y-1 hover:scale-[1.01] transition-all duration-500 ease-out">
                        {Visual ? <Visual /> : null}
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
