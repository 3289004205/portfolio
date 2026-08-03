import { useEffect, useRef } from 'react'

const ROW1 = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
]

const ROW2 = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const ROW3 = [
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
]

const CARD_W = 420
const GAP = 12
const STEP = CARD_W + GAP

function setWidth(count: number) {
  return count * STEP
}

export default function ImageMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)

  const pos1 = useRef(-setWidth(ROW1.length))
  const pos2 = useRef(0)
  const pos3 = useRef(-setWidth(ROW3.length))

  const boost = useRef(0)
  const lastScrollY = useRef(window.scrollY)
  const rafId = useRef<number>(0)

  useEffect(() => {
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    const row3 = row3Ref.current
    if (!row1 || !row2 || !row3) return

    const width1 = setWidth(ROW1.length)
    const width2 = setWidth(ROW2.length)
    const width3 = setWidth(ROW3.length)

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
        // scrolling down — add boost, capped
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

  const triple = (arr: string[]) => [...arr, ...arr, ...arr]

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden pt-4 sm:pt-6 md:pt-8 pb-20 sm:pb-24 md:pb-32"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — right */}
        <div className="w-full overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-3"
            style={{ willChange: 'transform' }}
          >
            {triple(ROW1).map((src, i) => (
              <div
                key={`r1-${i}`}
                className="h-[270px] w-[420px] flex-shrink-0 overflow-hidden rounded-2xl"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — left */}
        <div className="w-full overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-3"
            style={{ willChange: 'transform' }}
          >
            {triple(ROW2).map((src, i) => (
              <div
                key={`r2-${i}`}
                className="h-[270px] w-[420px] flex-shrink-0 overflow-hidden rounded-2xl"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 — right */}
        <div className="w-full overflow-hidden">
          <div
            ref={row3Ref}
            className="flex gap-3"
            style={{ willChange: 'transform' }}
          >
            {triple(ROW3).map((src, i) => (
              <div
                key={`r3-${i}`}
                className="h-[270px] w-[420px] flex-shrink-0 overflow-hidden rounded-2xl"
              >
                <img
                  src={src}
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
