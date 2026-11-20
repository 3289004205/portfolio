import { useEffect, useState } from 'react'
import videoSizes from '../lib/workflow-video-sizes.json'

type Props = {
  src: string
  title: string
  active: boolean
  onSelect: () => void
}

function WorkflowPlayer({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    if (status !== 'loading') return
    const timeout = window.setTimeout(() => setStatus('error'), 15000)
    return () => window.clearTimeout(timeout)
  }, [status])

  if (status === 'error') {
    return (
      <div className="absolute inset-0 grid place-content-center gap-2 bg-black/80 p-3 text-center" role="status">
        <p className="text-xs text-text-primary">视频暂时无法加载</p>
        <button type="button" className="rounded-md border border-white/25 px-3 py-1.5 text-xs" onClick={() => setStatus('loading')}>
          重试播放
        </button>
        <a className="text-xs text-text-primary underline" href={src} target="_blank" rel="noreferrer">在新标签页打开</a>
      </div>
    )
  }

  return (
    <video
      src={src}
      poster={poster}
      aria-label={title}
      className="absolute inset-0 h-full w-full object-contain"
      autoPlay
      controls
      muted
      playsInline
      onPlaying={() => setStatus('ready')}
      onPause={() => setStatus('ready')}
      onWaiting={(event) => { if (!event.currentTarget.paused) setStatus('loading') }}
      onError={() => setStatus('error')}
    />
  )
}

export default function WorkflowVideo({ src, title, active, onSelect }: Props) {
  const name = src.slice(src.lastIndexOf('/') + 1)
  const size = videoSizes[name as keyof typeof videoSizes]
  const playbackUrl = size ? `/videos/dy-flow-web/${name}` : src
  const poster = size ? playbackUrl.replace(/\.mp4$/, '.webp') : undefined

  return (
    <div
      data-no-zoom
      className="relative w-full overflow-hidden rounded-xl border border-stroke bg-black"
      style={{ aspectRatio: size ? `${size.width} / ${size.height}` : '16 / 9' }}
    >
      {active ? <WorkflowPlayer src={playbackUrl} poster={poster} title={title} /> : (
        <button
          type="button"
          aria-label={`播放：${title}`}
          className="absolute inset-0 grid w-full place-items-center focus-visible:outline focus-visible:-outline-offset-4 focus-visible:outline-white"
          onClick={onSelect}
        >
          {poster && <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />}
          <span aria-hidden="true" className="relative grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-black/70 text-lg text-white">▶</span>
        </button>
      )}
    </div>
  )
}
