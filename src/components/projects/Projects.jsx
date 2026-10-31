import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { projects, sections } from '../../data/content.js'
import useModalFocus from '../../hooks/useModalFocus.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import TelemetryDrawer from './TelemetryDrawer.jsx'
import TimingRow from './TimingRow.jsx'

const meta = sections.find((s) => s.id === 'projects')

// Team colour per grid slot (kerb, medium, telemetry), as "r, g, b" for CSS rgba().
const ACCENTS = ['255, 59, 48', '255, 210, 63', '34, 211, 238']

export default function Projects() {
  const [openIndex, setOpenIndex] = useState(null)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  const close = useCallback(() => setOpenIndex(null), [])
  useModalFocus(openIndex !== null, panelRef, triggerRef, close)

  return (
    <section id="projects" className="container-page section-y">
      <SectionHeading {...meta} titleClassName="text-fluid-title" />

      <div aria-hidden="true" className="hidden lg:block">
        <Reveal delay={0.05} className="timing-grid timing-head hud-label mb-2 py-1 pl-6 pr-4">
          <span className="[grid-area:pos]">Pos</span>
          <span className="[grid-area:name]">Project</span>
          <span className="[grid-area:year]">Year</span>
          <span className="[grid-area:lap]">Key result</span>
        </Reveal>
      </div>

      <ol className="space-y-2.5 sm:space-y-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.title} delay={0.1 + i * 0.08}>
            <TimingRow
              project={project}
              position={`P${i + 1}`}
              accent={ACCENTS[i % ACCENTS.length]}
              onOpen={(e) => {
                triggerRef.current = e.currentTarget
                setOpenIndex(i)
              }}
            />
          </Reveal>
        ))}
      </ol>

      {/* portal: must stack above the sticky header, outside <main>'s stacking context */}
      {createPortal(
        <AnimatePresence>
          {openIndex !== null && (
            <TelemetryDrawer
              ref={panelRef}
              project={projects[openIndex]}
              position={`P${openIndex + 1}`}
              accent={ACCENTS[openIndex % ACCENTS.length]}
              onClose={close}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
