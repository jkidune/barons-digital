import Image from 'next/image'
import { notFound } from 'next/navigation'
import { articles } from '@/data/content'

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })) }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()
  return <article className="bg-white pb-32 pt-32 text-black md:pt-40"><header className="px-5 md:px-10 lg:px-16"><div className="mx-auto max-w-[1440px] border-t border-black/20 pt-5"><p className="bd-label">{article.category} · {article.date}</p><h1 className="mt-16 max-w-[13ch] text-[clamp(3.5rem,8vw,8rem)] font-semibold uppercase leading-[.84] tracking-[-.07em]">{article.title}</h1><p className="mb-16 ml-auto mt-12 max-w-2xl text-xl leading-8 text-black/60">{article.excerpt}</p></div></header><div className="relative aspect-[16/8] min-h-[420px]"><Image src={article.image} alt="" fill priority className="object-cover grayscale" sizes="100vw" /></div><div className="mx-auto mt-24 max-w-3xl px-5 md:px-10">{article.body.map((paragraph, index) => <p className={`text-xl leading-9 ${index ? 'mt-10' : ''}`} key={paragraph}>{paragraph}</p>)}</div></article>
}
