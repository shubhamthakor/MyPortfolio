import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { FiGithub, FiLinkedin, FiMail, FiX, FiMenu } from 'react-icons/fi'

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Hackathons', 'Contact']

export default function Navbar() {
  const ref = useRef()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.3 }
    )
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (l) => { setActive(l); setMenuOpen(false) }

  const SOCIALS = [
    { icon: <FiGithub />,   href: 'https://github.com/shubhamthakor' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/Shubham-Thakor' },
    { icon: <FiMail />,     href: 'mailto:shubhamthakor2005@gmail.com' },
  ]

  return (
    <>
      <nav ref={ref} className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#home" className="nav-logo" onClick={() => setActive('Home')}>ST</a>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}
                className={active === l ? 'active' : ''}
                onClick={() => handleLink(l)}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop socials */}
        <div className="nav-socials">
          {SOCIALS.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer" className="nav-social-icon">
              {s.icon}
            </a>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            {NAV_LINKS.map(l => (
              <a key={l}
                href={`#${l.toLowerCase()}`}
                className={`mobile-link${active === l ? ' active' : ''}`}
                onClick={() => handleLink(l)}>
                {l}
              </a>
            ))}
          </nav>
          <div className="mobile-socials">
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" className="mobile-social">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
