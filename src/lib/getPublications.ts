import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/utils';

/**
 * The single place that filters the publications collection by
 * `data.languages` — every page/component that lists or routes
 * publications should go through this instead of calling
 * `getCollection('publications')` directly, so a publication set to only
 * one language (see content.config.ts) is consistently hidden from the
 * other locale everywhere: routing, listings, homepage, related-publications.
 */
export async function getPublicationsForLang(lang: Locale): Promise<CollectionEntry<'publications'>[]> {
  const all = await getCollection('publications');
  return all.filter((p) => p.data.languages.includes(lang));
}

type Localized<T> = { en?: T; ar?: T };

function isBilingual<T>(value: T | Localized<T>): value is Localized<T> {
  // A resolved coverImage (ImageMetadata) always has `src` — a bilingual()
  // wrapper object never does, so this cleanly tells them apart without
  // needing a discriminant field in the schema.
  return typeof value === 'object' && value !== null && !('src' in value);
}

/** Resolves `entry.data.coverImage`, which is either one shared image for
 *  both languages or a `{ en, ar }` pair — see content.config.ts. Falls back
 *  to whichever language actually has a value if the current one doesn't. */
export function resolveCoverImage(value: ImageMetadata | Localized<ImageMetadata>, lang: Locale): ImageMetadata {
  if (!isBilingual(value)) return value;
  return (value[lang] ?? value.en ?? value.ar)!;
}

/** Same idea as resolveCoverImage(), for `entry.data.pdf`. */
export function resolvePdf(value: string | Localized<string> | undefined, lang: Locale): string | undefined {
  if (value === undefined || !isBilingual(value)) return value;
  return value[lang] ?? value.en ?? value.ar;
}
