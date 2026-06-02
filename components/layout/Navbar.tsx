'use client';

import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Award, Headphones, BookOpen, Network,
  Landmark, Zap, Heart, Store, GraduationCap,
  ChevronDown, ChevronRight, ArrowRight,
  MessageSquare, Presentation, Route, BarChart3,
  UserCheck, RefreshCw, Sparkles, Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Data ─────────────────────────────────────────────────────────────────────
// Routing + iconography only. Labels and descriptions are translated and live in
// messages/[locale].json under `nav.menu.*` — merged by index at render time.

const USE_CASES_META = [
  { href: '/use-cases/revenue-teams', icon: TrendingUp },
  { href: '/use-cases/managers-and-leaders', icon: Award },
  { href: '/use-cases/customer-service', icon: Headphones },
  { href: '/use-cases/learning-and-development', icon: BookOpen },
  { href: '/use-cases/partner-enablement', icon: Network },
];

const PRODUCTS_META = [
  { href: '/product/conversation-roleplay', icon: MessageSquare },
  { href: '/product/pitch-practice', icon: Presentation },
  { href: '/product/adaptive-journeys', icon: Route },
  { href: '/product/conversation-intelligence', icon: BarChart3 },
  { href: '/product/personalized-feedback', icon: UserCheck },
  { href: '/product/adaptive-reinforcement', icon: RefreshCw },
  { href: '/product/skill-constellations', icon: Sparkles },
  { href: '/product/role-readiness-builder', icon: Shield },
];

const INDUSTRIES_META = [
  { href: '/industries/financial-services', icon: Landmark },
  { href: '/industries/technology-saas', icon: Zap },
  { href: '/industries/healthcare', icon: Heart },
  { href: '/industries/franchise-retail', icon: Store },
  { href: '/industries/education', icon: GraduationCap },
];

// ─── Menu item shape ──────────────────────────────────────────────────────────

type MenuEntry = { label: string; desc: string };
type MenuItem = { href: string; icon: React.ElementType; label: string; desc: string };

// Merge routing/icon metadata with translated label + desc (by index).
function mergeMenu(
  meta: { href: string; icon: React.ElementType }[],
  entries: MenuEntry[],
): MenuItem[] {
  return meta.map((m, i) => ({
    href: m.href,
    icon: m.icon,
    label: entries[i]?.label ?? '',
    desc: entries[i]?.desc ?? '',
  }));
}

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuKey = 'useCases' | 'product' | 'industries' | null;

// ─── Main ─────────────────────────────────────────────────────────────────────

