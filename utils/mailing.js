const {SIB} = require('./sendInBlue');

const {computeUrl} = require('../config/config');
const {booking_datetime_str} = require('./dateutils');
const {fillSms} = require('./sms');
const {getHost} = require('./infra');

// Templates

/**
 21  VERS ALFRED == N'oubliez pas de mettre à jour vos disponibilités 🗓
 */

// FIX 4, 17, 18
const NEW_BOOKING_MANUAL = 4;
const CONFIRM_EMAIL = 5;
const ASKING_INFO = 6;
const NEW_MESSAGE_ALFRED = 7;
const BOOKING_CANCELLED_BY_CLIENT = 8;
const TRANSFER_TO_ALFRED = 10; // NOK
const LEAVE_COMMENT_FOR_CLIENT = 11;
const LEAVE_COMMENT_FOR_ALFRED = 12;
const NEW_MESSAGE_CLIENT = 13;
const BOOKING_CANCELLED_BY_ALFRED = 14;
const SHOP_DELETED = 15;
const ASKINFO_PREAPPROVED = 16;
const BOOKING_REFUSED_2_ALFRED = 17;
const BOOKING_REFUSED_2_CLIENT = 18; // OK
const BOOKING_CONFIRMED = 19;
const SHOP_ONLINE = 20; // OK
const RESET_PASSWORD = 22;
const NEW_BOOKING = 23;
const BOOKING_INFOS = 24;
const BOOKING_DETAILS = 26;
const BOOKING_EXPIRED_2_CLIENT = 30;
const BOOKING_EXPIRED_2_ALFRED = 31;

const CONFIRM_PHONE = -1;

const SMS_CONTENTS = {
  [NEW_BOOKING_MANUAL]: '{{ params.client_firstname }} a effectué une demande de réservation de votre service {{ params.service_label }}',
  [CONFIRM_PHONE]: '(My Alfred) pour valider votre numéro de téléphone portable, merci de saisir le code d\'activation suivant : {{ params.sms_code }}',
  [ASKING_INFO]: '{{ params.client_firstname }} a effectué une demande d\'information pour votre service {{ params.service_label }}',
  [BOOKING_CANCELLED_BY_CLIENT]: 'Malheureusement, {{ params.client_firstname }} a annulé la réservation de votre service {{ params.service_label }}',
  [TRANSFER_TO_ALFRED]: '(My Alfred), un versement de {{ params.total_revenue }} a été effectué pour votre service {{ params.service_label }}',
  [BOOKING_CANCELLED_BY_ALFRED]: 'Malheureusement, {{ params.alfred_firstname }} a annulé votre réservation du service {{ params.service_label }}',
  [ASKINFO_PREAPPROVED]: '{{ params.alfred_firstname }} a pré approuvé la réservation de votre service {{ params.service_label }}',
  [BOOKING_REFUSED_2_CLIENT]: 'Malheureusement, {{ params.alfred_firstname }} a refusé votre réservation du service {{ params.service_label }}',
  [BOOKING_CONFIRMED]: '{{ params.alfred_firstname }} a confirmé votre réservation de son service {{ params.service_label }}',
  [NEW_BOOKING]: '{{ params.client_firstname }} a réservé votre service {{ params.service_label }}',
  [BOOKING_EXPIRED_2_CLIENT]: 'Votre réservation du service {{ params.service_label }} par {{ params.alfred_firstname }} est expirée',
  [BOOKING_EXPIRED_2_ALFRED]: 'La réservation de votre service {{ params.service_label }} par {{ params.client_firstname }} est expirée',
};

const sendNotification = (notif_index, destinee, params) => {

  return true;

  var resultMail = true, resultSms = true;
  // Send mail
  if (notif_index != CONFIRM_PHONE) {
    resultMail = SIB.sendMail(notif_index, destinee.email, params);
  }

  // Send SMS
  if (destinee.phone && SMS_CONTENTS[notif_index.toString()]) {
    console.log('Sending SMS');
    const smsContents = fillSms(SMS_CONTENTS[notif_index.toString()], params);
    console.log('SMS contents is ' + smsContents);
    if (!smsContents) {
      console.error(`Error creating SMS ${notif_index} to ${destinee.phone} with params ${JSON.stringify(params)}`);
      result = false;
    } else {
      console.log('Calling SIB.sendSms');
      resultSms = SIB.sendSms(destinee.phone, smsContents);
    }
  }
  return resultMail && resultSms;
};

const sendVerificationMail = (user, req) => {
  sendNotification(
    CONFIRM_EMAIL,
    user,
    {
      link_confirmemail: new URL('/validateAccount?user=' + user._id, computeUrl(req)),
      user_firstname: user.firstname,
    },
  );
  return true;
};

const sendVerificationSMS = user => {
  const result = sendNotification(
    CONFIRM_PHONE,
    user,
    {
      sms_code: user.sms_code,
    },
  );
  return true;
};

const sendShopDeleted = (user, req) => {
  sendNotification(
    SHOP_DELETED,
    user,
    {
      user_firstname: user.firstname,
    },
  );
};

