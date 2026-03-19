'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ArrowLink from '@/components/ui/ArrowLink'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref   = useRef<HTMLSpanElement>(null)
  const line2Ref   = useRef<HTMLSpanElement>(null)
  const line3Ref   = useRef<HTMLSpanElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.3,
      })

      tl
        .from([line1Ref.current, line2Ref.current, line3Ref.current], {
          y: '105%',
          duration: 1.1,
          stagger: 0.1,
        })
        .from(subtextRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.9,
        }, '-=0.65')
        .from(ctaRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.7,
        }, '-=0.7')
        .from(scrollRef.current, {
          opacity: 0,
          duration: 0.6,
        }, '-=0.4')
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      // No overflow-hidden — showreel card needs to visually bleed up into here
      className="relative w-full min-h-screen flex flex-col pt-[100px] pb-[100px] bg-white"
    >
      {/* ── Full-width container with px padding ─────────────────────── */}
      <div className="relative w-full flex-1 flex flex-col px-8 lg:px-12 xl:px-16">

        {/*
          ── Hero Card Anchor ────────────────────────────────────────────
          Invisible position anchor only.
          ShowreelSection reads this rect to know where to start
          the media element. Never give this any visible styles.
        */}
        <div
          data-hero-card
          className="absolute opacity-0 pointer-events-none"
          style={{ width: 327, height: 231, left: 48, top: 100 }}
          aria-hidden="true"
        />

        {/* ── Main Content — bottom aligned ───────────────────────────── */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-4">

            {/* Left: Subtext + CTA */}
            <div className="flex flex-col gap-6 w-full lg:w-[408px] order-2 lg:order-1 pb-0 lg:pb-2">
              <p
                ref={subtextRef}
                className="text-[18px] leading-[21px] tracking-[-0.01em] text-bd-black font-normal"
              >
                Barons Digital builds brands, websites, and communications
                systems that help ambitious businesses look sharper, speak
                clearly, and compete with confidence.
              </p>

              <div ref={ctaRef}>
                <ArrowLink href="/contact" label="Start your brand journey" />
              </div>
            </div>

            {/* Headline */}
            <div className="order-1 lg:order-2 w-full lg:max-w-[627px]">
              <h1
                aria-label="Average isn't your standard. It isn't ours — Let's work"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(38px, 4.8vw, 70px)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.04em',
                  color: '#000000',
                }}
              >
                <span className="clip-reveal pb-[0.08em]">
                  <span ref={line1Ref} style={{ display: 'block' }}>
                    Average isn&apos;t your
                  </span>
                </span>
                <span className="clip-reveal pb-[0.08em]">
                  <span ref={line2Ref} style={{ display: 'block' }}>
                    standard. It isn&apos;t
                  </span>
                </span>
                <span className="clip-reveal pb-[0.08em]">
                  <span ref={line3Ref} style={{ display: 'block' }}>
                    ours—Let&apos;s work
                  </span>
                </span>
              </h1>
            </div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-5 left-0 right-0 px-8 lg:px-12 xl:px-16 hidden lg:block"
        aria-hidden="true"
      >
        <div className="w-full flex justify-between items-center">
          {['Scroll', 'To', 'Discover'].map((word) => (
            <span
              key={word}
              className="text-[16px] leading-[20px] font-bold text-bd-black uppercase tracking-[0.05em]"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
