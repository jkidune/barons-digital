import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { servicePages } from '@/data/content'
import PageHeader from '@/components/ui/PageHeader'
import PageMotion from '@/components/ui/PageMotion'

export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })) }

const brandPackages = [
  {
    name: 'Starter Pack',
    price: 'TZS 150,000',
    description: 'For new brands that need a professional look.',
    features: [
      'Logo design (primary and alternate)',
      'Basic brand colour palette and typography guide',
      'Social media setup (profile, highlight covers and bio optimisation)',
      '3 editable branded templates',
      '1 promotional flyer design',
    ],
  },
  {
    name: 'Growth Pack',
    price: 'TZS 250,000',
    description: 'For growing brands ready for a consistent presence.',
    featured: true,
    features: [
      'Everything in the Starter Pack',
      'Extended brand guidelines (patterns, mockups and usage rules)',
      '6 editable branded social media templates',
      '4 promotional flyer designs',
      'Content strategy starter kit (caption samples and posting guide)',
      'Instagram grid sample (visual direction for 9 posts)',
    ],
  },
  {
    name: 'Premium Pack',
    price: 'TZS 450,000',
    description: 'For brands that want visibility and sales consistency.',
    features: [
      'Everything in the Growth Pack',
      'Advanced brand guidelines for ads, packaging and merchandise',
      '10 editable branded social media templates',
      '7 promotional flyer designs',
      '30-second motion graphic promotional video',
      'One-month Instagram content plan (designs and captions)',
    ],
  },
]

const singleBrandServices = [
  ['Logo design', 'TZS 50,000'],
  ['Flyer / poster design', 'TZS 30,000'],
  ['Social media template', 'TZS 15,000 per design'],
  ['Business card design', 'TZS 20,000'],
  ['Mini brand style guide', 'TZS 80,000'],
  ['Full brand identity (logo, colours, fonts and mockups)', 'TZS 150,000'],
  ['Instagram grid layout', 'TZS 70,000 for 9 posts'],
  ['Pitch deck / presentation design', 'TZS 8,000 per slide'],
  ['Brochure / catalogue', 'TZS 10,000 per page'],
  ['Merchandise / packaging mockup', 'TZS 25,000 per item'],
]

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

      {service.slug === 'brand-systems' && (
        <section className="bg-[#f4f1eb] px-5 py-24 md:px-[3.6vw] md:py-36" aria-labelledby="brand-packages-title">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-8 md:grid-cols-12 md:gap-x-[1.6vw]">
              <div className="md:col-span-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/50">Branding packages</p>
                <h2 id="brand-packages-title" className="mt-5 max-w-[10ch] text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]" data-reveal>
                  A clear place to start.
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-black/60 md:col-span-6 md:col-start-6 md:pt-10" data-reveal>
                Practical, strategy-led branding options for new and growing businesses. Choose the level that matches what your brand needs now.
              </p>
            </div>

            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {brandPackages.map((pkg) => (
                <article
                  className={`flex h-full flex-col rounded-[1.5rem] p-6 md:p-8 ${pkg.featured ? 'bg-[#dfe8eb] ring-2 ring-black' : 'bg-white'}`}
                  data-reveal
                  key={pkg.name}
                >
                  <div className="flex min-h-8 items-start justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/50">{pkg.name}</p>
                    {pkg.featured && <span className="rounded-full bg-black px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white">Recommended</span>}
                  </div>
                  <p className="mt-8 text-[clamp(2.25rem,4vw,4rem)] font-semibold leading-none tracking-[-0.055em]">{pkg.price}</p>
                  <p className="mt-5 min-h-14 max-w-sm leading-7 text-black/60">{pkg.description}</p>
                  <ul className="mt-8 space-y-4" aria-label={`${pkg.name} includes`}>
                    {pkg.features.map((feature) => (
                      <li className="flex gap-3 text-sm leading-6" key={feature}>
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-black text-[0.65rem] text-white" aria-hidden="true">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link className="mt-10 inline-flex min-h-12 items-center justify-between rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#315b72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href="/contact">
                    Choose {pkg.name}<span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-16 rounded-[1.5rem] bg-white p-6 md:p-10">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/50">Individual services</p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">Build your own scope.</h3>
                  <p className="mt-5 max-w-sm leading-7 text-black/60">Need one focused deliverable? Start with an individual service and contact us if your project needs a custom combination.</p>
                </div>
                <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
                  {singleBrandServices.map(([name, price]) => (
                    <div className="flex min-h-16 items-center justify-between gap-5 border-b border-black/10 py-4" key={name}>
                      <dt className="text-sm leading-5">{name}</dt>
                      <dd className="shrink-0 text-right text-sm font-semibold">{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <p className="mt-6 text-xs leading-5 text-black/45">All prices are shown in Tanzanian shillings. Final scope and delivery timing are confirmed before work begins.</p>
          </div>
        </section>
      )}

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
