import SpotlightCard from '../SpotlightCard/SpotlightCard'

type FeatureImage = { src?: string; caption?: string }
type FeatureRow = {
  title: string
  /** 图片网格列数 */
  cols: string
  images: FeatureImage[]
}

const ROWS: FeatureRow[] = [
  {
    title: '页面展示',
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
    cols: 'grid-cols-1 md:grid-cols-2',
    images: [{ caption: '流程图 · 总览链路' }, { caption: '流程图 · 协作复用' }],
  },
  {
    title: '原型图展示',
    cols: 'grid-cols-1',
    images: [{ src: 'https://picsum.photos/seed/visual-proto/1200/750' }],
  },
]

function ImageTile({ src, caption }: FeatureImage) {
  return (
    <SpotlightCard className="liquid-glass overflow-hidden rounded-2xl">
      {src ? (
        <img src={src} alt={caption} loading="lazy" className="h-auto w-full" />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
          待上传截图
          {caption ? <span className="mt-1 block text-[10px] opacity-70">{caption}</span> : null}
        </div>
      )}
    </SpotlightCard>
  )
}

export default function FeaturesChess() {
  return (
    <section className="px-0 py-24">
      {ROWS.map((row, i) => (
        <div key={row.title} className={i < ROWS.length - 1 ? 'mb-24' : ''}>
          {/* 文字区 */}
          <div className="mb-10 max-w-2xl">
            <h3 className="text-3xl font-display italic leading-[0.9] tracking-tight text-text-primary md:text-4xl">
              {row.title}
            </h3>
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
