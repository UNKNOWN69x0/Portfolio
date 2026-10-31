import { profile } from '../../data/content.js'

// Pit-lane styled buttons: skewed plates with a hover glow and a nudging icon.
function PitButton({ href, label, primary = false, external = false, download = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true, 'aria-label': 'Download resume (PDF)' } : {})}
      className={`plate group ${primary ? 'plate-primary' : ''}`}
    >
      <span>
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform duration-200 ${
            download ? 'group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={download ? 'M12 4v11M7 11l5 5 5-5M5 20h14' : 'M5 12h14M13 6l6 6-6 6'} />
        </svg>
      </span>
    </a>
  )
}

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-4 pl-2">
      <PitButton href="#contact" label="Contact" primary />
      {profile.github && <PitButton href={profile.github} label="GitHub" external />}
      {profile.linkedin && <PitButton href={profile.linkedin} label="LinkedIn" external />}
      {profile.resumeUrl && <PitButton href={profile.resumeUrl} label="Download Resume" download />}
    </div>
  )
}
