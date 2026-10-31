import { MotionConfig } from 'framer-motion'
import { profile, sections } from './data/content.js'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollProgress from './components/layout/ScrollProgress.jsx'
import BackgroundFX from './components/layout/BackgroundFX.jsx'
import TelemetryHUD from './components/layout/TelemetryHUD.jsx'
import CustomCursor from './components/layout/CustomCursor.jsx'
import PageLoadWipe from './components/layout/PageLoadWipe.jsx'
import SectionHeading from './components/ui/SectionHeading.jsx'
import SectionTransition from './components/ui/SectionTransition.jsx'
import GlassPanel from './components/ui/GlassPanel.jsx'
import Reveal from './components/ui/Reveal.jsx'

// Structure only. Section contents are built in later stages.
function Placeholder({ id, sector, eyebrow, title, hero = false }) {
  return (
    <section id={id} className={`container-page ${hero ? 'py-20 sm:py-28' : 'py-16 sm:py-24'}`}>
      {hero ? (
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-telemetry">
            <span className="mr-3 rounded-sm bg-asphalt-light px-2 py-1 text-kerb text-glow">
              {sector}
            </span>
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-muted sm:text-xl">{profile.title}</p>
        </Reveal>
      ) : (
        <SectionHeading sector={sector} eyebrow={eyebrow} title={title} />
      )}
      <Reveal delay={0.1} className="mt-6">
        <GlassPanel accent cut={18} innerClassName="p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Section content coming soon
          </p>
        </GlassPanel>
      </Reveal>
    </section>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-kerb focus:px-4 focus:py-2 focus:text-carbon"
      >
        Skip to content
      </a>
      <BackgroundFX />
      <PageLoadWipe />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <TelemetryHUD />
      <main className="relative z-10">
        {sections.map((s, i) => (
          <div key={s.id}>
            {i > 0 && s.id !== 'about' && <SectionTransition />}
            <Placeholder {...s} hero={s.id === 'hero'} />
          </div>
        ))}
      </main>
      <Footer />
    </MotionConfig>
  )
}
