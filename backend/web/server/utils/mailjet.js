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

  addContactToList({fullname, email, list}) {
    return this.smtpInstance
      .post('contactslist', {'version': 'v3'})
      .id(list)
      .action('managecontact')
      .request({
        'Email': email,
        'Name': fullname,
        'Action': 'addnoforce',
      })
      .then(res => JSON.parse(JSON.stringify(res.body.Data)))
  }

  removeContactFromList({email, list}) {
    return this.smtpInstance
      .post('contactslist', {'version': 'v3'})
      .id(list)
      .action('managecontact')
      .request({
        'Email': email,
        'Action': 'remove',
      })
      .then(res => JSON.parse(JSON.stringify(res.body.Data)))
  }

  // Contacts are {email, fullname}
  addContactsToList({contacts, list}) {
    return this.smtpInstance
      .post('contact', {'version': 'v3'})
      .id(list)
      .action('managemanycontacts')
      .request({
        Contacts: contacts.map(contact => ({Email: contact.email, Name: contact.fullname})),
        ContactsLists: [{
          ListID: list,
          Action: 'addnoforce',
        }],
      })
      .then(res => JSON.parse(JSON.stringify(res.body.Data)))
  }


  removeContactsFromList({emails, list}) {
    return this.smtpInstance
      .post('contact', {'version': 'v3'})
      .id(list)
      .action('managemanycontacts')
      .request({
        Contacts: emails.map(email => ({Email: email})),
        ContactsLists: [{
          ListID: list,
          Action: 'remove',
        }],
      })
      .then(res => JSON.parse(JSON.stringify(res.body.Data)))
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

const PROVIDER = new MAILJET_V6()

module.exports = PROVIDER
