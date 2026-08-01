import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import StackingCards, { type StackingProject } from '../components/StackingCards/StackingCards'

/** 项目产出概览：套用 sticky 堆叠卡片样式（数据来自设计提示词） */
const PROJECTS: StackingProject[] = [
  {
    number: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    href: '#',
    images: {
      top: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      bottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    href: '#',
    images: {
      top: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      bottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
  },
  {
    number: '03',
    category: 'Client',
    name: 'Solaris Digital',
    href: '#',
    images: {
      top: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      bottom: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      right: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
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
    tagline: '精选视频项目合集',
    desc: '精选的 AI 视频项目合集，覆盖品牌官网、个人作品与数字体验三类场景。向下滚动，项目卡片会逐张堆叠展开。',
    tags: ['Client', 'Personal', 'Showcase'],
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
                active ? 'rgba(137, 170, 204, 0.45)' : 'rgba(255, 255, 255, 0.18)'
              }
              className={`flex flex-col rounded-2xl border p-5 text-left transition-all ${
                active
                  ? 'border-text-primary bg-surface shadow-sm shadow-black/10'
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
          >
            <div className="rounded-3xl border border-stroke bg-surface p-8">
              <h2 className="text-2xl font-medium text-text-primary">
                {current.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {current.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-stroke bg-bg px-3 py-1.5 text-xs text-text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <StackingCards projects={PROJECTS} />
          </motion.div>
        ) : (
          <motion.section
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-3xl border border-stroke bg-surface p-8 pb-20"
          >
            <h2 className="text-2xl font-medium text-text-primary">
              {current.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {current.desc}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {current.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-stroke bg-bg px-3 py-1.5 text-xs text-text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-10">
              {current.sections.map((sec) => (
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
                              className="aspect-video w-full object-cover"
                            />
                          ) : (
                            <div className="flex aspect-video w-full items-center justify-center bg-surface text-xs text-muted">
                              待上传{sec.label}素材
                            </div>
                          )}
                          <figcaption className="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 text-xs text-text-primary">
                            {img.caption}
                          </figcaption>
                        </figure>
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
                              <div className="flex min-w-[130px] flex-1 flex-col justify-center rounded-2xl border border-stroke bg-bg px-4 py-4">
                                <span className="text-[10px] tracking-[0.2em] text-muted">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="mt-1.5 text-sm font-medium leading-snug text-text-primary">
                                  {node}
                                </span>
                              </div>
                              {i < sec.nodes.length - 1 && (
                                <div className="flex items-center justify-center text-muted">
                                  →
                                </div>
                              )}
                            </Fragment>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center rounded-2xl border border-dashed border-stroke bg-bg/40 px-6 py-10 text-xs text-muted">
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
                      <figure className="relative overflow-hidden rounded-2xl border border-stroke bg-bg">
                        {sec.image ? (
                          <img
                            src={sec.image}
                            alt={sec.caption}
                            className="aspect-[16/9] w-full object-cover"
                          />
                        ) : (
                          <div className="flex aspect-[16/9] w-full items-center justify-center bg-surface text-xs text-muted">
                            待上传{sec.label}流程图
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
                            <div
                              key={tool.name}
                              className="rounded-2xl border border-stroke bg-bg p-5"
                            >
                              <div className="text-sm font-medium text-text-primary">
                                {tool.name}
                              </div>
                              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                                {tool.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center rounded-2xl border border-dashed border-stroke bg-bg/40 px-6 py-10 text-xs text-muted">
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
