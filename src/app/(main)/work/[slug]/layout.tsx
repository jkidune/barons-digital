import { getProjects } from '@/lib/projects'
import WorkRail from '@/components/work/WorkRail'

export default async function WorkCaseStudyLayout({ children }: { children: React.ReactNode }) {
  const projects = await getProjects()

  const groups = projects.reduce<{ industry: string; projects: typeof projects }[]>((acc, project) => {
    const industry = project.industry || 'Selected work'
    const group = acc.find((g) => g.industry === industry)
    if (group) group.projects.push(project)
    else acc.push({ industry, projects: [project] })
    return acc
  }, [])

  return (
    <div className="flex bg-[#FAF9F6]">
      <aside className="hidden w-[270px] shrink-0 border-r border-black/10 px-6 lg:sticky lg:top-[100px] lg:block lg:h-[calc(100vh-100px)] lg:overflow-y-auto lg:pb-10">
        <WorkRail groups={groups} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
