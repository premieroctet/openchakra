nodemailer = require('nodemailer');
const Email = require('email-templates');
const {mailConfig} = require('../config/config.js')
var xoauth2 = require('xoauth2')

console.log("mailConfig:"+JSON.stringify(mailConfig))

const sendMail = (from, to, template, locals) => {
  console.log("Send mail from "+from+" to "+to);

  auth = {
      type: 'OAuth2',
      user: mailConfig.user,
      clientId: mailConfig.clientId,
      clientSecret: mailConfig.clientSecret,
      refreshToken: mailConfig.refreshToken,
      accessToken: mailConfig.accessToken
    }

  console.log("GMail auth:"+JSON.stringify(auth))
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: auth
  })

  const email = new Email({
    message: {
      from: from
    },
    send: true,
    transport: transporter
  })

  email
    .send({
      template: template,
      message: {
        to: to
      },
      locals: locals
    })
    .then(console.log)
    .catch(console.error);
};

module.exports = {sendMail};
