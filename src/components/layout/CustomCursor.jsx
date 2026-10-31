import { useEffect, useState } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const INTERACTIVE =
  'a, button, [role="button"], summary, label[for], select, input[type="submit"], input[type="button"]'

// Mounted for desktop with a real mouse only (see App); reduced motion keeps the native cursor.
export default function CustomCursor() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 })

  useEffect(() => {
    if (reduce) return undefined
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e) => {
      setHovering(e.target instanceof Element && !!e.target.closest(INTERACTIVE))
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [reduce, x, y])

  if (reduce) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[200]">
      <m.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <m.div
          className="-ml-3.5 -mt-3.5 h-7 w-7 rounded-full border-2 border-kerb shadow-glow-sm will-change-transform"
          animate={{
            scale: pressed ? 0.8 : hovering ? 1.9 : 1,
            opacity: visible ? (hovering ? 0.85 : 1) : 0,
          }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        />
      </m.div>
      <m.div
        className="absolute left-0 top-0 -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-kerb"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
    </div>
  )
}
