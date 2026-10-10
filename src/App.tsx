import { lazy, Suspense, useDeferredValue, useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import GlobalImageLightbox from './components/GlobalImageLightbox'
import Navbar from './components/Navbar'
import RaysBackground from './components/SideRays/RaysBackground'
import { loadPage, schedulePagePrefetch } from './lib/route-modules'

const Home = lazy(() => loadPage('/') as Promise<{ default: typeof import('./pages/Home').default }>)
const AiApps = lazy(() => loadPage('/ai-apps') as Promise<{ default: typeof import('./pages/AiApps').default }>)
const AiImages = lazy(() => loadPage('/ai-images') as Promise<{ default: typeof import('./pages/AiImages').default }>)
const AiVideos = lazy(() => loadPage('/ai-videos') as Promise<{ default: typeof import('./pages/AiVideos').default }>)
const More = lazy(() => loadPage('/more') as Promise<{ default: typeof import('./pages/More').default }>)
const ContactPage = lazy(() => loadPage('/contact') as Promise<{ default: typeof import('./pages/ContactPage').default }>)

function RouteScrollReset({ path }: { path: string }) {
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [path])
  return null
}

export default function App() {
  const location = useLocation()
  const displayedLocation = useDeferredValue(location)
  const switching = location.pathname !== displayedLocation.pathname
  useEffect(() => schedulePagePrefetch(location.pathname), [location.pathname])

  return (
    <>
      <Navbar />
      <div className={displayedLocation.pathname === '/' ? 'invisible' : ''} aria-hidden="true"><RaysBackground /></div>
      {switching && <div role="status" className="fixed right-4 top-20 z-40 rounded-full border border-stroke bg-bg/90 px-3 py-2 text-xs text-muted">正在切换页面…</div>}
      <Suspense fallback={<div role="status" className="mx-auto min-h-screen max-w-[1100px] px-6 pt-32 text-sm text-muted">正在准备页面…</div>}>
        <RouteScrollReset path={displayedLocation.pathname} />
        <Routes location={displayedLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Navigate to="/contact" replace />} />
          <Route path="/ai-apps" element={<AiApps />} />
          <Route path="/ai-images" element={<AiImages />} />
          <Route path="/ai-videos" element={<AiVideos />} />
          <Route path="/more" element={<More />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
      <GlobalImageLightbox />
    </>
  )
}
