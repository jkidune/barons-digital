import { defineArrayMember, defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Articles (Journal)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
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
      title: 'Display Order / Priority',
      type: 'number',
      description: 'Lower numbers appear first. 1 is typically the featured/latest article.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Brand, Digital, Practice, Strategy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publication Date Display',
      type: 'string',
      description: 'Display date, e.g. "September 2026"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      description: 'Brief summary displayed in article cards and headers.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Fallback Image URL',
      type: 'string',
      description: 'Optional path or URL if not uploading a direct image asset (e.g. /images/services/identity-design.jpg).',
    }),
    defineField({
      name: 'body',
      title: 'Article Paragraphs',
      type: 'array',
      description: 'Ordered paragraphs that form the body of the article.',
      of: [
        defineArrayMember({
          type: 'text',
          rows: 4,
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'date',
      media: 'image',
    },
    prepare({ title, category, date, media }) {
      return {
        title: title || 'Untitled Article',
        subtitle: [category, date].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
