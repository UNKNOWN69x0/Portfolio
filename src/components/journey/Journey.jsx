import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { education, experience, projects, sections, timeline } from '../../data/content.js'
import GlassPanel from '../ui/GlassPanel.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import RoundNode, { ACCENT } from './RoundNode.jsx'
import TrackMapBg from './TrackMapBg.jsx'

const meta = sections.find((s) => s.id === 'journey')
const SOURCES = { education, projects, experience }
const TYPE_LABEL = {
  education: 'Education',
  project: 'Project',
  competition: 'Competition',
  graduation: 'Finish',
}

const firstSentence = (text) => `${text.split('. ')[0].replace(/\.$/, '')}.`

// Everything shown comes from content.js; nothing is composed here beyond layout.
function describe(t) {
  const src = SOURCES[t.ref.source][t.ref.index]

  if (t.ref.source === 'projects') {
    return {
      date: src.year,
      summary: firstSentence(src.description),
      details: [
        { label: 'Overview', value: src.description },
        src.keyResult && { label: 'Key result', value: src.keyResult },
        src.stack?.length && { label: 'Stack', value: src.stack.join(', ') },
      ],
    }
  }
  if (t.ref.source === 'experience') {
    return {
      date: src.year,
      summary: src.org,
      details: [
        { label: 'Organiser', value: src.org },
        { label: 'Overview', value: src.description },
      ],
    }
  }
  return {
    date: t.type === 'graduation' ? src.years.split(' to ').at(-1) : t.year,
    summary: t.type === 'graduation' ? src.school : `${src.school}, ${src.location}`,
    details: [
      { label: 'Qualification', value: src.degree },
      { label: 'Institution', value: `${src.school}, ${src.location}` },
      { label: 'Years', value: src.years },
      src.score && { label: 'Result', value: src.score },
    ],
  }
}

function Round({ t, side }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const color = ACCENT[t.type]
  const { date, summary, details } = describe(t)

  return (
    <li
      className={`relative pl-[3.25rem] md:w-1/2 md:pl-0 ${
        side === 'left' ? 'md:pr-[clamp(2rem,4vw,3.5rem)]' : 'md:ml-auto md:pl-[clamp(2rem,4vw,3.5rem)]'
      }`}
    >
      <span
        className={`absolute left-5 top-5 -translate-x-1/2 ${
          side === 'left' ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0'
        }`}
      >
        <RoundNode type={t.type} />
      </span>

      <Reveal>
        <GlassPanel cut={16} innerClassName="overflow-hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-[44px] w-full items-start gap-3 px-[clamp(1rem,0.7rem+1.5vw,1.75rem)] py-4 text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-telemetry"
          >
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm uppercase tracking-widest">
                <span style={{ color }}>Round {t.round}</span>
                <span className="text-muted">{date}</span>
                <span className="text-muted/70">{TYPE_LABEL[t.type]}</span>
              </span>
              <span className="mt-1 block font-display text-[clamp(1.25rem,1.05rem+0.9vw,1.6rem)] font-bold uppercase leading-tight tracking-tight text-hard">
                {t.label}
              </span>
              <span className="mt-1 block text-base leading-snug text-hard/70">{summary}</span>
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={id}
                role="region"
                aria-label={`${t.label} details`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <dl className="space-y-3 border-t border-white/10 px-[clamp(1rem,0.7rem+1.5vw,1.75rem)] pb-5 pt-4">
                  {details.filter(Boolean).map((d) => (
                    <div key={d.label}>
                      <dt className="hud-label">{d.label}</dt>
                      <dd className="mt-0.5 text-base leading-relaxed text-hard/85">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassPanel>
      </Reveal>
    </li>
  )
}

export default function Journey() {
  const reduce = useReducedMotion()
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <section id="journey" className="container-page section-y relative overflow-x-clip">
      <TrackMapBg />
      <SectionHeading {...meta} titleClassName="text-fluid-title" />

      <div ref={listRef} className="relative">
        {/* base line + lap-progress fill */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 bg-white/10 md:left-1/2"
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-5 top-0 w-0.5 origin-top -translate-x-1/2 bg-kerb shadow-glow md:left-1/2"
          style={reduce ? undefined : { scaleY: fill }}
        />

        <ol className="flex flex-col" style={{ gap: 'clamp(1.25rem, 0.8rem + 2vw, 2.5rem)' }}>
          {timeline.map((t, i) => (
            <Round key={t.round} t={t} side={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </ol>
      </div>
    </section>
  )
}
