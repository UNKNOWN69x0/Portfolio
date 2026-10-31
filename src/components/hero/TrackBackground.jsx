import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

// Original abstract circuit outline (not modelled on any real track).
const TRACK =
  'M120 420 C100 300 140 200 260 180 L480 150 C560 140 600 90 680 90 C780 90 800 170 740 230 C700 270 700 300 760 320 C860 350 900 430 840 500 C780 560 640 540 560 500 C480 460 420 520 340 530 C230 545 140 500 120 420 Z'

const LAP_SECONDS = 14
const TRAIL = 4 // dots: one head + trailing dots
const DRAW_MS = 2000 // matches .track-seg: 60 slices, 30ms apart, 200ms fade
const SEGMENTS = Array.from({ length: 60 }, (_, i) => i)

// The racing line appears slice by slice once `run` turns true (opacity only, no stroke
// animation), then a glowing dot loops around it, paused while the hero is off screen.
// Under reduced motion: the finished outline with a static dot at the start line.
export default function TrackBackground({ run, onLap }) {
  const reduce = useReducedMotion()
  const svgRef = useRef(null)
  const motionRefs = useRef([])
  const [started, setStarted] = useState(false)
  const [moving, setMoving] = useState(false)

  // start the dot after the outline has finished drawing
  useEffect(() => {
    if (reduce || !run) return undefined
    const t = setTimeout(() => setStarted(true), DRAW_MS)
    return () => clearTimeout(t)
  }, [run, reduce])

  useEffect(() => {
    if (!started) return undefined
    const els = motionRefs.current
    try {
      els.forEach((el, i) => el.beginElementAt(-i * 0.12))
      setMoving(true)
    } catch {
      return undefined // SMIL unavailable: dots stay hidden, outline still shows
    }
    const head = els[0]
    const handler = () => onLap?.()
    head.addEventListener('repeatEvent', handler)
    return () => head.removeEventListener('repeatEvent', handler)
  }, [started, onLap])

  useEffect(() => {
    if (!moving) return undefined
    const svg = svgRef.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [moving])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-50 lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[68%]"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        fill="none"
      >
        {/* track surface */}
        <m.path
          d={TRACK}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="22"
          strokeLinejoin="round"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: run || reduce ? 1 : 0 }}
          transition={{ duration: DRAW_MS / 1000, ease: 'easeInOut' }}
        />
        {/* glowing racing line */}
        <g
          stroke="#ff3b30"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="md:[filter:drop-shadow(0_0_6px_rgba(255,59,48,0.85))]"
        >
          {started || reduce ? (
            <path d={TRACK} />
          ) : (
            <g className={run ? 'track-run' : undefined}>
              {SEGMENTS.map((i) => (
                <path
                  key={i}
                  className="track-seg"
                  d={TRACK}
                  pathLength={SEGMENTS.length}
                  strokeDasharray={`1.05 ${SEGMENTS.length}`}
                  strokeDashoffset={-i}
                  style={{ '--i': i }}
                />
              ))}
            </g>
          )}
        </g>
        {/* start/finish tick */}
        <line x1="108" y1="432" x2="132" y2="408" stroke="#f2f4f7" strokeWidth="3" opacity="0.7" />

        {reduce ? (
          <circle cx="120" cy="420" r="6" fill="#fff" />
        ) : (
          started &&
          Array.from({ length: TRAIL }, (_, i) => (
            <circle
              key={i}
              cx="0"
              cy="0"
              r={6 - i}
              fill={i === 0 ? '#ffffff' : '#ff3b30'}
              opacity={moving ? 1 - i * 0.25 : 0}
              className={i === 0 ? 'md:[filter:drop-shadow(0_0_8px_rgba(255,59,48,1))]' : ''}
            >
              <animateMotion
                ref={(el) => {
                  motionRefs.current[i] = el
                }}
                dur={`${LAP_SECONDS}s`}
                repeatCount="indefinite"
                begin="indefinite"
                path={TRACK}
              />
            </circle>
          ))
        )}
      </svg>
    </div>
  )
}
