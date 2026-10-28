import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { servicePages } from '@/data/content'
import PageHeader from '@/components/ui/PageHeader'
import PageMotion from '@/components/ui/PageMotion'
import BrandPricing from '@/components/services/BrandPricing'

export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })) }

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicePages.find((item) => item.slug === slug)
  if (!service) notFound()

  return (
    <article className="bg-white text-black">
      <PageMotion />
      <PageHeader label={service.kicker} title={service.title} intro={service.intro} />

      <div className="relative mx-[3.6vw] aspect-[16/8] min-h-[18rem] overflow-hidden bg-neutral-200" data-mask>
        <Image alt={service.title} className="object-cover" fill priority sizes="100vw" src={service.image} />
      </div>

      <section className="px-5 py-24 md:px-[3.6vw] md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-[1.6vw]">
          <h2 className="text-[clamp(2.2rem,4.6vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] md:col-span-4" data-reveal>What we deliver</h2>
          <ol className="md:col-span-7 md:col-start-5">
            {service.deliverables.map((item, i) => (
              <li className="grid grid-cols-[3rem_1fr] items-baseline py-5 md:py-6" data-reveal key={item}>
                <span className="text-sm tabular-nums text-[#6b6b6b]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-xl font-medium leading-7 md:text-2xl">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {service.slug === 'brand-systems' ? <BrandPricing /> : null}

      <section className="bg-black px-5 py-24 text-white md:px-[3.6vw] md:py-36">
        <h2 className="max-w-[14ch] text-[clamp(2.8rem,7vw,6.4rem)] font-semibold leading-[1] tracking-[-0.04em]" data-reveal>Let’s make the quality visible.</h2>
        <Link className="mt-12 inline-flex items-center gap-6 text-sm font-medium uppercase" data-reveal href="/contact">
          <span className="flex size-10 items-center justify-center bg-white text-black">↗</span>
          Start a project
        </Link>
      </section>
    </article>
  )
}
