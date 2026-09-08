import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const projects = await getProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getProjectBySlug(slug)

  if (!result) notFound()

  const { project } = result

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1c1c1c] selection:bg-black selection:text-white">
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <section className="w-full px-6 pb-16 pt-[140px] md:px-12 md:pt-[180px] lg:px-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-black/10 pt-6">
          <span className="text-[0.8rem] text-[#696764]">{project.client || project.title}</span>
          {project.liveUrl && (
            <a
              className="group inline-flex items-center gap-1.5 text-[0.8rem] text-black"
              href={project.liveUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Visit site
              <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          )}
        </div>
        <h1 className="mt-6 max-w-[26ch] text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">
          {project.title}
        </h1>
        {project.outcomeStatement && (
          <p className="mt-8 max-w-[42rem] text-[1.15rem] leading-[1.55] text-black/70">{project.outcomeStatement}</p>
        )}
      </section>

      {/* ── SCOPE BLOCK ──────────────────────────────────────────────────── */}
      {project.scopeBlock && project.scopeBlock.length > 0 && (
        <section className="w-full px-6 pb-20 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-black/10 pt-8 md:grid-cols-4">
            {project.scopeBlock.map((group) => (
              <div key={group.category}>
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#696764]">{group.category}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li className="text-[0.85rem] leading-[1.5] text-black/80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── NARRATIVE ────────────────────────────────────────────────────── */}
      {project.narrative && project.narrative.length > 0 && (
        <section className="w-full bg-black px-6 py-20 text-white md:px-12 md:py-28 lg:px-16">
          <div className="flex max-w-[42rem] flex-col gap-8">
            {project.narrative.map((paragraph) => (
              <p className="text-[1.35rem] leading-[1.5] font-light text-white/85 md:text-[1.6rem]" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ── FULL-BLEED BRAND COLOR BREAK ────────────────────────────────── */}
      {project.brandColor && (
        <section className="flex w-full items-center justify-center py-28 md:py-40" style={{ backgroundColor: project.brandColor }}>
          <div className="relative size-16 overflow-hidden md:size-20">
            <Image alt="" className="object-cover" fill sizes="80px" src={project.icon} />
          </div>
        </section>
      )}

      {/* ── PRODUCT / UI SCREENSHOTS ─────────────────────────────────────── */}
      {project.media && project.media.length > 0 && (
        <section className="w-full px-6 py-20 md:px-12 md:py-28 lg:px-16">
          <div className="flex flex-col gap-16">
            {project.media.map((m) => (
              <div className="flex flex-col gap-3" key={m.url}>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  {m.type === 'image' ? (
                    <Image alt={m.caption || ''} className="object-cover" fill src={m.url} />
                  ) : (
                    <video className="size-full object-cover" controls playsInline src={m.url} />
                  )}
                </div>
                {m.caption && <span className="text-[0.75rem] uppercase tracking-wider text-[#696764]">{m.caption}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
      {project.testimonial?.quote && (
        <section className="w-full border-t border-black/10 px-6 py-20 md:px-12 md:py-28 lg:px-16">
          <p className="max-w-[46rem] text-[1.6rem] font-light leading-[1.4] md:text-[2rem]">“{project.testimonial.quote}”</p>
          <div className="mt-8 flex flex-wrap items-baseline gap-3">
            <span className="text-[0.9rem] font-medium">{project.testimonial.name}</span>
            <span className="text-[0.85rem] text-[#696764]">{project.testimonial.title}</span>
          </div>
          {project.testimonial.result && (
            <p className="mt-2 text-[0.85rem] uppercase tracking-[0.08em] text-[#696764]">{project.testimonial.result}</p>
          )}
        </section>
      )}

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="w-full border-t border-black/10 px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <Link className="group flex flex-col gap-4" href="/contact">
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#696764]">Start a project</span>
          <span className="inline-flex max-w-[30ch] items-baseline gap-3 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Let’s talk about your project
            <span className="text-[1.5rem] transition-transform duration-300 group-hover:translate-x-2">→</span>
          </span>
        </Link>
      </section>
    </article>
  )
}
