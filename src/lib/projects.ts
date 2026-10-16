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

function normalizeProject(project: SanityProject): Project {
  const slug = normalizeSlug(project.slug, '')
  const coverImage = imageToUrl(project.coverImage, '')

  // Sanity documents must never borrow another client's case-study content.
  // The static projects are used only when Sanity is unavailable or empty.
  return {
    ...project,
    title: project.title || '',
    slug,
    category: project.category || '',
    year: project.year || '',
    scope: project.scope || '',
    timeline: project.timeline || '',
    liveUrl: project.liveUrl ?? null,
    icon: imageToUrl(project.icon, coverImage),
    coverImage,
    previewVideo: project.previewVideo || '',
    summary: project.summary || [],
    keywords: project.keywords || [],
    services: project.services || [],
    introduction: project.introduction || [],
    challenge: project.challenge || [],
    approach: project.approach || [],
    features: project.features || [],
    outcome: project.outcome || [],
    overview: project.overview || '',
    problem: project.problem || '',
    solution: project.solution || '',
    media: project.media?.map((item) => ({
      type: item.type || (item.videoUrl || item.url?.endsWith('.mp4') ? 'video' : 'image'),
      url: item.videoUrl || imageToUrl(item.image, item.url || coverImage),
      caption: item.caption,
      gridClass: item.gridClass,
    })) || [],
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
