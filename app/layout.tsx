import type { ReactNode } from 'react';

// Root layout: locale layout handles <html> and <body>.
// Required by Next.js but delegates to app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
