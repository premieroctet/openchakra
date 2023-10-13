const { isProduction } = require('../../config/config')

/**
As from https://dev.mailjet.com/email/reference/contacts/contact-list/
*/

const Mailjet = require('node-mailjet')
const {getMailjetConfig} = require('../../config/config')
const MAILJET_CONFIG = getMailjetConfig()

const RESULTS_LIMIT=100

class MAILJET_V6 {

  constructor() {
    this.smtpInstance = new Mailjet({
      apiKey: MAILJET_CONFIG.MAILJET_PUBLIC_KEY,
      apiSecret: MAILJET_CONFIG.MAILJET_PRIVATE_KEY,
    })
  }


  sendMail({index, email, /** ccs,*/ data, attachment=null}) {
    console.log(`Sending mail template #${index} to ${email} with data ${JSON.stringify(data)}, attachment:${attachment ? 'yes' : 'no'}`)
    console.warn(`ccs is not already handled`)
    const message={
      To: [{Email: email}],
      TemplateID: index,
      TemplateLanguage: true,
      Variables: {...data},
    }

    return this.smtpInstance
      .post('send', {version: 'v3.1'})
      .request({Messages: [message]})
  }

  getContactsLists() {
    return this.smtpInstance
      .get(`contactslist?Limit=${RESULTS_LIMIT}`, {version: 'v3'})
      .request()
      .then(res => JSON.parse(JSON.stringify(res.body.Data)))
  }

  acceptEmail(email) {
    return true
  }

  // Contacts are {email, fullname}
  // Returns a JobID isf successful
  addContactsToList({contacts, list}) {
    const filteredContacts=contacts.filter(({Email}) => this.acceptEmail(Email))
    if (filteredContacts.length!=contacts.length) {
      console.log(`${contacts.length-filteredContacts.length} rejected emails `)
      console.log(contacts, filteredContacts)
    }
    return this.smtpInstance
      .post('contactslist', {'version': 'v3'})
      .id(list)
      .action('managemanycontacts')
      .request({
        Action: 'addnoforce',
        Contacts: filteredContacts
      })
      .then(res => {
        const jobId=res.body.Data[0].JobID
        console.log(`Mailjet add ${filteredContacts.length} contacts to ${list}:jobId is ${jobId}`)
        return jobId
      })
  }

  checkContactsListsJob(jobId) {
    return this.smtpInstance
    .get(`contact`, {'version': 'v3'})
    	.action("managemanycontacts")
      .id(jobId)
    	.request()
      .then(res => {
        //console.log(`Mailjet job status ${jobId}:${JSON.stringify(res.body.Data)}`)
        return res.body.Data
      })
    }

  removeContactsFromList({contacts, list}) {
    const filteredContacts=contacts.filter(({Email}) => this.acceptEmail(Email))
    if (filteredContacts.length!=contacts.length) {
      console.log(`${contacts.length-filteredContacts.length} rejected emails `)
    }
    return this.smtpInstance
      .post('contactslist', {'version': 'v3'})
      .id(list)
      .action('managemanycontacts')
      .request({
        Action: 'remove',
        Contacts: filteredContacts
      })
      .then(res => {
        const jobId=res.body.Data[0].JobID
        //console.log(`Mailjet remove ${filteredContacts.length} contacts from ${list}:jobId is ${jobId}`)
        return jobId
      })
  }

  /**
  sendSms(number, data) {

    console.log(`Sending SMS to ${number}, data:${JSON.stringify(data)}`)

    const smsData = new SibApiV3Sdk.SendTransacSms()
    smsData.sender = 'Contact'
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
  */

}

class MAILJET_V6_TEST extends MAILJET_V6 {
  constructor() {
    super()
  }

  acceptEmail(email) {
    return /@wappizy.com$/i.test(email)
  }

}

const PROVIDER = isProduction() ? new MAILJET_V6() : new MAILJET_V6_TEST()

module.exports = PROVIDER
