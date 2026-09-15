import { useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  src: string
  poster: string
  sections?: string[]
}

export default function VideoBackground({ src, poster, sections = [] }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const video = videoRef.current
    const container = containerRef.current
    const applyMotionPref = () => {
      if (!video || !container) return
      if (mq.matches) {
        video.pause()
        video.currentTime = 0
        container.dataset.reduced = 'true'
      } else {
        delete container.dataset.reduced
        video.play().catch(() => {})
      }
    }
    applyMotionPref()
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', applyMotionPref)
      return () => mq.removeEventListener('change', applyMotionPref)
    }
    return undefined
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container || sections.length === 0) return
    const els = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0]
        if (visible) {
          container.dataset.active = visible.target.id
        }
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: '-10% 0px -10% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <div
      id="video-bg-container"
      className="video-bg"
      ref={containerRef}
      style={{ backgroundImage: `url(${poster})` }}
      aria-hidden="true"
    >
      <video ref={videoRef} src={src} poster={poster} autoPlay muted loop playsInline preload="auto" />
      <div className="video-bg-overlay" />
      <div className="video-bg-scanlines" />
      <div className="video-bg-tint" />
    </div>
  )
}