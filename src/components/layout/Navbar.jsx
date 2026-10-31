import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
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

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
  )
}

export default function Navbar() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const onPointer = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-carbon/90 md:bg-carbon/80 md:backdrop-blur-md"
    >
      <nav aria-label="Primary" className="container-page flex h-14 items-center justify-between gap-4">
        <a href="#hero" className="flex min-h-[44px] min-w-[44px] items-center gap-3" onClick={() => setOpen(false)}>
          <span aria-hidden="true" className="-skew-x-12 bg-kerb px-2.5 py-1 font-display text-lg font-bold text-carbon shadow-glow-sm">
            <span className="inline-block skew-x-12">{initials(profile.name)}</span>
          </span>
          <span className="sr-only whitespace-nowrap font-display text-sm font-semibold uppercase tracking-widest lg:not-sr-only">
            {profile.name}
          </span>
          <span className="sr-only">, back to top</span>
        </a>

        {/* Desktop: timing-bar cells */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map(({ id, nav, sector }) => {
            const current = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current ? 'location' : undefined}
                  className={`flex min-h-[44px] items-center gap-2 border-b-2 px-2 font-mono text-xs uppercase tracking-wider transition-colors lg:px-3 ${
                    current ? 'border-kerb text-hard' : 'border-transparent text-muted hover:text-hard'
                  }`}
                >
                  <span className={current ? 'text-kerb-light' : 'text-telemetry'}>{sector}</span>
                  {nav}
                </a>
              </li>
            )
          })}
          {profile.resumeUrl && (
            <li className="ml-2">
              <a
                href={profile.resumeUrl}
                download
                aria-label="Download resume (PDF)"
                className="plate plate-sm border-kerb"
              >
                <span className="!gap-2">
                  <DownloadIcon />
                  Resume
                </span>
              </a>
            </li>
          )}
        </ul>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
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

      <TimingTicker />

      {/* Overlays the page (no layout shift) and scrolls on short landscape screens */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain border-b border-white/10 bg-asphalt shadow-[0_16px_24px_rgba(0,0,0,0.5)] md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <ul>
              {navItems.map(({ id, nav, sector }) => (
                <li key={id} className="border-b border-white/5 last:border-b-0">
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'location' : undefined}
                    onClick={() => setOpen(false)}
                    className={`container-page flex min-h-[48px] items-center gap-3 font-mono text-sm uppercase tracking-wider ${
                      active === id ? 'text-hard' : 'text-muted'
                    }`}
                  >
                    <span className={active === id ? 'text-kerb-light' : 'text-telemetry'}>{sector}</span>
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
                    className="container-page flex min-h-[48px] items-center gap-3 font-mono text-sm uppercase tracking-wider text-kerb-light"
                  >
                    <DownloadIcon />
                    Download Resume
                  </a>
                </li>
              )}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
