import { motion } from 'framer-motion'

const COUNT = 5

function Light({ on }) {
  return (
    <div className="relative aspect-square w-[14vw] max-w-[6.5rem]">
      {/* housing */}
      <div className="absolute inset-0 rounded-[28%] bg-gradient-to-b from-[#1b1d26] to-[#0a0b0f] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] ring-1 ring-white/10" />
      {/* lamp, off */}
      <div className="absolute inset-[16%] rounded-full bg-[#2a0c0c] shadow-[inset_0_0_10px_rgba(0,0,0,0.9)]" />
      {/* lamp, on */}
      <motion.div
        className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff9a90,#ff2a1f_45%,#b30f08_100%)] shadow-[0_0_24px_6px_rgba(255,42,31,0.8)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.08 }}
      />
      {/* hot centre */}
      <motion.div
        className="absolute inset-[38%] rounded-full bg-white/90 blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 0.9 : 0 }}
        transition={{ duration: 0.08 }}
      />
      {/* lens-flare halo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[70%] rounded-full bg-[radial-gradient(circle,rgba(255,42,31,0.42),transparent_62%)]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      {/* anamorphic streak */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-120%] top-[calc(50%-1px)] h-0.5 w-[340%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: on ? 0.85 : 0, scaleX: on ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </div>
  )
}

// Full-screen intro overlay: five lights switch on, hold, then go out (flash + fade).
export default function StartLights({ lit, go, skipped, onSkip }) {
  const caption = go ? 'Go' : lit === COUNT ? 'Ready' : 'Standby'

  return (
    <motion.div
      role="region"
      aria-label="Intro: race start lights"
      className="intro-failsafe fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-carbon"
      initial={{ opacity: 1 }}
      animate={{ opacity: go ? 0 : 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, delay: go ? 0.15 : 0 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,59,48,0.08),transparent_60%)]"
      />

      <div aria-hidden="true" className="relative flex flex-col items-center">
        {/* gantry beam */}
        <div className="mb-3 h-2 w-[86vw] max-w-xl rounded-sm bg-gradient-to-b from-[#2a2d38] to-[#0b0c10] ring-1 ring-white/10" />
        <div className="flex items-center justify-center gap-[3vw] sm:gap-6">
          {Array.from({ length: COUNT }, (_, i) => (
            <Light key={i} on={!go && lit > i} />
          ))}
        </div>
      </div>

      <p
        aria-live="polite"
        className="relative mt-10 font-mono text-xs uppercase tracking-[0.35em] text-muted"
      >
        {caption}
      </p>

      <button
        type="button"
        onClick={onSkip}
        className="absolute bottom-6 right-4 flex min-h-[44px] min-w-[44px] items-center gap-2 border border-white/20 bg-asphalt/80 px-5 font-mono text-xs uppercase tracking-widest text-hard transition-colors hover:border-kerb hover:text-kerb sm:bottom-8 sm:right-8"
      >
        Skip intro
        <span aria-hidden="true">→</span>
      </button>

      {/* lights-out flash (not shown when skipping) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#ffffff,rgba(255,59,48,0.75)_55%,transparent_85%)]"
        initial={{ opacity: 0 }}
        animate={go && !skipped ? { opacity: [0, 0.95, 0] } : { opacity: 0 }}
        transition={{ duration: 0.45, times: [0, 0.15, 1] }}
      />
    </motion.div>
  )
}
