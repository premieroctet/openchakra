const SibApiV3Sdk = require('sib-api-v3-sdk');

const SIB_API_KEY_V2='SvfYtHq36XGknjwC';
const SIB_API_KEY_V3='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';

const SIB_VERSION=3;


class SIB_V3 {

  constructor() {
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = SIB_API_KEY_V3;

    this.apiInstance = new SibApiV3Sdk.SMTPApi();
  }

  sendMail(index, email, data) {
    console.log(`Sending ${index} template to ${email} with data ${JSON.stringify(data)}`);
    var templateId = index; // Number | Id of the template

    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.to=[{email:email}];
    sendSmtpEmail.templateId = parseInt(index);
    sendSmtpEmail.params = {};
    console.log("Setting params:"+JSON.stringify(data));
    Object.assign(sendSmtpEmail.params, data);

    console.log("Sending body:"+JSON.stringify(sendSmtpEmail));

    this.apiInstance.sendTransacEmail(sendSmtpEmail)
      .then(data => {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data, null, 2));
      })
      .catch ( err => {
        console.error(err);
      });
    }

}

const SIB=new SIB_V3();

module.exports={SIB};
