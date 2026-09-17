import Image from 'next/image'
import Link from 'next/link'
import { servicePages } from '@/data/content'

export default function ServicesPage() {
  return <main className="bg-[#f1f0ec] pb-32 pt-32 text-black md:pt-40">
    <header className="px-5 md:px-10 lg:px-16"><div className="mx-auto max-w-[1440px] border-t border-black/20 pt-5"><p className="bd-label">( Capabilities )</p><h1 className="mt-16 max-w-[10ch] text-[clamp(4rem,10vw,10rem)] font-semibold uppercase leading-[.8] tracking-[-.075em]">Different skills. One standard.</h1><p className="mb-24 ml-auto mt-12 max-w-xl text-lg leading-8 text-black/60">We assemble the right mix of strategy, creativity and technology around the result—not around a predefined deliverable.</p></div></header>
    <section className="border-t border-black/20">
      {servicePages.map((service, index) => <Link href={`/services/${service.slug}`} data-cursor="view" className="group relative block overflow-hidden border-b border-black/20 px-5 py-10 md:px-10 md:py-14 lg:px-16" key={service.slug}>
        <div className="pointer-events-none absolute right-[8%] top-1/2 hidden aspect-[4/3] w-[28vw] max-w-md -translate-y-1/2 scale-90 overflow-hidden opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 lg:block"><Image src={service.image} alt="" fill className="object-cover grayscale" sizes="28vw" /></div>
        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-4 md:grid-cols-[5rem_1fr_auto] md:items-center"><span className="text-xs text-black/40">0{index + 1}</span><div><h2 className="text-[clamp(2.5rem,6vw,6rem)] font-semibold uppercase leading-none tracking-[-.06em] transition-transform duration-500 group-hover:translate-x-5">{service.title}</h2><p className="mt-4 text-xs uppercase tracking-[.12em] text-black/45">{service.kicker}</p></div><span className="text-2xl">↗</span></div>
      </Link>)}
    </section>
  </main>
}
