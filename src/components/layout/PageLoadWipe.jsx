import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

// One-time red wipe with a chequered trailing edge. Never blocks input and is
// not rendered at all under reduced motion.
export default function PageLoadWipe() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)

  if (reduce || done) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <m.div
        className="absolute inset-0 bg-kerb will-change-transform"
        initial={{ x: '0%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 0.85, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => setDone(true)}
      >
        {/* chequered trailing edge */}
        <div
          className="checkered absolute right-full top-0 h-full w-8"
          style={{ '--cell': '16px' }}
        />
      </m.div>
    </div>
  )
}
