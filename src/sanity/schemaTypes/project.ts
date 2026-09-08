import { defineArrayMember, defineField, defineType } from 'sanity'

const textArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'text', rows: 3 })],
  })

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'Groups this project in the case-study rail, e.g. "Non-Profit", "Development Programme".',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'clientType',
      title: 'Client Type',
      type: 'string',
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'string',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Our Role',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Website URL',
      type: 'url',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'previewVideo',
      title: 'Preview Video URL',
      type: 'string',
      description: 'Use a public path such as /videos/work/project/preview.mp4 or a hosted URL.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'array',
      of: [defineArrayMember({ type: 'text', rows: 2 })],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'introductionTitle',
      title: 'Introduction Heading',
      type: 'string',
    }),
    textArray('introduction', 'Introduction'),
    textArray('challenge', 'Challenge'),
    textArray('approach', 'Approach'),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    textArray('outcome', 'Outcome'),
    defineField({
      name: 'outcomeStatement',
      title: 'Outcome statement',
      type: 'string',
      description: 'One plain sentence stating the result, shown directly under the project header.',
    }),
    defineField({
      name: 'scopeBlock',
      title: 'Scope block',
      type: 'array',
      description: 'The 4-column plain-text scope list (e.g. Strategy / Design / Development / Delivery).',
      of: [
        defineArrayMember({
          name: 'scopeCategory',
          title: 'Scope category',
          type: 'object',
          fields: [
            defineField({ name: 'category', title: 'Category', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Line items',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: { title: 'category', items: 'items' },
            prepare({ title, items }) {
              return { title, subtitle: items?.length ? `${items.length} items` : undefined }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'narrative',
      title: 'Narrative',
      type: 'array',
      description: 'Up to 3 short paragraphs telling the strategy story, shown on a plain dark panel.',
      of: [defineArrayMember({ type: 'text', rows: 3 })],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'brandColor',
      title: 'Brand color',
      type: 'string',
      description: 'Hex value for the full-bleed color-break section, e.g. #2F7A3D.',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      description: 'Only shown when a real, sourced client quote is available — leave empty to hide this section.',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'title', title: 'Title / role', type: 'string' }),
        defineField({ name: 'result', title: 'Headline result', type: 'string', description: 'A hard result stated plainly, e.g. "40% increase in programme sign-ups."' }),
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Short Overview',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'problem',
      title: 'Short Problem',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'solution',
      title: 'Short Solution',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'media',
      title: 'Case Study Media',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'mediaItem',
          title: 'Media Item',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.type === 'video',
            }),
            defineField({
              name: 'url',
              title: 'Image or Fallback URL',
              type: 'url',
              description: 'Optional external image URL.',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'gridClass',
              title: 'Grid Class',
              type: 'string',
              description: 'Optional Tailwind placement, for example col-span-2.',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              type: 'type',
              media: 'image',
            },
            prepare({ title, type, media }) {
              return {
                title: title || 'Media item',
                subtitle: type,
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
