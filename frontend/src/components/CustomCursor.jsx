import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef()
  const ring = useRef()
  const pos = useRef({ x: 0, y: 0 })
  const ring_pos = useRef({ x: 0, y: 0 })
  const raf = useRef()

  useEffect(() => {
    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`
        dot.current.style.top = `${e.clientY}px`
      }
    }

    const loop = () => {
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * 0.12
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * 0.12
      if (ring.current) {
        ring.current.style.left = `${ring_pos.current.x}px`
        ring.current.style.top = `${ring_pos.current.y}px`
      }
      raf.current = requestAnimationFrame(loop)
    }

    const addHover = () => {
      dot.current?.classList.add('hover')
      ring.current?.classList.add('hover')
    }
    const removeHover = () => {
      dot.current?.classList.remove('hover')
      ring.current?.classList.remove('hover')
    }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card, .timeline-content, .contact-info-item').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    raf.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor" style={{ left: -100, top: -100 }} />
      <div ref={ring} className="cursor-follower" style={{ left: -100, top: -100 }} />
    </>
  )
}
