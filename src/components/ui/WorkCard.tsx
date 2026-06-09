'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Project } from '@/data/project'

gsap.registerPlugin(ScrollTrigger)

export default function WorkCard({ project }: { project: Project }) {
  const cardRef       = useRef<HTMLDivElement>(null)
  const imageWrapRef  = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const floatRef      = useRef<HTMLDivElement>(null)   // the floating window
  const rafRef        = useRef<number | null>(null)

  const [hovered, setHovered] = useState(false)

  // ── Parallax: image drifts as card scrolls through viewport ───────
  useGSAP(() => {
    if (!imageWrapRef.current || !imageInnerRef.current) return
    gsap.fromTo(
      imageInnerRef.current,
      { y: '-10%' },
      {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  }, { scope: cardRef })

  // ── Smooth cursor tracker using rAF ────────────────────────────────
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!floatRef.current || !imageWrapRef.current) return

    const rect = imageWrapRef.current.getBoundingClientRect()
    // position relative to the image container
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (!floatRef.current) return
      // use GSAP quickSetter-style direct set for zero-lag feel
      gsap.set(floatRef.current, {
        x: x - floatRef.current.offsetWidth / 2,
        y: y - floatRef.current.offsetHeight / 2,
      })
    })
  }, [])

  const handleMouseEnter = () => {
    setHovered(true)
    videoRef.current?.play().catch(() => {})
    // animate floating window IN
    if (floatRef.current) {
      gsap.killTweensOf(floatRef.current)
      gsap.to(floatRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'back.out(1.4)',
      })
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    // animate floating window OUT
    if (floatRef.current) {
      gsap.killTweensOf(floatRef.current)
      gsap.to(floatRef.current, {
        scale: 0.6,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          videoRef.current?.pause()
          if (videoRef.current) videoRef.current.currentTime = 0
        },
      })
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  return (
    <div
      ref={cardRef}
      className="flex flex-col justify-between w-full h-full group rounded-[6px] p-4 sm:p-6"
      style={{
        background: '#242424',
        gap:        10,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* ── Image wrap + cursor-following video ───────────────────────── */}
      <Link href={`/work/${project.slug}`} className="block flex-1">
        <div
          ref={imageWrapRef}
          className="relative overflow-hidden rounded-[10px] h-[260px] sm:h-[320px] md:h-[439px]"
          onMouseMove={onMouseMove}
        >

          {/* Cover image with parallax + subtle scale on hover */}
          <div
            ref={imageInnerRef}
            className="absolute inset-0 w-full will-change-transform"
            style={{ height: '120%', top: '-10%' }}
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Dark + blur overlay — fades in on hover */}
          <div
            className="absolute inset-0 z-10 transition-[opacity,backdrop-filter] duration-500 ease-out"
            style={{
              background:     'rgba(10, 10, 10, 0.45)',
              backdropFilter: hovered ? 'blur(6px)' : 'blur(0px)',
              WebkitBackdropFilter: hovered ? 'blur(6px)' : 'blur(0px)',
              opacity:        hovered ? 1 : 0,
            }}
          />

          {/* ── Cursor-following floating video window ─────────────────
              Starts scaled-down & transparent. GSAP animates it in/out.
              Position is set via GSAP in onMouseMove so it's lag-free.
          ──────────────────────────────────────────────────────────── */}
          <div
            ref={floatRef}
            className="absolute z-30 pointer-events-none"
            style={{
              width:        '62%',
              top:          0,
              left:         0,
              opacity:      0,
              scale:        0.6,
              willChange:   'transform, opacity',
            }}
          >
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto object-cover shadow-2xl"
              style={{
                borderRadius: 16,
                display:      'block',
              }}
            />
          </div>

        </div>
      </Link>

      {/* ── Bottom content row ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-3 sm:gap-0">

        {/* Brand: icon + project name */}
        <Link
          href={`/work/${project.slug}`}
          className="flex flex-row items-center gap-[10px] group/brand"
        >
          <div
            className="flex items-center justify-center flex-shrink-0 overflow-hidden border border-black/5"
            style={{
              width:        42,
              height:       42,
              background:   '#FFFFFF',
              borderRadius: 360,
            }}
          >
            <Image
              src={project.icon}
              alt={project.title}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>

          <span
            className="group-hover/brand:opacity-50 transition-opacity duration-200 text-[16px] leading-[20px] sm:text-[20px] sm:leading-[24px] whitespace-normal sm:whitespace-nowrap"
            style={{
              fontWeight:    700,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color:         '#F8F5F5',
            }}
          >
            {project.title}
          </span>
        </Link>

        {/* Category | Year */}
        <span
          className="text-[14px] leading-[18px] sm:text-[20px] sm:leading-[24px] whitespace-normal sm:whitespace-nowrap"
          style={{
            fontWeight:    400,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color:         '#D3D3D3',
          }}
        >
          {project.category}&nbsp;|&nbsp;{project.year}©
        </span>

      </div>

      {/* ── Keyword ticker ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: 18 }}>
        <div
          className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #242424, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #242424, transparent)' }}
        />

        <div className="flex items-center" style={{ width: 'max-content' }}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center"
              style={{ animation: 'ticker 28s linear infinite', willChange: 'transform' }}
            >
              {project.keywords.map((kw, i) => (
                <span
                  key={i}
                  style={{
                    fontSize:      11,
                    fontWeight:    500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         '#4F4F4F',
                    whiteSpace:    'nowrap',
                    paddingRight:  20,
                  }}
                >
                  {kw}
                  {i < project.keywords.length - 1 && (
                    <span style={{ paddingLeft: 20, color: '#3D3D3D' }}>·</span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
