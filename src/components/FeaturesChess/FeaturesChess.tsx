import { ArrowUpRight } from 'lucide-react'

const FEATURE_1_GIF =
  'https://motionsites.ai/assets/hero-grow-ai-preview-BlQ8tAQ-.gif'
const FEATURE_2_GIF =
  'https://motionsites.ai/assets/hero-glassmorphism-agency-preview-CGqeRoqP.gif'

type FeatureRow = {
  title: string
  desc: string
  button: string
  image: string
  /** true = 图片在左（文字在右）；false = 文字在左（图片在右） */
  imageLeft: boolean
}

const ROWS: FeatureRow[] = [
  {
    title: '页面展示',
    desc: '视觉部 AI 集合化系统的核心页面，覆盖模块导航、无限画布、资产与提示词库、知识库与学习资源。',
    button: '查看页面',
    image: FEATURE_1_GIF,
    imageLeft: false,
  },
  {
    title: '产品流程图详解',
    desc: '从统一入口登录到结果沉淀与复用，串起 AI 能力调用与团队协作的完整链路。',
    button: '查看流程',
    image: FEATURE_2_GIF,
    imageLeft: true,
  },
  {
    title: '原型图展示',
    desc: '早期原型覆盖信息架构、首页布局与画布交互，用于快速验证与对齐。',
    button: '查看原型',
    image: 'https://picsum.photos/seed/visual-proto/1200/750',
    imageLeft: false,
  },
]

export default function FeaturesChess() {
  return (
    <section className="bg-[hsl(var(--bg))] py-24 px-6 md:px-16 lg:px-24">
      {/* 区块标题 */}
      <div className="text-center mb-20">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-text-primary font-body inline-block mb-4">
          核心能力
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary tracking-tight leading-[0.9]">
          专业能力，化繁为简
        </h2>
      </div>

      {ROWS.map((row, i) => (
        <div
          key={row.title}
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
            i < ROWS.length - 1 ? 'mb-24' : ''
          } ${row.imageLeft ? 'lg:flex-row-reverse' : ''}`}
        >
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl md:text-4xl font-display italic text-text-primary leading-[0.9] tracking-tight">
              {row.title}
            </h3>
            <p className="text-muted font-body font-light leading-relaxed text-sm md:text-base max-w-lg">
              {row.desc}
            </p>
            <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-text-primary flex items-center gap-2 hover:bg-white/10 transition-all font-body">
              {row.button}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="liquid-glass rounded-2xl overflow-hidden">
              <img
                src={row.image}
                alt={row.title}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
