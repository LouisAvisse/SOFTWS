# Text Content & Translation Guide

A short, practical guide to how all the words on this website work — where they
live, how to edit them, and how to add a new language.

---

## 1. The one rule

**No user-facing text is written inside the code.** Every word a visitor reads
lives in a single translation file:

```
messages/en.json
```

Components and pages never contain hard-coded copy — they ask for a string by
its "key" and the right text is looked up at render time. This is what makes the
site translatable: to add French, you copy `en.json` to `fr.json` and translate
the values. Nothing in the code changes.

We use [**next-intl**](https://next-intl-docs.vercel.app/), the standard
internationalization library for Next.js.

---

## 2. How to change text (the common case)

If you just want to fix a headline, tweak a button, or reword a paragraph:

1. Open **`messages/en.json`**.
2. Find the text (search for the words you see on the site — they're in there
   verbatim).
3. Edit the value on the **right** side of the colon. **Never** change the key on
   the left.
4. Save. The site updates on the next reload.

```jsonc
"hero": {
  "headline": "Practice With AI.",          // ← key: "headline"  value: the text
  "headlineBold": "Sell With Confidence.",   //    edit the value only
  "primaryCTA": "Start Practicing Free"
}
```

> ⚠️ It's a JSON file, so keep the syntax intact: text in `"double quotes"`,
> commas between items, no trailing comma after the last one. If you're unsure,
> run `node -e "JSON.parse(require('fs').readFileSync('messages/en.json'))"` —
> silence means it's valid.

### How the file is organized

The file is grouped by page / area, mirroring the site. Each top-level block is a
"namespace":

| Namespace        | Controls                                              |
|------------------|-------------------------------------------------------|
| `nav`            | Top navigation bar + dropdown menus                   |
| `home`           | Home page                                             |
| `useCases`       | Use Cases overview **and** each use-case sub-page     |
| `product`        | Product overview **and** each product sub-page        |
| `industries`     | Industries overview **and** each industry sub-page    |
| `pricing`        | Pricing page                                          |
| `company`        | Company page                                          |
| `footer`         | Footer (columns, links, legal, tagline)               |
| `common`         | Small labels reused in many places                    |

Keys are nested by section, so the structure reads almost like a sentence:
`home.hero.headline`, `company.story.label`, `pricing.faq.items`.

### Lists (FAQs, feature cards, menu items…)

Repeating content is stored as a JSON **array**. Add, remove, or reorder items by
editing the array — the page automatically renders however many you put in.

```jsonc
"faq": {
  "headline": "Frequently Asked Questions",
  "items": [
    { "question": "What is a roleplay?", "answer": "A practice session…" },
    { "question": "Can I cancel?",       "answer": "Yes, anytime…" }
  ]
}
```

Add a third FAQ by copying one `{ … }` block (mind the commas) — no code needed.

---

## 3. A few things that are intentionally **not** in the file

These are left in code on purpose, because translating them would be wrong or
pointless:

- **Brand / proper nouns** — "Soft", partner names (Salesforce, HubSpot…),
  certification names where they're the same everywhere.
- **Email addresses & URLs** — `sales@soft.eu`, link destinations.
- **Decorative demo mockups** inside `components/sections/StickyScroll.tsx` — the
  fake chat bubble and dashboard ("Enterprise Buyer", sample scores, person
  names). These are illustrative product screenshots, not page copy. If a future
  language needs these localized too, that's the single remaining spot to touch.

---

## 4. How translation works (adding a new language)

Adding, say, French is a 3-step job and requires **no component changes**:

### Step 1 — Create the translated file
Copy the English file and translate every value (keep all keys identical):

```bash
cp messages/en.json messages/fr.json
# then translate the right-hand side of each line in fr.json
```

### Step 2 — Register the locale
In **`i18n/routing.ts`**, add the language code:

```ts
export const routing = defineRouting({
  locales: ['en', 'fr'],   // ← add 'fr'
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
```

### Step 3 — Done
That's it. The framework now:
- serves French at `/fr/...` and English at `/en/...` (or `/`),
- auto-detects the visitor's browser language and redirects accordingly
  (handled by `middleware.ts`),
- lets users switch languages via the existing locale switcher.

Because every page already pulls its text from the message file by key, the
exact same components render in any language.

### Keeping languages in sync
The keys in every `messages/*.json` must match. If you add a new headline to
`en.json`, add the same key to `fr.json`. A missing key shows the key name
instead of text — easy to spot. You can also professionally translate by sending
the whole `en.json` to a translator and getting back a parallel file.

---

## 5. Where things live (file map)

```
messages/
  en.json            ← ALL text, source of truth (copy this per language)
i18n/
  routing.ts         ← list of active locales + default
  request.ts         ← loads the right message file per request
middleware.ts        ← language detection & /[locale] routing
app/[locale]/        ← the pages (read text via getTranslations)
components/
  layout/Navbar.tsx  ← menu labels via nav.menu.* (icons/links stay in code)
  layout/Footer.tsx  ← footer text via footer.*
  sections/…         ← reusable blocks; receive text as props from pages
```

---

## 6. For developers — how a page reads text

Server components (most pages) use `getTranslations`; client components use the
`useTranslations` hook. A page picks its namespace and asks for keys:

```tsx
const t = await getTranslations({ locale, namespace: 'company' });

<h2>{t('story.headline')}</h2>          // single string
{ (t.raw('story.milestones') as Milestone[]).map(…) }  // an array/object
```

- `t('key')` → returns a translated string.
- `t.raw('key')` → returns the raw value (used for arrays and objects, e.g. FAQ
  lists or menu items), then `.map()`-ed in the component.
- Non-text bits that can't go in JSON (icons, link routes) stay in the component
  and are merged with the translated text — see `mergeMenu()` in `Navbar.tsx` for
  the pattern (icon + href in code, label + description from `nav.menu.*`,
  matched by position).

**Golden rule when adding new UI:** put the words in `messages/en.json`, give them
a key, and reference the key. Never type visible copy directly into JSX.

---

## 7. Quick checklist before committing text changes

- [ ] Edited only the **values** in `messages/en.json`, not the keys.
- [ ] JSON is still valid (no missing/trailing commas).
- [ ] If you added a key, you added it to every other `messages/*.json` too.
- [ ] `npm run build` succeeds (this also confirms every key resolves).
```
