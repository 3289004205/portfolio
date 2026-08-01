import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import AiApps from './pages/AiApps'
import AiImages from './pages/AiImages'
import AiVideos from './pages/AiVideos'
import More from './pages/More'
import ContactPage from './pages/ContactPage'
import ClickSpark from './components/ClickSpark/ClickSpark'

export default function App() {
  const location = useLocation()

  return (
    <ClickSpark
      sparkColor="#e8f0f8"
      sparkSize={12}
      sparkRadius={16}
      sparkCount={10}
      duration={450}
    >
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
    </ClickSpark>
  )
}
