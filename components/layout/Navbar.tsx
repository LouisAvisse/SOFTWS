'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  TrendingUp, Award, Headphones, BookOpen, Network, Users,
  Landmark, Zap, Heart, Store, GraduationCap,
  Menu, X, ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocaleSwitcher } from './LocaleSwitcher';
import { cn } from '@/lib/utils';

// ─── Data ─────────────────────────────────────────────────────────────────────

const USE_CASES = [
  { label: 'Revenue Teams', href: '/use-cases/revenue-teams', icon: TrendingUp },
  { label: 'Managers & Leaders', href: '/use-cases/managers-and-leaders', icon: Award },
  { label: 'Customer Service', href: '/use-cases/customer-service', icon: Headphones },
  { label: 'Learning & Development', href: '/use-cases/learning-and-development', icon: BookOpen },
  { label: 'Partner Enablement', href: '/use-cases/partner-enablement', icon: Network },
];

const PRODUCT_LEFT = [
  { label: 'Conversation Roleplay', href: '/product/conversation-roleplay' },
  { label: 'Pitch Practice', href: '/product/pitch-practice' },
  { label: 'Adaptive Journeys', href: '/product/adaptive-journeys' },
  { label: 'Conversation Intelligence', href: '/product/conversation-intelligence' },
];

const PRODUCT_RIGHT = [
  { label: 'Personalized Feedback', href: '/product/personalized-feedback' },
  { label: 'Adaptive Reinforcement', href: '/product/adaptive-reinforcement' },
  { label: 'Skill Constellations', href: '/product/skill-constellations' },
  { label: 'Role Readiness Builder', href: '/product/role-readiness-builder' },
];

const INDUSTRIES = [
  { label: 'Financial Services', href: '/industries/financial-services', icon: Landmark },
  { label: 'Technology & SaaS', href: '/industries/technology-saas', icon: Zap },
  { label: 'Healthcare', href: '/industries/healthcare', icon: Heart },
  { label: 'Franchise & Retail', href: '/industries/franchise-retail', icon: Store },
  { label: 'Education', href: '/industries/education', icon: GraduationCap },
];

// ─── Logo mark SVG ─────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="10" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.5"
        transform="rotate(45 7 7)" />
      <rect x="8" y="8" width="10" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.5"
        transform="rotate(45 13 13)" />
    </svg>
  );
}

// ─── Mega panel animation ──────────────────────────────────────────────────────

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.1 } },
};

// ─── Main component ────────────────────────────────────────────────────────────

