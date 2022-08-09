const lodash=require('lodash')
const {
  ENABLE_MAILING,
  getDataModel,
  getHostUrl,
  is_validation,
}=require('../../config/config')
const {CUSTOMER_ADMIN, FEURST_ADV} = require('../../utils/feurst/consts')
const Company = require('../models/Company')
const User = require('../models/User')
const {booking_datetime_str} = require('../../utils/dateutils')
const {fillSms} = require('../../utils/sms')
const SIB_IDS=require('./sib_templates')
const {generateExcel} = require('./feurst/generateExcel')
const {isFeurstUser} = require('./userAccess')
const {SIB} = require('./sendInBlue')

const SMS_CONTENTS = {
  [SIB_IDS.NEW_BOOKING_MANUAL]: '{{ params.client_firstname }} a effectué une demande de réservation de votre service {{ params.service_label }}',
  [SIB_IDS.CONFIRM_PHONE]: 'Pour valider votre numéro de téléphone portable, merci de saisir le code d\'activation suivant : {{ params.sms_code }}',
  [SIB_IDS.ASKING_INFO]: '{{ params.client_firstname }} a effectué une demande d\'information pour votre service {{ params.service_label }}',
  [SIB_IDS.BOOKING_CANCELLED_BY_CLIENT]: 'Malheureusement, {{ params.client_firstname }} a annulé la réservation de votre service {{ params.service_label }}',
  [SIB_IDS.TRANSFER_TO_ALFRED]: 'Un versement de {{ params.total_revenue }} a été effectué pour votre service {{ params.service_label }}',
  [SIB_IDS.BOOKING_CANCELLED_BY_ALFRED]: 'Malheureusement, {{ params.alfred_firstname }} a annulé votre réservation du service {{ params.service_label }}',
  [SIB_IDS.ASKINFO_PREAPPROVED]: '{{ params.alfred_firstname }} a pré approuvé la réservation de votre service {{ params.service_label }}',
  [SIB_IDS.BOOKING_REFUSED_2_CLIENT]: 'Malheureusement, {{ params.alfred_firstname }} a refusé votre réservation du service {{ params.service_label }}',
  [SIB_IDS.BOOKING_CONFIRMED]: '{{ params.alfred_firstname }} a confirmé votre réservation de son service {{ params.service_label }}',
  [SIB_IDS.NEW_BOOKING]: '{{ params.client_firstname }} a réservé votre service {{ params.service_label }}',
  [SIB_IDS.BOOKING_EXPIRED_2_CLIENT]: 'Votre réservation du service {{ params.service_label }} par {{ params.alfred_firstname }} est expirée',
  [SIB_IDS.BOOKING_EXPIRED_2_ALFRED]: 'La réservation de votre service {{ params.service_label }} par {{ params.client_firstname }} est expirée',
}

const sendNotification = (notif_index, destinees, params, attachment=null) => {

  const destinee=lodash.isArray(destinees) ? destinees[0]: destinees
  const ccs=lodash.isArray(destinees) ? destinees.slice(1) : []

  const msg = `Sending notif ${notif_index} to ${destinee.email}(${destinee._id}) using ${JSON.stringify(params)}`

  let enable_mails = ENABLE_MAILING
  const ALLOW_EMAILS=/@.*(alfred|safe|feurst)/i
  // En validation, envoyer les notifications et SMS aux membres de @.*alfred.*
  if (!enable_mails && is_validation() && ALLOW_EMAILS.test(destinee.email||'')) {
    console.log('Mailing disabled except for my-alfred.io mails on validation platform')
    enable_mails = true
  }
  let enable_sms = ENABLE_MAILING

  if (!enable_sms && !enable_mails) {
    console.log(`Mailing disabled:${msg}`)
    return true
  }

  let resultMail = true, resultSms = true

  // Send mail
  if (enable_mails && notif_index != SIB_IDS.CONFIRM_PHONE) {
    resultMail = SIB.sendMail(notif_index, destinee.email, ccs, params, attachment)
  }

  // Send SMS
  if (enable_sms && destinee.phone && SMS_CONTENTS[notif_index.toString()]) {
    console.log('Sending SMS')
    const smsContents = fillSms(SMS_CONTENTS[notif_index.toString()], params)
    console.log(`SMS contents is ${ smsContents}`)
    if (!smsContents) {
      console.error(`Error creating SMS ${notif_index} to ${destinee.phone} with params ${JSON.stringify(params)}`)
      result = false
    }
    else {
      console.log('Calling SIB.sendSms')
      resultSms = SIB.sendSms(destinee.phone, smsContents)
    }
  }
  return resultMail && resultSms
}

