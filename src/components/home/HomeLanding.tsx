'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/data/project'
import { articles as fallbackArticles, servicePages } from '@/data/content'
import type { Article } from '@/lib/articles'
import LetsTalkForm from './LetsTalkForm'

gsap.registerPlugin(ScrollTrigger)

const engagements = [
  {
    name: 'Focused project',
    value: '4–8',
    unit: 'weeks',
    note: 'typical timeline',
    blurb: 'For organisations that need one thing done properly.',
    items: ['Positioning and discovery session', 'Brand identity or website', 'Design direction and prototypes', 'Testing and launch support', 'Handover and guidelines'],
  },
  {
    name: 'Digital platform',
    value: '8–16',
    unit: 'weeks',
    note: 'typical timeline',
    blurb: 'For larger platforms that need strategy, design and engineering together.',
    items: ['Strategy and information architecture', 'UX/UI design system', 'Development and CMS setup', 'SEO and analytics foundations', 'Team training and documentation'],
    featured: true,
  },
  {
    name: 'Ongoing partnership',
    value: 'Monthly',
    unit: 'retainer',
    note: 'scoped to your needs',
    blurb: 'For teams that want a dependable creative partner after launch.',
    items: ['Dedicated creative support', 'Content and campaign production', 'Continuous site improvement', 'Quarterly performance review', 'Priority response times'],
  },
]

