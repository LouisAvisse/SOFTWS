'use client';

import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
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

const USE_CASES = [
  { label: 'Revenue Teams', href: '/use-cases/revenue-teams', icon: TrendingUp, desc: 'Close more deals, faster' },
  { label: 'Managers & Leaders', href: '/use-cases/managers-and-leaders', icon: Award, desc: 'Coach with confidence' },
  { label: 'Customer Service', href: '/use-cases/customer-service', icon: Headphones, desc: 'Resolve with empathy' },
  { label: 'Learning & Development', href: '/use-cases/learning-and-development', icon: BookOpen, desc: 'Scale training programs' },
  { label: 'Partner Enablement', href: '/use-cases/partner-enablement', icon: Network, desc: 'Align your ecosystem' },
];

const PRODUCTS = [
  { label: 'Conversation Roleplay', href: '/product/conversation-roleplay', icon: MessageSquare, desc: 'Practice real scenarios with AI' },
  { label: 'Pitch Practice', href: '/product/pitch-practice', icon: Presentation, desc: 'Sharpen your delivery' },
  { label: 'Adaptive Journeys', href: '/product/adaptive-journeys', icon: Route, desc: 'Personalized learning paths' },
  { label: 'Conversation Intelligence', href: '/product/conversation-intelligence', icon: BarChart3, desc: 'Deep linguistic analysis' },
  { label: 'Personalized Feedback', href: '/product/personalized-feedback', icon: UserCheck, desc: 'Targeted coaching insights' },
  { label: 'Adaptive Reinforcement', href: '/product/adaptive-reinforcement', icon: RefreshCw, desc: 'Drill weak spots automatically' },
  { label: 'Skill Constellations', href: '/product/skill-constellations', icon: Sparkles, desc: 'Visual readiness mapping' },
  { label: 'Role Readiness Builder', href: '/product/role-readiness-builder', icon: Shield, desc: 'Certification gates' },
];

const INDUSTRIES = [
  { label: 'Financial Services', href: '/industries/financial-services', icon: Landmark, desc: 'Compliance-ready training' },
  { label: 'Technology & SaaS', href: '/industries/technology-saas', icon: Zap, desc: 'Technical sales mastery' },
  { label: 'Healthcare', href: '/industries/healthcare', icon: Heart, desc: 'Patient-centered dialogue' },
  { label: 'Franchise & Retail', href: '/industries/franchise-retail', icon: Store, desc: 'Consistent brand experience' },
  { label: 'Education', href: '/industries/education', icon: GraduationCap, desc: 'Engaging pedagogy' },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="10" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 7 7)" />
      <rect x="8" y="8" width="10" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 13 13)" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuKey = 'useCases' | 'product' | 'industries' | null;

// ─── Main ─────────────────────────────────────────────────────────────────────

