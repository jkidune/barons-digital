'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ArrowLink from '@/components/ui/ArrowLink'

gsap.registerPlugin(ScrollTrigger)

const taglines = ['Locally Made', 'World Class', 'Nothing Less']

export default function CTASection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const tagRef      = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)

  // Each word in the headline gets its own span for the character-level animation
  const headline = 'Tell us what you are building, where the brand is falling short, and what the next stage demands.'

  useGSAP(() => {
    if (!sectionRef.current) return

    // ── Taglines: clip reveal staggered ───────────────────────────
    gsap.from('.cta-tag-line', {
      y: '105%',
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: tagRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // ── Headline words: fade + slide up staggered ─────────────────
    gsap.from('.cta-word', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.03,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headlineRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // ── CTA button: fade up last ───────────────────────────────────
    gsap.from(ctaRef.current, {
      y: 18,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col py-[100px] bg-white overflow-hidden"
      style={{ minHeight: 741 }}
    >
      <div className="w-full px-8 lg:px-12 xl:px-16 flex flex-col gap-4 h-full">

        {/* ── Top left taglines ──────────────────────────────────── */}
        <div ref={tagRef} className="flex flex-col gap-[10px]">
          {taglines.map((line) => (
            <div key={line} className="overflow-hidden">
              <span
                className="cta-tag-line block"
                style={{
                  fontWeight:    700,
                  fontSize:      'clamp(22px, 2.4vw, 36px)',
                  lineHeight:    1,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color:         '#696969',
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bottom right: headline + CTA ──────────────────────── */}
        <div className="flex flex-col justify-end items-end flex-1 gap-4 mt-8 lg:mt-0">
          <div
            className="flex flex-col justify-center items-start gap-8 w-full lg:max-w-[627px]"
          >

            {/* Headline split into words for stagger */}
            <h2
              ref={headlineRef}
              className="flex flex-wrap"
              style={{
                fontWeight:    500,
                fontSize:      'clamp(32px, 4.8vw, 70px)',
                lineHeight:    1,
                letterSpacing: '-0.04em',
                color:         '#000000',
                gap:           '0.25em 0',
              }}
              aria-label={headline}
            >
              {headline.split(' ').map((word, i) => (
                <span
                  key={i}
                  className="cta-word inline-block"
                  style={{ marginRight: '0.25em' }}
                >
                  {word}
                </span>
              ))}
            </h2>

            {/* CTA */}
            <div ref={ctaRef}>
              <ArrowLink
                href="/contact"
                label="Book a free consultation"
                color="dark"
                weight="bold"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