const sendVerificationMail = (user, req) => {
  sendNotification(
    SIB_IDS.CONFIRM_EMAIL,
    user,
    {
      link_confirmemail: new URL(`/validateAccount?user=${user._id}`, getHostUrl()),
      user_firstname: user.firstname,
    },
  )
  return true
}

const sendVerificationSMS = user => {
  sendNotification(
    SIB_IDS.CONFIRM_PHONE,
    user,
    {
      sms_code: user.sms_code,
    },
  )
  return true
}

const sendShopDeleted = user => {
  sendNotification(
    SIB_IDS.SHOP_DELETED,
    user,
    {
      user_firstname: user.firstname,
    },
  )
}

const sendBookingConfirmed = booking => {
  sendNotification(
    SIB_IDS.BOOKING_CONFIRMED,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_cost: parseFloat(booking.amount).toFixed(2),
    },
  )
}

const sendBookingCancelledByAlfred = (booking, req) => {
  sendNotification(
    SIB_IDS.BOOKING_CANCELLED_BY_ALFRED,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      link_findnewalfred: new URL('/search', getHostUrl()),

    },
  )
}

const sendBookingCancelledByClient = booking => {
  sendNotification(
    SIB_IDS.BOOKING_CANCELLED_BY_CLIENT,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
    },
  )
}

const sendLeaveCommentForClient = booking => {
  sendNotification(
    SIB_IDS.LEAVE_COMMENT_FOR_CLIENT, // 11
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_reviewsclient: new URL(`/evaluateClient?booking=${booking._id}&id=${booking.serviceUserId}&client=${booking.user._id}`, getHostUrl()),
    },
  )
}

const sendLeaveCommentForAlfred = booking => {
  sendNotification(
    SIB_IDS.LEAVE_COMMENT_FOR_ALFRED, // 12
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_reviewsalfred: new URL(`/evaluate?booking=${booking._id}&id=${booking.serviceUserId}`, getHostUrl()),
    },
  )
}

const sendResetPassword = (user, token) => {
  const url=new URL(`/${getDataModel()=='feurst' ? 'edi/' :'' }resetPassword?token=${token}`, getHostUrl())
  sendNotification(
    SIB_IDS.RESET_PASSWORD,
    user,
    {
      user_firstname: user.firstname,
      link_initiatenewpassword: url,
    },
  )
}

const sendBookingExpiredToAlfred = booking => {
  sendNotification(
    SIB_IDS.BOOKING_EXPIRED_2_ALFRED,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
    },
  )
}

const sendBookingExpiredToClient = booking => {
  sendNotification(
    SIB_IDS.BOOKING_EXPIRED_2_CLIENT,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      link_booknewalfred: new URL('/search', getHostUrl()),
    },
  )
}

const sendBookingDetails = booking => {
  sendNotification(
    SIB_IDS.BOOKING_DETAILS,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_cost: parseFloat(booking.amount).toFixed(2),
    },
  )
}

const sendBookingInfosRecap = (booking, req) => {
  sendNotification(
    SIB_IDS.BOOKING_INFOS_RECAP,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_cost: parseFloat(booking.amount).toFixed(2),
      link_requestinformation: new URL(`/reservations/reservations?id=${booking._id}`, getHostUrl()),
    },
  )
}

const sendNewBooking = (booking, req) => {
  sendNotification(
    SIB_IDS.NEW_BOOKING,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_revenue: parseFloat(booking.alfred_amount).toFixed(2),
      link_showreservation: new URL(`/reservations/reservations?id=${booking._id}`, getHostUrl()),

    },
  )
}

