import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import Masonry, { type MasonryItem } from '../components/Masonry/Masonry'
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

/** 工作流效果对比块内的单张图：有图显示图片，无图显示待上传占位 */
function EffectImage({ label, src }: { label: string; src?: string }) {
  return src ? (
    <img
      src={src}
      alt={label}
      className="h-auto w-full rounded-xl border border-stroke bg-white/[0.04]"
      loading="lazy"
    />
  ) : (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-stroke bg-white/[0.06] px-3 text-center text-xs text-muted">
      待上传截图
      <span className="mt-1 block text-[10px] opacity-70">{label}</span>
    </div>
  )
}

const DETAIL_ITEMS: MasonryItem[] = [
  { id: 'detail-01', img: '/explorations/detail/01.webp', url: '/explorations/detail/01.webp', height: 1229 },
  { id: 'detail-02', img: '/explorations/detail/02.webp', url: '/explorations/detail/02.webp', height: 960 },
  { id: 'detail-03', img: '/explorations/detail/03.webp', url: '/explorations/detail/03.webp', height: 824 },
  { id: 'detail-04', img: '/explorations/detail/04.webp', url: '/explorations/detail/04.webp', height: 715 },
  { id: 'detail-05', img: '/explorations/detail/05.webp', url: '/explorations/detail/05.webp', height: 1600 },
  { id: 'detail-06', img: '/explorations/detail/06.webp', url: '/explorations/detail/06.webp', height: 2115 },
  { id: 'detail-07', img: '/explorations/detail/07.webp', url: '/explorations/detail/07.webp', height: 1575 },
  { id: 'detail-08', img: '/explorations/detail/08.webp', url: '/explorations/detail/08.webp', height: 2276 },
  { id: 'detail-09', img: '/explorations/detail/09.webp', url: '/explorations/detail/09.webp', height: 1916 },
  { id: 'detail-10', img: '/explorations/detail/10.webp', url: '/explorations/detail/10.webp', height: 1932 },
  { id: 'detail-11', img: '/explorations/detail/11.webp', url: '/explorations/detail/11.webp', height: 730 },
  { id: 'detail-12', img: '/explorations/detail/12.webp', url: '/explorations/detail/12.webp', height: 1266 },
  { id: 'detail-13', img: '/explorations/detail/13.webp', url: '/explorations/detail/13.webp', height: 896 },
  { id: 'detail-14', img: '/explorations/detail/14.webp', url: '/explorations/detail/14.webp', height: 678 },
  { id: 'detail-15', img: '/explorations/detail/15.webp', url: '/explorations/detail/15.webp', height: 712 },
  { id: 'detail-16', img: '/explorations/detail/16.webp', url: '/explorations/detail/16.webp', height: 1545 },
  { id: 'detail-17', img: '/explorations/detail/17.webp', url: '/explorations/detail/17.webp', height: 538 },
  { id: 'detail-18', img: '/explorations/detail/18.webp', url: '/explorations/detail/18.webp', height: 2286 },
  { id: 'detail-19', img: '/explorations/detail/19.webp', url: '/explorations/detail/19.webp', height: 720 },
  { id: 'detail-20', img: '/explorations/detail/20.webp', url: '/explorations/detail/20.webp', height: 720 },
  { id: 'detail-21', img: '/explorations/detail/21.webp', url: '/explorations/detail/21.webp', height: 781 },
  { id: 'detail-22', img: '/explorations/detail/22.webp', url: '/explorations/detail/22.webp', height: 1821 },
  { id: 'detail-23', img: '/explorations/detail/23.webp', url: '/explorations/detail/23.webp', height: 1408 },
  { id: 'detail-24', img: '/explorations/detail/24.webp', url: '/explorations/detail/24.webp', height: 717 },
  { id: 'detail-25', img: '/explorations/detail/25.webp', url: '/explorations/detail/25.webp', height: 1880 },
  { id: 'detail-26', img: '/explorations/detail/26.webp', url: '/explorations/detail/26.webp', height: 2857 },
  { id: 'detail-27', img: '/explorations/detail/27.webp', url: '/explorations/detail/27.webp', height: 1037 },
  { id: 'detail-28', img: '/explorations/detail/28.webp', url: '/explorations/detail/28.webp', height: 2219 },
  { id: 'detail-29', img: '/explorations/detail/29.webp', url: '/explorations/detail/29.webp', height: 701 },
]
const BRAND_ITEMS: MasonryItem[] = [
  { id: 'brand-01', img: '/explorations/brand/01.webp', url: '/explorations/brand/01.webp', height: 1600 },
  { id: 'brand-02', img: '/explorations/brand/02.webp', url: '/explorations/brand/02.webp', height: 1378 },
  { id: 'brand-03', img: '/explorations/brand/03.webp', url: '/explorations/brand/03.webp', height: 2400 },
  { id: 'brand-04', img: '/explorations/brand/04.webp', url: '/explorations/brand/04.webp', height: 1697 },
  { id: 'brand-05', img: '/explorations/brand/05.webp', url: '/explorations/brand/05.webp', height: 1378 },
  { id: 'brand-06', img: '/explorations/brand/06.webp', url: '/explorations/brand/06.webp', height: 960 },
  { id: 'brand-07', img: '/explorations/brand/07.webp', url: '/explorations/brand/07.webp', height: 1484 },
  { id: 'brand-08', img: '/explorations/brand/08.webp', url: '/explorations/brand/08.webp', height: 3906 },
  { id: 'brand-09', img: '/explorations/brand/09.webp', url: '/explorations/brand/09.webp', height: 3906 },
  { id: 'brand-10', img: '/explorations/brand/10.webp', url: '/explorations/brand/10.webp', height: 3200 },
  { id: 'brand-11', img: '/explorations/brand/11.webp', url: '/explorations/brand/11.webp', height: 3906 },
  { id: 'brand-12', img: '/explorations/brand/12.webp', url: '/explorations/brand/12.webp', height: 3906 },
  { id: 'brand-13', img: '/explorations/brand/13.webp', url: '/explorations/brand/13.webp', height: 2507 },
  { id: 'brand-14', img: '/explorations/brand/14.webp', url: '/explorations/brand/14.webp', height: 3320 },
]
const AMAZON_ITEMS: MasonryItem[] = [
  { id: 'amazon-1', img: '/explorations/amazon/01.png', url: '/explorations/amazon/01.png', height: 640 },
  { id: 'amazon-2', img: '/explorations/amazon/02.png', url: '/explorations/amazon/02.png', height: 2697 },
  { id: 'amazon-3', img: '/explorations/amazon/03.png', url: '/explorations/amazon/03.png', height: 2492 },
  { id: 'amazon-4', img: '/explorations/amazon/04.png', url: '/explorations/amazon/04.png', height: 3004 },
  { id: 'amazon-5', img: '/explorations/amazon/05.png', url: '/explorations/amazon/05.png', height: 3138 },
  { id: 'amazon-6', img: '/explorations/amazon/06.png', url: '/explorations/amazon/06.png', height: 2025 },
  { id: 'amazon-7', img: '/explorations/amazon/07.png', url: '/explorations/amazon/07.png', height: 640 },
  { id: 'amazon-8', img: '/explorations/amazon/08.png', url: '/explorations/amazon/08.png', height: 640 },
  { id: 'amazon-9', img: '/explorations/amazon/09.png', url: '/explorations/amazon/09.png', height: 640 },
  { id: 'amazon-10', img: '/explorations/amazon/10.png', url: '/explorations/amazon/10.png', height: 640 },
  { id: 'amazon-11', img: '/explorations/amazon/11.png', url: '/explorations/amazon/11.png', height: 640 },
  { id: 'amazon-12', img: '/explorations/amazon/12.png', url: '/explorations/amazon/12.png', height: 640 },
  { id: 'amazon-13', img: '/explorations/amazon/13.png', url: '/explorations/amazon/13.png', height: 640 },
  { id: 'amazon-14', img: '/explorations/amazon/14.png', url: '/explorations/amazon/14.png', height: 640 },
  { id: 'amazon-15', img: '/explorations/amazon/15.png', url: '/explorations/amazon/15.png', height: 640 },
]

