import { client, hasSanityConfig, urlFor } from '@/lib/sanity'
import { projects as fallbackProjects, type Project } from '@/data/project'

type SanityMedia = {
  type?: 'image' | 'video'
  url?: string
  videoUrl?: string
  image?: unknown
  caption?: string
  gridClass?: string
}

type SanityProject = Omit<Project, 'slug' | 'coverImage' | 'icon' | 'media'> & {
  slug?: string | { current?: string }
  coverImage?: string | unknown
  icon?: string | unknown
  media?: SanityMedia[]
  order?: number
}

function findFallback(slug: SanityProject['slug'], index: number) {
  const targetSlug = normalizeSlug(slug, '')
  return fallbackProjects.find((p) => p.slug === targetSlug) || fallbackProjects[index] || fallbackProjects[0]
}

const projectQuery = `
  *[_type == "project"] | order(coalesce(order, 999), year desc, title asc) {
    title,
    icon,
    "slug": slug.current,
    category,
    year,
    scope,
    timeline,
    duration,
    client,
    clientType,
    projectType,
    role,
    liveUrl,
    summary,
    keywords,
    services,
    coverImage,
    previewVideo,
    introductionTitle,
    introduction,
    challenge,
    approach,
    features,
    outcome,
    industry,
    outcomeStatement,
    scopeBlock,
    narrative,
    brandColor,
    testimonial,
    overview,
    problem,
    solution,
    media[]{
      type,
      url,
      videoUrl,
      image,
      caption,
      gridClass
    }
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

function normalizeSlug(slug: SanityProject['slug'], fallback: string) {
  if (!slug) return fallback
  if (typeof slug === 'string') return slug
  return slug.current || fallback
}

function normalizeProject(project: SanityProject, index: number): Project {
  const fallback = findFallback(project.slug, index)
  const slug = normalizeSlug(project.slug, fallback.slug)
  const title = project.title || fallback.title

  return {
    ...fallback,
    ...project,
    title,
    slug,
    icon: imageToUrl(project.icon, fallback.icon),
    coverImage: imageToUrl(project.coverImage, fallback.coverImage),
    previewVideo: project.previewVideo || fallback.previewVideo,
    summary: project.summary?.length ? project.summary : fallback.summary,
    keywords: project.keywords?.length ? project.keywords : fallback.keywords,
    services: project.services?.length ? project.services : fallback.services,
    introduction: project.introduction?.length ? project.introduction : fallback.introduction,
    challenge: project.challenge?.length ? project.challenge : fallback.challenge,
    approach: project.approach?.length ? project.approach : fallback.approach,
    features: project.features?.length ? project.features : fallback.features,
    outcome: project.outcome?.length ? project.outcome : fallback.outcome,
    overview: project.overview || fallback.overview,
    problem: project.problem || fallback.problem,
    solution: project.solution || fallback.solution,
    industry: project.industry || fallback.industry,
    outcomeStatement: project.outcomeStatement || fallback.outcomeStatement,
    scopeBlock: project.scopeBlock?.length ? project.scopeBlock : fallback.scopeBlock,
    narrative: project.narrative?.length ? project.narrative : fallback.narrative,
    brandColor: project.brandColor || fallback.brandColor,
    testimonial: project.testimonial?.quote ? project.testimonial : fallback.testimonial,
    liveUrl: typeof project.liveUrl === 'undefined' ? fallback.liveUrl : project.liveUrl,
    media: project.media?.map((item) => ({
      type: item.type || (item.videoUrl || item.url?.endsWith('.mp4') ? 'video' : 'image'),
      url: item.videoUrl || imageToUrl(item.image, item.url || fallback.coverImage),
      caption: item.caption,
      gridClass: item.gridClass,
    })) || fallback.media,
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!hasSanityConfig || !client) return fallbackProjects

  try {
    const sanityProjects = await client.fetch<SanityProject[]>(projectQuery, {}, {
      next: { revalidate: 60 },
    })

    if (!sanityProjects?.length) return fallbackProjects
    return sanityProjects.map(normalizeProject)
  } catch {
    return fallbackProjects
  }
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects()
  const projectIndex = projects.findIndex((project) => project.slug === slug)

  if (projectIndex === -1) return null

  return {
    project: projects[projectIndex],
    nextProject: projects[(projectIndex + 1) % projects.length],
  }
}
