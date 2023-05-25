const { sendNotification, setSmsContents } = require('../../utils/mailing')
const JSSoup = require('jssoup').default
const {datetime_str} = require('../../../utils/dateutils')

const SIB_IDS={
  ASK_RECOMMANDATION: 15,
  FORGOT_PASSWORD: 20,
  ASK_CONTACT: 33,
  CUSTOMER_QUOTATION_SENT_2_CUSTOMER: 36,
  TIPI_ACCOUNT_CREATED: 37,
  CUSTOMER_ACCOUNT_CREATED: 38,
  ACCOUNT_DEACTIVED: 45,
  ADMIN_ACCOUNT_CREATED: 63,
  TIPI_SEARCH: 65,
}

const SMS_CONTENTS={
  [SIB_IDS.CUSTOMER_QUOTATION_SENT_2_CUSTOMER]: 'Bonjour, {{params.user_full_name}} vous soumet un devis',
}

setSmsContents(SMS_CONTENTS)

// #20
const sendForgotPassword = ({user, password}) => {
  return sendNotification({
    notification: SIB_IDS.FORGOT_PASSWORD,
    destinee: user,
    params: {
      user_firstname: user.firstname,
      login: user.email,
      password: password,
    }
  })
}

// #36
const sendQuotationSentToCustomer = ({quotation}) => {
  return sendNotification({
    notification: SIB_IDS.CUSTOMER_QUOTATION_SENT_2_CUSTOMER,
    destinee: {email: quotation.email},
    params: {
      user_full_name: quotation.mission.job.user.full_name,
      customer_firstname: quotation.firstname,
      message: quotation.description,
    }
  })
}

// #37
const sendAccountCreatedToTIPI = ({user}) => {
  return sendNotification({
    notification: SIB_IDS.TIPI_ACCOUNT_CREATED,
    destinee: user,
    params: {
      user_firstname: user.firstname,
    }
  })
}

// #38
const sendAccountCreatedToCustomer = ({user}) => {
  return sendNotification({
    notification: SIB_IDS.CUSTOMER_ACCOUNT_CREATED,
    destinee: user,
    params: {
      user_firstname: user.firstname,
    }
  })
}

const sendAskContact = ({user, fields}) => {
  return sendNotification({
    notification: SIB_IDS.ASK_CONTACT,
    destinee: user,
    params: {
      ...fields
    }
  })
}

const sendAccountCreatedToAdmin = ({user, password}) => {
  return sendNotification({
    notification: SIB_IDS.ADMIN_ACCOUNT_CREATED,
    destinee: user,
    params: {
      user_firstname: user.firstname,
      login: user.email,
      password: password,
    }
  })
}

const sendAccountDeactivated = ({user}) => {
  return sendNotification({
    notification: SIB_IDS.ACCOUNT_DEACTIVED,
    destinee: user,
    params: {
      user_firstname: user.firstname,
    }
  })
}

// Send email to destinee_email asking recommandation for user using URL
const sendAskRecomandation = ({user, destinee_email, message, url}) => {
  return sendNotification({
    notification: SIB_IDS.ASK_RECOMMANDATION,
    destinee: {email: destinee_email},
    params: {
      user_full_name: user.full_name,
      message,
      url,
    }
  })
}

// Send email to TIPI asking for TI search
const sendTipiSearch = ({admin, mission}) => {
  const mission_description_txt=new JSSoup(mission.description||'<html></html>').text
  return sendNotification({
    notification: SIB_IDS.TIPI_SEARCH,
    destinee: admin,
    params: {
      ...mission.user,
      ...mission,
      location: mission.location_str,
      message:  mission_description_txt,
    }
  })
}

module.exports = {
  sendQuotationSentToCustomer,
  sendAccountCreatedToTIPI,
  sendAccountCreatedToCustomer,
  sendForgotPassword,
  sendAskContact,
  sendAccountCreatedToAdmin,
  sendAccountDeactivated,
  sendAskRecomandation,
  sendTipiSearch,
}
