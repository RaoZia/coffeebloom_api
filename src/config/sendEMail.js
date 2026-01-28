const nodeMailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MY_Email,
      pass: process.env.EMAIL_PASS,
    },
  });
  const data = await transporter.sendMail({
    from: process.env.MY_Email,
    to: email,
    subject: subject,
    text: message,
  });
};

module.exports = sendEmail;
