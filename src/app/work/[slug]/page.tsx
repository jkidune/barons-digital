import Image from 'next/image'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import { projects } from '@/data/project'

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <>
      <section className="w-full bg-white py-[80px] md:py-[100px]">
        <div className="w-full px-8 lg:px-12 xl:px-16 max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-black/5 relative">
                  <Image src={project.icon} alt="" fill className="object-cover" />
                </div>
                <span
                  className="uppercase"
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    lineHeight: '20px',
                    letterSpacing: '-0.01em',
                    color: '#242424',
                  }}
                >
                  {project.category} | {project.year}©
                </span>
              </div>

              <h1
                className="uppercase"
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(56px, 10vw, 140px)',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  color: '#242424',
                }}
              >
                {project.title}
              </h1>
            </div>

            <div className="w-full relative overflow-hidden rounded-[12px] h-[220px] sm:h-[320px] md:h-[440px] bg-black/5">
              <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
              <div>
                <h2
                  className="uppercase"
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    lineHeight: '18px',
                    letterSpacing: '0.12em',
                    color: '#696969',
                  }}
                >
                  Summary
                </h2>
                <p
                  className="mt-4"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(16px, 1.8vw, 20px)',
                    lineHeight: 1.6,
                    letterSpacing: '-0.01em',
                    color: '#242424',
                  }}
                >
                  {project.summary.join('')}
                </p>
              </div>

              <div className="border border-black/10 rounded-[12px] p-5">
                <h2
                  className="uppercase"
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    lineHeight: '18px',
                    letterSpacing: '0.12em',
                    color: '#696969',
                  }}
                >
                  Keywords
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.keywords.map((k) => (
                    <span
                      key={k}
                      className="px-3 py-2 rounded-full border border-black/10"
                      style={{
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: '18px',
                        letterSpacing: '-0.01em',
                        color: '#242424',
                        background: '#F8F5F5',
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.media.map((m) => (
                  <div key={m.url} className="rounded-[12px] overflow-hidden bg-black/5">
                    {m.type === 'image' ? (
                      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px]">
                        <Image src={m.url} alt="" fill className="object-cover" />
                      </div>
                    ) : (
                      <video className="w-full h-full object-cover" src={m.url} controls playsInline />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
