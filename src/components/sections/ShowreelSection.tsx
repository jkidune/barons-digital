'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import useWindowSize from '@/hooks/useWindowSize'

gsap.registerPlugin(ScrollTrigger)

export default function ShowreelSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef   = useRef<HTMLDivElement>(null)
  const { width }  = useWindowSize()

  useGSAP(() => {
    const section = sectionRef.current
    const media   = mediaRef.current
    if (!section || !media) return

    // ── Mobile: simple wipe-in, no scroll interaction ──────────────
    if (width < 768) {
      gsap.from(media, {
        clipPath: 'inset(0 0 100% 0 round 8px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      })
      return
    }

    // ── Desktop ─────────────────────────────────────────────────────

    const heroCard = document.querySelector<HTMLElement>('[data-hero-card]')

    // Measure BEFORE any transforms applied
    const heroRect  = heroCard?.getBoundingClientRect()
    const mediaRect = media.getBoundingClientRect()

    // Scale: hero card width ÷ full media width
    const startScale = heroRect
      ? heroRect.width / mediaRect.width
      : 0.28

    // Translate: center-to-center offset between hero anchor and media
    const startX = heroRect
      ? (heroRect.left + heroRect.width  / 2) - (mediaRect.left + mediaRect.width  / 2)
      : -(mediaRect.width / 2) + 64 + 163

    const startY = heroRect
      ? (heroRect.top  + heroRect.height / 2) - (mediaRect.top  + mediaRect.height / 2)
      : -(mediaRect.height / 2) + 215

    // Live state — ScrollTrigger writes, rAF reads every frame
    const state = {
      scale:         startScale,
      translateX:    startX,
      translateY:    startY,
      targetMouseX:  0,   // raw -1 → +1 normalised mouse
      currentMouseX: 0,   // lerped mouse offset in px
    }

    // Apply immediately so card sits in hero position before any scroll
    media.style.transform = `
      translateY(${startY}px)
      translateX(${startX}px)
      scale(${startScale})
    `

    // ── Clip wipe-in on load ─────────────────────────────────────────
    gsap.fromTo(
      media,
      { clipPath: 'inset(0 0 100% 0 round 8px)' },
      {
        clipPath: 'inset(0 0 0% 0 round 8px)',
        duration: 1.2,
        delay: 0.4,
        ease: 'power3.out',
      }
    )

    // ── ScrollTrigger — writes scale + position into state ───────────
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'top 10%',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.scale      = gsap.utils.interpolate(startScale, 1, self.progress)
          state.translateX = gsap.utils.interpolate(startX,     0, self.progress)
          state.translateY = gsap.utils.interpolate(startY,     0, self.progress)
        },
      },
    })

    // ── Mouse: normalise to -1 → +1 ──────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      state.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouseMove)

    // ── rAF loop ──────────────────────────────────────────────────────
    let rafId: number

    const tick = () => {
      const margin = 64  // matches xl:px-16 padding

      // Current visible card dimensions
      const cardWidth  = mediaRect.width  * state.scale
      const cardHalfW  = cardWidth / 2

      // Current card center X in viewport (without mouse offset)
      const cardCenterX = mediaRect.left + mediaRect.width / 2 + state.translateX

      // How far the card center can move LEFT before card hits left padding
      // e.g. center can go as left as (margin + cardHalfW)
      const maxLeft  = -(cardCenterX - margin - cardHalfW)

      // How far the card center can move RIGHT before card hits right padding
      // e.g. center can go as right as (viewportWidth - margin - cardHalfW)
      const maxRight = (window.innerWidth - margin - cardHalfW) - cardCenterX

      // Map mouse -1→+1 directly to maxLeft→maxRight
      // So mouse far left = card flush to left padding
      // Mouse far right   = card flush to right padding
      const targetOffset = gsap.utils.mapRange(
        -1, 1,
        maxLeft, maxRight,
        state.targetMouseX
      )

      // Lerp for smooth physical feel
      state.currentMouseX = gsap.utils.interpolate(
        state.currentMouseX,
        targetOffset,
        0.08
      )

      media.style.transform = `
        translateY(${state.translateY}px)
        translateX(${state.translateX + state.currentMouseX}px)
        scale(${state.scale})
      `

      rafId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
    }

  }, [width])

  return (
    <section
      ref={sectionRef}
      className="showreel relative w-full flex items-center justify-center py-[100px] bg-bd-white"
    >
      <div className="w-full px-8 lg:px-12 xl:px-16">

        <div
          ref={mediaRef}
          className="relative w-full overflow-hidden will-change-transform rounded-[8px] h-[420px] sm:h-[520px] md:h-[650px] lg:h-[809px]"
        >
          {/*
            PLACEHOLDER — replace with:
            <video
              src="/media/showreel.mp4"
              autoPlay muted loop playsInline
              className="w-full h-full object-cover pointer-events-none"
            />
            File: /public/media/showreel.mp4  (1920 × 1080 recommended)
          */}
          <div className="w-full h-full bg-bd-placeholder flex items-center justify-center">
            <div className="text-center space-y-2">
              <span className="block text-white text-[13px] font-medium tracking-[0.15em] uppercase">
                Showreel
              </span>
              <span className="block text-white/40 text-[11px] tracking-[0.1em] uppercase">
                /public/media/showreel.mp4
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
