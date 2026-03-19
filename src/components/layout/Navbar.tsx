'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS } from '@/constants/navigation'
import { cn } from '@/utils/cn'
import { gsap } from 'gsap'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const bodyOverflowRef = useRef<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      if (bodyOverflowRef.current === null) {
        bodyOverflowRef.current = document.body.style.overflow
      }
      document.body.style.overflow = 'hidden'
      return
    }

    if (bodyOverflowRef.current !== null) {
      document.body.style.overflow = bodyOverflowRef.current
      bodyOverflowRef.current = null
    }
  }, [menuOpen])

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.1,
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-black/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0 h-[64px] flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-bold tracking-[0.1em] uppercase text-bd-black"
        >
          Barons Digital
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] tracking-[-0.01em] text-bd-black hover:opacity-50 transition-opacity duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex text-[15px] tracking-[-0.01em] text-bd-black border border-bd-black px-4 py-2 rounded-full hover:bg-bd-black hover:text-white transition-all duration-300"
        >
          Start a Project
        </Link>

        <button
          type="button"
          className="md:hidden text-bd-black"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="0" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="0" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )}
        </button>

      </div>

      <div
        className={cn(
          'md:hidden fixed inset-0 transition-opacity duration-200',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ top: 64 }}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/20"
          onClick={() => setMenuOpen(false)}
        />

        <div
          id="mobile-nav"
          className={cn(
            'relative bg-white border-t border-black/5 px-6 py-6',
            'transition-transform duration-300 ease-out',
            menuOpen ? 'translate-y-0' : '-translate-y-2'
          )}
        >
          <ul className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[18px] tracking-[-0.01em] text-bd-black"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-6">
            <Link
              href="/contact"
              className="inline-flex text-[16px] tracking-[-0.01em] text-bd-black border border-bd-black px-4 py-2 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
