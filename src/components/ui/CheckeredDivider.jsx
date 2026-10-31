// Chequered-flag strip used between sections. Decorative only.
export default function CheckeredDivider({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`checkered h-7 w-full opacity-90 ${className}`}
      style={{ '--cell': '14px' }}
    />
  )
}
