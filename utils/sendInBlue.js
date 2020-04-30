const SibApiV3Sdk = require('sib-api-v3-sdk');

const SIB_API_KEY_V2='SvfYtHq36XGknjwC';
const SIB_API_KEY_V3='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';

const SIB_VERSION=3;

const SmsTemplateId=38;

class SIB_V3 {

  constructor() {
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = SIB_API_KEY_V3;

    this.smtpInstance = new SibApiV3Sdk.SMTPApi();
    this.smsInstance = new SibApiV3Sdk.TransactionalSMSApi();
  }

  sendMail(index, email, data) {
    console.log(`Sending mail template #${index} to ${email} with data ${JSON.stringify(data)}`);
    var templateId = index; // Number | Id of the template

    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.to=[{email:email}];
    sendSmtpEmail.templateId = parseInt(index);
    sendSmtpEmail.params = {};
    Object.assign(sendSmtpEmail.params, data);

    this.smtpInstance.sendTransacEmail(sendSmtpEmail)
      .then(data => {
        console.log('SMTP called successfully. Returned data: ' + JSON.stringify(data, null, 2));
        return true;
      })
      .catch ( err => {
        console.error(err);
        return false;
      });
    }

    sendSms(number, data) {

      console.log(`Sending SMS to ${number}, with data ${data}`);

      const sendTransacSms = new SibApiV3Sdk.SendTransacSms();
      sendTransacSms.sender     = 'MyAlfred';
      sendTransacSms.recipient  = number;
      sendTransacSms.content    = data;
      sendTransacSms.type       = 'transactional';

      this.smsInstance.sendTransacSms(sendTransacSms)
        .then(data => {
          console.log('SMS called successfully. Returned data: ' + JSON.stringify(data, null, 2));
          return true;
        })
        .catch ( err => {
          console.error(err);
          return false;
        });
      return true;
    }
}

const SIB=new SIB_V3();

module.exports={SIB};
