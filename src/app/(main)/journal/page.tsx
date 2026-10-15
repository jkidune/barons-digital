import Image from 'next/image'
import Link from 'next/link'
import { getArticles } from '@/lib/articles'
import PageHeader from '@/components/ui/PageHeader'
import PageMotion from '@/components/ui/PageMotion'

export default async function JournalPage() {
  const articles = await getArticles()
  const [featured, ...rest] = articles
  return (
    <div className="bg-white text-black">
      <PageMotion />
      <PageHeader label="Journal" title="Thinking behind the work." intro="Notes on brand, digital and the practice of making quality visible." />

      <section className="px-5 pb-20 md:px-[3.6vw] md:pb-32">
        <Link className="group grid gap-8 md:grid-cols-12 md:gap-x-[1.6vw]" data-cursor="read" href={`/journal/${featured.slug}`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 md:col-span-8" data-mask>
            <Image alt="" className="object-cover transition duration-700 group-hover:scale-[1.03]" fill priority sizes="(max-width: 768px) 100vw, 66vw" src={featured.image} />
          </div>
          <div className="flex flex-col justify-end md:col-span-4" data-reveal>
            <p className="text-sm font-medium uppercase text-black/60">{featured.category} · {featured.date}</p>
            <h2 className="mt-5 text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">{featured.title}</h2>
            <p className="mt-5 text-base leading-6 text-[#6b6b6b]">{featured.excerpt}</p>
            <span className="bd-btn mt-8 w-fit">Read article</span>
          </div>
        </Link>
      </section>

      <section className="px-5 pb-28 md:px-[3.6vw] md:pb-44">
        <div className="grid gap-12 md:grid-cols-3 md:gap-x-[1.6vw]">
          {rest.map((article) => (
            <article key={article.slug}>
              <Link className="group block" data-cursor="read" href={`/journal/${article.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200" data-mask>
                  <Image alt="" className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 33vw" src={article.image} />
                </div>
                <div data-reveal>
                  <p className="mt-5 text-xs font-medium uppercase text-black/60">{article.category} · {article.date}</p>
                  <h2 className="mt-3 max-w-[20rem] text-xl font-medium leading-[1.2]">{article.title}</h2>
                  <span className="bd-btn mt-6">Read more</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
