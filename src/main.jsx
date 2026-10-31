import { StrictMode, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/chakra-petch/latin-600.css'
import '@fontsource/chakra-petch/latin-700.css'
import '@fontsource/chakra-petch/latin-700-italic.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import './index.css'
import App from './App.jsx'

// A transition lets React yield while building the page, so slow phones stay responsive.
const root = createRoot(document.getElementById('root'))
startTransition(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
