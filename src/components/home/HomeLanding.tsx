import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/data/project'
import HomeHero from '@/components/home/HomeHero'

const capabilities = [
  {
    title: 'Digital marketing',
    description: 'Campaigns, content and channel systems that make a business easier to discover, understand and choose.',
    scope: 'Campaigns / Content / Social / Growth',
  },
  {
    title: 'Brand and creative',
    description: 'Positioning, identity and communication systems that express the real quality of a business consistently.',
    scope: 'Strategy / Identity / Creative direction',
  },
  {
    title: 'Wedding and event creative',
    description: 'Coordinated identities, invitations, digital experiences and event communication, designed with care.',
    scope: 'Identity / Invitations / Digital experiences',
  },
  {
    title: 'Product sourcing and procurement',
    description: 'Structured support for identifying, specifying and coordinating quality products from supplier to delivery.',
    scope: 'Research / Specification / Coordination',
  },
  {
    title: 'Business support and consultancy',
    description: 'Practical strategic and creative support for teams that need clarity, capacity or dependable execution.',
    scope: 'Advisory / Systems / Delivery support',
  },
]

const qualityGates = [
  ['Understand', 'Define the client, problem, audience, constraints and measure of success.'],
  ['Strategize', 'Choose the clearest route from the present situation to the desired outcome.'],
  ['Create', 'Build the identity, experience, campaign or solution with craft and intent.'],
  ['Verify', 'Test accuracy, quality, accessibility and alignment with the approved direction.'],
  ['Deliver', 'Hand over professionally, communicate clearly and stay accountable after launch.'],
]

const sampleArticles = [
  {
    category: 'Brand',
    title: 'Why good businesses are often underestimated',
    summary: 'A practical look at the gap between operational quality and market perception.',
    readTime: '6 min read',
  },
  {
    category: 'Digital',
    title: 'A useful website begins before the interface',
    summary: 'How positioning, content and visitor intent shape a digital experience people can use.',
    readTime: '8 min read',
  },
  {
    category: 'Practice',
    title: 'Making quality repeatable',
    summary: 'Why standards, decision gates and careful handover matter as much as the final reveal.',
    readTime: '5 min read',
  },
]

