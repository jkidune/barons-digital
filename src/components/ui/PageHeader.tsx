import type { ReactNode } from 'react'

/** Foster-style page opener: oversized sentence-case title, grey intro on column 5. */
export default function PageHeader({
  label,
  title,
  intro,
  children,
}: {
  label?: string
  title: ReactNode
  intro?: string
  children?: ReactNode
}) {
  return (
    <header className="px-5 pb-16 pt-36 md:px-[3.6vw] md:pb-24 md:pt-[11vw]">
      {label && <p className="mb-8 text-sm font-medium uppercase text-black/60" data-reveal>{label}</p>}
      <h1 className="max-w-[16ch] text-[clamp(3.2rem,9.5vw,9rem)] font-semibold leading-[0.95] tracking-[-0.045em]" data-reveal>{title}</h1>
      {(intro || children) && (
        <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-x-[1.6vw]">
          {intro && <p className="max-w-[28rem] text-base leading-6 text-[#6b6b6b] md:col-span-4 md:col-start-5" data-reveal>{intro}</p>}
          {children}
        </div>
      )}
    </header>
  )
}