export function Navbar() {
  const t = useTranslations('nav');
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
              ? 'bg-white border-zinc-200 shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
              : 'bg-white border-zinc-200/70',
          )}
          style={{ width: '100%', maxWidth: '1080px' }}
        >
          {/* Top bar — always visible */}
          <div className="flex items-center h-12" style={{ padding: '0 6px' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 text-zinc-900 px-2.5 h-full flex-shrink-0" onClick={() => setMobileOpen(false)}>
              <LogoMark />
              <span className="font-bold text-[14px] tracking-tight">Soft</span>
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
              <Link href="/login" className="text-[13px] font-medium text-zinc-400 hover:text-zinc-900 transition-colors px-1">
                {t('logIn')}
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center text-[12px] font-semibold text-white bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-1px_0_0_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.8)] hover:from-zinc-600 hover:to-zinc-800 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_2px_8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.7)] active:from-zinc-800 active:to-zinc-900 transition-all duration-200"
                style={{ padding: '7px 16px', borderRadius: '6px' }}
              >
                {t('tryFree')}
              </Link>
            </div>

            {/* Mobile toggle — burger morphs to X */}
            <button
              className="lg:hidden ml-auto p-2 mr-0.5 text-zinc-600 hover:text-zinc-900 relative w-8 h-8 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
                className="lg:hidden overflow-hidden border-t border-zinc-100 flex flex-col"
              >
                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
                  <MobileSection label={t('useCases')} isOpen={mobileTab === 'useCases'} onToggle={() => setMobileTab(mobileTab === 'useCases' ? null : 'useCases')}>
                    {USE_CASES.map((item) => <MobileNavItem key={item.href} {...item} />)}
                  </MobileSection>
                  <MobileSection label={t('product')} isOpen={mobileTab === 'product'} onToggle={() => setMobileTab(mobileTab === 'product' ? null : 'product')} grid>
                    {PRODUCTS.map((item) => <MobileNavItem key={item.href} {...item} />)}
                  </MobileSection>
                  <MobileSection label={t('industries')} isOpen={mobileTab === 'industries'} onToggle={() => setMobileTab(mobileTab === 'industries' ? null : 'industries')}>
                    {INDUSTRIES.map((item) => <MobileNavItem key={item.href} {...item} />)}
                  </MobileSection>
                  <Link href="/pricing" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-3 text-[15px] font-medium text-zinc-800 hover:bg-zinc-50 rounded-lg transition-colors">{t('pricing')}</Link>
                  <Link href="/company" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-3 text-[15px] font-medium text-zinc-800 hover:bg-zinc-50 rounded-lg transition-colors">{t('company')}</Link>
                </div>

                <div className="px-3 pt-2 space-y-2 border-t border-zinc-100" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}>
                  <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full text-sm font-semibold text-white rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-1px_0_0_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.8)] hover:from-zinc-600 hover:to-zinc-800 transition-all duration-200" style={{ padding: '12px 20px', borderRadius: '6px' }}>
                    {t('tryFree')}
                  </Link>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors py-2">
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
                className="bg-white rounded-xl border border-zinc-200 overflow-hidden mx-6"
                style={{
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                <div className="p-1.5">
                  {activeMenu === 'useCases' && <UseCasesDrawer />}
                  {activeMenu === 'product' && <ProductDrawer />}
                  {activeMenu === 'industries' && <IndustriesDrawer />}
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
        (isOpen || active) ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800',
      )}>
        {label}
        {hasDropdown && (
          <ChevronDown className={cn(
            'w-3 h-3 transition-transform duration-150',
            isOpen ? 'text-zinc-500 rotate-180' : 'text-zinc-400',
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
        active ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800',
      )}>
        {label}
      </span>
    </Link>
  );
}

// ─── Drawer items ────────────────────────────────────────────────────────────

function DrawerItem({ href, icon: Icon, label, desc }: { href: string; icon: React.ElementType; label: string; desc: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors group hover:bg-zinc-50">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 group-hover:bg-zinc-100 transition-colors flex-shrink-0">
        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">{label}</p>
        <p className="text-[11px] text-zinc-400 leading-snug">{desc}</p>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-zinc-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
    </Link>
  );
}

function UseCasesDrawer() {
  return (
    <div className="grid grid-cols-1 gap-0.5">
      {USE_CASES.map((item) => <DrawerItem key={item.href} {...item} />)}
    </div>
  );
}

function ProductDrawer() {
  return (
    <div className="grid grid-cols-2 gap-0.5">
      {PRODUCTS.map((item) => <DrawerItem key={item.href} {...item} />)}
    </div>
  );
}

function IndustriesDrawer() {
  return (
    <div className="grid grid-cols-2 gap-0.5">
      {INDUSTRIES.map((item) => <DrawerItem key={item.href} {...item} />)}
    </div>
  );
}

// ─── Mobile sub-components ───────────────────────────────────────────────────

function MobileSection({ label, isOpen, onToggle, children, grid }: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode; grid?: boolean }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={cn('w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium transition-colors rounded-lg', isOpen ? 'text-zinc-900 bg-zinc-50' : 'text-zinc-800 hover:bg-zinc-50')}
      >
        {label}
        <ChevronRight className={cn('w-4 h-4 text-zinc-400 transition-transform duration-200', isOpen && 'rotate-90')} />
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
    <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-zinc-50">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-zinc-500" />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-zinc-700">{label}</p>
        <p className="text-[11px] text-zinc-400 leading-snug">{desc}</p>
      </div>
    </Link>
  );
}
