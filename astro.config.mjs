// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GH_PAGES_PREVIEW is set in .github/workflows/deploy.yml while the site is
// only reachable at the GitHub-provided pixel-plugins.github.io/phoenix-center-ps/
// URL (before phoenix-center.ps DNS is pointed here). Assets are otherwise
// built as root-relative (correct for the eventual custom domain at the
// apex), which 404s under a GitHub Pages project subpath. Once DNS is live
// and the custom domain is set in the repo's Pages settings, remove
// GH_PAGES_PREVIEW from the workflow so this reverts to base: '/'.
const isGitHubPagesPreview = process.env.GH_PAGES_PREVIEW === 'true';

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
});
