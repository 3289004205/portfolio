import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ResumeSection from '../components/ResumeSection'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full bg-bg"
    >
      <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-12 md:px-10 lg:px-16">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-muted transition-colors hover:text-text-primary"
        >
          ← 返回首页
        </button>
      </div>

      <ResumeSection />
    </motion.main>
  )
}
