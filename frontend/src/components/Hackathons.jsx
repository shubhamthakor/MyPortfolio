import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hackathons = [
  { name: 'CVMU Gyanotsav 4.0', org: 'CVM University', year: '2026', icon: '🏆', color: '#f59e0b' },
  { name: 'Tech-Tonic Hackathon', org: 'CHARUSAT University', year: '2025', icon: '⚡', color: '#7c3aed' },
  { name: 'Smart India Hackathon (SIH)', org: 'Government of India', year: '2025', icon: '🇮🇳', color: '#06b6d4' },
  { name: 'Adobe Hackathon', org: 'Adobe', year: '2025', icon: '🎨', color: '#ec4899' },
]

export default function Hackathons() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hack-left',
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo('.hack-right',
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo('.hack-item',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.hack-item', start: 'top 85%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hackathons" ref={sectionRef} className="hackathons-section">
      {/* BG */}
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* LEFT: Hackathons list */}
      <div className="hack-left" style={{ opacity: 0 }}>
        <div className="section-tag">
          <span>04</span><span>Competitions</span>
        </div>
        <h2 className="section-title">
          Hackathons &<br />
          <span className="grad-text">Competitions</span>
        </h2>
        <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.8, marginBottom: 48 }}>
          Competing, learning and building solutions for real-world problems.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {hackathons.map((h, i) => (
            <div
              key={h.name}
              className="hack-item"
              style={{ opacity: 0 }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget, { x: 10, duration: 0.3, ease: 'power2.out' })
                e.currentTarget.style.background = `${h.color}0d`
                e.currentTarget.style.borderColor = `${h.color}35`
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: 'power2.out' })
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              <div style={{
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'background 0.3s, border-color 0.3s',
              }}>
                <div style={{
                  width: 52, height: 52,
                  background: `${h.color}15`,
                  border: `1px solid ${h.color}30`,
                  borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                  boxShadow: `0 0 20px ${h.color}20`,
                }}>
                  {h.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: h.color, fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>{h.year}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', marginBottom: 2 }}>{h.name}</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>{h.org}</div>
                </div>
                <div style={{ fontSize: 18, color: h.color, opacity: 0.5 }}>→</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      

      

        </section>
  )
}
