const SibApiV3Sdk = require('sib-api-v3-sdk');
const sendinblue = require('sendinblue-api');

const {SIB_VERSION, SIB_API_KEY_V2, SIB_API_KEY_V3}=require('./consts');

class SIB_V2 {

  constructor() {
    var parameters = { "apiKey": SIB_API_KEY_V2 };
    this.sendinObj = new sendinblue(parameters);
  }

  sendMail(index, data) {
    console.log(`Sending ${index} with ${JSON.stringify(data)}`);
  }

}

class SIB_V3 {

  constructor() {
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = SIB_API_KEY_V3;

    this.apiInstance = new SibApiV3Sdk.SMTPApi();
  }

  sendMail(index, data) {
    SibApiV3Sdk.SendTestEmail({emailTo: "sebastien.auvray@free.fr"});
    console.log(`Sending ${index} with ${JSON.stringify(data)}`);
    var templateId = index; // Number | Id of the template

    var sendEmail = new SibApiV3Sdk.SendEmail(); // SendEmail |
    sendEmail.emailTo=['sebastien.auvray@my-alfred.io'];
    sendEmail.TEST = 'TAGADA';

    this.apiInstance.getSmtpTemplate(templateId).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data, null, 2));
    }, function(error) {
      console.error(error);
    });

    this.apiInstance.sendTemplate(templateId, sendEmail)
      .then(data => {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      })
      .catch ( err => {
        console.error(err);
      });
    }
}

const SIB=SIB_VERSION==2 ? SIB_V2 : SIB_V3;

module.exports={SIB};
