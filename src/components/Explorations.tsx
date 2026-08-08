import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Exploration {
  image: string
  rotate: number
}

const ITEMS_COL_1: Exploration[] = [
  { image: '/videos/gifs/brand-01.gif', rotate: -3 },
  { image: '/videos/gifs/brand-02.gif', rotate: 2 },
  { image: '/videos/gifs/brand-03.gif', rotate: -2 },
  { image: '/videos/gifs/brand-04.gif', rotate: 3 },
]

const ITEMS_COL_2: Exploration[] = [
  { image: '/videos/gifs/brand-05.gif', rotate: 3 },
  { image: '/videos/gifs/brand-06.gif', rotate: -2 },
  { image: '/videos/gifs/brand-07.gif', rotate: 2 },
  { image: '/videos/gifs/brand-08.gif', rotate: -3 },
]

export default function Explorations() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      })

      // Parallax columns
      const st = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      } as const

      gsap.to(col1Ref.current, { yPercent: -35, ease: 'none', scrollTrigger: st })
      gsap.to(col2Ref.current, { yPercent: 35, ease: 'none', scrollTrigger: st })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="explorations"
      className="relative min-h-[300vh] w-full overflow-hidden"
    >
      {/* Layer 1: Pinned Center */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">精选作品</span>
        </div>
        <h2 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl lg:text-8xl">
          AI <span className="font-display italic">Animation</span>
        </h2>
        <p className="mt-5 max-w-md text-sm text-muted md:text-base">
          汇集 AI 视频在各渠道的产出成果，从品牌 TVC 到抖音信息流，覆盖官网、电商大促与信息流投放等典型场景。
        </p>
        <button
          type="button"
          onClick={() => navigate('/ai-videos')}
          className="gradient-ring mt-8 inline-flex rounded-full bg-surface px-5 py-3 text-sm text-text-primary transition-transform hover:scale-105"
        >
          查看全部作品 <span className="ml-2">↗</span>
        </button>
      </div>

      {/* Layer 2: Parallax Columns */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center">
        <div className="grid w-full max-w-[1400px] grid-cols-2 gap-12 px-4 py-12 md:gap-40 md:px-8 md:py-20">
          <div ref={col1Ref} className="flex flex-col gap-12 md:gap-24">
            {ITEMS_COL_1.map((item, i) => (
              <button
                key={i}
                type="button"
                className="pointer-events-auto mx-auto aspect-video w-full max-w-[360px] overflow-hidden rounded-3xl border border-stroke bg-surface"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.image}
                  alt="Exploration"
                  data-no-zoom
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </button>
            ))}
          </div>
          <div ref={col2Ref} className="flex flex-col gap-12 pt-24 md:gap-24 md:pt-48">
            {ITEMS_COL_2.map((item, i) => (
              <button
                key={i}
                type="button"
                className="pointer-events-auto mx-auto aspect-video w-full max-w-[360px] overflow-hidden rounded-3xl border border-stroke bg-surface"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.image}
                  alt="Exploration"
                  data-no-zoom
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
