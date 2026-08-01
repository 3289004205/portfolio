import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const IMAGES = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600&auto=format&fit=crop',
]

type GalleryImage = { src?: string; caption: string }
type FlowStep = { title: string; desc: string }
type ContentItem = { title: string; desc: string; link?: string }
type Section =
  | { key: string; label: string; type: 'gallery'; images: GalleryImage[] }
  | { key: string; label: string; type: 'flow'; steps: FlowStep[] }
  | { key: string; label: string; type: 'content'; items: ContentItem[] }

const SECTIONS: Section[] = [
  {
    key: 'overview',
    label: '项目产出概览',
    type: 'gallery',
    images: IMAGES.map((src, i) => ({ src, caption: `项目产出 ${i + 1}` })),
  },
  {
    key: 'flow',
    label: 'AI 图像流程制定与动态优化',
    type: 'flow',
    steps: [
      { title: '需求拆解与风格定位', desc: '明确业务场景、目标风格与交付标准，对齐预期。' },
      { title: '提示词与参数制定', desc: '编写结构化提示词，确定模型、采样与尺寸等参数。' },
      { title: 'ComfyUI 工作流搭建', desc: '封装可复用工作流，沉淀为团队模板。' },
      { title: '生成与动态优化', desc: '批量生成并据反馈动态调参，迭代风格与质量。' },
      { title: '质量评估与交付', desc: '评估准确性与商业性，输出成品并归档复用。' },
    ],
  },
  {
    key: 'post',
    label: '后期工作流',
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
]

export default function AiImages() {
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
        <span className="text-xs uppercase tracking-[0.3em] text-muted">AI Images</span>
      </div>

      <h1 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl">
        AI 图像
      </h1>
      <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
        文生图、图生图、风格迁移与视觉合成——从概念到成品的图像生成工作流。
      </p>

      <AnimatePresence mode="wait">
        <motion.section
          key="ai-images"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-3xl border border-stroke bg-surface p-8"
        >
          <div className="mt-2 flex flex-col gap-10">
            {SECTIONS.map((sec) => (
              <div key={sec.key}>
                <h3 className="mb-4 text-lg font-medium text-text-primary">
                  {sec.label}
                </h3>

                {sec.type === 'gallery' && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {sec.images.map((img) => (
                      <figure
                        key={img.caption}
                        className="relative overflow-hidden rounded-2xl border border-stroke bg-bg"
                      >
                        {img.src ? (
                          <img
                            src={img.src}
                            alt={img.caption}
                            className="aspect-[4/3] w-full object-cover"
                          />
                        ) : (
                          <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface text-xs text-muted">
                            待上传{sec.label}截图
                          </div>
                        )}
                        <figcaption className="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 text-xs text-text-primary">
                          {img.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {sec.type === 'flow' && (
                  <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-5">
                    {sec.steps.map((step, i) => (
                      <Fragment key={step.title}>
                        <div className="flex-1 rounded-2xl border border-stroke bg-bg p-6">
                          <div className="text-xs text-muted">步骤 {i + 1}</div>
                          <div className="mt-1 text-sm font-medium text-text-primary">
                            {step.title}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted">
                            {step.desc}
                          </p>
                        </div>
                        {i < sec.steps.length - 1 && (
                          <div className="hidden items-center justify-center text-muted md:flex">
                            →
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                )}

                {sec.type === 'content' && (
                  <div className="flex flex-col gap-4">
                    {sec.items.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-stroke bg-bg p-6"
                      >
                        <div className="text-base font-medium text-text-primary">
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
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>
    </motion.main>
  )
}
