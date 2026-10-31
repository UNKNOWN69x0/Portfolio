import { profile } from '../../data/content.js'

// Timing-tower style strip. Only real facts from content.js; entries with no value are skipped.
const ITEMS = [
  { tag: 'Driver', value: profile.name },
  { tag: 'Role', value: profile.title },
  { tag: 'Base', value: profile.location },
].filter((i) => i.value)

function Group({ extraClass = '' }) {
  return (
    <ul className={`ticker-group ${extraClass}`}>
      {ITEMS.map(({ tag, value }) => (
        <li
          key={tag}
          className="mx-5 flex items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-hard"
        >
          <span className="-skew-x-12 bg-kerb px-1.5 py-px font-medium text-carbon">
            <span className="inline-block skew-x-12">{tag}</span>
          </span>
          <span>{value}</span>
          <span className="ml-5 text-kerb">◆</span>
        </li>
      ))}
    </ul>
  )
}

// Decorative: everything here is repeated in the hero, so assistive tech skips the loop.
// With motion reduced the strip stands still, and below lg it would not fit, so it is dropped.
export default function TimingTicker() {
  if (ITEMS.length === 0) return null

  return (
    <div
      aria-hidden="true"
      className="min-h-[28px] overflow-hidden border-t border-white/10 bg-asphalt/80 py-1 motion-reduce:flex motion-reduce:justify-center motion-reduce:max-lg:hidden"
    >
      <div className="ticker-track motion-reduce:w-auto">
        <Group />
        {/* duplicate for a seamless loop; removed when motion is reduced */}
        <Group extraClass="motion-reduce:hidden" />
      </div>
    </div>
  )
}
