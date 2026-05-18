import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowRight, FiDownload } from 'react-icons/fi'

export default function Hero() {
  const tagRef = useRef()
  const videoRef = useRef()

  useEffect(() => {
    // Ensure video plays smoothly
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0
    }

    const tl = gsap.timeline({ delay: 0.4 })
    tl.fromTo(tagRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }
    )
    .fromTo('.hero-name',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.3'
    )
    .fromTo('.hero-role',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6'
    )
    .fromTo('.hero-desc',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4'
    )
    .fromTo('.hero-btns',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4'
    )
    .fromTo('.hero-stats',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3'
    )
  }, [])

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = '/Shubham_Thakor_Resume.pdf'
    a.download = 'Shubham_Thakor_Resume.pdf'
    a.click()
  }

  return (
    <section id="home" className="hero-section">
      {/* Background grid */}
      <div className="hero-bg-grid" />
      {/* Background blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />

      {/* ── LEFT: Text ── */}
      <div className="hero-left">
        <div ref={tagRef} className="hero-tag" style={{ opacity: 0 }}>
          <span className="hero-tag-dot" />
          AVAILABLE FOR OPPORTUNITIES
        </div>

        <h1 className="hero-name" style={{ opacity: 0 }}>
          <span className="hero-hello">Hello, I am</span>
          <span className="grad-text">Shubham Thakor</span>
        </h1>

        <div className="hero-role" style={{ opacity: 0 }}>
          <TypeAnimation
            sequence={[
              'MERN Stack Developer', 2000,
              'Full-Stack Engineer', 2000,
              'AI App Builder', 2000,
              'React.js Enthusiast', 2000,
            ]}
            wrapper="span"
            repeat={Infinity}
            style={{ color: '#06b6d4', fontWeight: 600 }}
          />
        </div>

        <p className="hero-desc" style={{ opacity: 0 }}>
          3rd-year B.Tech Computer Engineering student at MBPIT, CVM University.
          Building AI-integrated, IoT-enabled &amp; full-stack web applications that make a difference.
        </p>

        <div className="hero-btns" style={{ opacity: 0 }}>
          <a href="#projects" className="btn-primary">
            <span>View Projects</span>
            <FiArrowRight />
          </a>
          <a href="#contact" className="btn-outline">
            <span>Contact Me</span>
          </a>
          <button onClick={handleDownload} className="btn-outline btn-cyan">
            <span>Download Resume</span>
            <FiDownload />
          </button>
        </div>

        <div className="hero-stats" style={{ opacity: 0 }}>
          {[
            { num: '8.80', label: 'CGPA' },
            { num: '2+',   label: 'Projects' },
            { num: '4+',   label: 'Hackathons' },
          ].map(s => (
            <div key={s.label} className="hero-stat">
              <span className="hero-stat-num">{s.num}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Video ── */}
      <div className="hero-right">
        <div className="hero-video-container">
          <video
            ref={videoRef}
            className="hero-video"
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          {/* Smooth fade edges blending into #04040f */}
          <div className="vfade vfade-top" />
          <div className="vfade vfade-bottom" />
          <div className="vfade vfade-left" />
          <div className="vfade vfade-right" />
        </div>

        {/* Floating — CGPA */}
        <div className="hero-card-cgpa">
          <div className="hero-cgpa-label">CGPA</div>
          <div className="hero-cgpa-val">8.80</div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="scroll-indicator">
        <span className="scroll-text">SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
