import Link from 'next/link'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/work' },
      { label: 'Journal', href: '/journal' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Brand systems', href: '/services/brand-systems' },
      { label: 'Digital experiences', href: '/services/digital-experiences' },
      { label: 'Content & campaigns', href: '/services/content-campaigns' },
      { label: 'Events & moments', href: '/services/events-moments' },
    ],
  },
]

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/barons-digital/' },
  { label: 'Facebook', href: 'https://www.facebook.com/baronsdigital' },
  { label: 'Instagram', href: 'https://www.instagram.com/baronsdigital/' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white px-5 pb-10 pt-16 font-[family-name:var(--font-inter)] text-black md:px-[3.6vw] md:pt-24">
      <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="text-[1.9rem] font-extrabold uppercase leading-none tracking-[-0.08em]">Barons</p>
          <p className="mt-6 max-w-[17rem] text-sm leading-5 text-black/57">
            An independent creative company in Dar es Salaam, helping serious organisations make their quality visible.
          </p>
          <ul className="mt-8 flex gap-3">
            {socials.map((item) => (
              <li key={item.label}>
                <a aria-label={item.label} className="flex size-10 items-center justify-center bg-black text-[0.7rem] font-semibold uppercase text-white transition hover:bg-black/70" href={item.href} rel="noopener noreferrer" target="_blank">
                  {item.label.slice(0, 2)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((column) => (
          <nav aria-label={column.title} key={column.title}>
            <p className="text-xl font-semibold">{column.title}</p>
            <ul className="mt-6 grid gap-4 text-base text-black/57">
              {column.links.map((item) => (
                <li key={item.label}><Link className="transition-colors hover:text-black" href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className="text-xl font-semibold">Contact</p>
          <ul className="mt-6 grid gap-4 text-base text-black/57">
            <li><a className="break-all transition-colors hover:text-black" href="mailto:hello@barons-digital.com">hello@barons-digital.com</a></li>
            <li><a className="transition-colors hover:text-black" href="tel:+255719906205">+255 719 906 205</a></li>
            <li>Wazo Hill, Kinondoni<br />Dar es Salaam, Tanzania</li>
          </ul>
        </div>
      </div>

      <p className="mt-16 text-xs text-black/45">© {year} Barons Digital. All rights reserved.</p>
    </footer>
  )
}
