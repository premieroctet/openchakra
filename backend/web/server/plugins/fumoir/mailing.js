const {datetime_str} = require('../../../utils/dateutils')
const {sendNotification} = require('../../utils/mailing')

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
}

// #1
const sendNewBookingToMember = ({booking}) => {
  return sendNotification({
    notification: SIB_IDS.NEW_BOOKING_2_MEMBER,
    destinee: booking.booking_user,
    params: {
      member_firstname: booking.booking_user.firstname,
      booking_date: datetime_str(booking.start_date),
      duration: booking.duration,
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
    },
  })
}

// #3
const sendNewEvent = ({event, member}) => {
  return sendNotification({
    notification: SIB_IDS.NEW_EVENT_AVAILABLE,
    destinee: member,
    params: {
      event_tile: event.title,
      event_date: datetime_str(event.start_date),
      member_firstname: member.firstname,
    },
  })
}

// #4
const sendWelcomeRegister = ({member, password}) => {
  return sendNotification({
    notification: SIB_IDS.WELCOME_REGISTER,
    destinee: member,
    params: {
      member_firstname: member.firstname,
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
      member_firstname: member.firstname,
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
      member_firstname: member.firstname,
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
      firstname: user.firstname,
      password: password,
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
}
