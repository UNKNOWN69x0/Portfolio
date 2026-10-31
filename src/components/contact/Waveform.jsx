import { m, useReducedMotion } from 'framer-motion'

const BARS = 28
// Fixed pseudo-random heights so the shape is stable between renders.
const SHAPE = Array.from({ length: BARS }, (_, i) => 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)))

// Decorative radio waveform: flat when idle, pulsing while `active`. Static when motion is reduced.
export default function Waveform({ active }) {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden="true" className="flex h-10 items-center gap-[3px]">
      {SHAPE.map((h, i) => {
        const animate = active && !reduce
        return (
          <m.span
            key={i}
            className="block w-[3px] flex-1 origin-center rounded-full bg-telemetry"
            style={{ height: '100%', boxShadow: '0 0 6px rgba(34,211,238,0.6)' }}
            initial={false}
            animate={{ scaleY: animate ? [0.15, h, 0.15, h * 0.7, 0.15] : active ? h : 0.08 }}
            transition={
              animate
                ? { duration: 0.9 + (i % 5) * 0.12, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.05 }
                : { duration: 0.3 }
            }
          />
        )
      })}
    </div>
  )
}
