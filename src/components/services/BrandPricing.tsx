'use client'

import Link from 'next/link'
import { useState } from 'react'

const packages = [
  {
    name: 'Starter',
    fullName: 'Starter Pack',
    price: '150,000',
    description: 'A professional foundation for a new brand.',
    features: [
      'Logo design — primary and alternate',
      'Brand colour palette and typography guide',
      'Social profile, highlight covers and bio setup',
      '3 editable branded templates',
      '1 promotional flyer design',
    ],
  },
  {
    name: 'Growth',
    fullName: 'Growth Pack',
    price: '250,000',
    description: 'A consistent, useful system for a growing brand.',
    popular: true,
    features: [
      'Everything in the Starter Pack',
      'Extended guidelines, patterns and mockups',
      '6 editable social media templates',
      '4 promotional flyer designs',
      'Content strategy starter kit',
      'Instagram direction for a 9-post grid',
    ],
  },
  {
    name: 'Premium',
    fullName: 'Premium Pack',
    price: '450,000',
    description: 'A complete presence built for visibility and consistency.',
    features: [
      'Everything in the Growth Pack',
      'Advanced guidelines for ads, packaging and merchandise',
      '10 editable social media templates',
      '7 promotional flyer designs',
      '30-second motion graphic promotional video',
      'One-month Instagram plan with designs and captions',
    ],
  },
]

const singleServices = [
  ['Logo design', 'TZS 50,000'],
  ['Flyer / poster design', 'TZS 30,000'],
  ['Social media template', 'TZS 15,000 / design'],
  ['Business card design', 'TZS 20,000'],
  ['Mini brand style guide', 'TZS 80,000'],
  ['Full brand identity', 'TZS 150,000'],
  ['Instagram grid layout', 'TZS 70,000 / 9 posts'],
  ['Presentation design', 'TZS 8,000 / slide'],
  ['Brochure / catalogue', 'TZS 10,000 / page'],
  ['Merchandise / packaging mockup', 'TZS 25,000 / item'],
]

const faqs = [
  ['Which package is right for me?', 'Starter is best when you need the essentials. Growth adds the tools for a more consistent public presence. Premium is designed for brands that need a fuller content and visibility system. If the fit is not obvious, we can recommend a scope after a short conversation.'],
  ['Can I customise a package?', 'Yes. The listed packages are useful starting points, not rigid boxes. We can combine deliverables or prepare a custom scope around your priorities and budget.'],
  ['Are these one-time prices?', 'The displayed price covers the deliverables listed in each package. Ongoing design, content support or campaign work can be scoped separately when needed.'],
  ['What do you need from me to begin?', 'We begin with a short discovery conversation and ask for any existing brand materials, business information, preferences and examples that can help us understand the direction.'],
  ['What happens after I choose a package?', 'Send an enquiry and tell us which package interests you. We will confirm the scope, delivery timing and working process with you before the project begins.'],
  ['Are printing and production costs included?', 'The listed prices cover design services and digital deliverables. Printing, fabrication or other third-party production is quoted separately when required.'],
]

