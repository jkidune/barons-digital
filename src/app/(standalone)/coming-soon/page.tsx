'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'
import { gsap } from 'gsap'
import { joinWaitlist, type WaitlistState } from '@/app/actions/waitlist'

// ── Thin SVG icons ─────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1.5,6 4.5,9 10.5,3" />
    </svg>
  )
}

function IconArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="6.5" x2="12" y2="6.5" />
      <polyline points="7.5,2 12,6.5 7.5,11" />
    </svg>
  )
}

function IconPlus({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <span
        className="absolute h-px w-full bg-current"
        style={{ opacity: open ? 0 : 1, transition: 'opacity 0.25s ease' }}
      />
      <span
        className="absolute h-full w-px bg-current"
        style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
      />
    </span>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="12" height="12" rx="3.2" />
      <circle cx="8" cy="8" r="3" />
      <circle cx="11.5" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <line x1="5.5" y1="7" x2="5.5" y2="11" />
      <line x1="5.5" y1="5" x2="5.5" y2="5.5" />
      <path d="M8 11V8.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V11" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  )
}

// ── FAQ data ───────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What services does Barons Digital offer?',
    a: 'We specialise in brand strategy, visual identity, and premium web experiences. From naming and positioning to full website design and development — we handle the full spectrum for businesses that refuse to settle for average.',
  },
  {
    q: 'When will Barons Digital officially launch?',
    a: 'We are launching in 2026. Join the waitlist above to be among the first to know and to get priority access when we open our doors.',
  },
  {
    q: 'What kinds of businesses do you work with?',
    a: 'We work with ambitious founders and established businesses across Tanzania and East Africa who are serious about standing out. If you demand excellence, we are the right fit.',
  },
  {
    q: 'How is Barons Digital different from other agencies?',
    a: 'We combine strategic thinking with premium craft. Every decision — from typography to copywriting to code — is intentional. We do not produce generic work; we build brands that earn attention and drive results.',
  },
  {
    q: 'Can I get in touch before the official launch?',
    a: 'Yes. Join the waitlist and we will reach out personally. For select projects, we may begin early conversations well before the public launch.',
  },
]

// ── FAQ accordion item ─────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-white/[0.07]">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span
          className="text-[14px] font-light leading-snug tracking-[-0.01em] transition-colors duration-200 sm:text-[15px]"
          style={{ color: open ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.48)' }}
        >
          {q}
        </span>
        <span style={{ color: open ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.18)' }}>
          <IconPlus open={open} />
        </span>
      </button>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: open ? '400px' : '0px',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.28s ease',
        }}
      >
        <p className="pb-6 text-[13px] font-light leading-[1.95] text-white/28 sm:text-[14px]">
          {a}
        </p>
      </div>
    </div>
  )
}

// ── Submit button ──────────────────────────────────────────────────────────────

