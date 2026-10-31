import { motion, useReducedMotion } from 'framer-motion'
import CheckeredDivider from './CheckeredDivider.jsx'

const LINES = [
  { top: '20%', delay: 0 },
  { top: '50%', delay: 0.08 },
  { top: '78%', delay: 0.16 },
]

// Section-to-section transition: speed lines streak across, then the chequered
// strip wipes in. Transform/opacity only. Static chequered strip under reduced motion.
export default function SectionTransition() {
  const reduce = useReducedMotion()
  if (reduce) return <CheckeredDivider />

  return (
    <motion.div
      aria-hidden="true"
      className="relative"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.9 }}
    >
      {/* speed lines: desktop only */}
      <div className="relative hidden h-8 overflow-hidden md:block">
        {LINES.map(({ top, delay }) => (
          <motion.span
            key={top}
            className="absolute left-0 h-0.5 w-1/3 bg-gradient-to-r from-transparent via-kerb to-transparent shadow-glow-sm"
            style={{ top }}
            variants={{
              hidden: { x: '-100%', opacity: 0 },
              show: {
                x: '320%',
                opacity: [0, 1, 0],
                transition: { duration: 0.75, delay, ease: 'easeOut' },
              },
            }}
          />
        ))}
      </div>
      {/* chequered wipe */}
      <motion.div
        style={{ originX: 0 }}
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
        }}
      >
        <CheckeredDivider />
      </motion.div>
    </motion.div>
  )
}
