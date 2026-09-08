'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const editorialCards = [
  { eyebrow: 'About Barons Digital', title: 'Strategy, craft and accountable delivery—built in Tanzania.', href: '/about', media: '/images/services/brand-design.png' },
  { eyebrow: 'Selected work', title: 'Timeless Vows: a calmer digital experience for meaningful events.', href: '/work', media: '/images/work/timeless-vows/4b78a00c1f111b0799b26265e539ecd6.webp' },
]

function ArrowIcon() {
  return <svg aria-hidden="true" fill="none" height="10" viewBox="0 0 10 10" width="10"><path d="M1.5 8.5 8.5 1.5M3 1.5h5.5V7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export default function HomeHero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(gsap.utils.toArray<HTMLElement>('[data-hero-reveal]'), { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.15 })
  }, { scope: root })

  return (
    <section className="relative isolate overflow-hidden bg-bd-dark-canvas px-3 pb-3 pt-24 text-white sm:px-5 sm:pb-5 sm:pt-28" ref={root}>
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full bg-white/[0.055] blur-[140px]" />
      <div className="mx-auto max-w-[105.5rem]">
        <div className="grid gap-8 pb-8 lg:grid-cols-12 lg:items-end lg:pb-12">
          <h1 className="max-w-[9ch] text-[clamp(4rem,7.2vw,6rem)] font-light leading-[1.04] tracking-[-0.055em] lg:col-span-7" data-hero-reveal>Make quality <em className="font-editorial">visible</em>.</h1>
          <p className="max-w-[28rem] text-[clamp(1.05rem,1.35vw,1.25rem)] font-medium leading-[1.25] tracking-[-0.04em] text-white/55 lg:col-span-4 lg:col-start-9" data-hero-reveal>
            We help serious Tanzanian businesses and organizations turn the quality of what they do into brands, digital experiences, memorable moments and practical solutions people can trust.
          </p>
        </div>

        <div className="grid gap-2 lg:grid-cols-[minmax(0,3fr)_minmax(19rem,1fr)]" data-hero-reveal>
          <div className="bd-glass-card relative min-h-[29rem] overflow-hidden rounded-xl bg-black lg:h-[41.5rem]">
            <video autoPlay className="absolute inset-0 size-full object-cover" loop muted playsInline poster="/images/services/identity-design.jpg" preload="metadata"><source src="/videos/hero-showreel.mp4" type="video/mp4" /></video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-6">
              <p className="max-w-[26rem] text-sm leading-5 text-white/60">Brand, digital and experience work shaped by one standard: make the real quality visible.</p>
              <span className="bd-glass-badge shrink-0 text-white/60">Showreel · 2026</span>
            </div>
          </div>

          <aside aria-label="Featured Barons stories" className="grid gap-2 sm:grid-cols-2 lg:max-h-[41.5rem] lg:grid-cols-1 lg:overflow-y-auto lg:pr-1">
            {editorialCards.map((card) => (
              <Link className="bd-glass-card group flex min-h-[20rem] flex-col rounded-xl bg-white/[0.035] p-2" href={card.href} key={card.eyebrow}>
                <div className="flex items-start justify-between gap-4 px-2 pb-4 pt-2">
                  <div><p className="text-[0.82rem] font-medium text-white/75">{card.eyebrow}</p><p className="mt-2 max-w-[24rem] text-[0.78rem] leading-[1.4] text-white/45">{card.title}</p></div>
                  <span className="flex gap-1"><span className="flex size-[1.125rem] items-center justify-center rounded-[0.35rem] bg-white/10 text-white"><ArrowIcon /></span><span className="flex size-[1.125rem] items-center justify-center rounded-[0.35rem] bg-white/10 text-white transition-transform duration-300 group-hover:translate-x-0.5"><ArrowIcon /></span></span>
                </div>
                <div className="relative mt-auto min-h-[13.75rem] flex-1 overflow-hidden rounded-lg bg-bd-dark-raised">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute inset-0 size-full object-cover opacity-75 grayscale transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100 group-hover:grayscale-0" src={card.media} />
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}
