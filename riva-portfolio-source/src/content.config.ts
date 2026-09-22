import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    // Short line under the title on cards + case study header, e.g. "Al Ghurair Foods · Professional Internship"
    subtitle: z.string(),
    // One or more categories used for filtering on the Work landing page
    category: z.array(
      z.enum([
        'Professional & Client Work',
        'Consumer Insights',
        'Customer Experience',
        'Brand Strategy',
      ])
    ),
    // Label shown as a small tag: Professional internship / Client collaboration / Independent concept / Academic project
    projectType: z.string(),
    // One-sentence teaser for cards + home page
    summary: z.string(),
    // Order projects appear in (lower = earlier)
    order: z.number(),
    // Cover image; leave the placeholder path if no real image yet
    coverImage: z.string().default('/images/work/placeholder.svg'),
    coverImageAlt: z.string(),
    draft: z.boolean().default(false),
    // Compact "At a glance" facts shown on the case study overview — role, method, focus, etc.
    // Only ever drawn from facts already written in the project body; never invented.
    atAGlance: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  }),
});

const decode = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/decode' }),
  schema: z.object({
    number: z.number(), // 1, 2, 3...
    title: z.string(),
    // e.g. "Share a Coke, personalization, and the self-reference effect"
    topic: z.string(),
    summary: z.string(),
    publishDate: z.coerce.date(),
    linkedinUrl: z.union([z.string().url(), z.literal('')]).optional(),
    coverImage: z.string().default('/images/decode/placeholder.svg'),
    coverImageAlt: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, decode };
