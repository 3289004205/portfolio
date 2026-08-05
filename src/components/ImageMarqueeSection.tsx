import { useEffect, useRef } from 'react'

type MarqueeImage = { src: string; w: number; h: number }

const DETAIL: MarqueeImage[] = [
  { src: '/explorations/detail/01.webp', w: 1280, h: 1229 },
  { src: '/explorations/detail/02.webp', w: 1280, h: 960 },
  { src: '/explorations/detail/03.webp', w: 1280, h: 824 },
  { src: '/explorations/detail/04.webp', w: 1280, h: 715 },
  { src: '/explorations/detail/05.webp', w: 1280, h: 1600 },
  { src: '/explorations/detail/06.webp', w: 1280, h: 2115 },
  { src: '/explorations/detail/07.webp', w: 1280, h: 1575 },
  { src: '/explorations/detail/08.webp', w: 1280, h: 2276 },
  { src: '/explorations/detail/09.webp', w: 1280, h: 1916 },
  { src: '/explorations/detail/10.webp', w: 1280, h: 1932 },
  { src: '/explorations/detail/11.webp', w: 1280, h: 730 },
  { src: '/explorations/detail/12.webp', w: 1280, h: 1266 },
  { src: '/explorations/detail/13.webp', w: 1280, h: 896 },
  { src: '/explorations/detail/14.webp', w: 1280, h: 678 },
  { src: '/explorations/detail/15.webp', w: 1280, h: 712 },
  { src: '/explorations/detail/16.webp', w: 1280, h: 1545 },
  { src: '/explorations/detail/17.webp', w: 1280, h: 538 },
  { src: '/explorations/detail/18.webp', w: 1280, h: 2286 },
  { src: '/explorations/detail/19.webp', w: 1280, h: 720 },
  { src: '/explorations/detail/20.webp', w: 1280, h: 720 },
  { src: '/explorations/detail/21.webp', w: 1280, h: 781 },
  { src: '/explorations/detail/22.webp', w: 1280, h: 1821 },
  { src: '/explorations/detail/23.webp', w: 1280, h: 1408 },
  { src: '/explorations/detail/24.webp', w: 1280, h: 717 },
  { src: '/explorations/detail/25.webp', w: 1280, h: 1880 },
  { src: '/explorations/detail/26.webp', w: 1280, h: 2857 },
  { src: '/explorations/detail/27.webp', w: 1280, h: 1037 },
  { src: '/explorations/detail/28.webp', w: 1280, h: 2219 },
  { src: '/explorations/detail/29.webp', w: 1280, h: 701 },
]

const BRAND: MarqueeImage[] = [
  { src: '/explorations/brand/01.webp', w: 1200, h: 1600 },
  { src: '/explorations/brand/02.webp', w: 1600, h: 1148 },
  { src: '/explorations/brand/03.webp', w: 1600, h: 2133 },
  { src: '/explorations/brand/04.webp', w: 1200, h: 1697 },
  { src: '/explorations/brand/05.webp', w: 1600, h: 1148 },
  { src: '/explorations/brand/06.webp', w: 1600, h: 765 },
  { src: '/explorations/brand/07.webp', w: 1048, h: 1484 },
  { src: '/explorations/brand/08.webp', w: 1600, h: 2133 },
  { src: '/explorations/brand/09.webp', w: 1600, h: 2133 },
  { src: '/explorations/brand/10.webp', w: 1600, h: 2133 },
  { src: '/explorations/brand/11.webp', w: 1600, h: 2133 },
  { src: '/explorations/brand/12.webp', w: 1600, h: 2133 },
  { src: '/explorations/brand/13.webp', w: 1177, h: 2507 },
  { src: '/explorations/brand/14.webp', w: 1600, h: 2138 },
]

const ROW1: MarqueeImage[] = [...DETAIL.slice(0, 10), ...BRAND.slice(0, 4)]
const ROW2: MarqueeImage[] = [...DETAIL.slice(10, 20), ...BRAND.slice(4, 9)]
const ROW3: MarqueeImage[] = [...DETAIL.slice(20), ...BRAND.slice(9)]

const CARD_H = 300
const GAP = 12

function cardWidth(img: MarqueeImage) {
  return (CARD_H * img.w) / img.h
}

function rowWidth(row: MarqueeImage[]) {
  return row.reduce((sum, img) => sum + cardWidth(img), 0) + GAP * row.length
}

export default function ImageMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)

  const pos1 = useRef(-rowWidth(ROW1))
  const pos2 = useRef(0)
  const pos3 = useRef(-rowWidth(ROW3))

  const boost = useRef(0)
  const lastScrollY = useRef(window.scrollY)
  const rafId = useRef<number>(0)

  useEffect(() => {
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    const row3 = row3Ref.current
    if (!row1 || !row2 || !row3) return

    const width1 = rowWidth(ROW1)
    const width2 = rowWidth(ROW2)
    const width3 = rowWidth(ROW3)

    const baseSpeed1 = 0.6
    const baseSpeed2 = 0.7
    const baseSpeed3 = 0.55

    const apply = () => {
      row1.style.transform = `translateX(${pos1.current}px)`
      row2.style.transform = `translateX(${pos2.current}px)`
      row3.style.transform = `translateX(${pos3.current}px)`
    }

    const loop = () => {
      const extra = boost.current

      pos1.current += baseSpeed1 + extra
      pos2.current -= baseSpeed2 + extra
      pos3.current += baseSpeed3 + extra

      if (pos1.current >= 0) pos1.current -= width1
      if (pos2.current <= -width2) pos2.current += width2
      if (pos3.current >= 0) pos3.current -= width3

      boost.current *= 0.92
      if (boost.current < 0.01) boost.current = 0

      apply()
      rafId.current = requestAnimationFrame(loop)
    }

    const handleScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      lastScrollY.current = y

      if (delta > 0) {
        boost.current = Math.min(boost.current + delta * 0.15, 18)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafId.current = requestAnimationFrame(loop)
    apply()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  const triple = (arr: MarqueeImage[]) => [...arr, ...arr, ...arr]

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden pt-4 sm:pt-6 md:pt-8 pb-20 sm:pb-24 md:pb-32"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      <div className="flex flex-col gap-3">
        <div className="w-full overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-3"
            style={{ willChange: 'transform' }}
          >
            {triple(ROW1).map((img, i) => (
              <div
                key={`r1-${i}`}
                className="h-[300px] flex-shrink-0 overflow-hidden rounded-2xl"
                style={{ width: `${cardWidth(img)}px` }}
              >
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-3"
            style={{ willChange: 'transform' }}
          >
            {triple(ROW2).map((img, i) => (
              <div
                key={`r2-${i}`}
                className="h-[300px] flex-shrink-0 overflow-hidden rounded-2xl"
                style={{ width: `${cardWidth(img)}px` }}
              >
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            ref={row3Ref}
            className="flex gap-3"
            style={{ willChange: 'transform' }}
          >
            {triple(ROW3).map((img, i) => (
              <div
                key={`r3-${i}`}
                className="h-[300px] flex-shrink-0 overflow-hidden rounded-2xl"
                style={{ width: `${cardWidth(img)}px` }}
              >
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
