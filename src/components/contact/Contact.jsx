import { useEffect, useRef, useState } from 'react'
import { profile, sections } from '../../data/content.js'
import GlassPanel from '../ui/GlassPanel.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Waveform from './Waveform.jsx'

const meta = sections.find((s) => s.id === 'contact')
const FORM_ID = (import.meta.env.VITE_FORMSPREE_ID || '').trim()
const COOLDOWN_S = 30
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MSG = 2000

const FIELDS = ['name', 'email', 'message']

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email address does not look right.'
  if (!v.message.trim()) e.message = 'Write a message before sending.'
  else if (v.message.length > MAX_MSG) e.message = `Keep it under ${MAX_MSG} characters.`
  return e
}

function mailtoHref(v) {
  const subject = `Message from ${v.name.trim() || 'your portfolio'}`
  const body = `${v.message.trim()}\n\n${v.name.trim()}\n${v.email.trim()}`
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const inputCls =
  'mt-1.5 block min-h-[48px] w-full rounded-sm border bg-carbon/70 px-3.5 py-2.5 text-base text-hard transition-colors focus-visible:border-telemetry focus-visible:outline-offset-0'

function Bubble({ children, mine = false, tag }) {
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] border px-3.5 py-2 text-base leading-snug ${
          mine ? 'border-kerb/60 bg-kerb/10 text-hard' : 'border-white/15 bg-asphalt/80 text-hard/85'
        }`}
        style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
      >
        {tag && <span className="mb-0.5 block font-mono text-xs uppercase tracking-widest text-telemetry">{tag}</span>}
        {children}
      </div>
    </div>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="hud-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-base text-kerb-light">
          {error}
        </p>
      )}
    </div>
  )
}

const ICON = {
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  github: 'M9 19c-4 1.5-4-2-6-2m12 4v-3.5c0-1 .1-1.400-.5-2 2.800-.3 5.500-1.400 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.200 4.200 0 0 0-.1-3.200s-1-.3-3.500 1.300a12 12 0 0 0-6.200 0C6.400 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21',
  linkedin: 'M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.600c.6-1 1.800-1.900 3.600-1.900 3 0 3.400 2 3.400 4.600V20h-4v-5.800c0-1.200 0-2.400-1.500-2.400S14 13 14 14.200V20h-4z',
  download: 'M12 4v11M7 11l5 5 5-5M5 20h14',
}

function LinkRow({ href, icon, label, external = false, download = false, ariaLabel }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true } : {})}
      aria-label={ariaLabel}
      className="flex min-h-[48px] items-center gap-3 border border-white/15 bg-asphalt/70 px-4 py-2 text-base text-hard transition-colors duration-200 hover:border-kerb hover:text-kerb-light"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={ICON[icon]} />
      </svg>
      <span className="font-display font-semibold uppercase tracking-widest">{label}</span>
    </a>
  )
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error | mailto
  const [cooldown, setCooldown] = useState(0)
  const [lastMailto, setLastMailto] = useState('')
  const honeypot = useRef(null)
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) }

  useEffect(() => {
    if (cooldown <= 0) return undefined
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const finishSuccess = () => {
    setStatus('success')
    setValues({ name: '', email: '', message: '' })
    setCooldown(COOLDOWN_S)
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending' || cooldown > 0) return

    const errs = validate(values)
    setErrors(errs)
    const firstBad = FIELDS.find((f) => errs[f])
    if (firstBad) {
      refs[firstBad].current?.focus()
      return
    }

    // Bots fill the hidden field; act as if it worked and send nothing.
    if (honeypot.current?.value) {
      finishSuccess()
      return
    }

    const href = mailtoHref(values)
    setLastMailto(href)

    if (!FORM_ID) {
      setStatus('mailto')
      window.location.href = href
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${encodeURIComponent(FORM_ID)}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      finishSuccess()
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'
  const blocked = sending || cooldown > 0
  const described = (k) => (errors[k] ? `${k}-error` : undefined)

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page section-y">
      <SectionHeading {...meta} />

      <div className="gap-fluid grid lg:grid-cols-12">
        <Reveal delay={0.1} className="lg:col-span-7">
          <GlassPanel accent cut={22} className="h-full" innerClassName="pad-fluid h-full">
            <div className="flex items-center justify-between gap-3">
              <p className="hud-label flex items-center gap-2.5">
                <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-kerb shadow-glow-sm" />
                Team radio
              </p>
              <span className="hud-label">CH 01</span>
            </div>

            <div className="mt-4 space-y-2.5 border border-white/10 bg-carbon/60 p-3.5 sm:p-4">
              <Waveform active={sending} />
              <Bubble tag="Pit wall">Box box. Radio check.</Bubble>
              <Bubble mine tag="You">
                Loud and clear.
              </Bubble>
              {sending && <Bubble tag="Transmitting">Sending your message…</Bubble>}
              {status === 'success' && <Bubble tag="Pit wall">Message received. Copy that.</Bubble>}
            </div>

            <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  ref={refs.name}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={set('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={described('name')}
                  className={`${inputCls} ${errors.name ? 'border-kerb' : 'border-white/20'}`}
                />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input
                  ref={refs.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={set('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={described('email')}
                  className={`${inputCls} ${errors.email ? 'border-kerb' : 'border-white/20'}`}
                />
              </Field>
              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  ref={refs.message}
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={[described('message'), 'message-count'].filter(Boolean).join(' ')}
                  className={`${inputCls} resize-y ${errors.message ? 'border-kerb' : 'border-white/20'}`}
                />
                <p id="message-count" className="mt-1.5 text-right font-mono text-sm text-muted">
                  {values.message.length}/{MAX_MSG}
                </p>
              </Field>

              {/* honeypot: hidden from people and assistive tech */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Company
                  <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pl-2">
                <button type="submit" disabled={blocked} className="plate plate-primary">
                  <span>{sending ? 'Transmitting…' : cooldown > 0 ? `Wait ${cooldown}s` : 'Send message'}</span>
                </button>
              </div>

              <div role="status" className="min-h-[1.5rem] text-base">
                {status === 'success' && <p className="text-telemetry">Message received. Copy that.</p>}
                {status === 'mailto' && (
                  <p className="text-hard/85">
                    No send service is set up on this site, so your email app should be opening with your message
                    filled in.{' '}
                    <a className="text-telemetry underline underline-offset-4" href={lastMailto}>
                      Open it again
                    </a>
                    .
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-kerb-light">
                    That did not go through.{' '}
                    <a className="underline underline-offset-4" href={lastMailto}>
                      Send it by email instead
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.2} className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <GlassPanel accent cut={22} innerClassName="pad-fluid">
            <p className="hud-label">Direct line</p>
            <p className="mt-3 font-display text-[clamp(1.25rem,1.05rem+1vw,1.75rem)] font-bold leading-tight tracking-tight">
              Prefer to skip the form?
            </p>
            {profile.email && <p className="mt-2 break-all font-mono text-base text-telemetry">{profile.email}</p>}

            <div className="mt-5 flex flex-col gap-3">
              {profile.email && <LinkRow href={`mailto:${profile.email}`} icon="mail" label="Email" />}
              {profile.github && <LinkRow href={profile.github} icon="github" label="GitHub" external />}
              {profile.linkedin && <LinkRow href={profile.linkedin} icon="linkedin" label="LinkedIn" external />}
              {profile.resumeUrl && (
                <LinkRow
                  href={profile.resumeUrl}
                  icon="download"
                  label="Download Resume"
                  download
                  ariaLabel="Download resume (PDF)"
                />
              )}
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  )
}