type GalleryImage = { src?: string; caption: string }
type FlowStep = { title: string; desc: string }
type ContentItem = { title: string; desc: string; link?: string }
type BeforeAfterBlock = { title: string; overview?: string; original?: string; generated?: string }
type Section =
  | { key: string; label: string; type: 'gallery'; images: GalleryImage[] }
  | { key: string; label: string; type: 'beforeafter'; blocks: BeforeAfterBlock[] }
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
    desc: '将零散的出图经验固化为可执行、可复用、可迭代的标准流程：针对不同业务场景拆分专项工作流，并在生成过程中依据反馈持续动态调优。',
    tags: ['Midjourney', 'Nano Banana', 'ComfyUI', 'Photoshop'],
    sections: [
      {
        key: 'detail-scene',
        label: '详情页场景图 AI 生产工作流',
        type: 'gallery',
        images: [
          { src: '/explorations/process/detail-workflow.webp', caption: '详情页场景图 AI 生产工作流' },
        ],
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
        label: 'Comfyui 工作流总览',
        type: 'content',
        items: [
          {
            title: 'RunningHub 链接',
            desc: '在 RunningHub 上发布与分享工作流，便于外部协作与复用。',
            link: 'https://www.runninghub.cn/',
          },
        ],
      },
      {
        key: 'workflows',
        label: '常用工作流效果展示（Before/After）',
        type: 'beforeafter',
        blocks: [
          {
            title: '产品溶图打光',
            overview: '/explorations/post/wf-01-overview.jpg',
            original: '/explorations/post/wf-01-original.png',
            generated: '/explorations/post/wf-01-generated.png',
          },
          {
            title: '修图打光',
            overview: '/explorations/post/wf-02-overview.jpg',
            original: '/explorations/post/wf-02-original.png',
            generated: '/explorations/post/wf-02-generated.png',
          },
          {
            title: '通用放大',
            overview: '/explorations/post/wf-03-overview.jpg',
            original: '/explorations/post/wf-03-original.png',
            generated: '/explorations/post/wf-03-generated.jpg',
          },
          {
            title: '修图打光',
            overview: '/explorations/post/wf-04-overview.jpg',
            original: '/explorations/post/wf-04-original.jpg',
            generated: '/explorations/post/wf-04-generated.jpg',
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
                  sec.images.length === 1 ? (
                    <FeatureTile caption={sec.images[0].caption} src={sec.images[0].src} />
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {sec.images.map((img) => (
                        <FeatureTile key={img.caption} caption={img.caption} src={img.src} />
                      ))}
                    </div>
                  )
                )}

                {sec.type === 'beforeafter' && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {sec.blocks.map((block, bi) => (
                      <SpotlightCard
                        key={block.title}
                        className="liquid-glass rounded-2xl p-5 md:p-6"
                      >
                        <div className="mb-4 flex items-baseline gap-2">
                          <span className="font-body text-[10px] tracking-[0.2em] text-muted">
                            {String(bi + 1).padStart(2, '0')}
                          </span>
                          <span className="font-body text-sm font-medium text-text-primary">
                            {block.title}
                          </span>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div>
                            <div className="mb-1.5 font-body text-[10px] tracking-[0.18em] text-muted">
                              工作流概览
                            </div>
                            <EffectImage label="工作流概览" src={block.overview} />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="mb-1.5 font-body text-[10px] tracking-[0.18em] text-muted">
                                原图
                              </div>
                              <EffectImage label="原图" src={block.original} />
                            </div>
                            <div>
                              <div className="mb-1.5 font-body text-[10px] tracking-[0.18em] text-muted">
                                生成图
                              </div>
                              <EffectImage label="生成图" src={block.generated} />
                            </div>
                          </div>
                        </div>
                      </SpotlightCard>
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

                {sec.type === 'miro' && (
                  <MiroBoard src={sec.src} title={sec.label} openUrl={sec.openUrl} />
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
          <BackToTop />
        </motion.section>
      </AnimatePresence>
      </motion.main>
    </>
  )
}
