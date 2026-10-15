'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Shared scroll motion for interior pages. Renders nothing; it animates markup
 * that opts in via data attributes, so every page stays readable without JS.
 *
 *   data-reveal   fade/rise into place once (batched, staggered)
 *   data-mask     image frame: inner <img>/<video> settles from a slight zoom
 *   data-progress fixed bar scrubbed to the page's reading progress
 */
export default function PageMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px)' },
      (context) => {
        const { mobile } = context.conditions as { mobile: boolean }

        gsap.set('[data-reveal]', { y: mobile ? 24 : 44, opacity: 0 })
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            y: 0, opacity: 1, duration: mobile ? 0.7 : 0.95, ease: 'power3.out', stagger: 0.08, overwrite: true,
          }),
        })

        gsap.utils.toArray<HTMLElement>('[data-mask]').forEach((frame) => {
          const media = frame.querySelector('img, video')
          if (!media) return
          gsap.from(media, {
            scale: 1.2, opacity: 0, duration: 1.3, ease: 'power4.out', clearProps: 'transform,opacity',
            scrollTrigger: { trigger: frame, start: 'top 88%', once: true },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-progress]').forEach((bar) => {
          gsap.fromTo(bar, { scaleX: 0 }, {
            scaleX: 1, ease: 'none',
            scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
          })
        })
      },
    )

    // Reduced motion: no movement, just a quick fade
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('[data-reveal]', { opacity: 0 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, duration: 0.25, overwrite: true }),
      })
    })
  })

  return null
}
