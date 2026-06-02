import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  if (routing.locales.length <= 1) return null;

  return (
    <div className="flex items-center gap-1 text-xs text-muted">
      {routing.locales.map((locale) => (
        <a
          key={locale}
          href={`/${locale}`}
          className="px-1.5 py-0.5 uppercase tracking-wider hover:text-ink transition-colors"
        >
          {locale}
        </a>
      ))}
    </div>
  );
}
