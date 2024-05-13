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
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ff493e6588bdf1",
      pass: "7c78f3fe61fcb4"
    }
  });

  // Setup email data
  let mailOptions = {
    from: 'ashu@gmail.com',
    to: 'ashusrini07@gmail.com', // your recipient email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, message: 'Error sending email' });
    }
    return res.status(200).send({ success: true, message: 'Email sent successfully' });
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
