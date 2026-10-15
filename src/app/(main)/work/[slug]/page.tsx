import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import PageMotion from '@/components/ui/PageMotion'

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }))
}

const kicker = 'text-xs font-semibold uppercase tracking-[.14em] text-black/40'

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

  return (
    <article className="bg-[#f7f4ee] text-black">
      <PageMotion />

      <header className="px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <Link className="text-xs font-semibold uppercase tracking-[.14em] text-black/45" href="/work">← All work</Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <p className="mb-5 text-sm text-black/50">{project.category} · {project.year}</p>
              <h1 className="text-[clamp(3.7rem,9vw,9rem)] font-semibold leading-[.84] tracking-[-.075em]">{project.title}</h1>
            </div>
            <p className="max-w-md text-lg leading-8 text-black/60 lg:col-span-3">{project.summary[0]}</p>
          </div>
          <dl className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([label, value]) => (
              <div className=" py-5 sm:pr-6" key={label}>
                <dt className="text-[.65rem] font-semibold uppercase tracking-[.14em] text-black/40">{label}</dt>
                <dd className="mt-3 text-sm leading-6">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="px-3 md:px-6">
        <div className="relative mx-auto aspect-[16/10] max-h-[850px] max-w-[1600px] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem]" data-mask>
          <Image alt={project.title} className="object-cover" fill priority sizes="100vw" src={project.coverImage} />
        </div>
      </div>

      <section className="px-5 py-28 md:px-10 md:py-40 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <p className={kicker} data-reveal>The context</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.95] tracking-[-.06em]" data-reveal>{project.introductionTitle || project.summary[0]}</h2>
            <div className="space-y-6">
              {intro.map((t) => <p className="max-w-[34rem] text-lg leading-8 text-black/65" data-reveal key={t}>{t}</p>)}
              {project.liveUrl && <a className="inline-flex rounded-full bg-black px-6 py-4 text-sm font-semibold text-white" data-reveal href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit live project ↗</a>}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#dfe8eb] px-5 py-24 md:px-10 md:py-36 lg:px-16">
        <div className="mx-auto grid max-w-[1200px] gap-20 lg:grid-cols-2 lg:gap-24">
          {[['01 · The challenge', challenge], ['02 · The approach', approach]].map(([label, block], i) => {
            const { headline, detail } = block as ReturnType<typeof lead>
            return (
              <div className={i ? 'lg:pt-24' : ''} key={label as string}>
                <p className={kicker} data-reveal>{label as string}</p>
                <h2 className="mt-8 text-[clamp(1.9rem,3vw,3rem)] font-semibold leading-[1.02] tracking-[-.045em]" data-reveal>{headline}</h2>
                <div className="mt-8 space-y-5">
                  {detail.filter(Boolean).map((t) => <p className="max-w-[32rem] text-lg leading-8 text-black/70" data-reveal key={t}>{t}</p>)}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="px-3 py-24 md:px-6 md:py-36">
          <div className="mx-auto grid max-w-[1600px] gap-3 md:grid-cols-2 md:gap-6">
            {gallery.map((item, i) => {
              // Editorial rhythm: every third frame bleeds across both columns
              const wide = i % 3 === 0
              return (
                <figure className={wide ? 'md:col-span-2' : ''} key={item.url}>
                  <div className={`relative overflow-hidden rounded-[1rem] bg-black/5 md:rounded-[1.5rem] ${wide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`} data-mask>
                    {item.type === 'video'
                      ? <video autoPlay className="h-full w-full object-cover" loop muted playsInline src={item.url} />
                      : <Image alt={item.caption || project.title} className="object-cover" fill sizes={wide ? '100vw' : '50vw'} src={item.url} />}
                  </div>
                  {item.caption && <figcaption className="mt-3 px-1 text-[.8125rem] text-black/50">{item.caption}</figcaption>}
                </figure>
              )
            })}
          </div>
        </section>
      )}

      {project.features?.length ? (
        <section className="bg-white px-5 py-24 md:px-10 md:py-36 lg:px-16">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-3">
            <div>
              <p className={kicker} data-reveal>What we delivered</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-.05em]" data-reveal>Built around the real work.</h2>
            </div>
            <ol className=" lg:col-span-2">
              {project.features.map((f, i) => (
                <li className="flex gap-6 py-5" data-reveal key={f}>
                  <span className="w-8 shrink-0 pt-1 text-xs tabular-nums text-black/35">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg leading-6">{f}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {outcome && (
        <section className="bg-[#ebe4d8] px-5 py-24 md:px-10 md:py-36 lg:px-16">
          <div className="mx-auto max-w-[1200px]">
            <p className={kicker} data-reveal>03 · The outcome</p>
            <h2 className="mt-8 max-w-4xl text-[clamp(2rem,4.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-.05em]" data-reveal>{outcome.headline}</h2>
            <div className="mt-10 max-w-[34rem] space-y-6">
              {outcome.detail.filter(Boolean).map((t) => <p className="text-lg leading-8 text-black/70" data-reveal key={t}>{t}</p>)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-5 py-24 md:px-10 md:py-36 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <p className={kicker}>Next case study</p>
          <Link className="group mt-8 grid overflow-hidden rounded-3xl bg-[#f1f0ec] md:grid-cols-2" data-cursor="view" href={`/work/${nextProject.slug}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image alt="" className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width:768px) 100vw, 50vw" src={nextProject.coverImage} />
            </div>
            <div className="flex flex-col justify-between p-7 md:p-12">
              <span className="text-sm text-black/45">{nextProject.category}</span>
              <h2 className="text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[.9] tracking-[-.065em]">{nextProject.title}</h2>
            </div>
          </Link>
        </div>
      </section>
    </article>
  )
}
