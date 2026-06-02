import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Host_Grotesk, Libre_Baskerville } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { routing } from '@/i18n/routing';

// Site-wide sans (may change later — see CLAUDE/memory).
const hostGrotesk = Host_Grotesk({
  subsets: ['latin'],
  variable: '--font-host-grotesk',
  display: 'swap',
});

// Hero H1 display serif (styles will change later).
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});
import { Navbar } from '@/components/layout/Navbar';
import { TopScrim } from '@/components/layout/TopScrim';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/motion/PageTransition';

import '@/app/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: { default: 'Soft — AI-Powered Sales Training', template: '%s | Soft' },
  description:
    'Soft transforms static sales training into adaptive AI-powered roleplay. Practice high-stakes conversations and master your pitch.',
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${hostGrotesk.variable} ${libreBaskerville.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen bg-canvas text-ink antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <TopScrim />
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
