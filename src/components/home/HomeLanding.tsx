'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/data/project'
import { articles, servicePages } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

const process = [
  ['01', 'Discover', 'We listen, research and define the real problem before deciding what to make.'],
  ['02', 'Direct', 'We turn insight into a focused strategy and a distinctive creative direction.'],
  ['03', 'Design', 'We build, test and refine every touchpoint with care and technical precision.'],
  ['04', 'Deliver', 'We launch clearly, equip your team and remain accountable beyond handover.'],
]

const faqs = [
  ['What kinds of organisations do you work with?', 'We work with ambitious businesses, institutions, programmes and founders who value clarity, quality and dependable execution.'],
  ['Can Barons handle strategy, design and development?', 'Yes. We shape strategy, creative direction and digital implementation as one connected process.'],
  ['How long does a typical engagement take?', 'Focused work can take four to eight weeks. Larger digital platforms usually take eight to sixteen weeks.'],
  ['Do you work outside Tanzania?', 'Yes. We are based in Dar es Salaam and collaborate across Africa and internationally.'],
]

const Arrow = () => <span aria-hidden="true">↗</span>
const Label = ({ children }: { children: React.ReactNode }) => <p className="bd-label">{children}</p>

export default function HomeLanding({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .from('.bd-hero-media', { scale: 1.14, duration: 2.2 })
      .from('.bd-hero-line > span', { yPercent: 115, rotateX: 18, duration: 1.15, stagger: 0.12 }, 0.25)
      .from('.bd-hero-meta', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.8)

    const mobile = window.matchMedia('(max-width: 767px)').matches
    if (!mobile) {
      gsap.to('.bd-hero-media', {
        yPercent: 18, scale: 1.04, ease: 'none',
        scrollTrigger: { trigger: '.bd-hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
      gsap.to('.bd-hero-copy', {
        yPercent: -16, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.bd-hero', start: 'top top', end: '75% top', scrub: 0.6 },
      })
    }

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.from(element, {
        y: mobile ? 28 : 54, opacity: 0, duration: mobile ? 0.7 : 1, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 86%', toggleActions: 'play none none reverse' },
      })
    })

    gsap.utils.toArray<HTMLElement>('.bd-project').forEach((card, index) => {
      const media = card.querySelector('.bd-project-media')
      if (!media) return
      gsap.from(media, {
        clipPath: index % 2 ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)',
        duration: 1.25, ease: 'power4.inOut',
        scrollTrigger: { trigger: card, start: 'top 84%', toggleActions: 'play none none reverse' },
      })
    })

    gsap.utils.toArray<HTMLElement>('.bd-rule').forEach((rule) => {
      gsap.from(rule, {
        scaleX: 0, transformOrigin: 'left', duration: 1.25, ease: 'power3.inOut',
        scrollTrigger: { trigger: rule, start: 'top 92%' },
      })
    })
  }, { scope: root })

  const selected = projects.slice(0, 5)

  return (
    <div ref={root} className="bd-home overflow-hidden bg-white text-black">
      <section className="bd-hero relative min-h-[100svh] overflow-hidden bg-black text-white">
        <div className="bd-hero-media absolute inset-0">
          <video autoPlay className="h-full w-full object-cover" loop muted playsInline poster="/images/services/identity-design.jpg" preload="metadata">
            <source src="/videos/hero-showreel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30" />
        </div>
        <div className="bd-hero-copy relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-12 lg:px-16">
          <div className="mb-auto flex justify-between border-t border-white/35 pt-4 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/65">
            <span className="bd-hero-meta">Independent creative company</span>
            <span className="bd-hero-meta hidden sm:block">Dar es Salaam · Tanzania</span>
          </div>
          <h1 className="max-w-[12ch] text-[clamp(3.15rem,9.2vw,9rem)] font-semibold uppercase leading-[0.84] tracking-[-0.07em] md:leading-[0.82]">
            <span className="bd-hero-line block overflow-hidden pb-[0.08em]"><span className="block">Make quality</span></span>
            <span className="bd-hero-line block overflow-hidden pb-[0.08em]"><span className="block md:ml-[9vw]">impossible</span></span>
            <span className="bd-hero-line block overflow-hidden pb-[0.08em]"><span className="block">to overlook.</span></span>
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-6 border-t border-white/35 pt-4 text-sm sm:flex-row sm:items-end">
            <p className="bd-hero-meta max-w-lg leading-relaxed text-white/70">Strategy, identity and digital experiences for organisations ready to be seen at their true value.</p>
            <Link className="bd-hero-meta inline-flex items-center gap-3 whitespace-nowrap text-white" href="#work">Explore our work <span>↓</span></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#e8e3db] px-5 py-28 text-black md:px-10 md:py-40 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="bd-rule pt-5"><Label>( 01 — Point of view )</Label></div>
          <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:items-end">
            <h2 data-reveal className="text-[clamp(3.2rem,7.4vw,7.2rem)] font-semibold uppercase leading-[0.86] tracking-[-0.065em] lg:col-span-9">Good work deserves a presence that feels just as considered.</h2>
            <p data-reveal className="max-w-md text-base leading-7 text-black/60 lg:col-span-3">We combine local understanding, strategic clarity and exacting craft to turn real capability into brands and experiences people trust.</p>
          </div>
        </div>
      </section>

      <section id="work" className="px-5 py-28 md:px-10 md:py-40 lg:px-16 lg:py-52">
        <div className="mx-auto max-w-[1440px]">
          <div className="bd-rule grid gap-10 border-t border-black/20 pt-5 lg:grid-cols-12">
            <div className="lg:col-span-3"><Label>( 02 — Selected work )</Label></div>
            <div className="lg:col-span-8 lg:col-start-5" data-reveal>
              <h2 className="text-[clamp(3rem,6.6vw,6.4rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em]">Evidence over decoration.</h2>
              <p className="mt-8 max-w-xl text-lg leading-7 text-black/60">Real platforms, identities and communication systems built around a clear problem and a useful outcome.</p>
            </div>
          </div>
          <div className="mt-24 grid grid-cols-1 gap-x-8 gap-y-24 md:grid-cols-2">
            {selected.map((project, index) => (
              <article className={`bd-project ${index === 1 ? 'md:mt-56' : ''} ${index === 2 ? 'md:col-span-2 md:ml-[24%] md:w-[76%]' : ''} ${index === 4 ? 'md:mt-44' : ''}`} key={project.slug}>
                <Link className="group block" data-cursor="view" href={`/work/${project.slug}`}>
                  <div className={`bd-project-media relative overflow-hidden bg-neutral-100 ${index === 1 || index === 4 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                    <Image alt={project.title} className="object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0" fill sizes="(max-width: 768px) 100vw, 50vw" src={project.coverImage} />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] opacity-0 transition duration-300 group-hover:opacity-100">View case study</span>
                  </div>
                  <div className="mt-5 grid grid-cols-[1fr_auto] gap-6 border-t border-black/20 pt-5">
                    <div><h3 className="text-[clamp(1.8rem,3vw,3rem)] font-semibold uppercase leading-none tracking-[-0.045em]">{project.title}</h3><p className="mt-3 text-sm text-black/55">{project.category}</p></div>
                    <div className="flex gap-5 text-xs font-medium uppercase tracking-[0.1em]"><span>{project.year}</span><Arrow /></div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-24 flex justify-end"><Link className="bd-text-link" href="/work">View every project <Arrow /></Link></div>
        </div>
      </section>

      <section className="bg-[#f1f0ec] px-5 py-28 md:px-10 md:py-40 lg:px-16 lg:py-52">
        <div className="mx-auto max-w-[1440px]">
          <div className="bd-rule grid gap-12 border-t border-black/20 pt-5 lg:grid-cols-12">
            <div className="lg:col-span-3"><Label>( 03 — Capabilities )</Label></div>
            <h2 data-reveal className="text-[clamp(3rem,6.4vw,6.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] lg:col-span-8 lg:col-start-5">One standard across every expression.</h2>
          </div>
          <ol className="mt-24 border-t border-black/20">
            {servicePages.map((service, index) => (
              <li data-reveal className="group relative grid gap-6 overflow-hidden border-b border-black/20 py-8 md:grid-cols-[5rem_1fr_1fr] md:items-start md:py-12" key={service.title}>
                <span className="text-xs font-medium tracking-[0.1em] text-black/45">0{index + 1}</span>
                <Link href={`/services/${service.slug}`} data-cursor="view" className="text-[clamp(2rem,4vw,4rem)] font-semibold uppercase leading-none tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-3">{service.title}</Link>
                <p className="max-w-md text-base leading-7 text-black/60">{service.intro}</p>
                <div className="pointer-events-none absolute right-[8%] top-1/2 hidden aspect-[4/3] w-64 -translate-y-1/2 scale-90 overflow-hidden opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 xl:block"><Image src={service.image} alt="" fill className="object-cover grayscale" sizes="256px" /></div>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex justify-end"><Link className="bd-text-link" href="/services">Explore capabilities <Arrow /></Link></div>
        </div>
      </section>

      <section className="px-5 py-28 md:px-10 md:py-40 lg:px-16 lg:py-52">
        <div className="mx-auto max-w-[1440px]">
          <div className="bd-rule grid gap-12 border-t border-black/20 pt-5 lg:grid-cols-12">
            <div className="lg:col-span-3"><Label>( 04 — How we work )</Label></div>
            <h2 data-reveal className="text-[clamp(3rem,6.4vw,6.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] lg:col-span-8 lg:col-start-5">Intuition, held to a process.</h2>
          </div>
          <div className="mt-24 grid border-t border-black/20 md:grid-cols-4">
            {process.map(([number, title, body], index) => (
              <article data-reveal className={`py-10 md:min-h-[28rem] md:px-7 md:py-12 ${index ? 'border-t border-black/20 md:border-l md:border-t-0' : ''}`} key={number}>
                <p className="text-[clamp(4.5rem,8vw,8rem)] font-semibold leading-none tracking-[-0.07em] text-black/12">{number}</p>
                <h3 className="mt-10 text-2xl font-semibold uppercase tracking-[-0.04em]">{title}</h3>
                <p className="mt-6 max-w-xs text-sm leading-6 text-black/60 md:mt-20">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[85svh] overflow-hidden bg-black text-white">
        <div className="absolute inset-0"><Image alt="Barons creative work" className="object-cover opacity-55 grayscale" fill sizes="100vw" src="/images/services/brand-design.png" /><div className="absolute inset-0 bg-black/35" /></div>
        <div className="relative z-10 flex min-h-[85svh] flex-col justify-between px-5 py-10 md:px-10 lg:px-16">
          <Label>( 05 — About Barons )</Label>
          <div data-reveal>
            <h2 className="max-w-[12ch] text-[clamp(3.2rem,7.5vw,7.4rem)] font-semibold uppercase leading-[0.86] tracking-[-0.065em]">Built in Tanzania. Exacting by standard.</h2>
            <div className="mt-8 flex flex-col justify-between gap-8 border-t border-white/35 pt-5 md:flex-row md:items-end"><p className="max-w-xl text-base leading-7 text-white/70">A creative and business solutions company for people who take their work seriously—and want the world to see why.</p><Link className="bd-text-link border-white" href="/about">Meet Barons <Arrow /></Link></div>
          </div>
        </div>
      </section>

      <section id="journal" className="px-5 py-28 md:px-10 md:py-40 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="bd-rule grid gap-12 border-t border-black/20 pt-5 lg:grid-cols-12"><div className="lg:col-span-3"><Label>( 06 — Studio notes )</Label></div><h2 data-reveal className="text-[clamp(3rem,6.4vw,6.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] lg:col-span-8 lg:col-start-5">Thinking behind the work.</h2></div>
          <div className="mt-24 grid gap-16 md:grid-cols-3">
            {articles.map((article, index) => <article data-reveal key={article.title}><Link href={`/journal/${article.slug}`} data-cursor="read" className="group block"><div className="relative aspect-[4/3] overflow-hidden"><Image src={article.image} alt="" fill className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" sizes="(max-width:768px) 100vw, 33vw" /></div><div className="mt-5 border-t border-black/20 pt-5"><div className="flex justify-between text-xs font-medium uppercase tracking-[0.1em] text-black/45"><span>{article.category}</span><span>0{index + 1}</span></div><h3 className="mt-12 text-[clamp(1.8rem,2.8vw,2.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.05em]">{article.title}</h3><p className="mt-6 text-sm leading-6 text-black/60">{article.excerpt}</p></div></Link></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f1f0ec] px-5 py-28 md:px-10 md:py-40 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="bd-rule grid gap-12 border-t border-black/20 pt-5 lg:grid-cols-12"><div className="lg:col-span-3"><Label>( 07 — FAQ )</Label></div><h2 data-reveal className="text-[clamp(3rem,6.4vw,6.2rem)] font-semibold uppercase leading-[.88] tracking-[-.065em] lg:col-span-8 lg:col-start-5">Useful answers, before we begin.</h2></div>
          <div className="mt-20 lg:ml-[25%]">{faqs.map(([question, answer], index) => <details className="group border-t border-black/20 py-6" key={question}><summary className="flex list-none items-center justify-between gap-6 text-xl font-semibold uppercase tracking-[-.03em] md:text-3xl"><span><span className="mr-6 text-xs text-black/35">0{index + 1}</span>{question}</span><span className="text-2xl transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-4 pl-12 pt-6 leading-7 text-black/60">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:px-16"><div className="mx-auto grid max-w-[1440px] gap-12 border-t border-black/20 pt-5 lg:grid-cols-12"><div className="lg:col-span-3"><Label>( Follow the work )</Label></div><div className="grid gap-4 sm:grid-cols-3 lg:col-span-8 lg:col-start-5">{[['LinkedIn','https://www.linkedin.com/company/barons-digital/'],['Instagram','https://www.instagram.com/baronsdigital/'],['Facebook','https://www.facebook.com/baronsdigital']].map(([label, href]) => <a className="flex items-center justify-between border-t border-black/20 py-5 text-lg font-semibold uppercase" href={href} target="_blank" rel="noopener noreferrer" key={label}>{label}<span>↗</span></a>)}</div></div></section>

      <section className="bg-[#dfe8eb] px-5 py-28 text-black md:px-10 md:py-40 lg:px-16 lg:py-52">
        <div className="mx-auto max-w-[1440px]"><div className="bd-rule pt-5"><Label>( 08 — Start something )</Label></div><h2 data-reveal className="mt-24 max-w-[12ch] text-[clamp(3.5rem,8vw,8rem)] font-semibold uppercase leading-[0.84] tracking-[-0.07em]">Your work deserves to be seen at its true value.</h2><div className="mt-14 flex justify-end"><Link className="bd-text-link" href="/contact">Start a project <Arrow /></Link></div></div>
      </section>
    </div>
  )
}
