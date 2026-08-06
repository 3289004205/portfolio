import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import AiApps from './pages/AiApps'
import AiImages from './pages/AiImages'
import AiVideos from './pages/AiVideos'
import More from './pages/More'
import ContactPage from './pages/ContactPage'
import GlobalImageLightbox from './components/GlobalImageLightbox'

export default function App() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Navigate to="/contact" replace />} />
          <Route path="/ai-apps" element={<AiApps />} />
          <Route path="/ai-images" element={<AiImages />} />
          <Route path="/ai-videos" element={<AiVideos />} />
          <Route path="/more" element={<More />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AnimatePresence>
      <GlobalImageLightbox />
    </>
  )
}
