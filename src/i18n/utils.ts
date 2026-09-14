import { ui, defaultLocale, locales, type Locale, type UiKey } from './ui';

export { locales, defaultLocale };
export type { Locale };

/**
 * Astro's `base` config (see astro.config.mjs) is '/' for the real
 * production domain, but temporarily becomes '/phoenix-center-ps/' for the
 * GitHub Pages project-subpath preview (GH_PAGES_PREVIEW). All internal
 * links are built as if the site lived at the domain root, then routed
 * through withBase()/stripBase() here so both cases work without every
 * component needing to know which one is active.
 */
const BASE = import.meta.env.BASE_URL;

/** For root-relative static assets (e.g. public/downloads/*.pdf) that
 *  aren't localized and don't go through localizedPath(). */
export function withBase(path: string): string {
  if (BASE === '/' || BASE === '') return path;
  return `${BASE.replace(/\/$/, '')}${path}`;
}

function stripBase(pathname: string): string {
  if (BASE === '/' || BASE === '') return pathname;
  const base = BASE.replace(/\/$/, '');
  if (pathname.startsWith(base)) {
    const rest = pathname.slice(base.length);
    return rest === '' ? '/' : rest;
  }
  return pathname;
}

/** English pages live at the bare root; Arabic pages live under /ar/. */
export function getLangFromUrl(url: URL): Locale {
  const [, first] = stripBase(url.pathname).split('/');
  if (first === 'ar') return 'ar';
  return 'en';
}

export function useTranslations(lang: Locale) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLocale][key];
  };
}

/** Builds the equivalent path in the other language, preserving the rest of the route. */
export function alternateLangPath(pathname: string, targetLang: Locale): string {
  const logical = stripBase(pathname);
  const stripped = logical.replace(/^\/ar(\/|$)/, '/');
  if (targetLang !== 'ar') return withBase(stripped);
  return withBase(stripped === '/' ? '/ar/' : `/ar${stripped}`);
}

export function localizedPath(pathname: string, lang: Locale): string {
  if (lang !== 'ar') return withBase(pathname);
  return withBase(pathname === '/' ? '/ar/' : `/ar${pathname}`);
}

/** Strips the active base path so callers can build a canonical URL that's
 *  correct regardless of whether this build targeted the preview subpath. */
export function toCanonicalPathname(pathname: string): string {
  return stripBase(pathname);
}

export type Bilingual<T = string> = { en?: T; ar?: T };

export interface LocalizedValue<T = string> {
  value: T;
  lang: Locale;
  dir: 'ltr' | 'rtl';
}

/**
 * Resolves a bilingual field for the given UI language, falling back to
 * whichever language actually has content. Returns the language/direction
 * that was ACTUALLY used, not the ambient UI language — callers must apply
 * `lang`/`dir` to the specific node rendering the value, since (e.g.) an
 * Arabic publication title must render RTL even inside an English-UI page,
 * and vice versa for the rare English-titled item on an Arabic page.
 */
export function pickLocalized<T = string>(field: Bilingual<T> | undefined | null, uiLang: Locale): LocalizedValue<T> | null {
  if (!field) return null;
  const preferred = field[uiLang];
  if (preferred != null) return { value: preferred, lang: uiLang, dir: uiLang === 'ar' ? 'rtl' : 'ltr' };
  const other: Locale = uiLang === 'ar' ? 'en' : 'ar';
  const fallback = field[other];
  if (fallback != null) return { value: fallback, lang: other, dir: other === 'ar' ? 'rtl' : 'ltr' };
  return null;
}
