'use client'

import Image from 'next/image'

interface SocialLink {
  label: string
  href: string
}

const defaultSocialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/baronsdigital/' },
  { label: 'Facebook',  href: 'https://www.facebook.com/baronsdigital' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/barons-digital/' },
  { label: 'Twitter / X', href: 'https://x.com/barons_dig19387' },
]

export default function ComingSoonFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-6 pb-16 pt-12 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          
          {/* Brand Column */}
          <div className="max-w-[240px]">
            <Image
              src="/logos/barons-white-logo.svg"
              alt="Barons Digital"
              width={130}
              height={36}
              className="h-auto w-[100px] opacity-75"
              priority={false}
            />
            <p className="mt-4 text-sm font-normal leading-[1.75] text-white/50">
              Strategy, brand identity, and web experiences for businesses that refuse to be ordinary.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="flex gap-12 sm:gap-20">
            {/* Services */}
            <div className="flex flex-col gap-3">
              <p className="mb-1 text-[15px] font-medium text-white">
                Services
              </p>
              {['Strategy', 'Brand Identity', 'Web Experiences'].map((item) => (
                <span
                  key={item}
                  className="cursor-default text-sm font-normal text-white/50 transition-colors duration-200 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <p className="mb-1 text-[15px] font-medium text-white">
                Company
              </p>
              {['About', 'Work', 'Contact'].map((item) => (
                <span
                  key={item}
                  className="cursor-default text-sm font-normal text-white/50 transition-colors duration-200 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-3">
              <p className="mb-1 text-[15px] font-medium text-white">
                Connect
              </p>
              {defaultSocialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-sm font-normal text-white/50 transition-colors duration-200 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-20 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-white/50">
            © {currentYear} Barons Digital. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