export default function BrandPricing() {
  const [activeIndex, setActiveIndex] = useState(1)
  const activePackage = packages[activeIndex]

  return (
    <section className="overflow-hidden bg-[#f3f2ee] px-5 py-24 text-black md:px-[3.6vw] md:py-40" aria-labelledby="brand-pricing-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto w-fit rounded-full bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] shadow-[0_8px_30px_rgba(0,0,0,0.05)]">Branding packages</p>
          <h2 id="brand-pricing-title" className="mt-7 text-[clamp(3rem,6.6vw,6.4rem)] font-semibold leading-[0.88] tracking-[-0.065em]">Built for where your brand is going.</h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-black/55 md:text-lg">Choose a starting point, then explore exactly what is included. Every package is designed to leave you with useful tools—not just a reveal.</p>
        </div>

        <div className="mt-16 grid gap-3 rounded-[2rem] bg-[#e8e7e2] p-3 lg:grid-cols-3" role="group" aria-label="Choose a branding package">
          {packages.map((pkg, index) => {
            const isActive = index === activeIndex
            return (
              <button
                aria-pressed={isActive}
                className={`group relative min-h-64 overflow-hidden rounded-[1.4rem] p-6 text-left transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:p-8 ${isActive ? '-translate-y-1 bg-black text-white shadow-[0_24px_55px_rgba(0,0,0,0.2)]' : 'bg-white text-black shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.09)]'}`}
                key={pkg.name}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {isActive ? <span className="absolute -right-16 -top-20 size-56 rounded-full bg-[#86b8cc]/30 blur-3xl" aria-hidden="true" /> : null}
                <span className="relative flex items-start justify-between gap-4">
                  <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${isActive ? 'text-white/55' : 'text-black/40'}`}>0{index + 1} · {pkg.name}</span>
                  {pkg.popular ? <span className={`rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${isActive ? 'bg-white text-black' : 'bg-[#dfe8eb] text-black'}`}>Most popular</span> : null}
                </span>
                <span className="relative mt-12 block text-[clamp(2.5rem,4vw,4.25rem)] font-semibold leading-none tracking-[-0.06em]"><span className="mr-2 text-sm font-medium tracking-normal">TZS</span>{pkg.price}</span>
                <span className={`relative mt-5 block max-w-xs text-sm leading-6 ${isActive ? 'text-white/60' : 'text-black/50'}`}>{pkg.description}</span>
                <span className={`relative mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] ${isActive ? 'text-white' : 'text-black/45'}`}>{isActive ? 'Selected' : 'Explore package'} <span aria-hidden="true">{isActive ? '●' : '→'}</span></span>
              </button>
            )
          })}
        </div>

        <div className="pricing-fade mt-5 grid overflow-hidden rounded-[2rem] bg-white shadow-[0_22px_70px_rgba(0,0,0,0.06)] lg:grid-cols-[0.8fr_1.2fr]" key={activePackage.name} aria-live="polite">
          <div className="flex flex-col justify-between bg-[#dfe8eb] p-7 md:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">Your selected plan</p>
              <h3 className="mt-5 text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.9] tracking-[-0.06em]">{activePackage.fullName}</h3>
              <p className="mt-7 max-w-sm text-base leading-7 text-black/60">{activePackage.description}</p>
            </div>
            <Link className="mt-12 flex min-h-14 items-center justify-between rounded-full bg-black px-6 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-[#315b72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="/contact">
              Start with {activePackage.name}<span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="p-7 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40">What’s included</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label={`${activePackage.fullName} includes`}>
              {activePackage.features.map((feature, index) => (
                <li className="flex min-h-24 gap-4 rounded-[1.15rem] bg-[#f3f2ee] p-5" key={feature}>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-black text-[0.65rem] font-semibold text-white" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm leading-6">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <details className="group mt-5 rounded-[2rem] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)] md:p-10">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-8 [&::-webkit-details-marker]:hidden">
            <span><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/40">Individual services</span><span className="mt-2 block text-2xl font-semibold tracking-[-0.04em] md:text-4xl">Need just one thing?</span></span>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f3f2ee] text-xl transition duration-300 group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {singleServices.map(([name, price]) => (
              <div className="rounded-[1.1rem] bg-[#f3f2ee] p-5" key={name}>
                <dt className="text-sm leading-5 text-black/55">{name}</dt>
                <dd className="mt-4 text-lg font-semibold tracking-[-0.03em]">{price}</dd>
              </div>
            ))}
          </dl>
        </details>

        <div className="relative mt-20 overflow-hidden rounded-[2.25rem] bg-[#dfe8eb] px-6 py-20 text-center shadow-[0_30px_90px_rgba(49,91,114,0.16)] md:px-12 md:py-28">
          <div className="pricing-orb pricing-orb-one absolute -left-20 -top-24 size-80 rounded-full bg-[#f5c4d8]/80 blur-3xl" aria-hidden="true" />
          <div className="pricing-orb pricing-orb-two absolute -bottom-28 right-0 size-96 rounded-full bg-[#b6d7ff]/90 blur-3xl" aria-hidden="true" />
          <div className="pricing-orb pricing-orb-three absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff3a6]/70 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">A package shaped around you</p>
            <h3 className="mt-6 text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">Not sure which plan fits?</h3>
            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-black/60 md:text-lg">Tell us what you are building, what matters most and what you are working with. We’ll recommend the right package—or create a custom one.</p>
            <Link className="mx-auto mt-10 flex min-h-14 w-fit min-w-60 items-center justify-between gap-8 rounded-full bg-black px-6 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.2)] transition duration-300 hover:scale-[1.04] hover:bg-[#315b72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="/contact">Build a custom package<span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className="mx-auto mt-28 max-w-5xl">
          <div className="text-center"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40">Frequently asked questions</p><h3 className="mt-5 text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">Everything useful, upfront.</h3></div>
          <div className="mt-12 space-y-3">
            {faqs.map(([question, answer]) => (
              <details className="group rounded-[1.25rem] bg-white px-5 shadow-[0_10px_35px_rgba(0,0,0,0.035)] open:shadow-[0_18px_50px_rgba(0,0,0,0.07)] md:px-7" key={question}>
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-semibold tracking-[-0.02em] md:text-xl [&::-webkit-details-marker]:hidden"><span>{question}</span><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8f3d4] text-lg transition duration-300 group-open:rotate-45" aria-hidden="true">+</span></summary>
                <p className="max-w-3xl pb-7 pr-10 text-sm leading-7 text-black/60 md:text-base">{answer}</p>
              </details>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs leading-5 text-black/40">Prices are shown in Tanzanian shillings. Final scope and delivery timing are confirmed before work begins.</p>
      </div>
    </section>
  )
}
