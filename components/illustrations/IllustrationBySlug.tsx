import type { ComponentType } from 'react';
import { MicrophoneIllustration } from './MicrophoneIllustration';
import { CompassIllustration } from './CompassIllustration';
import { ConstellationIllustration } from './ConstellationIllustration';
import { PrismIllustration } from './PrismIllustration';
import { LoopArrowIllustration } from './LoopArrowIllustration';
import { TelescopeIllustration } from './TelescopeIllustration';
import { LadderIllustration } from './LadderIllustration';
import { TwoHandsIllustration } from './TwoHandsIllustration';

type IllustrationProps = { variant?: 'light' | 'dark' };

const MAP: Record<string, ComponentType<IllustrationProps>> = {
  MicrophoneIllustration,
  CompassIllustration,
  ConstellationIllustration,
  PrismIllustration,
  LoopArrowIllustration,
  TelescopeIllustration,
  LadderIllustration,
  TwoHandsIllustration,
};

interface Props extends IllustrationProps {
  name: string;
  className?: string;
}

export function IllustrationBySlug({ name, className, variant }: Props) {
  const Component = MAP[name];
  if (!Component) return null;
  return (
    <div className={className}>
      <Component variant={variant} />
    </div>
  );
}
