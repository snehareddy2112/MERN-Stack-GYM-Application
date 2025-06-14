import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    secure: true, // true for port 465 (SSL)
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"GYM WEBSITE" <${process.env.SMTP_MAIL}>`, // sender
    to: options.email, // recipient (user)
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
