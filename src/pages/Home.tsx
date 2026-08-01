import { useState, useEffect } from 'react'
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

const HOME_LOADED_KEY = 'portfolio_home_loaded'

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem(HOME_LOADED_KEY) !== '1'
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      sessionStorage.setItem(HOME_LOADED_KEY, '1')
    }
  }, [isLoading])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <Hero />
      <SelectedWorks />
      <section style={{ backgroundColor: '#0C0C0C' }}>
        <div className="mx-auto max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32 lg:px-16 pb-2">
          <SectionHeader
            eyebrow="Selected Work"
            titleLead="AI"
            titleEm="Image"
            subtext="A selection of projects I've worked on, from concept to launch."
            cta="View all work"
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
