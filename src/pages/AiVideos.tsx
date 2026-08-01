import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'

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
    sections: [
      {
        key: 'official',
        label: '官网',
        type: 'gallery',
        images: [{ caption: '官网视频 01' }, { caption: '官网视频 02' }],
      },
      {
        key: 'sports',
        label: '体育训练局合作视频',
        type: 'gallery',
        images: [{ caption: '合作视频 01' }, { caption: '合作视频 02' }],
      },
      {
        key: 'taobao',
        label: '淘宝首页开屏动画',
        type: 'gallery',
        images: [{ caption: '开屏动画 01' }, { caption: '开屏动画 02' }],
      },
      {
        key: 'douyin',
        label: '抖音信息流',
        type: 'gallery',
        images: [{ caption: '信息流素材 01' }, { caption: '信息流素材 02' }],
      },
    ],
  },
  {
    id: 'workflow',
    title: '视频制作流程梳理',
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
    title: 'AI 工具总览',
    tagline: '视频生产工具矩阵',
    desc: '梳理视频生产各环节所使用的 AI 工具及其分工，形成可复用的工具选型参考，降低团队上手与切换成本。',
    tags: ['工具选型', '能力边界', '协同分工'],
    sections: [
      {
        key: 'matrix',
        label: '工具矩阵',
        type: 'tools',
        items: [],
      },
      {
        key: 'matrix-img',
        label: '工具总览图',
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
        <motion.section
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-3xl border border-stroke bg-surface p-8"
        >
          <h2 className="text-2xl font-medium text-text-primary">{current.title}</h2>
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
      </AnimatePresence>
      </motion.main>
    </>
  )
}
