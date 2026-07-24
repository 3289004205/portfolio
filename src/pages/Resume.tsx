import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ResumeSection from '../components/ResumeSection'

export default function Resume() {
  const navigate = useNavigate()

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-bg"
    >
      <button
        onClick={() => navigate('/')}
        className="fixed left-6 top-6 z-50 rounded-full border border-stroke bg-surface px-4 py-2 text-sm text-muted transition-colors hover:text-text-primary"
      >
        ← 返回首页
      </button>

      <ResumeSection />
    </motion.main>
  )
}
