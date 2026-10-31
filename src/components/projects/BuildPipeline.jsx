import { m, useReducedMotion } from 'framer-motion'

// Non-numeric build flow. Nodes are sector labels, not measurements.
export default function BuildPipeline({ steps }) {
  const reduce = useReducedMotion()

  return (
    <ol>
      {steps.map(({ label, detail }, i) => (
        <m.li
          key={label}
          className="pipeline-step"
          initial={reduce ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span aria-hidden="true" className="pipeline-node chamfer">
            S{i + 1}
          </span>
          <span className="block font-display text-base font-semibold uppercase tracking-wide text-hard">
            {label}
          </span>
          <span className="block text-base leading-snug text-hard/75">{detail}</span>
        </m.li>
      ))}
    </ol>
  )
}
