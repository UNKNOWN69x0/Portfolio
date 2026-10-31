import { forwardRef } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import useMediaQuery from '../../hooks/useMediaQuery.js'
import AccuracyGauge from './AccuracyGauge.jsx'
import BuildPipeline from './BuildPipeline.jsx'
import FastestLapBadge from './FastestLapBadge.jsx'

const EASE = [0.22, 1, 0.36, 1]

function Block({ label, children }) {
  return (
    <section className="border-t border-white/10 pt-5">
      <h3 className="hud-label mb-3">{label}</h3>
      {children}
    </section>
  )
}

// A key result only gets a gauge when it opens with a real percentage in content.js.
function parseGauge(keyResult) {
  const match = keyResult.match(/^(\d+(?:\.\d+)?)%\s*(.*)$/)
  return match ? { value: Number(match[1]), label: match[2] } : null
}

// Side drawer from md up, bottom sheet below. Reduced motion: plain show/hide.
const TelemetryDrawer = forwardRef(function TelemetryDrawer(
  { project, position, accent, onClose },
  ref,
) {
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const offscreen = isDesktop ? { x: '100%' } : { y: '100%' }
  const gauge = parseGauge(project.keyResult)
  const titleId = 'telemetry-title'

  return (
    <div className="fixed inset-0 z-[150]" style={{ '--accent-rgb': accent }}>
      <m.div
        className="absolute inset-0 bg-carbon/75 md:backdrop-blur-sm"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.25 } }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <m.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="drawer-sheet glass-border chamfer absolute inset-x-0 bottom-0 !h-auto md:inset-y-0 md:left-auto md:right-0 md:!h-full md:w-[min(42rem,88vw)]"
        style={{ '--cut-outer': '20px', '--cut': '20px' }}
        initial={reduce ? false : offscreen}
        animate={{ x: 0, y: 0 }}
        exit={reduce ? { opacity: 0, transition: { duration: 0 } } : offscreen}
        transition={{ duration: 0.38, ease: EASE }}
      >
        <div className="glass-body drawer-body glass-accent chamfer flex max-h-[88dvh] flex-col md:max-h-none">
          <div className="pad-x-fluid flex shrink-0 items-start justify-between gap-4 pb-4 pt-5 sm:pt-6">
            <div className="min-w-0">
              <p className="hud-label mb-2">
                <span className="font-medium text-hard">{position}</span>
                <span aria-hidden="true"> / </span>
                {project.year}
                <span aria-hidden="true"> / </span>
                Telemetry
              </p>
              <h2
                id={titleId}
                className="text-fluid-name font-display font-bold uppercase tracking-tight text-hard"
              >
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              data-autofocus
              aria-label="Close project details"
              onClick={onClose}
              className="icon-btn chamfer"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-label="Project details"
            className="pad-x-fluid min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain pb-[calc(1.5rem+env(safe-area-inset-bottom))] focus-visible:outline-offset-[-2px]"
          >
            {gauge ? (
              <div className="flex justify-center pb-1">
                <AccuracyGauge value={gauge.value} label={gauge.label} />
              </div>
            ) : (
              <FastestLapBadge result={project.keyResult} />
            )}

            <Block label="Overview">
              <p className="text-base leading-relaxed text-hard/85">{project.description}</p>
            </Block>

            {project.model && (
              <Block label="Model">
                <p className="text-base leading-relaxed text-hard/85">{project.model}</p>
              </Block>
            )}

            <Block label="Tech stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li key={item} className="stack-tag">
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            {project.pipeline.length > 0 && (
              <Block label="Build pipeline">
                <BuildPipeline steps={project.pipeline} />
              </Block>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="plate plate-primary ml-2"
              >
                <span>
                  View project
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            )}
          </div>
        </div>
      </m.div>
    </div>
  )
})

export default TelemetryDrawer
