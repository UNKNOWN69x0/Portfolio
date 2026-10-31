// Glassmorphism panel with chamfered corners and a thin angled gradient border.
// Two nested clipped shapes: the outer gradient shows through as the border.
// (No filter on the wrapper, so backdrop-filter on the body keeps working.)
export default function GlassPanel({
  as: Tag = 'div',
  cut = 16,
  accent = false,
  className = '',
  innerClassName = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={`glass-frame ${className}`}
      style={{ '--cut-outer': `${cut}px`, '--cut': `${cut}px` }}
      {...rest}
    >
      <div className="glass-border chamfer">
        <div className={`glass-body chamfer ${accent ? 'glass-accent' : ''} ${innerClassName}`}>
          {children}
        </div>
      </div>
    </Tag>
  )
}
