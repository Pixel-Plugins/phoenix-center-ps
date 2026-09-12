# Phoenix Center — Website

Bilingual (English / Arabic) website for [Phoenix Center](https://phoenix-center.ps), an independent Palestinian non-profit research institution. Built as a static site for free hosting on GitHub Pages — no server, no CMS, no hosting cost.

## Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | [Astro](https://astro.build) (static output) | Native i18n routing, file-per-item content collections (ideal for 50+ publications), ships near-zero client JS by default, builds to plain HTML for free static hosting |
| Content | Markdown + YAML, validated by Zod schemas | Every publication/team member/project/service is one file — easy diffs, easy PRs, type-checked at build time |
| Styling | Plain CSS with design tokens (custom properties), Astro scoped `<style>` per component | No CSS framework needed at this size; tokens centralize the brand palette/type/spacing |
| Fonts | Self-hosted via `@fontsource` (Source Serif 4 + Public Sans for English, Cairo for Arabic) | No third-party Google Fonts request; better for lower-bandwidth visitors |
| Images | `astro:assets` (`<Image>`, Sharp under the hood) | Automatic resize/compress/WebP conversion at build time; GitHub Pages' CDN (Fastly) serves the optimized static output |
| Hosting | GitHub Pages, deployed via GitHub Actions (`withastro/action` + `actions/deploy-pages`) | Free, no server to maintain, custom domain via `public/CNAME` |
| Contact form | [Formspree](https://formspree.io) (POST-to-endpoint) | GitHub Pages has no backend; Formspree needs no server code |

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321/ (English) and /ar/ (Arabic)
npx astro check  # type-check the whole project
npm run build    # full static build to dist/
npm run preview  # serve the built dist/ locally
```

Node 22+ required (see `package.json` → `engines`).

## URL structure / i18n

- **English lives at the bare root**: `/`, `/about-us/`, `/publications/`, etc.
- **Arabic lives under `/ar/`**: `/ar/`, `/ar/about-us/`, `/ar/publications/`, etc.
- This matches the client's original site's URL shape (chosen deliberately to avoid breaking any existing SEO/backlinks), configured in `astro.config.mjs` via Astro's `i18n` option with no `prefixDefaultLocale`.
- **Every page in `src/pages/` has an exact mirror under `src/pages/ar/`.** There is no shared/dynamic-locale routing — when adding a new static page, create it in both places. (Collection-driven routes like `publications/[slug].astro` are the exception: one route file per language, each querying the same collection.)
- RTL is handled per-page (`<html dir="rtl">` set in `BaseLayout.astro` based on the URL) **and per-node** where needed — see "Bilingual content" below.

## Project structure

```
src/
├── content.config.ts       # Zod schemas for all content collections — READ THIS FIRST
├── content/                # Markdown/YAML content, one file per item
│   ├── publications/       # ~51 real publications (title, date, category, cover image, PDF)
│   ├── team/                # team bios
│   ├── projects/            # partnership projects
│   ├── services/            # the 3 service offerings (8-step process + example publications each)
│   └── partners/partners.yaml
├── data/                   # Plain typed TS dictionaries — content that isn't file-per-item
│   ├── siteConfig.ts        # org contact info, socials, brand asset paths, Formspree ID
│   ├── homepage.ts           # homepage-only content: stats, pillars, testimonials, announcement
│   ├── about.ts, services.ts # About/Services page copy
│   └── nav.ts                # nav + footer service links
├── i18n/
│   ├── ui.ts                 # static UI string dictionary {en:{...}, ar:{...}}
│   └── utils.ts               # getLangFromUrl, useTranslations, localizedPath, pickLocalized
├── layouts/
│   └── BaseLayout.astro      # <html lang/dir>, head, fonts, Header, Footer — wraps every page
├── components/
│   ├── layout/                # Header, Footer, LanguageSwitcher, Announcement
│   ├── sections/              # Hero, PillarsGrid, ApproachChecklist, PartnersGrid, PageHero, etc.
│   ├── publications/           # PublicationCard, PublicationGrid, CategoryFilterTabs, Pagination
│   └── ui/                     # Section, Button, ServiceCard, ProcessStep, ProjectCard
├── styles/
│   ├── tokens.css             # design tokens (colors, type, spacing) — brand palette lives here
│   ├── fonts.css               # @fontsource imports
│   └── global.css              # resets + base element styles
├── assets/                 # Images imported by components (optimized at build time)
│   ├── brand/                 # logo/icon
│   ├── publications/real/      # real downloaded cover images
│   ├── team/, projects/, partners/, services/
└── pages/                  # File-based routes — see "URL structure" above
    ├── index.astro, about-us.astro, contact.astro, privacy.astro, terms.astro, projects.astro
    ├── services/               # listing + 3 detail pages
    ├── publications/
    │   ├── index.astro          # bare /publications/ = page 1 of "all"
    │   ├── [category]/[...page].astro   # paginated listing, shared by "all" + 5 real categories
    │   └── [slug].astro          # publication detail page
    └── ar/                    # exact mirror of everything above
```

## Content model

Two kinds of content, deliberately kept separate:

1. **Collections** (`src/content/*`, schemas in `src/content.config.ts`) — for anything that scales or repeats: `publications`, `team`, `projects`, `services`, `partners`. One file per item. Adding a new publication means adding one new Markdown file, not editing a shared array.
2. **Typed dictionaries** (`src/data/*.ts`) — for small, page-specific, non-repeating content: homepage sections, nav labels, site-wide config. Plain TypeScript objects, not collections, because they're never listed/paginated/filtered generically.

### Bilingual fields

Every bilingual field uses the shape `{ en?: string, ar?: string }` (see `Bilingual<T>` in `src/i18n/utils.ts`), inline per field — not separate English/Arabic collections. Most publications are Arabic-only (`en` omitted); a few are English-only. Read a field with `pickLocalized(field, currentLang)`, which:

- Returns the current UI language's value if present.
- **Falls back to whichever language actually has content** if not.
- Returns `{ value, lang, dir }` — the language/direction of the value **actually rendered**, not the ambient page language.

This last point matters: an Arabic publication title must render RTL even on an English-UI page, and vice versa for the rare English-titled item on the Arabic site. Every component that renders a bilingual field applies `lang`/`dir` to that specific node (see `PublicationCard.astro`), not just relying on `<html dir>`.

### Publication taxonomy

Publications have exactly one real classification: `category`, one of `political-papers | case-assessment | seminars | fact-sheets | research-field-studies` — this is the client's actual taxonomy, verified directly against their live site. The homepage's two publication rows ("Books & Journals" / "Research Papers") are simple filters over this same field (`research-field-studies` vs. everything else) — confirmed to be a 100% consistent mapping on the live site, not a separate/invented field.

## Design tokens & branding

All colors, type, spacing, and radii are custom properties in `src/styles/tokens.css`, split into two layers:

- **Raw palette** (`--navy`, `--sage`, `--gold`, etc.) — the actual brand values. Currently sampled directly from the real logo files in `src/assets/brand/`.
- **Semantic tokens** (`--color-brand-primary`, `--color-surface`, `--color-text`, etc.) — map roles to the raw palette. Components reference semantic names, not raw palette names, wherever the reference is about *role* rather than literal brand identity.

**To rebrand later**: change the raw palette block in `tokens.css` and the asset paths in `src/data/siteConfig.ts` (`brand.icon`, `brand.logoDark`, `brand.logoLight`) — no component should need touching.

## Adding content

### New publication (one file covers both languages)

Add **one** Markdown file to `src/content/publications/` — the filename becomes the slug, and the same slug is the URL in *both* languages automatically (`/publications/<slug>/` and `/ar/publications/<slug>/` both render from this one file). There is no separate Arabic file to create.

```md
---
title:
  en: Youth Political Participation and Empowerment   # omit if no English title exists
  ar: مشاركة الشباب السياسية وتمكينهم                    # omit if no Arabic title exists — at least one is required
category: fact-sheets   # one of: political-papers | case-assessment | seminars | fact-sheets | research-field-studies
date: 2026-03-01
coverImage: ../../assets/publications/real/some-image.jpg   # 1600×900px (16:9) — see content.config.ts for full validation
pdf: https://example.com/some-report.pdf   # optional
---
```

Most real publications only have an Arabic title (`en` omitted) — that's expected and handled: the site falls back to whichever language is present, and renders that title's own text direction correctly regardless of which language the visitor is browsing in (see "Bilingual fields" above).

### New team member / project / service

Same one-file-both-languages pattern — add one new file to the matching `src/content/team/`, `src/content/projects/`, or `src/content/services/` folder, using an existing file in that folder as a template for the exact frontmatter shape.

### New static page (needs two files)

Static pages (things in `src/pages/` that aren't collection-driven, like About or Contact) are the **exception** — Astro has no shared/dynamic-locale routing set up for them, so each one is a real, separate file per language. To add one: create it in `src/pages/`, then copy it to the identical path under `src/pages/ar/` and translate its copy. When copying, fix the relative import paths — everything under `src/pages/ar/` is one directory level deeper, so `../../` becomes `../../../`, etc.

## Deployment

- GitHub Actions workflow: `.github/workflows/deploy.yml` — builds with `withastro/action`, deploys with `actions/deploy-pages`. Runs on every push to `main`.
- **Repo setup required once**: Settings → Pages → Source → "GitHub Actions" (not "Deploy from a branch").
- Custom domain: `public/CNAME` contains `phoenix-center.ps` — copied verbatim into the build output, so GitHub persists the custom domain automatically. DNS (pointing the registrar's records at GitHub Pages) is a separate, external step.

## Status / what's not done yet

This project is under active build. For a detailed, current breakdown of what's built, what's deliberately deferred, and what's blocking launch, see the (gitignored, internal) `.local/progress.md` and `.local/notes.md` if you have access to them locally — they're not part of the committed repo.
