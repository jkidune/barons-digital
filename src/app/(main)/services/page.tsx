import Image from 'next/image'
import Link from 'next/link'
import { servicePages } from '@/data/content'
import PageHeader from '@/components/ui/PageHeader'
import PageMotion from '@/components/ui/PageMotion'

export default function ServicesPage() {
  return (
    <div className="bg-white text-black">
      <PageMotion />
      <PageHeader label="Capabilities" title="Different skills. One standard." intro="We assemble the right disciplines around your problem: strategy, identity, digital and content, delivered as one connected process." />

      <section className="px-5 pb-28 md:px-[3.6vw] md:pb-44">
        <div className="grid gap-4 md:grid-cols-2 md:gap-[1.6vw]">
          {servicePages.map((service, index) => (
            <Link className="group block bg-[#f4f4f4] p-4 md:p-[1.2vw]" data-cursor="view" data-reveal href={`/services/${service.slug}`} key={service.slug}>
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200" data-mask>
                <Image alt={service.title} className="object-cover transition duration-700 group-hover:scale-[1.03]" fill sizes="(max-width: 768px) 100vw, 46vw" src={service.image} />
              </div>
              <div className="flex items-start justify-between gap-6 pb-2 pt-6">
                <div>
                  <p className="text-xs font-medium uppercase text-black/60">0{index + 1} · {service.kicker}</p>
                  <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{service.title}</h2>
                  <p className="mt-3 max-w-[26rem] text-sm leading-5 text-[#6b6b6b]">{service.intro}</p>
                </div>
                <span className="mt-1 flex size-10 shrink-0 items-center justify-center bg-black text-white transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
