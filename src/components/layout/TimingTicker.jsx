import { education, profile } from '../../data/content.js'

// Timing-tower style strip. Only real facts from content.js; entries with no value are skipped.
const cgpa = education
  .map((e) => /^CGPA\s+(.+)$/i.exec(e.score || ''))
  .find(Boolean)?.[1]

const ITEMS = [
  { tag: 'Driver', value: profile.name },
  { tag: 'Role', value: profile.title },
  { tag: 'Base', value: profile.location },
  { tag: 'CGPA', value: cgpa },
].filter((i) => i.value)

function Group({ hiddenFromAT = false, extraClass = '' }) {
  return (
    <ul
      className={`ticker-group motion-reduce:flex-wrap motion-reduce:justify-center ${extraClass}`}
      aria-hidden={hiddenFromAT || undefined}
    >
      {ITEMS.map(({ tag, value }) => (
        <li
          key={tag}
          className="mx-5 flex items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-hard"
        >
          <span className="-skew-x-12 bg-kerb px-1.5 py-px font-medium text-carbon">
            <span className="inline-block skew-x-12">{tag}</span>
          </span>
          <span>{value}</span>
          <span aria-hidden="true" className="ml-5 text-kerb">
            ◆
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function TimingTicker() {
  if (ITEMS.length === 0) return null

  return (
    <div
      className="min-h-[28px] overflow-hidden border-t border-white/10 bg-asphalt/80 py-1 motion-reduce:flex motion-reduce:justify-center"
      role="region"
      aria-label="Timing summary"
    >
      <div className="ticker-track motion-reduce:w-auto">
        <Group />
        {/* duplicate for a seamless loop; removed when motion is reduced */}
        <Group hiddenFromAT extraClass="motion-reduce:hidden" />
      </div>
    </div>
  )
}
