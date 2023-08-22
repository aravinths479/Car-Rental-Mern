const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

// Configure nodemailer with Mailtrap credentials
var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "20976930a95f8740a6d7d1f7c3e5e091"
    }
  });

// Define a route to send an email
app.get("/", (req, res) => {
  const mailOptions = {
    from: "your-email@example.com",
    to: "aravinths911@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent using Node.js and Mailtrap.",
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
