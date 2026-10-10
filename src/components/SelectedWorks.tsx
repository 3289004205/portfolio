import OptimizedImage from './OptimizedImage'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { ArrowUpRight } from 'lucide-react'
import { PROJECT_STORIES } from '../lib/project-stories'

interface Project {
  id: string
  title: string
  span: string
  image: string
  category: string
  tags: string[]
  demo: string
}

const PROJECTS: Project[] = [
  {
    id: 'visual',
    title: '视觉 AI 整合系统',
    span: 'md:col-span-2',
    image: '/explorations/visual-showcase/03-homepage.jpg',
    category: '系统整合',
    tags: ['六大模块', '统一入口', '资源复用'],
    demo: 'https://contentflow-demo.gzzy666666.chatgpt.site',
  },
  {
    id: 'motion-templates',
    title: '动效批量替换',
    span: '',
    image: '/explorations/motion-templates/01-course-carousel.png',
    category: '制作自动化',
    tags: ['素材替换', '动效模板'],
    demo: 'https://course-carousel-studio-m1971.gzzy666666.chatgpt.site/',
  },
  {
    id: 'skill-hub',
    title: 'SKILL整合系统',
    span: '',
    image: '/explorations/skill-hub/01.png',
    category: '工作流组织',
    tags: ['技能分类', '批量任务'],
    demo: 'https://vibex.runninghub.cn/p/app-6525f3761dba4670a50db49150ca40d7/?inviteCode=ridtgiqo',
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
          eyebrow="精选项目 · 从问题到落地"
          titleLead="Selected"
          titleEm="Projects"
          subtext="连接 AI 能力与实际制作流程：从工具整合，到模板复用，再到任务组织。查看项目如何解决问题，以及背后的设计思路。"
          cta="查看全部项目"
          onCta={() => navigate('/ai-apps')}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6"
        >
          {PROJECTS.map((p) => (
            <motion.article
              variants={item}
              key={p.title}
              className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-[#151517] shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-colors duration-300 hover:border-white/30 focus-within:border-white/60 ${p.span}`}
            >
              <div className={`relative flex items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#272729] via-[#1c1c1e] to-[#141416] px-5 pb-6 pt-12 md:px-8 md:pb-8 md:pt-14 ${p.id === 'visual' ? 'aspect-[16/10] md:aspect-[2.2/1]' : 'aspect-[16/10]'}`}>
                <div className="absolute left-5 right-5 top-4 flex items-center justify-between text-[10px] font-medium tracking-[0.14em] text-[#a6a6ae] md:left-8 md:right-8 md:top-5"><span>{p.category}</span><span>{p.id === 'visual' ? 'FEATURED / 01' : p.id === 'motion-templates' ? '02' : '03'}</span></div>
                <OptimizedImage
                  src={p.image}
                  alt={p.title}
                  data-no-zoom
                  loading="lazy"
                  className="max-h-full w-full rounded-lg border border-white/15 object-contain shadow-[0_16px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.015]"
                  sizes={p.id === 'visual' ? '(max-width: 767px) calc(100vw - 88px), 1000px' : '(max-width: 767px) calc(100vw - 88px), 500px'}
                />
              </div>
              <div className={`p-5 md:px-7 md:py-6 ${p.id === 'visual' ? 'md:flex md:items-center md:justify-between md:gap-8' : ''}`}>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-text-primary md:text-2xl"><a href={`#/ai-apps?project=${p.id}`} aria-label={`查看${p.title}案例`} onClick={(event) => { event.preventDefault(); navigate(`/ai-apps?project=${p.id}`) }} className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none">{p.title}<ArrowUpRight size={20} className="ml-3 inline-block text-[#c8c8ce] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></h3>
                  <p className="mt-2 text-sm leading-6 text-[#b6b6bd]">{PROJECT_STORIES[p.id].summary}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#929298]">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className={`relative z-20 inline-flex shrink-0 items-center gap-2 text-xs text-[#dedee2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${p.id === 'visual' ? 'mt-5 md:mt-0' : 'mt-4'}`}>在线体验 <ArrowUpRight size={14} /></a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
