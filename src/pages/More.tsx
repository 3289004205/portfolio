import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard/SpotlightCard'
import RaysBackground from '../components/SideRays/RaysBackground'
import Navbar from '../components/Navbar'
import VideoTile from '../components/VideoTile/VideoTile'
import { CATEGORIES, SubPart } from '../content/explorations'
import BackToTop from '../components/BackToTop'

/** 将 desc 中命中的 highlights 词用高亮样式包裹 */
function renderHighlighted(text: string, words?: string[]) {
  if (!words || words.length === 0) return text
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(${escaped.join('|')})`, 'g')
  const parts = text.split(re)
  return parts.map((part, i) =>
    words.includes(part) ? (
      <span key={i} className="font-semibold text-text-primary">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export default function More() {
  const location = useLocation()
  const navState = (location.state ?? {}) as { category?: string; sub?: string }
  const initialCategory =
    CATEGORIES.find((c) => c.id === navState.category) ?? CATEGORIES[0]
  const initialSub =
    initialCategory.subs.find((s) => s.id === navState.sub) ?? initialCategory.subs[0]
  const [selected, setSelected] = useState(initialCategory.id)
  const [selectedSub, setSelectedSub] = useState(initialSub.id)

  const current = CATEGORIES.find((c) => c.id === selected) ?? CATEGORIES[0]
  const activeSub =
    current.subs.find((s) => s.id === selectedSub) ?? current.subs[0]

  /** 当前子项上方是否渲染了视频（B 站嵌入 / 直链视频）。
   *  若上方有视频、下方又有图片，则图片改用整行全宽，与视频等宽。 */
  const subHasVideoAbove = !!(
    activeSub.bilibili ||
    activeSub.bilibiliVideos?.length ||
    activeSub.videos?.length ||
    activeSub.video
  )

  /** 项目简介框：与 AI 应用页风格保持一致 */
  function ProjectIntro({ sub, catTitle }: { sub: SubPart; catTitle: string }) {
    return (
      <SpotlightCard className="liquid-glass rounded-2xl px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display italic text-3xl leading-[0.9] tracking-tight text-text-primary md:text-5xl">
              {sub.title}
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              {sub.desc}
            </p>
          </div>
          <div className="flex flex-wrap items-end justify-end gap-2">
            {sub.link && (
              <a
                href={sub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface px-4 py-2 font-body text-xs text-text-primary transition-colors hover:bg-text-primary hover:text-bg"
              >
                查看网页详情 <span>↗</span>
              </a>
            )}
            <span className="rounded-full border border-stroke bg-white/[0.06] px-3 py-1 font-body text-xs text-muted">
              {catTitle}
            </span>
          </div>
        </div>
      </SpotlightCard>
    )
  }

  /** 视频卡片：复用共享 VideoTile（preload="none" 规避 catbox 并发限流 + onError 兜底）。 */
  const handleSelect = (id: string) => {
    const cat = CATEGORIES.find((c) => c.id === id)
    if (!cat) return
    setSelected(id)
    setSelectedSub(cat.subs[0].id)
  }

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
        {/* 分类选项（与 AI 应用页一致的卡片样式） */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => {
            const active = cat.id === selected
            return (
              <SpotlightCard
                key={cat.id}
                as="button"
                type="button"
                onClick={() => handleSelect(cat.id)}
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
                  {cat.title}
                </span>
                <span className="mt-1 text-xs text-muted">{cat.tagline}</span>
              </SpotlightCard>
            )
          })}
        </div>

        {/* 子项选项 */}
        <div className="mt-8 flex flex-wrap gap-3">
          {current.subs.map((sub) => {
            const active = sub.id === selectedSub
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSub(sub.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  active
                    ? 'border-stroke bg-surface text-text-primary shadow-[0_0_28px_-6px_rgba(137,170,204,0.55)]'
                    : 'border-stroke bg-surface/40 text-muted hover:bg-surface/70'
                }`}
              >
                {sub.title}
              </button>
            )
          })}
        </div>

        {/* 详情 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-${activeSub.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 py-16"
          >
            {/* 项目简介模块 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`intro-${current.id}-${activeSub.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <ProjectIntro sub={activeSub} catTitle={current.title} />
              </motion.div>
            </AnimatePresence>

                        {activeSub.bilibili ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-stroke bg-black">
                <iframe
                  src={`https://player.bilibili.com/player.html?bvid=${activeSub.bilibili}&page=1&high_quality=1&danmaku=0&autoplay=1&muted=1&loop=1`}
                  className="aspect-video w-full"
                  allowFullScreen
                  scrolling="no"
                  frameBorder={0}
                  referrerPolicy="no-referrer"
                  title={activeSub.title}
                />
              </div>
            ) : activeSub.bilibiliVideos && activeSub.bilibiliVideos.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {activeSub.bilibiliVideos.map((bvid, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-stroke bg-black"
                  >
                    <iframe
                      src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=1&muted=1&loop=1`}
                      className="aspect-video w-full"
                      allowFullScreen
                      scrolling="no"
                      frameBorder={0}
                      referrerPolicy="no-referrer"
                      title={activeSub.title}
                    />
                  </div>
                ))}
              </div>
            ) : activeSub.videos && activeSub.videos.length > 0 ? (
              <div className="mt-8 flex flex-col gap-6">
                {activeSub.videos.map((src, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-stroke bg-black"
                  >
                    <VideoTile src={src} />
                  </div>
                ))}
              </div>
            ) : activeSub.video ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-stroke bg-black">
                <VideoTile src={activeSub.video} autoPlayLoop />
              </div>
            ) : null}

            {activeSub.images && activeSub.images.length > 0 ? (
              activeSub.equalHeightImages ? (
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {activeSub.images.map((src, i) => (
                    <SpotlightCard
                      key={i}
                      className="liquid-glass overflow-hidden rounded-2xl"
                    >
                      <img
                        src={src}
                        alt={`${activeSub.title} ${i + 1}`}
                        className="aspect-[4/3] w-full object-cover"
                        loading="lazy"
                      />
                    </SpotlightCard>
                  ))}
                </div>
              ) : (
                <div
                  className={`mt-8 columns-1 gap-4 ${
                    subHasVideoAbove && activeSub.images.length > 0 ? '' : 'md:columns-2'
                  }`}
                >
                  {activeSub.images.map((src, i) => (
                    <SpotlightCard
                      key={i}
                      className="liquid-glass mb-4 break-inside-avoid overflow-hidden rounded-2xl"
                    >
                      <img
                        src={src}
                        alt={`${activeSub.title} ${i + 1}`}
                        className="h-auto w-full object-contain"
                        loading="lazy"
                      />
                    </SpotlightCard>
                  ))}
                </div>
              )
            ) : !activeSub.bilibili &&
              !activeSub.bilibiliVideos?.length &&
              !activeSub.videos?.length &&
              !activeSub.video ? (
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {[0, 1, 2, 3].map((i) => (
                  <SpotlightCard
                    key={i}
                    className="liquid-glass overflow-hidden rounded-2xl"
                  >
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.06] px-3 text-center text-xs text-muted">
                      待上传截图
                      <span className="mt-1 block text-[10px] opacity-70">{activeSub.title}</span>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            ) : null}

            {activeSub.efficiency && (
              <div className="mt-12">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-stroke" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted">
                    综合提效
                  </span>
                </div>
                <SpotlightCard className="liquid-glass rounded-2xl p-6">
                  <div className="font-body text-base font-medium text-text-primary">
                    {activeSub.efficiency.title ?? '综合提效'}
                  </div>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                    {renderHighlighted(activeSub.efficiency.desc, activeSub.efficiency.highlights)}
                  </p>
                </SpotlightCard>
              </div>
            )}
{current.id === 'lora' && (
              <div className="mt-12 flex justify-center">
                <a
                  href="https://www.modelscope.cn/profile/a927973507A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 font-body text-sm text-text-primary transition-colors hover:bg-text-primary hover:text-bg"
                >
                  查看我的所有 LoRA 训练 ↗
                </a>
              </div>
            )}
            <BackToTop />
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </>
  )
}
