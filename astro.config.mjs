// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { legacyPublicationRedirects } from './src/data/legacyPublicationRedirects.mjs';

// Real per-publication lastmod for the sitemap, sourced from each entry's own
// frontmatter `date` — not a build/deploy timestamp. Astro's content-collection
// API (astro:content) isn't available yet at config-eval time, so this reads
// the same markdown files' frontmatter directly with a small regex (no new
// dependency for just one field). Static pages (about, services, etc.) are
// deliberately left without lastmod rather than stamped with a fake shared
// date — see the sitemap() config below for why.
const publicationsDir = new URL('./src/content/publications/', import.meta.url);
/** @type {Record<string, string>} */
const publicationDates = {};
for (const file of readdirSync(publicationsDir)) {
  if (!file.endsWith('.md')) continue;
  const match = /^date:\s*(\S+)/m.exec(readFileSync(new URL(file, publicationsDir), 'utf-8'));
  if (match) publicationDates[file.replace(/\.md$/, '')] = match[1];
}

// GH_PAGES_PREVIEW is set in .github/workflows/deploy.yml while the site is
// only reachable at the GitHub-provided pixel-plugins.github.io/phoenix-center-ps/
// URL (before phoenix-center.ps DNS is pointed here). Assets are otherwise
// built as root-relative (correct for the eventual custom domain at the
// apex), which 404s under a GitHub Pages project subpath. Once DNS is live
// and the custom domain is set in the repo's Pages settings, remove
// GH_PAGES_PREVIEW from the workflow so this reverts to base: '/'.
const isGitHubPagesPreview = process.env.GH_PAGES_PREVIEW === 'true';

// GitHub Pages has no adapter, so these build as static HTML files with a
// <meta http-equiv="refresh"> redirect (no real 301) — see .local/notes.md's
// SEO section for why Cloudflare Redirect Rules were considered and skipped
// in favor of staying on plain GitHub Pages DNS.
/** @type {Record<string, string>} */
const redirects = {};
for (const { oldSlug, newSlug } of legacyPublicationRedirects) {
  // oldSlug is stored pre-percent-encoded (e.g. "%d8%a7%d9%84..."); using it
  // as-is here makes Astro write a stub directory literally named with `%`
  // characters, which only matches a REQUEST that's itself double-encoded
  // (verified live: single-encoded — what every real browser/crawler sends —
  // 404s; double-encoded 200s). Decoding first makes the built directory's
  // real UTF-8 bytes match what a normal single-encoded request resolves to.
  const decodedSlug = decodeURIComponent(oldSlug);
  redirects[`/case/${decodedSlug}/`] = `/publications/${newSlug}/`;
  redirects[`/ar/case/${decodedSlug}/`] = `/ar/publications/${newSlug}/`;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://phoenix-center.ps',
  base: isGitHubPagesPreview ? '/phoenix-center-ps/' : '/',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },
  integrations: [
    sitemap({
      // Only publication pages get a real lastmod (their own frontmatter
      // date) — everything else is left unset rather than stamped with the
      // build timestamp, which Google treats as untrustworthy noise once
      // every URL shares the same date regardless of whether it changed.
      serialize(item) {
        const match = /\/(?:ar\/)?publications\/([^/]+)\/$/.exec(new URL(item.url).pathname);
        const lastmod = match && publicationDates[match[1]];
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  redirects,
});
