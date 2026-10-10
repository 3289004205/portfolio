import { useEffect, useRef } from 'react'

interface HlsVideoProps {
  src: string
  className?: string
  flip?: boolean
}

export default function HlsVideo({ src, className = '', flip = false }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const isHls = src.endsWith('.m3u8')

    if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS (Safari)
      video.src = src
    } else if (isHls) {
      let cancelled = false
      let destroy: (() => void) | undefined
      void import('hls.js').then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return
        const hls = new Hls({ enableWorker: true })
        destroy = () => hls.destroy()
        hls.loadSource(src)
        hls.attachMedia(video)
      }).catch(() => {})
      return () => {
        cancelled = true
        destroy?.()
      }
    } else {
      // Direct MP4 / native format
      video.src = src
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={`absolute left-1/2 top-1/2 min-h-full min-w-full object-cover -translate-x-1/2 -translate-y-1/2 ${
        flip ? '-scale-y-100' : ''
      } ${className}`}
    />
  )
}
