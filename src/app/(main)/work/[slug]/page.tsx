import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import PageMotion from '@/components/ui/PageMotion'

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }))
}

const kicker = 'text-sm font-medium uppercase text-black/60'

// Headline carries the slide: the first sentence is the takeaway, the rest is detail
function lead(paragraphs: string[]) {
  const [first, ...rest] = paragraphs
  const match = first.match(/^[^.!?]+[.!?]/)
  if (!match || match[0].length === first.length) return { headline: first, detail: rest }
  return { headline: match[0].trim(), detail: [first.slice(match[0].length).trim(), ...rest] }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getProjectBySlug(slug)
  if (!result) notFound()
  const { project, nextProject } = result

  const intro = project.introduction?.length ? project.introduction : [project.overview]
  const challenge = lead(project.challenge?.length ? project.challenge : [project.problem])
  const approach = lead(project.approach?.length ? project.approach : [project.solution])
  const outcome = project.outcome?.length ? lead(project.outcome) : null
  const facts = [
    ['Client', project.client],
    ['Our role', project.role || project.scope],
    ['Duration', project.duration || project.timeline],
    ['Status', project.liveUrl ? 'Live project' : 'Private release'],
  ].filter(([, value]) => value)
  const gallery = (project.media ?? []).filter((item) => item.url && item.url !== project.coverImage)
  const editorialBoards = ['biashara-os', 'checkpoint'].includes(project.slug)

  return (
    <article className="bg-white text-black">
      <PageMotion />

      <header className="px-5 pb-16 pt-36 md:px-[3.6vw] md:pb-24 md:pt-[11vw]">
        <div>
          <Link className="bd-link text-sm font-medium uppercase text-black/60" data-reveal href="/work">← All projects</Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <p className="mb-6 text-sm font-medium uppercase text-black/60" data-reveal>{project.category} · {project.year}</p>
              <h1 className="text-[clamp(3.2rem,9.5vw,9rem)] font-semibold leading-[0.95] tracking-[-0.045em]" data-reveal>{project.title}</h1>
            </div>
            <p className="max-w-[28rem] text-base leading-6 text-[#6b6b6b] lg:col-span-3" data-reveal>{project.summary[0]}</p>
          </div>
          <dl className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([label, value]) => (
              <div className="sm:pr-6" data-reveal key={label}>
                <dt className="text-xs font-semibold uppercase text-black/60">{label}</dt>
                <dd className="mt-3 text-sm leading-6">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="px-5 md:px-[3.6vw]">
        <div className="relative aspect-[16/10] max-h-[850px] w-full overflow-hidden bg-neutral-200" data-mask>
          <Image alt={project.title} className="object-cover" fill priority sizes="100vw" src={project.coverImage} />
        </div>
      </div>

      <section className="px-5 py-24 md:px-[3.6vw] md:py-40">
        <div>
          <p className={kicker} data-reveal>The context</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-x-[1.6vw]">
            <h2 className="text-[clamp(2.2rem,4.6vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] lg:col-span-7" data-reveal>{project.introductionTitle || project.summary[0]}</h2>
            <div className="space-y-6 lg:col-span-4 lg:col-start-9">
              {intro.map((t) => <p className="max-w-[28rem] text-base leading-6 text-[#6b6b6b]" data-reveal key={t}>{t}</p>)}
              {project.liveUrl && <a className="bd-btn" data-reveal href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit live project ↗</a>}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] px-5 py-24 md:px-[3.6vw] md:py-36">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-[6vw]">
          {[['01 · The challenge', challenge], ['02 · The approach', approach]].map(([label, block], i) => {
            const { headline, detail } = block as ReturnType<typeof lead>
            return (
              <div className={i ? 'lg:pt-24' : ''} key={label as string}>
                <p className={kicker} data-reveal>{label as string}</p>
                <h2 className="mt-8 text-[clamp(1.9rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]" data-reveal>{headline}</h2>
                <div className="mt-8 space-y-5">
                  {detail.filter(Boolean).map((t) => <p className="max-w-[28rem] text-base leading-6 text-[#6b6b6b]" data-reveal key={t}>{t}</p>)}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="px-5 py-24 md:px-[3.6vw] md:py-36">
          <div className={editorialBoards ? "grid gap-8 md:gap-14" : "grid gap-4 md:grid-cols-2 md:gap-[1.6vw]"}>
            {gallery.map((item, i) => {
              // Editorial rhythm: every third frame bleeds across both columns
              const wide = editorialBoards || i % 3 === 0
              return (
                <figure className={wide ? 'md:col-span-2' : ''} key={item.url}>
                  <div className={`relative overflow-hidden bg-neutral-200 ${editorialBoards ? 'aspect-[8/5]' : wide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`} data-mask>
                    {item.type === 'video'
                      ? <video autoPlay className="h-full w-full object-cover" loop muted playsInline src={item.url} />
                      : <Image alt={item.caption || project.title} className={editorialBoards ? "object-contain" : "object-cover"} fill sizes={wide ? '100vw' : '50vw'} src={item.url} />}
                  </div>
                  {item.caption && <figcaption className="mt-3 text-xs text-[#6b6b6b]">{item.caption}</figcaption>}
                </figure>
              )
            })}
          </div>
        </section>
      )}

      {project.features?.length ? (
        <section className="bg-[#f4f4f4] px-5 py-24 md:px-[3.6vw] md:py-36">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[1.6vw]">
            <div className="lg:col-span-4">
              <p className={kicker} data-reveal>What we delivered</p>
              <h2 className="mt-5 text-[clamp(2rem,3.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em]" data-reveal>Built around the real work.</h2>
            </div>
            <ol className="lg:col-span-7 lg:col-start-6">
              {project.features.map((f, i) => (
                <li className="flex gap-6 py-4" data-reveal key={f}>
                  <span className="w-8 shrink-0 pt-1 text-sm tabular-nums text-[#6b6b6b]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xl font-medium leading-7">{f}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {outcome && (
        <section className="bg-black px-5 py-24 text-white md:px-[3.6vw] md:py-36">
          <div>
            <p className="text-sm font-medium uppercase text-white/60" data-reveal>03 · The outcome</p>
            <h2 className="mt-8 max-w-4xl text-[clamp(2rem,4.6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]" data-reveal>{outcome.headline}</h2>
            <div className="mt-10 max-w-[34rem] space-y-6">
              {outcome.detail.filter(Boolean).map((t) => <p className="text-base leading-6 text-white/60" data-reveal key={t}>{t}</p>)}
            </div>
          </div>
        </section>
      )}

      <section className="px-5 py-24 md:px-[3.6vw] md:py-36">
        <div>
          <p className={kicker} data-reveal>Next project</p>
          <Link className="group mt-8 grid bg-[#f4f4f4] md:grid-cols-2" data-cursor="view" href={`/work/${nextProject.slug}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image alt="" className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width:768px) 100vw, 50vw" src={nextProject.coverImage} />
            </div>
            <div className="flex flex-col justify-between p-7 md:p-12">
              <span className="text-sm text-black/45">{nextProject.category}</span>
              <h2 className="text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[1] tracking-[-0.04em]">{nextProject.title}</h2>
            </div>
          </Link>
        </div>
      </section>
    </article>
  )
}
