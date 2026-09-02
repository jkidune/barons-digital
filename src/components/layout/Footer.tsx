import Link from 'next/link'

const capabilities = [
  'Digital marketing',
  'Brand and creative',
  'Wedding and event creative',
  'Product sourcing',
  'Business support',
]

const company = [
  { label: 'Work', href: '/work' },
  { label: 'Capabilities', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/#journal' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/25 bg-black px-5 pb-8 pt-20 text-white md:px-8 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link className="text-[0.8rem] font-semibold uppercase tracking-[0.12em]" href="/">
              Barons Digital
            </Link>
            <p className="mt-10 max-w-[28rem] text-[clamp(1.7rem,3vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              Making quality visible through strategy, creativity and disciplined delivery.
            </p>
            <a
              className="mt-10 inline-flex min-h-11 items-center border-b border-white text-[0.9rem] transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              href="mailto:hello@barons-digital.com"
            >
              hello@barons-digital.com
            </a>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/45">Capabilities</p>
              <ul className="mt-7 space-y-3">
                {capabilities.map((capability) => (
                  <li className="text-[0.875rem] leading-5 text-white/70" key={capability}>{capability}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/45">Company</p>
              <ul className="mt-7 space-y-3">
                {company.map((item) => (
                  <li key={item.label}>
                    <Link className="text-[0.875rem] text-white/70 transition-colors hover:text-white" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-white/25 pt-4 md:mt-36">
          <p aria-label="Barons Digital" className="overflow-hidden text-[clamp(4rem,13.2vw,12.5rem)] font-medium leading-[0.76] tracking-[-0.075em]">
            BARONS
          </p>
          <div className="mt-10 flex flex-col justify-between gap-3 text-[0.7rem] uppercase tracking-[0.08em] text-white/45 sm:flex-row">
            <p>Dar es Salaam / Tanzania</p>
            <p>© {new Date().getFullYear()} Barons Digital</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
