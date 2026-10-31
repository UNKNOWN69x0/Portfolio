import { m, useReducedMotion } from 'framer-motion'

const STAGGER = 0.05
const BASE_DELAY = 0.15

function Letter({ char, index, fast }) {
  const delay = fast ? 0 : BASE_DELAY + index * STAGGER
  const duration = fast ? 0.2 : 0.45

  return (
    <span className="relative inline-block">
      {/* speed streak trailing behind the letter as it slams in */}
      <m.span
        aria-hidden="true"
        className="absolute left-full top-[55%] h-[0.08em] w-[1.1em] origin-left bg-gradient-to-r from-kerb to-transparent"
        variants={{
          hidden: { opacity: 0, scaleX: 0 },
          show: {
            opacity: fast ? 0 : [0, 1, 0],
            scaleX: fast ? 0 : [0, 1, 0],
            transition: { delay, duration: 0.5 },
          },
        }}
      />
      <m.span
        className="hero-failsafe inline-block"
        variants={{
          hidden: { opacity: 0, x: 140, scaleX: 2.4, skewX: -30 },
          show: {
            opacity: 1,
            x: 0,
            scaleX: 1,
            skewX: 0,
            transition: { delay, duration, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {char}
      </m.span>
    </span>
  )
}

// Huge italic display name, revealed letter by letter. Real text stays in the DOM
// (h1 aria-label) so it is readable by assistive tech and if animation fails.
export default function NameReveal({ name, revealed, fast }) {
  const reduce = useReducedMotion()
  const words = name.split(' ')
  let index = 0

  return (
    <m.h1
      id="hero-title"
      aria-label={name}
      className="font-display text-[clamp(3.25rem,14vw,7.5rem)] font-bold italic uppercase leading-[0.9] tracking-tight"
      initial={reduce ? false : 'hidden'}
      animate={revealed ? 'show' : 'hidden'}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden="true"
          className={`mr-[0.22em] inline-block whitespace-nowrap ${
            wi > 0 ? 'text-kerb text-glow' : 'text-hard'
          }`}
        >
          {[...word].map((char, ci) => (
            <Letter key={`${char}-${ci}`} char={char} index={index++} fast={fast} />
          ))}
        </span>
      ))}
    </m.h1>
  )
}
