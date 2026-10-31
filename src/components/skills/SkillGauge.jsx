import { motion, useReducedMotion } from 'framer-motion'

const SIZE = 240
const C = SIZE / 2
const R = 92
const START = 135
const SWEEP = 270

const point = (deg, r = R) => {
  const rad = (deg * Math.PI) / 180
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)]
}
const [sx, sy] = point(START)
const [ex, ey] = point(START + SWEEP)
const ARC = `M${sx} ${sy}A${R} ${R} 0 1 1 ${ex} ${ey}`
const TICKS = Array.from({ length: 9 }, (_, i) => START + (SWEEP * i) / 8)

// Decorative level dial. `fraction` (0 to 1) is a fixed needle position, not a measurement:
// no numbers are drawn, and the readout is the group label rendered by the parent.
export default function SkillGauge({ fraction, color, className = '' }) {
  const reduce = useReducedMotion()
  const angle = START + SWEEP * fraction
  const dash = fraction * 100
  const arcProps = {
    d: ARC,
    pathLength: 100,
    stroke: color,
    strokeWidth: 10,
    strokeLinecap: 'round',
    strokeDasharray: `${dash} 100`,
    style: { filter: `drop-shadow(0 0 6px ${color})` },
  }

  return (
    <svg viewBox={`0 0 ${SIZE} 200`} aria-hidden="true" className={className} fill="none">
      {TICKS.map((deg) => {
        const [x1, y1] = point(deg, R - 14)
        const [x2, y2] = point(deg, R - 22)
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity="0.28" strokeWidth="2" />
      })}
      <path d={ARC} stroke="#fff" strokeOpacity="0.1" strokeWidth="10" strokeLinecap="round" />

      {reduce ? (
        <path {...arcProps} />
      ) : (
        <motion.path
          {...arcProps}
          initial={{ strokeDashoffset: dash }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {reduce ? (
        <g transform={`rotate(${angle} ${C} ${C})`}>
          <path d={`M${C - 12} ${C - 3}L${C + R - 26} ${C}L${C - 12} ${C + 3}Z`} fill={color} />
        </g>
      ) : (
        <motion.g
          style={{ transformOrigin: `${C}px ${C}px` }}
          initial={{ rotate: START }}
          whileInView={{ rotate: angle }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d={`M${C - 12} ${C - 3}L${C + R - 26} ${C}L${C - 12} ${C + 3}Z`} fill={color} />
        </motion.g>
      )}
      <circle cx={C} cy={C} r="9" fill="#15171E" stroke={color} strokeWidth="3" />
    </svg>
  )
}
