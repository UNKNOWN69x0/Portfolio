import { profile } from '../../data/content.js'

// Pit-lane styled buttons: skewed plates, hover glow (opacity layer), arrow that slides in.
function PitButton({ href, label, primary = false, external = false, download = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true, 'aria-label': 'Download resume (PDF)' } : {})}
      className="group relative inline-block -skew-x-12"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 shadow-glow transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span
        className={`relative flex min-h-[48px] min-w-[44px] items-center gap-3 border px-6 transition-colors duration-200 ${
          primary
            ? 'border-kerb bg-kerb text-carbon group-hover:bg-[#ff5a50]'
            : 'border-white/25 bg-asphalt/70 text-hard group-hover:border-kerb group-hover:text-kerb'
        }`}
      >
        <span className="inline-flex skew-x-12 items-center gap-3">
          <span className="font-display text-sm font-semibold uppercase tracking-widest transition-transform duration-200 group-hover:-translate-x-0.5">
            {label}
          </span>
          {download ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
            </svg>
          ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 -translate-x-3 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          )}
        </span>
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
