import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

// Lap-progress bar pinned to the top of the viewport.
// Hidden entirely when the user prefers reduced motion.
export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-kerb"
      style={{ scaleX }}
    />
  )
}
