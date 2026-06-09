import HeroSection      from '@/components/sections/Herosection'
import ShowreelSection  from '@/components/sections/ShowreelSection'
import AboutSection     from '@/components/sections/AboutSection'
import WorkSection      from '@/components/sections/WorkSection'
import ServicesSection  from '@/components/sections/ServicesSection'
import TechStackSection from '@/components/sections/TechStackSection'
import CTASection       from '@/components/sections/CtaSection'
import { getProjects } from '@/lib/projects'

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <>
      <HeroSection />
      <ShowreelSection />
      <AboutSection />
      <WorkSection projects={projects} />
      <ServicesSection />
      <TechStackSection />
      <CTASection />
    </>
  )
}
