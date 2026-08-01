import { useEffect, useRef } from 'react'

export type AccordionData = {
  /** 卡片 / tab 标识 */
  key: string
  /** tab 与卡片标题 */
  label: string
  /** 卡片描述 */
  description: string
  /** 右侧代码窗口的等宽文本内容 */
  code: string
}

export default function PlatformAccordion({ cards }: { cards: AccordionData[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLButtonElement[]>([])
  const cardsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const tabEls = tabsRef.current
    const cardEls = cardsRef.current
    if (!section || !cardEls.length) return

    const activate = (panel: string) => {
      tabEls.forEach((tab) => {
        const isActive = tab.dataset.accordionTab === panel
        tab.classList.toggle('active', isActive)
        tab.setAttribute('aria-selected', String(isActive))
      })
      cardEls.forEach((card) => {
        card.classList.toggle('active', card.dataset.accordionCard === panel)
      })
    }

    const update = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = Math.max(1, rect.height - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const maxIndex = cardEls.length - 1
      const rawIndex = progress * maxIndex
      const activeIndex = Math.min(maxIndex, Math.max(0, Math.round(rawIndex)))
      const stack = section.querySelector('.accordion-stack') as HTMLElement | null
      const stackHeight = stack ? stack.clientHeight : window.innerHeight * 0.74
      const collapsedHeight = window.innerWidth <= 820 ? 96 : 84

      const positions = cardEls.map((_, index) => {
        let y = 0
        if (index > 0) {
          const segment = Math.min(1, Math.max(0, rawIndex - (index - 1)))
          const startY = stackHeight + collapsedHeight
          const endY = index * collapsedHeight
          y = startY + (endY - startY) * segment
        }
        return Math.round(y)
      })

      cardEls.forEach((card, index) => {
        const y = positions[index]
        const nextY = positions[index + 1]
        const visibleHeight =
          typeof nextY === 'number'
            ? Math.max(collapsedHeight, Math.min(stackHeight, nextY + 2))
            : stackHeight
        const clipBottom = Math.max(0, stackHeight - visibleHeight)

        card.style.setProperty('--card-y', `${Math.round(y)}px`)
        card.style.setProperty('--card-clip-bottom', `${Math.round(clipBottom)}px`)
        card.style.zIndex = String(index + 1)
      })

      const activeCard = cardEls[activeIndex]
      if (activeCard) activate(activeCard.dataset.accordionCard ?? '')
    }

    tabEls.forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = cardEls.findIndex(
          (c) => c.dataset.accordionCard === tab.dataset.accordionTab
        )
        const maxIndex = cardEls.length - 1
        const scrollable = section.offsetHeight - window.innerHeight
        const target = section.offsetTop + (idx / maxIndex) * scrollable
        window.scrollTo({ top: target, behavior: 'smooth' })
      })
    })

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [cards.length])

  const minHeight = `${(cards.length - 1) * 100 + 120}svh`

  return (
    <section
      ref={sectionRef}
      className="platform-accordion"
      id="platform"
      style={{ minHeight }}
    >
      <h2 className="sr-only">视觉 AI 整合网站</h2>
      <div className="accordion-inner">
        <div className="accordion-nav" role="tablist">
          {cards.map((c, i) => (
            <button
              key={c.key}
              ref={(el) => {
                if (el) tabsRef.current[i] = el
              }}
              className={`accordion-tab${i === 0 ? ' active' : ''}`}
              data-accordion-tab={c.key}
              role="tab"
              aria-selected={i === 0 ? 'true' : 'false'}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="accordion-stack" aria-live="polite">
          {cards.map((c, i) => (
            <article
              key={c.key}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              className={`accordion-card${i === 0 ? ' active' : ''}`}
              data-accordion-card={c.key}
            >
              <div className="accordion-copy">
                <h3>{c.label}</h3>
                <p>{c.description}</p>
              </div>
              <div className="accordion-visual">
                <div className="code-window">
                  <span />
                  <span />
                  <span />
                  <pre>
                    <code>{c.code}</code>
                  </pre>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
