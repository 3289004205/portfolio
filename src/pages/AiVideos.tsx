import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import StackingCards, { type StackingProject } from '../components/StackingCards/StackingCards'
import BackToTop from '../components/BackToTop'
import MiroBoard from '../components/MiroBoard/MiroBoard'

/** 与 FeaturesChess 一致的毛玻璃图片占位（视觉 AI 整合网站形式） */
function FeatureTile({ caption, src }: { caption: string; src?: string }) {
  return (
    <SpotlightCard className="liquid-glass overflow-hidden rounded-2xl">
      {src ? (
        <img src={src} alt={caption} className="h-auto w-full" loading="lazy" />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
          待上传截图
          <span className="mt-1 block text-[10px] opacity-70">{caption}</span>
        </div>
      )}
    </SpotlightCard>
  )
}

/** 项目产出概览：四类视频交付成果，套用 sticky 堆叠卡片样式 */
const PROJECTS: StackingProject[] = [
  {
    number: '01',
    category: 'Brand Film',
    name: '官网品牌视频',
    href: 'https://www.bilibili.com/video/BV1Uouw65E44',
    previews: [
      { bvid: 'BV1Uouw65E44', type: 'mp4', src: '/videos/gifs/brand-01.mp4', orientation: 'landscape' },
      { bvid: 'BV1mouw65ERv', type: 'mp4', src: '/videos/gifs/brand-02.mp4', orientation: 'landscape' },
      { bvid: 'BV1Uouw65EAa', type: 'mp4', src: '/videos/gifs/brand-03.mp4', orientation: 'landscape' },
      { bvid: 'BV1Mouw6LEEH', type: 'mp4', src: '/videos/gifs/brand-04.mp4', orientation: 'landscape' },
      { bvid: 'BV1Uouw65Etu', type: 'mp4', src: '/videos/gifs/brand-05.mp4', orientation: 'landscape' },
      { bvid: 'BV1uouw6LEP6', type: 'mp4', src: '/videos/gifs/brand-06.mp4', orientation: 'landscape' },
      { bvid: 'BV1Uouw65E5w', type: 'mp4', src: '/videos/gifs/brand-07.mp4', orientation: 'landscape' },
      { bvid: 'BV1Uouw65E5J', type: 'mp4', src: '/videos/gifs/brand-08.mp4', orientation: 'landscape' },
      { bvid: 'BV1Uouw65EpJ', type: 'mp4', src: '/videos/gifs/brand-09.mp4', orientation: 'landscape' },
    ],
    images: {
      top: 'https://picsum.photos/seed/v-office-top/600/400',
      bottom: 'https://picsum.photos/seed/v-office-bot/600/400',
      right: 'https://picsum.photos/seed/v-office-right/600/800',
    },
    intro:
      '为品牌官网打造的主形象宣传片，以 AI 生图与视频能力重塑视觉语言，统一官网首屏的叙事调性与质感。',
    roles: ['设计', '生图', '生视频'],
  },
  {
    number: '02',
    category: 'Institutional',
    name: '体育训练局合作视频',
    href: 'https://www.bilibili.com/video/BV1touw6LEQ3',
    bilibili: 'BV1touw6LEQ3',
    images: {
      top: 'https://picsum.photos/seed/v-sport-top/600/400',
      bottom: 'https://picsum.photos/seed/v-sport-bot/600/400',
      right: 'https://picsum.photos/seed/v-sport-right/600/800',
    },
    intro:
      '与体育训练局的机构合作项目，面向训练纪实与成果展示，以 AI 素材补充实拍缺口并完成成片剪辑。',
    roles: ['剪辑', 'AI素材产出'],
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
    intro:
      '淘宝首页开屏级电商动画，服务大促节点曝光，从创意、剧本到成片全流程把控。',
    roles: ['导演', '编剧', '生图', '生视频', '剪辑'],
  },
  {
    number: '04',
    category: 'Feed Ads',
    name: '抖音信息流素材',
    href: 'https://www.bilibili.com/video/BV1TZuw6yEQ2',
    images: {
      top: 'https://picsum.photos/seed/v-douyin-top/600/400',
      bottom: 'https://picsum.photos/seed/v-douyin-bot/600/400',
      right: 'https://picsum.photos/seed/v-douyin-right/600/800',
    },
    intro:
      '抖音信息流投放短视频矩阵，以脚本化方式批量产出，适配不同定向的高效短素材。',
    roles: ['脚本', '生图', '生视频'],
    previews: [
      { bvid: 'BV1TZuw6yEQ2', type: 'mp4', src: '/videos/previews/douyin-01.mp4' },
      { bvid: 'BV1mZuw6CERM', type: 'mp4', src: '/videos/previews/douyin-02.mp4' },
      { bvid: 'BV1TZuw6yEBX', type: 'mp4', src: '/videos/previews/douyin-03.mp4' },
      { bvid: 'BV1mZuw6CEY3', type: 'mp4', src: '/videos/previews/douyin-04.mp4' },
      { bvid: 'BV1Q8uA6QEZX', type: 'mp4', src: '/videos/previews/douyin-05.mp4' },
      { bvid: 'BV1mZuw6CE2e', type: 'mp4', src: '/videos/previews/douyin-06.mp4' },
      { bvid: 'BV1a8uA6QEmt', type: 'mp4', src: '/videos/previews/douyin-07.mp4' },
      { bvid: 'BV1X8uA6QEAU', type: 'mp4', src: '/videos/previews/douyin-08.mp4' },
      { bvid: 'BV1URuw61EmM', type: 'mp4', src: '/videos/previews/douyin-09.mp4' },
    ],
  },
]

