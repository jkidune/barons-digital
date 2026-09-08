'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Journal', href: '/#journal' },
  { label: 'Products', href: '/#products' },
  { label: 'About', href: '/about' },
]

function ContactIcon() {
  return (
    <span className="bd-glass flex size-[1.35rem] items-center justify-center rounded-[0.35rem] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
      <svg aria-hidden="true" fill="none" height="11" viewBox="0 0 12 12" width="11">
        <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
    </span>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onEscape = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className={`mx-auto flex h-12 max-w-[105.5rem] items-center justify-between rounded-xl px-3 text-white transition-all duration-300 sm:px-4 ${scrolled || menuOpen ? 'bd-glass bg-black/70 shadow-[0_12px_40px_rgba(0,0,0,0.28)]' : 'border border-transparent bg-transparent'}`}>
        <div className="flex items-center gap-9">
          <Link className="text-[0.9375rem] font-bold leading-none tracking-[0.2em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="/" onClick={() => setMenuOpen(false)}>
            BARONS
          </Link>
          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex items-center gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link className="text-[0.9375rem] tracking-[-0.045em] text-white/60 transition-colors hover:text-white" href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Link className="group hidden items-center gap-3 text-[0.9375rem] tracking-[-0.045em] text-white/80 transition-colors hover:text-white lg:flex" href="/contact">
          Contact <ContactIcon />
        </Link>
        <button aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="flex min-h-11 min-w-11 items-center justify-end text-xs font-medium uppercase tracking-[0.1em] lg:hidden" onClick={() => setMenuOpen((open) => !open)} type="button">
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <div aria-hidden={!menuOpen} className={`bd-glass mx-auto mt-2 h-[calc(100svh-4.25rem)] max-w-[105.5rem] overflow-hidden rounded-2xl bg-black/90 px-5 py-8 text-white transition duration-300 lg:hidden ${menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'}`} id="mobile-navigation">
        <nav aria-label="Mobile navigation" className="flex h-full flex-col justify-between">
          <ul>
            {links.map((link, index) => (
              <li className="border-t border-white/10" key={link.label}>
                <Link className="flex min-h-16 items-center justify-between py-4 text-[clamp(2rem,10vw,3.75rem)] font-medium leading-none tracking-[-0.05em]" href={link.href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
                  <span>{link.label}</span><span className="text-[0.7rem] tracking-[0.08em] text-white/35">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-end justify-between border-t border-white/10 pt-4 text-xs uppercase tracking-[0.1em] text-white/45">
            <p>Dar es Salaam / Tanzania</p>
            <Link className="group flex items-center gap-3 text-white" href="/contact" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>Contact <ContactIcon /></Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
