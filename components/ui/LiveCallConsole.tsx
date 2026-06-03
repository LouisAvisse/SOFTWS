'use client';

/* ============================================================================
   LiveCallConsole — the homepage product showcase: a live "Discovery call"
   with an AI prospect, coached in real time by Soft.

   Rebuilt in code (not the source SVG) so it's crisp at any zoom, themed on the
   site tokens, and animatable. It's authored on a fixed 1166×754 canvas and
   scaled to fit its container by <ScaleToFit>, so the dense desktop UI stays
   pixel-precise and never reflows — it simply shrinks on smaller screens.

   The two photos (Maya's portrait, the rep's webcam) were extracted from the
   design and live in public/showcase/. All copy here is demo chrome.
============================================================================ */

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Settings, Mic, Video, MonitorUp, Sparkles, Phone, Check, Clock,
  Building2, Send, Captions, type LucideIcon,
} from 'lucide-react';

const BASE_W = 1166;
const BASE_H = 754;

// Scales the fixed-size canvas to the container width; reserves space via the
// aspect-ratio box so surrounding layout never shifts. Hidden until measured.
function ScaleToFit({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / BASE_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${BASE_W} / ${BASE_H}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: BASE_W, height: BASE_H, transform: `scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Small shared atoms ──────────────────────────────────────────────────────
function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-[#F1EBE2] px-2.5 py-1 text-[12px] font-medium leading-none text-[#6C5F50]">
      {children}
    </span>
  );
}

function ControlBtn({ icon: Icon, label, accent }: { icon: LucideIcon; label: string; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] font-medium ${
        accent
          ? 'border-transparent bg-[#EAF1FC] text-brand'
          : 'border-line bg-[#FEFBF9] text-[#3A322A]'
      }`}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
      {label}
    </span>
  );
}

