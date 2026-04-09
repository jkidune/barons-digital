'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'
import { gsap } from 'gsap'
import { joinWaitlist, type WaitlistState } from '@/app/actions/waitlist'

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1.5,6 4.5,9 10.5,3" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="1" width="10" height="18" rx="2" />
      <circle cx="10" cy="15.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <polyline points="2,4 10,11 18,4" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 18s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
      <circle cx="10" cy="7" r="2.5" />
    </svg>
  )
}

function IconPlus({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
      <span
        className="absolute h-px w-full bg-current"
        style={{ opacity: open ? 0 : 1, transition: 'opacity 0.22s ease' }}
      />
      <span
        className="absolute h-full w-px bg-current"
        style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.28s ease' }}
      />
    </span>
  )
}

// ── Contact info ───────────────────────────────────────────────────────────────

const contactDetails = [
  { Icon: IconPhone,  label: 'Phone',   value: '+255 719 906 205' },
  { Icon: IconMail,   label: 'Email',   value: 'hello@barons-digital.com' },
  { Icon: IconMapPin, label: 'Office',  value: 'Mbezi Beach, Kinondoni, Dar es Salaam' },
]

// ── FAQ data ───────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What services does Barons Digital offer?',
    a: 'We specialise in brand strategy, visual identity, and premium web experiences. From naming and positioning to full website design and development — we handle the full spectrum for businesses that refuse to settle for average.',
  },
  {
    q: 'When will Barons Digital officially launch?',
    a: 'We are launching in 2026. Join the waitlist to be among the first to know and get priority access when we open our doors.',
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

// ── FAQ accordion ──────────────────────────────────────────────────────────────

function FaqItem({
  q, a, isFirst, isLast,
}: {
  q: string; a: string; isFirst: boolean; isLast: boolean
}) {
  const [open, setOpen] = useState(false)

  const borderTopLeft    = isFirst ? '16px' : '0'
  const borderTopRight   = isFirst ? '16px' : '0'
  const borderBottomLeft  = isLast  ? '16px' : '0'
  const borderBottomRight = isLast  ? '16px' : '0'

  return (
    <div
      style={{
        backgroundColor: '#000000',
        borderTop:    '1px solid #1a1a1a',
        borderLeft:   '1px solid #1a1a1a',
        borderRight:  '1px solid #1a1a1a',
        borderBottom: isLast ? '1px solid #1a1a1a' : 'none',
        borderRadius: `${borderTopLeft} ${borderTopRight} ${borderBottomRight} ${borderBottomLeft}`,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
      >
        <span
          className="text-[15px] font-normal leading-snug transition-colors duration-200"
          style={{ color: open ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)' }}
        >
          {q}
        </span>
        <span className="text-white/50">
          <IconPlus open={open} />
        </span>
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '400px' : '0px',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.28s ease',
        }}
      >
        <p className="px-6 pb-6 text-[14px] font-normal leading-[1.85] text-white/50">
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
      className="inline-flex shrink-0 items-center justify-center rounded-[64px] bg-white px-6 py-3 text-[15px] font-medium text-black transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Joining…' : 'Join waitlist'}
    </button>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ComingSoonPage() {
  const [state, formAction] = useFormState(joinWaitlist, initial)
  const pageRef        = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const formShellRef   = useRef<HTMLDivElement>(null)
  const successRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroContentRef.current) return
      gsap.fromTo(
        Array.from(heroContentRef.current.children),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (state.status !== 'success') return
    gsap.to(formShellRef.current, {
      y: -10,
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        if (formShellRef.current) formShellRef.current.style.display = 'none'
        gsap.fromTo(
          successRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
      },
    })
  }, [state.status])

  return (
    <div
      ref={pageRef}
      style={{ fontFamily: 'var(--font-geist, "Helvetica Neue", sans-serif)', backgroundColor: '#000000' }}
      className="text-white"
    >

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
        <Image
          src="/logos/barons-white-logo.svg"
          alt="Barons Digital"
          width={140}
          height={38}
          priority
          className="h-auto w-[108px] sm:w-[124px]"
        />
        <div
          className="flex items-center gap-2 rounded-[64px] px-4 py-2 text-[12px] font-normal"
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            style={{ boxShadow: '0 0 6px rgba(74,222,128,0.6)' }}
          />
          Coming 2026
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 sm:py-48 lg:py-[250px]">

        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.28 }}
          src="/videos/hero-video.mp4"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,1) 100%)' }} />

        {/* Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center gap-6 px-6 text-center sm:px-10"
        >
          {/* Location badge */}
          <div
            className="flex items-center gap-2.5 rounded-[64px] px-4 py-2 text-[12px] font-normal"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <span className="h-1 w-1 rounded-full bg-white/30" />
            Dar es Salaam · Tanzania
          </div>

          {/* Heading — 64px / 500 */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              fontWeight: 500,
              lineHeight: '1.2',
              color: 'rgb(250, 250, 250)',
            }}
          >
            The agency
            <br />
            <em style={{ fontStyle: 'italic' }}>Tanzania</em>
            <br />
            deserves.
          </h1>

          {/* Paragraph — 18px / 400 */}
          <p
            style={{
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '25px',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '40ch',
            }}
          >
            Strategy, brand identity, and web experiences for businesses that refuse to be ordinary. Launching&nbsp;2026.
          </p>

          {/* Waitlist form */}
          <div ref={formShellRef} className="mt-2 flex flex-col items-center gap-3">
            <form
              action={formAction}
              className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center"
              noValidate
            >
              {/* Honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                maxLength={100}
                style={{
                  borderRadius: '64px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  padding: '12px 20px',
                  outline: 'none',
                  backdropFilter: 'blur(5px)',
                  width: '180px',
                }}
                className="placeholder:text-white/30 focus:border-white/25 sm:w-[180px]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                required
                maxLength={254}
                style={{
                  borderRadius: '64px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  padding: '12px 20px',
                  outline: 'none',
                  backdropFilter: 'blur(5px)',
                  minWidth: '220px',
                }}
                className="flex-1 placeholder:text-white/30 focus:border-white/25"
              />
              <SubmitButton />
            </form>
            {state.status === 'error' && (
              <p style={{ fontSize: '13px', color: 'rgba(248,113,113,0.8)' }}>{state.message}</p>
            )}
          </div>

          {/* Success */}
          <div ref={successRef} style={{ opacity: 0 }}>
            <div
              className="inline-flex items-center gap-3"
              style={{
                borderRadius: '64px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '12px 20px',
              }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-emerald-400"
                style={{ border: '1px solid rgba(74,222,128,0.3)', backgroundColor: 'rgba(74,222,128,0.1)' }}
              >
                <IconCheck />
              </span>
              <span style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.65)' }}>
                You are on the list — we will reach out first.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact info ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-16 pt-4 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">
          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: '1px solid #1a1a1a' }}
          >
            {contactDetails.map(({ Icon, label, value }, i) => (
              <div
                key={label}
                className="flex flex-col gap-3 p-6"
                style={{
                  borderTop: i > 0 ? '1px solid #1a1a1a' : 'none',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <Icon />
                </span>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgb(255,255,255)' }}>{label}</p>
                  <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-24 pt-16 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center">

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 500,
              lineHeight: '1.15',
              color: 'rgb(250, 250, 250)',
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            We&apos;ve got answers.
          </h2>

          <div className="flex w-full max-w-[700px] flex-col gap-0">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                isFirst={i === 0}
                isLast={i === faqs.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="px-6 pb-16 pt-12 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">

          {/* Main row */}
          <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">

            {/* Brand */}
            <div style={{ maxWidth: '240px' }}>
              <Image
                src="/logos/barons-white-logo.svg"
                alt="Barons Digital"
                width={130}
                height={36}
                className="h-auto w-[100px]"
                style={{ opacity: 0.75 }}
              />
              <p
                style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '1.75',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Strategy, brand identity, and web experiences for businesses that refuse to be ordinary.
              </p>
            </div>

            {/* Nav columns — no uppercase, no border, normal weight headers */}
            <div className="flex gap-12 sm:gap-20">

              <div className="flex flex-col gap-3">
                <p style={{ fontSize: '15px', fontWeight: 500, color: 'rgb(255,255,255)' }}>Services</p>
                {['Strategy', 'Brand Identity', 'Web Experiences'].map((item) => (
                  <span
                    key={item}
                    className="cursor-default transition-colors duration-200 hover:text-white"
                    style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <p style={{ fontSize: '15px', fontWeight: 500, color: 'rgb(255,255,255)' }}>Company</p>
                {['About', 'Work', 'Contact'].map((item) => (
                  <span
                    key={item}
                    className="cursor-default transition-colors duration-200 hover:text-white"
                    style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <p style={{ fontSize: '15px', fontWeight: 500, color: 'rgb(255,255,255)' }}>Connect</p>
                {['Instagram', 'LinkedIn', 'Twitter / X'].map((item) => (
                  <span
                    key={item}
                    className="cursor-default transition-colors duration-200 hover:text-white"
                    style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* Copyright — no border, large top margin */}
          <div
            className="mt-20 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>
              © {new Date().getFullYear()} Barons Digital. All rights reserved.
            </span>
          </div>

        </div>
      </footer>

    </div>
  )
}
