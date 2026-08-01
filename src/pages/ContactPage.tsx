import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ResumeSection from '../components/ResumeSection'
import FadeContent from '../components/FadeContent/FadeContent'

const EXTRA = [
  {
    title: 'RAG',
    tag: 'RAG / Knowledge Base',
    desc: '基于检索增强生成搭建企业知识库与问答系统，把分散文档沉淀为可对话、可追溯的智能知识资产。',
    image: 'https://picsum.photos/seed/rag-knowledge/800/600',
  },
  {
    title: '影刀 RPA',
    tag: 'Yingdao RPA',
    desc: '基于影刀 RPA 设计可视化自动化流程，把跨系统的重复操作编排为稳定、可监控的自动任务，释放人力。',
    image: 'https://picsum.photos/seed/yingdao-rpa/800/600',
  },
]

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

      {/* 其他探索：RAG & 影刀 RPA */}
      <section className="w-full bg-bg pb-16 pt-2">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              More Explorations · 其他探索
            </span>
          </div>

          <h2 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
            AI <span className="font-display italic">Beyond</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
            图像与视频之外，围绕 RAG 知识库与影刀 RPA 的自动化、知识化实验。
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {EXTRA.map((item, i) => (
              <FadeContent
                key={item.title}
                blur
                duration={1000}
                ease="power2.out"
                threshold={0.2}
                initialOpacity={0}
                delay={i * 0.1}
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stroke bg-surface transition-colors hover:bg-surface/70">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                      {item.tag}
                    </span>
                    <h3 className="mt-1.5 text-base text-text-primary">{item.title}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      <ResumeSection />
    </motion.main>
  )
}
