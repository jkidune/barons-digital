'use server'

import { randomUUID } from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'

export type WaitlistState = {
  status: 'idle' | 'pending' | 'success' | 'error'
  message: string
}

// ── Join waitlist (step 1) ─────────────────────────────────────────────────────

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email   = (formData.get('email')   as string | null)?.trim().toLowerCase()
  const name    = (formData.get('name')    as string | null)?.trim() || null
  const company = (formData.get('company') as string | null)?.trim() || null
  const message = (formData.get('message') as string | null)?.trim() || null
  const website = (formData.get('website') as string | null)?.trim() // honeypot

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  // Silently drop bots
  if (website) {
    return { status: 'pending', message: 'Check your inbox to confirm your spot.' }
  }

  const confirmToken = randomUUID()
  const siteUrl      = process.env.NEXT_PUBLIC_SITE_URL || 'https://baronsdigital.co.tz'
  const confirmUrl   = `${siteUrl}/confirm?token=${confirmToken}`

  try {
    const supabase = createAdminClient()

    const { error: dbError } = await supabase
      .from('waitlist')
      .insert({
        email,
        name,
        company,
        message,
        confirmed:     false,
        confirm_token: confirmToken,
      })

    if (dbError) {
      if (dbError.code === '23505') {
        return { status: 'error', message: 'You are already on the waitlist.' }
      }
      console.error('[waitlist:insert]', dbError)
      return { status: 'error', message: 'Something went wrong. Please try again.' }
    }

    // Send confirmation email
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from:    'Barons Digital <hello@barons-digital.com>',
          to:      email,
          subject: 'Confirm your spot — Barons Digital',
          html:    buildConfirmationEmail({ name, confirmUrl }),
        })
      } catch (emailErr) {
        // Email failed but user is already in DB — log and continue
        console.error('[waitlist:email]', emailErr)
      }
    } else {
      console.warn('[waitlist] RESEND_API_KEY is not set — confirmation email not sent.')
    }

    return {
      status:  'pending',
      message: 'Check your inbox to confirm your spot.',
    }
  } catch (err) {
    console.error('[waitlist:unexpected]', err)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}

// ── Confirm waitlist (step 2, called from /confirm page) ──────────────────────

export async function confirmWaitlist(token: string): Promise<WaitlistState> {
  if (!token) {
    return { status: 'error', message: 'Invalid confirmation link.' }
  }

  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('waitlist')
      .update({
        confirmed:    true,
        confirmed_at: new Date().toISOString(),
      })
      .eq('confirm_token', token)
      .select('id, email, name')

    if (error) {
      console.error('[waitlist:confirm]', error)
      return { status: 'error', message: 'Something went wrong. Please try again.' }
    }

    if (!data || data.length === 0) {
      return {
        status:  'error',
        message: 'This confirmation link is invalid or has already been used.',
      }
    }

    return {
      status:  'success',
      message: 'You are on the list. We will reach out first.',
    }
  } catch (err) {
    console.error('[waitlist:confirm:unexpected]', err)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}

// ── Email template ─────────────────────────────────────────────────────────────

function buildConfirmationEmail({
  name,
  confirmUrl,
}: {
  name: string | null
  confirmUrl: string
}): string {
  const greeting = name ? `Hi ${name},` : 'Hello,'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm your spot — Barons Digital</title>
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:40px;">
              <span style="font-size:16px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">Barons Digital</span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;padding:40px;">

              <p style="margin:0 0 8px;font-size:12px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
                Waitlist Confirmation
              </p>

              <h1 style="margin:0 0 20px;font-size:28px;font-weight:500;line-height:1.2;letter-spacing:-0.02em;color:#fafafa;">
                You&rsquo;re almost in.
              </h1>

              <p style="margin:0 0 32px;font-size:15px;font-weight:400;line-height:1.7;color:rgba(255,255,255,0.65);">
                ${greeting}<br /><br />
                Thank you for joining the Barons Digital waitlist. Click the button below to confirm your spot — you&rsquo;ll be among the first to hear from us when we launch.
              </p>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:64px;background-color:#ffffff;">
                    <a href="${confirmUrl}"
                       style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:500;color:#000000;text-decoration:none;border-radius:64px;white-space:nowrap;">
                      Confirm my spot
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:32px 0 0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.25);">
                Or copy this link into your browser:<br />
                <span style="color:rgba(255,255,255,0.4);word-break:break-all;">${confirmUrl}</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:32px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);line-height:1.6;">
                If you didn&rsquo;t sign up for the Barons Digital waitlist, you can safely ignore this email.<br />
                &copy; ${new Date().getFullYear()} Barons Digital &middot; Dar es Salaam, Tanzania
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
