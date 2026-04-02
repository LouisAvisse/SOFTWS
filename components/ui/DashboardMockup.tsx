'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MockupData {
  title: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
  metric3Label: string;
  metric3Value: string;
}

interface Props {
  data: MockupData;
}

const TEAM = [
  { name: 'Sarah M.', role: 'AE', score: 92, trend: '+5' },
  { name: 'James L.', role: 'SDR', score: 87, trend: '+12' },
  { name: 'Léa D.', role: 'CS', score: 81, trend: '+3' },
  { name: 'Tom R.', role: 'AM', score: 76, trend: '+8' },
];

const ROLES = [
  { label: 'SDR', value: 84 },
  { label: 'AE', value: 91 },
  { label: 'CS', value: 78 },
  { label: 'AM', value: 85 },
  { label: 'SM', value: 69 },
];

function AnimatedBar({ value, delay, inView }: { value: number; delay: number; inView: boolean }) {
  return (
    <div className="h-full bg-zinc-200 rounded-sm overflow-hidden flex flex-col justify-end">
      <motion.div
        className="bg-zinc-900 rounded-sm w-full"
        initial={{ height: 0 }}
        animate={inView ? { height: `${value}%` } : { height: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.42, 0, 0.58, 1] }}
      />
    </div>
  );
}

function AnimatedProgress({ value, delay, inView }: { value: number; delay: number; inView: boolean }) {
  return (
    <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
      <motion.div
        className="h-1 bg-zinc-900 rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: value / 100 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.42, 0, 0.58, 1] }}
      />
    </div>
  );
}

export function DashboardMockup({ data }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const metrics = [
    { label: data.metric1Label, value: parseInt(data.metric1Value, 10) },
    { label: data.metric2Label, value: parseInt(data.metric2Value, 10) },
    { label: data.metric3Label, value: parseInt(data.metric3Value, 10) },
  ];

  return (
    <div ref={ref} className="w-full select-none pointer-events-none">
      {/* App interface */}
      <div className="bg-white w-full h-full overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden md:flex w-44 lg:w-48 border-r border-zinc-100 bg-zinc-50/80 flex-col flex-shrink-0">
            <div className="px-4 py-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <span className="text-sm font-bold text-zinc-900">Soft</span>
              </div>
            </div>
            <nav className="px-2 py-3 space-y-0.5 text-xs">
              <div className="px-3 py-2 rounded-md bg-zinc-900 text-white font-medium">Dashboard</div>
              <div className="px-3 py-2 rounded-md text-zinc-500">Roleplays</div>
              <div className="px-3 py-2 rounded-md text-zinc-500">Scorecards</div>
              <div className="px-3 py-2 rounded-md text-zinc-500">Journeys</div>
              <div className="px-3 py-2 rounded-md text-zinc-500">Team</div>
              <div className="px-3 py-2 rounded-md text-zinc-500">Analytics</div>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="px-4 lg:px-6 py-3 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400">Analytics</p>
                <p className="text-sm font-semibold text-zinc-900">Team Readiness Overview</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-md px-2.5 py-1">Last 30 days</div>
                <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-xs text-zinc-600 font-medium">S</div>
              </div>
            </div>

            {/* Stats row */}
            <div className="px-4 lg:px-6 py-4 grid grid-cols-3 gap-3 border-b border-zinc-100">
              <div>
                <p className="text-xs text-zinc-400 mb-0.5">Avg. Readiness</p>
                <p className="text-lg font-bold font-mono text-zinc-900">84%</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-0.5">Sessions</p>
                <p className="text-lg font-bold font-mono text-zinc-900">342</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-0.5">Completion</p>
                <p className="text-lg font-bold font-mono text-zinc-900">92%</p>
              </div>
            </div>

            {/* Body: chart + scorecard */}
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">
              {/* Left: Bar chart */}
              <div className="col-span-3 px-4 lg:px-6 py-4">
                <p className="text-xs font-semibold text-zinc-700 mb-1">Readiness by Role</p>
                <p className="text-xs text-zinc-400 mb-4">Average score across all team members</p>
                <div className="flex items-end gap-3 h-28">
                  {ROLES.map((role, i) => (
                    <div key={role.label} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full h-24">
                        <AnimatedBar value={role.value} delay={0.2 + i * 0.08} inView={isInView} />
                      </div>
                      <span className="text-xs text-zinc-500 font-medium">{role.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Scorecard */}
              <div className="col-span-2 px-4 lg:px-6 py-4">
                <p className="text-xs font-semibold text-zinc-700 mb-1">{data.title}</p>
                <p className="text-xs text-zinc-400 mb-4">Latest session</p>
                <div className="space-y-3">
                  {metrics.map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-zinc-600">{m.label}</span>
                        <span className="font-mono text-xs text-zinc-900 font-semibold">{m.value}%</span>
                      </div>
                      <AnimatedProgress value={m.value} delay={0.3 + i * 0.1} inView={isInView} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team table */}
            <div className="px-4 lg:px-6 py-4 border-t border-zinc-100">
              <p className="text-xs font-semibold text-zinc-700 mb-3">Top Performers</p>
              <div className="space-y-2">
                {TEAM.map((member, i) => (
                  <motion.div
                    key={member.name}
                    className="flex items-center gap-3 text-xs"
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center text-xs text-zinc-600 font-medium flex-shrink-0">
                      {member.name[0]}
                    </div>
                    <span className="text-zinc-900 font-medium w-16 truncate">{member.name}</span>
                    <span className="text-zinc-400 w-8">{member.role}</span>
                    <div className="flex-1 h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-1 bg-zinc-900 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: member.score / 100 } : { scaleX: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: [0.42, 0, 0.58, 1] }}
                      />
                    </div>
                    <span className="font-mono text-zinc-900 font-semibold w-8 text-right">{member.score}%</span>
                    <span className="text-emerald-600 font-medium w-8 text-right">{member.trend}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
