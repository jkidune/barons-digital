'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV_LINKS } from '@/constants/navigation'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!header.current) return
    gsap.from(header.current, { y: -36, opacity: 0, duration: 0.9, delay: 0.8, ease: 'power3.out' })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (menuOpen) return
        gsap.to(header.current, {
          yPercent: self.direction === 1 && self.scroll() > 240 ? -110 : 0,
          duration: 0.45,
          ease: self.direction === 1 ? 'power2.inOut' : 'power3.out',
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

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-[100] bg-[#f7f4ee] text-black shadow-[0_1px_0_rgba(0,0,0,.08)]">
      <div className="relative z-10 mx-auto flex h-[calc(4rem+env(safe-area-inset-top))] max-w-[1568px] items-center justify-between px-5 pt-[env(safe-area-inset-top)] md:px-8 lg:px-16">
        <Link
          className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          href="/"
        >
          Barons Digital
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  className="text-[0.8rem] font-medium transition-opacity duration-200 hover:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          className="hidden min-h-11 items-center border-b border-black text-[0.8rem] font-medium transition-opacity hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:inline-flex"
          href="/contact"
        >
          Start a project
        </Link>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex min-h-11 min-w-11 items-center justify-end text-[0.75rem] font-medium uppercase tracking-[0.08em] md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 h-[100dvh] overflow-y-auto overscroll-contain bg-[#f7f4ee] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(5.5rem+env(safe-area-inset-top))] text-black transition duration-300 md:hidden ${
          menuOpen ? 'visible pointer-events-auto translate-y-0 opacity-100' : 'invisible pointer-events-none -translate-y-2 opacity-0'
        }`}
        id="mobile-navigation"
      >
        <nav aria-label="Mobile navigation" className="flex h-full flex-col justify-between">
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li className="border-t border-black/15" key={link.label}>
                <Link
                  className="flex min-h-16 items-center justify-between py-4 text-[clamp(1.9rem,9vw,3.25rem)] font-medium leading-none tracking-[-0.04em]"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span>{link.label}</span>
                  <span className="text-[0.7rem] tracking-[0.08em] text-black/40">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="border-t border-black/15 pt-4 text-[0.75rem] uppercase tracking-[0.1em] text-black/50">
            Dar es Salaam / Tanzania
          </p>
        </nav>
      </div>
    </header>
  )
}
