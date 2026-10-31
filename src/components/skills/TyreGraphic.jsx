import { motion, useReducedMotion } from 'framer-motion'

// Original tyre illustration: tread blocks, plain sidewall, compound-coloured ring, five-spoke rim.
// `blocks` varies the tread pattern per compound.
export default function TyreGraphic({ color, blocks = 32, grooves = false, className = '' }) {
  const reduce = useReducedMotion()
  const step = 360 / blocks

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none">
      <motion.g
        style={{ transformOrigin: '100px 100px' }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 60, ease: 'linear', repeat: Infinity }}
      >
        <circle cx="100" cy="100" r="96" fill="#0A0B0F" stroke="#fff" strokeOpacity="0.14" strokeWidth="1.5" />
        {Array.from({ length: blocks }, (_, i) => (
          <rect
            key={i}
            x="96.5"
            y="5"
            width="7"
            height="13"
            rx="1.5"
            fill="#1E212B"
            transform={`rotate(${i * step} 100 100)`}
          />
        ))}
        {grooves && (
          <>
            <circle cx="100" cy="100" r="86" stroke="#000" strokeWidth="2" />
            <circle cx="100" cy="100" r="80" stroke="#000" strokeWidth="1.5" />
          </>
        )}
        <circle cx="100" cy="100" r="74" fill="#12141A" stroke="#fff" strokeOpacity="0.08" />
        <circle cx="100" cy="100" r="66" stroke={color} strokeWidth="6" style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
        <circle cx="100" cy="100" r="56" stroke="#fff" strokeOpacity="0.08" strokeWidth="1" />
        <circle cx="100" cy="100" r="44" fill="#1B1E27" stroke="#fff" strokeOpacity="0.22" strokeWidth="2" />
        {[0, 72, 144, 216, 288].map((a) => (
          <path
            key={a}
            d="M95 100 L92 58 Q100 54 108 58 L105 100 Z"
            fill="#2A2E3A"
            stroke="#fff"
            strokeOpacity="0.15"
            transform={`rotate(${a} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="9" fill="#0A0B0F" stroke={color} strokeWidth="2" />
      </motion.g>
    </svg>
  )
}
