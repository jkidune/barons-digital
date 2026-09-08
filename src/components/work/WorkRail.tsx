'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Project } from '@/data/project'

function RailItem({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === `/work/${project.slug}`

  return (
    <li className="border-b border-black/10">
      <div className="flex items-start gap-3 py-4">
        <Link className="flex min-w-0 flex-1 items-start gap-3" href={`/work/${project.slug}`}>
          <div className="relative size-8 shrink-0 overflow-hidden bg-black/5">
            <Image alt="" className="object-cover" fill sizes="32px" src={project.icon} />
          </div>
          <div className="min-w-0">
            <p className={`truncate text-[0.85rem] ${isActive ? 'font-medium text-black' : 'text-black/70'}`}>{project.title}</p>
            <p className="mt-0.5 text-[0.7rem] text-[#696764]">{project.category}</p>
          </div>
        </Link>
        <button
          aria-expanded={open}
          aria-label={open ? 'Hide description' : 'Show description'}
          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] bg-black text-white"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <span className="text-[0.7rem] leading-none">{open ? '−' : '+'}</span>
        </button>
      </div>
      {open && <p className="mb-4 max-w-[15rem] text-[0.78rem] leading-[1.5] text-[#696764]">{project.summary?.[0]}</p>}
    </li>
  )
}

export default function WorkRail({ groups }: { groups: { industry: string; projects: Project[] }[] }) {
  return (
    <nav aria-label="All case studies">
      {groups.map((group) => (
        <div className="mb-2" key={group.industry}>
          <p className="pb-1 pt-4 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[#696764]">{group.industry}</p>
          <ul>
            {group.projects.map((project) => (
              <RailItem key={project.slug} project={project} />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
