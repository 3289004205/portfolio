import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

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

    if (isHls && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true })
      hls.loadSource(src)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS (Safari)
      video.src = src
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
