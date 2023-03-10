const { sendNotification, setSmsContents } = require('../../utils/mailing')
const {datetime_str} = require('../../../utils/dateutils')

const SIB_IDS={
  NEW_BOOKING_2_MEMBER: 1,
  NEW_BOOKING_2_MANAGER: 2,
  NEW_EVENT_AVAILABLE: 3,
  WELCOME_REGISTER: 4,
  NEW_MESSAGE: 5,
  EVENT_REGISTER_2_MEMBER: 6,
  EVENT_REGISTER_2_GUEST: 7,
  BOOKING_REGISTER_2_GUEST: 8,
  EVENT_REGISTER_2_ADMIN: 9,
  FORGOT_PASSWORD: 10,
  EVENT_UNREGISTER_2_MEMBER: 12,
  EVENT_UNREGISTER_2_GUEST: 13,
  EVENT_UNREGISTER_2_ADMIN: 14,
}

const SMS_CONTENTS={
  [SIB_IDS.NEW_BOOKING_2_MEMBER]: 'Bonjour, votre réservation au Fumoir George a été prise en compte',
  [SIB_IDS.NEW_EVENT_AVAILABLE]: 'Bonjour, un nouvel évènement est disponible sur votre application Fumoir George',
  [SIB_IDS.EVENT_REGISTER_2_MEMBER]: `Bonjour, votre participation à l'évènement du {{params.event_date}} a été prise en compte`,
  [SIB_IDS.FORGOT_PASSWORD]: 'Bonjour, votre mot de passe provisoire pour vous connecter au Fumoir George est le suivant : {{params.password}}',
  [SIB_IDS.WELCOME_REGISTER]: `Bonjour, vous êtes invité à rejoindre l'application le Fumoir George. Vos identifiants sont les suivants : login : {{params.login}}  mot de passe : {{params.password}}`
}

setSmsContents(SMS_CONTENTS)

// #1
const sendNewBookingToMember = ({booking}) => {
  return sendNotification({
    notification: SIB_IDS.NEW_BOOKING_2_MEMBER,
    destinee: booking.booking_user,
    params: {
      firstname: booking.booking_user.firstname,
      booking_date: datetime_str(booking.start_date),
      duration: booking.duration,
      booking_number: booking.booking_number,
    },
  })
}

// #2
const sendNewBookingToManager = ({booking, manager}) => {
  return sendNotification({
    notification: SIB_IDS.NEW_BOOKING_2_MANAGER,
    destinee: manager,
    params: {
      member_fullname: booking.booking_user.full_name,
      booking_date: datetime_str(booking.start_date),
      duration: booking.duration,
      locker: booking.booking_user.locker,
      booking_number: booking.booking_number,
    },
  })
}

// #3
const sendNewEvent = ({event, member}) => {
  return sendNotification({
    notification: SIB_IDS.NEW_EVENT_AVAILABLE,
    destinee: member,
    params: {
      event_title: event.title,
      event_date: datetime_str(event.start_date),
      event_price: event.price,
      event_guests: event.max_guests_per_member,
      firstname: member.firstname,
    },
  })
}

// #4
const sendWelcomeRegister = ({member, password}) => {
  return sendNotification({
    notification: SIB_IDS.WELCOME_REGISTER,
    destinee: member,
    params: {
      firstname: member.firstname,
      login: member.email,
      password: password,
    },
  })
}

// #5
const sendNewMessage = ({member, partner}) => {
  return sendNotification({
    notification: SIB_IDS.NEW_MESSAGE,
    destinee: member,
    params: {
      firstname: member.firstname,
      partner_firstname: partner.firstname,
    },
  })
}


// #6
const sendEventRegister2Member = ({event, member}) => {
  return sendNotification({
    notification: SIB_IDS.EVENT_REGISTER_2_MEMBER,
    destinee: member,
    params: {
      firstname: member.firstname,
      event_title: event.title,
      event_date: datetime_str(event.start_date),
      duration: event.duration,
    },
  })
}

// #7
const sendEventRegister2Guest = ({event, member, guest}) => {
  return sendNotification({
    notification: SIB_IDS.EVENT_REGISTER_2_GUEST,
    destinee: guest,
    params: {
      event_title: event.title,
      member_fullname: member.full_name,
      event_date: datetime_str(event.start_date),
    },
  })
}

// #8
const sendBookingRegister2Guest = ({booking, guest}) => {
  return sendNotification({
    notification: SIB_IDS.BOOKING_REGISTER_2_GUEST,
    destinee: guest,
    params: {
      member_fullname: booking.booking_user.full_name,
      booking_date: datetime_str(booking.start_date),
      duration: booking.duration,
      booking_number: booking.booking_number,
    },
  })
}

// #9
const sendEventRegister2Admin = ({event, member, admin}) => {
  return sendNotification({
    notification: SIB_IDS.EVENT_REGISTER_2_ADMIN,
    destinee: admin,
    params: {
      event_title: event.title,
      member_fullname: member.full_name,
      event_date: datetime_str(event.start_date),
    },
  })
}

// #10
const sendForgotPassword = ({user, password}) => {
  return sendNotification({
    notification: SIB_IDS.FORGOT_PASSWORD,
    destinee: user,
    params: {
      login: user.email,
      firstname: user.firstname,
      password: password,
    },
  })
}

// #12
const sendEventUnregister2Member = ({event, member}) => {
  return sendNotification({
    notification: SIB_IDS.EVENT_UNREGISTER_2_MEMBER,
    destinee: member,
    params: {
      firstname: member.firstname,
      event_date: datetime_str(event.start_date),
      duration: event.duration,
    },
  })
}

// #13
const sendEventUnregister2Guest = ({event, member, guest}) => {
  return sendNotification({
    notification: SIB_IDS.EVENT_UNREGISTER_2_GUEST,
    destinee: guest,
    params: {
      member_fullname: member.full_name,
      event_date: datetime_str(event.start_date),
    },
  })
}

// #14
const sendEventUnregister2Admin = ({event, member, admin}) => {
  return sendNotification({
    notification: SIB_IDS.EVENT_UNREGISTER_2_ADMIN,
    destinee: admin,
    params: {
      event_title: event.title,
      member_fullname: member.full_name,
      event_date: datetime_str(event.start_date),
    },
  })
}

module.exports = {
  sendNewBookingToMember,
  sendNewBookingToManager,
  sendNewEvent,
  sendWelcomeRegister,
  sendNewMessage,
  sendEventRegister2Member,
  sendEventRegister2Guest,
  sendBookingRegister2Guest,
  sendEventRegister2Admin,
  sendForgotPassword,
  sendEventUnregister2Member,
  sendEventUnregister2Guest,
  sendEventUnregister2Admin,
}
