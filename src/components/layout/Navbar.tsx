'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/constants/navigation'

// The three links shown inline in the bar; everything else lives behind MENU.
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

  // Always keep the site navigation on screen. Previously a GSAP
  // ScrollTrigger translated the persistent header above the viewport on
  // downward scrolling; its animation state survived Next.js route changes
  // and sometimes left the menu unreachable. Only change its background
  // here, never its position, transform or opacity.
  useEffect(() => {
    const updateBackground = () => setSolid(window.scrollY > 80)
    updateBackground()
    window.addEventListener('scroll', updateBackground, { passive: true })
    return () => window.removeEventListener('scroll', updateBackground)
  }, [pathname])

  useEffect(() => {
    // Support Escape and prevent scrolling behind the full-screen menu.
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    // Navbar persists in the shared layout, so dismiss the overlay even
    // after routes change through non-menu links or browser navigation.
    const frame = requestAnimationFrame(() => setMenuOpen(false))
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
  // Non-home pages always get a readable white background. On the homepage
  // the bar can be transparent only while over the dark hero at the top.
  const headerColors = menuOpen
    ? 'bg-black text-white'
    : onHome && !solid
      ? 'bg-transparent text-white'
      : 'bg-white/95 text-black backdrop-blur-md'
  const darkSurface = menuOpen || (onHome && !solid)
  // Critical styles are explicit as a fallback across transient Next.js route
  // stylesheet changes: a fixed header must NEVER participate in page scroll.
  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    color: darkSurface ? '#ffffff' : '#000000',
    backgroundColor: menuOpen ? '#000000' : onHome && !solid ? 'transparent' : 'rgba(255,255,255,0.95)',
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] font-[family-name:var(--font-inter)] ${headerColors}`}
      data-site-header
      style={headerStyle}
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
