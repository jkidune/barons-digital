'use client'

import { useActionState } from 'react'
import { submitContact, type ContactState } from '@/app/actions/contact'

const field =
  'w-full border-0 border-b border-black/30 bg-transparent pb-3 text-base text-black outline-none transition placeholder:text-black/40 focus:border-black'

export default function LetsTalkForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: 'idle', message: '' })

  return (
    <form action={action} className="grid gap-8">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="lt-website">Website</label>
        <input id="lt-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input name="service" type="hidden" value="Something else" />
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="grid gap-3 text-sm font-medium">
          Full name
          <input className={field} name="name" autoComplete="name" required />
        </label>
        <label className="grid gap-3 text-sm font-medium">
          E-mail
          <input className={field} name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className="grid gap-3 text-sm font-medium">
        Tell us about the project
        <input className={field} name="message" required />
      </label>
      {state.message && (
        <p aria-live="polite" className={`text-sm ${state.status === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>{state.message}</p>
      )}
      <button className="w-fit bg-black px-8 py-4 text-sm font-semibold uppercase text-white transition hover:bg-black/75 disabled:opacity-50" disabled={pending} type="submit">
        {pending ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  )
}