// ── The console ──────────────────────────────────────────────────────────────
export function LiveCallConsole() {
  const reduce = useReducedMotion();
  const waveBars = [7, 13, 9, 16, 11, 18, 10, 14, 8];
  const objectives = [
    { t: 'Surface key pain points', done: true },
    { t: 'Confirm budget authority', done: true },
    { t: 'Map decision committee', done: true },
    { t: 'Quantify cost of inaction', done: false },
    { t: 'Lock follow-up next Tue', done: false },
  ];

  return (
    <ScaleToFit>
      <div
        aria-hidden="true"
        className="flex h-full w-full flex-col gap-3 rounded-[22px] bg-[#F9F3EE] px-[22px] pb-[18px] pt-[14px] ring-1 ring-black/[0.06] shadow-[0_50px_100px_-45px_rgba(20,18,16,0.5)]"
      >
        {/* ── Top bar ── */}
        <div className="flex h-[52px] shrink-0 items-center justify-between rounded-[8px] border border-line bg-[#FEFBF9] px-4">
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/soft-logo.svg" alt="" className="h-[19px] w-auto" />
            <span className="h-5 w-px bg-line" />
            <span>
              <span className="block text-[11px] leading-none text-[#8B7C6B]">Discovery call</span>
              <span className="mt-1 block text-[14px] font-semibold leading-none text-[#26211B]">
                Maya Okonkwo&nbsp;:&nbsp;VP Procurement, Helio Logistics
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF2F2] px-2.5 py-1.5 text-[12px] font-semibold text-[#DC2626]">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DC2626] opacity-60" />}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
              </span>
              LIVE · 04:32
            </span>
            <Settings className="h-[18px] w-[18px] text-[#8B7C6B]" strokeWidth={1.9} />
          </div>
        </div>

        {/* ── Middle ── */}
        <div className="flex min-h-0 flex-1 gap-3.5">
          {/* Left + center group */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {/* Video row */}
            <div className="flex min-h-0 flex-1 gap-3">
              {/* AI prospect — the active speaker */}
              <div className="relative flex flex-1 flex-col items-center justify-center rounded-[16px] bg-[#FEFBF9] ring-2 ring-brand">
                <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#EAF1FC] px-2.5 py-1.5 text-[12px] font-semibold text-brand">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} /> AI prospect
                </span>
                <span className="relative h-[120px] w-[120px] overflow-hidden rounded-full ring-4 ring-white shadow-[0_8px_24px_-8px_rgba(20,18,16,0.35)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/showcase/maya-avatar.png" alt="" className="h-full w-full object-cover" />
                </span>
                <p className="mt-4 text-[18px] font-semibold text-[#26211B]">Maya Okonkwo</p>
                <p className="mt-1 text-[12.5px] text-[#6C5F50]">VP Procurement · Helio Logistics</p>
                {/* speaking meter */}
                <div className="mt-4 flex h-5 items-center gap-[3px]">
                  {waveBars.map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-[3px] rounded-full bg-brand"
                      style={{ height: h }}
                      animate={reduce ? undefined : { scaleY: [1, 0.5, 1.2, 0.7, 1] }}
                      transition={{ duration: 1.05, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
                    />
                  ))}
                </div>
                <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1.5 text-[11px] font-medium text-[#6C5F50] ring-1 ring-line">
                  <Building2 className="h-3.5 w-3.5" strokeWidth={1.9} /> Helio Logistics · Mid-market · EU
                </span>
                <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#FEFBF9] px-3 py-1.5 text-[12px] font-semibold text-brand ring-1 ring-line">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
                  <Mic className="h-3.5 w-3.5" strokeWidth={2} /> Speaking
                </span>
              </div>

              {/* You — rep webcam */}
              <div className="relative flex-1 overflow-hidden rounded-[16px] bg-[#26211B]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/showcase/you.png" alt="" className="h-full w-full object-cover" />
                <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm">
                  You
                </span>
                <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-[#3A322A] shadow-sm">
                  <Mic className="h-3.5 w-3.5" strokeWidth={2} /> Listening
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="flex shrink-0 items-center gap-3 rounded-[12px] border border-line bg-[#FEFBF9] px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF1FC] text-[11px] font-semibold text-brand">MO</span>
              <span className="shrink-0 text-[12px] font-medium text-[#8B7C6B]">Maya Okonkwo</span>
              <p className="min-w-0 flex-1 truncate text-[14px] text-[#3A322A]">
                “We’ve been burned before by tools that promised the world. Walk me through how your onboarding looks in the first two weeks.”
              </p>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5 text-[12px] font-medium text-[#8B7C6B]">
                <Captions className="h-3.5 w-3.5" strokeWidth={1.9} /> Captions on
              </span>
            </div>
          </div>

          {/* Right column */}
          <div className="flex w-[286px] shrink-0 flex-col gap-3">
            {/* Persona */}
            <div className="shrink-0 rounded-[12px] border border-line bg-[#FEFBF9] p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF1FC] text-[13px] font-semibold text-brand">MO</span>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold leading-tight text-[#26211B]">Maya Okonkwo</p>
                  <p className="text-[11px] leading-tight text-[#8B7C6B]">VP Procurement · Helio Logistics</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <TagPill>Skeptical</TagPill>
                <TagPill>Data-driven</TagPill>
                <TagPill>Time-pressed</TagPill>
                <TagPill>Burned before</TagPill>
              </div>
            </div>

            {/* Objectives */}
            <div className="shrink-0 rounded-[12px] border border-line bg-[#FEFBF9] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8B7C6B]">Discovery Objectives</p>
                  <p className="mt-1 text-[14px] font-semibold text-[#26211B]">Cover before next step</p>
                </div>
                <span className="rounded-full bg-[#047857] px-2 py-1 text-[11px] font-semibold text-white">3 / 5</span>
              </div>
              <ul className="mt-3 space-y-2.5">
                {objectives.map((o) => (
                  <li key={o.t} className="flex items-center gap-2.5 text-[13px]">
                    {o.done ? (
                      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#047857]">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="h-[18px] w-[18px] rounded-full border-[1.5px] border-[#CBBDB0]" />
                    )}
                    <span className={o.done ? 'text-[#3A322A]' : 'text-[#8B7C6B]'}>{o.t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live coaching */}
            <div className="shrink-0 rounded-[12px] border border-line bg-[#FEFBF9] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8B7C6B]">Live Coaching</p>
              <p className="mt-1 text-[14px] font-semibold text-[#26211B]">Conversation balance</p>
              <div className="mt-3 flex items-center gap-4">
                <svg viewBox="0 0 36 36" className="h-[58px] w-[58px] shrink-0 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ECE3D8" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#047857" strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray="42 100" />
                </svg>
                <div>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-[#26211B]">42%</span>
                    <span className="ml-1.5 text-[13px] text-[#6C5F50]">talk ratio</span>
                  </p>
                  <p className="mt-1.5 text-[11.5px] text-[#6C5F50]">Target 30–50% · You’re in the pocket</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
                {[
                  ['Questions asked', '7'],
                  ['Open vs closed', '5 / 2'],
                  ['Longest stretch', '1m 12s'],
                ].map(([l, v]) => (
                  <div key={l}>
                    <p className="text-[9.5px] font-medium uppercase tracking-wide text-[#8B7C6B]">{l}</p>
                    <p className="mt-1 text-[15px] font-bold text-[#26211B]">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft suggests */}
            <div className="flex min-h-0 flex-1 flex-col rounded-[12px] bg-[#EEF3FC] p-4 ring-1 ring-brand/15">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-brand">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} /> Soft suggests
              </p>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#3A322A]">
                Maya just said “burned before.” Mirror her concern: ask what specifically broke in that rollout before pitching your onboarding.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-lg px-3 py-2 text-[13px] font-medium text-[#6C5F50]">Skip</span>
                <span className="rounded-lg bg-brand px-3.5 py-2 text-[13px] font-semibold text-white">Use this</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar: controls (under left+center) + ask (under right) ── */}
        <div className="flex shrink-0 items-center gap-3.5">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ControlBtn icon={Mic} label="Mic" />
              <ControlBtn icon={Video} label="Camera" />
              <ControlBtn icon={MonitorUp} label="Share" />
              <ControlBtn icon={Sparkles} label="Coach me" accent />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-[#FEFBF9] px-4 py-2.5 text-[14px] font-medium text-[#6C5F50]">
                <Clock className="h-[18px] w-[18px]" strokeWidth={1.9} /> Drill 04:32 / 12:00
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-4 py-2.5 text-[15px] font-semibold text-white">
                <Phone className="h-[18px] w-[18px] rotate-[135deg]" strokeWidth={2} /> End call
              </span>
            </div>
          </div>
          <div className="flex h-[48px] w-[286px] shrink-0 items-center gap-3 rounded-full border border-line bg-[#FEFBF9] px-4">
            <Sparkles className="h-[18px] w-[18px] shrink-0 text-brand" strokeWidth={1.9} />
            <span className="min-w-0 flex-1 truncate text-[14px] text-[#A89A88]">Ask Softer for advice…</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand">
              <Send className="h-3.5 w-3.5 text-white" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </ScaleToFit>
  );
}
