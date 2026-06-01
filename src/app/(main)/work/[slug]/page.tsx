import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/data/project'

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projectIndex = projects.findIndex((p) => p.slug === slug)

  if (projectIndex === -1) notFound()

  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1c1c1c] selection:bg-black selection:text-white">
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="w-full pt-[140px] pb-[60px] md:pt-[180px] md:pb-[80px]">
        <div className="w-full px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-12">
            
            {/* Title & Tagline */}
            <div className="flex flex-col gap-4 max-w-[1000px]">
              <div className="flex items-center gap-3">
                <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-black/5 relative border border-black/10">
                  <Image src={project.icon} alt="" fill className="object-cover" />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#7C7C7C]">
                  {project.category}
                </span>
              </div>
              <h1 className="uppercase font-bold tracking-tight text-[clamp(44px,8vw,120px)] leading-[0.95] text-black">
                {project.title}
              </h1>
            </div>

            {/* Premium Metadata Table */}
            <div className="w-full border-t border-black/10 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/10">
                
                {/* Col 1: Year */}
                <div className="py-6 md:py-8 md:pr-8 flex flex-col justify-between gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#7C7C7C] font-semibold">Year</span>
                  <span className="text-lg font-medium text-black">{project.year}</span>
                </div>

                {/* Col 2: Scope */}
                <div className="py-6 md:py-8 md:px-8 flex flex-col justify-between gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#7C7C7C] font-semibold">Scope</span>
                  <span className="text-lg font-medium text-black">{project.scope}</span>
                </div>

                {/* Col 3: Timeline */}
                <div className="py-6 md:py-8 md:px-8 flex flex-col justify-between gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#7C7C7C] font-semibold">Timeline</span>
                  <span className="text-lg font-medium text-black">{project.timeline}</span>
                </div>

                {/* Col 4: Live Preview */}
                <div className="py-6 md:py-8 md:pl-8 flex flex-col justify-between gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#7C7C7C] font-semibold">Live Project</span>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-black inline-flex items-center gap-1 group hover:text-black/75 transition-colors"
                    >
                      Preview
                      <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  ) : (
                    <span className="text-lg text-[#7C7C7C] italic">Private Release</span>
                  )}
                </div>

              </div>
              <div className="w-full border-b border-black/10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BIG HERO COVER ──────────────────────────────────────────────── */}
      <section className="w-full px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto pb-[60px] md:pb-[100px]">
        <div className="w-full relative overflow-hidden rounded-[16px] aspect-[16/9] max-h-[720px] bg-black/5 shadow-sm">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* ── NARRATIVE CHAPTERS ──────────────────────────────────────────── */}
      <section className="w-full pb-[100px] md:pb-[160px]">
        <div className="w-full px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto flex flex-col gap-[80px] md:gap-[140px]">
          
          {/* CHAPTER 1: OVERVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 pt-8 border-t border-black/10">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#7C7C7C] sticky top-[100px] block">
                01 / OVERVIEW
              </span>
            </div>
            <div className="flex flex-col gap-6 max-w-[800px]">
              <p className="text-xl md:text-2xl font-normal leading-relaxed text-black/90">
                {project.overview}
              </p>
              
              {/* Keywords / Tags inside Overview */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.keywords.map((k) => (
                  <span
                    key={k}
                    className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold uppercase tracking-wider text-black bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CHAPTER 2: THE PROBLEM */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 pt-8 border-t border-black/10">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#7C7C7C] sticky top-[100px] block">
                02 / THE CHALLENGE
              </span>
            </div>
            <div className="max-w-[800px]">
              <p className="text-xl md:text-2xl font-normal leading-relaxed text-black/90">
                {project.problem}
              </p>
            </div>
          </div>

          {/* CUSTOM GALLERY ASYMMETRICAL GRID */}
          {project.media && project.media.length > 0 && (
            <div className="w-full pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {project.media.map((m, idx) => (
                  <div
                    key={m.url}
                    className={`group flex flex-col gap-3 overflow-hidden ${m.gridClass || 'col-span-1'}`}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-black/5 border border-black/5 shadow-sm">
                      {m.type === 'image' ? (
                        <Image
                          src={m.url}
                          alt={m.caption || ''}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <video
                          className="w-full h-full object-cover"
                          src={m.url}
                          controls
                          playsInline
                        />
                      )}
                    </div>
                    {m.caption && (
                      <span className="text-xs uppercase tracking-wider text-[#7C7C7C] font-semibold pl-1">
                        {m.caption}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHAPTER 3: WHAT WE DID */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 pt-8 border-t border-black/10">
            <div>
              <span className="text-sm font-bold tracking-widest text-[#7C7C7C] sticky top-[100px] block">
                03 / WHAT WE DID
              </span>
            </div>
            <div className="max-w-[800px]">
              <p className="text-xl md:text-2xl font-normal leading-relaxed text-black/90">
                {project.solution}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── NEXT PROJECT TRANSITION ─────────────────────────────────────── */}
      <section className="w-full bg-[#121212] text-[#FAF9F6] py-[100px] md:py-[160px] relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
        <div className="w-full px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto relative z-10">
          <Link href={`/work/${nextProject.slug}`} className="flex flex-col gap-6 w-full text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-white/50 inline-flex items-center gap-2">
              Next Project <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-white/10 pb-8">
              <h2 className="font-bold tracking-tight text-[clamp(36px,6vw,90px)] uppercase leading-[1] text-white">
                {nextProject.title}
              </h2>
              <span className="text-sm uppercase tracking-wider font-semibold text-white/50">
                {nextProject.category}
              </span>
            </div>
          </Link>
        </div>
      </section>
    </article>
  )
}
