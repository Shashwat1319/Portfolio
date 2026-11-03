import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ErrorBoundary lives inside App's <Router> (see RouterBoundary in App.jsx)
// so its fallback can offer a router link that clears the error.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
