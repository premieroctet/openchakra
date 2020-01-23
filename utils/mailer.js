nodemailer = require('nodemailer');
const Email = require('email-templates');

const sendMail = (from, to, template, locals) => {
  console.log("Send mail from "+from+" to "+to);

  let transporter = nodemailer.createTransport({
    host: 'smtp.free.fr',
    port: 587,
    auth: {
      user: 'sebastien.auvray@free.fr',
      pass: '600Bimota'
    }
  })

  const email = new Email({
    message: {
      from: from
    },
    //send: true,
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
