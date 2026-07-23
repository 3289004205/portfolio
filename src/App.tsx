import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Resume from './pages/Resume'
import AiApps from './pages/AiApps'
import AiImages from './pages/AiImages'
import AiVideos from './pages/AiVideos'
import More from './pages/More'
import ContactPage from './pages/ContactPage'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/ai-apps" element={<AiApps />} />
        <Route path="/ai-images" element={<AiImages />} />
        <Route path="/ai-videos" element={<AiVideos />} />
        <Route path="/more" element={<More />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  )
}