const initial: WaitlistState = { status: 'idle', message: '' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2.5 border border-white/15 bg-white/[0.06] px-5 py-[13px] text-[11px] font-medium uppercase tracking-[0.18em] text-white/58 transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white/88 disabled:cursor-not-allowed disabled:opacity-40 sm:justify-start"
    >
      <span>{pending ? 'Joining…' : 'Join waitlist'}</span>
      {!pending && <IconArrowRight />}
    </button>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ComingSoonPage() {
  const [state, formAction] = useFormState(joinWaitlist, initial)
  const pageRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const formShellRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroContentRef.current) return
      const children = Array.from(heroContentRef.current.children)
      gsap.fromTo(
        children,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (state.status !== 'success') return
    gsap.to(formShellRef.current, {
      y: -10,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        if (formShellRef.current) formShellRef.current.style.display = 'none'
        gsap.fromTo(
          successRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
        )
      },
    })
  }, [state.status])

  return (
    <div
      ref={pageRef}
      style={{ fontFamily: 'var(--font-geist, "Helvetica Neue", sans-serif)' }}
      className="min-h-screen bg-[#080808] text-white"
    >

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
        <Image
          src="/logos/barons-white-logo.svg"
          alt="Barons Digital"
          width={140}
          height={38}
          priority
          className="h-auto w-[108px] opacity-85 sm:w-[124px]"
        />
        <div className="flex items-center gap-2 border border-white/[0.09] bg-white/[0.03] px-3 py-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            style={{ boxShadow: '0 0 7px rgba(74,222,128,0.55)' }}
          />
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/35">
            Coming 2026
          </span>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">

        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src="/videos/work/timeless-vows/preview.mp4"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/75 via-[#080808]/30 to-[#080808]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/60" />

        {/* Center content */}
        <div
          ref={heroContentRef}
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center sm:px-10"
        >
          {/* Location badge */}
          <div className="flex items-center gap-3 border border-white/[0.09] bg-white/[0.03] px-4 py-2">
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/30">
              Dar es Salaam · Tanzania
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-9 text-[clamp(3rem,9.5vw,7.5rem)] font-light leading-[0.9] tracking-[-0.04em] text-white">
            The agency
            <br />
            <em>Tanzania</em>
            <br />
            deserves.
          </h1>

          {/* Sub copy */}
          <p className="mt-7 max-w-[38ch] text-[14px] font-light leading-[1.9] text-white/38 sm:text-[15px]">
            Strategy, brand identity, and web experiences for businesses that refuse to be ordinary. Launching&nbsp;2026.
          </p>

          {/* Waitlist form */}
          <div ref={formShellRef} className="mt-9 w-full max-w-[500px]">
            <form action={formAction} className="flex flex-col gap-2 sm:flex-row" noValidate>
              {/* Honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                maxLength={100}
                className="w-full border border-white/[0.09] bg-white/[0.04] px-4 py-[13px] text-[13px] font-light text-white placeholder-white/18 outline-none transition-colors duration-200 focus:border-white/20 focus:bg-white/[0.06] sm:w-[155px]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                required
                maxLength={254}
                className="flex-1 border border-white/[0.09] bg-white/[0.04] px-4 py-[13px] text-[13px] font-light text-white placeholder-white/18 outline-none transition-colors duration-200 focus:border-white/20 focus:bg-white/[0.06]"
              />
              <SubmitButton />
            </form>
            {state.status === 'error' && (
              <p className="mt-3 text-[12px] font-light text-red-400/70">{state.message}</p>
            )}
          </div>

          {/* Success state */}
          <div ref={successRef} className="mt-9 opacity-0">
            <div className="inline-flex items-center gap-3 border border-white/[0.09] bg-white/[0.04] px-5 py-3.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-400">
                <IconCheck />
              </span>
              <span className="text-[13px] font-light text-white/50">
                You are on the list — we will reach out first.
              </span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-white/15">
          <span className="text-[9px] uppercase tracking-[0.24em]">Scroll</span>
          <span className="block h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#080808] px-6 pb-28 pt-24 sm:px-10 sm:pb-36 sm:pt-32">
        <div className="mx-auto max-w-2xl">

          <div className="mb-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/20">
              FAQ
            </span>
            <h2 className="mt-4 text-[clamp(1.7rem,4.5vw,2.7rem)] font-light leading-[1.1] tracking-[-0.03em] text-white">
              We have answers.
            </h2>
          </div>

          <div className="border-b border-white/[0.07]">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#080808] px-6 py-14 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">

          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">

            {/* Brand */}
            <div className="max-w-[220px]">
              <Image
                src="/logos/barons-white-logo.svg"
                alt="Barons Digital"
                width={130}
                height={36}
                className="h-auto w-[96px] opacity-55"
              />
              <p className="mt-4 text-[12px] font-light leading-[1.85] text-white/22">
                Strategy, brand identity, and web experiences for businesses that refuse to be ordinary.
              </p>
              <div className="mt-6 flex items-center gap-4 text-white/22">
                <span className="cursor-default transition-colors duration-200 hover:text-white/48">
                  <IconInstagram />
                </span>
                <span className="cursor-default transition-colors duration-200 hover:text-white/48">
                  <IconLinkedIn />
                </span>
                <span className="cursor-default transition-colors duration-200 hover:text-white/48">
                  <IconX />
                </span>
              </div>
            </div>

            {/* Nav columns */}
            <div className="flex gap-14 sm:gap-20">
              <div className="flex flex-col gap-3">
                <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.22em] text-white/18">
                  Services
                </span>
                {['Strategy', 'Brand Identity', 'Web Experiences'].map((item) => (
                  <span key={item} className="cursor-default text-[12px] font-light text-white/27 transition-colors duration-200 hover:text-white/48">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.22em] text-white/18">
                  Company
                </span>
                {['About', 'Work', 'Contact'].map((item) => (
                  <span key={item} className="cursor-default text-[12px] font-light text-white/27 transition-colors duration-200 hover:text-white/48">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col gap-2 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[11px] font-light text-white/18">
              © {new Date().getFullYear()} Barons Digital. All rights reserved.
            </span>
            <span className="text-[11px] font-light text-white/18">
              Dar es Salaam, Tanzania
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}
