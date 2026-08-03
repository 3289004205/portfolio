import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export const SpotlightBorder = ({
  children,
  className = '',
  radius = 'rounded-xl',
  size = 360,
  intensity = 0.5,
}: {
  children: ReactNode
  className?: string
  radius?: string
  size?: number
  intensity?: number
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      wrapper.style.setProperty('--spot-x', `${x}px`)
      wrapper.style.setProperty('--spot-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={cn('relative', radius, className)}
      style={{ position: 'relative' }}
    >
      <span
        className={cn('pointer-events-none absolute inset-0', radius)}
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, -200px) var(--spot-y, -200px), rgba(255,255,255,${intensity}), rgba(255,255,255,0) 60%)`,
          padding: '1px',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </div>
  )
}
