'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContact, type ContactState } from '@/app/actions/contact'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: '100%',
        maxWidth: '200px',
        backgroundColor: '#242424',
        color: '#ffffff',
        fontWeight: 500,
        fontSize: '15px',
        padding: '14px 28px',
        borderRadius: '64px',
        border: 'none',
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.6 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      {pending ? 'Sending...' : 'Send message'}
    </button>
  )
}

export default function ContactPage() {
  const [state, formAction] = useFormState<ContactState, FormData>(submitContact, {
    status: 'idle',
    message: '',
  })

  return (
    <section className="w-full bg-white py-[80px] md:py-[100px]">
      <div className="w-full px-8 lg:px-12 xl:px-16 max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left: Contact Info */}
          <div className="flex-1">
            <div
              className="text-sm font-medium tracking-wider uppercase"
              style={{ color: '#4F4F4F', marginBottom: '12px' }}
            >
              — Get in touch
            </div>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 'clamp(48px, 6vw, 72px)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                color: '#242424',
                marginBottom: '32px',
              }}
            >
              Book a call
            </h1>

            <div className="space-y-8">
              <div>
                <div
                  className="text-sm font-medium"
                  style={{ color: '#242424', marginBottom: '8px' }}
                >
                  Email
                </div>
                <a
                  href="mailto:hello@barons-digital.com"
                  style={{
                    color: '#4F4F4F',
                    fontSize: '16px',
                    textDecoration: 'none',
                  }}
                >
                  hello@barons-digital.com
                </a>
              </div>

              <div>
                <div
                  className="text-sm font-medium"
                  style={{ color: '#242424', marginBottom: '8px' }}
                >
                  Office Address
                </div>
                <p
                  style={{
                    color: '#4F4F4F',
                    fontSize: '16px',
                    margin: 0,
                  }}
                >
                  Wazo Hill, Kinondoni, Dar es Salaam, Tanzania, 14121, TZ
                </p>
              </div>

              <div>
                <div
                  className="text-sm font-medium"
                  style={{ color: '#242424', marginBottom: '8px' }}
                >
                  Phone
                </div>
                <a
                  href="tel:+255719906205"
                  style={{
                    color: '#4F4F4F',
                    fontSize: '16px',
                    textDecoration: 'none',
                  }}
                >
                  +255 719 906 205
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1">
            <div
              className="p-6 md:p-8"
              style={{
                backgroundColor: '#fafafa',
                borderRadius: '12px',
              }}
            >
              <div
                className="flex gap-3 mb-6"
                style={{ borderBottom: '1px solid #e5e5e5' }}
              >
                <button
                  style={{
                    backgroundColor: '#242424',
                    color: '#ffffff',
                    fontWeight: 500,
                    fontSize: '15px',
                    padding: '12px 28px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Book a Call
                </button>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    color: '#242424',
                    fontWeight: 500,
                    fontSize: '15px',
                    padding: '12px 28px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Send message
                </button>
              </div>

              <form action={formAction} className="space-y-4">
                {/* Honeypot */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5',
                      fontSize: '15px',
                      color: '#242424',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#242424'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5',
                      fontSize: '15px',
                      color: '#242424',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#242424'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone (optional)"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5',
                      fontSize: '15px',
                      color: '#242424',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#242424'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5',
                      fontSize: '15px',
                      color: '#242424',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#242424'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>

                {state.message && (
                  <p
                    style={{
                      color: state.status === 'success' ? '#22c55e' : '#ef4444',
                      fontSize: '14px',
                      marginTop: '16px',
                    }}
                  >
                    {state.message}
                  </p>
                )}

                <div className="pt-2">
                  <SubmitButton />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
