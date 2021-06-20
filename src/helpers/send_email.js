const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  sendMail: (msg, url, userEmailAddress) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    })

    const mailOptions = {
      from: `"Coffee Express >> " <${process.env.SMTP_EMAIL}>`,
      to: userEmailAddress,
      subject: `Coffee Express - ${msg}`,
      html: `<b>Click Here to activate</b><a href=${url}>Click !</>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}
