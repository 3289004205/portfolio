import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SelectedWorks from '../components/SelectedWorks'
import SectionHeader from '../components/SectionHeader'
import ImageMarqueeSection from '../components/ImageMarqueeSection'
import Explorations from '../components/Explorations'
import MoreExplorationsSection from '../components/MoreExplorationsSection'
import ContactFooter from '../components/ContactFooter'

// 本次页面加载的落地路由（HashRouter：#/ai-apps -> /ai-apps）
const ENTRY_PATH =
  typeof window === 'undefined'
    ? '/'
    : window.location.hash.replace(/^#/, '').split('?')[0] || '/'

// 仅当「本次页面加载的落地页就是首页」时播放开场动画。
// 站内切回首页不再播放；浏览器刷新 / 重新打开网站会重新播放。
let introPending = ENTRY_PATH === '/'

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => introPending)
  const navigate = useNavigate()

  const handleIntroComplete = () => {
    introPending = false
    setIsLoading(false)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isLoading && <LoadingScreen onComplete={handleIntroComplete} />}
      <Navbar />
      <Hero />
      <SelectedWorks />
      <section style={{ backgroundColor: '#0C0C0C' }}>
        <div className="mx-auto max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32 lg:px-16 pb-2">
          <SectionHeader
            eyebrow="精选作品"
            titleLead="AI"
            titleEm="Image"
            subtext="汇集 AI 图像在各业务线的产出成果，从概念到落地，呈现完整的视觉交付链路与质量。"
            cta="查看全部作品"
            onCta={() => navigate('/ai-images')}
            className="!mb-0"
          />
        </div>
      </section>
      <ImageMarqueeSection />
      <Explorations />
      <MoreExplorationsSection />
      <ContactFooter />
    </motion.main>
  )
}
