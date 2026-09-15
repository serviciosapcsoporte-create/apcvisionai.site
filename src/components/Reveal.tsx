import { m } from 'motion/react'
import type { ReactNode } from 'react'

export interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  scale?: boolean
  duration?: number
  className?: string
}

export default function Reveal({ children, delay = 0, y = 18, scale = false, duration, className }: RevealProps) {
  const initial = scale ? { opacity: 0, y, scale: 0.96 } : { opacity: 0, y }
  return (
    <m.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: duration ?? 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  )
}