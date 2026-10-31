// Fixed backdrop: carbon weave, red light sweep, vignette, floating particles.
// Particles and the sweep are desktop-only (md+). All motion is CSS transform/opacity
// and only declared when prefers-reduced-motion allows it (see index.css).

function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(42)
const PARTICLES = Array.from({ length: 16 }, (_, id) => ({
  id,
  x: rand() * 100,
  y: rand() * 80,
  size: 1 + Math.round(rand() * 2),
  dur: 16 + rand() * 16,
  delay: -rand() * 24,
  drift: (rand() - 0.5) * 90,
  o: 0.25 + rand() * 0.4,
}))

export default function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="carbon-weave absolute inset-0" />

      <div className="light-sweep absolute left-0 top-0 hidden h-full w-[40vw] md:block" />

      <div className="absolute inset-0 hidden md:block">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              '--x': `${p.x}%`,
              '--y': p.y.toFixed(1),
              '--size': `${p.size}px`,
              '--dur': `${p.dur.toFixed(1)}s`,
              '--delay': `${p.delay.toFixed(1)}s`,
              '--drift': `${p.drift.toFixed(0)}px`,
              '--o': p.o.toFixed(2),
            }}
          />
        ))}
      </div>

      <div className="vignette absolute inset-0" />
    </div>
  )
}
