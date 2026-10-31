import { motion, useReducedMotion } from 'framer-motion'

// Hero reveal wrapper. Hidden until `revealed`, then slides/fades in after `delay`.
// Under reduced motion it renders in its final state with no animation.
// `hero-failsafe` forces it visible via CSS if the JS animation ever stalls.
export default function Appear({
  revealed,
  fast = false,
  delay = 0,
  x = 0,
  y = 16,
  as = 'div',
  className = '',
  children,
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={`hero-failsafe ${className}`}
      initial={reduce ? false : 'hidden'}
      animate={revealed ? 'show' : 'hidden'}
      variants={{
        hidden: { opacity: 0, x, y },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            delay: fast ? 0 : delay,
            duration: fast ? 0.2 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
