import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const APPS = [
  {
    title: '智能客服助手',
    desc: '基于大语言模型的企业级客服系统，支持多轮对话与知识库检索。',
  },
  {
    title: '内容生成工作台',
    desc: '一站式 AI 文案、脚本与营销素材生成平台，提升团队创作效率。',
  },
  {
    title: '数据洞察 Agent',
    desc: '连接业务数据，自动生成分析报告与可视化图表。',
  },
]

export default function AiApps() {
  const navigate = useNavigate()

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto min-h-screen max-w-[1100px] bg-bg px-6 py-24 md:px-10"
    >
      <button
        onClick={() => navigate('/')}
        className="mb-12 text-sm text-muted transition-colors hover:text-text-primary"
      >
        ← 返回首页
      </button>

      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">AI Applications</span>
      </div>

      <h1 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
        AI 应用
      </h1>
      <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
        将生成式 AI 落地为可复用、可规模化的产品能力，覆盖文本、数据与自动化场景。
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {APPS.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-stroke bg-surface p-6 transition-colors hover:bg-surface/70"
          >
            <h3 className="text-lg text-text-primary">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.main>
  )
}
