import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SectionHeader from './SectionHeader'

interface Project {
  title: string
  span: string
  aspect: string
  image: string
}

const PROJECTS: Project[] = [
  {
    title: 'Automotive Motion',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Urban Architecture',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Human Perspective',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Brand Identity',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function SelectedWorks() {
  const navigate = useNavigate()

  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="精选作品"
          titleLead="AI"
          titleEm="Application"
          subtext="汇集 AI 应用在各业务场景的实践成果，从需求拆解到落地交付，覆盖视觉、客服、知识与效率工具等方向。"
          cta="查看全部作品"
          onCta={() => navigate('/ai-apps')}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6"
        >
          {PROJECTS.map((p) => (
            <motion.a
              variants={item}
              key={p.title}
              href="#"
              className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface ${p.span}`}
            >
              <div className={`relative w-full ${p.aspect} overflow-hidden`}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Halftone overlay */}
                <div className="halftone-overlay pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
                {/* Hover veil */}
                <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-300 group-hover:opacity-100">
                  <span className="gradient-ring inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-bg">
                    View — <span className="ml-1 font-display italic">{p.title}</span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
