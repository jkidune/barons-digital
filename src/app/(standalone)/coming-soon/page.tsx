'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'
import { gsap } from 'gsap'
import { joinWaitlist, type WaitlistState } from '@/app/actions/waitlist'

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type CharacterMood = 'idle' | 'curious' | 'watching' | 'celebrating' | 'sleepy' | 'thinking'
type Theme = 'light' | 'dark'

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER VIDEO SOURCES
// WebM keeps the coming soon page lightweight enough to deploy reliably.
// Browsers without support fall back to the built-in silhouette placeholder.
// Place files in /public/character/
// ─────────────────────────────────────────────────────────────────────────────

const VIDEOS: Record<CharacterMood, string> = {
  idle:        '/character/idle.webm',
  curious:     '/character/focused.webm',     // reuses focused
  watching:    '/character/focused.webm',
  celebrating: '/character/celebrating.webm',
  sleepy:      '/character/idle.webm',        // reuses idle
  thinking:    '/character/idle.webm',        // reuses idle
}

// ─────────────────────────────────────────────────────────────────────────────
// THEME TOKENS
// ─────────────────────────────────────────────────────────────────────────────

const THEMES = {
  light: {
    bg:          '#F5F2ED',
    surface:     '#FFFFFF',
    border:      '#E8E3DB',
    borderFocus: '#B7A073',
    text:        '#111111',
    subtext:     '#888880',
    footerText:  '#C8C4BB',
    tagBg:       'rgba(183,160,115,0.10)',
    tagBorder:   'rgba(183,160,115,0.25)',
    grain:       0.04,
  },
  dark: {
    bg:          '#111111',
    surface:     '#1A1A1A',
    border:      '#242424',
    borderFocus: '#B7A073',
    text:        '#FFFFFF',
    subtext:     '#696969',
    footerText:  '#2A2A2A',
    tagBg:       'rgba(183,160,115,0.10)',
    tagBorder:   'rgba(183,160,115,0.25)',
    grain:       0.03,
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER PEEK POSITIONS
// ─────────────────────────────────────────────────────────────────────────────

// How much of the character is hidden off-screen (% of character height).
// 0 = fully visible, 100 = fully hidden.
// Top character slides DOWN into view (positive Y).
// Bottom character slides UP into view (negative Y).
const PEEK: Record<CharacterMood, number> = {
  idle:        55,   // just face visible
  curious:     35,   // face + shoulders in
  watching:    25,   // upper body showing
  thinking:    45,   // half hidden
  celebrating: 5,    // almost fully in — arms/party visible
  sleepy:      70,   // barely peeking — nearly gone
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMIT BUTTON
// ─────────────────────────────────────────────────────────────────────────────

function SubmitButton({ theme }: { theme: Theme }) {
  const { pending } = useFormStatus()
  const t = THEMES[theme]
  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex items-center gap-3 disabled:opacity-50 transition-opacity duration-200"
    >
      <span
        style={{
          fontFamily:    "'Helvetica Neue', Arial, sans-serif",
          fontWeight:    700,
          fontSize:      15,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color:         pending ? t.subtext : t.text,
          transition:    'color 200ms',
          whiteSpace:    'nowrap',
        }}
      >
        {pending ? 'Joining…' : 'Join the waitlist'}
      </span>
      <span
        className={`transition-transform duration-300 ${pending ? '' : 'group-hover:translate-x-1'}`}
        style={{ color: pending ? t.subtext : t.text, flexShrink: 0 }}
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

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER VIDEO COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function CharacterVideo({
  mood,
  side,
  theme,
}: {
  mood: CharacterMood
  side: 'left' | 'right'
  theme: Theme
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  // Reload video when mood changes (new sources get picked up)
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.load()
    el.play().catch(() => { /* autoplay blocked — fine */ })
  }, [mood])

  return (
    <div
      style={{
        width:     260,
        height:    300,
        position:  'relative',
        // Mirror right character so both face inward toward the form
        transform: side === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
      }}
    >
      {/* ── Placeholder silhouette (shown until video loads) ─────── */}
      <div
        style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'flex-end',
          paddingBottom:  24,
          opacity:        ready ? 0 : 1,
          transition:     'opacity 0.4s',
          pointerEvents:  'none',
        }}
      >
        {/* Head */}
        <div style={{
          width:        90,
          height:       100,
          borderRadius: '50% 50% 44% 44%',
          background:   theme === 'dark'
            ? 'rgba(183,160,115,0.12)'
            : 'rgba(183,160,115,0.18)',
          animation:    'characterBreathe 3s ease-in-out infinite',
          position:     'relative',
          marginBottom: -8,
        }}>
          <div style={{
            position:  'absolute',
            top:       '42%',
            left:      '50%',
            transform: 'translate(-50%, -50%)',
            display:   'flex',
            gap:       18,
          }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                width:        8,
                height:       mood === 'sleepy' ? 3 : 8,
                borderRadius: '50%',
                background:   '#B7A073',
                opacity:      0.7,
                transition:   'height 0.3s',
              }} />
            ))}
          </div>
        </div>
        {/* Shoulders */}
        <div style={{
          width:        140,
          height:       60,
          borderRadius: '40% 40% 0 0',
          background:   theme === 'dark'
            ? 'rgba(183,160,115,0.08)'
            : 'rgba(183,160,115,0.12)',
          animation:    'characterBreathe 3s ease-in-out infinite 0.5s',
        }} />
        {/* Dev mood label — remove before go-live */}
        <span style={{
          position:      'absolute',
          bottom:        4,
          left:          '50%',
          transform:     'translateX(-50%)',
          fontSize:      9,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         '#B7A073',
          opacity:       0.5,
          whiteSpace:    'nowrap',
        }}>
          {mood}
        </span>
      </div>

      {/* ── Actual video ─────────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setReady(true)}
        onError={() => setReady(false)}
        style={{
          width:      '100%',
          height:     '100%',
          objectFit:  'contain',
          opacity:    ready ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      >
        <source src={VIDEOS[mood]} type="video/webm" />
      </video>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// THEME TOGGLE
// ─────────────────────────────────────────────────────────────────────────────

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        8,
        padding:    '6px 12px',
        borderRadius: 20,
        border:     `1px solid ${isDark ? '#2A2A2A' : '#E0DBD3'}`,
        background: isDark ? '#1A1A1A' : '#FFFFFF',
        cursor:     'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        width:        36,
        height:       20,
        borderRadius: 10,
        background:   isDark ? '#B7A073' : '#E8E3DB',
        position:     'relative',
        transition:   'background 0.3s',
        flexShrink:   0,
      }}>
        <div style={{
          position:       'absolute',
          top:            2,
          left:           isDark ? 18 : 2,
          width:          16,
          height:         16,
          borderRadius:   '50%',
          background:     isDark ? '#111' : '#FFF',
          boxShadow:      '0 1px 3px rgba(0,0,0,0.2)',
          transition:     'left 0.3s cubic-bezier(0.4,0,0.2,1)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       9,
        }}>
          {isDark ? '🌙' : '☀️'}
        </div>
      </div>
      <span style={{
        fontFamily:    "'Helvetica Neue', sans-serif",
        fontWeight:    500,
        fontSize:      11,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color:         isDark ? '#696969' : '#AAAAAA',
        transition:    'color 0.3s',
      }}>
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

const initial: WaitlistState = { status: 'idle', message: '' }

export default function ComingSoonPage() {
  const [state, formAction] = useFormState(joinWaitlist, initial)
  const [theme, setTheme]   = useState<Theme>('light')
  const [mood,  setMood]    = useState<CharacterMood>('idle')
  const displayMood         = state.status === 'success' ? 'celebrating' : mood

  const t = THEMES[theme]

  const logoRef      = useRef<HTMLDivElement>(null)
  const tagRef       = useRef<HTMLDivElement>(null)
  const headRef      = useRef<HTMLHeadingElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const formRef      = useRef<HTMLFormElement>(null)
  const successRef   = useRef<HTMLDivElement>(null)
  const topCharRef    = useRef<HTMLDivElement>(null)
  const bottomCharRef = useRef<HTMLDivElement>(null)

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const resetIdleTimer = useCallback(() => {
    clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      if (state.status !== 'success') setMood('idle')
    }, 8000)
  }, [state.status])

  const animatePeek = useCallback((newMood: CharacterMood) => {
    const peekPct = PEEK[newMood]
    // topCharRef slides DOWN from above  → positive Y hides it, negative brings it in
    gsap.to(topCharRef.current,    { y: `-${100 - peekPct}%`, duration: 0.7, ease: 'power3.out' })
    // bottomCharRef slides UP from below → negative Y hides it, positive brings it in
    gsap.to(bottomCharRef.current, { y: `${100 - peekPct}%`,  duration: 0.7, ease: 'power3.out', delay: 0.05 })
  }, [])

  useEffect(() => {
    animatePeek(displayMood)
  }, [displayMood, animatePeek])

  // Entrance animation
  useEffect(() => {
    // Start characters fully off-screen
    gsap.set(topCharRef.current,    { y: '-100%' })
    gsap.set(bottomCharRef.current, { y: '100%'  })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(logoRef.current, { y: -20, opacity: 0, duration: 0.8 })
      .from(tagRef.current,  { y: 16,  opacity: 0, duration: 0.6 }, '-=0.4')
      .from(headRef.current, { y: 30,  opacity: 0, duration: 0.9 }, '-=0.4')
      .from(subRef.current,  { y: 20,  opacity: 0, duration: 0.7 }, '-=0.5')
      .from(formRef.current, { y: 20,  opacity: 0, duration: 0.7 }, '-=0.4')
      // Characters peek in after content lands
      .to(topCharRef.current,    { y: `-${100 - PEEK.idle}%`, duration: 1.4, ease: 'elastic.out(1, 0.65)' }, '-=0.2')
      .to(bottomCharRef.current, { y: `${100 - PEEK.idle}%`,  duration: 1.4, ease: 'elastic.out(1, 0.65)' }, '<0.1')

    return () => { clearTimeout(idleTimerRef.current) }
  }, [])

  // Success state
  useEffect(() => {
    if (state.status !== 'success') return

    gsap.timeline()
      .to([topCharRef.current, bottomCharRef.current], { y: -24, duration: 0.3, ease: 'power2.out' })
      .to([topCharRef.current, bottomCharRef.current], { y: 0,   duration: 0.5, ease: 'bounce.out' })
      .to([topCharRef.current, bottomCharRef.current], { y: -12, duration: 0.2, ease: 'power2.out', delay: 0.2 })
      .to([topCharRef.current, bottomCharRef.current], { y: 0,   duration: 0.4, ease: 'bounce.out' })

    gsap.to(formRef.current, {
      y: -12, opacity: 0, duration: 0.4, ease: 'power3.in',
      onComplete: () => {
        if (formRef.current) formRef.current.style.display = 'none'
        gsap.fromTo(
          successRef.current,
          { y: 12, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.6, ease: 'power3.out' },
        )
      },
    })
  }, [state.status])

  const handleThemeToggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    setMood(next === 'dark' ? 'sleepy' : 'curious')
    setTimeout(() => setMood('idle'), 3500)
  }

  const handleFocus  = () => { setMood('curious');  resetIdleTimer() }
  const handleChange = () => { setMood('watching'); resetIdleTimer() }
  const handleBlur   = () => { resetIdleTimer() }

  const inputStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily:    "'Helvetica Neue', Arial, sans-serif",
    background:    t.surface,
    border:        `1px solid ${t.border}`,
    borderRadius:  6,
    padding:       '14px 16px',
    fontWeight:    400,
    fontSize:      15,
    letterSpacing: '-0.01em',
    color:         t.text,
    outline:       'none',
    transition:    'border-color 200ms, background 0.4s, color 0.4s',
    ...extra,
  })

  return (
    <>
      <style>{`
        @keyframes characterBreathe {
          0%, 100% { transform: scale(1) translateY(0);      opacity: 0.7; }
          50%      { transform: scale(1.03) translateY(-3px); opacity: 1;   }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1;   }
          50%      { opacity: 0.4; }
        }
      `}</style>

      <div
        className="relative min-h-screen w-full flex flex-col items-center justify-between px-6 py-12 lg:py-16 overflow-hidden"
        style={{ background: t.bg, transition: 'background 0.5s ease' }}
      >

        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            opacity: t.grain,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize:   '128px 128px',
          }}
        />

        {/* Gold accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background: 'linear-gradient(90deg, transparent, #B7A073 35%, #B7A073 65%, transparent)' }}
        />

        {/* TOP character — hangs upside down from top edge, left side */}
        <div
          aria-hidden="true"
          className="hidden xl:block absolute z-20"
          style={{ top: 0, left: '12%', pointerEvents: 'none' }}
        >
          <div ref={topCharRef} style={{ willChange: 'transform', transform: 'scaleY(-1)' }}>
            <CharacterVideo mood={displayMood} side="left" theme={theme} />
          </div>
        </div>

        {/* BOTTOM character — peeks up from bottom edge, right side */}
        <div
          aria-hidden="true"
          className="hidden xl:block absolute z-20"
          style={{ bottom: 0, right: '12%', pointerEvents: 'none' }}
        >
          <div ref={bottomCharRef} style={{ willChange: 'transform' }}>
            <CharacterVideo mood={displayMood} side="right" theme={theme} />
          </div>
        </div>

        {/* Theme toggle */}
        <div className="absolute top-6 right-6 z-30">
          <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        </div>

        {/* Logo */}
        <div ref={logoRef} className="relative z-10 flex justify-center w-full">
          <Image
            src="/logos/barons-white-logo.svg"
            alt="Barons Digital"
            width={220}
            height={58}
            priority
            className="w-[160px] lg:w-[220px] h-auto"
            style={{
              filter:     theme === 'light' ? 'brightness(0)' : 'none',
              transition: 'filter 0.4s ease',
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[640px] gap-8">

          {/* Tag */}
          <div ref={tagRef}>
            <span
              className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full"
              style={{
                background:    t.tagBg,
                border:        `1px solid ${t.tagBorder}`,
                fontFamily:    "'Helvetica Neue', sans-serif",
                fontWeight:    500,
                fontSize:      11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#B7A073',
                transition:    'background 0.4s, border-color 0.4s',
              }}
            >
              <span style={{
                width:        5,
                height:       5,
                borderRadius: '50%',
                background:   '#B7A073',
                flexShrink:   0,
                animation:    'pulseDot 2s ease-in-out infinite',
              }} />
              Coming Soon
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headRef}
            style={{
              fontFamily:    "'Helvetica Neue', Arial, sans-serif",
              fontWeight:    700,
              fontSize:      'clamp(38px, 7.5vw, 96px)',
              lineHeight:    0.93,
              letterSpacing: '-0.04em',
              color:         t.text,
              transition:    'color 0.4s ease',
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
            className="max-w-[460px]"
            style={{
              fontFamily:    "'Helvetica Neue', Arial, sans-serif",
              fontWeight:    400,
              fontSize:      'clamp(14px, 1.3vw, 17px)',
              lineHeight:    1.65,
              letterSpacing: '-0.01em',
              color:         t.subtext,
              transition:    'color 0.4s ease',
            }}
          >
            We are building Tanzania&apos;s most strategic creative agency.
            Join the waitlist and be first to know when we launch.
          </p>

          {/* Waitlist form */}
          <form ref={formRef} action={formAction} className="w-full flex flex-col gap-3" noValidate>
            {/* Honeypot */}
            <input
              type="text" name="website" tabIndex={-1}
              autoComplete="off" aria-hidden="true"
              style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}
            />

            {/* Name + Company */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text" name="name" placeholder="Your name"
                autoComplete="name" maxLength={100} className="flex-1"
                style={inputStyle()}
                onFocus={e => { e.currentTarget.style.borderColor = t.borderFocus; handleFocus() }}
                onBlur={e  => { e.currentTarget.style.borderColor = t.border;      handleBlur()  }}
                onChange={handleChange}
              />
              <input
                type="text" name="company" placeholder="Company (optional)"
                autoComplete="organization" maxLength={200} className="flex-1"
                style={inputStyle()}
                onFocus={e => { e.currentTarget.style.borderColor = t.borderFocus; handleFocus() }}
                onBlur={e  => { e.currentTarget.style.borderColor = t.border;      handleBlur()  }}
                onChange={handleChange}
              />
            </div>

            {/* Email + Submit */}
            <div
              className="flex flex-col sm:flex-row items-stretch"
              style={{
                background:   t.surface,
                border:       `1px solid ${t.border}`,
                borderRadius: 6,
                overflow:     'hidden',
                transition:   'background 0.4s, border-color 0.4s',
              }}
            >
              <input
                type="email" name="email"
                placeholder="hello@yourbusiness.com"
                autoComplete="email" required maxLength={254}
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontFamily:    "'Helvetica Neue', Arial, sans-serif",
                  padding:       '16px 20px',
                  fontWeight:    400,
                  fontSize:      15,
                  letterSpacing: '-0.01em',
                  color:         t.text,
                  transition:    'color 0.4s',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <div className="hidden sm:block self-stretch w-[1px] flex-shrink-0" style={{ background: t.border, transition: 'background 0.4s' }} />
              <div className="flex items-center px-5 py-4 flex-shrink-0">
                <SubmitButton theme={theme} />
              </div>
            </div>

            {/* Error */}
            {state.status === 'error' && (
              <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: '-0.01em', color: '#FF6B6B', textAlign: 'left' }}>
                {state.message}
              </p>
            )}
          </form>

          {/* Success card */}
          <div ref={successRef} className="w-full" style={{ opacity: 0 }}>
            <div
              className="flex flex-col items-center gap-3 py-8 px-8 rounded-lg"
              style={{ background: 'rgba(183,160,115,0.07)', border: '1px solid rgba(183,160,115,0.18)' }}
            >
              <span style={{ fontSize: 28, color: '#B7A073' }}>✦</span>
              <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 18, letterSpacing: '-0.03em', color: t.text, transition: 'color 0.4s' }}>
                You&apos;re on the list.
              </p>
              <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, fontSize: 14, letterSpacing: '-0.01em', color: t.subtext, transition: 'color 0.4s' }}>
                We will be in touch before anyone else.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="relative z-10 flex flex-col items-center gap-3 w-full">
          <div className="flex flex-wrap justify-center items-center gap-3">
            {['Locally Made', 'World Class', 'Nothing Less'].map((tag, i) => (
              <span key={tag} className="flex items-center gap-3">
                <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 'clamp(9px, 1vw, 12px)', letterSpacing: '0.1em', textTransform: 'uppercase', color: t.footerText, transition: 'color 0.4s' }}>
                  {tag}
                </span>
                {i < 2 && <span style={{ display: 'inline-block', width: 3, height: 3, borderRadius: '50%', background: '#B7A073', flexShrink: 0 }} />}
              </span>
            ))}
          </div>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.04em', color: t.footerText, transition: 'color 0.4s' }}>
            © {new Date().getFullYear()} Barons Digital · Dar es Salaam, Tanzania
          </p>
        </div>

      </div>
    </>
  )
}
