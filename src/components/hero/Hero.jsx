import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { profile, sections } from '../../data/content.js'
import StartLights from './StartLights.jsx'
import TrackBackground from './TrackBackground.jsx'
import SpeedLines from './SpeedLines.jsx'
import NameReveal from './NameReveal.jsx'
import PitBoard from './PitBoard.jsx'
import HeroButtons from './HeroButtons.jsx'
import Appear from './Appear.jsx'

// Intro timing (ms). The page-load wipe finishes at ~1s, so the lights start just after it.
const FIRST_LIGHT = 1100
const LIGHT_GAP = 500
const LIGHTS = 5
const HOLD = 1200
const GO_TO_DONE = 700

const hero = sections.find((s) => s.id === 'hero')
const city = profile.location?.split(',')[0].trim()
// A link straight to a section should not sit behind the intro.
const deepLink = !['', '#hero'].includes(window.location.hash)

export default function Hero() {
  const reduce = useReducedMotion()
  // 'intro' (lights) -> 'go' (lights out: flash + shake) -> 'done'. Plays once per page load.
  const [phase, setPhase] = useState(reduce || deepLink ? 'done' : 'intro')
  const [lit, setLit] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const [lap, setLap] = useState(1)

  const skip = useCallback(() => {
    setSkipped(true)
    setLit(0)
    setPhase('done')
  }, [])
  const onLap = useCallback(() => setLap((n) => n + 1), [])

  // light sequence
  useEffect(() => {
    if (phase !== 'intro') return undefined
    const timers = []
    for (let i = 1; i <= LIGHTS; i += 1) {
      timers.push(setTimeout(() => setLit(i), FIRST_LIGHT + (i - 1) * LIGHT_GAP))
    }
    timers.push(
      setTimeout(() => setPhase('go'), FIRST_LIGHT + (LIGHTS - 1) * LIGHT_GAP + HOLD),
    )
    return () => timers.forEach(clearTimeout)
  }, [phase])

  useEffect(() => {
    if (phase !== 'go') return undefined
    setLit(0)
    const t = setTimeout(() => setPhase('done'), GO_TO_DONE)
    return () => clearTimeout(t)
  }, [phase])

  // no scrolling or tabbing behind the intro while it covers the page; Escape skips it
  useEffect(() => {
    if (phase !== 'intro') return undefined
    const html = document.documentElement
    const root = document.getElementById('root')
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    root.inert = true
    const onKey = (e) => e.key === 'Escape' && skip()
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prev
      root.inert = false
      window.removeEventListener('keydown', onKey)
    }
  }, [phase, skip])

  const revealed = phase !== 'intro'
  const shake = phase === 'go' && !skipped
  const [firstSentence, ...restSentences] = (profile.tagline || '').split('. ')

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-5.5rem)] items-center overflow-hidden"
    >
      {/* portal: must stack above the sticky header and HUD, outside <main>'s stacking context */}
      {createPortal(
        <AnimatePresence>
          {!reduce && phase !== 'done' && (
            <StartLights lit={lit} go={phase === 'go'} skipped={skipped} onSkip={skip} />
          )}
        </AnimatePresence>,
        document.body,
      )}

      <TrackBackground run={revealed} onLap={onLap} />
      <SpeedLines />

      <m.div
        className="container-page relative z-10 py-14 sm:py-20 lg:py-24"
        animate={
          shake
            ? { x: [0, -10, 9, -7, 5, -2, 0], y: [0, 6, -8, 4, -3, 1, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {hero && (
          <Appear revealed={revealed} fast={skipped} delay={0.05} x={-16} y={0}>
            <p className="eyebrow mb-3">
              <span className="sector-chip">{hero.sector}</span>
              {hero.eyebrow}
            </p>
          </Appear>
        )}

        <NameReveal name={profile.name} revealed={revealed} fast={skipped} />

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            {profile.tagline && (
              <Appear revealed={revealed} fast={skipped} delay={1.0} x={-32} y={0}>
                <p className="max-w-xl text-xl font-medium leading-snug text-hard sm:text-2xl">
                  {firstSentence}
                  {restSentences.length > 0 && (
                    <>
                      .{' '}
                      <span className="text-muted">{restSentences.join('. ')}</span>
                    </>
                  )}
                </p>
              </Appear>
            )}

            {(profile.title || profile.location) && (
              <Appear revealed={revealed} fast={skipped} delay={1.3} x={-24} y={0}>
                <div className="mt-5 space-y-1 font-mono text-sm uppercase tracking-wider">
                  {profile.title && <p className="text-hard">{profile.title}</p>}
                  {profile.location && <p className="text-muted">{profile.location}</p>}
                </div>
              </Appear>
            )}

            <Appear revealed={revealed} fast={skipped} delay={1.6} y={20} className="mt-8">
              <HeroButtons />
            </Appear>
          </div>

          <Appear
            revealed={revealed}
            fast={skipped}
            delay={1.5}
            x={40}
            y={0}
            className="flex lg:justify-end"
          >
            <PitBoard name={profile.name} city={city} lap={lap} />
          </Appear>
        </div>
      </m.div>
    </section>
  )
}