export function Navbar() {
  const t = useTranslations('nav');
  const useCases = mergeMenu(USE_CASES_META, t.raw('menu.useCases') as MenuEntry[]);
  const products = mergeMenu(PRODUCTS_META, t.raw('menu.products') as MenuEntry[]);
  const industries = mergeMenu(INDUSTRIES_META, t.raw('menu.industries') as MenuEntry[]);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<string | null>(null);
  const [drawerX, setDrawerX] = useState(0);
  const triggerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // ── Hover intent: generous 300ms close delay ──
  const cancelClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActiveMenu(null), 300);
  }, [cancelClose]);

  const openMenu = useCallback((key: MenuKey) => {
    cancelClose();
    setActiveMenu(key);
    if (key && triggerRefs.current[key]) {
      const rect = triggerRefs.current[key]!.getBoundingClientRect();
      setDrawerX(rect.left + rect.width / 2);
    }
  }, [cancelClose]);

  // Drawer config
  const drawerWidths: Record<string, number> = { useCases: 400, product: 620, industries: 500 };
  const dw = activeMenu ? (drawerWidths[activeMenu] ?? 500) : 500;

  // Clamp drawer so it doesn't overflow viewport
  const clampedLeft = Math.max(dw / 2 + 16, Math.min(drawerX, (typeof window !== 'undefined' ? window.innerWidth : 1400) - dw / 2 - 16));

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center" style={{ paddingTop: '10px' }}>
        <motion.div
          layout
          transition={{ layout: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }}
          className={cn(
            'flex flex-col rounded-xl border mx-4 overflow-hidden',
            scrolled
              ? 'bg-white border-line shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
              : 'bg-white border-line/70',
          )}
          style={{ width: '100%', maxWidth: '1080px' }}
        >
          {/* Top bar — always visible */}
          <div className="flex items-center h-12" style={{ padding: '0 6px' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center px-2.5 h-full flex-shrink-0" onClick={() => setMobileOpen(false)}>
              <Image
                src="/logo/soft-logo.svg"
                alt="Soft"
                width={3500}
                height={1084}
                priority
                className="h-6 w-auto"
              />
            </Link>

            {/* Center nav (desktop) */}
            <nav className="hidden lg:flex items-center justify-center flex-1 h-full">
              <div className="flex items-center h-full" style={{ gap: '1px' }}>
                <NavTrigger
                  ref={(el) => { triggerRefs.current.useCases = el; }}
                  label={t('useCases')}
                  isOpen={activeMenu === 'useCases'}
                  active={pathname.includes('/use-cases')}
                  hasDropdown
                  onEnter={() => openMenu('useCases')}
                  onLeave={scheduleClose}
                />
                <NavTrigger
                  ref={(el) => { triggerRefs.current.product = el; }}
                  label={t('product')}
                  isOpen={activeMenu === 'product'}
                  active={pathname.includes('/product')}
                  hasDropdown
                  onEnter={() => openMenu('product')}
                  onLeave={scheduleClose}
                />
                <NavTrigger
                  ref={(el) => { triggerRefs.current.industries = el; }}
                  label={t('industries')}
                  isOpen={activeMenu === 'industries'}
                  active={pathname.includes('/industries')}
                  hasDropdown
                  onEnter={() => openMenu('industries')}
                  onLeave={scheduleClose}
                />
                <NavSimpleLink label={t('pricing')} href="/pricing" active={pathname === '/pricing'} />
                <NavSimpleLink label={t('company')} href="/company" active={pathname === '/company'} />
              </div>
            </nav>

            {/* Right actions (desktop) */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0 pr-0.5">
              <Link href="/login" className="text-[13px] font-medium text-faint hover:text-ink transition-colors px-1">
                {t('logIn')}
              </Link>
              <Link
                href="/signup"
                className="cta-primary inline-flex items-center text-[12px] font-semibold"
                style={{ padding: '7px 16px', borderRadius: '6px' }}
              >
                {t('tryFree')}
              </Link>
            </div>

            {/* Mobile toggle — burger morphs to X */}
            <button
              className="lg:hidden ml-auto p-2 mr-0.5 text-body hover:text-ink relative w-8 h-8 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            >
              <motion.span
                className="absolute w-[16px] h-[1.5px] bg-current rounded-full"
                animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <motion.span
                className="absolute w-[16px] h-[1.5px] bg-current rounded-full"
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="absolute w-[16px] h-[1.5px] bg-current rounded-full"
                animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </button>
          </div>

          {/* Mobile expanded content — fills to bottom of screen */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'calc(100dvh - 48px - 20px)', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="lg:hidden overflow-hidden border-t border-mist flex flex-col"
              >
                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
                  <MobileSection label={t('useCases')} isOpen={mobileTab === 'useCases'} onToggle={() => setMobileTab(mobileTab === 'useCases' ? null : 'useCases')}>
                    {useCases.map((item) => <MobileNavItem key={item.href} {...item} />)}
                  </MobileSection>
                  <MobileSection label={t('product')} isOpen={mobileTab === 'product'} onToggle={() => setMobileTab(mobileTab === 'product' ? null : 'product')} grid>
                    {products.map((item) => <MobileNavItem key={item.href} {...item} />)}
                  </MobileSection>
                  <MobileSection label={t('industries')} isOpen={mobileTab === 'industries'} onToggle={() => setMobileTab(mobileTab === 'industries' ? null : 'industries')}>
                    {industries.map((item) => <MobileNavItem key={item.href} {...item} />)}
                  </MobileSection>
                  <Link href="/pricing" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-3 text-[15px] font-medium text-ink-2 hover:bg-surface rounded-lg transition-colors">{t('pricing')}</Link>
                  <Link href="/company" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-3 text-[15px] font-medium text-ink-2 hover:bg-surface rounded-lg transition-colors">{t('company')}</Link>
                </div>

                <div className="px-3 pt-2 space-y-2 border-t border-mist" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}>
                  <Link href="/signup" onClick={() => setMobileOpen(false)} className="cta-primary flex items-center justify-center w-full text-sm font-semibold rounded-lg" style={{ padding: '12px 20px', borderRadius: '6px' }}>
                    {t('tryFree')}
                  </Link>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full text-sm font-medium text-muted hover:text-ink transition-colors py-2">
                    {t('logIn')}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* ═══ DROPDOWN ═══ */}
      <AnimatePresence>
        {activeMenu && (
          <>
            {/* Click-away backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />

            {/*
              Hover zone: one continuous div from bar bottom → through gap → drawer.
              Mouse can travel freely inside without triggering close.
            */}
            <div
              className="fixed z-50"
              style={{
                top: '56px',
                left: `${clampedLeft - dw / 2 - 24}px`,
                width: `${dw + 48}px`,
                paddingTop: '0',
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {/* Gap bridge — invisible, fills space between bar bottom and drawer top */}
              <div style={{ height: '8px' }} />

              {/* Drawer panel */}
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-xl border border-line overflow-hidden mx-6"
                style={{
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                <div className="p-1.5">
                  {activeMenu === 'useCases' && <UseCasesDrawer items={useCases} />}
                  {activeMenu === 'product' && <ProductDrawer items={products} />}
                  {activeMenu === 'industries' && <IndustriesDrawer items={industries} />}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </>
  );
}

// ─── Desktop nav trigger (with dropdown) ─────────────────────────────────────

const NavTrigger = forwardRef<HTMLDivElement, {
  label: string;
  isOpen: boolean;
  active: boolean;
  hasDropdown?: boolean;
  onEnter: () => void;
  onLeave: () => void;
}>(function NavTrigger({ label, isOpen, active, hasDropdown, onEnter, onLeave }, ref) {
  return (
    <div ref={ref} onMouseEnter={onEnter} onMouseLeave={onLeave} className="cursor-default">
      <span className={cn(
        'flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium transition-colors rounded-md',
        (isOpen || active) ? 'text-ink' : 'text-muted hover:text-ink-2',
      )}>
        {label}
        {hasDropdown && (
          <ChevronDown className={cn(
            'w-3 h-3 transition-transform duration-150',
            isOpen ? 'text-muted rotate-180' : 'text-faint',
          )} />
        )}
      </span>
    </div>
  );
});

function NavSimpleLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link href={href}>
      <span className={cn(
        'flex items-center px-3 py-1.5 text-[13px] font-medium transition-colors rounded-md',
        active ? 'text-ink' : 'text-muted hover:text-ink-2',
      )}>
        {label}
      </span>
    </Link>
  );
}

// ─── Drawer items ────────────────────────────────────────────────────────────

function DrawerItem({ href, icon: Icon, label, desc }: { href: string; icon: React.ElementType; label: string; desc: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors group hover:bg-surface">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface group-hover:bg-mist transition-colors flex-shrink-0">
        <Icon className="w-4 h-4 text-faint group-hover:text-body transition-colors" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-ink-3 group-hover:text-ink transition-colors">{label}</p>
        <p className="text-[11px] text-faint leading-snug">{desc}</p>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-line opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
    </Link>
  );
}

function UseCasesDrawer({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-0.5">
      {items.map((item) => <DrawerItem key={item.href} {...item} />)}
    </div>
  );
}

function ProductDrawer({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-0.5">
      {items.map((item) => <DrawerItem key={item.href} {...item} />)}
    </div>
  );
}

function IndustriesDrawer({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-0.5">
      {items.map((item) => <DrawerItem key={item.href} {...item} />)}
    </div>
  );
}

// ─── Mobile sub-components ───────────────────────────────────────────────────

function MobileSection({ label, isOpen, onToggle, children, grid }: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode; grid?: boolean }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={cn('w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium transition-colors rounded-lg', isOpen ? 'text-ink bg-surface' : 'text-ink-2 hover:bg-surface')}
      >
        {label}
        <ChevronRight className={cn('w-4 h-4 text-faint transition-transform duration-200', isOpen && 'rotate-90')} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
            <div className={cn('px-1 pb-1 pt-0.5', grid ? 'grid grid-cols-2 gap-1' : 'space-y-0.5')}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({ href, icon: Icon, label, desc }: { href: string; icon: React.ElementType; label: string; desc: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-surface">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mist flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-muted" />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink-3">{label}</p>
        <p className="text-[11px] text-faint leading-snug">{desc}</p>
      </div>
    </Link>
  );
}
