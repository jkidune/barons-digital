import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { servicePages } from '@/data/content'

export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })) }

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicePages.find((item) => item.slug === slug)
  if (!service) notFound()
  return <article className="bg-white pt-32 text-black md:pt-40">
    <header className="px-5 md:px-10 lg:px-16"><div className="mx-auto max-w-[1440px] border-t border-black/20 pt-5"><p className="bd-label">{service.kicker}</p><h1 className="mt-16 max-w-[11ch] text-[clamp(3.8rem,9vw,9rem)] font-semibold uppercase leading-[.82] tracking-[-.07em]">{service.title}</h1><p className="mb-16 ml-auto mt-12 max-w-xl text-lg leading-8 text-black/60">{service.intro}</p></div></header>
    <div className="relative aspect-[16/8] min-h-[420px]"><Image src={service.image} alt={service.title} fill priority className="object-cover grayscale" sizes="100vw" /></div>
    <section className="px-5 py-28 md:px-10 md:py-40 lg:px-16"><div className="mx-auto grid max-w-[1440px] gap-16 border-t border-black/20 pt-6 lg:grid-cols-12"><p className="bd-label lg:col-span-3">( What we deliver )</p><div className="lg:col-span-8 lg:col-start-5">{service.deliverables.map((item, i) => <div className="grid grid-cols-[3rem_1fr] border-b border-black/20 py-6" key={item}><span className="text-xs text-black/40">0{i + 1}</span><h2 className="text-[clamp(2rem,4vw,4rem)] font-semibold uppercase leading-none tracking-[-.05em]">{item}</h2></div>)}</div></div></section>
    <section className="bg-black px-5 py-28 text-white md:px-10 lg:px-16"><div className="mx-auto max-w-[1440px]"><p className="bd-label">( Ready when you are )</p><h2 className="mt-16 max-w-[12ch] text-[clamp(3rem,7vw,7rem)] font-semibold uppercase leading-[.86] tracking-[-.06em]">Let’s make the quality visible.</h2><Link href="/contact" className="bd-text-link mt-12">Start a project ↗</Link></div></section>
  </article>
}
