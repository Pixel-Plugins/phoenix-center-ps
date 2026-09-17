import { getCollection, type CollectionEntry } from 'astro:content';
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
