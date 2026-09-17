import Link from 'next/link'

const links = [
  { label: 'Work', href: '/work' },
  { label: 'Capabilities', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="overflow-hidden bg-black pb-8 pt-20 text-white">
      <div className="bd-marquee border-y border-white/20 py-7">
        <div className="bd-marquee-track flex w-max items-center">
          {[0, 1].map((set) => (
            <div className="flex shrink-0 items-center" key={set}>
              {['Strategy', 'Identity', 'Digital', 'Content', 'Experience'].map((item) => (
                <div className="flex shrink-0 items-center" key={item}>
                  <span className="px-5 text-[clamp(2.5rem,7vw,7rem)] font-semibold uppercase leading-none tracking-[-0.06em] text-white/80 md:px-10">{item}</span>
                  <span className="h-3 w-3 rounded-full bg-white/25 md:h-5 md:w-5" />
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>

      <div className="mx-auto mt-20 max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-16 border-t border-white/25 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">Have something serious to build?</p>
            <a className="mt-9 inline-block break-all text-[clamp(1.35rem,4.2vw,4.5rem)] font-semibold uppercase leading-none tracking-[-0.05em] transition-opacity hover:opacity-55" href="mailto:hello@barons-digital.com">hello@barons-digital.com</a>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-4 lg:col-span-4 lg:col-start-9">
            {links.map((item, index) => <Link className="border-t border-white/20 py-3 text-sm text-white/65 transition-colors hover:text-white" href={item.href} key={item.label}><span className="mr-4 text-[0.65rem] text-white/30">0{index + 1}</span>{item.label}</Link>)}
          </nav>
        </div>

        <div className="mt-20 grid gap-3 border-t border-white/20 pt-5 text-sm text-white/60 sm:grid-cols-3">
          <a href="https://www.linkedin.com/company/barons-digital/" target="_blank" rel="noopener noreferrer" className="min-h-11 py-3 transition-colors hover:text-white">LinkedIn ↗</a>
          <a href="https://www.facebook.com/baronsdigital" target="_blank" rel="noopener noreferrer" className="min-h-11 py-3 transition-colors hover:text-white">Facebook ↗</a>
          <a href="https://www.instagram.com/baronsdigital/" target="_blank" rel="noopener noreferrer" className="min-h-11 py-3 transition-colors hover:text-white">Instagram ↗</a>
        </div>

        <p className="mt-28 overflow-hidden text-[clamp(4rem,14vw,13rem)] font-semibold uppercase leading-[0.72] tracking-[-0.08em]">Barons</p>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/20 pt-4 text-[0.65rem] uppercase tracking-[0.12em] text-white/40 sm:flex-row">
          <p>Dar es Salaam · Tanzania</p>
          <p>© {year} Barons Digital</p>
        </div>
      </div>
    </footer>
  )
}
