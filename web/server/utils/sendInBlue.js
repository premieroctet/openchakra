const SibApiV3Sdk = require('sib-api-v3-sdk')

const SIB_API_KEY_V3 = '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'

class SIB_V3 {

  constructor() {
    let defaultClient = SibApiV3Sdk.ApiClient.instance
    let apiKey = defaultClient.authentications['api-key']
    apiKey.apiKey = SIB_API_KEY_V3

    this.smtpInstance = new SibApiV3Sdk.SMTPApi()
    this.smsInstance = new SibApiV3Sdk.TransactionalSMSApi()
  }

  sendMail(index, email, data) {
    console.log(`Sending mail template #${index} to ${email} with data ${JSON.stringify(data)}`)

    let emailData = new SibApiV3Sdk.SendSmtpEmail()

    emailData.to = [{email: email}]
    emailData.templateId = parseInt(index)
    emailData.params = {}
    Object.assign(emailData.params, data)

    this.smtpInstance.sendTransacEmail(emailData)
      .then(data => {
        console.log(`SMTP called successfully. Returned data: ${JSON.stringify(data)}`)
        return true
      })
      .catch(err => {
        console.error(`Error while sending ${JSON.stringify(emailData)}:${JSON.stringify(err.response.body)}`)
        return false
      })
  }

  sendSms(number, data) {

    console.log(`Sending SMS to ${number}, data:${JSON.stringify(data)}`)

    const smsData = new SibApiV3Sdk.SendTransacSms()
    smsData.sender = 'MyAlfred'
    smsData.recipient = number
    smsData.content = data
    smsData.type = 'transactional'

    this.smsInstance.sendTransacSms(smsData)
      .then(data => {
        console.log(`SMS called successfully. Returned data: ${ JSON.stringify(data, null, 2)}`)
        return true
      })
      .catch(err => {
        console.error(`Error while sending ${JSON.stringify(smsData)}:${JSON.stringify(err.response.body)}`)
        return false
      })
  }
}

const SIB = new SIB_V3()

module.exports = {SIB}
