import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ComputerSetup3D } from '../models/ComputerSetup'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const leftRef = useRef()
  const rightRef = useRef()
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 80, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.3, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about-section">
      {/* BG decor */}
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Left: Info */}
      <div ref={leftRef} style={{ opacity: 0 }}>
        <div className="section-tag">
          <span>01</span>
          <span>About Me</span>
        </div>

        <h2 className="section-title">
          Crafting Digital<br />
          <span className="grad-text">Experiences</span>
        </h2>

        <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.9, marginBottom: 32 }}>
          I'm a <strong style={{ color: '#a855f7' }}>MERN Stack Web Developer</strong> & 3rd-year B.Tech student specializing in Computer Engineering at <strong style={{ color: '#06b6d4' }}>MBPIT, CVM University</strong>.
        </p>

        <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.9, marginBottom: 40 }}>
          I love building AI-integrated, full-stack web apps — from disease detection systems to IoT voice assistants. I bring complex ideas to life with clean code, efficient backend logic, and beautiful UI.
        </p>

        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 36 }}>
          {[
            { num: '8.80', label: 'CGPA', icon: '🎓' },
            { num: '2+', label: 'Live Projects', icon: '🚀' },
            { num: '4+', label: 'Hackathons', icon: '🏆' },
            { num: '20', label: 'Age', icon: '⚡' },
          ].map(s => (
            <div key={s.label} className="stat-card" style={{ opacity: 0 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {['Khambhat, Gujarat', 'B.Tech 2023–2027', 'Age: 20', 'DOB: 15-10-2005', 'Hindi', 'English', 'Gujarati'].map(t => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      </div>

      {/* Right: 3D Computer */}
      <div ref={rightRef} style={{ opacity: 0, height: '75vh', position: 'relative' }}>
        {/* Label above */}
        <div style={{
          position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
          padding: '6px 18px',
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.2)',
          borderRadius: 50,
          fontSize: 12, color: '#06b6d4', letterSpacing: 2, zIndex: 5,
          whiteSpace: 'nowrap',
        }}>
          DRAG TO ROTATE 360°
        </div>

        <Canvas camera={{ position: [0, 1, 6], fov: 50 }} style={{ width: '100%', height: '100%' }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.3} color="#080820" />
          <directionalLight position={[-3, 4, 4]} intensity={0.8} />
          <Stars radius={60} depth={30} count={2000} factor={3} fade speed={0.5} />
          <ComputerSetup3D />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.8}
            minDistance={4}
            maxDistance={9}
          />
        </Canvas>

        {/* Glow underneath */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '70%', height: 60,
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.3) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
      </div>
    </section>
  )
}
