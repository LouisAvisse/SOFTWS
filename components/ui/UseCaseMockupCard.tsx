'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Metric {
  label: string;
  value: number;
}

interface Props {
  scenarioName: string;
  metrics: Metric[];
}

export function UseCaseMockupCard({ scenarioName, metrics }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div style={{ perspective: '1000px' }} ref={ref}>
      <motion.div
        style={{ rotateX: 4, rotateY: -8 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        className="bg-white border border-line shadow-2xl rounded-xl p-6 w-full max-w-sm"
      >
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-faint mb-1">
            Scenario
          </p>
          <p className="text-base font-semibold text-ink">{scenarioName}</p>
        </div>

        {/* Metric rows */}
        <div className="space-y-5">
          {metrics.map((metric, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-body">{metric.label}</span>
                <span className="font-mono text-sm text-ink font-semibold">
                  {metric.value}%
                </span>
              </div>
              <div className="h-1.5 bg-mist rounded-full overflow-hidden">
                <motion.div
                  className="h-1.5 bg-brand rounded-full origin-left"
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
