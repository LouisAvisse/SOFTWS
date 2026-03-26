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

interface Props { data: MockupData }

const METRICS_KEYS = [
  { labelKey: 'metric1Label' as const, valueKey: 'metric1Value' as const },
  { labelKey: 'metric2Label' as const, valueKey: 'metric2Value' as const },
  { labelKey: 'metric3Label' as const, valueKey: 'metric3Value' as const },
];

export function ProductMockupCard({ data }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const metrics = METRICS_KEYS.map(({ labelKey, valueKey }) => ({
    label: data[labelKey],
    value: parseInt(data[valueKey], 10),
  }));

  return (
    <div style={{ perspective: '1000px' }} ref={ref}>
      <motion.div
        style={{ rotateX: 4, rotateY: -8 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        className="bg-white border border-zinc-200 shadow-2xl rounded-xl p-6 w-full max-w-sm"
      >
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-1">
            Scorecard
          </p>
          <p className="text-base font-semibold text-zinc-900">{data.title}</p>
        </div>

        {/* Metric rows */}
        <div className="space-y-5">
          {metrics.map((metric, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-zinc-600">{metric.label}</span>
                <span className="font-mono text-sm text-zinc-900 font-semibold">
                  {metric.value}%
                </span>
              </div>
              <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-1.5 bg-zinc-900 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: metric.value / 100 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.1,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
