'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export type ContactState = {
  status: 'idle' | 'pending' | 'success' | 'error'
  message: string
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name    = (formData.get('name')    as string | null)?.trim()
  const email   = (formData.get('email')   as string | null)?.trim().toLowerCase()
  const phone   = (formData.get('phone')   as string | null)?.trim() || null
  const message = (formData.get('message') as string | null)?.trim() || null
  const website = (formData.get('website') as string | null)?.trim() // honeypot

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid name and email address.' }
  }

  // Silently drop bots
  if (website) {
    return { status: 'success', message: 'Thank you for your message! We will get back to you soon.' }
  }

  try {
    const supabase = createAdminClient()

    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone,
        message,
      })

    if (dbError) {
      console.error('[contact:insert] code=%s message=%s', dbError.code, dbError.message)
      return { status: 'error', message: `Database error: ${dbError.message}` }
    }

    return {
      status:  'success',
      message: 'Thank you for your message! We will get back to you soon.',
    }
  } catch (err) {
    console.error('[contact:unexpected]', err)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}
