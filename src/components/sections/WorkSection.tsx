'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { projects } from '@/data/project'
import WorkCard from '@/components/ui/WorkCard'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const card1Ref   = useRef<HTMLLIElement>(null)
  const card2Ref   = useRef<HTMLLIElement>(null)
  const seeAllRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // ── Display titles clip from bottom ───────────────────────────
    gsap.from('.work-title-word', {
      y: '105%',
      duration: 1.1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // ── Cards: staggered y + fade + scale ─────────────────────────
    ;[card1Ref.current, card2Ref.current].forEach((card, i) => {
      if (!card) return
      gsap.from(card, {
        y: 32,
        opacity: 0,
        scale: 0.98,
        duration: 1.5,
        delay: i * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none none',
        },
      })
    })

    // ── See all: fades in after cards ─────────────────────────────
    if (seeAllRef.current) {
      gsap.from(seeAllRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: seeAllRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col py-[80px] md:py-[100px] bg-white"
    >
      <div className="w-full px-8 lg:px-12 xl:px-16 flex flex-col gap-6">

        {/* ── Display title ─────────────────────────────────────── */}
        <div
          ref={titleRef}
          className="flex flex-col sm:flex-row sm:justify-between items-start w-full gap-2 sm:gap-0"
        >
          <div className="overflow-hidden">
            <span
              className="work-title-word block"
              style={{
                fontWeight:    700,
                fontSize:      'clamp(56px, 11vw, 160px)',
                lineHeight:    1,
                letterSpacing: '-0.01em',
                color:         '#242424',
              }}
            >
              WORK
            </span>
          </div>

          <div className="overflow-hidden self-end sm:self-auto">
            <span
              className="work-title-word block"
              style={{
                fontWeight:    700,
                fontSize:      'clamp(56px, 11vw, 160px)',
                lineHeight:    1,
                letterSpacing: '-0.01em',
                color:         '#242424',
              }}
            >
              &apos;26
            </span>
          </div>
        </div>

        {/* ── Cards grid ────────────────────────────────────────── */}
        <ul className="flex flex-col lg:flex-row gap-5 w-full">
          <li ref={card1Ref} className="w-full lg:w-1/2">
            <WorkCard project={projects[0]} />
          </li>
          <li ref={card2Ref} className="w-full lg:w-1/2">
            <WorkCard project={projects[1]} />
          </li>
        </ul>

        {/* ── See all — below grid, centered, larger ────────────── */}
        <div
          ref={seeAllRef}
          className="flex justify-center items-center pt-4"
        >
          <Link
            href="/work"
            className="group flex items-center gap-3 relative"
          >
            {/* Arrow */}
            <span
              className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: '#242424' }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M4 11H18M18 11L12 5M18 11L12 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            {/* Label */}
            <span
              className="relative"
              style={{
                fontWeight:    500,
                fontSize:      'clamp(20px, 1.8vw, 28px)',
                lineHeight:    1,
                letterSpacing: '-0.02em',
                color:         '#242424',
              }}
            >
              See all work
              {/* Animated underline */}
              <span
                className="absolute bottom-0 left-0 h-[1px] bg-bd-black transition-all duration-300 ease-out"
                style={{
                  width: '0%',
                }}
              />
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}
