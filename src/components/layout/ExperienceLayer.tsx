'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const loaderImages = [
  '/images/services/identity-design.jpg',
  '/images/services/website-mockup.jpg',
  '/images/services/content-production.jpg',
  '/images/services/brand-design.png',
  '/images/work/timeless-vows/359ff917848def04bb82818d27d9f535.jpg',
]

function Cursor() {
  const cursor = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const node = cursor.current
    if (!node) return
    let mx = 0, my = 0, x = 0, y = 0, frame = 0
    const move = (event: MouseEvent) => {
      mx = event.clientX; my = event.clientY; node.style.opacity = '1'
      const target = event.target as HTMLElement
      const intent = target.closest<HTMLElement>('[data-cursor]')?.dataset.cursor
      const state = target.matches('input, textarea, select') ? 'hidden' : intent || (target.closest('a, button, summary') ? 'grow' : 'default')
      node.dataset.state = state
      if (label.current) label.current.textContent = state === 'view' ? 'View' : state === 'read' ? 'Read' : ''
    }
    const leave = () => { node.style.opacity = '0' }
    const tick = () => {
      x += (mx - x) * 0.17; y += (my - y) * 0.17
      node.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    frame = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave); cancelAnimationFrame(frame) }
  }, [])

  return <div ref={cursor} className="bd-cursor" data-state="default" aria-hidden="true"><span ref={label} /></div>
}

function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('barons-loaded')) {
      const frame = requestAnimationFrame(() => setVisible(false))
      return () => cancelAnimationFrame(frame)
    }
  }, [])

  useGSAP(() => {
    if (!visible || !root.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { sessionStorage.setItem('barons-loaded', '1'); setVisible(false); return }
    const value = { current: 0 }
    const tl = gsap.timeline({ onComplete: () => { sessionStorage.setItem('barons-loaded', '1'); setVisible(false) } })
    tl.from('.bd-loader-word', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .to(value, { current: 100, duration: 2.2, ease: 'power2.inOut', onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(value.current)).padStart(3, '0') } }, 0)
      .from('.bd-loader-card', { scale: 0, opacity: 0, rotation: (i) => [-8, 6, -3, 9, -5][i], duration: 0.45, stagger: 0.22, ease: 'power3.out' }, 0.25)
      .to('.bd-loader-card', { yPercent: -180, stagger: 0.04, duration: 0.9, ease: 'power3.in' }, 2.55)
      .to(root.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, 2.65)
  }, { scope: root, dependencies: [visible] })

  if (!visible) return null
  return <div ref={root} className="fixed inset-0 z-[9998] overflow-hidden bg-black text-white" aria-hidden="true">
    <div className="absolute inset-0 flex items-center justify-center">
      {loaderImages.map((src, index) => <div className="bd-loader-card absolute aspect-[4/3] w-[42vw] max-w-sm overflow-hidden" key={src} style={{ zIndex: index }}><Image src={src} alt="" fill sizes="42vw" className="object-cover" /></div>)}
    </div>
    <span className="bd-loader-word absolute bottom-8 left-6 text-[clamp(3.5rem,9vw,8rem)] font-semibold uppercase leading-none tracking-[-0.07em] md:bottom-12 md:left-12">Barons</span>
    <span ref={count} className="absolute right-6 top-6 font-mono text-3xl tabular-nums md:right-10 md:top-10 md:text-5xl">000</span>
  </div>
}

export default function ExperienceLayer() {
  return <><Preloader /><Cursor /></>
}
