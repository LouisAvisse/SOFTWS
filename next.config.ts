import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Local repo lives under ~/Documents (iCloud-synced); iCloud ignores any
  // path ending in `.nosync`, which stops it from evicting build chunks
  // mid-build. On Vercel there's no iCloud, so use the standard `.next`.
  distDir: process.env.VERCEL ? '.next' : '.next.nosync',
};

export default withNextIntl(nextConfig);
