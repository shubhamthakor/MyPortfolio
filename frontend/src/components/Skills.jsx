import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  { title: 'Frontend', icon: '🎨', color: '#7c3aed', skills: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Three.js'] },
  { title: 'Backend', icon: '⚙️', color: '#06b6d4', skills: ['Node.js', 'Express.js', 'REST APIs', 'Python Flask'] },
  { title: 'Database', icon: '🗄️', color: '#ec4899', skills: ['MongoDB', 'MySQL', 'Mongoose'] },
  { title: 'Languages', icon: '💻', color: '#a855f7', skills: ['C', 'C++', 'Java', 'JavaScript'] },
  { title: 'IoT / Hardware', icon: '📡', color: '#10b981', skills: ['ESP8266', 'WiFi Module', 'Serial Comm'] },
  { title: 'Tools', icon: '🛠️', color: '#f59e0b', skills: ['Git', 'GitHub', 'VS Code', 'Postman'] },
  { title: 'AI / ML', icon: '🧠', color: '#ef4444', skills: ['Groq LLaMA 3.3', 'Random Forest', 'Speech Recognition'] },
  { title: 'Languages Known', icon: '🗣️', color: '#06b6d4', skills: ['Hindi', 'English', 'Gujarati'] },
]

export default function Skills() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-card',
        { opacity: 0, y: 60, scale: 0.88 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.skills-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={ref} className="skills-section">
      {/* BG */}
      <div style={{ position: 'absolute', top: '30%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="skills-header" style={{ textAlign: 'center', marginBottom: 80, opacity: 0 }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>
          <span>02</span><span>Skills</span>
        </div>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 700, marginBottom: 16 }}>
          Technical <span className="grad-text">Arsenal</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          Technologies and tools I use to build amazing things
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {skillGroups.map((g, i) => (
          <div
            key={g.title}
            className="skill-card"
            style={{ opacity: 0 }}
            onMouseEnter={e => {
              gsap.to(e.currentTarget, { y: -10, scale: 1.03, duration: 0.3, ease: 'power2.out' })
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
            }}
          >
            <div className="skill-icon-wrap" style={{ background: `${g.color}18` }}>
              <span>{g.icon}</span>
            </div>
            <h3 style={{ color: g.color }}>{g.title}</h3>
            <div className="skill-pills">
              {g.skills.map(s => (
                <span key={s} className="skill-pill" style={{
                  background: `${g.color}12`,
                  borderColor: `${g.color}30`,
                  color: g.color,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
