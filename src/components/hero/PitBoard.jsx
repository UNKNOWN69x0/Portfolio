import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import useMediaQuery from '../../hooks/useMediaQuery.js'
import GlassPanel from '../ui/GlassPanel.jsx'

const TILT_QUERY = '(min-width: 768px) and (hover: hover) and (pointer: fine)'
const MAX_TILT = 12 // degrees

// Pit-board styled card with a 3D tilt that follows the mouse (desktop, fine pointer only).
// The lap counter is decorative: it ticks once each time the dot on the track completes a loop.
export default function PitBoard({ name, city, lap }) {
  const reduce = useReducedMotion()
  const canTilt = useMediaQuery(TILT_QUERY) && !reduce

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 180, damping: 18 })
  const springY = useSpring(rotY, { stiffness: 180, damping: 18 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotY.set(px * MAX_TILT * 2)
    rotX.set(-py * MAX_TILT * 2)
  }
  const onLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <m.div
      className="w-full max-w-md"
      style={canTilt ? { rotateX: springX, rotateY: springY, transformPerspective: 900 } : undefined}
      onMouseMove={canTilt ? onMove : undefined}
      onMouseLeave={canTilt ? onLeave : undefined}
    >
      <GlassPanel accent cut={22} innerClassName="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="hud-label text-telemetry">Pit board</span>
          <span className="hud-label flex items-center gap-2 text-kerb-light" aria-hidden="true">
            <span className="pulse-dot h-2 w-2 rounded-full bg-kerb shadow-glow-sm" />
            Live
          </span>
        </div>

        <p className="mt-5 font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
          {name}
        </p>
        {city && (
          <p className="hud-label mt-2 flex items-center gap-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-kerb-light"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {city}
          </p>
        )}

        <div
          aria-hidden="true"
          className="mt-6 flex items-end justify-between border-t border-white/10 pt-4"
        >
          <span className="hud-label">Lap</span>
          <span className="font-display text-5xl font-bold italic leading-none tabular-nums text-kerb text-glow sm:text-6xl">
            {String(lap).padStart(2, '0')}
          </span>
        </div>
      </GlassPanel>
    </m.div>
  )
}
