import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

function bilingual<T extends z.ZodType = z.ZodString>(inner: T = z.string() as unknown as T) {
  return z.object({ en: inner.optional(), ar: inner.optional() });
}

function bilingualRequired<T extends z.ZodType = z.ZodString>(inner: T = z.string() as unknown as T) {
  return z.object({ en: inner, ar: inner });
}

const publicationCategories = [
  'political-papers',
  'case-assessment',
  'seminars',
  'fact-sheets',
  'research-field-studies',
] as const;

const serviceSlugs = ['research-and-development', 'policy-advocacy', 'training-and-capacity-building'] as const;

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: ({ image }) =>
    z
      .object({
        title: bilingual(),
        category: z.enum(publicationCategories),
        date: z.coerce.date(),
        coverImage: image(),
        pdf: z.string().optional(),
        excerpt: bilingual().optional(),
        // AI-translated English body for a publication whose Markdown body
        // (the default/native content) is Arabic — same lightweight bold
        // and italic paragraph conventions as the native body (see the
        // pub-body styles in [slug].astro, which key off those). Absent
        // for the one publication whose native body is already English.
        bodyEn: z.string().optional(),
        order: z.number().optional(),
        featured: z.boolean().default(false),
        relatedService: z.enum(serviceSlugs).optional(),
      })
      .refine((data) => data.title.en || data.title.ar, {
        message: 'A publication needs a title in at least one language',
        path: ['title'],
      }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: bilingualRequired(),
      photo: image(),
      isPlaceholder: z.boolean().default(true),
      order: z.number().default(0),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: bilingualRequired(),
      partnerOrFunder: bilingualRequired(),
      description: bilingualRequired(),
      activities: z.array(bilingualRequired()).default([]),
      pdf: z.string().optional(),
      // A real secondary link the live page has for this project (e.g.
      // "View Publications") that isn't a PDF download — an internal
      // site path, run through `localizedPath` at render time.
      ctaUrl: z.string().optional(),
      ctaLabel: bilingual().optional(),
      // No per-project photography exists (real constraint, not a gap to
      // fill with stock photos) — a project's visual identity is its
      // partner/funder logo. `logo` absent means "self-run, no external
      // partner"; render the typographic plate from `plateTitle`/`plateSub`
      // instead (both required together, enforced below).
      logo: image().optional(),
      // Some real partner logos (e.g. Arab Center for Research & Policy
      // Studies) are light/white-on-transparent, made for a dark ground —
      // same `dark` flag convention as partners.yaml/PartnersGrid.astro.
      logoDark: z.boolean().default(false),
      plateTitle: bilingual().optional(),
      plateSub: bilingual().optional(),
      order: z.number().default(0),
    })
    .refine((data) => data.logo || (data.plateTitle && data.plateSub), {
      message: 'A project needs either a logo, or both plateTitle and plateSub for the typographic plate',
      path: ['logo'],
    }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    slug: z.enum(serviceSlugs),
    heroStatement: bilingualRequired(),
    intro: bilingualRequired(),
    processSteps: z
      .array(
        z.object({
          step: z.number(),
          title: bilingualRequired(),
          description: bilingualRequired(),
        }),
      )
      .length(8),
    examplePublicationSlugs: z.array(z.string()).max(2).default([]),
  }),
});

const partners = defineCollection({
  loader: file('src/content/partners/partners.yaml'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: bilingualRequired(),
      logo: image(),
      dark: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

export const collections = { publications, team, projects, services, partners };
export { publicationCategories, serviceSlugs };