const sendBookingConfirmed = booking => {
  sendNotification(
    BOOKING_CONFIRMED,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_cost: parseFloat(booking.amount).toFixed(2),
    },
  );
};

const sendBookingCancelledByAlfred = (booking, req) => {
  sendNotification(
    BOOKING_CANCELLED_BY_ALFRED,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      link_findnewalfred: new URL('/search', computeUrl(req)),

    },
  );
};

const sendBookingCancelledByClient = booking => {
  sendNotification(
    BOOKING_CANCELLED_BY_CLIENT,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
    },
  );
};

const sendLeaveCommentForClient = booking => {
  sendNotification(
    LEAVE_COMMENT_FOR_CLIENT, // 11
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_reviewsclient: new URL(`/evaluateClient?booking=${booking._id}&id=${booking.serviceUserId}&client=${booking.user._id}`, getHost()),
    },
  );
};

const sendLeaveCommentForAlfred = booking => {
  sendNotification(
    LEAVE_COMMENT_FOR_ALFRED, // 12
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_reviewsalfred: new URL(`/evaluate?booking=${booking._id}&id=${booking.serviceUserId}`, getHost()),
    },
  );
};

const sendResetPassword = (user, token, req) => {
  sendNotification(
    RESET_PASSWORD,
    user,
    {
      user_firstname: user.firstname,
      link_initiatenewpassword: new URL('/resetPassword?token=' + token, computeUrl(req)),
    },
  );
};
const sendBookingExpiredToAlfred = booking => {
  sendNotification(
    BOOKING_EXPIRED_2_ALFRED,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
    },
  );
};

const sendBookingExpiredToClient = booking => {
  sendNotification(
    BOOKING_EXPIRED_2_CLIENT,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      link_booknewalfred: new URL('/search', getHost()),
    },
  );
};

const sendBookingDetails = booking => {
  sendNotification(
    BOOKING_DETAILS,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_cost: parseFloat(booking.amount).toFixed(2),
    },
  );
};

const sendBookingInfos = booking => {
  sendNotification(
    BOOKING_INFOS,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_cost: parseFloat(booking.amount).toFixed(2),
    },
  );
};

const sendNewBooking = (booking, req) => {
  sendNotification(
    NEW_BOOKING,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_revenue: parseFloat(booking.amount - booking.fees).toFixed(2),
      link_showreservation: new URL('/reservations/detailsReservation?id=' + booking._id, computeUrl(req)),

    },
  );
};

const sendShopOnline = (alfred, req) => {
  sendNotification(
    SHOP_ONLINE,
    alfred,
    {
      alfred_firstname: alfred.firstname,
      link_manageshop: new URL('/shop?id_alfred=' + alfred._id, computeUrl(req)),
    },
  );
};

const sendBookingRefusedToClient = (booking, req) => {
  sendNotification(
    BOOKING_REFUSED_2_CLIENT,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      link_booknewalfred: new URL('/search', computeUrl(req)),
    },
  );
};

const sendBookingRefusedToAlfred = (booking, req) => {
  sendNotification(
    BOOKING_REFUSED_2_ALFRED,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
    },
  );
};

const sendAskingInfo = (booking, req) => {
  sendNotification(
    ASKING_INFO,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_revenue: parseFloat(booking.amount - booking.fees).toFixed(2),
      link_requestinformation: new URL('/reservations/detailsReservation?id=' + booking._id, computeUrl(req)),
    },
  );
};

const sendNewMessageToAlfred = (booking, chatroom_id, req) => {
  sendNotification(
    NEW_MESSAGE_ALFRED,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_showclientmessage: new URL(`/reservations/messagesDetails?id=${chatroom_id}&booking=${booking._id}`, computeUrl(req)),
    },
  );
};

const sendNewMessageToClient = (booking, chatroom_id, req) => {
  sendNotification(
    NEW_MESSAGE_CLIENT,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_showalfredmessage: new URL(`/reservations/messagesDetails?id=${chatroom_id}&booking=${booking._id}`, computeUrl(req)),
    },
  );
};

const sendAskInfoPreapproved = (booking, req) => {
  sendNotification(
    ASKINFO_PREAPPROVED,
    booking.user,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      link_confirmbooking: new URL('/reservations/detailsReservation?id=' + booking._id, computeUrl(req)),
    },
  );
};

const sendNewBookingManual = (booking, req) => {
  sendNotification(
    NEW_BOOKING_MANUAL,
    booking.alfred,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: booking_datetime_str(booking),
      total_revenue: parseFloat(booking.amount - booking.fees).toFixed(2),
      link_confirmbooking: new URL('/reservations/detailsReservation?id=' + booking._id, computeUrl(req)),
    },
  );
};

module.exports = {
  sendVerificationMail,
  sendShopDeleted,
  sendBookingConfirmed,
  sendBookingCancelledByAlfred,
  sendBookingCancelledByClient,
  sendBookingExpiredToAlfred,
  sendBookingExpiredToClient,
  sendBookingDetails,
  sendBookingInfos,
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
};
