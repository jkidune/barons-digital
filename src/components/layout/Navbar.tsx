'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS } from '@/constants/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/15 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1568px] items-center justify-between px-5 md:px-8 lg:px-16">
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
        className={`fixed inset-x-0 top-16 h-[calc(100svh-4rem)] bg-black px-5 py-8 text-white transition duration-300 md:hidden ${
          menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
        id="mobile-navigation"
      >
        <nav aria-label="Mobile navigation" className="flex h-full flex-col justify-between">
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li className="border-t border-white/35" key={link.label}>
                <Link
                  className="flex min-h-16 items-center justify-between py-4 text-[clamp(2rem,10vw,3.75rem)] font-medium leading-none tracking-[-0.04em]"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span>{link.label}</span>
                  <span className="text-[0.7rem] tracking-[0.08em] text-white/45">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="border-t border-white/35 pt-4 text-[0.75rem] uppercase tracking-[0.1em] text-white/50">
            Dar es Salaam / Tanzania
          </p>
        </nav>
      </div>
    </header>
  )
}
