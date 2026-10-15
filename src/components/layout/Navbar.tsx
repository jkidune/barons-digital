'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV_LINKS } from '@/constants/navigation'

gsap.registerPlugin(ScrollTrigger)

// The three links shown inline in the bar; everything else lives behind MENU
const BAR_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const onHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const header = useRef<HTMLElement>(null)

  // Light text only while the transparent bar sits over the dark homepage hero
  const light = onHome && !solid && !menuOpen

  useGSAP(() => {
    if (!header.current) return
    gsap.from(header.current, { y: -36, opacity: 0, duration: 0.9, delay: 0.8, ease: 'power3.out' })
    let hidden = false
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setSolid(self.scroll() > 80)
        if (menuOpen) return
        const shouldHide = self.direction === 1 && self.scroll() > 240
        if (shouldHide === hidden) return
        hidden = shouldHide
        gsap.to(header.current, {
          yPercent: shouldHide ? -110 : 0,
          duration: 0.45,
          ease: shouldHide ? 'power2.inOut' : 'power3.out',
          overwrite: true,
        })
      },
    })
  }, { dependencies: [menuOpen] })

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen && header.current) gsap.set(header.current, { yPercent: 0 })
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMenuOpen(false))
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-0 z-[100] font-[family-name:var(--font-inter)] transition-colors duration-300 ${
        light ? 'text-white' : 'text-black'
      } ${solid && !menuOpen ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <div className="relative z-10 flex h-[calc(4.2rem+env(safe-area-inset-top))] items-center justify-between px-5 pt-[env(safe-area-inset-top)] md:px-[4vw]">
        <Link className={`text-[1.5rem] font-extrabold uppercase leading-none tracking-[-0.08em] ${focus}`} href="/">
          Barons
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-[8vw]">
            {BAR_LINKS.map((link) => (
              <li key={link.label}>
                <Link className={`p-[10px] text-sm font-medium uppercase tracking-[-0.05em] transition-opacity hover:opacity-50 ${focus}`} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          aria-controls="site-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className={`min-h-11 text-[1.5rem] font-bold uppercase leading-none tracking-[-0.06em] transition-opacity hover:opacity-60 md:text-[1.9rem] ${focus}`}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 h-[100dvh] overflow-y-auto overscroll-contain bg-black px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(6rem+env(safe-area-inset-top))] text-white transition duration-300 md:px-[4vw] ${
          menuOpen ? 'visible pointer-events-auto translate-y-0 opacity-100' : 'invisible pointer-events-none -translate-y-2 opacity-0'
        }`}
        id="site-menu"
      >
        <nav aria-label="Menu" className="flex min-h-full flex-col justify-between">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  className={`block py-2 text-[clamp(2.6rem,8vw,6.5rem)] font-medium leading-[1.1] tracking-[-0.04em] text-white/35 transition-colors hover:text-white ${focus}`}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-xs uppercase text-white/50">Dar es Salaam · Tanzania</p>
        </nav>
      </div>
    </header>
  )
}
