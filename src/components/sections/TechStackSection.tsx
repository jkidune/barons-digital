'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// ── Tool data ─────────────────────────────────────────────────────
// Top row: 3 large cells
// Bottom row: 6 smaller cells
// SVG files live in /public/images/tech/[name].svg

const topRow = [
  { name: 'Figma',   src: '/images/tech/figma.svg',   w: 42,  h: 62,  href: 'https://figma.com'   },
  { name: 'Framer',  src: '/images/tech/framer.svg',  w: 48,  h: 72,  href: 'https://framer.com'  },
  { name: 'Webflow', src: '/images/tech/webflow.svg', w: 86,  h: 52,  href: 'https://webflow.com' },
]

const bottomRow = [
  { name: 'Next.js',     src: '/images/tech/nextjs.svg',     w: 120, h: 30,  href: 'https://nextjs.org'       },
  { name: 'React',       src: '/images/tech/react.svg',      w: 62,  h: 55,  href: 'https://react.dev'        },
  { name: 'Tailwind',    src: '/images/tech/tailwind.svg',   w: 100, h: 30,  href: 'https://tailwindcss.com'  },
  { name: 'GSAP',        src: '/images/tech/gsap.svg',       w: 80,  h: 30,  href: 'https://gsap.com'         },
  { name: 'Vercel',      src: '/images/tech/vercel.svg',     w: 110, h: 26,  href: 'https://vercel.com'       },
  { name: 'Photoshop',   src: '/images/tech/photoshop.svg',  w: 44,  h: 44,  href: 'https://adobe.com'        },
]

