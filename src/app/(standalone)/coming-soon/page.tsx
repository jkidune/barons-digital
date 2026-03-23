'use client'

import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'
import { gsap } from 'gsap'
import { joinWaitlist, type WaitlistState } from '@/app/actions/waitlist'

const initial: WaitlistState = { status: 'idle', message: '' }

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[58px] items-center justify-center bg-[#111111] px-6 text-[12px] font-black uppercase tracking-[0.18em] text-[#f7efe4] transition-transform duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
    >
      {pending ? 'Joining' : 'Join waitlist'}
    </button>
  )
}

export default function ComingSoonPage() {
  const [state, formAction] = useFormState(joinWaitlist, initial)

  const pageRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const formShellRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const stampRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([leftCardRef.current, rightCardRef.current], { opacity: 0 })
      gsap.set(stampRef.current, { scale: 0.8, opacity: 0 })

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(pageRef.current, { opacity: 0, duration: 0.4 })
        .from(eyebrowRef.current, { y: 24, opacity: 0, duration: 0.7 }, '-=0.1')
        .from(headingRef.current, { y: 40, opacity: 0, duration: 0.9 }, '-=0.35')
        .from(bodyRef.current, { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
        .from(formShellRef.current, { y: 28, opacity: 0, duration: 0.8 }, '-=0.35')
        .fromTo(
          leftCardRef.current,
          { x: -80, y: 36, rotate: -10, opacity: 0 },
          { x: 0, y: 0, rotate: -6, opacity: 1, duration: 1.1 },
          '-=0.65'
        )
        .fromTo(
          rightCardRef.current,
          { x: 80, y: -30, rotate: 10, opacity: 0 },
          { x: 0, y: 0, rotate: 8, opacity: 1, duration: 1.1 },
          '-=0.95'
        )
        .to(stampRef.current, { scale: 1, opacity: 1, duration: 0.55 }, '-=0.55')

      gsap.to(leftCardRef.current, {
        y: -18,
        x: 10,
        rotate: -9,
        duration: 4.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(rightCardRef.current, {
        y: 20,
        x: -12,
        rotate: 11,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (state.status !== 'success') return

    gsap.to(formShellRef.current, {
      y: -16,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => {
        if (formShellRef.current) formShellRef.current.style.display = 'none'
        gsap.fromTo(
          successRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
      },
    })
  }, [state.status])

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[#ff5a2a] text-[#111111]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(17,17,17,0.18),_transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,transparent_0,transparent_calc(25%-1px),rgba(17,17,17,0.35)_calc(25%-1px),rgba(17,17,17,0.35)_25%,transparent_25%,transparent_calc(50%-1px),rgba(17,17,17,0.35)_calc(50%-1px),rgba(17,17,17,0.35)_50%,transparent_50%,transparent_calc(75%-1px),rgba(17,17,17,0.35)_calc(75%-1px),rgba(17,17,17,0.35)_75%,transparent_75%),linear-gradient(to_bottom,transparent_0,transparent_calc(25%-1px),rgba(17,17,17,0.35)_calc(25%-1px),rgba(17,17,17,0.35)_25%,transparent_25%,transparent_calc(50%-1px),rgba(17,17,17,0.35)_calc(50%-1px),rgba(17,17,17,0.35)_50%,transparent_50%,transparent_calc(75%-1px),rgba(17,17,17,0.35)_calc(75%-1px),rgba(17,17,17,0.35)_75%,transparent_75%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 py-5 sm:px-8 lg:px-10 lg:py-8">
        <div className="flex items-start justify-between gap-4 border-b border-black/15 pb-4 text-[10px] font-black uppercase tracking-[0.16em] sm:text-[11px]">
          <span>Barons Digital</span>
          <span className="text-right">Dar es Salaam / Strategic creative agency / Coming soon</span>
        </div>

        <div className="grid flex-1 gap-10 py-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center lg:gap-6">
          <section className="relative flex flex-col justify-center">
            <div
              ref={eyebrowRef}
              className="mb-6 inline-flex w-fit items-center gap-3 border border-black/15 bg-[#f7efe4] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] sm:text-[11px]"
            >
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff5a2a]" />
              Building brands that cannot be ignored
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-[11px] font-black uppercase tracking-[0.16em] text-black/70 sm:text-[12px]">
              <span>Strategy</span>
              <span>Brand identity</span>
              <span>Web experiences</span>
            </div>

            <h1
              ref={headingRef}
              className="max-w-[9ch] text-[clamp(4.2rem,15vw,10.5rem)] font-black uppercase leading-[0.86] tracking-[-0.08em]"
            >
              Brands
              <br />
              with
              <br />
              bite.
            </h1>

            <p
              ref={bodyRef}
              className="mt-6 max-w-[560px] text-[15px] leading-7 text-black/72 sm:text-[17px]"
            >
              We are shaping a louder, sharper Barons Digital. Join the waitlist to see the
              new agency world first when we go live.
            </p>

            <div
              ref={formShellRef}
              className="mt-8 max-w-[720px] border border-black/15 bg-[#f7efe4] p-4 shadow-[10px_10px_0_rgba(17,17,17,0.14)] sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-black/10 pb-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-black/55">
                    First access
                  </p>
                  <p className="mt-1 text-[26px] font-black uppercase leading-none tracking-[-0.06em] sm:text-[32px]">
                    Join the movement
                  </p>
                </div>
                <Image
                  src="/logos/barons-blue-icon.svg"
                  alt="Barons icon"
                  width={44}
                  height={44}
                  className="h-11 w-11"
                />
              </div>

              <form action={formAction} className="flex flex-col gap-3" noValidate>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={100}
                    className="min-h-[58px] border border-black/15 bg-white px-4 text-[15px] outline-none transition-colors focus:border-black"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    autoComplete="organization"
                    maxLength={200}
                    className="min-h-[58px] border border-black/15 bg-white px-4 text-[15px] outline-none transition-colors focus:border-black"
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                  <input
                    type="email"
                    name="email"
                    placeholder="hello@yourbusiness.com"
                    autoComplete="email"
                    required
                    maxLength={254}
                    className="min-h-[58px] border border-black/15 bg-white px-4 text-[15px] outline-none transition-colors focus:border-black"
                  />
                  <SubmitButton />
                </div>

                {state.status === 'error' && (
                  <p className="text-[13px] font-medium text-[#b42318]">{state.message}</p>
                )}
              </form>
            </div>

            <div ref={successRef} className="mt-8 max-w-[540px] opacity-0">
              <div className="border border-black bg-[#111111] px-6 py-6 text-[#f7efe4] shadow-[10px_10px_0_rgba(247,239,228,0.22)]">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff8f6e]">
                  You are in
                </p>
                <p className="mt-2 text-[34px] font-black uppercase leading-none tracking-[-0.06em]">
                  We will reach out first.
                </p>
                <p className="mt-3 max-w-[34ch] text-[14px] leading-6 text-[#f7efe4]/75">
                  Thank you for joining the Barons Digital waitlist. You will hear from us
                  before the public launch.
                </p>
              </div>
            </div>
          </section>

          <section className="relative flex min-h-[460px] items-center justify-center lg:min-h-[720px]">
            <div className="pointer-events-none absolute left-[4%] top-[6%] text-[clamp(4.2rem,13vw,9rem)] font-black uppercase leading-[0.85] tracking-[-0.08em] text-[#f7efe4]/28">
              Make
              <br />
              them
              <br />
              look
            </div>

            <div
              ref={leftCardRef}
              className="absolute left-0 top-[12%] w-[58%] max-w-[360px] border-[10px] border-[#f7efe4] bg-[#f7efe4] shadow-[16px_18px_0_rgba(17,17,17,0.16)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <Image
                  src="/images/work/timeless-vows/359ff917848def04bb82818d27d9f535.jpg"
                  alt="Barons creative campaign preview"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="border-t border-black/10 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/55">
                  Preview 01
                </p>
                <p className="mt-1 text-[24px] font-black uppercase leading-none tracking-[-0.05em]">
                  New mood. New force.
                </p>
              </div>
            </div>

            <div
              ref={rightCardRef}
              className="absolute bottom-[7%] right-[2%] w-[54%] max-w-[330px] border-[8px] border-[#111111] bg-[#111111] text-[#f7efe4] shadow-[18px_18px_0_rgba(247,239,228,0.2)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/work/timeless-vows/4b78a00c1f111b0799b26265e539ecd6.webp"
                  alt="Barons second campaign preview"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff8f6e]">
                        Preview 02
                      </p>
                      <p className="mt-2 max-w-[9ch] text-[30px] font-black uppercase leading-[0.9] tracking-[-0.06em]">
                        Built to be seen.
                      </p>
                    </div>
                    <Image
                      src="/logos/barons-white-icon.svg"
                      alt="Barons mark"
                      width={42}
                      height={42}
                      className="h-10 w-10"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 bg-[#111111] px-4 py-4">
                <Image
                  src="/logos/barons-white-logo.svg"
                  alt="Barons Digital"
                  width={180}
                  height={48}
                  className="h-auto w-[150px]"
                />
                <p className="mt-3 text-[13px] leading-6 text-white/72">
                  A sharper identity, premium websites, and strategy that does not whisper.
                </p>
              </div>
            </div>

            <div
              ref={stampRef}
              className="absolute bottom-[20%] left-[16%] rotate-[-12deg] border border-black bg-[#f7efe4] px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] shadow-[8px_8px_0_rgba(17,17,17,0.14)]"
            >
              Coming soon 2026
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/15 pt-4 text-[10px] font-black uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-black/68">
            <span>Locally made</span>
            <span>World class</span>
            <span>Nothing less</span>
          </div>
          <p className="text-black/68">
            Copyright {new Date().getFullYear()} Barons Digital
          </p>
        </div>
      </div>
    </div>
  )
}
