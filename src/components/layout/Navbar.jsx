import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, sections } from '../../data/content.js'
import useActiveSection from '../../hooks/useActiveSection.js'
import TimingTicker from './TimingTicker.jsx'

const navItems = sections.filter((s) => s.id !== 'hero')

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Navbar() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-carbon/80 backdrop-blur-sm md:backdrop-blur-md">
      <nav aria-label="Primary" className="container-page flex h-14 items-center justify-between">
        <a
          href="#hero"
          aria-label={`${profile.name}, back to top`}
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="-skew-x-12 bg-kerb px-2.5 py-1 font-display text-lg font-bold text-carbon shadow-glow">
            <span className="inline-block skew-x-12">{initials(profile.name)}</span>
          </span>
          <span className="hidden font-display text-sm font-semibold uppercase tracking-widest sm:inline">
            {profile.name}
          </span>
        </a>

        {/* Desktop: timing-bar cells */}
        <ul className="hidden items-stretch gap-1 md:flex">
          {navItems.map(({ id, nav, sector }) => {
            const current = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current ? 'true' : undefined}
                  className={`flex items-center gap-2 border-b-2 px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                    current
                      ? 'border-kerb text-hard shadow-[0_6px_10px_-6px_rgba(255,59,48,0.9)]'
                      : 'border-transparent text-muted hover:text-hard'
                  }`}
                >
                  <span className={current ? 'text-kerb' : 'text-telemetry'}>{sector}</span>
                  {nav}
                </a>
              </li>
            )
          })}
          {profile.resumeUrl && (
            <li className="ml-2 flex items-center">
              <a
                href={profile.resumeUrl}
                download
                aria-label="Download resume (PDF)"
                className="inline-flex min-h-[44px] items-center gap-2 border border-kerb px-3 font-mono text-xs uppercase tracking-wider text-hard transition-colors hover:bg-kerb hover:text-carbon"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
                Resume
              </a>
            </li>
          )}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span className={`h-0.5 bg-hard transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 bg-hard transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-hard transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-nav"
            className="border-t border-white/10 bg-asphalt md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {navItems.map(({ id, nav, sector }) => (
              <li key={id} className="border-b border-white/5 last:border-b-0">
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                  className={`container-page flex min-h-[48px] items-center gap-3 font-mono text-sm uppercase tracking-wider ${
                    active === id ? 'text-hard' : 'text-muted'
                  }`}
                >
                  <span className="text-kerb">{sector}</span>
                  {nav}
                </a>
              </li>
            ))}
            {profile.resumeUrl && (
              <li className="border-t border-white/5">
                <a
                  href={profile.resumeUrl}
                  download
                  aria-label="Download resume (PDF)"
                  onClick={() => setOpen(false)}
                  className="container-page flex min-h-[48px] items-center gap-3 font-mono text-sm uppercase tracking-wider text-kerb"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
                  Download Resume
                </a>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      <TimingTicker />
    </header>
  )
}
