const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()

// ── Middleware ──────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
)

app.use(express.json())

// ── Nodemailer Transporter ──────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  connectionTimeout: 10000,
})

// ── Send Email helper ───────────────────────────────────
async function sendEmail(name, email, message) {
  // Mail to you
  const mailToMe = {
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    subject: `📩 New Portfolio Message from ${name}`,
    html: `
      <h2>New Portfolio Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  }

  // Auto reply
  const mailToSender = {
    from: `"Shubham Thakor" <${process.env.MAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html: `
      <h2>Hey ${name} 👋</h2>
      <p>Thanks for contacting me. I received your message successfully.</p>
    `,
  }

  try {
    const info1 = await transporter.sendMail(mailToMe)
    console.log('✅ Mail to owner sent:', info1.response)

    const info2 = await transporter.sendMail(mailToSender)
    console.log('✅ Auto reply sent:', info2.response)
  } catch (err) {
    console.error('❌ Mail sending failed:', err.message)
  }
}

// ── Contact Route ───────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required',
      })
    }

    // Send email in background
    sendEmail(name, email, message).catch(err =>
      console.error('❌ Email error:', err.message)
    )

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (err) {
    console.error('❌ Contact error:', err.message)

    return res.status(500).json({
      error: err.message,
    })
  }
})

// ── Root Route ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'Portfolio backend running ✅' })
})

// ── Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})