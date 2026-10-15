import { client, hasSanityConfig, urlFor } from '@/lib/sanity'
import { articles as fallbackArticles } from '@/data/content'

export type Article = {
  slug: string
  category: string
  title: string
  excerpt: string
  image: string
  date: string
  body: string[]
  order?: number
}

type SanityArticle = Omit<Article, 'slug' | 'image'> & {
  slug?: string | { current?: string }
  image?: unknown
  imageUrl?: string
}

const articleQuery = `
  *[_type == "article"] | order(coalesce(order, 999), date desc, title asc) {
    title,
    "slug": slug.current,
    category,
    date,
    excerpt,
    order,
    image,
    imageUrl,
    body
  }
`

function imageToUrl(source: unknown, fallback: string) {
  if (!source) return fallback
  if (typeof source === 'string') return source

  try {
    return urlFor(source).width(1400).quality(85).url()
  } catch {
    return fallback
  }
}

function normalizeSlug(slug: SanityArticle['slug'], fallback: string) {
  if (!slug) return fallback
  if (typeof slug === 'string') return slug
  return slug.current || fallback
}

function normalizeArticle(article: SanityArticle, index: number): Article {
  const fallback = fallbackArticles[index] || fallbackArticles[0]
  const slug = normalizeSlug(article.slug, fallback.slug)
  const title = article.title || fallback.title
  const image = article.image
    ? imageToUrl(article.image, article.imageUrl || fallback.image)
    : (article.imageUrl || fallback.image)

  return {
    ...fallback,
    ...article,
    title,
    slug,
    image,
    body: article.body?.length ? article.body : fallback.body,
    excerpt: article.excerpt || fallback.excerpt,
    category: article.category || fallback.category,
    date: article.date || fallback.date,
  }
}

export async function getArticles(): Promise<Article[]> {
  if (!hasSanityConfig || !client) return fallbackArticles

  try {
    const sanityArticles = await client.fetch<SanityArticle[]>(articleQuery, {}, {
      next: { revalidate: 60 },
    })

    if (!sanityArticles?.length) return fallbackArticles
    return sanityArticles.map(normalizeArticle)
  } catch {
    return fallbackArticles
  }
}

export async function getArticleBySlug(slug: string) {
  const articles = await getArticles()
  const articleIndex = articles.findIndex((article) => article.slug === slug)

  if (articleIndex === -1) return null

  return {
    article: articles[articleIndex],
    nextArticle: articles[(articleIndex + 1) % articles.length],
  }
}
