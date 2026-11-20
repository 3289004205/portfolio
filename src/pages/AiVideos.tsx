import OptimizedImage from '../components/OptimizedImage'
import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import VideoProjectArc, { type VideoProject } from '../components/VideoProjectArc'
import BackToTop from '../components/BackToTop'
import MiroBoard from '../components/MiroBoard/MiroBoard'
import StatsPanel from '../components/StatsPanel/StatsPanel'
import WorkflowVideo from '../components/WorkflowVideo'
import websiteVideoClips from '../lib/website-video-clips.json'

/** 与 FeaturesChess 一致的毛玻璃图片占位（视觉 AI 整合网站形式） */
function FeatureTile({ caption, src }: { caption: string; src?: string }) {
  return (
    <SpotlightCard className="liquid-glass overflow-hidden rounded-2xl">
      {src ? (
        <OptimizedImage src={src} alt={caption} className="h-auto w-full" loading="lazy" />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
          待上传截图
          <span className="mt-1 block text-[10px] opacity-70">{caption}</span>
        </div>
      )}
    </SpotlightCard>
  )
}

/** 项目产出概览：按视频用途分类，使用弧形目录与视频预览展示。 */
const PROJECTS: VideoProject[] = [
  {
    number: '01',
    category: 'AI Product Video',
    name: 'AI主图视频',
    workflowTarget: 'workflow-long',
    images: { top: '', bottom: '', right: '' },
    intro: '展示用 AI 生成、实拍与三维素材制作的产品视频。',
    clips: [
      { title: '主图视频 01', src: '/videos/product-clips/01.webp', video: '/videos/product-clips/01.mp4' },
      { title: '主图视频 02', src: '/videos/product-clips/02.webp', video: '/videos/product-clips/02.mp4' },
      { title: '主图视频 03', src: '/videos/product-clips/03.webp', video: '/videos/product-clips/03.mp4' },
      { title: '三维＋AI', src: '/videos/product-clips/04.webp', video: '/videos/product-clips/04.mp4' },
      { title: 'R28 社媒AI视频', src: '/videos/product-clips/05.webp', video: '/videos/product-clips/05.mp4' },
    ],
  },
  {
    number: '02',
    category: 'TVC',
    name: '品宣TVC视频',
    workflowTarget: 'workflow-long',
    images: { top: '', bottom: '', right: '' },
    intro: '汇集体育训练局合作视频与淘宝首页开屏动画，展示机构合作与品牌传播场景中的视频创作。',
    roles: ['导演', '编剧', '生图', '生视频', '剪辑'],
    clips: [
      { src: '/videos/spiral-covers/sports.jpg', title: '体育训练局合作视频', bvid: 'BV1touw6LEQ3' },
      { src: '/videos/spiral-covers/taobao.webp', title: '淘宝首页开屏动画', video: '/videos/previews/taobao-opening-01.mp4' },
    ],
  },
  {
    number: '03',
    category: 'Website AI Clips',
    name: '官网AI视频片段',
    images: { top: '', bottom: '', right: '' },
    clips: websiteVideoClips,
    intro: '为品牌官网制作的 AI 视频片段，展示智能运动体验、直播课、MIA 动作库等内容。',
    roles: ['设计', '生图', '生视频'],
  },
  {
    number: '04',
    category: 'Feed Ads',
    name: '信息流视频',
    workflowTarget: 'workflow-short',
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
type ContentItem = { title: string; desc: string }
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
  | { key: string; label: string; type: 'stats'; appTitle: string; noteItems?: ContentItem[] }

const LONG_VIDEO_STEPS = [
  { title: '提案与脚本', description: '以产品卖点、品牌调性和视频时长为输入，用 AI 起草脚本，再由人工审核。' },
  { title: '参考与试剪', description: '人工选取画面参考，按脚本拼接素材，提前检查叙事结构和节奏。' },
  { title: '拍摄与生成', description: '结合实拍和 AI 生图、生视频，补齐难以拍摄或缺失的镜头。' },
  { title: '剪辑与交付', description: '剪辑整合实拍与生成素材，复核画面、节奏和产品表达。' },
]

const WORKFLOW_SECTIONS: Section[] = [
      {
        key: 'short',
        label: '短视频',
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
      {
        key: 'video-results',
        label: '提效成果',
        type: 'stats',
        appTitle: '视频流程',
        noteItems: [
          {
            title: '主图视频 · 全流程 AI 介入',
            desc: '主图视频原有流程为 提案 → 脚本 → 参考画面寻找 → 拍摄 → 剪辑。我进行了完整流程的 AI 介入测试并推行，目前优化为 提案 → AI 写脚本 → 素材混剪 → 拍摄（AI 生图生视频辅助）→ 剪辑。脚本环节搭建了智能体，预设品牌调性、主营产品与系统提示词，输入提案信息、视频时长、产品类型即可输出符合业务需求的脚本；经人工审核后进入素材拼接阶段查看整体表现，由人工找对应画面参考、AI 依据脚本用 Codex 混剪（不直接用 Codex 自行找素材，因其无法判断画面色调与美感），生图生视频逻辑与详情页一致。相比拍摄的人力与场地道具成本节约至少 80%，导拍剪周期从 20 天以上缩短到两周以内。',
          },
          {
            title: '信息流视频 · AI 画面穿插与素材替代',
            desc: '信息流视频主要做噱头与难拍摄 AI 画面的穿插，我的网站中已列出 AI 介入点，产出以数秒素材为主，与实拍、剪辑手法结合。抖音、TikTok 等渠道视频素材用 AI 替代了约 40%，省下大量人力与布景成本，同时销售额环比增加 31%。',
          },
          {
            title: '其他应用 · 换人 / 换背景 / 换装',
            desc: '此外还有视频换人、换背景、换装等应用，主要用于安装视频与信息流视频，进一步降低重复拍摄与场景搭建的成本。',
          },
        ],
      },
]

function jumpToVideoSection(id: string) {
  const destination = document.getElementById(id)
  if (!destination) return
  destination.focus({ preventScroll: true })
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  destination.scrollIntoView({ behavior })
}

export default function AiVideos() {
  const [activeWorkflowVideo, setActiveWorkflowVideo] = useState<string | null>(null)

  return (
    <motion.main
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto min-h-screen max-w-[1260px] bg-transparent px-6 py-24 md:px-10"
    >
      <nav aria-label="AI 视频章节" className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { id: 'video-works', title: '视频作品', label: '浏览四类视频项目' },
          { id: 'video-workflow', title: '制作流程', label: '查看制作步骤、案例与提效成果' },
        ].map(({ id, title, label }) => (
          <SpotlightCard
            key={id}
            as="button"
            type="button"
            onClick={() => jumpToVideoSection(id)}
            className="flex items-center justify-between gap-3 rounded-2xl border border-stroke bg-surface/40 p-5 text-left hover:bg-surface/70"
          >
            <span>
              <span className="block text-base font-medium text-text-primary">{title}</span>
              <span className="mt-1 block text-xs text-muted">{label}</span>
            </span>
            <span aria-hidden="true" className="text-muted">↓</span>
          </SpotlightCard>
        ))}
      </nav>

      <section id="video-works" tabIndex={-1} aria-label="视频作品" className="mt-8 scroll-mt-24 pt-8">
        <VideoProjectArc projects={PROJECTS} onViewWorkflow={jumpToVideoSection} />
      </section>

      <section aria-labelledby="video-workflow" className="mt-8 border-t border-stroke pt-12 md:pt-16">
        <h2 id="video-workflow" tabIndex={-1} className="scroll-mt-28 text-3xl font-medium tracking-tight md:text-4xl">
          制作流程
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          长视频覆盖 AI 主图视频和品宣 TVC 视频，短视频集中展示抖音信息流的制作案例。
        </p>

        <section aria-labelledby="workflow-long" className="mb-20 mt-10">
          <h3 id="workflow-long" tabIndex={-1} className="scroll-mt-28 text-xl font-medium">长视频</h3>
          <p className="mt-2 text-sm leading-6 text-muted">AI 主图视频与品宣 TVC 视频共用以下制作流程。</p>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-stroke bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {LONG_VIDEO_STEPS.map((step, index) => (
              <li key={step.title} className="bg-surface p-5 md:p-6">
                <span className="text-xs tabular-nums text-muted">{String(index + 1).padStart(2, '0')}</span>
                <h4 className="mt-3 text-base font-medium">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <MiroBoard src="/explorations/tvc/01.jpg" title="品宣 TVC 制作流程图" />
          </div>
        </section>
            <div className="flex flex-col">
              {WORKFLOW_SECTIONS.map((sec, si) => (
                <div
                  key={sec.key}
                  className={si < WORKFLOW_SECTIONS.length - 1 ? 'mb-24' : ''}
                >
                  {sec.type !== 'stats' && (
                    <div className="mb-10 max-w-2xl space-y-5">
                      <h3 id={`workflow-${sec.key}`} tabIndex={-1} className="scroll-mt-28 text-xl font-medium text-text-primary">
                        {sec.label}
                      </h3>
                      {sec.key === 'short' && (
                        <p className="text-sm leading-6 text-muted">抖音信息流案例，包含实拍素材转视频、脚本反推、换背景、换装和换人等做法。</p>
                      )}
                    </div>
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
                                <OptimizedImage
                                  src={item.src}
                                  alt={item.title}
                                  className="h-auto w-full rounded-xl border border-stroke"
                                  loading="lazy"
                                />
                              )}
                              <div className="flex flex-col gap-3">
                                {item.videos?.map((v, index) => (
                                  <WorkflowVideo
                                    key={v}
                                    src={v}
                                    title={item.videos?.length === 1 ? item.title : item.title + " " + (index + 1)}
                                    active={activeWorkflowVideo === v}
                                    onSelect={() => setActiveWorkflowVideo(v)}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <>
                              {item.src ? (
                                <OptimizedImage src={item.src} alt={item.title} className="h-auto w-full" loading="lazy" />
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
                                  {item.videos.map((v, index) => (
                                    <WorkflowVideo
                                      key={v}
                                      src={v}
                                      title={item.videos?.length === 1 ? item.title : item.title + " " + (index + 1)}
                                      active={activeWorkflowVideo === v}
                                      onSelect={() => setActiveWorkflowVideo(v)}
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
                          <OptimizedImage
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

                  {sec.type === 'stats' && (
                    <>
                      <StatsPanel appTitle={sec.appTitle} />
                      {sec.noteItems && sec.noteItems.length > 0 && (
                        <div className="mt-16 flex flex-col gap-4">
                          {sec.noteItems.map((item, i) => (
                            <SpotlightCard key={i} className="liquid-glass rounded-2xl p-6">
                              <div className="font-body text-base font-medium text-text-primary">
                                {item.title}
                              </div>
                              <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                                {item.desc}
                              </p>
                            </SpotlightCard>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
      </section>
      <BackToTop />
    </motion.main>
  )
}
