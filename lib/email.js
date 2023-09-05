const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bb4e90f7e080f9",
      pass: "b988e3c7866ab9",
    },
  });

  const Emailoptions = {
    from: "support<support@cineflix.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(Emailoptions);
};

module.exports = sendEmail;
