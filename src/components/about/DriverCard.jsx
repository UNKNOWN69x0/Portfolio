import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { profile } from '../../data/content.js'
import useMediaQuery from '../../hooks/useMediaQuery.js'
import GlassPanel from '../ui/GlassPanel.jsx'
import HelmetGraphic from './HelmetGraphic.jsx'

// Tilt is desktop mouse only, like the custom cursor.
const TILT_QUERY = '(min-width: 768px) and (hover: hover) and (pointer: fine)'
const MAX_TILT = 4

export const driverCode = (name) => name.split(' ').at(-1).slice(0, 3).toUpperCase()

function Field({ label, children }) {
  return (
    <div className="border-t border-white/10 py-3 last:pb-0">
      <dt className="hud-label">{label}</dt>
      <dd className="mt-1 text-base text-hard">{children}</dd>
    </div>
  )
}

export default function DriverCard() {
  const reduce = useReducedMotion()
  const canTilt = useMediaQuery(TILT_QUERY) && !reduce

  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const rotateX = useSpring(targetX, { stiffness: 160, damping: 20 })
  const rotateY = useSpring(targetY, { stiffness: 160, damping: 20 })

  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    targetY.set(((e.clientX - box.left) / box.width - 0.5) * 2 * MAX_TILT)
    targetX.set(((e.clientY - box.top) / box.height - 0.5) * -2 * MAX_TILT)
  }
  const onLeave = () => {
    targetX.set(0)
    targetY.set(0)
  }

  return (
    <m.div
      className="h-full"
      style={canTilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      onPointerMove={canTilt ? onMove : undefined}
      onPointerLeave={canTilt ? onLeave : undefined}
    >
      <GlassPanel accent cut={22} className="h-full" innerClassName="pad-fluid">
        <div className="flex items-center justify-between gap-4">
          <p className="hud-label">Driver card</p>
          <span className="-skew-x-12 bg-kerb px-2.5 py-0.5 font-display text-base font-bold text-carbon shadow-glow-sm">
            <span className="inline-block skew-x-12">{driverCode(profile.name)}</span>
          </span>
        </div>

        <div className="mt-4 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:block">
          <HelmetGraphic className="mx-auto w-full max-w-[20rem]" />

          <div className="mt-4 md:mt-0 lg:mt-4">
            <p className="text-fluid-name font-display font-bold uppercase tracking-tight text-hard">
              {profile.name}
            </p>
            {profile.title && (
              <p className="mb-4 mt-2 text-base leading-snug text-telemetry">{profile.title}</p>
            )}
            <dl>
              {profile.location && <Field label="Location">{profile.location}</Field>}
              {profile.educationSummary && <Field label="Education">{profile.educationSummary}</Field>}
            </dl>
          </div>
        </div>
      </GlassPanel>
    </m.div>
  )
}
