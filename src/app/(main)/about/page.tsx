import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'
import PageMotion from '@/components/ui/PageMotion'

const principles = [
  ['Clarity', 'We start by finding the real problem, then say it simply.'],
  ['Relevance', 'Local understanding shapes every decision, from tone to technology.'],
  ['Accountability', 'We stay responsible for the result after handover, not just the reveal.'],
]

export default function AboutPage() {
  return (
    <div className="bg-white text-black">
      <PageMotion />
      <PageHeader label="About Barons" title="Built to make quality visible." intro="Barons Digital is an independent creative and business solutions company in Dar es Salaam. We help serious organisations express the quality already present in their work." />

      <div className="relative mx-[3.6vw] aspect-[16/8] min-h-[18rem] overflow-hidden bg-neutral-200" data-mask>
        <video autoPlay className="h-full w-full object-cover" loop muted playsInline src="/videos/about-showreel.mp4" />
      </div>

      <section className="px-5 py-24 md:px-[3.6vw] md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-[1.6vw]">
          <h2 className="text-[clamp(2.2rem,4.6vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] md:col-span-7 md:col-start-5" data-reveal>Strategy gives the work direction. Craft gives it weight.</h2>
          <p className="max-w-[28rem] text-base leading-6 text-[#6b6b6b] md:col-span-4 md:col-start-5" data-reveal>
            We work across brand, digital, content and experience, bringing these disciplines together when the problem demands it. Every engagement is built around clarity, relevance and accountable delivery.
          </p>
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 md:col-span-6 md:col-start-1 md:row-start-3 md:mt-[4vw]" data-mask>
            <Image alt="Barons creative process" className="object-cover grayscale" fill sizes="(max-width: 768px) 100vw, 50vw" src="/images/services/content-production.jpg" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200 md:col-span-4 md:col-start-9 md:row-start-3 md:mt-[12vw]" data-mask>
            <Image alt="Barons digital design" className="object-cover grayscale" fill sizes="(max-width: 768px) 100vw, 33vw" src="/images/services/website-mockup.jpg" />
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] px-5 py-20 md:px-[3.6vw] md:py-32">
        <div className="grid gap-4 md:grid-cols-3 md:gap-[1.6vw]">
          {principles.map(([title, text]) => (
            <article className="bg-white p-6 md:p-[2vw]" data-reveal key={title}>
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-4 text-sm leading-5 text-[#6b6b6b]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black px-5 py-24 text-white md:px-[3.6vw] md:py-36">
        <h2 className="max-w-[14ch] text-[clamp(2.8rem,7vw,6.4rem)] font-semibold leading-[1] tracking-[-0.04em]" data-reveal>Bring us the problem worth solving.</h2>
        <Link className="mt-12 inline-flex items-center gap-6 text-sm font-medium uppercase" data-reveal href="/contact">
          <span className="flex size-10 items-center justify-center bg-white text-black">↗</span>
          Start a conversation
        </Link>
      </section>
    </div>
  )
}
