import Link from 'next/link'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  return (
    <>
      <section className="w-full bg-white py-[80px] md:py-[100px]">
        <div className="w-full px-8 lg:px-12 xl:px-16 max-w-[1280px] mx-auto">
          <h1
            className="uppercase"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(56px, 10vw, 120px)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: '#242424',
            }}
          >
            Contact
          </h1>

          <div className="mt-6 max-w-[720px]">
            <p
              style={{
                fontWeight: 400,
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                color: '#4F4F4F',
              }}
            >
              Send a short brief and we’ll reply with next steps.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@baronsdigital.co.tz"
              className="inline-flex items-center justify-center text-[15px] tracking-[-0.01em] text-bd-black border border-bd-black px-5 py-3 rounded-full hover:bg-bd-black hover:text-white transition-all duration-300"
            >
              hello@baronsdigital.co.tz
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center text-[15px] tracking-[-0.01em] text-bd-black px-5 py-3 rounded-full hover:opacity-60 transition-opacity duration-200"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
