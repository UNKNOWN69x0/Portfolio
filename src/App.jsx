import { lazy, Suspense, useEffect } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { sections } from './data/content.js'
import useMediaQuery from './hooks/useMediaQuery.js'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollProgress from './components/layout/ScrollProgress.jsx'
import BackgroundFX from './components/layout/BackgroundFX.jsx'
import PageLoadWipe from './components/layout/PageLoadWipe.jsx'
import SectionTransition from './components/ui/SectionTransition.jsx'
import Hero from './components/hero/Hero.jsx'
import About from './components/about/About.jsx'
import Projects from './components/projects/Projects.jsx'
import Skills from './components/skills/Skills.jsx'
import Journey from './components/journey/Journey.jsx'
import Contact from './components/contact/Contact.jsx'

// Desktop-only extras: phones never download or run these.
const CustomCursor = lazy(() => import('./components/layout/CustomCursor.jsx'))
const TelemetryHUD = lazy(() => import('./components/layout/TelemetryHUD.jsx'))

const SECTIONS = { hero: Hero, about: About, projects: Projects, skills: Skills, journey: Journey, contact: Contact }

export default function App() {
  const wide = useMediaQuery('(min-width: 1280px)')
  const desktopMouse = useMediaQuery('(min-width: 768px) and (hover: hover) and (pointer: fine)')

  // The page renders client-side, so the browser's own jump to a #section finds nothing.
  useEffect(() => {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          id="skip-link"
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[300] focus-visible:bg-kerb focus-visible:px-4 focus-visible:py-3 focus-visible:font-display focus-visible:text-sm focus-visible:font-semibold focus-visible:uppercase focus-visible:tracking-widest focus-visible:text-carbon"
        >
          Skip to content
        </a>
        <BackgroundFX />
        <PageLoadWipe />
        <ScrollProgress />
        <Navbar />
        <Suspense fallback={null}>
          {desktopMouse && <CustomCursor />}
          {wide && <TelemetryHUD />}
        </Suspense>
        <main id="main" tabIndex={-1} className="relative z-10">
          {sections.map((s, i) => {
            const Section = SECTIONS[s.id]
            return (
              <div key={s.id}>
                {i > 0 && <SectionTransition />}
                <Section />
              </div>
            )
          })}
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
