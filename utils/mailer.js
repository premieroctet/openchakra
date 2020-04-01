nodemailer = require('nodemailer');
const Email = require('email-templates');
const {mailConfig} = require('../config/config.js')
var xoauth2 = require('xoauth2')

const sendMail = (from, to, template, locals) => {
  console.log("Send mail from "+from+" to "+to+" with locals "+JSON.stringify(locals));

  auth = {
      type: 'OAuth2',
      user: mailConfig.user,
      clientId: mailConfig.clientId,
      clientSecret: mailConfig.clientSecret,
      accessToken: mailConfig.accessToken,
      refreshToken: mailConfig.refreshToken
    }

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
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
