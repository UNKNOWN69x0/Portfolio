import FastestLapBadge from './FastestLapBadge.jsx'

// One line of the timing tower. Built from the glass classes rather than GlassPanel
// so a <button> only contains phrasing content.
export default function TimingRow({ project, position, accent, onOpen }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      className="timing-row glass-frame group"
      style={{ '--accent-rgb': accent }}
    >
      <span aria-hidden="true" className="row-glow" />
      <span className="glass-border chamfer block">
        <span className="glass-body chamfer block overflow-hidden">
          <span aria-hidden="true" className="row-sheen" />
          <span aria-hidden="true" className="row-bar" />
          <span className="timing-grid relative py-4 pl-5 pr-4 sm:py-5 sm:pl-6">
            <span className="text-fluid-pos font-display font-bold text-hard [grid-area:pos]">
              {position}
            </span>

            <span className="justify-self-end font-mono text-sm text-muted [grid-area:year] md:justify-self-start lg:self-center">
              {project.year}
            </span>

            <span className="text-fluid-row font-display font-semibold text-hard [grid-area:name]">
              {project.title}
            </span>

            <span className="flex flex-wrap gap-1.5 [grid-area:tags]">
              {project.stack.map((item) => (
                <span key={item} className="stack-tag">
                  {item}
                </span>
              ))}
            </span>

            <span className="[grid-area:lap]">
              <FastestLapBadge result={project.keyResult} />
            </span>

            <span aria-hidden="true" className="row-go chamfer [grid-area:go]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <span className="sr-only">Open telemetry</span>
          </span>
        </span>
      </span>
    </button>
  )
}
