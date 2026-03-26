import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

// ─── B-Corp badge SVG ─────────────────────────────────────────────────────────

function BCorp() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-label="B Corp" className="text-zinc-600">
      <rect x="1" y="1" width="26" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <text x="14" y="17" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="700" fill="currentColor">B</text>
      <text x="14" y="26" textAnchor="middle" fontFamily="inherit" fontSize="5.5" fontWeight="500" fill="currentColor" letterSpacing="0.5">CORP</text>
    </svg>
  );
}

// ─── Footer link (underline slide from left) ──────────────────────────────────

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="relative inline-block text-zinc-400 hover:text-zinc-200 text-sm transition-colors duration-200
          after:absolute after:bottom-0 after:left-0 after:h-px after:w-full
          after:bg-zinc-400 after:scale-x-0 after:origin-left
          after:transition-transform after:duration-200 hover:after:scale-x-100"
      >
        {children}
      </Link>
    </li>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="bg-zinc-950 text-zinc-400">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <Link href="/" className="text-white font-bold text-xl tracking-tight">
                Soft
              </Link>
              <p className="mt-2 text-sm leading-relaxed">{t('tagline')}</p>
            </div>
            <BCorp />
          </div>

          {/* Col 2 — Product */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
              Product
            </p>
            <ul className="space-y-3">
              <FooterLink href="/product/conversation-roleplay">Conversation Roleplay</FooterLink>
              <FooterLink href="/product/pitch-practice">Pitch Practice</FooterLink>
              <FooterLink href="/product/personalized-feedback">Personalized Feedback</FooterLink>
              <FooterLink href="/product/adaptive-reinforcement">Adaptive Reinforcement</FooterLink>
              <FooterLink href="/product/adaptive-journeys">Adaptive Journeys</FooterLink>
              <FooterLink href="/product/skill-constellations">Skill Constellations</FooterLink>
              <FooterLink href="/product/conversation-intelligence">Conversation Intelligence</FooterLink>
              <FooterLink href="/product/role-readiness-builder">Role Readiness Builder</FooterLink>
            </ul>
          </div>

          {/* Col 3 — Solutions */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
              Solutions
            </p>
            <ul className="space-y-3">
              <FooterLink href="/use-cases/revenue-teams">Revenue Teams</FooterLink>
              <FooterLink href="/use-cases/managers-and-leaders">Managers & Leaders</FooterLink>
              <FooterLink href="/use-cases/customer-service">Customer Service</FooterLink>
              <FooterLink href="/use-cases/learning-and-development">Learning & Development</FooterLink>
              <FooterLink href="/use-cases/partner-enablement">Partner Enablement</FooterLink>
              <FooterLink href="/industries/financial-services">Financial Services</FooterLink>
              <FooterLink href="/industries/technology-saas">Technology & SaaS</FooterLink>
              <FooterLink href="/industries/healthcare">Healthcare</FooterLink>
              <FooterLink href="/industries/franchise-retail">Franchise & Retail</FooterLink>
              <FooterLink href="/industries/education">Education</FooterLink>
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
              Company
            </p>
            <ul className="space-y-3">
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/company">About</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
            <div className="mt-6 space-y-1">
              <a href="mailto:sales@soft.eu" className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                sales@soft.eu
              </a>
              <a href="mailto:support@soft.eu" className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                support@soft.eu
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500">
          <span>{t('copyright')}</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <span className="text-zinc-700">·</span>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
            <span className="text-zinc-700">·</span>
            <Link href="/eu-ai-act" className="hover:text-zinc-300 transition-colors">EU AI Act Compliance</Link>
          </div>
          <span className="flex items-center gap-1.5">
            {t('dataHosting')}
            <span role="img" aria-label="Germany">🇩🇪</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
