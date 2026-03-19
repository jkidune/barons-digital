'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Project } from '@/data/project'

gsap.registerPlugin(ScrollTrigger)

export default function WorkCard({ project }: { project: Project }) {
  const cardRef        = useRef<HTMLDivElement>(null)
  const imageWrapRef   = useRef<HTMLDivElement>(null)
  const imageInnerRef  = useRef<HTMLDivElement>(null)
  const videoRef       = useRef<HTMLVideoElement>(null)
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

  const handleMouseEnter = () => {
    setHovered(true)
    videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    setHovered(false)
    // Delay pause until clip-path exit animation finishes
    setTimeout(() => {
      if (videoRef.current && !hovered) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }, 600)
  }

  return (
    <div
      ref={cardRef}
      className="flex flex-col justify-between w-full h-full group rounded-[6px] p-4 sm:p-6"
      style={{
        background:   '#242424',
        gap:          10,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* ── Image + hover video ─────────────────────────────────────── */}
      <Link href={`/work/${project.slug}`} className="block flex-1">
        <div
          ref={imageWrapRef}
          className="relative overflow-hidden rounded-[10px] h-[260px] sm:h-[320px] md:h-[439px]"
        >

          {/* Background image with parallax + hover scale */}
          <div
            ref={imageInnerRef}
            className="absolute inset-0 w-full will-change-transform"
            style={{ height: '120%', top: '-10%' }}
          >
            {/*
              ── PLACEHOLDER ─────────────────────────────────────────
              Replace with:
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              File: /public/images/work/[slug]/cover.jpg  (780 × 440)
            */}
            <div
              className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              style={{ background: '#3A3A3A' }}
            />
          </div>

          {/* Blur + dark overlay — fades in on hover */}
          <div
            className="absolute inset-0 z-10 transition-all duration-500 ease-out"
            style={{
              background:    'rgba(20, 20, 20, 0.5)',
              backdropFilter: hovered ? 'blur(4px)' : 'blur(0px)',
              opacity:       hovered ? 1 : 0,
            }}
          />

          {/* Preview video — clip-path polygon reveal on hover */}
          {/*
            Collapsed state: horizontal line at center
              polygon(30% 50%, 70% 50%, 70% 50%, 30% 50%)
            Expanded state:  full rectangle
              polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)
            Easing: cubic-bezier(0.87, 0, 0.13, 1) — sharp deceleration
          */}
          <video
            ref={videoRef}
            src={project.previewVideo}
            muted
            loop
            playsInline
            className="absolute z-20 rounded-lg object-cover pointer-events-none"
            style={{
              width:      '65%',
              height:     'auto',
              top:        '50%',
              left:       '50%',
              transform:  hovered
                ? 'translate(-50%, -54%)'
                : 'translate(-50%, -50%)',
              clipPath: hovered
                ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                : 'polygon(30% 50%, 70% 50%, 70% 50%, 30% 50%)',
              transition: hovered
                ? 'clip-path 700ms cubic-bezier(0.87, 0, 0.13, 1), transform 700ms cubic-bezier(0.87, 0, 0.13, 1)'
                : 'clip-path 500ms cubic-bezier(0.87, 0, 0.13, 1), transform 500ms cubic-bezier(0.87, 0, 0.13, 1)',
            }}
          />
          {/*
            PLACEHOLDER video:
            /public/videos/work/[slug]/preview.mp4  — keep under 5MB
          */}

        </div>
      </Link>

      {/* ── Bottom content row ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-3 sm:gap-0">

        {/* Brand: icon circle + project name uppercase */}
        <Link
          href={`/work/${project.slug}`}
          className="flex flex-row items-center gap-[10px] group/brand"
        >
          {/* Icon circle */}
          <div
            className="flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{
              width:        42,
              height:       42,
              background:   '#FFFFFF',
              borderRadius: 360,
            }}
          >
            {/*
              PLACEHOLDER — replace with:
              <Image
                src={project.icon}
                alt={project.title}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              File: /public/images/work/[slug]/icon.png  (32 × 32)
            */}
            <div
              style={{
                width:      32,
                height:     32,
                background: '#D4C5B5',
                borderRadius: '50%',
              }}
            />
          </div>

          {/* Project name — uppercase */}
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

      {/* ── Keyword ticker ─────────────────────────────────────────── */}
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
