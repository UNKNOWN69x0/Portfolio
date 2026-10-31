// Stopwatch + key result. Purple is reserved for this: it is the timing-screen "fastest" colour.
export default function FastestLapBadge({ result }) {
  return (
    <span className="lap-badge chamfer">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 text-fastest"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="14" r="7.5" />
        <path d="M12 14V9.5M9.5 2.5h5M12 2.5v4" />
      </svg>
      <span className="min-w-0">
        <span className="block font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-fastest">
          Fastest lap
        </span>
        <span className="block text-[0.9375rem] font-medium leading-snug text-hard">{result}</span>
      </span>
    </span>
  )
}
