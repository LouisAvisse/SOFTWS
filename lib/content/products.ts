export const PRODUCT_SLUGS = [
  'conversation-roleplay',
  'pitch-practice',
  'personalized-feedback',
  'adaptive-reinforcement',
  'adaptive-journeys',
  'skill-constellations',
  'conversation-intelligence',
  'role-readiness-builder',
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const PRODUCT_ILLUSTRATIONS: Record<ProductSlug, string> = {
  'conversation-roleplay': 'MicrophoneIllustration',
  'pitch-practice': 'MicrophoneIllustration',
  'personalized-feedback': 'PrismIllustration',
  'adaptive-reinforcement': 'LoopArrowIllustration',
  'adaptive-journeys': 'CompassIllustration',
  'skill-constellations': 'ConstellationIllustration',
  'conversation-intelligence': 'TelescopeIllustration',
  'role-readiness-builder': 'LadderIllustration',
};
