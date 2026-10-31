// Faint speed lines streaming across the hero. Pure CSS transform animation
// (see .speed-line in index.css); 4 lines on phones, 12 from md up.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(7)
const LINES = Array.from({ length: 12 }, (_, id) => ({
  id,
  top: 6 + rand() * 88,
  w: 120 + rand() * 220,
  o: 0.08 + rand() * 0.18,
  dur: 2.6 + rand() * 3.2,
  delay: -rand() * 6,
  sx: -20 + rand() * 110,
}))

export default function SpeedLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {LINES.map((l) => (
        <span
          key={l.id}
          className={`speed-line ${l.id >= 4 ? 'hidden md:block' : ''}`}
          style={{
            '--top': `${l.top.toFixed(1)}%`,
            '--w': `${l.w.toFixed(0)}px`,
            '--o': l.o.toFixed(2),
            '--dur': `${l.dur.toFixed(1)}s`,
            '--delay': `${l.delay.toFixed(1)}s`,
            '--sx': `${l.sx.toFixed(0)}vw`,
          }}
        />
      ))}
    </div>
  )
}
