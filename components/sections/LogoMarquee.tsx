import { type ReactNode } from 'react';

interface Logo {
  name: string;
  svg?: ReactNode;
}

interface LogoMarqueeProps {
  headline: string;
  logos: Logo[];
}

function LogoItem({ logo }: { logo: Logo }) {
  if (logo.svg) {
    return (
      <div className="flex items-center justify-center h-8 px-6 text-zinc-300 grayscale opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">
        {logo.svg}
      </div>
    );
  }
  return (
    <span className="flex items-center h-8 px-6 font-semibold text-zinc-300 opacity-60 hover:opacity-100 transition-opacity flex-shrink-0 whitespace-nowrap select-none">
      {logo.name}
    </span>
  );
}

export function LogoMarquee({ headline, logos }: LogoMarqueeProps) {
  const doubled = [...logos, ...logos];

  return (
    <section className="bg-zinc-50 py-14 overflow-hidden" aria-label="Trusted by leading companies">
      <div className="container mx-auto mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 text-center">
          {headline}
        </p>
      </div>

      {/* Row 1 — left */}
      <div
        className="relative flex overflow-hidden mb-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex animate-marquee" aria-hidden="true">
          {doubled.map((logo, i) => <LogoItem key={i} logo={logo} />)}
        </div>
      </div>

      {/* Row 2 — right (reverse via negative translate-x start) */}
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex animate-marquee [animation-direction:reverse]" aria-hidden="true">
          {doubled.map((logo, i) => <LogoItem key={i} logo={logo} />)}
        </div>
      </div>
    </section>
  );
}
