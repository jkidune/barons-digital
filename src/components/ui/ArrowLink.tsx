import Link from 'next/link'
import { cn } from '@/utils/cn'

interface ArrowLinkProps {
  href:      string
  label:     string
  className?: string
  color?:    'dark' | 'light'
  weight?:   'normal' | 'bold'
}

export default function ArrowLink({
  href,
  label,
  className,
  color  = 'dark',
  weight = 'normal',
}: ArrowLinkProps) {
  const isDark = color === 'dark'

  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-[10px] group', className)}
    >
      {/* Arrow */}
      <span
        className={cn(
          'flex items-center justify-center w-7 h-7 transition-transform duration-300 group-hover:translate-x-1',
          isDark ? 'text-bd-black' : 'text-bd-light'
        )}
        aria-hidden="true"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M3 9H15M15 9L9 3M15 9L9 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Label + animated underline */}
      <span
        className={cn(
          'relative tracking-[-0.01em]',
          weight === 'bold' ? 'font-bold' : 'font-normal',
          'text-body-bd',
          isDark ? 'text-bd-black' : 'text-bd-light'
        )}
      >
        {label}
        {/* Underline: 0 width → full on hover */}
        <span
          className={cn(
            'absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-out',
            isDark ? 'bg-bd-black' : 'bg-bd-light'
          )}
        />
      </span>
    </Link>
  )
}
