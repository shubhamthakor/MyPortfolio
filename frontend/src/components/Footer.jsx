import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="footer">
      {/* Left */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 4 }}>
          Shubham Thakor
        </div>
        <div style={{ fontSize: 13, color: '#334155' }}>MERN Stack Developer · Khambhat, Gujarat</div>
      </div>

      {/* Center */}
      <div style={{ fontSize: 14, color: '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
        Built with <FiHeart style={{ color: '#ec4899', width: 14, height: 14 }} /> using React · Three.js · GSAP
      </div>

      {/* Right: Social */}
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { icon: <FiGithub />, href: 'https://github.com/shubhamthakor', color: '#7c3aed' },
          { icon: <FiLinkedin />, href: 'https://linkedin.com/in/Shubham%20Thakor', color: '#06b6d4' },
          { icon: <FiMail />, href: 'mailto:shubhamthakor2005@gmail.com', color: '#ec4899' },
        ].map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noreferrer"
            style={{
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10, color: '#475569', fontSize: 17,
              textDecoration: 'none', transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = s.color
              e.currentTarget.style.background = `${s.color}15`
              e.currentTarget.style.borderColor = `${s.color}35`
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#475569'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </footer>
  )
}
