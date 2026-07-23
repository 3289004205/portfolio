import { useState } from 'react'
import { backgroundVideos, playIcon, tutorialThumbnails } from './assets'

export const BackgroundsTabContent = () => {
  const [failed, setFailed] = useState<number[]>([])

  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-3">
      {backgroundVideos.map((src, i) => (
        <div
          key={src}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
        >
          {failed.includes(i) ? (
            <img
              src={tutorialThumbnails[i % tutorialThumbnails.length]}
              alt="Background thumbnail"
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onError={() => setFailed((prev) => (prev.includes(i) ? prev : [...prev, i]))}
            />
          )}
          <img
            src={playIcon}
            alt="play"
            className="absolute bottom-2 right-2 h-6 w-6"
          />
        </div>
      ))}
    </div>
  )
}
