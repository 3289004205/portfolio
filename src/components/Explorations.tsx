import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Exploration {
  image: string
  rotate: number
}

const ITEMS_COL_1: Exploration[] = [
  {
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    rotate: -3,
  },
  {
    image:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
    rotate: 2,
  },
  {
    image:
      'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=600&auto=format&fit=crop',
    rotate: -2,
  },
]

const ITEMS_COL_2: Exploration[] = [
  {
    image:
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&auto=format&fit=crop',
    rotate: 3,
  },
  {
    image:
      'https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=600&auto=format&fit=crop',
    rotate: -2,
  },
  {
    image:
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600&auto=format&fit=crop',
    rotate: 2,
  },
]

export default function Explorations() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

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

  // Lock scroll when lightbox open
  useEffect(() => {
    if (lightbox) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [lightbox])

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
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Explorations</span>
        </div>
        <h2 className="text-5xl font-medium tracking-tight text-text-primary md:text-7xl lg:text-8xl">
          AI <span className="font-display italic">Animation</span>
        </h2>
        <p className="mt-5 max-w-md text-sm text-muted md:text-base">
          A space to experiment — motion studies, color systems, and fragments from the
          everyday.
        </p>
        <button
          type="button"
          onClick={() => navigate('/ai-videos')}
          className="gradient-ring mt-8 inline-flex rounded-full bg-surface px-5 py-3 text-sm text-text-primary transition-transform hover:scale-105"
        >
          Visit Dribbble <span className="ml-2">↗</span>
        </button>
      </div>

      {/* Layer 2: Parallax Columns */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center">
        <div className="grid w-full max-w-[1400px] grid-cols-2 gap-12 px-4 py-12 md:gap-40 md:px-8 md:py-20">
          <div ref={col1Ref} className="flex flex-col gap-12 md:gap-24">
            {ITEMS_COL_1.map((item, i) => (
              <button
                key={i}
                onClick={() => setLightbox(item.image)}
                className="pointer-events-auto mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-stroke bg-surface"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.image}
                  alt="Exploration"
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
                onClick={() => setLightbox(item.image)}
                className="pointer-events-auto mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-stroke bg-surface"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.image}
                  alt="Exploration"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 p-8"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Exploration preview"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          />
          <button
            className="absolute right-6 top-6 text-sm uppercase tracking-[0.2em] text-muted hover:text-text-primary"
            onClick={() => setLightbox(null)}
          >
            Close ✕
          </button>
        </div>
      )}
    </section>
  )
}
