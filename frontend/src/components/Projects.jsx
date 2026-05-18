import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

function ProjectScene({ color1, color2 }) {
  const mesh = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  useFrame((s) => {
    if (mesh.current) {
      mesh.current.rotation.x = s.clock.elapsedTime * 0.3
      mesh.current.rotation.y = s.clock.elapsedTime * 0.5
    }
    if (ring1.current) ring1.current.rotation.z = s.clock.elapsedTime * 0.8
    if (ring2.current) ring2.current.rotation.z = -s.clock.elapsedTime * 0.5
  })
  return (
    <group>
      <Stars radius={30} depth={20} count={800} factor={2} fade speed={0.5} />
      <Sphere ref={mesh} args={[0.8, 64, 64]} scale={1}>
        <MeshDistortMaterial color={color1} distort={0.4} speed={3} roughness={0.1} metalness={0.5} emissive={color1} emissiveIntensity={0.2} />
      </Sphere>
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.02, 8, 80]} />
        <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={2} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.015, 8, 80]} />
        <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color={color1} />
    </group>
  )
}

const projects = [
  {
    title: 'HealthAI',
    sub: 'Full-Stack AI Disease Detection & Doctor Booking Platform',
    year: '2026',
    desc: 'AI-powered disease detection from natural language symptoms using Random Forest ML & Groq LLaMA 3.3. Features 3 role-based portals (Patient, Doctor, Admin), live queue tracking, JWT auth, voice input & city-based doctor discovery across Gujarat.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Python Flask', 'Groq LLaMA 3.3', 'Random Forest ML', 'JWT'],
    c1: '#7c3aed', c2: '#06b6d4', icon: '🏥',
  },
  {
    title: 'AI Voice Assistant',
    sub: 'Smart Home Automation System',
    year: '2025',
    desc: 'Full-stack AI voice assistant integrated with IoT hardware. Controls home devices (lights/fans) via voice commands using ESP8266 WiFi module. Built with real-time Speech Recognition API and a React dashboard with device status indicators.',
    tech: ['React.js', 'Node.js', 'Express.js', 'Groq AI API', 'ESP8266', 'Speech Recognition', 'REST APIs'],
    c1: '#06b6d4', c2: '#ec4899', icon: '🎙️',
  },
]

export default function Projects() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { opacity: 0, y: 90 },
        {
          opacity: 1, y: 0, duration: 1.1, stagger: 0.25, ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={ref} className="projects-section">
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>
          <span>03</span><span>Projects</span>
        </div>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 700, marginBottom: 16 }}>
          Things I've <span className="grad-text">Built</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: 16 }}>Real-world projects with AI, IoT & full-stack technologies</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
        {projects.map((p, i) => (
          <div key={p.title} className="project-card"
            style={{ opacity: 0 }}
            onMouseEnter={e => gsap.to(e.currentTarget, { y: -14, duration: 0.4, ease: 'power2.out' })}
            onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: 'power2.out' })}
          >
            {/* 3D Banner */}
            <div className="project-banner">
              <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ antialias: true, alpha: true }}>
                <ProjectScene color1={p.c1} color2={p.c2} />
              </Canvas>
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(to bottom, transparent 40%, #04040f 100%)`,
              }} />
              {/* Year badge */}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                padding: '4px 12px',
                background: 'rgba(4,4,15,0.7)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${p.c1}40`,
                borderRadius: 20,
                fontSize: 12, color: p.c1,
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {p.year}
              </div>
              {/* Icon */}
              <div style={{ position: 'absolute', bottom: 20, left: 24, fontSize: 36 }}>{p.icon}</div>
            </div>

            <div style={{ padding: '24px 28px 28px' }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: p.c2, marginBottom: 14, fontStyle: 'italic' }}>{p.sub}</p>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8, marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    padding: '4px 12px',
                    background: `${p.c1}10`,
                    border: `1px solid ${p.c1}25`,
                    borderRadius: 20,
                    fontSize: 11, color: p.c2,
                    transition: 'all 0.3s',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
