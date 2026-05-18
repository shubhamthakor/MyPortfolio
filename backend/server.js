const express  = require('express')
const cors     = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()

// ── Middleware ──────────────────────────────────────────
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
)
app.use(express.json())



// ── Nodemailer Transporter ──────────────────────────────
// Uses Gmail SMTP — you need to allow "App Passwords" in your Google account
// Go to: myaccount.google.com → Security → 2-Step Verification → App Passwords
// Generate an App Password for "Mail" and put it in .env as MAIL_PASS
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,   // ← YOUR Gmail: e.g. shubhamthakor2005@gmail.com
    pass: process.env.MAIL_PASS,   // ← YOUR Gmail App Password (NOT your login password)
  },
})

// ── Send Email helper ───────────────────────────────────
async function sendEmail(name, email, message) {
  // Email that arrives in YOUR inbox
  const mailToMe = {
    from:    `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to:      process.env.MAIL_USER,   // receives at your own email
    subject: `📩 New Portfolio Message from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#f9fafb;border-radius:12px;">
        <h2 style="color:#7c3aed;margin-bottom:4px;">New Message — Portfolio</h2>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;"/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin-top:16px;"><strong>Message:</strong></p>
        <div style="background:#fff;padding:16px;border-radius:8px;border-left:4px solid #7c3aed;margin-top:8px;">
          ${message.replace(/\n/g,'<br/>')}
        </div>
        <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Sent from your portfolio contact form.</p>
      </div>
    `,
  }

  // Auto-reply that the sender receives
  const mailToSender = {
    from:    `"Shubham Thakor" <${process.env.MAIL_USER}>`,
    to:      email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#f9fafb;border-radius:12px;">
        <h2 style="color:#7c3aed;">Hey ${name}! 👋</h2>
        <p style="color:#374151;line-height:1.7;">
          Thanks for reaching out through my portfolio! I've received your message and 
          will get back to you as soon as possible — usually within 24 hours.
        </p>
        <div style="background:#fff;padding:16px;border-radius:8px;border-left:4px solid #06b6d4;margin:20px 0;">
          <p style="color:#6b7280;font-size:13px;margin:0;"><em>Your message:</em></p>
          <p style="color:#374151;margin:8px 0 0;">${message.replace(/\n/g,'<br/>')}</p>
        </div>
        <p style="color:#374151;">
          In the meantime, feel free to check out my work:<br/>
          🐙 <a href="https://github.com/shubhamthakor" style="color:#7c3aed;">GitHub</a> &nbsp;·&nbsp;
          💼 <a href="https://linkedin.com/in/Shubham-Thakor" style="color:#7c3aed;">LinkedIn</a>
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
        <p style="font-size:13px;color:#9ca3af;">
          Shubham Thakor · MERN Stack Developer · Khambhat, Gujarat, India
        </p>
      </div>
    `,
  }

  await transporter.sendMail(mailToMe)
  await transporter.sendMail(mailToSender)
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required',
      })
    }

    // Send email
    await sendEmail(name, email, message)

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (err) {
    console.error('❌ Contact error:', err)

    res.status(500).json({
      error: 'Server error',
    })
  }
})
   

app.get('/', (req, res) => res.json({ status: 'Portfolio backend running ✅' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`))
