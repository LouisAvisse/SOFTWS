export const INDUSTRY_SLUGS = [
  'financial-services',
  'technology-saas',
  'franchise-retail',
  'healthcare',
  'education',
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];
