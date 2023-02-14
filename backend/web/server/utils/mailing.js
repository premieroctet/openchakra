const lodash=require('lodash')
const {
  getDataModel,
  getHostUrl,
  is_production,
}=require('../../config/config')
const {fillSms} = require('../../utils/sms')
const {SIB} = require('./sendInBlue')

const SMS_CONTENTS = {
}

const sendNotification = ({notification, destinee, ccs, params, attachment}) => {

  let enable_mails = is_production()
  let enable_sms = is_production()

  if (!enable_sms && !enable_mails) {
    console.log(`Mailing disabled:${JSON.stringify(destinee)}/${notification}`)
    return true
  }

  let resultMail = true, resultSms = true

  resultMail = SIB.sendMail({index:notification, email:destinee.email, ccs, data:params, attachment})

  // Send SMS
  if (enable_sms && destinee.phone && SMS_CONTENTS[notification.toString()]) {
    console.log('Sending SMS')
    const smsContents = fillSms(SMS_CONTENTS[notification.toString()], params)
    console.log(`SMS contents is ${ smsContents}`)
    if (!smsContents) {
      console.error(`Error creating SMS ${notification} to ${destinee.phone} with params ${JSON.stringify(params)}`)
      result = false
    }
    else {
      console.log('Calling SIB.sendSms')
      resultSms = SIB.sendSms(destinee.phone, smsContents)
    }
  }
  return resultMail
}


module.exports = {
  sendNotification
}
