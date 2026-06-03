import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FooterColumnsReveal, FooterColumn, FooterBrandReveal } from '@/components/motion/FooterReveal';

// ─── B-Corp badge — white variant for the dark footer ─────────────────────────

function BCorp() {
  return (
    <Image
      src="/logo/bcorp/bcorp-white.svg"
      alt="Certified B Corporation"
      width={137}
      height={200}
      // self-start stops the flex column from stretching the badge to full
      // width (which made it look centered); it now sits flush-left like the logo.
      className="h-24 w-auto self-start"
    />
  );
}

// ─── Footer link (underline slide from left) ──────────────────────────────────

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="relative inline-block text-faint hover:text-line text-sm transition-colors duration-200
          after:absolute after:bottom-0 after:left-0 after:h-px after:w-full
          after:bg-faint after:scale-x-0 after:origin-left
          after:transition-transform after:duration-200 hover:after:scale-x-100"
      >
        {children}
      </Link>
    </li>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FooterColumnData = { title: string; links: { label: string; href: string }[] };
type LegalLink = { label: string; href: string };

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function Footer() {
  const t = await getTranslations('footer');

  const productCol = t.raw('columns.product') as FooterColumnData;
  const solutionsCol = t.raw('columns.solutions') as FooterColumnData;
  const companyCol = t.raw('columns.company') as FooterColumnData;
  const legalLinks = t.raw('legal') as LegalLink[];

  return (
    <footer className="bg-ink-deep text-faint">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <FooterColumnsReveal className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <FooterBrandReveal className="flex flex-col gap-4">
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/logo/soft-logo-dark.svg"
                  alt="Soft"
                  width={3500}
                  height={1084}
                  className="h-7 w-auto"
                />
              </Link>
              <p className="mt-2 text-sm leading-normal">{t('tagline')}</p>
            </div>
            <BCorp />
          </FooterBrandReveal>

          {/* Col 2 — Product */}
          <FooterColumn>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
              {productCol.title}
            </p>
            <ul className="space-y-3">
              {productCol.links.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
          </FooterColumn>

          {/* Col 3 — Solutions */}
          <FooterColumn>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
              {solutionsCol.title}
            </p>
            <ul className="space-y-3">
              {solutionsCol.links.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
          </FooterColumn>

          {/* Col 4 — Company */}
          <FooterColumn>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
              {companyCol.title}
            </p>
            <ul className="space-y-3">
              {companyCol.links.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
            <div className="mt-6 space-y-1">
              <a href="mailto:sales@soft.eu" className="block text-sm text-muted hover:text-edge transition-colors">
                sales@soft.eu
              </a>
              <a href="mailto:support@soft.eu" className="block text-sm text-muted hover:text-edge transition-colors">
                support@soft.eu
              </a>
            </div>
          </FooterColumn>
        </FooterColumnsReveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted">
          <span>{t('copyright')}</span>
          <div className="flex items-center gap-4">
            {legalLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                {i > 0 && <span className="text-ink-3">·</span>}
                <Link href={link.href} className="hover:text-edge transition-colors">{link.label}</Link>
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5">
            {t('dataHosting')}
            <span role="img" aria-label={t('germanyLabel')}>🇩🇪</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
