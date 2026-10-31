import { useRef } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { sections } from '../../data/content.js'
import useActiveSection from '../../hooks/useActiveSection.js'
import GlassPanel from '../ui/GlassPanel.jsx'

const MAX_KMH = 350
const PX_PER_KMH = 9 // scroll speed (px/s) / 9 ~ "km/h"

const pad = (n) => String(n).padStart(3, '0')

// Fixed side rail, desktop (xl) only: scroll-speed readout, lap progress, current sector.
// Under reduced motion it shows only the sector label, static.
export default function TelemetryHUD() {
  const reduce = useReducedMotion()
  const activeId = useActiveSection()
  const active = sections.find((s) => s.id === activeId) ?? sections[0]

  const speedRef = useRef(null)
  const { scrollY, scrollYProgress } = useScroll()
  const velocity = useVelocity(scrollY)
  const absVelocity = useTransform(velocity, (v) => Math.abs(v))
  const smoothed = useSpring(absVelocity, { stiffness: 90, damping: 28 })
  const kmh = useTransform(smoothed, (v) => Math.min(MAX_KMH, Math.round(v / PX_PER_KMH)))
  const lap = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Write straight to the DOM node: no React re-render per frame.
  useMotionValueEvent(kmh, 'change', (n) => {
    if (!reduce && speedRef.current) speedRef.current.textContent = pad(n)
  })

  return (
    <aside
      aria-label="Telemetry"
      className="pointer-events-none fixed bottom-6 right-2 top-24 z-40 hidden w-12 xl:block"
    >
      <GlassPanel cut={10} className="h-full" innerClassName="flex flex-col items-center py-3">
        {/* speed */}
        <div className="text-center font-mono leading-none" aria-hidden="true">
          <span
            ref={speedRef}
            className="block w-9 text-[15px] font-medium tabular-nums text-hard text-glow"
          >
            000
          </span>
          <span className="mt-1 block text-[8px] tracking-widest text-muted">KM/H</span>
        </div>

        {/* lap progress */}
        <div className="relative my-3 w-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
          {!reduce && (
            <motion.div
              className="absolute inset-0 origin-top bg-kerb shadow-glow-sm"
              style={{ scaleY: lap }}
            />
          )}
        </div>

        {/* sector */}
        <div className="text-center font-mono leading-none">
          <span className="block text-[8px] tracking-widest text-muted">SECTOR</span>
          <span className="mt-1 block text-lg font-semibold text-kerb text-glow">
            {active.sector}
          </span>
          <span className="mt-2 block text-[9px] uppercase tracking-[0.2em] text-telemetry [writing-mode:vertical-rl]">
            {active.eyebrow}
          </span>
        </div>
      </GlassPanel>
    </aside>
  )
}
