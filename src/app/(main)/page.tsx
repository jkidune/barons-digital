import HomeLanding from '@/components/home/HomeLanding'
import { getProjects } from '@/lib/projects'

export default async function HomePage() {
  const projects = await getProjects()

  return <HomeLanding projects={projects.slice(0, 3)} />
}
