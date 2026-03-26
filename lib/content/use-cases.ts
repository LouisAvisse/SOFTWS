export const USE_CASE_SLUGS = [
  'revenue-teams',
  'managers-and-leaders',
  'customer-service',
  'learning-and-development',
  'partner-enablement',
] as const;

export type UseCaseSlug = (typeof USE_CASE_SLUGS)[number];

export const USE_CASE_ICONS: Record<UseCaseSlug, string> = {
  'revenue-teams': 'TrendingUp',
  'managers-and-leaders': 'Award',
  'customer-service': 'Headphones',
  'learning-and-development': 'BookOpen',
  'partner-enablement': 'Network',
};
