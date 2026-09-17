import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/lib/projects'

export default async function WorkPage() {
  const projects = await getProjects()
  return <main className="bg-white px-5 pb-32 pt-32 text-black md:px-10 md:pt-40 lg:px-16"><div className="mx-auto max-w-[1440px]"><header className="border-t border-black/20 pt-5"><p className="bd-label">( Selected work )</p><h1 className="mt-16 text-[clamp(4rem,11vw,11rem)] font-semibold uppercase leading-[.78] tracking-[-.08em]">Evidence,<br />not decoration.</h1></header><div className="mt-28 grid gap-x-8 gap-y-24 md:grid-cols-2">{projects.map((project, i) => <article className={`${i % 2 ? 'md:mt-48' : ''} ${i === 2 ? 'md:col-span-2 md:ml-[24%] md:w-[76%]' : ''}`} key={project.slug}><Link href={`/work/${project.slug}`} data-cursor="view" className="group block"><div className={`relative overflow-hidden bg-neutral-100 ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}><Image src={project.coverImage} alt={project.title} fill className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" sizes="(max-width:768px) 100vw, 50vw" /></div><div className="mt-5 flex justify-between gap-8 border-t border-black/20 pt-5"><div><h2 className="text-[clamp(2rem,4vw,4rem)] font-semibold uppercase leading-none tracking-[-.05em]">{project.title}</h2><p className="mt-3 text-sm text-black/50">{project.category}</p></div><span className="text-xs">{project.year} ↗</span></div></Link></article>)}</div></div></main>
}
