import { getEntries, type CollectionEntry } from 'astro:content';
import { getPublicationsForLang } from './getPublications';
import type { Locale } from '../i18n/utils';

/**
 * Which real publication categories a given service is actually about.
 * Drives the automatic "Related Publications" match below. Update this
 * mapping (not individual service files) if the real taxonomy changes.
 */
const CATEGORIES_BY_SERVICE: Record<string, CollectionEntry<'publications'>['data']['category'][]> = {
  'research-and-development': ['research-field-studies'],
  'policy-advocacy': ['political-papers', 'case-assessment'],
  'training-and-capacity-building': ['seminars', 'fact-sheets'],
};

/**
 * Publications shown as "Related" on a service detail page.
 *
 * By default this is fully automatic: it pulls the most recent real
 * publications whose `category` actually matches the service (see the
 * mapping above), so it stays accurate as new publications get added —
 * no one has to remember to update the service page.
 *
 * `examplePublicationSlugs` on the service's own content file is an
 * optional manual override/pin for when the automatic category match
 * isn't the right call for a specific case — if it's set, it wins.
 */
export async function getRelatedPublications(service: CollectionEntry<'services'>, lang: Locale, limit = 2) {
  if (service.data.examplePublicationSlugs.length) {
    const pinned = await getEntries(service.data.examplePublicationSlugs.map((id) => ({ collection: 'publications' as const, id })));
    return pinned.filter((p) => p.data.languages.includes(lang));
  }

  const categories = CATEGORIES_BY_SERVICE[service.data.slug] ?? [];
  const all = await getPublicationsForLang(lang);

  return all
    .filter((p) => categories.includes(p.data.category))
    .sort((a, b) => {
      if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
      return b.data.date.getTime() - a.data.date.getTime();
    })
    .slice(0, limit);
}
