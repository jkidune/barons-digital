'use client'

import { useActionState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { joinWaitlist, type WaitlistState } from '@/app/actions/waitlist'

const initial: WaitlistState = { status: 'idle', message: '' }

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex items-center gap-3 disabled:opacity-50 transition-opacity duration-200"
    >
      <span
        style={{
          fontFamily:    "'Helvetica Neue', sans-serif",
          fontWeight:    700,
          fontSize:      15,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color:         pending ? '#4F4F4F' : '#FFFFFF',
          transition:    'color 200ms',
          whiteSpace:    'nowrap',
        }}
      >
        {pending ? 'Joining…' : 'Join the waitlist'}
      </span>

      <span
        className={`transition-transform duration-300 ${pending ? '' : 'group-hover:translate-x-1'}`}
        style={{ color: pending ? '#4F4F4F' : '#FFFFFF', flexShrink: 0 }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M3 9H15M15 9L9 3M15 9L9 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}

export default function ComingSoonPage() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initial)

  const logoRef    = useRef<HTMLDivElement>(null)
  const tagRef     = useRef<HTMLDivElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const formRef    = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // ── Entrance animation on mount ─────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(logoRef.current,  { y: -20, opacity: 0, duration: 0.8 })
      .from(tagRef.current,   { y: 16,  opacity: 0, duration: 0.6 }, '-=0.4')
      .from(headRef.current,  { y: 30,  opacity: 0, duration: 0.9 }, '-=0.4')
      .from(subRef.current,   { y: 20,  opacity: 0, duration: 0.7 }, '-=0.5')
      .from(formRef.current,  { y: 20,  opacity: 0, duration: 0.7 }, '-=0.4')
  }, [])

  // ── Success swap animation ───────────────────────────────────────
  useEffect(() => {
    if (state.status !== 'success') return

    gsap.to(formRef.current, {
      y: -12, opacity: 0, duration: 0.4, ease: 'power3.in',
      onComplete: () => {
        if (formRef.current) formRef.current.style.display = 'none'
        gsap.fromTo(
          successRef.current,
          { y: 12, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
      },
    })
  }, [state.status])

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-between px-6 py-12 lg:py-16 overflow-hidden"
      style={{ background: '#111111' }}
    >

      {/* ── Grain texture overlay ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize:   '128px 128px',
        }}
      />

      {/* ── Gold accent line top ──────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{
          background: 'linear-gradient(90deg, transparent, #B7A073 40%, #B7A073 60%, transparent)',
        }}
      />

      {/* ── Logo ─────────────────────────────────────────────────── */}
      <div ref={logoRef} className="relative z-10 flex justify-center w-full">
        <Image
          src="/logos/barons-white-logo.svg"
          alt="Barons Digital"
          width={220}
          height={58}
          priority
          className="w-[160px] lg:w-[220px] h-auto"
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[680px] gap-8">

        {/* Coming soon tag */}
        <div ref={tagRef}>
          <span
            className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full"
            style={{
              background:    'rgba(183, 160, 115, 0.10)',
              border:        '1px solid rgba(183, 160, 115, 0.25)',
              fontFamily:    "'Helvetica Neue', sans-serif",
              fontWeight:    500,
              fontSize:      11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         '#B7A073',
            }}
          >
            <span
              className="w-[5px] h-[5px] rounded-full animate-pulse"
              style={{ background: '#B7A073', flexShrink: 0 }}
            />
            Coming Soon
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headRef}
          style={{
            fontFamily:    "'Helvetica Neue', sans-serif",
            fontWeight:    700,
            fontSize:      'clamp(38px, 7.5vw, 100px)',
            lineHeight:    0.93,
            letterSpacing: '-0.04em',
            color:         '#FFFFFF',
          }}
        >
          Something
          <br />
          <span style={{ color: '#B7A073' }}>legendary</span>
          <br />
          is loading.
        </h1>

        {/* Sub-headline */}
        <p
          ref={subRef}
          className="max-w-[480px]"
          style={{
            fontFamily:    "'Helvetica Neue', sans-serif",
            fontWeight:    400,
            fontSize:      'clamp(14px, 1.3vw, 17px)',
            lineHeight:    1.65,
            letterSpacing: '-0.01em',
            color:         '#696969',
          }}
        >
          We are building Tanzania&apos;s most strategic creative agency.
          Join the waitlist and be first to know when we launch.
        </p>

        {/* ── Waitlist form ───────────────────────────────────────── */}
        <form
          ref={formRef}
          action={formAction}
          className="w-full flex flex-col gap-3"
          noValidate
        >
          {/* Honeypot — hidden from humans, filled by bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: 'absolute',
              width:     1,
              height:    1,
              padding:   0,
              margin:   -1,
              overflow: 'hidden',
              clip:     'rect(0,0,0,0)',
              border:    0,
            }}
          />

          {/* Name + Company */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              maxLength={100}
              className="flex-1 outline-none"
              style={{
                fontFamily:    "'Helvetica Neue', sans-serif",
                background:    '#1A1A1A',
                border:        '1px solid #242424',
                borderRadius:  6,
                padding:       '14px 16px',
                fontWeight:    400,
                fontSize:      15,
                letterSpacing: '-0.01em',
                color:         '#FFFFFF',
                transition:    'border-color 200ms',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#B7A073')}
              onBlur={e  => (e.currentTarget.style.borderColor = '#242424')}
            />
            <input
              type="text"
              name="company"
              placeholder="Company (optional)"
              autoComplete="organization"
              maxLength={200}
              className="flex-1 outline-none"
              style={{
                fontFamily:    "'Helvetica Neue', sans-serif",
                background:    '#1A1A1A',
                border:        '1px solid #242424',
                borderRadius:  6,
                padding:       '14px 16px',
                fontWeight:    400,
                fontSize:      15,
                letterSpacing: '-0.01em',
                color:         '#FFFFFF',
                transition:    'border-color 200ms',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#B7A073')}
              onBlur={e  => (e.currentTarget.style.borderColor = '#242424')}
            />
          </div>

          {/* Email + Submit */}
          <div
            className="flex flex-col sm:flex-row items-stretch"
            style={{
              background:   '#1A1A1A',
              border:       '1px solid #242424',
              borderRadius: 6,
              overflow:     'hidden',
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="hello@yourbusiness.com"
              autoComplete="email"
              required
              maxLength={254}
              className="flex-1 outline-none bg-transparent"
              style={{
                fontFamily:    "'Helvetica Neue', sans-serif",
                padding:       '16px 20px',
                fontWeight:    400,
                fontSize:      15,
                letterSpacing: '-0.01em',
                color:         '#FFFFFF',
              }}
            />

            <div
              className="hidden sm:block self-stretch w-[1px] flex-shrink-0"
              style={{ background: '#242424' }}
            />

            <div className="flex items-center px-5 py-4 flex-shrink-0">
              <SubmitButton pending={pending} />
            </div>
          </div>

          {/* Error message */}
          {state.status === 'error' && (
            <p
              style={{
                fontFamily:    "'Helvetica Neue', sans-serif",
                fontWeight:    400,
                fontSize:      13,
                letterSpacing: '-0.01em',
                color:         '#FF6B6B',
                textAlign:     'left',
              }}
            >
              {state.message}
            </p>
          )}
        </form>

        {/* ── Success card (hidden until form succeeds) ─────────── */}
        <div ref={successRef} className="w-full" style={{ opacity: 0 }}>
          <div
            className="flex flex-col items-center gap-3 py-8 px-8 rounded-lg"
            style={{
              background: 'rgba(183, 160, 115, 0.07)',
              border:     '1px solid rgba(183, 160, 115, 0.18)',
            }}
          >
            <span
              style={{
                fontSize: 28,
                color:    '#B7A073',
              }}
            >
              ✦
            </span>
            <p
              style={{
                fontFamily:    "'Helvetica Neue', sans-serif",
                fontWeight:    600,
                fontSize:      18,
                letterSpacing: '-0.03em',
                color:         '#FFFFFF',
              }}
            >
              You&apos;re on the list.
            </p>
            <p
              style={{
                fontFamily:    "'Helvetica Neue', sans-serif",
                fontWeight:    400,
                fontSize:      14,
                letterSpacing: '-0.01em',
                color:         '#696969',
              }}
            >
              We will be in touch before anyone else.
            </p>
          </div>
        </div>

      </div>

      {/* ── Bottom taglines + copyright ───────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-3 w-full">
        <div className="flex flex-wrap justify-center items-center gap-3">
          {['Locally Made', 'World Class', 'Nothing Less'].map((tag, i) => (
            <span key={tag} className="flex items-center gap-3">
              <span
                style={{
                  fontFamily:    "'Helvetica Neue', sans-serif",
                  fontWeight:    700,
                  fontSize:      'clamp(9px, 1vw, 12px)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         '#2A2A2A',
                }}
              >
                {tag}
              </span>
              {i < 2 && (
                <span
                  style={{
                    display:      'inline-block',
                    width:        3,
                    height:       3,
                    borderRadius: '50%',
                    background:   '#B7A073',
                    flexShrink:   0,
                  }}
                />
              )}
            </span>
          ))}
        </div>

        <p
          style={{
            fontFamily:    "'Helvetica Neue', sans-serif",
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.04em',
            color:         '#2A2A2A',
          }}
        >
          © {new Date().getFullYear()} Barons Digital · Dar es Salaam, Tanzania
        </p>
      </div>

    </div>
  )
}
