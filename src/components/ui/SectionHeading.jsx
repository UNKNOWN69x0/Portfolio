import Reveal from './Reveal.jsx'

export default function SectionHeading({ sector, eyebrow, title, as: Heading = 'h2' }) {
  return (
    <Reveal className="mb-8 sm:mb-12">
      <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-telemetry">
        {sector && (
          <span className="rounded-sm bg-asphalt-light px-2 py-1 text-kerb">{sector}</span>
        )}
        {eyebrow && <span>{eyebrow}</span>}
      </div>
      <Heading className="flex items-center gap-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
        <span aria-hidden="true" className="inline-block h-8 w-1.5 -skew-x-12 bg-kerb shadow-glow sm:h-10" />
        {title}
      </Heading>
    </Reveal>
  )
}
