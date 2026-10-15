import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import PageHeader from '@/components/ui/PageHeader'
import PageMotion from '@/components/ui/PageMotion'

const chip = 'bg-white px-[10px] py-[8px] text-[0.8rem] font-medium uppercase leading-none text-black md:text-base'

export default async function WorkPage() {
  const projects = await getProjects()
  return (
    <div className="bg-white text-black">
      <PageMotion />
      <PageHeader label="Projects" title="Evidence, not decoration." intro="A selection of brands, platforms and organisations we have built for, each one led by a clear problem and measured by what changed." />

      <section className="px-5 pb-28 md:px-[3.6vw] md:pb-44">
        <div className="grid gap-x-[1.6vw] gap-y-16 md:grid-cols-2 md:gap-y-[6vw]">
          {projects.map((project, i) => (
            <article className={i % 2 ? 'md:mt-[10vw]' : ''} key={project.slug}>
              <Link className="group block" data-cursor="view" href={`/work/${project.slug}`}>
                <div className="relative aspect-[871/503] overflow-hidden bg-neutral-200" data-mask>
                  <Image alt={project.title} className="object-cover transition duration-700 group-hover:scale-[1.03]" fill sizes="(max-width: 768px) 100vw, 50vw" src={project.coverImage} />
                </div>
                <div className="mt-5 flex items-center justify-between gap-2" data-reveal>
                  <span className={chip}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`${chip} text-center`}>{project.title}</span>
                  <span className={`${chip} text-right`}>{project.category}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
