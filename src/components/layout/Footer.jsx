import { profile } from '../../data/content.js'
import CheckeredDivider from '../ui/CheckeredDivider.jsx'

export default function Footer() {
  const links = [
    profile.email && { label: 'Email', href: `mailto:${profile.email}` },
    profile.github && { label: 'GitHub', href: profile.github },
    profile.linkedin && { label: 'LinkedIn', href: profile.linkedin },
  ].filter(Boolean)

  return (
    <footer className="relative z-10">
      <CheckeredDivider />
      <div className="bg-asphalt/90">
        <div className="container-page flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="font-mono text-xs uppercase leading-relaxed tracking-widest text-muted">
            {profile.name}
            {profile.title && <span> · {profile.title}</span>}
            {profile.location && <span> · {profile.location}</span>}
          </p>
          {links.length > 0 && (
            <ul className="flex shrink-0 flex-wrap gap-x-6">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="flex min-h-[44px] min-w-[44px] items-center font-mono text-xs uppercase tracking-widest text-hard transition-colors hover:text-kerb-light"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
