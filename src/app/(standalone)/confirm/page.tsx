import Image from 'next/image'
import { confirmWaitlist } from '@/app/actions/waitlist'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { token?: string }
}

export default async function ConfirmPage({ searchParams }: Props) {
  const token  = searchParams.token ?? ''
  const result = await confirmWaitlist(token)

  const success = result.status === 'success'

  return (
    <div
      style={{ fontFamily: 'var(--font-geist, "Helvetica Neue", sans-serif)', backgroundColor: '#000000' }}
      className="flex min-h-screen flex-col items-center justify-center px-6 text-white"
    >
      {/* Logo */}
      <div className="mb-12">
        <Image
          src="/logos/barons-white-logo.svg"
          alt="Barons Digital"
          width={130}
          height={36}
          className="h-auto w-[110px]"
          style={{ opacity: 0.7 }}
        />
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md"
        style={{
          border:        '1px solid #1a1a1a',
          borderRadius:  '16px',
          backgroundColor: '#0a0a0a',
          padding:       '40px',
          textAlign:     'center',
        }}
      >
        {success ? (
          <>
            {/* Success icon */}
            <div
              className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ border: '1px solid rgba(74,222,128,0.25)', backgroundColor: 'rgba(74,222,128,0.1)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(74,222,128,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3,10 8,15 17,5" />
              </svg>
            </div>

            <p
              style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}
            >
              Confirmed
            </p>

            <h1
              style={{ fontSize: '28px', fontWeight: 500, lineHeight: '1.2', letterSpacing: '-0.02em', color: 'rgb(250,250,250)', margin: '0 0 16px' }}
            >
              You are on the list.
            </h1>

            <p
              style={{ fontSize: '15px', fontWeight: 400, lineHeight: '1.7', color: 'rgba(255,255,255,0.55)', margin: 0 }}
            >
              We will reach out to you first when Barons Digital launches. Stay tuned.
            </p>
          </>
        ) : (
          <>
            {/* Error icon */}
            <div
              className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ border: '1px solid rgba(248,113,113,0.25)', backgroundColor: 'rgba(248,113,113,0.08)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(248,113,113,0.8)" strokeWidth="1.5" strokeLinecap="round">
                <line x1="5" y1="5" x2="15" y2="15" />
                <line x1="15" y1="5" x2="5" y2="15" />
              </svg>
            </div>

            <p
              style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}
            >
              Invalid link
            </p>

            <h1
              style={{ fontSize: '28px', fontWeight: 500, lineHeight: '1.2', letterSpacing: '-0.02em', color: 'rgb(250,250,250)', margin: '0 0 16px' }}
            >
              Link expired or already used.
            </h1>

            <p
              style={{ fontSize: '15px', fontWeight: 400, lineHeight: '1.7', color: 'rgba(255,255,255,0.55)', margin: '0 0 28px' }}
            >
              {result.message} If you think this is a mistake, join the waitlist again and we will send a fresh confirmation link.
            </p>

            <a
              href="/coming-soon"
              style={{
                display:       'inline-block',
                borderRadius:  '64px',
                backgroundColor: '#ffffff',
                color:         '#000000',
                fontSize:      '14px',
                fontWeight:    500,
                padding:       '12px 24px',
                textDecoration: 'none',
                cursor:        'pointer',
              }}
            >
              Back to waitlist
            </a>
          </>
        )}
      </div>

      {/* Footer note */}
      <p
        className="mt-10"
        style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}
      >
        © {new Date().getFullYear()} Barons Digital · Dar es Salaam, Tanzania
      </p>
    </div>
  )
}
