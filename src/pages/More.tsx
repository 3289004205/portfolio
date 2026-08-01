import { motion } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'

type Block = {
  title: string
  desc: string
  tags?: string[]
  image?: string
}

const BLOCKS: Block[] = [
  {
    title: '数字人应用',
    desc: '基于数字人技术落地视频生产与培训场景，覆盖内容生成到流程化交付。',
    tags: ['数字人视频', '流程与培训'],
  },
  {
    title: 'LoRA 训练',
    desc: '针对产品与人物分别训练专属 LoRA 模型，沉淀可复用的风格与特征资产。',
    tags: ['产品类', '人物类'],
  },
  {
    title: '3D 渲染',
    desc: '结合 AI 与 3D 管线，输出高质量静帧与动态渲染内容。',
    tags: ['图片', '视频'],
  },
  {
    title: '原型设计',
    desc: '从官网页面到交互细节，快速验证产品形态与用户体验。',
    tags: ['官网页面设计', '交互设计'],
  },
  {
    title: 'RPA 应用',
    desc: '用自动化流程替代重复人工，覆盖素材搜集与每日信息整理。',
    tags: ['自动素材搜集', 'AI 日报信息收集'],
  },
  {
    title: '流程化应用',
    desc: '将分散的 AI 能力与业务动作编排为标准化、可复用的流程化应用。',
    tags: [],
  },
]

export default function More() {
  return (
    <>
      <Navbar />
      <RaysBackground />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto min-h-screen max-w-[1100px] bg-transparent px-6 py-24 md:px-10"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            More Explorations
          </span>
        </div>

        <h1 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
          其他探索
        </h1>
        <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
          除了核心方向之外，我还在尝试更多生成式 AI 的交叉领域与实验性项目。
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((block) => (
            <div
              key={block.title}
              className="flex flex-col rounded-3xl border border-stroke bg-surface p-6 transition-colors hover:bg-surface/70"
            >
              <div className="liquid-glass mb-5 overflow-hidden rounded-2xl">
                {block.image ? (
                  <img
                    src={block.image}
                    alt={block.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] w-full items-center justify-center bg-surface/40 text-xs text-muted">
                    待上传{block.title}截图
                  </div>
                )}
              </div>

              <h3 className="text-lg text-text-primary">{block.title}</h3>
              <p className="mt-2 text-sm text-muted">{block.desc}</p>

              {block.tags && block.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {block.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.main>
    </>
  )
}
