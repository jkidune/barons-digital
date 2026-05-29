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
          <div style={{ maxWidth: '240px' }}>
            <Image
              src="/logos/barons-white-logo.svg"
              alt="Barons Digital"
              width={130}
              height={36}
              className="h-auto w-[100px]"
              style={{ opacity: 0.75 }}
              priority={false}
            />
            <p
              style={{
                marginTop: '16px',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '1.75',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Strategy, brand identity, and web experiences for businesses that refuse to be ordinary.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="flex gap-12 sm:gap-20">
            {/* Services */}
            <div className="flex flex-col gap-3">
              <p style={{ fontSize: '15px', fontWeight: 500, color: 'rgb(255, 255, 255)', marginBottom: '4px' }}>
                Services
              </p>
              {['Strategy', 'Brand Identity', 'Web Experiences'].map((item) => (
                <span
                  key={item}
                  className="cursor-default transition-colors duration-200 hover:text-white"
                  style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.5)' }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <p style={{ fontSize: '15px', fontWeight: 500, color: 'rgb(255, 255, 255)', marginBottom: '4px' }}>
                Company
              </p>
              {['About', 'Work', 'Contact'].map((item) => (
                <span
                  key={item}
                  className="cursor-default transition-colors duration-200 hover:text-white"
                  style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.5)' }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-3">
              <p style={{ fontSize: '15px', fontWeight: 500, color: 'rgb(255, 255, 255)', marginBottom: '4px' }}>
                Connect
              </p>
              {defaultSocialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transition-colors duration-200 hover:text-white"
                  style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.5)' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-20 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.5)' }}>
            © {currentYear} Barons Digital. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
