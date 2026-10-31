import { motion, useReducedMotion } from 'framer-motion'

export const ACCENT = {
  education: '#22D3EE',
  project: '#FF3B30',
  competition: '#FFD23F',
  graduation: '#F2F4F7',
}

// Original circuit-marker shapes, one per entry type. Graduation is a checkered finish node.
function Shape({ type, color }) {
  const common = { fill: '#0B0C10', stroke: color, strokeWidth: 2, strokeLinejoin: 'round' }
  if (type === 'project') {
    return (
      <>
        <path d="M9 24V6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M9 6h14l-4 5 4 5H9z" {...common} fill={color} />
      </>
    )
  }
  if (type === 'competition') {
    return (
      <>
        <path d="M16 3l11 13-11 13L5 16z" {...common} />
        <path d="M16 10l5 6-5 6-5-6z" fill={color} />
      </>
    )
  }
  if (type === 'graduation') {
    return (
      <>
        <rect x="4" y="4" width="24" height="24" rx="2" {...common} />
        {[0, 1, 2, 3].flatMap((r) =>
          [0, 1, 2, 3].map(
            (c) =>
              (r + c) % 2 === 0 && (
                <rect key={`${r}${c}`} x={4 + c * 6} y={4 + r * 6} width="6" height="6" fill={color} />
              ),
          ),
        )}
      </>
    )
  }
  return (
    <>
      <circle cx="16" cy="16" r="11" {...common} />
      <circle cx="16" cy="16" r="4.5" fill={color} />
      <path d="M16 2v5M16 25v5M2 16h5M25 16h5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </>
  )
}

export default function RoundNode({ type }) {
  const reduce = useReducedMotion()
  const color = ACCENT[type]

  return (
    <span className="relative flex h-9 w-9 items-center justify-center">
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-1 rounded-full"
          style={{ border: `2px solid ${color}` }}
          initial={{ scale: 1, opacity: 0 }}
          whileInView={{ scale: [1, 1, 2.4], opacity: [0, 0.9, 0] }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.1, times: [0, 0.3, 1], ease: 'easeOut' }}
        />
      )}
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="relative h-8 w-8"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        fill="none"
      >
        <Shape type={type} color={color} />
      </svg>
    </span>
  )
}
