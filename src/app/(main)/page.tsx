import HeroSection      from '@/components/sections/Herosection'
import ShowreelSection  from '@/components/sections/ShowreelSection'
import AboutSection     from '@/components/sections/AboutSection'
import WorkSection      from '@/components/sections/WorkSection'
import ServicesSection  from '@/components/sections/ServicesSection'
import TechStackSection from '@/components/sections/TechStackSection'
import CTASection       from '@/components/sections/CtaSection'
import Footer           from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ShowreelSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <TechStackSection />
      <CTASection />
      <Footer />
    </>
  )
}
