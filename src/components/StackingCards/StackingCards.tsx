import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import VideoTile from '../VideoTile/VideoTile'

/** 预览视频：仅进入视口时自动播放，离开视口立即暂停，
 *  避免整页大量视频同时解码导致卡顿。 */
function PreviewVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {})
          } else {
            v.pause()
          }
        })
      },
      { threshold: 0.5 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  )
}

/** 主视频：默认不自动播放，点击播放按钮播放 / 再点暂停 */
function HeroVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      // 播放主视频时，暂停页面其它所有视频，避免并发解码导致卡顿
      document.querySelectorAll('video').forEach((o) => {
        if (o !== v) o.pause()
      })
      void v.play()
    } else {
      v.pause()
    }
  }

  return (
    <div
      className={`group/vid relative cursor-pointer ${className ?? ''}`}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="h-full w-full rounded-2xl border border-stroke bg-black object-contain"
      />
      {!playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur transition-transform duration-300 group-hover/vid:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  )
}

export type StackingProject = {
  /** 序号，如 "01" */
  number: string
  /** 分类标签，如 "Brand Film" */
  category: string
  /** 项目名称 */
  name: string
  /** 跳转链接，缺省为 "#" */
  href?: string
  /** 三张图：左列上、左列下、右侧通栏 */
  images: { top: string; bottom: string; right: string }
  /** 单条主视频：存在时替换右侧通栏图（仅图片网格分支生效，尺寸不变） */
  heroVideo?: string
  /** 主视频右侧配图：与 heroVideo 同高，右侧展示，可裁切 */
  heroImage?: string
  /** B 站视频 BV 号，存在时优先渲染为 B 站嵌入播放器 */
  bilibili?: string
  /** 多个 B 站视频 BV 号，存在时渲染为嵌入播放器网格 */
  bilibiliVideos?: string[]
  /** 轻量预览：GIF / 静音循环 MP4，点击跳转 B 站原视频 */
  previews?: { bvid: string; type: 'gif' | 'mp4'; src: string; orientation?: 'landscape' | 'portrait' }[]
  /** 视频直链列表（存在时优先渲染为视频网格） */
  videos?: string[]
  /** 项目简介 */
  intro?: string
  /** 在该项目中担任的角色 */
  roles?: string[]
}

