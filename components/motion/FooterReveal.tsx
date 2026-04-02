'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

// ─── Stagger container for footer columns ────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const brandVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function FooterColumnsReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FooterColumn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={columnVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function FooterBrandReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={brandVariants} className={className}>
      {children}
    </motion.div>
  );
}
