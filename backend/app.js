const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// POST route to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ashusrini07@gmail.com', // Your Gmail email address
      pass: 'dfwk mpjt zttq stxb' // Your application-specific password
    }
  });

  // Setup email data
  let mailOptions = {
    from: 'ashusrini07@gmail.com',
    to: 'ashusrini07@gmail.com', // your recipient email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log the error to the console
      return res.status(500).send({ success: false, message: 'Error sending email' });
    }
    console.log('Email sent:', info.response); // Log the response info to the console
    return res.status(200).send({ success: true, message: 'Email sent successfully' });
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