type MenuKey = 'useCases' | 'product' | 'industries' | null;

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 80);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-zinc-900">
              <LogoMark />
              <span className="font-bold text-xl tracking-tight">Soft</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              <NavItem
                label={t('useCases')}
                isActive={pathname.includes('/use-cases')}
                hasMenu
                onEnter={() => openMenu('useCases')}
                onLeave={scheduleClose}
              />
              <NavItem
                label={t('product')}
                isActive={pathname.includes('/product')}
                hasMenu
                onEnter={() => openMenu('product')}
                onLeave={scheduleClose}
              />
              <NavItem
                label={t('industries')}
                isActive={pathname.includes('/industries')}
                hasMenu
                onEnter={() => openMenu('industries')}
                onLeave={scheduleClose}
              />
              <NavItem label={t('pricing')} href="/pricing" isActive={pathname === '/pricing'} />
              <NavItem label={t('company')} href="/company" isActive={pathname === '/company'} />
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <LocaleSwitcher />
              <Button variant="architectural" size="sm" asChild>
                <Link href="/company">{t('bookDemo')}</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/pricing">{t('tryFree')}</Link>
              </Button>
            </div>

            {/* Mobile burger */}
            <button
              className="lg:hidden p-2 -mr-2 text-zinc-700 hover:text-zinc-900"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Mega menus ── */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-lg"
              onMouseEnter={() => openMenu(activeMenu)}
              onMouseLeave={scheduleClose}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeMenu === 'useCases' && <UseCasesPanel />}
                {activeMenu === 'product' && <ProductPanel />}
                {activeMenu === 'industries' && <IndustriesPanel />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 flex flex-col lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                <span className="font-bold text-xl">Soft</span>
                <button onClick={() => setMobileOpen(false)} className="p-1 text-zinc-500 hover:text-zinc-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Accordion nav */}
              <nav className="flex-1 px-4 py-4 space-y-1">
                <MobileAccordion
                  label={t('useCases')}
                  isOpen={mobileExpanded === 'useCases'}
                  onToggle={() => setMobileExpanded(mobileExpanded === 'useCases' ? null : 'useCases')}
                >
                  {USE_CASES.map((item) => (
                    <MobileLink key={item.href} href={item.href}>{item.label}</MobileLink>
                  ))}
                </MobileAccordion>

                <MobileAccordion
                  label={t('product')}
                  isOpen={mobileExpanded === 'product'}
                  onToggle={() => setMobileExpanded(mobileExpanded === 'product' ? null : 'product')}
                >
                  {[...PRODUCT_LEFT, ...PRODUCT_RIGHT].map((item) => (
                    <MobileLink key={item.href} href={item.href}>{item.label}</MobileLink>
                  ))}
                </MobileAccordion>

                <MobileAccordion
                  label={t('industries')}
                  isOpen={mobileExpanded === 'industries'}
                  onToggle={() => setMobileExpanded(mobileExpanded === 'industries' ? null : 'industries')}
                >
                  {INDUSTRIES.map((item) => (
                    <MobileLink key={item.href} href={item.href}>{item.label}</MobileLink>
                  ))}
                </MobileAccordion>

                <MobileLink href="/pricing" className="block px-3 py-2.5 text-sm font-medium">
                  {t('pricing')}
                </MobileLink>
                <MobileLink href="/company" className="block px-3 py-2.5 text-sm font-medium">
                  {t('company')}
                </MobileLink>
              </nav>

              {/* CTAs */}
              <div className="px-4 py-4 border-t border-zinc-100 space-y-2">
                <Button variant="architectural" className="w-full" asChild>
                  <Link href="/company">{t('bookDemo')}</Link>
                </Button>
                <Button variant="default" className="w-full" asChild>
                  <Link href="/pricing">{t('tryFree')}</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Desktop nav item ──────────────────────────────────────────────────────────

function NavItem({
  label, href, isActive, hasMenu, onEnter, onLeave,
}: {
  label: string;
  href?: string;
  isActive: boolean;
  hasMenu?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  const inner = (
    <span className={cn(
      'flex items-center gap-1 px-3 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors relative',
    )}>
      {label}
      {hasMenu && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute bottom-0 left-3 right-3 h-0.5 bg-zinc-900"
        />
      )}
    </span>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="cursor-default"
    >
      {inner}
    </div>
  );
}

// ─── Mega panels ──────────────────────────────────────────────────────────────

function UseCasesPanel() {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-12">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">Use Cases</p>
        <p className="text-sm text-zinc-600 leading-relaxed mb-3">
          Train every team on the conversations that matter.
        </p>
        <Users className="w-8 h-8 text-zinc-300 mt-4" />
      </div>
      <div className="grid grid-cols-1 gap-1">
        {USE_CASES.map((item) => (
          <MegaLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  );
}

function ProductPanel() {
  return (
    <div className="grid grid-cols-[200px_1fr_1fr] gap-12">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">Platform</p>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Every tool your reps need to practice, improve, and scale.
        </p>
      </div>
      <div className="space-y-1">
        {PRODUCT_LEFT.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="space-y-1">
        {PRODUCT_RIGHT.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function IndustriesPanel() {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-12">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">Industries</p>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Tailored training for the conversations your sector demands.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {INDUSTRIES.map((item) => (
          <MegaLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function MegaLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 transition-colors group"
    >
      <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors flex-shrink-0" />
      {label}
    </Link>
  );
}

function MobileAccordion({
  label, isOpen, onToggle, children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 rounded"
      >
        {label}
        <ChevronDown className={cn('w-4 h-4 text-zinc-400 transition-transform', isOpen && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-3"
          >
            <div className="py-1 space-y-0.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn('block px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded transition-colors', className)}
    >
      {children}
    </Link>
  );
}
