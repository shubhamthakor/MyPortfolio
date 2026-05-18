import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import { FiSend, FiPhone, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const ref = useRef()
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')   // 'success' | 'error' | ''
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
        )
        gsap.fromTo('.contact-right',
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
          )
        }, ref)
        return () => ctx.revert()
      }, [])
      
      const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
      
      
      const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus('')
        
        const API_URL = import.meta.env.VITE_API_URL
        try {
          await axios.post(`${API_URL}/api/contact`, form)
          
          setStatus('success')
          setForm({
            name: '',
            email: '',
            message: '',
          })
        } catch {
          setStatus('error')
  } finally {
    setLoading(false)
  }
}
  const INFO = [
    { icon: <FiPhone />,    label: 'Phone',    val: '+91 6354313082',              color: '#7c3aed' },
    { icon: <FiMail />,     label: 'Email',    val: 'shubhamthakor2005@gmail.com', color: '#06b6d4' },
    { icon: <FiMapPin />,   label: 'Location', val: 'Khambhat, Gujarat, India',    color: '#ec4899' },
    { icon: <FiGithub />,   label: 'GitHub',   val: 'github.com/shubhamthakor',   color: '#a855f7' },
    { icon: <FiLinkedin />, label: 'LinkedIn', val: 'Shubham Thakor',             color: '#10b981' },
  ]

  return (
    <section id="contact" ref={ref} className="contact-section">
      {/* BG glow */}
      <div className="contact-bg-glow" />

      {/* Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>05</span><span>Contact</span>
        </div>
        <h2 className="section-title">
          Get In <span className="grad-text">Touch</span>
        </h2>
        <p className="section-sub">
          Have a project in mind or want to collaborate? Let's build something amazing together!
        </p>
      </div>

      <div className="contact-grid">
        {/* Left info */}
        <div className="contact-left">
          <h3 className="contact-heading">Let's Talk</h3>
          <p className="contact-intro">
            I'm currently looking for new opportunities. Whether you have a question or
            just want to say hi — my inbox is always open!
          </p>
          {INFO.map(item => (
            <div key={item.label} className="info-card"
              onMouseEnter={e => gsap.to(e.currentTarget, { x: 8, duration: 0.25 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { x: 0, duration: 0.25 })}
            >
              <div className="info-icon" style={{ background: `${item.color}18`, color: item.color }}>
                {item.icon}
              </div>
              <div>
                <div className="info-label">{item.label}</div>
                <div className="info-val">{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right form */}
        <div className="contact-right">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <label className="form-label">Your Name</label>
              <input
                className="form-input"
                type="text" name="name" value={form.name}
                onChange={handleChange}
                placeholder="John Doe" required
              />
            </div>
            <div className="form-row">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email" name="email" value={form.email}
                onChange={handleChange}
                placeholder="hello@example.com" required
              />
            </div>
            <div className="form-row">
              <label className="form-label">Message</label>
              <textarea
                className="form-input form-textarea"
                name="message" value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required rows={5}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
              <FiSend />
            </button>

            {status === 'success' && (
              <div className="form-status success">
                ✅ Message sent! I'll reply to your email soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-status error">
                ❌ Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
