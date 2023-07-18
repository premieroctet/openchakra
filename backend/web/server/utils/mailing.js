const {
  getDataModel,
  getHostUrl,
  isProduction,
  isValidation,
} = require('../../config/config')
const lodash=require('lodash')
const {fillSms} = require('../../utils/sms')
const {SIB} = require('./sendInBlue')

let SMS_CONTENTS = {}

const setSmsContents = data => {
  SMS_CONTENTS = data
}

const sendNotification = ({notification, destinee, ccs, params, attachment}) => {

  const isWappizy=/wappizy/.test(destinee.email)

  let enable_mails = isProduction() || isWappizy
  let enable_sms = isProduction()  || isWappizy

  const prefix=(!enable_sms && !enable_mails) ? '***** DISABLED:':''
  console.log(`${prefix}send notification #${notification} to ${destinee.email} (${JSON.stringify(params)}) attachment:${!!attachment}`)

  if (!enable_sms && !enable_mails) {
    return Promise.resolve(true)
  }

  let resultMail = true, resultSms = true

  if (enable_mails) {
    resultMail = SIB.sendMail({index:notification, email:destinee.email, ccs, data:params, attachment})
  }

  // Send SMS
  if (enable_sms && destinee.phone && SMS_CONTENTS[notification.toString()]) {
    const smsContents = fillSms(SMS_CONTENTS[notification.toString()], params)
    if (!smsContents) {
      console.error(`Error creating SMS ${notification} to ${destinee.phone} with params ${JSON.stringify(params)}`)
      result = false
    }
    else {
      resultSms = SIB.sendSms(destinee.phone, smsContents)
    }
  }
  return Promise.resolve(resultMail)
}


module.exports = {
  sendNotification,
  setSmsContents
}
