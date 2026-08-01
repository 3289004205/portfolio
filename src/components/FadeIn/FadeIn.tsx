import { useMemo } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import { motion } from 'framer-motion'

type FadeInProps = {
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  style?: CSSProperties
  as?: ElementType
  children: ReactNode
}

/**
 * Reusable in-view fade-in (framer-motion).
 * Animates from { opacity:0, x, y } to { opacity:1, x:0, y:0 } once on enter.
 */
export default function FadeIn({
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  as = 'div',
  children,
}: FadeInProps) {
  const MotionTag = useMemo(() => motion.create(as), [as])

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px', amount: 0 }}
      variants={{
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
