const { sendNotification, setSmsContents } = require('../../utils/mailing')
const {datetime_str} = require('../../../utils/dateutils')

const SIB_IDS={
  // CUSTOMERS
  FORGOT_PASSWORD: 4995801, // OK
  /**
  SATISFY_SURVEY: 4996126,
  CONSULTATION_BOUGHT_OK: 4830569,
  CONSULTATION_BOUGHT_ERROR: 4830717,
  BASKET_CANCELED: 4995332,
  COLL_CHALLENGE_DONE: 5002734,
  COACHING_END: 5013370, // J+2 after last coaching appointment
  UNUSED_COACHING_CREDIT: 5013424, // 1 month after last appt if credit>0
  MEASURES_REMAINER: 5010216,
  */
  // DIETS
  DIET_PREREGISTER_2_DIET: 4852839,
  DIET_PREREGISTER_2_ADMIN: 5034812,
  /**
  DIET_VALIDATED_2_DIET: 5027161,
  DIET_NOT_VALIDATED_TO_DIET: 5033315,
  DIET_ACTIVATED_2_DIET:5033406,
  DIET_SELECT_2_DIET: 5034852,
  APPOINTMENT_CHANGED_2_DIET: 5034955,
  APPOINTMENT_CANCELLED_2_DIET: 5034997,
  APPOINTEMNT_REMINDER_2_DIET: 5035052, // reminds at 7PM the day before
  DIET_ACTIVATED_2_DIET: 5035013, // 1 week after activated
  */
}

const sendForgotPassword = ({user, password}) => {
  return sendNotification({
    notification: SIB_IDS.FORGOT_PASSWORD,
    destinee: user,
    params: {
      FIRSTNAME: user.firstname,
      PASSWORD: password,
    },
  })
}

const sendDietPreRegister2Diet = ({user}) => {
  return sendNotification({
    notification: SIB_IDS.DIET_PREREGISTER_2_DIET,
    destinee: user,
    params: {
      FIRSTNAME: user.firstname,
    },
  })
}

const sendDietPreRegister2Admin = ({user, admin}) => {
  return sendNotification({
    notification: SIB_IDS.DIET_PREREGISTER_2_ADMIN,
    destinee: admin,
    params: {
      FIRSTNAME: user.firstname,
      LASTNAME: user.lastname,
    },
  })
}

module.exports = {
  sendForgotPassword,
  sendDietPreRegister2Diet,
  sendDietPreRegister2Admin,
}
