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
  const articleData = await getArticleBySlug(slug)
  if (!articleData) notFound()
  const { article, nextArticle: next } = articleData
  const words = article.body.join(' ').split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  const quote = pullQuote(article.body)

  return (
    <article className="bg-white pt-32 text-black md:pt-40">
      <PageMotion />
      <div aria-hidden="true" data-progress className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left scale-x-0 bg-black" />

      <header className="px-5 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px] border-t border-black/20 pt-5">
          <p className="bd-label">{article.category} · Journal</p>
          <h1 className="mt-16 max-w-[13ch] text-[clamp(3.5rem,8vw,8rem)] font-semibold uppercase leading-[.84] tracking-[-.07em]">{article.title}</h1>
          <div className="mb-16 mt-12 grid gap-8 lg:grid-cols-12">
            <p className="max-w-2xl text-xl leading-8 text-black/60 md:text-2xl md:leading-9 lg:col-span-7 lg:col-start-6">{article.excerpt}</p>
          </div>
          <p className="border-t border-black/20 py-4 text-xs font-medium uppercase tracking-[.12em] text-black/50">
            Barons Digital &nbsp;·&nbsp; {article.date} &nbsp;·&nbsp; {minutes} min read
          </p>
        </div>
      </header>

      <div className="relative aspect-[16/8] min-h-[420px] overflow-hidden" data-mask>
        <Image src={article.image} alt="" fill priority className="object-cover grayscale" sizes="100vw" />
      </div>

      <div className="px-5 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="bd-label">( {article.category} )</p>
              <p className="mt-3 text-sm text-black/50">{article.date}</p>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-4">
            {article.body.map((paragraph, i) => (
              <div key={paragraph}>
                <p
                  className={`max-w-[34rem] text-[1.2rem] leading-[1.75] ${i ? 'mt-9' : 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[5.2rem] first-letter:font-semibold first-letter:leading-[.8] first-letter:tracking-[-.05em]'}`}
                  data-reveal
                >
                  {paragraph}
                </p>
                {i === 0 && (
                  <blockquote className="my-16 border-t border-black pt-6 md:my-24 lg:-mr-24" data-reveal>
                    <p className="text-[clamp(1.9rem,3.6vw,3.4rem)] font-semibold uppercase leading-[.98] tracking-[-.05em]">“{quote}”</p>
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="border-t border-black/20 px-5 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <p className="bd-label">( Read next )</p>
          <Link href={`/journal/${next.slug}`} data-cursor="read" className="group mt-10 grid gap-8 md:grid-cols-2 md:items-end">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100" data-mask>
              <Image src={next.image} alt="" fill className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <div data-reveal>
              <p className="text-xs uppercase tracking-[.12em] text-black/45">{next.category} · {next.date}</p>
              <h2 className="mt-6 text-[clamp(2.2rem,4.4vw,4.4rem)] font-semibold uppercase leading-[.92] tracking-[-.055em]">{next.title}</h2>
              <span className="bd-text-link mt-8">Read article <span aria-hidden>↗</span></span>
            </div>
          </Link>
        </div>
      </section>
    </article>
  )
}
