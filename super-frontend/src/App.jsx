import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'))
const WorkIndexPage = lazy(() => import('./pages/WorkIndexPage.jsx'))
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'))

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-5 text-sm text-neutral-500">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explorations" element={<GalleryPage />} />
          <Route path="work" element={<WorkIndexPage />} />
          <Route path="work/:slug" element={<ProjectPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
