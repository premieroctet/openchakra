const lodash = require('lodash')
const SibApiV3Sdk = require('sib-api-v3-sdk')
const {getSibApiKey}=require('../../config/config')

const SIB_API_KEY_V3 = getSibApiKey()

class SIB_V3 {

  constructor() {
    let defaultClient = SibApiV3Sdk.ApiClient.instance
    let apiKey = defaultClient.authentications['api-key']
    apiKey.apiKey = SIB_API_KEY_V3

    this.smtpInstance = new SibApiV3Sdk.SMTPApi()
    this.smsInstance = new SibApiV3Sdk.TransactionalSMSApi()
  }

  sendMail({index, email, ccs, data, attachment=null}) {
    console.log(`Sending mail template #${index} to ${email} with data ${JSON.stringify(data)}, attachment:${attachment ? 'yes' : 'no'}`)

    let emailData = new SibApiV3Sdk.SendSmtpEmail()

    emailData.to = [{email: email}]
    if (ccs?.length>0) {
      emailData.cc=ccs.map(cc => ({email: cc}))
    }
    emailData.templateId = parseInt(index)

    if (attachment) {
      emailData.attachment=[attachment]
    }
    // Brevo requires params not to e mepty
    if (data) {
      emailData.params = {}
      Object.assign(emailData.params, data)
    }

    return this.smtpInstance.sendTransacEmail(emailData)
      .then(data => {
        console.log(`SMTP called successfully with params ${JSON.stringify({...emailData, attachment: !!emailData.attachment})}. Result: ${JSON.stringify(data)}`)
        return true
      })
      .catch(err => {
        console.error(err.response?.text || err)
        console.error(`Error while sending ${JSON.stringify(lodash.omit(emailData, 'attachment'))}:${JSON.stringify(err.response.body)}`)
        return false
      })
  }

  sendSms(number, data, contact) {

    console.log(`SendInBlue/Brevo sending SMS to ${number}, data:${JSON.stringify(data)}`)

    const smsData = new SibApiV3Sdk.SendTransacSms()
    smsData.sender = contact || 'Contact'
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

const PROVIDER = new SIB_V3()

module.exports = PROVIDER
