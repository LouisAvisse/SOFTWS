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
      <div className="flex items-center justify-center h-8 px-8 text-zinc-400 grayscale opacity-60 flex-shrink-0">
        {logo.svg}
      </div>
    );
  }
  return (
    <span className="flex items-center h-8 px-10 font-semibold text-zinc-400 opacity-60 flex-shrink-0 whitespace-nowrap select-none text-sm tracking-wide">
      {logo.name}
    </span>
  );
}

export function LogoMarquee({ headline, logos }: LogoMarqueeProps) {
  return (
    <section className="bg-white py-10 border-y border-zinc-100" aria-label="Trusted by leading companies">
      <div className="max-w-[1050px] mx-auto px-6 mb-5">
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 text-center">
          {headline}
        </p>
      </div>

      <div className="max-w-[1050px] mx-auto px-6 overflow-hidden">
        <div
          className="relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div
            className="flex animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {logos.map((logo, i) => <LogoItem key={`a-${i}`} logo={logo} />)}
            {logos.map((logo, i) => <LogoItem key={`b-${i}`} logo={logo} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
