import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const basename =
  import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  // Vite development starts with an empty root.
  createRoot(root).render(app)
}
