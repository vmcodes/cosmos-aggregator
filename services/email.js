const nodemailer = require("nodemailer");
const config = require("../constants");
const smtpCreds = config.smtpCreds;

async function sendEmail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: smtpCreds.host,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: smtpCreds.user, // authorized user
      pass: smtpCreds.password, // authorized password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  try {
    await transporter.sendMail({
      from: "no-reply@objectpress.io", // sender address
      to: "vincent@objectpress.io", // list of receivers
      subject: "Cosmo: Daily Jobs Complete ✔", // subject line
      text: "Daily jobs complete.", // plain text body
      html: "<b>Daily jobs complete.</b>", // html body
    });

    console.log("daily jobs completed, email sent");
  } catch (err) {
    console.log("error sending out email report:", err);
  }
}

module.exports = { sendEmail };
