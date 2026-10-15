import HomeLanding from '@/components/home/HomeLanding'
import { getProjects } from '@/lib/projects'
import { getArticles } from '@/lib/articles'

export default async function HomePage() {
  const [projects, articles] = await Promise.all([
    getProjects(),
    getArticles(),
  ])

  return (
    <HomeLanding
      projects={projects.slice(0, 3)}
      articles={articles.slice(0, 3)}
    />
  )
}