// ── Sliding highlight grid ─────────────────────────────────────────
// Adapted from reference: dark block slides to hovered cell,
// logo inside highlighted cell gets CSS invert (dark → white).
function LogoGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const highlight = highlightRef.current
    if (!container || !highlight) return

    // Move highlight to a grid-item element
    const moveToElement = (el: HTMLElement) => {
      const rect          = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // Instant reposition on first mount, animated on hover
      highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`
      highlight.style.width     = `${rect.width}px`
      highlight.style.height    = `${rect.height}px`

      // Remove invert from all logos
      container.querySelectorAll('.tech-logo').forEach((img) => {
        img.classList.remove('invert')
      })

      // Invert logo in current cell
      const logo = el.querySelector('.tech-logo')
      if (logo) logo.classList.add('invert')
    }

    // Seed highlight on first cell
    const first = container.querySelector<HTMLElement>('.grid-item')
    if (first) moveToElement(first)

    const onMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      if (!target) return
      const cell = target.classList.contains('grid-item')
        ? target
        : target.closest<HTMLElement>('.grid-item')
      if (cell && container.contains(cell)) moveToElement(cell)
    }

    container.addEventListener('mousemove', onMouseMove)
    return () => container.removeEventListener('mousemove', onMouseMove)
  }, [])

  const dividerColor = 'rgba(61, 61, 61, 0.5)'

  return (
    <div ref={containerRef} className="relative w-full">

      {/* ── Desktop grid ──────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col w-full">

        {/* Top row — 3 large cells */}
        <div
          className="grid grid-cols-3 w-full"
          style={{
            borderBottom: `0.5px solid ${dividerColor}`,
            height: 'clamp(180px, 20vw, 396px)',
          }}
        >
          {topRow.map((tool, i) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tool.name}
              className="grid-item flex items-center justify-center"
              style={{
                borderRight: i < topRow.length - 1 ? `0.5px solid ${dividerColor}` : undefined,
              }}
            >
              {/*
                PLACEHOLDER — SVG file needed:
                /public/images/tech/[name].svg
                Replace the name div below when file is ready.
              */}
              <span
                className="tech-logo transition-all duration-300 z-10"
                style={{
                  fontWeight:    700,
                  fontSize:      'clamp(14px, 1.4vw, 20px)',
                  letterSpacing: '-0.02em',
                  color:         '#242424',
                  textTransform: 'uppercase',
                }}
              >
                {tool.name}
              </span>
              {/*
                When SVG files are added, replace the <span> above with:
                <Image
                  src={tool.src}
                  alt={tool.name}
                  width={tool.w}
                  height={tool.h}
                  className="tech-logo z-10 transition-all duration-300 object-contain"
                />
              */}
            </a>
          ))}
        </div>

        {/* Bottom row — 6 smaller cells */}
        <div
          className="grid grid-cols-6 w-full"
          style={{ height: 'clamp(120px, 13vw, 249px)' }}
        >
          {bottomRow.map((tool, i) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tool.name}
              className="grid-item flex items-center justify-center"
              style={{
                borderRight: i < bottomRow.length - 1 ? `0.5px solid ${dividerColor}` : undefined,
              }}
            >
              <span
                className="tech-logo transition-all duration-300 z-10 text-center"
                style={{
                  fontWeight:    700,
                  fontSize:      'clamp(10px, 0.9vw, 14px)',
                  letterSpacing: '-0.02em',
                  color:         '#242424',
                  textTransform: 'uppercase',
                }}
              >
                {tool.name}
              </span>
              {/*
                When SVG files are added, replace the <span> above with:
                <Image
                  src={tool.src}
                  alt={tool.name}
                  width={tool.w}
                  height={tool.h}
                  className="tech-logo z-10 transition-all duration-300 object-contain"
                />
              */}
            </a>
          ))}
        </div>

      </div>

      {/* ── Mobile grid — 2 columns ──────────────────────────────── */}
      <div className="grid grid-cols-2 lg:hidden w-full">
        {[...topRow, ...bottomRow].map((tool, i, arr) => {
          const isLastRow   = i >= arr.length - 2
          const isRightCol  = i % 2 === 1
          return (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tool.name}
              className="grid-item flex items-center justify-center"
              style={{
                height:       'clamp(100px, 25vw, 180px)',
                borderRight:  !isRightCol ? `0.5px solid ${dividerColor}` : undefined,
                borderBottom: !isLastRow  ? `0.5px solid ${dividerColor}` : undefined,
              }}
            >
              <span
                className="tech-logo transition-all duration-300 z-10 text-center"
                style={{
                  fontWeight:    700,
                  fontSize:      'clamp(11px, 3vw, 16px)',
                  letterSpacing: '-0.02em',
                  color:         '#242424',
                  textTransform: 'uppercase',
                }}
              >
                {tool.name}
              </span>
            </a>
          )
        })}
      </div>

      {/* ── Sliding highlight block ─────────────────────────────── */}
      {/* Transitions smoothly between cells on mousemove */}
      <div
        ref={highlightRef}
        className="hidden lg:block absolute top-0 left-0 bg-[#242424] pointer-events-none"
        style={{
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), width 300ms cubic-bezier(0.16, 1, 0.3, 1), height 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex:     0,
        }}
      />

    </div>
  )
}

function TitleWord({ word, extraClass }: { word: string; extraClass?: string }) {
  return (
    <div
      className={`flex overflow-hidden ${extraClass ?? ''}`}
      style={{
        fontSize:      'clamp(44px, 11vw, 160px)',
        fontWeight:    700,
        lineHeight:    0.93,
        letterSpacing: '-0.01em',
        color:         '#242424',
      }}
    >
      {word.split('').map((char, i) => (
        <span key={i} className="ts-letter relative inline-block">
          <span>{char === ' ' ? '\u00A0' : char}</span>
          <span className="absolute bottom-full left-0">{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ))}
    </div>
  )
}

// ── Letter scroll title ────────────────────────────────────────────
// Letters fall down via scroll scrub, staggered randomly.
// Matches reference LetterScroll component exactly.
function TitleLetterScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    gsap.to('.ts-letter', {
      yPercent: 100,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: '40% 95%',
        end: '100% 80%',
        scrub: 1,
      },
      stagger: {
        each: 0.05,
        from: 'random',
      },
    })
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-start w-full"
      style={{ gap: 0 }}
    >
      {/* Line 1: TECH STACK */}
      <TitleWord word="TECH STACK" />
      {/* Line 2: WE USE */}
      <TitleWord word="WE USE" />
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────
export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Logo grid fades in as section scrolls into view
    gsap.from('.tech-grid-wrap', {
      opacity: 0,
      y: 30,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.tech-grid-wrap',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col py-[80px] md:py-[100px] bg-white overflow-hidden"
    >
      <div className="w-full px-8 lg:px-12 xl:px-16 flex flex-col gap-9">

        {/* ── Animated letter title ─────────────────────────────── */}
        <TitleLetterScroll />

        {/* ── Logo grid ─────────────────────────────────────────── */}
        <div className="tech-grid-wrap w-full">
          <LogoGrid />
        </div>

      </div>
    </section>
  )
}
