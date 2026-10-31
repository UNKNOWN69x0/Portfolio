// Original, decorative circuit outline sitting behind the timeline.
export default function TrackMapBg() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute left-1/2 top-[8%] -z-10 h-[84%] w-[min(92vw,34rem)] -translate-x-1/2 opacity-[0.07]"
      fill="none"
      stroke="#fff"
    >
      <path
        d="M90 90 C90 40 190 30 230 60 C270 90 330 60 345 110 C360 160 300 170 280 210 C260 250 330 270 335 330 C340 390 270 380 240 410 C210 440 260 500 200 530 C140 560 70 520 75 460 C80 400 140 410 150 360 C160 310 60 320 55 250 C50 190 90 160 90 90 Z"
        strokeWidth="14"
        strokeLinejoin="round"
      />
      <path
        d="M90 90 C90 40 190 30 230 60 C270 90 330 60 345 110 C360 160 300 170 280 210 C260 250 330 270 335 330 C340 390 270 380 240 410 C210 440 260 500 200 530 C140 560 70 520 75 460 C80 400 140 410 150 360 C160 310 60 320 55 250 C50 190 90 160 90 90 Z"
        stroke="#FF3B30"
        strokeWidth="2"
        strokeDasharray="6 10"
      />
      <path d="M78 76h24M78 90h24" stroke="#fff" strokeWidth="3" />
    </svg>
  )
}
