import { ArrowUpRight } from 'lucide-react'

type FeatureImage = { src?: string; caption?: string }
type FeatureRow = {
  title: string
  desc: string
  button: string
  /** 图片网格列数 */
  cols: string
  images: FeatureImage[]
}

const ROWS: FeatureRow[] = [
  {
    title: '页面展示',
    desc: '视觉部 AI 集合化系统的核心页面，覆盖模块导航、无限画布、资产与提示词库、知识库与学习资源。',
    button: '查看页面',
    cols: 'grid-cols-2 md:grid-cols-3',
    images: [
      { caption: '首页 · 模块导航总览' },
      { caption: '无限画布 · 工作流编排' },
      { caption: '图像 / 视频资产库' },
      { caption: '提示词库 · 模板管理' },
      { caption: '知识库 · 沉淀与检索' },
      { caption: '学习资源 · 教程中心' },
    ],
  },
  {
    title: '产品流程图详解',
    desc: '从统一入口登录到结果沉淀与复用，串起 AI 能力调用与团队协作的完整链路。',
    button: '查看流程',
    cols: 'grid-cols-1 md:grid-cols-2',
    images: [{ caption: '流程图 · 总览链路' }, { caption: '流程图 · 协作复用' }],
  },
  {
    title: '原型图展示',
    desc: '早期原型覆盖信息架构、首页布局与画布交互，用于快速验证与对齐。',
    button: '查看原型',
    cols: 'grid-cols-1',
    images: [{ src: 'https://picsum.photos/seed/visual-proto/1200/750' }],
  },
]

function ImageTile({ src, caption }: FeatureImage) {
  return (
    <div className="liquid-glass overflow-hidden rounded-2xl">
      {src ? (
        <img src={src} alt={caption} loading="lazy" className="h-auto w-full" />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface/40 px-3 text-center text-xs text-muted">
          待上传截图
          {caption ? <span className="mt-1 block text-[10px] opacity-70">{caption}</span> : null}
        </div>
      )}
    </div>
  )
}

export default function FeaturesChess() {
  return (
    <section className="bg-[hsl(var(--bg))] px-0 py-24">
      {ROWS.map((row, i) => (
        <div key={row.title} className={i < ROWS.length - 1 ? 'mb-24' : ''}>
          {/* 文字区 */}
          <div className="mb-10 max-w-2xl space-y-5">
            <h3 className="text-3xl font-display italic leading-[0.9] tracking-tight text-text-primary md:text-4xl">
              {row.title}
            </h3>
            <p className="max-w-lg font-body text-sm font-light leading-relaxed text-muted md:text-base">
              {row.desc}
            </p>
            <button className="liquid-glass-strong flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-text-primary transition-all hover:bg-white/10">
              {row.button}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* 图片区 */}
          <div className={`grid gap-4 ${row.cols}`}>
            {row.images.map((img, idx) => (
              <ImageTile key={idx} src={img.src} caption={img.caption} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
