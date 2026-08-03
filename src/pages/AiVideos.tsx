import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import StackingCards, { type StackingProject } from '../components/StackingCards/StackingCards'

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

/** 项目产出概览：四类视频交付成果，套用 sticky 堆叠卡片样式 */
const PROJECTS: StackingProject[] = [
  {
    number: '01',
    category: 'Brand Film',
    name: '官网品牌视频',
    href: '#',
    images: {
      top: 'https://picsum.photos/seed/v-office-top/600/400',
      bottom: 'https://picsum.photos/seed/v-office-bot/600/400',
      right: 'https://picsum.photos/seed/v-office-right/600/800',
    },
  },
  {
    number: '02',
    category: 'Institutional',
    name: '体育训练局合作视频',
    href: '#',
    images: {
      top: 'https://picsum.photos/seed/v-sport-top/600/400',
      bottom: 'https://picsum.photos/seed/v-sport-bot/600/400',
      right: 'https://picsum.photos/seed/v-sport-right/600/800',
    },
  },
  {
    number: '03',
    category: 'E-commerce',
    name: '淘宝首页开屏动画',
    href: '#',
    images: {
      top: 'https://picsum.photos/seed/v-taobao-top/600/400',
      bottom: 'https://picsum.photos/seed/v-taobao-bot/600/400',
      right: 'https://picsum.photos/seed/v-taobao-right/600/800',
    },
  },
  {
    number: '04',
    category: 'Feed Ads',
    name: '抖音信息流素材',
    href: '#',
    images: {
      top: 'https://picsum.photos/seed/v-douyin-top/600/400',
      bottom: 'https://picsum.photos/seed/v-douyin-bot/600/400',
      right: 'https://picsum.photos/seed/v-douyin-right/600/800',
    },
    videos: [
      'https://files.catbox.moe/2ye1we.mp4',
      'https://files.catbox.moe/r4avnl.mp4',
      'https://files.catbox.moe/1u5gcs.mp4',
      'https://files.catbox.moe/6qkjb5.mp4',
      'https://files.catbox.moe/e1d1ai.mp4',
      'https://files.catbox.moe/lbod0d.mp4',
      'https://files.catbox.moe/m7o55h.mp4',
      'https://files.catbox.moe/l0bb5s.mp4',
    ],
  },
]

type GalleryImage = { src?: string; caption: string }
type ToolItem = { name: string; desc: string }
type Section =
  | { key: string; label: string; type: 'gallery'; images: GalleryImage[] }
  | {
      key: string
      label: string
      type: 'flowchart'
      nodes: string[]
      highlights?: string[]
      image?: string
      caption: string
    }
  | { key: string; label: string; type: 'tools'; items: ToolItem[] }

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
    tagline: '四类视频交付成果',
    desc: '汇总各渠道的 AI 视频产出，覆盖品牌官网、机构合作、电商大促与信息流投放四类典型场景，呈现从长视频到短素材的完整交付能力。',
    tags: ['官网', '机构合作', '电商大促', '信息流'],
    sections: [],
  },
  {
    id: 'workflow',
    title: 'AI 视频制作流程梳理',
    tagline: '三类场景的生产链路',
    desc: '按投放场景拆分生产链路：品牌 TVC 追求质感与叙事完整度，抖音信息流强调批量与迭代速度，爆款复刻侧重结构拆解与快速验证。',
    tags: ['品牌 TVC', '抖音信息流', '爆款复刻'],
    sections: [
      {
        key: 'tvc',
        label: '品牌 TVC',
        type: 'flowchart',
        nodes: [],
        caption: '品牌 TVC 制作流程',
      },
      {
        key: 'douyin-flow',
        label: '抖音信息流',
        type: 'flowchart',
        nodes: [],
        caption: '抖音信息流制作流程',
      },
      {
        key: 'replica',
        label: '爆款复刻',
        type: 'flowchart',
        nodes: [],
        caption: '爆款复刻制作流程',
      },
    ],
  },
  {
    id: 'tools',
    title: 'AI 工具矩阵',
    tagline: '视频生产工具选型',
    desc: '梳理视频生产各环节所使用的 AI 工具及其分工，形成可复用的工具选型参考，降低团队上手与切换成本。',
    tags: ['工具选型', '能力边界', '协同分工'],
    sections: [
      {
        key: 'matrix',
        label: '工具清单',
        type: 'tools',
        items: [],
      },
      {
        key: 'matrix-img',
        label: '矩阵总览图',
        type: 'gallery',
        images: [{ caption: '工具矩阵图' }, { caption: '工具使用示例' }],
      },
    ],
  },
]

export default function AiVideos() {
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
        {current.id === 'overview' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 py-16"
          >
            <StackingCards projects={PROJECTS} />

            {/* 回到顶部 */}
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-sm text-text-primary transition-colors hover:bg-surface/70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                回到顶部
              </button>
            </div>
          </motion.div>
        ) : (
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

                  {sec.type === 'flowchart' && (
                    <div className="flex flex-col gap-6">
                      {/* 流程节点 */}
                      {sec.nodes.length > 0 ? (
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
                      ) : (
                        <div className="flex items-center justify-center rounded-2xl border border-dashed border-stroke bg-bg/40 px-6 py-10 font-body text-xs text-muted">
                          {sec.label}流程节点待补充
                        </div>
                      )}

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

                  {sec.type === 'tools' && (
                    <>
                      {sec.items.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {sec.items.map((tool) => (
                            <SpotlightCard
                              key={tool.name}
                              className="liquid-glass rounded-2xl p-5"
                            >
                              <div className="font-body text-sm font-medium text-text-primary">
                                {tool.name}
                              </div>
                              <p className="mt-1.5 font-body text-xs leading-relaxed text-muted">
                                {tool.desc}
                              </p>
                            </SpotlightCard>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center rounded-2xl border border-dashed border-stroke bg-bg/40 px-6 py-10 font-body text-xs text-muted">
                          工具清单待补充
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
          )}
      </AnimatePresence>
      </motion.main>
    </>
  )
}