function Arrow({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return (
    <svg aria-hidden="true" className={direction === 'down' ? 'rotate-90' : ''} fill="none" height="20" viewBox="0 0 20 20" width="20">
      <path d="M3 10h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  )
}

function EditorialLink({
  href,
  children,
  inverse = false,
}: {
  href: string
  children: React.ReactNode
  inverse?: boolean
}) {
  return (
    <Link
      className={[
        'group inline-flex min-h-11 items-center gap-3 border-b pb-1 text-[0.875rem] font-normal',
        'transition-opacity duration-200 hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
        inverse ? 'border-white text-white' : 'border-black text-black',
      ].join(' ')}
      href={href}
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        <Arrow />
      </span>
    </Link>
  )
}

function SectionLabel({ index, children, inverse = false }: { index: string; children: React.ReactNode; inverse?: boolean }) {
  return (
    <p className={`text-[0.75rem] font-medium tracking-[0.06em] ${inverse ? 'text-white/60' : 'text-black/55'}`}>
      ({index}) &nbsp; {children}
    </p>
  )
}

export default function HomeLanding({ projects }: { projects: Project[] }) {
  return (
    <div className="bd-home bg-[var(--bd-color-surface-canvas)] text-[var(--bd-color-text-primary)]">
      <HomeHero />

      <section className="px-3 py-28 sm:px-5 md:py-40 lg:py-56">
        <div className="grid gap-12 border-t border-black pt-5 lg:grid-cols-12">
          <div className="lg:col-span-3"><SectionLabel index="01">Why Barons</SectionLabel></div>
          <div className="lg:col-span-8 lg:col-start-6">
            <h2 className="max-w-[13ch] text-[clamp(2.75rem,5.6vw,5rem)] font-light leading-[0.98] tracking-[-0.045em]">
              Good work should not be <em className="font-editorial">underestimated</em>.
            </h2>
            <p className="mt-12 max-w-[39rem] text-[1.125rem] leading-[1.65] text-black/70 md:text-[1.25rem]">
              Too many capable businesses are held back by unclear positioning, inconsistent communication or
              experiences that do not reflect the quality behind them. Barons closes that gap—combining strategic
              thinking, creative direction and reliable execution to help quality become visible.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bd-dark-canvas px-3 py-28 text-white sm:px-5 md:py-40 lg:py-56" id="selected-work">
        <div>
          <div className="grid gap-10 border-t border-bd-dark-hairline pt-5 lg:grid-cols-12">
            <div className="lg:col-span-3"><SectionLabel index="02" inverse>Selected work</SectionLabel></div>
            <div className="flex flex-col gap-8 lg:col-span-8 lg:col-start-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[clamp(2.75rem,5.6vw,5rem)] font-light leading-[0.98] tracking-[-0.045em]">Evidence, not <em className="font-editorial">decoration</em>.</h2>
                <p className="mt-8 max-w-[36rem] text-[1.125rem] leading-[1.6] text-white/60">
                  Brands and platforms built around a real problem, a clear idea and careful execution.
                </p>
              </div>
              <Link className="bd-glass-badge group shrink-0 text-white/70 transition-colors duration-200 hover:text-white" href="/work">
                <span>Explore all</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
              </Link>
            </div>
          </div>

          <div className="mt-16 border-t border-bd-dark-hairline lg:mt-20">
            {projects.map((project) => {
              const images = project.media && project.media.length > 0 ? project.media.slice(0, 2) : [{ url: project.coverImage }]
              return (
                <Link
                  className="group grid gap-6 border-b border-bd-dark-hairline py-10 transition-colors duration-300 hover:bg-bd-dark-raised lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12"
                  href={`/work/${project.slug}`}
                  key={project.slug}
                >
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-[0.4rem] bg-bd-dark-raised">
                        <Image alt="" className="object-cover" fill sizes="44px" src={project.icon} />
                      </div>
                      <div>
                        <p className="text-[0.95rem] font-medium text-white">{project.title}</p>
                        <p className="text-[0.8rem] text-white/60">{project.category}</p>
                      </div>
                    </div>
                    <p className="mt-4 line-clamp-3 max-w-[22rem] text-[0.85rem] leading-[1.5] text-white/45">{project.summary?.[0]}</p>
                  </div>
                  <div className="flex h-56 gap-2 sm:h-64 lg:col-span-8 lg:h-72">
                    {images.map((media, mediaIndex) => (
                      <div className="bd-glass-card relative h-full flex-1 bg-white/[0.035]" key={media.url ?? mediaIndex}>
                        <Image
                          alt=""
                          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                          fill
                          sizes={images.length === 1 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 50vw, 33vw'}
                          src={media.url}
                        />
                      </div>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bd-color-surface-inverse)] px-3 py-28 text-white sm:px-5 md:py-40 lg:py-52">
        <div>
          <div className="grid gap-12 border-t border-white pt-5 lg:grid-cols-12">
            <div className="lg:col-span-3"><SectionLabel index="03" inverse>What we do</SectionLabel></div>
            <div className="lg:col-span-7 lg:col-start-6">
              <h2 className="text-[clamp(2.75rem,5.6vw,5rem)] font-light leading-[0.98] tracking-[-0.045em]">Different <em className="font-editorial">capabilities</em>. One standard.</h2>
              <p className="mt-8 max-w-[34rem] text-[1.125rem] leading-[1.6] text-white/65">
                We bring strategy, creativity and disciplined delivery together around the result a client needs.
              </p>
            </div>
          </div>

          <ol className="mt-24 border-t border-white/35">
            {capabilities.map((capability, index) => (
              <li className="grid gap-5 border-b border-white/35 py-8 md:py-10 lg:grid-cols-12" key={capability.title}>
                <p className="text-[0.75rem] font-medium tracking-[0.08em] text-white/50 lg:col-span-1">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="text-[clamp(1.75rem,3.3vw,3.25rem)] font-light leading-none tracking-[-0.04em] lg:col-span-5">{capability.title}</h3>
                <p className="max-w-[34rem] text-[1rem] leading-[1.55] text-white/65 lg:col-span-4">{capability.description}</p>
                <p className="text-[0.7rem] font-medium leading-5 tracking-[0.08em] text-white/45 lg:col-span-2 lg:text-right">{capability.scope}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex justify-end"><EditorialLink href="/services" inverse>Explore capabilities</EditorialLink></div>
        </div>
      </section>

      <section className="px-3 py-28 sm:px-5 md:py-40 lg:py-56">
        <div>
          <div className="grid gap-12 border-t border-black pt-5 lg:grid-cols-12">
            <div className="lg:col-span-3"><SectionLabel index="04">The Barons Quality Gate</SectionLabel></div>
            <div className="lg:col-span-8 lg:col-start-5">
              <h2 className="max-w-[14ch] text-[clamp(2.75rem,5.6vw,5rem)] font-light leading-[0.98] tracking-[-0.045em]">
                Quality is not a final check. It is the <em className="font-editorial">process</em>.
              </h2>
            </div>
          </div>
          <ol className="mt-24 lg:ml-[25%]">
            {qualityGates.map(([title, description], index) => (
              <li className="grid gap-5 border-t border-black py-7 md:grid-cols-[5rem_1fr_1.1fr] md:gap-8" key={title}>
                <p className="text-[0.75rem] font-medium tracking-[0.08em] text-black/45">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="text-[clamp(1.6rem,2.4vw,2.5rem)] font-light leading-none tracking-[-0.035em]">{title}</h3>
                <p className="max-w-[32rem] text-[1rem] leading-[1.6] text-black/65">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="overflow-hidden border-y border-black py-9">
        <p className="whitespace-nowrap text-center text-[clamp(3.5rem,10vw,9rem)] font-light leading-none tracking-[-0.06em]">
          Strategy. <em className="font-editorial">Precision.</em> Craft.
        </p>
      </section>

      <section className="px-3 py-28 sm:px-5 md:py-40 lg:py-56">
        <div className="grid gap-16 border-t border-black pt-5 lg:grid-cols-12">
          <div className="lg:col-span-3"><SectionLabel index="05">About Barons</SectionLabel></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-[clamp(2.75rem,5.6vw,5rem)] font-light leading-[0.98] tracking-[-0.045em]">Built in <em className="font-editorial">Tanzania</em>. Exacting by standard.</h2>
            <p className="mt-10 max-w-[39rem] text-[1.125rem] leading-[1.65] text-black/70 md:text-[1.25rem]">
              Barons Digital is a creative and business solutions company for people who take their work seriously.
              We combine local understanding with disciplined strategy, modern craft and accountable delivery—so
              strong ideas and capable businesses are seen at their true value.
            </p>
            <div className="mt-8"><EditorialLink href="/about">Meet Barons Digital</EditorialLink></div>
          </div>
          <div className="relative aspect-[4/3] bg-[var(--bd-color-surface-muted)] lg:col-span-7">
            <Image alt="A Barons creative working session" className="object-cover grayscale" fill sizes="(max-width: 1024px) 100vw, 58vw" src="/images/services/brand-design.png" />
          </div>
          <div className="relative aspect-[4/5] bg-[var(--bd-color-surface-muted)] lg:col-span-4 lg:col-start-9 lg:mt-40">
            <Image alt="Digital design detail" className="object-cover grayscale" fill sizes="(max-width: 1024px) 100vw, 33vw" src="/images/services/website-mockup.jpg" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--bd-color-surface-subtle)] px-3 py-28 sm:px-5 md:py-40 lg:py-52" id="journal">
        <div>
          <div className="grid gap-12 border-t border-black pt-5 lg:grid-cols-12">
            <div className="lg:col-span-3"><SectionLabel index="06">Journal / Sample</SectionLabel></div>
            <div className="lg:col-span-7 lg:col-start-6">
              <h2 className="text-[clamp(2.75rem,5.6vw,5rem)] font-light leading-[0.98] tracking-[-0.045em]">Thinking behind the <em className="font-editorial">work</em>.</h2>
              <p className="mt-8 max-w-[37rem] text-[1.125rem] leading-[1.6] text-black/65">
                Practical perspectives on brand, digital experience and the systems that make quality repeatable.
              </p>
            </div>
          </div>
          <div className="mt-24 grid gap-12 md:grid-cols-3">
            {sampleArticles.map((article, index) => (
              <article className="border-t border-black pt-4" key={article.title}>
                <div className="flex items-center justify-between text-[0.7rem] font-medium tracking-[0.08em] text-black/50">
                  <span>{article.category}</span><span>Sample 0{index + 1}</span>
                </div>
                <h3 className="mt-14 text-[clamp(1.75rem,2.8vw,2.75rem)] font-light leading-[1.02] tracking-[-0.04em]">{article.title}</h3>
                <p className="mt-6 text-[1rem] leading-[1.6] text-black/65">{article.summary}</p>
                <p className="mt-12 text-[0.75rem] font-medium tracking-[0.08em] text-black/50">{article.readTime}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-3 py-28 text-white sm:px-5 md:py-40 lg:py-56">
        <div className="border-t border-white pt-5">
          <SectionLabel index="07" inverse>Start a conversation</SectionLabel>
          <div className="mt-24 grid gap-16 lg:grid-cols-12">
            <h2 className="text-[clamp(3.4rem,8vw,8rem)] font-light leading-[0.88] tracking-[-0.06em] lg:col-span-10">
              Your work deserves to be seen at its <em className="font-editorial">true value</em>.
            </h2>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-[1.125rem] leading-[1.6] text-white/65">
                Tell us what you are building, changing or trying to make clearer. We will help identify the most useful next step.
              </p>
              <div className="mt-8"><EditorialLink href="/contact" inverse>Start a project</EditorialLink></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