type GalleryImage = { src?: string; caption: string }
type BlockItem = { title: string; src?: string; videos?: string[]; videoRow?: boolean; videoCols?: number }
type ToolItem = { name: string; desc: string }
type Section =
  | { key: string; label: string; type: 'gallery'; images: GalleryImage[] }
  | { key: string; label: string; type: 'cards'; items: BlockItem[] }
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
  | { key: string; label: string; type: 'miro'; src?: string; openUrl?: string }

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
    title: 'AI视频流程制定与优化',
    tagline: '两类场景的生产链路',
    desc: '按投放场景拆分生产链路：品牌 TVC 追求质感与叙事完整度，抖音信息流强调批量与迭代速度。',
    tags: ['品牌 TVC', '抖音信息流'],
    sections: [
      {
        key: 'tvc',
        label: '品牌 TVC',
        type: 'miro',
        src: '/explorations/tvc/01.jpg',
        openUrl: '',
      },
      {
        key: 'douyin-flow',
        label: '抖音信息流',
        type: 'cards',
        items: [
          { title: '实拍图转视频', src: '/explorations/dy-flow/01.webp', videos: ['/videos/dy-flow/real-shot-01.mp4', '/videos/dy-flow/real-shot-02.mp4'] },
          { title: '九宫格生视频', src: '/explorations/dy-flow/02.webp', videos: ['/videos/dy-flow/grid-01.mp4'], videoCols: 1 },
          { title: '真人拍摄AI视频', src: '/explorations/dy-flow/03.webp', videos: ['/videos/dy-flow/real-person-01.mp4'], videoCols: 1 },
          { title: '爆款反推脚本生视频', src: '/explorations/dy-flow/05.webp', videos: ['/videos/dy-flow/viral-01.mp4'], videoRow: true },
          { title: '视频换背景', src: '/explorations/dy-flow/06.webp', videos: ['/videos/dy-flow/bg-change-01.mp4', '/videos/dy-flow/bg-change-02.mp4'] },
          { title: '视频换装', src: '/explorations/dy-flow/07.webp', videos: ['/videos/dy-flow/change-clothes-01.mp4', '/videos/dy-flow/change-clothes-02.mp4'] },
          { title: '视频换人', src: '/explorations/dy-flow/08.webp', videos: ['/videos/dy-flow/change-face-01.mp4', '/videos/dy-flow/change-face-02.mp4', '/videos/dy-flow/change-face-03.mp4'], videoCols: 3 },
        ],
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
            <BackToTop />
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

                  {sec.type === 'miro' && (
                  <MiroBoard src={sec.src} title={sec.label} openUrl={sec.openUrl} />
                )}

                {sec.type === 'gallery' && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {sec.images.map((img) => (
                        <FeatureTile key={img.caption} caption={img.caption} src={img.src} />
                      ))}
                    </div>
                  )}

                  {sec.type === 'cards' && (
                    <div className="columns-1 gap-4 md:columns-2">
                      {sec.items.map((item, i) => (
                        <SpotlightCard
                          key={item.title}
                          className="liquid-glass mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl"
                        >
                          <div className="flex items-baseline gap-2 border-b border-stroke px-4 py-3">
                            <span className="font-body text-[10px] tracking-[0.2em] text-muted">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="font-body text-sm font-medium text-text-primary">
                              {item.title}
                            </span>
                          </div>
                          {item.videoRow ? (
                            <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2">
                              {item.src && (
                                <img
                                  src={item.src}
                                  alt={item.title}
                                  className="h-auto w-full rounded-xl border border-stroke"
                                  loading="lazy"
                                />
                              )}
                              <div className="flex flex-col gap-3">
                                {item.videos?.map((v) => (
                                  <video
                                    key={v}
                                    src={v}
                                    controls
                                    muted
                                    playsInline
                                    className="h-auto w-full rounded-xl border border-stroke bg-black/20"
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <>
                              {item.src ? (
                                <img src={item.src} alt={item.title} className="h-auto w-full" loading="lazy" />
                              ) : (
                                <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
                                  待上传截图
                                  <span className="mt-1 block text-[10px] opacity-70">{item.title}</span>
                                </div>
                              )}
                              {item.videos && item.videos.length > 0 && (
                                <div
                                  className={
                                    item.videoCols
                                      ? 'grid gap-3 p-3'
                                      : 'grid grid-cols-1 gap-3 p-3 sm:grid-cols-2'
                                  }
                                  style={
                                    item.videoCols
                                      ? { gridTemplateColumns: `repeat(${item.videoCols}, minmax(0, 1fr))` }
                                      : undefined
                                  }
                                >
                                  {item.videos.map((v) => (
                                    <video
                                      key={v}
                                      src={v}
                                      controls
                                      muted
                                      playsInline
                                      className="h-auto w-full rounded-xl border border-stroke bg-black/20"
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </SpotlightCard>
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
            <BackToTop />
          </motion.section>
          )}
      </AnimatePresence>
      </motion.main>
    </>
  )
}
