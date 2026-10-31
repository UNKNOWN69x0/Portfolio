import Reveal from './Reveal.jsx'

// `id` is the section id; the section points at this heading with aria-labelledby.
export default function SectionHeading({ id, sector, eyebrow, title, as: Heading = 'h2' }) {
  return (
    <Reveal className="mb-8 sm:mb-12">
      <div className="eyebrow mb-3">
        {sector && <span className="sector-chip">{sector}</span>}
        {eyebrow && <span>{eyebrow}</span>}
      </div>
      <Heading
        id={`${id}-title`}
        className="text-fluid-title flex items-center gap-4 font-bold uppercase tracking-tight"
      >
        <span aria-hidden="true" className="inline-block h-8 w-1.5 shrink-0 -skew-x-12 bg-kerb shadow-glow-sm sm:h-10" />
        {title}
      </Heading>
    </Reveal>
  )
}
