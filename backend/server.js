const express = require('express')
const cors = require('cors')
const { Resend } = require('resend')
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

// ── Resend Setup ────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY)

// ── Contact Route ───────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required',
      })
    }

    // Send Email
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.MY_EMAIL,
      subject: `📩 New Portfolio Message from ${name}`,

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>📩 New Portfolio Message</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <div style="background:#f3f4f6;padding:15px;border-radius:8px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    })

    console.log('✅ Email sent:', data)

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (err) {
    console.error('❌ Contact error:', err)

    return res.status(500).json({
      error: err.message,
    })
  }
})

// ── Root Route ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'Portfolio backend running ✅',
  })
})

// ── Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})