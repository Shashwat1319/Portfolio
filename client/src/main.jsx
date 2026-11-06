import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// self-hosted Inter (replaces the render-blocking Google Fonts stylesheet);
// only the weights the design actually uses — 400/500/600/700/900 — and the
// latin subset only: the site's content is English, so the browser would
// never download the other ranges anyway (a missing glyph falls back to the
// system font)
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/inter/latin-900.css'
import './index.css'
import App from './App.jsx'

// ErrorBoundary lives inside App's <Router> (see RouterBoundary in App.jsx)
// so its fallback can offer a router link that clears the error.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
