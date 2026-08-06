import { useEffect, useState } from 'react'

/**
 * 全局图片放大（lightbox）。
 * - 监听所有 <img> 的点击（捕获阶段，优先于父级跳转），在本页放大、不跳转。
 * - 非 <img> 来源（如 Masonry 背景图）可通过 openLightbox(src) 主动触发。
 * - 放大后用 data-no-zoom 标记自身，避免重复触发；点击遮罩空白处或 ESC 关闭。
 * - 图片下方提供「取消」按钮。
 */

const LIGHTBOX_EVENT = 'open-lightbox'

/** 主动打开放大（供非 <img> 元素调用，例如 background-image 卡片）。 */
export function openLightbox(src: string) {
  window.dispatchEvent(new CustomEvent(LIGHTBOX_EVENT, { detail: src }))
}

export default function GlobalImageLightbox() {
  const [src, setSrc] = useState<string | null>(null)

  // 非 <img> 来源的主动触发
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (detail) setSrc(detail)
    }
    window.addEventListener(LIGHTBOX_EVENT, handler)
    return () => window.removeEventListener(LIGHTBOX_EVENT, handler)
  }, [])

  // 全局 <img> 点击委托（捕获阶段：先于父容器的 onClick / 默认跳转）
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!(target instanceof HTMLImageElement)) return
      if (target.closest('[data-no-zoom]')) return
      if (target.closest('nav')) return
      e.preventDefault()
      e.stopPropagation()
      setSrc(target.currentSrc || target.src)
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [])

  // 打开时锁定滚动 + ESC 关闭
  useEffect(() => {
    if (!src) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSrc(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [src])

  if (!src) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-black/90 p-6"
      onClick={() => setSrc(null)}
    >
      <img
        src={src}
        data-no-zoom
        alt="预览大图"
        className="max-h-[78vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        onClick={() => setSrc(null)}
        className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm text-white transition-colors hover:bg-white/20"
      >
        取消
      </button>
    </div>
  )
}
