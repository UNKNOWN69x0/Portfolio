// Original side-profile race helmet drawn from scratch. Decorative only.
export default function HelmetGraphic({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 340 250"
      className={`helmet-wrap ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id="helmet-shell" x1="60" y1="30" x2="280" y2="200">
          <stop offset="0" stopColor="#2A2E3A" />
          <stop offset="0.55" stopColor="#171A22" />
          <stop offset="1" stopColor="#0E1015" />
        </linearGradient>
        <linearGradient id="helmet-visor" x1="165" y1="85" x2="290" y2="140">
          <stop offset="0" stopColor="#0B0C10" />
          <stop offset="0.6" stopColor="#0E3A44" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="helmet-stripe" x1="50" y1="150" x2="270" y2="60">
          <stop offset="0" stopColor="#FF3B30" />
          <stop offset="1" stopColor="#FF3B30" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="helmet-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FF3B30" stopOpacity="0.28" />
          <stop offset="1" stopColor="#FF3B30" stopOpacity="0" />
        </radialGradient>
        <clipPath id="helmet-shell-clip">
          <path d="M62 170C42 120 62 44 158 34c66-6 116 32 126 84l6 32c4 18-6 34-26 36l-142 4c-28 2-50-4-60-20Z" />
        </clipPath>
        <clipPath id="helmet-visor-clip">
          <path d="M172 88c30-10 80-4 106 24l6 22c-42 4-86 4-110-6-14-8-14-32-2-40Z" />
        </clipPath>
      </defs>

      {/* HUD backdrop */}
      <circle cx="170" cy="118" r="118" fill="url(#helmet-halo)" />
      <circle cx="170" cy="118" r="104" stroke="#fff" strokeOpacity="0.07" />
      <circle cx="170" cy="118" r="84" stroke="#22D3EE" strokeOpacity="0.14" strokeDasharray="3 9" />
      <path d="M8 118h30M302 118h30M170 2v22" stroke="#fff" strokeOpacity="0.16" />

      {/* neck ring */}
      <path d="M92 192c20 14 110 16 148 0l-4 16c-40 12-104 12-140 0Z" fill="#0B0C10" stroke="#fff" strokeOpacity="0.14" />

      {/* shell */}
      <path
        d="M62 170C42 120 62 44 158 34c66-6 116 32 126 84l6 32c4 18-6 34-26 36l-142 4c-28 2-50-4-60-20Z"
        fill="url(#helmet-shell)"
        stroke="#fff"
        strokeOpacity="0.22"
      />

      <g clipPath="url(#helmet-shell-clip)">
        {/* livery */}
        <path d="M40 158C96 96 176 56 300 62l-4 18C190 76 110 112 58 190Z" fill="url(#helmet-stripe)" />
        <path d="M60 192C110 130 170 104 240 96l-2 7c-66 10-122 34-168 96Z" fill="#F2F4F7" fillOpacity="0.5" />
        {/* crown highlight */}
        <path d="M84 104c18-34 54-54 96-56" stroke="#fff" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" />
        {/* chin split */}
        <path d="M168 142c34 8 80 8 122 2l2 12c-44 6-92 6-126-2Z" fill="#0B0C10" fillOpacity="0.8" />
      </g>

      {/* visor */}
      <path
        d="M172 88c30-10 80-4 106 24l6 22c-42 4-86 4-110-6-14-8-14-32-2-40Z"
        fill="url(#helmet-visor)"
        stroke="#22D3EE"
        strokeOpacity="0.55"
      />
      <g clipPath="url(#helmet-visor-clip)">
        <path d="M192 76h20l-30 70h-20Z" fill="#fff" fillOpacity="0.08" />
        <path className="helmet-glint" d="M212 70h34l-36 84h-34Z" fill="#fff" />
      </g>
      {/* visor pivot */}
      <circle cx="166" cy="112" r="9" fill="#0B0C10" stroke="#FF3B30" strokeWidth="2" />
      <circle cx="166" cy="112" r="2.5" fill="#FF3B30" />

      {/* chin vents */}
      <path d="M216 168h46M222 176h34" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
