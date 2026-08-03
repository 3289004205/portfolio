import { useRef, type ElementType, type MouseEvent, type ReactNode } from 'react'
import './SpotlightCard.css'

type SpotlightCardProps = {
  children?: ReactNode
  className?: string
  /** 光斑颜色，建议用带透明度的 rgba */
  spotlightColor?: string
  /** 渲染标签，默认 div；卡片可点击时传 'button' 以保证语义与无障碍 */
  as?: ElementType
} & Record<string, any>

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  as: asProp = 'div',
  ...rest
}: SpotlightCardProps) {
  const divRef = useRef<HTMLElement | null>(null)
  const Tag = asProp as any

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = divRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <Tag
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
