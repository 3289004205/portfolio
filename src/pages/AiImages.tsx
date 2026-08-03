import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import Masonry, { type MasonryItem } from '../components/Masonry/Masonry'

/** 与 FeaturesChess 一致的毛玻璃图片占位（视觉 AI 整合网站形式） */
function FeatureTile({ caption }: { caption: string }) {
  return (
    <SpotlightCard className="liquid-glass overflow-hidden rounded-2xl">
      <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
        待上传截图
        <span className="mt-1 block text-[10px] opacity-70">{caption}</span>
      </div>
    </SpotlightCard>
  )
}

// 占位图：换成真实截图时把 img / url 换掉即可。
// 注意 Masonry 内部用全局 [data-key] 选择器，多组瀑布流的 id 必须唯一。
const makeMasonryItems = (prefix: string, heights: number[]): MasonryItem[] =>
  heights.map((h, i) => {
    const src = `https://picsum.photos/seed/${prefix}${i + 1}/600/${h}`
    return {
      id: `${prefix}-${i + 1}`,
      img: src,
      url: `https://picsum.photos/seed/${prefix}${i + 1}/1200/${h * 2}`,
      height: h,
    }
  })

const DETAIL_ITEMS = makeMasonryItems('detail', [600, 820, 480, 700, 560, 780])
const BRAND_ITEMS = makeMasonryItems('brand', [720, 520, 640, 860, 500, 680])
const AMAZON_ITEMS = makeMasonryItems('amazon', [540, 760, 620, 500, 800, 660])

type GalleryImage = { src?: string; caption: string }
type FlowStep = { title: string; desc: string }
type ContentItem = { title: string; desc: string; link?: string }
type Section =
  | { key: string; label: string; type: 'gallery'; images: GalleryImage[] }
  | { key: string; label: string; type: 'masonry'; items: MasonryItem[] }
  | { key: string; label: string; type: 'flow'; steps: FlowStep[] }
  | {
      key: string
      label: string
      type: 'flowchart'
      nodes: string[]
      highlights?: string[]
      image?: string
      caption: string
    }
  | { key: string; label: string; type: 'content'; items: ContentItem[] }

type Module = {
  id: string
  title: string
  tagline: string
  desc: string
  tags: string[]
  sections: Section[]
}

const MODULES: Module[] = [
  {
    id: 'overview',
    title: '项目产出概览',
    tagline: '精选图像作品集',
    desc: '汇总各业务线的 AI 图像产出成果，按详情页素材、品牌物料、亚马逊 A+ 三类场景归档，直观呈现整体产能与质量水位。',
    tags: ['详情页素材', '品牌物料', '亚马逊 A+'],
    sections: [
      {
        key: 'detail',
        label: '详情页素材',
        type: 'masonry',
        items: DETAIL_ITEMS,
      },
      {
        key: 'brand',
        label: '品牌物料',
        type: 'masonry',
        items: BRAND_ITEMS,
      },
      {
        key: 'amazon',
        label: '亚马逊 A+',
        type: 'masonry',
        items: AMAZON_ITEMS,
      },
    ],
  },
  {
    id: 'flow',
    title: 'AI 图像流程制定与动态优化',
    tagline: '从需求到交付的标准流程',
    desc: '将零散的出图经验固化为可执行、可复用、可迭代的标准流程：先完成设计工具底座迁移，再针对不同业务场景拆分专项工作流，并在生成过程中依据反馈持续动态调优。',
    tags: ['Figma', 'Midjourney', 'Nano Banana', 'ComfyUI', 'Photoshop'],
    sections: [
      {
        key: 'tooling',
        label: '设计工具从 PS 转向 Figma',
        type: 'flowchart',
        nodes: ['Photoshop', 'Figma'],
        highlights: ['团队协同', '画布不受限', 'AI 功能', '插件生态丰富'],
        caption: '设计工具迁移示意',
      },
      {
        key: 'detail-scene',
        label: '详情页场景图 AI 生产工作流',
        type: 'flowchart',
        nodes: [
          '参考图',
          '结构化反推提示词智能体',
          'Midjourney 生图',
          'Nano Banana 洗图',
          'ComfyUI 洗图',
          'ComfyUI 放大',
          'PS 处理',
        ],
        caption: '详情页场景图工作流',
      },
      {
        key: 'brand',
        label: '品牌物料专项工作流',
        type: 'flowchart',
        nodes: ['参考图', 'ComfyUI 洗图', 'ComfyUI 无损放大', 'PS 处理'],
        caption: '品牌物料工作流',
      },
    ],
  },
  {
    id: 'post',
    title: '后期工作流',
    tagline: '模板沉淀与业务落地',
    desc: '把验证过的出图流程封装成标准化模板，向各业务场景批量输出，并通过效果对比量化优化收益。',
    tags: ['工作流模板', '业务应用', '效果对比', 'RunningHub'],
    sections: [
      {
        key: 'modules',
        label: '工作流构成',
        type: 'content',
        items: [
          {
            title: '工作流模板',
            desc: '沉淀常用出图流程为标准化 ComfyUI 模板，降低复用与协作门槛。',
          },
          {
            title: '业务应用',
            desc: '服务于电商主图、广告投放、社媒物料等高频业务场景。',
          },
          {
            title: '生成效果对比',
            desc: '提供调参前后的成片对比，直观评估优化收益与风格差异。',
          },
          {
            title: 'RunningHub 链接',
            desc: '在 RunningHub 上发布与分享工作流，便于外部协作与复用。',
            link: 'https://www.runninghub.cn/',
          },
        ],
      },
    ],
  },
]

