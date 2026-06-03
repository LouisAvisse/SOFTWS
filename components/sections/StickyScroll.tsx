'use client';

import { type ReactNode, useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion';
import { Mic, Video, Captions, PhoneOff } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';
import { cn } from '@/lib/utils';

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

// ─── Step visuals ────────────────────────────────────────────────────────────

function RehearseVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-line/80 bg-white shadow-sm">
      {/* Video stage — the AI persona on a live call */}
      <div className="relative aspect-[4/3] bg-ink-deep">
        {/* Top status row: live + timer */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] font-mono font-medium text-white/80">LIVE</span>
          </div>
          <span className="rounded-full bg-black/30 px-2 py-1 text-[9px] font-mono text-white/70 backdrop-blur-sm">
            02:34
          </span>
        </div>

        {/* Main participant tile */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.07] ring-2 ring-brand/70">
            <span className="text-sm font-bold text-white">AI</span>
          </div>
          {/* Speaking indicator */}
          <div className="flex h-3 items-end gap-[3px]">
            {[5, 9, 6, 11, 7, 10, 6].map((h, i) => (
              <span key={i} className="w-[3px] rounded-full bg-brand-light" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>

        {/* Name tag */}
        <div className="absolute bottom-2 left-2 z-10 rounded-md bg-black/35 px-2 py-1 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-white">Enterprise Buyer</span>
          <span className="ml-1.5 text-[9px] text-white/50">AI Persona</span>
        </div>

        {/* Self-view PiP */}
        <div className="absolute bottom-2 right-2 z-10 flex h-9 w-12 items-center justify-center rounded-md border border-white/10 bg-ink-2">
          <span className="text-[8px] font-medium text-white/55">You</span>
        </div>
      </div>

      {/* Call controls */}
      <div className="flex items-center justify-center gap-2.5 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-ink-3">
          <Mic className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-ink-3">
          <Video className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-ink-3">
          <Captions className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
        <span className="flex h-7 w-9 items-center justify-center rounded-full bg-red-500 text-white">
          <PhoneOff className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
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

  // Each step dot lights up the instant the scroll-fill line reaches it. Rather
  // than snapshot dot positions on mount (which entrance animations make stale),
  // we measure live on every scroll frame: the fill line's leading edge is
  // `track.top + progress * track.height`, and a dot is active once that edge
  // crosses the dot's real center. This always mirrors the fill exactly.
  const NUM_STEPS = Math.min(steps.length, 4);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCount, setActiveCount] = useState(0);
  // The gauge stops exactly at the last step's dot instead of running to the
  // container's bottom. Measured live so it follows layout / breakpoint changes.
  const [lineHeight, setLineHeight] = useState<number | null>(null);

  const recompute = useCallback((v: number) => {
    const track = trackRef.current;
    if (!track) return;
    const tr = track.getBoundingClientRect();
    if (tr.height <= 0) return;

    // Cap the track at the last dot's center.
    const lastDot = dotRefs.current[NUM_STEPS - 1];
    let span = tr.height;
    if (lastDot) {
      const dr = lastDot.getBoundingClientRect();
      const h = dr.top + dr.height / 2 - tr.top;
      if (h > 0) {
        span = h;
        setLineHeight((prev) => (prev != null && Math.abs(prev - h) < 0.5 ? prev : h));
      }
    }

    const fillEdge = tr.top + v * span; // viewport-y of the fill's leading edge
    let n = 0;
    for (let i = 0; i < NUM_STEPS; i++) {
      const d = dotRefs.current[i];
      if (!d) continue;
      const r = d.getBoundingClientRect();
      const center = r.top + r.height / 2;
      if (center <= fillEdge + 0.5) n++;
    }
    setActiveCount((c) => (c === n ? c : n));
  }, [NUM_STEPS]);

  useMotionValueEvent(scrollYProgress, 'change', recompute);

  useEffect(() => {
    const run = () => recompute(scrollYProgress.get());
    run();
    // Re-run once layout settles (entrance animations, font swap, late images).
    const t = setTimeout(run, 400);
    window.addEventListener('resize', run);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', run);
    };
  }, [recompute, scrollYProgress]);

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
          {intro && <p className="text-sm text-muted leading-normal">{intro}</p>}
        </FadeIn>

        {/* Vertical Stepper Container */}
        <div className="relative" ref={containerRef}>
          
          {/* Static Background Track Line — ends at the last step's dot */}
          <div
            ref={trackRef}
            className="absolute top-2 md:top-6 left-[15px] md:left-[39px] w-[1px] bg-line"
            style={lineHeight != null ? { height: lineHeight } : { bottom: '1rem' }}
          />

          {/* Dynamic Scroll-Fill Track Line */}
          <motion.div
            className="absolute top-2 md:top-6 left-[14px] md:left-[38px] w-[3px] rounded-full bg-brand origin-top"
            style={{
              scaleY: prefersReduced ? 1 : scrollYProgress,
              ...(lineHeight != null ? { height: lineHeight } : { bottom: '1rem' }),
            }}
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
                  {/* Step Dot — transparent until the scroll gauge crosses it, then brand */}
                  {/* Soft blurred glow behind the dot (active only) */}
                  {(prefersReduced || i < activeCount) && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[1.5px] top-[4px] z-0 h-[28px] w-[28px] rounded-full bg-brand/40 blur-[7px] md:left-[25.5px] md:top-1/2 md:-translate-y-1/2"
                    />
                  )}
                  <div
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className={cn(
                      'absolute left-[11.5px] top-[14px] z-10 h-[8px] w-[8px] rounded-full transition-all duration-300 md:left-[35.5px] md:top-1/2 md:-translate-y-1/2',
                      prefersReduced || i < activeCount
                        ? 'bg-brand'
                        : 'bg-canvas ring-1 ring-edge',
                    )}
                  />

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
                    
                    <p className="text-[15px] text-muted leading-normal max-w-sm">
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