const Arrow = ({ className = '' }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" height="14" viewBox="0 0 14 14" width="14">
    <path d="M2 12 12 2M4.5 2H12v7.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const Check = () => (
  <svg aria-hidden="true" className="mt-1 shrink-0" fill="none" height="14" viewBox="0 0 14 14" width="14">
    <path d="m2 7.5 3.2 3L12 3.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const chip = 'bg-white px-[10px] py-[8px] text-[0.8rem] font-medium uppercase leading-none text-black md:text-base'

export default function HomeLanding({
  projects,
  articles = fallbackArticles,
}: {
  projects: Project[]
  articles?: Article[]
}) {
  const root = useRef<HTMLDivElement>(null)
  const [service, setService] = useState(0)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add({ motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px)' }, (context) => {
      const { mobile } = context.conditions as { mobile: boolean }

      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.bd-hero-media', { scale: 1.12, duration: 2.2 })
        .from('.bd-hero-word', { yPercent: 40, opacity: 0, duration: 1.4, stagger: 0.18 }, 0.2)
        .from('.bd-hero-meta', { y: 20, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.9)

      if (!mobile) {
        gsap.to('.bd-hero-media', {
          yPercent: 10, ease: 'none',
          scrollTrigger: { trigger: '.bd-hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
        })
      }

      gsap.set('[data-reveal]', { y: mobile ? 24 : 44, opacity: 0 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: mobile ? 0.7 : 0.95, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      })

      gsap.utils.toArray<HTMLElement>('[data-mask]').forEach((frame) => {
        const media = frame.querySelector('img, video')
        if (!media) return
        gsap.from(media, {
          scale: 1.18, opacity: 0, duration: 1.3, ease: 'power4.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: frame, start: 'top 88%', once: true },
        })
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('[data-reveal]', { opacity: 0 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, duration: 0.25, overwrite: true }),
      })
    })
  }, { scope: root })

  const featured = projects.slice(0, 4)
  const stories = projects.filter((project) => project.outcome?.length).slice(0, 2)
  const stats = [
    { label: 'Projects shipped', value: String(projects.length), text: 'Brands, platforms and organisations we have built for.' },
    { label: 'Disciplines', value: String(servicePages.length), text: 'Strategy, identity, digital and content under one roof.' },
    { label: 'Weeks to launch', value: '4–8', text: 'Typical timeline for a focused engagement.' },
    { label: 'Business days', value: '2', text: 'Our promised first reply to every enquiry.' },
  ]
  const goalImages = ['/images/services/identity-design.jpg', '/images/services/website-mockup.jpg', '/images/services/content-production.jpg']
  const studioImages = projects.slice(0, 5).map((project) => project.coverImage)
  const active = servicePages[service]

  return (
    <div ref={root} className="bd-home bg-white font-[family-name:var(--font-inter)] text-black">
      {/* ───────── Hero ───────── */}
      <section className="bd-hero relative min-h-[34rem] overflow-hidden bg-black text-white md:h-[48vw] md:min-h-[42rem]">
        <div className="bd-hero-media absolute inset-0">
          <video autoPlay className="h-full w-full object-cover" loop muted playsInline poster="/images/services/identity-design.jpg" preload="metadata">
            <source src="/videos/hero-showreel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 h-full min-h-[34rem] md:min-h-[42rem]">
          <p className="bd-hero-word absolute left-[5vw] top-[24%] bg-gradient-to-b from-black to-[rgba(115,0,0,0)] bg-clip-text text-[30vw] font-semibold leading-[1.05] tracking-[-0.05em] text-transparent md:left-[3.6vw] md:top-[15.5vw] md:text-[21vw]">
            Digital
          </p>
          <p className="bd-hero-word absolute bottom-[14%] left-[8vw] whitespace-nowrap text-[11.5vw] font-semibold leading-none tracking-[-0.05em] text-white/90 mix-blend-overlay md:bottom-auto md:left-[35vw] md:top-[34.9vw] md:text-[8.6vw]">
            Creative Studio
          </p>
          <ul className="absolute right-5 top-28 hidden text-lg font-medium leading-[1.8] sm:block md:right-auto md:left-[72.6vw] md:top-[24.6vw]">
            {['UX Design', 'Branding and UI Design', 'Product and Service Design'].map((item) => (
              <li className="bd-hero-meta" key={item}>/ {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Numbers ───────── */}
      <section className="px-5 py-24 md:px-[3.6vw] md:py-36">
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-[1.6vw]">
          <h2 className="text-[clamp(1.9rem,3.2vw,2.875rem)] font-semibold leading-[1.05] tracking-[-0.02em] md:col-span-8 md:col-start-5" data-reveal>
            Our work speaks through numbers. Here’s what we’ve achieved so far.
          </h2>

          <Link className="group relative flex min-h-[18rem] items-center justify-center overflow-hidden md:col-span-3 md:col-start-1 md:row-span-2 md:row-start-2 md:mt-[5vw] md:h-[19.9vw] md:w-[calc(100%+7vw)] md:self-start" data-cursor="view" data-reveal href="/contact" style={{ background: 'linear-gradient(135deg,#ffe99e 0%,#8178ff 50%,#ff009b 100%)' }}>
            <span className="flex items-center gap-[6px]">
              <span className="flex size-11 items-center justify-center bg-white text-[#16121e]"><Arrow /></span>
              <span className="bg-white px-[22px] py-[13px] text-[0.94rem] font-semibold uppercase text-[#16121e] transition group-hover:bg-black group-hover:text-white">Get in touch</span>
            </span>
          </Link>

          {stats.map((stat, index) => {
            // Row 1 sits on columns 5 and 8, row 2 steps right to columns 8 and 11
            const placement = ['md:col-start-5 md:row-start-2', 'md:col-start-8 md:row-start-2', 'md:col-start-8 md:row-start-3', 'md:col-start-11 md:row-start-3'][index]
            return (
              <div className={`md:col-span-3 md:mt-[4vw] ${placement}`} data-reveal key={stat.label}>
                <p className="text-[0.8rem] font-semibold uppercase leading-[1.05] md:text-[1.22rem]">{stat.label}</p>
                <div className="my-4 h-px w-full max-w-[226px] bg-black md:my-[17px]" />
                <p className="text-[clamp(3rem,4.7vw,4.23rem)] font-semibold leading-[1.05]">{stat.value}</p>
                <p className="mt-6 max-w-[226px] text-sm leading-[1.05] text-[#6b6b6b] md:mt-7">{stat.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ───────── Works ───────── */}
      <section className="bd-works relative overflow-x-clip px-5 pb-24 md:px-[3.6vw] md:pb-40" id="work">
        {/* Pinned behind the project cards: the word stays put while the work scrolls over it */}
        <div aria-hidden="true" className="sticky top-[26vh] z-0 hidden h-0 md:block">
          <p className="bd-works-word select-none pl-[8%] text-[22.2vw] font-semibold leading-[0.9] text-[#dfdfdf]">WORKS</p>
        </div>
        <p className="mb-10 text-[clamp(3.5rem,18vw,5rem)] font-semibold leading-none text-[#dfdfdf] md:hidden">WORKS</p>

        <div className="relative z-10 flex flex-col gap-16 md:gap-[4.2vw]">
          {featured.map((project, index) => {
            const offsets = ['md:ml-0', 'md:ml-[30.5%]', 'md:ml-[3.7%]', 'md:ml-[10.3%]']
            const wide = index === 3
            return (
              <article className={`w-full ${wide ? 'md:w-[79.6%]' : 'md:w-[65.2%]'} ${offsets[index]}`} key={project.slug}>
                <Link className="group block" data-cursor="view" href={`/work/${project.slug}`}>
                  <div className={`relative overflow-hidden bg-neutral-200 ${wide ? 'aspect-[1064/695]' : 'aspect-[871/503]'}`} data-mask>
                    <Image alt={project.title} className="object-cover transition duration-700 group-hover:scale-[1.03]" fill sizes="(max-width: 768px) 100vw, 60vw" src={project.coverImage} />
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-2 md:mt-[31px]" data-reveal>
                    <span className={chip}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={`${chip} text-center`}>{project.title}</span>
                    <span className={`${chip} text-right`}>{project.category}</span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
        <div className="relative z-10 mt-16 md:ml-[3.6%]" data-reveal>
          <Link className="inline-flex items-center gap-2 text-sm font-semibold uppercase" href="/work">All projects <Arrow /></Link>
        </div>
      </section>

      {/* ───────── Goals ───────── */}
      <section className="px-5 py-20 text-center md:px-[3.6vw] md:py-36">
        <h2 className="text-[clamp(2.6rem,5.2vw,4.7rem)] font-semibold leading-[1.05] tracking-[-0.03em]" data-reveal>Your goals, our priority</h2>
        <p className="mx-auto mt-8 max-w-[28rem] text-base leading-6 text-[#6b6b6b] md:mt-10" data-reveal>
          From concept to launch, we’re committed to your success with rapid response times and personalized attention to detail.
        </p>
        <div className="mt-16 grid gap-4 sm:grid-cols-3 md:ml-[16.7%] md:mt-28 md:w-[81%] md:gap-[1.2vw]">
          {goalImages.map((src, index) => (
            <div className="relative aspect-[348/461] overflow-hidden bg-neutral-200" data-mask key={src}>
              <Image alt="" className="object-cover" fill sizes="(max-width: 640px) 100vw, 30vw" src={src} />
              {index === 0 && (
                <div className="absolute bottom-[3%] left-[4.5%] hidden aspect-[315/146] w-[90%] overflow-hidden border-2 border-white/80 sm:block">
                  <Image alt="" className="object-cover" fill sizes="25vw" src={goalImages[2]} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Services ───────── */}
      <section className="overflow-hidden bg-black px-5 py-24 text-white md:px-[3.6vw] md:py-[7vw]" id="services">
        <div className="grid gap-16 md:grid-cols-[minmax(0,1fr)_27.5%] md:gap-[3vw]">
          <ul className="self-start">
            {servicePages.map((item, index) => (
              <li key={item.slug}>
                <Link
                  className={`block py-[0.6vw] text-[clamp(2.4rem,5.3vw,4.8rem)] font-medium leading-[1.2] tracking-[-0.03em] transition-colors duration-500 ${index === service ? 'text-white' : 'text-[#2c2c2c] hover:text-white/60'}`}
                  href={`/services/${item.slug}`}
                  onFocus={() => setService(index)}
                  onMouseEnter={() => setService(index)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative">
            <div className="flex gap-4 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] [--step:calc(70vw+1rem)] [transform:translateX(calc(var(--i)*-1*var(--step)))] md:gap-[1.7vw] md:[--step:20.1vw]" style={{ '--i': service } as React.CSSProperties}>
              {servicePages.map((item) => (
                <figure className="w-[70vw] shrink-0 md:w-[18.4vw]" key={item.slug}>
                  <div className="relative aspect-[265/352] border border-white/30">
                    <Image alt={item.title} className="object-cover" fill sizes="(max-width: 768px) 70vw, 20vw" src={item.image} />
                  </div>
                  <figcaption className="mt-5">
                    <p className="text-sm text-white/55">{item.title}</p>
                    <p className="mt-3 text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.35]">{item.intro}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <Link className="group mt-16 inline-flex items-center gap-6 text-sm font-medium uppercase md:mt-[5vw]" href="/contact">
              <span className="flex size-10 items-center justify-center bg-white text-black transition group-hover:bg-white/80"><Arrow /></span>
              Hire us today
            </Link>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{active.title}</p>
      </section>

      {/* ───────── About ───────── */}
      <section className="px-5 py-24 md:px-[3.6vw] md:py-36" id="about">
        <div className="grid items-start gap-10 md:grid-cols-[26.3vw_1fr] md:gap-[2.4vw]">
          <div className="relative aspect-[380/495] overflow-hidden bg-neutral-200" data-mask>
            <Image alt="Barons creative process" className="object-cover grayscale" fill sizes="(max-width: 768px) 100vw, 27vw" src="/images/services/content-production.jpg" />
          </div>
          <div className="max-w-[720px]">
            <p className="text-[clamp(1.5rem,2.3vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.01em]" data-reveal>
              Barons helps organisations create considered, strategically sound experiences that earn trust. Our team works closely with you to ensure every detail is aligned with your goals.
            </p>
            <p className="mt-10 max-w-[28rem] text-sm leading-5 text-[#6b6b6b]" data-reveal>
              From concept to launch, we craft digital solutions that not only look exceptional but also drive results, building connections that last.
            </p>
            <div className="mt-8 h-px w-full bg-black/60" />
            <p className="mt-6 text-sm font-medium">Barons Digital</p>
            <p className="mt-1 text-xs text-[#6b6b6b]">Independent creative company · Dar es Salaam</p>
            <div className="mt-8 flex gap-2">
              <Link aria-label="About Barons" className="flex size-10 items-center justify-center bg-black text-white transition hover:bg-black/70" href="/about"><Arrow /></Link>
              <Link aria-label="See our work" className="flex size-10 items-center justify-center bg-black text-white transition hover:bg-black/70" href="/work"><Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Studio ───────── */}
      <section className="px-5 pb-24 md:px-[3.6vw] md:pb-40">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-[1.2vw]">
          <p className="col-span-2 flex items-center text-[clamp(3rem,6.8vw,6.1rem)] font-semibold uppercase leading-none md:col-span-1" data-reveal>Studio</p>
          {studioImages.slice(0, 3).map((src, index) => (
            <div className="relative aspect-[232/273] overflow-hidden bg-neutral-200" data-mask key={src}>
              <Image alt="" className="object-cover" fill sizes="(max-width: 768px) 50vw, 22vw" src={src} />
              {index === 0 && <span className="absolute bottom-[6%] left-[6%] bg-black p-[10px] text-sm text-white">{projects[0]?.title}<span className="mt-1 block text-[0.65rem] text-[#a2a2a2]">Latest project</span></span>}
            </div>
          ))}
          {studioImages.slice(3, 5).concat(studioImages[0]).slice(0, 3).map((src) => (
            <div className="relative aspect-[232/273] overflow-hidden bg-neutral-200" data-mask key={`b-${src}`}>
              <Image alt="" className="object-cover" fill sizes="(max-width: 768px) 50vw, 22vw" src={src} />
            </div>
          ))}
          <div className="col-span-2 flex items-center justify-center md:col-span-1">
            <Link className="inline-flex items-center gap-4 text-sm font-semibold uppercase" href="/contact"><Arrow /><span className="bg-black px-6 py-3 text-white">Start a project</span></Link>
          </div>
        </div>
      </section>

      {/* ───────── Engagement ───────── */}
      <section className="px-5 pb-24 text-center md:px-[3.6vw] md:pb-40">
        <h2 className="text-[clamp(2.8rem,5.9vw,5.3rem)] font-semibold leading-[1.05] tracking-[-0.03em]" data-reveal>Flexible engagement</h2>
        <p className="mt-6 text-base text-[#6b6b6b]" data-reveal>Choose the way of working that fits your needs.</p>
        <p className="mt-1 text-sm text-[#6b6b6b]" data-reveal>From a solid foundation to a fully tailored solution</p>

        <div className="mx-auto mt-14 grid max-w-[1290px] gap-4 bg-[#f4f4f4] p-4 text-left md:mt-20 md:grid-cols-3 md:gap-[1.5vw] md:p-[1.5vw]">
          {engagements.map((plan) => (
            <article className="flex flex-col bg-white p-6 md:p-[2vw]" data-reveal key={plan.name}>
              <p className="text-sm font-medium">{plan.name}</p>
              <p className="mt-6 flex items-baseline gap-2"><span className="text-[clamp(2.6rem,3.6vw,3.3rem)] font-semibold leading-none">{plan.value}</span><span className="text-sm text-[#6b6b6b]">{plan.unit}</span></p>
              <p className="mt-2 text-xs text-[#6b6b6b]">{plan.note}</p>
              <p className="mt-6 min-h-[3.5rem] text-sm leading-5 text-[#6b6b6b]">{plan.blurb}</p>
              <Link className={`mt-6 block py-3.5 text-center text-sm font-semibold transition ${plan.featured ? 'bg-[#ff3b30] text-white hover:bg-[#e0332a]' : 'bg-[#f4f4f4] text-black hover:bg-black hover:text-white'}`} href="/contact">Choose this plan</Link>
              <ul className="mt-8 grid gap-3 text-sm">
                {plan.items.map((item) => <li className="flex gap-3" key={item}><Check />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── Success stories ───────── */}
      <section className="px-5 pb-24 md:px-[3.6vw] md:pb-40">
        <h2 className="text-[clamp(2.4rem,4.6vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em]" data-reveal>Success stories</h2>
        <p className="mt-3 max-w-[18rem] text-base leading-5 text-[#6b6b6b]" data-reveal>Our work speaks for itself, but our clients say it even better.</p>
        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-[1.2vw]">
          {stories.map((project) => (
            <Link className="group grid grid-cols-[42%_1fr] gap-2 md:gap-[1vw]" data-cursor="view" data-reveal href={`/work/${project.slug}`} key={project.slug}>
              <div className="relative min-h-[18rem] overflow-hidden bg-neutral-200 md:aspect-[215/280]" data-mask>
                <Image alt={project.title} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 40vw, 18vw" src={project.coverImage} />
              </div>
              <div className="flex flex-col justify-between bg-black p-4 text-white md:p-[1.2vw]">
                <p className="line-clamp-6 text-[0.8rem] leading-[1.35] md:text-[0.82rem]">{project.outcome?.[0]}</p>
                <div>
                  <div className="mb-3 h-px bg-white/50" />
                  <p className="text-sm font-medium">{project.title}</p>
                  <p className="mt-1 text-xs text-white/50">{project.category} · {project.year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────── Insights ───────── */}
      <section className="px-5 pb-24 md:px-[3.6vw] md:pb-40">
        <h2 className="text-[clamp(2.4rem,4.6vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em]" data-reveal>Latest Insights</h2>
        <p className="mt-3 max-w-[18rem] text-base leading-5 text-[#6b6b6b]" data-reveal>Explore industry news and creative strategies to keep your brand ahead of the curve.</p>
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-[1.5vw]">
          {articles.slice(0, 3).map((article) => (
            <article data-reveal key={article.slug}>
              <Link className="group block" data-cursor="read" href={`/journal/${article.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200" data-mask>
                  <Image alt="" className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 33vw" src={article.image} />
                </div>
                <h3 className="mt-5 max-w-[20rem] text-base font-medium leading-[1.25]">{article.title}</h3>
                <span className="mt-5 inline-block bg-black px-5 py-2.5 text-xs font-semibold uppercase text-white transition group-hover:bg-black/70">Read more</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── Let’s talk ───────── */}
      <section className="px-5 pb-20 md:px-[3.6vw] md:pb-[7vw]" id="contact">
        <div className="grid gap-12 md:grid-cols-2 md:items-end md:gap-[4vw]">
          <h2 className="text-[clamp(3.5rem,9vw,8.1rem)] font-semibold leading-[1] tracking-[-0.04em]" data-reveal>Let’s talk</h2>
          <div data-reveal>
            <p className="mb-10 max-w-[26rem] text-sm leading-5 text-[#6b6b6b]">Whether you’re looking to collaborate or simply want to chat about the project, drop us a line and we’ll get back within two business days.</p>
            <LetsTalkForm />
          </div>
        </div>
      </section>

      <div className="relative h-[40vw] min-h-[16rem] overflow-hidden bg-neutral-200" data-mask>
        <Image alt="" className="object-cover" fill sizes="100vw" src="/images/services/website-mockup.jpg" />
      </div>
    </div>
  )
}
