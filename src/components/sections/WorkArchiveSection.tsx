'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Project } from '@/data/project'

gsap.registerPlugin(ScrollTrigger)

function getDisplayYear(year: string) {
  const match = year.match(/(\d{2})$/)
  return match ? `'${match[1]}` : year
}

function getSortYear(year: string) {
  const match = year.match(/(\d{2})$/)
  return match ? Number(match[1]) : 0
}

export default function WorkArchiveSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeYear, setActiveYear] = useState(0)

  const projectGroups = useMemo(() => {
    const groups = new Map<string, Project[]>()

    projects.forEach((project) => {
      const year = getDisplayYear(project.year)
      const existing = groups.get(year) || []
      groups.set(year, [...existing, project])
    })

    return Array.from(groups.entries())
      .map(([year, groupProjects]) => ({
        year,
        sortYear: getSortYear(year),
        projects: groupProjects,
      }))
      .sort((a, b) => b.sortYear - a.sortYear)
  }, [projects])

  useGSAP(() => {
    if (!sectionRef.current) return

    const projectItems = gsap.utils.toArray<HTMLElement>('.work-archive-project')
    gsap.set(projectItems, { y: 80, opacity: 0 })
    gsap.to(projectItems, {
      y: 0,
      opacity: 1,
      stagger: 0.06,
      delay: 0.25,
      duration: 1,
      ease: 'power3.out',
    })

    const groups = gsap.utils.toArray<HTMLElement>('.work-archive-group')
    groups.forEach((group, index) => {
      ScrollTrigger.create({
        trigger: group,
        start: 'top 48%',
        end: 'bottom 48%',
        onEnter: () => setActiveYear(index),
        onEnterBack: () => setActiveYear(index),
      })
    })

    if (window.innerWidth > 1024) {
      gsap.utils.toArray<HTMLElement>('.work-archive-year').forEach((year) => {
        gsap.to(year, {
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: year,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F7F7F2] px-5 pb-20 pt-[132px] text-[#181818] sm:px-8 md:pb-28 lg:px-12 lg:pt-[156px]"
    >
      <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-10 lg:grid-cols-[minmax(120px,0.72fr)_minmax(0,3fr)] lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-[30svh] flex w-max flex-col gap-4">
            {projectGroups.map((group, index) => (
              <a
                key={group.year}
                href={`#work-${group.year.replace("'", '')}`}
                className={`group/year relative flex w-max flex-col text-[15px] font-medium leading-none transition-colors duration-300 ${
                  activeYear === index ? 'text-[#181818]' : 'text-[#8D8D86]'
                }`}
                style={{ marginLeft: `${[0, 32, 16][index % 3]}px` }}
              >
                <span>{group.year.replace("'", '')}</span>
                <span
                  className={`mt-1 h-px origin-left bg-[#181818] transition-transform duration-300 ${
                    activeYear === index ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
          </div>
        </aside>

        <div className="flex flex-col">
          <header className="mb-16 grid gap-6 border-b border-black/10 pb-8 md:grid-cols-[1fr_auto] md:items-end lg:mb-20">
            <div>
              <p className="mb-4 text-[12px] font-semibold uppercase leading-none text-[#62625D]">
                Portfolio
              </p>
              <h1 className="max-w-[1040px] text-[clamp(54px,10vw,164px)] font-bold uppercase leading-[0.86] tracking-normal">
                Selected Work
              </h1>
            </div>
            <p className="max-w-[360px] text-[16px] leading-[1.35] text-[#62625D] md:text-right">
              Strategy, brand systems, websites, and digital products built for serious businesses.
            </p>
          </header>

          <div className="flex flex-col gap-24 lg:gap-28">
            {projectGroups.map((group) => (
              <div
                id={`work-${group.year.replace("'", '')}`}
                key={group.year}
                className="work-archive-group relative scroll-mt-28"
              >
                <div className="mb-5 overflow-hidden lg:pointer-events-none lg:absolute lg:left-[-132px] lg:top-16 lg:z-10 lg:mb-0">
                  <h2 className="work-archive-year text-[clamp(72px,12vw,180px)] font-bold uppercase leading-none tracking-normal text-[#181818]">
                    {group.year}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/work/${project.slug}`}
                      className="work-archive-project group block"
                    >
                      <article className="flex h-full flex-col gap-3">
                        <div className="relative aspect-[5/3] w-full overflow-hidden bg-black/5">
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        </div>

                        <div className="grid gap-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-[18px] font-semibold uppercase leading-[1.05] tracking-normal">
                              {project.title}
                            </h3>
                            <span className="shrink-0 text-[13px] font-medium leading-none text-[#62625D]">
                              {group.year.replace("'", '')}
                            </span>
                          </div>
                          <p className="text-[14px] leading-[1.3] text-[#62625D]">
                            {project.category}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
