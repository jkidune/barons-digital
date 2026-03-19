'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ArrowLink from '@/components/ui/ArrowLink'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const row1Ref  = useRef<HTMLDivElement>(null)
  const row2Ref  = useRef<HTMLDivElement>(null)
  const row3Ref  = useRef<HTMLDivElement>(null)

  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)

  const imageRef  = useRef<HTMLDivElement>(null)
  const bodyRef   = useRef<HTMLParagraphElement>(null)
  const ctaRef    = useRef<HTMLDivElement>(null)
  const float1Ref = useRef<HTMLDivElement>(null)
  const float2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const spans = [span1Ref.current, span2Ref.current, span3Ref.current]
    const rows  = [row1Ref.current,  row2Ref.current,  row3Ref.current]

    // ── Title clip reveals ─────────────────────────────────────────
    spans.forEach((span, i) => {
      if (!span) return
      gsap.from(span, {
        y: '105%',
        duration: 1.1,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    })

    // ── Title horizontal drift (alternating) ──────────────────────
    const driftX = [80, -80, 80]
    rows.forEach((row, i) => {
      if (!row) return
      gsap.from(row, {
        x: driftX[i],
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'center 40%',
          scrub: 0.6,
        },
      })
    })

    // ── Image wipe from bottom ─────────────────────────────────────
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 0 100% 0 round 6px)' },
        {
          clipPath: 'inset(0 0 0% 0 round 6px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // ── Body + CTA fade up ─────────────────────────────────────────
    if (bodyRef.current) {
      gsap.from(bodyRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }

    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      })
    }

    // ── Floating shapes parallax ───────────────────────────────────
    if (float1Ref.current) {
      gsap.to(float1Ref.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    if (float2Ref.current) {
      gsap.to(float2Ref.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center py-[80px] md:py-[100px] overflow-hidden"
      style={{ background: '#242424' }}
    >

      {/* ── Float 1 — Summertime Sadness (figure-8 / butterfly shape) ── */}
      {/* Figma: left 998/1512 ≈ 66%, top 26px */}
      <div
        ref={float1Ref}
        className="hidden md:block absolute z-[2] pointer-events-none"
        style={{ width: 156, height: 156, left: '66%', top: 26 }}
        aria-hidden="true"
      >
        <svg
          width="156"
          height="156"
          viewBox="0 0 156 156"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39 0C17.4609 0 0 17.4609 0 39C0 60.5394 17.4609 78 39 78C17.4609 78 0 95.4606 0 117C0 138.539 17.4609 156 39 156C60.5394 156 78 138.539 78 117C78 138.539 95.4606 156 117 156C138.539 156 156 138.539 156 117C156 95.4606 138.539 78 117 78C138.539 78 156 60.5394 156 39C156 17.4609 138.539 0 117 0C95.4606 0 78 17.4609 78 39C78 17.4609 60.5394 0 39 0Z"
            fill="#BFBFBF"
          />
        </svg>
      </div>

      {/* ── Float 2 — Butterfly (hourglass / double-arch shape) ──────── */}
      {/* Figma: left 482/1512 ≈ 32%, top 502px */}
      <div
        ref={float2Ref}
        className="hidden md:block absolute z-[3] pointer-events-none"
        style={{ width: 147, height: 151, left: '32%', top: 502 }}
        aria-hidden="true"
      >
        <svg
          width="147"
          height="151"
          viewBox="0 0 147 151"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M74.2861 79.4163C72.2698 119.003 39.8574 150.539 0 151V0C39.8574 0.460902 72.2698 31.9964 74.2861 71.5837C76.2757 32.5182 107.866 1.29376 147 0.0345384V150.966C107.866 149.707 76.2757 118.482 74.2861 79.4163Z"
            fill="#F2C94C"
          />
        </svg>
      </div>

      {/* ── Main container ───────────────────────────────────────────── */}
      <div className="relative z-[1] w-full px-8 lg:px-12 xl:px-16 flex flex-col gap-[35px]">

        {/* ── TITLES ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-[35px] w-full">

          {/* Line 1 — left aligned */}
          <div
            ref={row1Ref}
            className="flex flex-row items-center w-full overflow-hidden"
          >
            <span
              ref={span1Ref}
              className="block whitespace-normal md:whitespace-nowrap"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(32px, 4.8vw, 70px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#F8F5F5',
              }}
            >
              Built in Tanzania
            </span>
          </div>

          {/* Line 2 — centered with left offset */}
          <div
            ref={row2Ref}
            className="flex flex-row justify-center items-center w-full overflow-hidden pl-0 md:pl-[50px]"
          >
            <span
              ref={span2Ref}
              className="block whitespace-normal md:whitespace-nowrap"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(32px, 4.8vw, 70px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#F8F5F5',
              }}
            >
              For businesses
            </span>
          </div>

          {/* Line 3 — right aligned */}
          <div
            ref={row3Ref}
            className="flex flex-row justify-end items-center w-full overflow-hidden pr-0 md:pr-[20px]"
          >
            <span
              ref={span3Ref}
              className="block whitespace-normal md:whitespace-nowrap"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(32px, 4.8vw, 70px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#F8F5F5',
              }}
            >
              Going further
            </span>
          </div>

        </div>

        {/* ── BOTTOM ROW ───────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-[10px] w-full">

          {/* Image / Video */}
          <div
            ref={imageRef}
            className="flex-shrink-0 overflow-hidden w-full max-w-[409px] h-[320px] sm:h-[360px] md:h-[413px] rounded-[6px] mx-auto lg:mx-0"
          >
            {/*
              PLACEHOLDER — replace with video when ready:
              <video
                src="/media/about-video.mp4"
                autoPlay muted loop playsInline
                className="w-full h-full object-cover pointer-events-none"
              />
              File: /public/media/about-video.mp4  (409 × 413)
            */}
            <div className="w-full h-full bg-bd-placeholder" />
          </div>

          {/* Body + CTA */}
          <div className="flex flex-col gap-6 w-full lg:max-w-[408px]">
            <p
              ref={bodyRef}
              style={{
                fontWeight: 400,
                fontSize: 18,
                lineHeight: '21px',
                letterSpacing: '-0.01em',
                color: '#F8F5F5',
              }}
            >
              Barons Digital was founded on a simple belief: too many serious
              Tanzanian businesses are underestimated because their brand does
              not reflect the quality of what they actually do. We exist to
              close that gap with strategy, precision, and craft.
            </p>

            <div ref={ctaRef}>
              <ArrowLink
                href="/about"
                label="Learn more about us"
                color="light"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
