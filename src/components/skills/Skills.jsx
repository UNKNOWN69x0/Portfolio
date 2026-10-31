import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { sections, skillCategories, skillCompounds } from '../../data/content.js'
import GlassPanel from '../ui/GlassPanel.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import SkillGauge from './SkillGauge.jsx'
import TyreGraphic from './TyreGraphic.jsx'

const meta = sections.find((s) => s.id === 'skills')

// Presentation only: skill names and group notes come from content.js.
const LOOK = {
  soft: { color: '#FF4D4D', readout: 'Core', fraction: 0.88, blocks: 26, grooves: false },
  medium: { color: '#FFD23F', readout: 'Comfortable', fraction: 0.6, blocks: 34, grooves: false },
  hard: { color: '#F2F4F7', readout: 'Learning', fraction: 0.32, blocks: 42, grooves: true },
}

const compoundOf = {}
skillCompounds.forEach((c) => c.items.forEach((s) => (compoundOf[s] = c)))

function Chip({ children, color = '#22D3EE', dot = false }) {
  return (
    <li
      style={{ '--c': color }}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-white/15 bg-asphalt/70 px-3.5 py-2 text-base text-hard transition-colors duration-200 hover:border-[color:var(--c)]"
    >
      {dot && (
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
      )}
      {children}
    </li>
  )
}

function CompoundCard({ compound }) {
  const look = LOOK[compound.id]
  return (
    <GlassPanel accent cut={20} className="h-full" innerClassName="pad-fluid flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-x-3">
        <h3
          className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-bold uppercase tracking-tight"
          style={{ color: look.color }}
        >
          {compound.label}
        </h3>
        <span className="hud-label">{compound.note}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 items-center gap-3">
        <TyreGraphic color={look.color} blocks={look.blocks} grooves={look.grooves} className="mx-auto w-full max-w-[12rem]" />
        <div className="min-w-0 text-center">
          <SkillGauge fraction={look.fraction} color={look.color} className="mx-auto w-full max-w-[12rem]" />
          <p className="mt-1 break-words font-mono text-[clamp(0.6875rem,0.55rem+0.5vw,0.875rem)] uppercase tracking-wider text-hard">
            {look.readout}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${compound.label} compound skills`}>
        {compound.items.map((s) => (
          <Chip key={s} color={look.color}>
            {s}
          </Chip>
        ))}
      </ul>
    </GlassPanel>
  )
}

function CategoryCard({ category, index }) {
  return (
    <GlassPanel accent cut={18} className="h-full" innerClassName="pad-fluid h-full">
      <p className="hud-label mb-1">C{index + 1}</p>
      <h3 className="font-display text-[clamp(1.25rem,1.1rem+0.8vw,1.75rem)] font-bold uppercase tracking-tight">
        {category.label}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${category.label} skills`}>
        {category.items.map((s) => {
          const c = compoundOf[s]
          return (
            <Chip key={s} dot={!!c} color={c ? LOOK[c.id].color : '#22D3EE'}>
              {s}
              {c && <span className="sr-only"> ({c.label} compound)</span>}
            </Chip>
          )
        })}
      </ul>
    </GlassPanel>
  )
}

const MODES = [
  { id: 'compound', label: 'By compound' },
  { id: 'category', label: 'By category' },
]

export default function Skills() {
  const [mode, setMode] = useState('compound')

  return (
    <section id="skills" aria-labelledby="skills-title" className="container-page section-y">
      <SectionHeading {...meta} />

      <Reveal delay={0.1}>
        <div
          className="mb-[clamp(1.5rem,1rem+2vw,2.5rem)] flex flex-wrap gap-3 pl-2"
          role="group"
          aria-label="Group skills"
        >
          {MODES.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={mode === option.id}
              onClick={() => setMode(option.id)}
              className="plate plate-sm"
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait" initial={false}>
        {mode === 'compound' ? (
          <m.div
            key="compound"
            className="gap-fluid grid lg:grid-cols-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {skillCompounds.map((c) => (
              <CompoundCard key={c.id} compound={c} />
            ))}
          </m.div>
        ) : (
          <m.div
            key="category"
            className="gap-fluid grid sm:grid-cols-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {skillCategories.map((c, i) => (
              <CategoryCard key={c.label} category={c} index={i} />
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </section>
  )
}
