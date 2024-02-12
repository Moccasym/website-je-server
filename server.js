// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
// Enable CORS for all responses


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  
});

app.use(cors());

// const corsOptions = {
//   origin: 'https://website-je-josuaehlers-de.onrender.com',
//   optionsSuccessStatus: 200 // For legacy browser support
// };

// const corsOptions = {
//   origin: function (origin, callback) {
//     const allowedOrigins = ['http://localhost:3000', 'https://website-je-josuaehlers-de.onrender.com'];
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS policy violation'));
//     }
//   },
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// Define a route to handle POST requests to /send-email
app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  const mailOptions = {
    from: `Josuaehlers.de <felix.steinchen94@googlemail.com>`, // Display name and your email
    to: process.env.MAIL_USER, // Your email where you want to receive messages
    subject: `Betreff: ${subject}`,
    text: `Message from: ${email}\n\nMessage: ${message}`,
    // Or if you want to use HTML content:
    html: `<p><strong>Message from:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
