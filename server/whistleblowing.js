const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'your-smtp-server.com', // Replace with your SMTP server
  port: 587, // Common SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'info@a-aglobaleasing.com', // Replace with your email
    pass: 'your-email-password' // Replace with your email password
  }
});

// Whistleblowing form endpoint
app.post('/api/whistleblowing', async (req, res) => {
  try {
    const { name, email, phone, subject, message, anonymous } = req.body;
    
    // Prepare email content
    const mailOptions = {
      from: '"A & A Global Leasing" <info@a-aglobaleasing.com>',
      to: 'info@a-aglobaleasing.com', // Where to send the report
      subject: `Whistle Blowing Report: ${subject}`,
      html: `
        <h2>Whistle Blowing Report</h2>
        <p><strong>Category:</strong> ${subject}</p>
        <p><strong>Details:</strong></p>
        <p>${message}</p>
        ${anonymous ? '<p><strong>This is an anonymous report</strong></p>' : ''}
        ${!anonymous && name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        ${!anonymous && email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        ${!anonymous && phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to submit report' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});