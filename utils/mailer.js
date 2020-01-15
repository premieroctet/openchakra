nodemailer = require('nodemailer');

const sendMail = (from, to, subject, text, html) => {
  console.log("Send mail from "+from+" to "+to+", subject:"+subject);
  console.log("Text is "+text);
  console.log("Html is "+html);
  let transporter = nodemailer.createTransport({
    host: 'smtp.free.fr',
    port: 587,
    auth: {
      user: 'sebastien.auvray@free.fr',
      pass: '600Bimota'
    }
  })
                                
  let info = transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    //text: text, // plain text body
    html: html, // html body
  })

};

module.exports = {sendMail};
