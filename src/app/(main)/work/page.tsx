import WorkArchiveSection from '@/components/sections/WorkArchiveSection'
import CTASection from '@/components/sections/CtaSection'
import { getProjects } from '@/lib/projects'

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <>
      <WorkArchiveSection projects={projects} />
      <CTASection />
    </>
  )
}
