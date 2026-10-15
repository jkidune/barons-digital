'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Orientation job: a black curtain rises over the old page, the route swaps
 * underneath, then the curtain lifts away to reveal the new one.
 * Entrance (cover) is a touch slower than the exit, per the motion rules.
 */
export default function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const curtain = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const pending = useRef<string | null>(null)
  const busy = useRef(false)
  const first = useRef(true)

  // Intercept internal link clicks
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return // same page / hash jumps stay native
      if (reduced.matches || busy.current || !curtain.current) return

      // Capture phase: take the click before next/link navigates on its own
      event.preventDefault()
      event.stopPropagation()
      busy.current = true
      pending.current = url.pathname
      const name = url.pathname === '/' ? 'Home' : url.pathname.split('/').filter(Boolean)[0]
      if (label.current) label.current.textContent = name.replace(/-/g, ' ')

      gsap.set(curtain.current, { yPercent: 100, display: 'flex' })
      gsap.timeline()
        .to(curtain.current, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' })
        .fromTo(label.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.25)
        .add(() => router.push(url.pathname + url.search + url.hash))
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  // Route has changed: reset scroll, lift the curtain
  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (!busy.current || !curtain.current) return
    window.scrollTo(0, 0)
    // Give the new page a frame to mount so its triggers measure correctly
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      gsap.timeline({ onComplete: () => { busy.current = false; pending.current = null; gsap.set(curtain.current, { display: 'none' }) } })
        .to(label.current, { y: -12, opacity: 0, duration: 0.2, ease: 'power2.in' })
        .to(curtain.current, { yPercent: -100, duration: 0.45, ease: 'power3.inOut' }, 0.1)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  // Safety net: never leave the curtain stuck if navigation fails
  useEffect(() => {
    const id = window.setInterval(() => {
      if (busy.current && pending.current && window.location.pathname === pending.current && curtain.current && gsap.getTweensOf(curtain.current).length === 0) {
        busy.current = false
        gsap.set(curtain.current, { display: 'none' })
      }
    }, 2000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9990] hidden items-center justify-center bg-black font-[family-name:var(--font-inter)] text-white" ref={curtain}>
      <span className="text-[clamp(2.5rem,8vw,7rem)] font-semibold capitalize tracking-[-0.04em]" ref={label} />
    </div>
  )
}
