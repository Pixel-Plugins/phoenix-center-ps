import { ui, defaultLocale, locales, type Locale, type UiKey } from './ui';

export { locales, defaultLocale };
export type { Locale };

/** English pages live at the bare root; Arabic pages live under /ar/. */
export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
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
  const stripped = pathname.replace(/^\/ar(\/|$)/, '/');
  if (targetLang === 'ar') {
    return stripped === '/' ? '/ar/' : `/ar${stripped}`;
  }
  return stripped;
}

export function localizedPath(pathname: string, lang: Locale): string {
  if (lang === 'en') return pathname;
  return pathname === '/' ? '/ar/' : `/ar${pathname}`;
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
