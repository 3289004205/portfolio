import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SectionHeader from './SectionHeader'

interface Project {
  id: string
  title: string
  span: string
  aspect: string
  image: string
  align?: string
}

const PROJECTS: Project[] = [
  {
    id: 'visual',
    title: '视觉 AI 整合网站',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image: '/homepage/app-visual.jpg',
  },
  {
    id: 'preset',
    title: '预设生成网站',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
    image: '/homepage/app-preset.jpg',
  },
  {
    id: 'kb',
    title: '知识库',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
    image: '/homepage/app-kb.jpg',
    align: 'object-left',
  },
  {
    id: 'others',
    title: '其他应用',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image: '/homepage/app-others.jpg',
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
          className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-12 md:gap-6"
        >
          {PROJECTS.map((p) => (
                                    <motion.a
              variants={item}
              key={p.title}
              href={`#/ai-apps`}
              onClick={(e) => {
                e.preventDefault()
                navigate('/ai-apps', { state: { app: p.id } })
              }}
              className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface ${p.span}`}
            >
              <div className={`relative h-full w-full ${p.aspect} overflow-hidden`}>
                <img
                  src={p.image}
                  alt={p.title}
                  data-no-zoom
                  loading="lazy"
                  className={`h-full w-full object-cover ${p.align ?? ''} transition-transform duration-700 group-hover:scale-105`}
                />
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
