# Soft — Website Context

## Product
Soft by Incenteev — AI-powered conversational roleplay training SaaS.
Sales teams, managers, L&D, customer service, partner networks train on
high-stakes conversations with AI personas. Adaptive learning, personalized
feedback, readiness analytics.

## Stack
- Next.js 15, App Router, TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion for animations
- Geist Sans + Geist Mono (next/font)
- next-intl for i18n (locale routing, message files)
- Vercel deployment

## i18n Architecture
- Library: next-intl (App Router native)
- Route structure: /[locale]/... (e.g. /en/, /fr/)
- Message files: messages/en.json (source of truth), messages/fr.json, etc.
- Locale config: i18n/routing.ts — add a locale string here to activate it
- Middleware: locale detection via Accept-Language, redirect / to /[locale]
- Default locale: en
- ALL user-facing strings live in messages/[locale].json — NEVER hardcode copy in components
- next-intl hooks: useTranslations() in client components, getTranslations() in server components
- Key structure: home.hero.headline, useCases.revenueTeams.hero.headline, etc.

## Content Pattern
All page text is in messages/en.json structured by section.
Components receive translation keys, not raw strings.
lib/content/ files define TypeScript interfaces and slug lists only — no strings.

## Design Philosophy
- Neutral skeleton (zinc palette), CSS variables for brand colors
- Sharp, architectural, "Linear-app"-inspired aesthetic
- No photos — inline SVG illustrations with Framer Motion (everyday objects, geometric)
- Animations: subtle, physics-based, Framer Motion useInView
- Two-tone headlines: bold statement + italic/light modifier
- Section padding: py-24 lg:py-32, max-w-7xl container

## File Structure
- app/[locale]/ — all pages inside locale wrapper
- components/layout/ — Navbar, Footer, LocaleSwitcher
- components/sections/ — Reusable section blocks
- components/illustrations/ — Animated SVG components
- components/motion/ — FadeIn, StaggerGroup wrappers
- messages/ — en.json and future locale files
- i18n/ — routing.ts and request.ts
- middleware.ts — locale detection
- lib/content/ — TypeScript interfaces + slug lists only

## Color Tokens (globals.css)
--brand-primary: zinc-900 (swap later for brand color)
--brand-accent: zinc-700
All dark sections: zinc-950 bg
All light sections: white or zinc-50 bg

## Key Conventions
- No "use client" unless strictly needed for interactivity
- Illustrations: line-art SVG, stroke-width 1.5, Framer Motion keyframes
- shadcn/ui components customized to remove generic feel
- Section labels: text-xs font-semibold tracking-widest uppercase text-zinc-500
- ALL strings via next-intl — never hardcode copy in JSX