const sendShopOnline = (alfred, req) => {
  sendNotification(
    SIB_IDS.SHOP_ONLINE,
    alfred,
    {
      alfred_firstname: alfred.firstname,
      link_manageshop: new URL(`/profile/services?user=${alfred._id}`, getHostUrl()),
    },
  )
}

const sendBookingRefusedToClient = (booking, req) => {
  sendNotification(
    SIB_IDS.BOOKING_REFUSED_2_CLIENT,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      link_booknewalfred: new URL('/search', getHostUrl()),
    },
  )
}

const sendBookingRefusedToAlfred = booking => {
  sendNotification(
    SIB_IDS.BOOKING_REFUSED_2_ALFRED,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
    },
  )
}

const sendAskingInfo = (booking, req) => {
  sendNotification(
    SIB_IDS.ASKING_INFO,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_revenue: parseFloat(booking.alfred_amount).toFixed(2),
      link_requestinformation: new URL(`/reservations/reservations?id=${booking._id}`, getHostUrl()),
    },
  )
}

const sendNewMessageToAlfred = (booking, chatroom_id, req) => {
  sendNotification(
    SIB_IDS.NEW_MESSAGE_ALFRED,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_showclientmessage: new URL(`/profile/messages?user=${booking.alfred._id}&relative=${booking.user._id}`, getHostUrl()),
    },
  )
}

const sendNewMessageToClient = (booking, chatroom_id, req) => {
  sendNotification(
    SIB_IDS.NEW_MESSAGE_CLIENT,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_showalfredmessage: new URL(`/profile/messages?user=${booking.user._id}&relative=${booking.alfred._id}`, getHostUrl()),
    },
  )
}

const sendAskInfoPreapproved = (booking, req) => {
  sendNotification(
    SIB_IDS.ASKINFO_PREAPPROVED,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_confirmbooking: new URL(`/reservations/reservations?id=${booking._id}`, getHostUrl()),
    },
  )
}

const sendNewBookingManual = (booking, req) => {
  sendNotification(
    SIB_IDS.NEW_BOOKING_MANUAL,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_revenue: parseFloat(booking.alfred_amount).toFixed(2),
      link_confirmbooking: new URL(`/reservations/reservations?id=${booking._id}`, getHostUrl()),
    },
  )
}

const sendAlert = (user, subject, message) => {
  sendNotification(
    SIB_IDS.ALERT,
    user,
    {
      alert_subject: subject,
      alert_message: message,
      user_firstname: user.firstname,
    },
  )
}

const sendAdminsAlert = (subject, message) => {
  User.find({is_admin: true, active: true})
    .then(admins => {
      admins.forEach(admin => sendAlert(admin, subject, message))
    })
    .catch(err => console.error(err))
}


const sendB2BAccount = (user, email, role, company, token, req) => {
  sendNotification(
    SIB_IDS.B2B_ACCOUNT_CREATED,
    user,
    {
      user_firstname: user.firstname,
      role: role,
      company: company,
      user_email: email,
      link_initiatenewpassword: new URL(`/resetPassword?token=${token}`, getHostUrl()),
    },
  )
}

const sendB2BRegistration = (user, email, role, company, req) => {
  sendNotification(
    SIB_IDS.B2B_ACCOUNT_CREATED,
    user,
    {
      user_firstname: user.firstname,
      role: role,
      company: company,
      user_email: email,
      link_initiatenewpassword: new URL(`?register=${user._id}`, getHostUrl()),
    },
  )
}

const sendRegisterInvitation = (admin, email, code, req) => {
  sendNotification(
    SIB_IDS.REGISTER_INVITATION,
    {email: email},
    {
      admin_firstname: admin.firstname,
      register_link: new URL(`/registerServices?id=${code}`, getHostUrl()),
    },
  )
}

