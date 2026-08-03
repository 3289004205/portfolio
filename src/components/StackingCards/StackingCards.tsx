import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  /** 视频直链列表（存在时优先渲染为视频网格） */
  videos?: string[]
}

function CardInner({ project }: { project: StackingProject }) {
  return (
    <div className="overflow-hidden rounded-[40px] border border-stroke bg-surface p-6 shadow-xl shadow-black/30 md:p-10">
      {/* 头部：大序号 + 分类/名称 + Live Project 胶囊 */}
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
          className="rounded-full border border-stroke px-4 py-2 text-xs text-text-primary transition-colors hover:bg-text-primary hover:text-bg"
        >
          Live Project ↗
        </a>
      </div>

      {/* 视频：9:16 竖视频，4列×2行网格铺满媒体区，与图卡网格规律一致；
          不再横向滚动，宽度始终在卡内，保持原比例不裁剪 */}
      {project.videos && project.videos.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {project.videos.map((src, i) => (
            <video
              key={i}
              src={src}
              controls
              preload="metadata"
              muted
              playsInline
              className="aspect-[9/16] w-full rounded-2xl border border-stroke bg-black object-cover"
            />
          ))}
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
          <div className="flex">
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