export default function AiImages() {
  const [selected, setSelected] = useState(MODULES[0].id)
  const current = MODULES.find((m) => m.id === selected) ?? MODULES[0]

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
      {/* 顶部选择卡片 */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {MODULES.map((mod) => {
          const active = mod.id === selected
          return (
            <SpotlightCard
              key={mod.id}
              as="button"
              type="button"
              onClick={() => setSelected(mod.id)}
              spotlightColor={
                active ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.18)'
              }
              className={`flex flex-col rounded-2xl border p-5 text-left transition-all ${
                active
                  ? 'border-stroke bg-surface shadow-[0_0_28px_-6px_rgba(137,170,204,0.55)]'
                  : 'border-stroke bg-surface/40 hover:bg-surface/70'
              }`}
            >
              <span
                className={`text-base font-medium ${
                  active ? 'text-text-primary' : 'text-text-primary/80'
                }`}
              >
                {mod.title}
              </span>
              <span className="mt-1 text-xs text-muted">{mod.tagline}</span>
            </SpotlightCard>
          )
        })}
      </div>

      {/* 选中模块详情 */}
      <AnimatePresence mode="wait">
        <motion.section
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-8 py-16"
        >
          <div className="flex flex-col">
            {current.sections.map((sec, si) => (
              <div
                key={sec.key}
                className={si < current.sections.length - 1 ? 'mb-24' : ''}
              >
                <div className="mb-10 max-w-2xl space-y-5">
                  <h3 className="text-3xl font-display italic leading-[0.9] tracking-tight text-text-primary md:text-4xl">
                    {sec.label}
                  </h3>
                </div>

                {sec.type === 'gallery' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {sec.images.map((img) => (
                      <FeatureTile key={img.caption} caption={img.caption} />
                    ))}
                  </div>
                )}

                {sec.type === 'masonry' && (
                  <div className="relative w-full">
                    <Masonry items={sec.items} />
                  </div>
                )}

                {sec.type === 'flow' && (
                  <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-5">
                    {sec.steps.map((step, i) => (
                      <Fragment key={step.title}>
                        <SpotlightCard className="flex-1 liquid-glass rounded-2xl p-6">
                          <div className="font-body text-xs text-muted">步骤 {i + 1}</div>
                          <div className="mt-1 font-body text-sm font-medium text-text-primary">
                            {step.title}
                          </div>
                          <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                            {step.desc}
                          </p>
                        </SpotlightCard>
                        {i < sec.steps.length - 1 && (
                          <div className="hidden items-center justify-center text-muted md:flex">
                            →
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                )}

                {sec.type === 'flowchart' && (
                  <div className="flex flex-col gap-6">
                    {/* 流程节点 */}
                    <div className="flex flex-wrap items-stretch gap-3">
                      {sec.nodes.map((node, i) => (
                        <Fragment key={node}>
                          <SpotlightCard className="flex min-w-[130px] flex-1 flex-col justify-center liquid-glass rounded-2xl px-4 py-4">
                            <span className="font-body text-[10px] tracking-[0.2em] text-muted">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="mt-1.5 font-body text-sm font-medium leading-snug text-text-primary">
                              {node}
                            </span>
                          </SpotlightCard>
                          {i < sec.nodes.length - 1 && (
                            <div className="flex items-center justify-center text-muted">
                              →
                            </div>
                          )}
                        </Fragment>
                      ))}
                    </div>

                    {/* 关键收益 */}
                    {sec.highlights && (
                      <div className="flex flex-wrap gap-2">
                        {sec.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full border border-stroke bg-bg px-3 py-1.5 text-xs text-muted"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 流程图片卡片 */}
                    <figure className="relative liquid-glass overflow-hidden rounded-2xl">
                      {sec.image ? (
                        <img
                          src={sec.image}
                          alt={sec.caption}
                          className="aspect-[16/9] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
                          待上传截图
                          <span className="mt-1 block text-[10px] opacity-70">{sec.caption}</span>
                        </div>
                      )}
                      <figcaption className="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 text-xs text-text-primary">
                        {sec.caption}
                      </figcaption>
                    </figure>
                  </div>
                )}

                {sec.type === 'content' && (
                  <div className="flex flex-col gap-4">
                    {sec.items.map((item, i) => (
                      <SpotlightCard
                        key={i}
                        className="liquid-glass rounded-2xl p-6"
                      >
                        <div className="font-body text-base font-medium text-text-primary">
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-text-primary transition-colors hover:text-muted"
                            >
                              {item.title} <span className="text-xs">↗</span>
                            </a>
                          ) : (
                            item.title
                          )}
                        </div>
                        <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                          {item.desc}
                        </p>
                      </SpotlightCard>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>
      </motion.main>
    </>
  )
}