const sendAutoQuotation = (prospect_email, prospect_name, prospect_company, quotation_id, machine_description, data_buffer) => {

  const attachment={
    name: 'Préconisation Feurst.pdf',
    content: data_buffer.toString('base64'),
  }

  sendNotification(
    SIB_IDS.FEURST_AUTO_QUOTATION_2_CLIENT,
    [{email: prospect_email}, QUOTATION_CC],
    {
      name: prospect_name,
      quotation_id: quotation_id,
      machine: machine_description,
    },
    attachment,
  )

}

const sendCustomQuotation = (prospect_email, prospect_name, prospect_company, quotation_id, machine_description) => {

  sendNotification(
    SIB_IDS.FEURST_CUSTOM_QUOTATION_2_CLIENT,
    [{email: prospect_email}, QUOTATION_CC],
    {
      name: prospect_name,
      quotation_id: quotation_id,
      machine: machine_description,
    },
  )
}

const sendBillingToAlfred = booking => {
  sendNotification(
    BILLING_2_ALFRED,
    [booking.alfred, booking.user.email],
    {
      firstname: booking.alfred.firstname,
      city: booking.address.city,
      prestation_date: booking.date_prestation,
      alfred_amount: booking.alfred_amount,
    },
  )
}

const sendOrderAlert = (email, reference, company_name, data_link) => {

  sendNotification(
    SIB_IDS.ORDER_ALERT,
    {email: email},
    {
      reference: reference,
      company: company_name,
      data_link: data_link,
    },
  )
}

// Sends alert upon order/quotation status change
const sendDataEvent = (email, reference, company_name, user_firstname, message, data_link, model) => {
  const title=model.filename
  const buffer=generateExcel(model)
  const attachment={
    name: title,
    content: buffer.toString('base64'),
  }

  sendNotification(
    SIB_IDS.DATA_STATUS_NOTIFICATION,
    {email: email},
    {
      reference: reference,
      company: company_name,
      user_firstname: user_firstname,
      message: message,
      data_link: data_link,
    },
    attachment,
  )
}

const sendDataNotification = (user, destinee_role, data, message) => {
  const DESTINEES_PROMISES= {
    CUSTOMER_ADMIN: model => User.find({company: model.company, roles: CUSTOMER_ADMIN}),
    FEURST_SALES: model => Company.findById(model.company).then(comp => User.find({_id: comp.sales_representative})),
    FEURST_ADV: () => User.find({roles: FEURST_ADV}),
  }
  let model=null
  // Reload data to ensure sales_representative & items are loaded
  data.constructor.findById(data._id)
    .populate('items.product')
    .populate({path: 'company', populate: 'sales_representative'})
    .then(result => {
      model=result
      return DESTINEES_PROMISES[destinee_role](data)
    })
    .then(destinees => {
      const companyName = isFeurstUser(user) ? 'Feurst' : data.company.name
      destinees.forEach(destinee => {
        sendDataEvent(destinee.email, data.reference, companyName, user.firstname, message, data.url, model)
      })
    })
    .catch(err => {
      console.error(err)
    })
}

module.exports = {
  sendVerificationMail,
  sendShopDeleted,
  sendBookingConfirmed,
  sendBookingCancelledByAlfred,
  sendBookingCancelledByClient,
  sendBookingExpiredToAlfred,
  sendBookingExpiredToClient,
  sendBookingDetails,
  sendBookingInfosRecap,
  sendNewBooking,
  sendShopOnline,
  sendBookingRefusedToClient,
  sendAskingInfo,
  sendNewMessageToAlfred,
  sendNewMessageToClient,
  sendAskInfoPreapproved,
  sendResetPassword,
  sendNewBookingManual,
  sendVerificationSMS,
  sendLeaveCommentForClient,
  sendLeaveCommentForAlfred,
  sendB2BAccount,
  sendAlert,
  sendB2BRegistration,
  sendBookingRefusedToAlfred,
  sendAdminsAlert,
  sendRegisterInvitation,
  sendAutoQuotation,
  sendCustomQuotation,
  sendBillingToAlfred,
  sendOrderAlert,
  sendDataNotification,
}
