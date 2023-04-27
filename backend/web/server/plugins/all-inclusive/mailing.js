const { sendNotification, setSmsContents } = require('../../utils/mailing')
const {datetime_str} = require('../../../utils/dateutils')

const SIB_IDS={
  CUSTOMER_QUOTATION_SENT_2_CUSTOMER: 36,
}

const SMS_CONTENTS={
  [SIB_IDS.CUSTOMER_QUOTATION_SENT_2_CUSTOMER]: 'Bonjour, {{params.user_full_name}} vous soumet un devis',
}

setSmsContents(SMS_CONTENTS)

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

module.exports = {
  sendQuotationSentToCustomer,
}
