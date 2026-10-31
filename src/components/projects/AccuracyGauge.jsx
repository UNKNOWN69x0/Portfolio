import { motion, useReducedMotion } from 'framer-motion'

const SIZE = 240
const CENTER = SIZE / 2
const RADIUS = 96
const START = 135
const SWEEP = 270

const point = (deg, r = RADIUS) => {
  const rad = (deg * Math.PI) / 180
  return [CENTER + r * Math.cos(rad), CENTER + r * Math.sin(rad)]
}

const [sx, sy] = point(START)
const [ex, ey] = point(START + SWEEP)
const ARC = `M${sx} ${sy}A${RADIUS} ${RADIUS} 0 1 1 ${ex} ${ey}`

// Scale marks only: one every 10 points of the 0 to 100 scale.
const TICKS = Array.from({ length: 11 }, (_, i) => START + (SWEEP * i) / 10)

// 270 degree dial on a 0 to 100 scale. `value` and `label` come straight from content.js.
export default function AccuracyGauge({ value, label }) {
  const reduce = useReducedMotion()
  const shared = {
    d: ARC,
    pathLength: 100,
    strokeDasharray: `${value} 100`,
    stroke: '#FF3B30',
    strokeWidth: 10,
    strokeLinecap: 'round',
    style: { filter: 'drop-shadow(0 0 6px rgba(255,59,48,0.7))' },
  }

  return (
    <svg
      role="img"
      aria-label={`${value}% ${label}`}
      viewBox={`0 0 ${SIZE} 218`}
      className="w-full max-w-[15rem]"
      fill="none"
    >
      {TICKS.map((deg) => {
        const [x1, y1] = point(deg, RADIUS - 14)
        const [x2, y2] = point(deg, RADIUS - 20)
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity="0.25" />
      })}

      <path d={ARC} stroke="#fff" strokeOpacity="0.1" strokeWidth="10" strokeLinecap="round" />

      {reduce ? (
        <path {...shared} />
      ) : (
        <motion.path
          {...shared}
          initial={{ strokeDashoffset: value }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <text
        x={CENTER}
        y={CENTER + 6}
        textAnchor="middle"
        fill="#F2F4F7"
        className="font-display"
        fontSize="42"
        fontWeight="700"
      >
        {value}%
      </text>
      <text
        x={CENTER}
        y={CENTER + 30}
        textAnchor="middle"
        fill="#8A90A0"
        className="font-mono uppercase"
        fontSize="14"
        letterSpacing="2"
      >
        {label}
      </text>
      <text x={sx} y={sy + 26} textAnchor="middle" fill="#8A90A0" className="font-mono" fontSize="13">
        0
      </text>
      <text x={ex} y={ey + 26} textAnchor="middle" fill="#8A90A0" className="font-mono" fontSize="13">
        100
      </text>
    </svg>
  )
}
