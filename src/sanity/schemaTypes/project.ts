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
