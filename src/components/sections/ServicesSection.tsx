'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { services } from '@/data/services'

gsap.registerPlugin(ScrollTrigger)

// ── Soft flower SVG — matches Figma 30×30 separator ───────────────
function FlowerIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M15 0C15 0 15 6.5 15 9C15 11.5 13 13.5 10.5 13.5C8 13.5 6 11.5 6 9C6 6.5 8 4.5 10.5 4.5C8 4.5 6 6.5 6 9C3.5 9 1.5 7 1.5 4.5C1.5 2 3.5 0 6 0C8.5 0 10.5 2 10.5 4.5C10.5 2 12.5 0 15 0Z"
        fill="none"
      />
      {/* Simplified asterisk flower */}
      <circle cx="15" cy="15" r="3.5" fill="#4F4F4F" />
      <rect x="13.5" y="2" width="3" height="11" rx="1.5" fill="#4F4F4F" />
      <rect x="13.5" y="17" width="3" height="11" rx="1.5" fill="#4F4F4F" />
      <rect x="2" y="13.5" width="11" height="3" rx="1.5" fill="#4F4F4F" />
      <rect x="17" y="13.5" width="11" height="3" rx="1.5" fill="#4F4F4F" />
      <rect
        x="5.5"
        y="5.5"
        width="3"
        height="11"
        rx="1.5"
        transform="rotate(-45 5.5 5.5)"
        fill="#4F4F4F"
      />
      <rect
        x="17"
        y="5.5"
        width="3"
        height="11"
        rx="1.5"
        transform="rotate(45 17 5.5)"
        fill="#4F4F4F"
      />
    </svg>
  )
}

// ── Single ticker word + separator unit ───────────────────────────
const tickerItems = [
  'Strategy-led',
  'Premium Execution',
  'Built in Tanzania',
  'Designed for Growth',
]

// ── Service row with open/close on click ──────────────────────────
function ServiceRow({ service }: { service: typeof services[0] }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useGSAP(() => {
    if (!contentRef.current || !imageRef.current) return

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
      gsap.to(imageRef.current, {
        height: '300px',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      })
      gsap.to(imageRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      })
    }
  }, [isOpen])

  return (
    <div
      ref={rowRef}
      className="flex flex-col w-full cursor-pointer"
      style={{
        background: '#272727',
        borderRadius: 10,
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* ── Top bar: number + title + plus ──────────────────────── */}
      <div
        className="flex flex-row items-center justify-between w-full p-4"
        style={{ gap: 16 }}
      >
        <div className="flex flex-row items-start gap-6">
          <span
            style={{
              fontWeight: 700,
              fontSize: 18,
              lineHeight: '22px',
              letterSpacing: '-0.01em',
              color: '#D3D3D3',
              paddingTop: 4,
            }}
          >
            {service.number}
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.2vw, 48px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: '#D3D3D3',
            }}
          >
            {service.title}
          </span>
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            flexShrink: 0,
            transition: 'transform 0.5s ease',
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: 32,
              color: '#D3D3D3',
              lineHeight: 1,
            }}
          >
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </div>

      {/* ── Expandable content: description + pills + image ───────── */}
      <div className="flex flex-col md:flex-row px-4 pb-4 gap-4">
        {/* Details */}
        <div
          ref={contentRef}
          className="w-full md:flex-1 overflow-hidden"
          style={{
            height: 0,
            opacity: 0,
          }}
        >
          <p
            className="w-full md:max-w-[760px] mb-5"
            style={{
              fontWeight: 400,
              fontSize: 19,
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#D3D3D3',
            }}
          >
            {service.description}
          </p>
          <div
            className="flex flex-row flex-wrap items-center"
            style={{ gap: 8 }}
          >
            {service.pills.map((pill) => (
              <span
                key={pill}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px 8px',
                  background: '#3D3D3D',
                  borderRadius: 4,
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: '15px',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  color: '#D3D3D3',
                  whiteSpace: 'nowrap',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div
          ref={imageRef}
          className="w-full md:w-[300px] overflow-hidden rounded-lg"
          style={{
            height: 0,
            opacity: 0,
            background: '#3D3D3D',
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={service.hoverImage}
              alt={service.title}
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // ── SERVICES title clip from bottom ───────────────────────────
    gsap.from('.services-title-word', {
      y: '105%',
      duration: 1.1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // ── Service rows stagger in ────────────────────────────────────
    gsap.from('.service-row-item', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rowsRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center py-[80px] md:py-[100px]"
      style={{ background: '#F8F5F5', isolation: 'isolate' }}
    >

      {/* ── Ticker strip — absolute at top:0 ────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden z-0"
        style={{ height: 39 }}
        aria-hidden="true"
      >
        <div className="flex items-center" style={{ width: 'max-content', height: 39 }}>
          {[0, 1, 2].map((copy) => (
            <div
              key={copy}
              className="flex items-center"
              style={{
                animation: 'ticker 22s linear infinite',
                gap: 24,
                paddingRight: 24,
                willChange: 'transform',
              }}
            >
              {tickerItems.map((item, i) => (
                <div key={i} className="flex items-center" style={{ gap: 24 }}>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 32,
                      lineHeight: '39px',
                      letterSpacing: '-0.01em',
                      textTransform: 'uppercase',
                      color: '#4F4F4F',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item}
                  </span>
                  <FlowerIcon />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main card container ──────────────────────────────────────── */}
      <div
        className="relative z-[1] w-full px-8 lg:px-12 xl:px-16"
        style={{ marginTop: 0 }}
      >
        <div
          className="w-full flex flex-col"
          style={{
            background: '#242424',
            borderRadius: 29,
            padding: 24,
            gap: 10,
          }}
        >

          {/* ── Display title ─────────────────────────────────────── */}
          <div
            ref={titleRef}
            className="flex flex-col sm:flex-row sm:justify-between items-start w-full gap-2 sm:gap-0"
          >
            <div className="overflow-hidden">
              <span
                className="services-title-word block"
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(56px, 11vw, 160px)',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                }}
              >
                SERVICES
              </span>
            </div>

            <div className="overflow-hidden self-end sm:self-auto">
              <span
                className="services-title-word block"
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(56px, 11vw, 160px)',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  color: '#F8F8F8',
                }}
              >
                &apos;26
              </span>
            </div>
          </div>

          {/* ── Service rows ──────────────────────────────────────── */}
          <div
            ref={rowsRef}
            className="flex flex-col w-full"
            style={{ gap: 10 }}
          >
            {services.map((service) => (
              <div key={service.number} className="service-row-item">
                <ServiceRow service={service} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  )
}
