import { about, profile, sections } from '../../data/content.js'
import GlassPanel from '../ui/GlassPanel.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import DriverCard, { driverCode } from './DriverCard.jsx'

const meta = sections.find((s) => s.id === 'about')

export default function About() {
  const [lead, ...rest] = about.split('. ')

  return (
    <section id="about" className="container-page section-y">
      <SectionHeading {...meta} titleClassName="text-fluid-title" />

      <div className="gap-fluid grid lg:grid-cols-12">
        <Reveal delay={0.1} className="lg:col-span-7">
          <GlassPanel
            accent
            cut={22}
            className="h-full"
            innerClassName="flex flex-col overflow-hidden"
          >
            <div className="pad-fluid relative flex-1">
              <p className="hud-label mb-5 flex items-center gap-2.5">
                <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-kerb shadow-glow-sm" />
                Driver notes
              </p>
              <p className="text-fluid-lead relative z-10 max-w-[60ch] text-hard/75">
                <span className="font-medium text-hard">{lead}.</span> {rest.join('. ')}
              </p>
              <span
                aria-hidden="true"
                className="ghost-code pointer-events-none absolute bottom-0 right-4 hidden select-none font-display text-[clamp(6rem,11vw,10rem)] font-bold leading-[0.8] lg:block"
              >
                {driverCode(profile.name)}
              </span>
            </div>
            <div aria-hidden="true" className="kerb-stripes" />
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-5">
          <DriverCard />
        </Reveal>
      </div>
    </section>
  )
}
