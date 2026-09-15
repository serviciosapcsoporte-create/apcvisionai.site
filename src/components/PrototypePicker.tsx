import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { VARIANTS, type VariantTheme } from '../theme'

interface ProtoPickerProps {
  current: number
  onSelect: (i: number) => void
  onReplay: () => void
}

export default function PrototypePicker({ current, onSelect, onReplay }: ProtoPickerProps) {
  const navRef: RefObject<HTMLElement> = useRef<HTMLElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  const [pos, setPos] = useState<'bottom' | 'top'>('bottom')

  const doAlign = () => {
    const nav = navRef.current
    const hl = highlightRef.current
    if (!nav || !hl) return
    const btn = nav.querySelector<HTMLButtonElement>('.proto-picker-item[data-active="true"]') as HTMLButtonElement | null
    if (!btn) return
    hl.style.left = `${btn.offsetLeft}px`
    hl.style.width = `${btn.offsetWidth}px`
    setReady(true)
  }

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(doAlign)
    return () => cancelAnimationFrame(raf)
  }, [current])

  useLayoutEffect(() => {
    window.addEventListener('resize', doAlign)
    const po = new ResizeObserver(doAlign)
    if (navRef.current) po.observe(navRef.current)
    return () => {
      window.removeEventListener('resize', doAlign)
      po.disconnect()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const n = parseInt(e.key, 10)
      if (n >= 1 && n <= VARIANTS.length) {
        e.preventDefault()
        onSelect(n - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onSelect((current + 1) % VARIANTS.length)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onSelect((current - 1 + VARIANTS.length) % VARIANTS.length)
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault()
        onReplay()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, onSelect, onReplay])

  const nearBottom = () => {
    const y = window.innerHeight
    const vh = document.documentElement.scrollHeight
    setPos(y > vh - y ? 'bottom' : 'top')
  }

  useEffect(() => {
    nearBottom()
    window.addEventListener('resize', nearBottom)
    return () => window.removeEventListener('resize', nearBottom)
  }, [])

  return (
    <nav
      ref={navRef}
      className="proto-picker"
      data-ready={ready || undefined}
      data-position={pos}
      aria-label="Variantes del prototipo"
    >
      <span ref={highlightRef} className="proto-picker-highlight" />
      {VARIANTS.map((v: VariantTheme, i: number) => (
        <button
          key={v.id}
          className="proto-picker-item"
          data-active={i === current || undefined}
          onClick={() => onSelect(i)}
        >
          <span className="proto-picker-num">{i + 1}</span>
          <span style={{ marginLeft: 6 }}>{v.label}</span>
        </button>
      ))}
      <div className="proto-picker-divider" />
      <button className="proto-picker-item proto-picker-replay" onClick={onReplay} aria-label="Replay">
        ↻
      </button>
    </nav>
  )
}