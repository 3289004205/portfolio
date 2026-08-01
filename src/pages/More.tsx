import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import RaysBackground from '../components/SideRays/RaysBackground'

const ITEMS = [
  {
    title: '生成式 UI 实验',
    desc: '探索 AI 辅助界面设计：从需求描述到可编辑设计稿的自动化流程。',
  },
  {
    title: '声音与音乐生成',
    desc: '文本生成音效、背景音乐与语音合成，为视频与交互产品补充听觉体验。',
  },
  {
    title: 'AI 工作流自动化',
    desc: '将提示工程、模型调用与后期处理编排成稳定、可复用的自动化流水线。',
  },
]

export default function More() {
  const navigate = useNavigate()

  return (
    <>
      <RaysBackground />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto min-h-screen max-w-[1100px] bg-transparent px-6 py-24 md:px-10"
      >
      <button
        onClick={() => navigate('/')}
        className="mb-12 text-sm text-muted transition-colors hover:text-text-primary"
      >
        ← 返回首页
      </button>

      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">More Explorations</span>
      </div>

      <h1 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
        其他探索
      </h1>
      <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
        除了核心方向之外，我还在尝试更多生成式 AI 的交叉领域与实验性项目。
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {ITEMS.map((item) => (
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
    </>
  )
}
