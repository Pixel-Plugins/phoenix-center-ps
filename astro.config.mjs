// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { legacyPublicationRedirects } from './src/data/legacyPublicationRedirects.mjs';

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
  redirects[`/case/${oldSlug}/`] = `/publications/${newSlug}/`;
  redirects[`/ar/case/${oldSlug}/`] = `/ar/publications/${newSlug}/`;
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
  integrations: [sitemap()],
  redirects,
});
