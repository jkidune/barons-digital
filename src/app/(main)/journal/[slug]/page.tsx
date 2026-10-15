import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticles, getArticleBySlug } from '@/lib/articles'
import PageMotion from '@/components/ui/PageMotion'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map(({ slug }) => ({ slug }))
}

// The sentence worth pulling: last sentence of the second paragraph
function pullQuote(body: string[]) {
  const source = body[1] ?? body[0]
  const sentences = source.match(/[^.!?]+[.!?]/g)
  return sentences?.[sentences.length - 1].trim() ?? source
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getArticleBySlug(slug)
  if (!data) notFound()
  const { article, nextArticle: next } = data
  const minutes = Math.max(1, Math.round(article.body.join(' ').split(/\s+/).length / 200))
  const quote = pullQuote(article.body)

  return (
    <article className="bg-white text-black">
      <PageMotion />
      <div aria-hidden="true" data-progress className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left scale-x-0 bg-black" />

      <header className="px-5 pb-14 pt-36 md:px-[3.6vw] md:pb-20 md:pt-[11vw]">
        <p className="mb-8 text-sm font-medium uppercase text-black/60" data-reveal>{article.category} · Journal</p>
        <h1 className="max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.97] tracking-[-0.045em]" data-reveal>{article.title}</h1>
        <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-x-[1.6vw]">
          <p className="max-w-[28rem] text-lg leading-7 text-[#6b6b6b] md:col-span-4 md:col-start-5" data-reveal>{article.excerpt}</p>
          <p className="text-xs font-medium uppercase text-black/60 md:col-span-3 md:col-start-10 md:self-end" data-reveal>Barons Digital · {article.date} · {minutes} min read</p>
        </div>
      </header>

      <div className="relative mx-[3.6vw] aspect-[16/8] min-h-[18rem] overflow-hidden bg-neutral-200" data-mask>
        <Image alt="" className="object-cover" fill priority sizes="100vw" src={article.image} />
      </div>

      <div className="px-5 py-24 md:px-[3.6vw] md:py-36">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-[1.6vw]">
          <aside className="hidden md:col-span-3 md:block">
            <div className="sticky top-28 text-sm text-[#6b6b6b]">
              <p className="font-medium uppercase text-black">{article.category}</p>
              <p className="mt-2">{article.date}</p>
            </div>
          </aside>
          <div className="md:col-span-7 md:col-start-5">
            {article.body.map((paragraph, i) => (
              <div key={paragraph}>
                <p
                  className={`max-w-[34rem] text-[1.2rem] leading-[1.75] ${i ? 'mt-9' : 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[5.2rem] first-letter:font-semibold first-letter:leading-[.8] first-letter:tracking-[-.05em]'}`}
                  data-reveal
                >
                  {paragraph}
                </p>
                {i === 0 && (
                  <blockquote className="my-16 md:my-24 md:-mr-[8vw]" data-reveal>
                    <p className="text-[clamp(1.9rem,3.8vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">“{quote}”</p>
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-[#f4f4f4] px-5 py-20 md:px-[3.6vw] md:py-32">
        <p className="mb-10 text-sm font-medium uppercase text-black/60" data-reveal>Read next</p>
        <Link className="group grid gap-8 md:grid-cols-12 md:items-end md:gap-x-[1.6vw]" data-cursor="read" href={`/journal/${next.slug}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 md:col-span-5" data-mask>
            <Image alt="" className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 40vw" src={next.image} />
          </div>
          <div className="md:col-span-6 md:col-start-7" data-reveal>
            <h2 className="text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">{next.title}</h2>
            <span className="bd-btn mt-8">Read article</span>
          </div>
        </Link>
      </section>
    </article>
  )
}
