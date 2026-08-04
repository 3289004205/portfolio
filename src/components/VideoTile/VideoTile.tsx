import { useState } from 'react'

/** 视频卡片：默认 preload="none"（点击才拉流，规避 catbox 并发限流）；
 *  外链失效时兜底显示可点击的直链，避免一片空白。 */
export default function VideoTile({
  src,
  className,
  autoPlayLoop = false,
}: {
  src: string
  className?: string
  autoPlayLoop?: boolean
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 p-6 text-center ${
          className ?? ''
        }`}
      >
        <p className="font-body text-sm text-muted">视频加载失败（外链可能限流或失效）</p>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-text-primary underline underline-offset-4"
        >
          点此在新标签页打开视频 ↗
        </a>
      </div>
    )
  }

  return (
    <video
      src={src}
      controls
      preload="none"
      playsInline
      onError={() => setFailed(true)}
      {...(autoPlayLoop ? { autoPlay: true, muted: true, loop: true } : {})}
      className={className}
    />
  )
}
