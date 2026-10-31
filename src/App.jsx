import { MotionConfig } from 'framer-motion'
import { sections } from './data/content.js'
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
import Hero from './components/hero/Hero.jsx'
import About from './components/about/About.jsx'
import Projects from './components/projects/Projects.jsx'

const BUILT = { hero: Hero, about: About, projects: Projects }

// Structure only. Section contents are built in later stages.
function Placeholder({ id, sector, eyebrow, title }) {
  return (
    <section id={id} className="container-page py-16 sm:py-24">
      <SectionHeading sector={sector} eyebrow={eyebrow} title={title} />
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
        {sections.map((s, i) => {
          const Built = BUILT[s.id]
          return (
            <div key={s.id}>
              {i > 0 && s.id !== 'about' && <SectionTransition />}
              {Built ? <Built /> : <Placeholder {...s} />}
            </div>
          )
        })}
      </main>
      <Footer />
    </MotionConfig>
  )
}