function CardInner({ project }: { project: StackingProject }) {
  return (
    <div className="overflow-hidden rounded-[40px] border border-stroke bg-surface p-6 shadow-xl shadow-black/30 md:p-10">
      {/* 头部：大序号 + 分类/名称 + 查看全部视频 胶囊 */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-end gap-4">
          <span className="select-none font-semibold leading-none text-text-primary/10 text-[clamp(3rem,10vw,140px)]">
            {project.number}
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              {project.category}
            </p>
            <h3 className="mt-1.5 font-display italic text-text-primary md:text-3xl">
              {project.name}
            </h3>
          </div>
        </div>
        <a
          href={project.href ?? '#'}
          target={project.href && project.href !== '#' ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="rounded-full border border-stroke px-4 py-2 text-xs text-text-primary transition-colors hover:bg-text-primary hover:text-bg"
        >
          查看全部视频 ↗
        </a>
      </div>

      {/* 项目简介 + 担任角色 */}
      {(project.intro || (project.roles && project.roles.length > 0)) && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1.3fr_1fr] md:gap-12">
          {project.intro && (
            <div>
              <p className="mb-1.5 text-xs uppercase tracking-[0.2em] text-muted">
                项目简介
              </p>
              <p className="font-body text-sm leading-relaxed text-text-primary/80">
                {project.intro}
              </p>
            </div>
          )}
          {project.roles && project.roles.length > 0 && (
            <div className="md:pl-6">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">
                担任角色
              </p>
              <div className="flex flex-wrap gap-2">
                {project.roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-stroke bg-bg/60 px-3 py-1.5 text-xs text-text-primary"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* B 站嵌入优先，其次视频直链网格，最后图片网格 */}
      {project.bilibili ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-stroke bg-black">
          <iframe
            src={`https://player.bilibili.com/player.html?bvid=${project.bilibili}&page=1&high_quality=1&danmaku=0&autoplay=1&muted=1&loop=1`}
            title={project.name}
            className="aspect-video w-full"
            allowFullScreen
            scrolling="no"
            frameBorder={0}
          />
        </div>
      ) : project.bilibiliVideos && project.bilibiliVideos.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {project.bilibiliVideos.map((bvid, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-stroke bg-black"
            >
              <iframe
                src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=1&muted=1&loop=1`}
                title={project.name}
                className="aspect-video w-full"
                allowFullScreen
                scrolling="no"
                frameBorder={0}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : project.previews && project.previews.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {project.previews.map((pv, i) => (
            <a
              key={i}
              href={`https://www.bilibili.com/video/${pv.bvid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-2xl border border-stroke bg-black transition-transform hover:scale-[1.02]"
            >
              {pv.type === 'gif' ? (
                <img
                  src={pv.src}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <PreviewVideo
                  src={pv.src}
                  className={`${pv.orientation === 'landscape' ? 'aspect-video' : 'aspect-[9/16]'} w-full object-cover`}
                />
              )}
            </a>
          ))}
        </div>
      ) : project.videos && project.videos.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {project.videos.map((src, i) => (
            <VideoTile
              key={i}
              src={src}
              className="aspect-[9/16] w-full rounded-2xl border border-stroke bg-black object-cover"
            />
          ))}
        </div>
      ) : project.heroVideo ? (
        /* 主视频布局：左两张图去除，容器高度固定（卡片高度不变），内部媒体缩小并居中 */
        <div className="mt-6 flex min-h-[420px] items-center justify-center md:h-[62vh]">
          {project.heroImage ? (
            /* 视频 + 右侧配图，等高并排，视频完整露出、图片宽度适当放大可裁切 */
            <div className="grid w-full grid-cols-[1fr_1.6fr] gap-4">
              <HeroVideo
                src={project.heroVideo}
                className="h-[320px] w-full self-center md:h-[46vh]"
              />
              <img
                src={project.heroImage}
                alt=""
                loading="lazy"
                className="h-[320px] w-full self-center rounded-2xl border border-stroke object-cover md:h-[46vh]"
              />
            </div>
              ) : (
                <HeroVideo src={project.heroVideo} className="h-full w-full" />
              )}
            </div>
          ) : (
            /* 图片网格：左列两张堆叠，右侧一张通栏拉伸 */
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col gap-4">
                <img
                  src={project.images.top}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full rounded-2xl border border-stroke object-cover"
                />
                <img
                  src={project.images.bottom}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full rounded-2xl border border-stroke object-cover"
                />
              </div>
              <div className="flex min-h-[420px] md:h-full">
                <img
                  src={project.images.right}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/4] min-h-[420px] w-full rounded-2xl border border-stroke object-cover md:aspect-auto md:h-full"
                />
              </div>
            </div>
          )}
    </div>
  )
}

export default function StackingCards({
  projects,
}: {
  projects: StackingProject[]
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const total = projects.length

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={sectionRef} className="relative">
      {projects.map((project, index) => {
        const scale = useTransform(
          scrollYProgress,
          [index / total, 1],
          [1, 1 - (total - 1 - index) * 0.03]
        )
        return (
          <div
            key={project.name}
            className="sticky top-6 flex h-[85vh] w-full items-start justify-center md:top-8"
          >
            {/* 外层 relative 容器负责水平居中，内部 motion.div 只处理缩放/偏移，
                避免 framer-motion 的 scale 覆盖掉 -translate-x-1/2 导致错位 */}
            <div className="relative w-full">
              <motion.div
                style={{
                  scale,
                  top: `${index * 28}px`,
                  transformOrigin: 'top',
                }}
                className="absolute inset-x-0"
              >
                <CardInner project={project} />
              </motion.div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
