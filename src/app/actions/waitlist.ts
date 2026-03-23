'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export type WaitlistState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = (formData.get('email') as string | null)?.trim().toLowerCase()
  const name = (formData.get('name') as string | null)?.trim() || null
  const company = (formData.get('company') as string | null)?.trim() || null
  const website = (formData.get('website') as string | null)?.trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  if (website) {
    return { status: 'success', message: 'You are on the list. We will be in touch.' }
  }

  try {
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('waitlist')
      .insert({ email, name, company })

    if (error) {
      if (error.code === '23505') {
        return { status: 'error', message: 'You are already on the waitlist.' }
      }

      console.error('[waitlist]', error)
      return { status: 'error', message: 'Something went wrong. Please try again.' }
    }

    return { status: 'success', message: 'You are on the list. We will be in touch.' }
  } catch (error) {
    console.error('[waitlist:unexpected]', error)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}
