/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#0B0C10',
        asphalt: '#15171E',
        'asphalt-light': '#1E212B',
        kerb: '#FF3B30',
        soft: '#FF4D4D',
        medium: '#FFD23F',
        hard: '#F2F4F7',
        telemetry: '#22D3EE',
        muted: '#8A90A0',
        // timing-screen purple: reserved for "fastest lap" markers
        fastest: '#C084FC',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 12px rgba(255,59,48,0.6), 0 0 32px rgba(255,59,48,0.28)',
        'glow-sm': '0 0 8px rgba(255,59,48,0.7)',
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [],
}
