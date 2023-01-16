const { sendNotification } = require('../../mailing');

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
const sendNewBookingToMember = booking => {
  sendNotification({
    notification: SIB_IDS.NEW_BOOKING_2_MEMBER,
    destinee: booking.booking_user,
    params: {
      member_firstname: booking.booking_user.firstname,
      reservation_date: booking.start_date,
      duration: booking.duration,
    }
  });
};

// #2
const sendNewBookingToManager = (booking, manager) => {
  sendNotification({
    notification: SIB_IDS.NEW_BOOKING_2_MANAGER,
    destinee: manager,
    params: {
      member_fullname: booking.booking_user.full_name,
      reservation_date: booking.start_date,
      duration: booking.duration,
      locker: booking.booking_user.locker,
    }
  })
}

// #3
const sendNewEvent = (event, destinee) => {
    sendNotification({
      notification: SIB_IDS.NEW_EVENT_AVAILABLE,
      destinee: destinee,
      params: {
        event_date: event.start_date,
      }
    })
}

// #4
const sendWelcomeRegister = destinee => {
    sendNotification({
      notification: SIB_IDS.WELCOME_REGISTER,
      destinee: destinee,
      params: {
        login: destinee.email,
      }
    });
};

// #5
const sendNewMessage = (destinee, partner) => {
  sendNotification({
    notification: SIB_IDS.NEW_MESSAGE,
    destinee: destinee,
    params: {
      partner_firstname: partner.firstname,

    }
  });
};


// #6
const sendEventRegister2Member = (event, destinee) => {
  sendNotification({
    notification: SIB_IDS.EVENT_REGISTER_2_MEMBER,
    destinee: destinee,
    params: {
    }
  })
}

// #7
const sendEventRegister2Guest = (event, destinee) => {
  sendNotification({
    notification: SIB_IDS.EVENT_REGISTER_2_GUEST,
    destinee: destinee,
    params: {
    }
  })
}

// #8
const sendBookingRegister2Guest = (event, destinee) => {
  sendNotification({
    notification: SIB_IDS.BOOKING_REGISTER_2_GUEST,
    destinee: destinee,
    params: {
    }
  })
}

// #9
const sendEventRegister2Admin = (event, destinee) => {
  sendNotification({
    notification: SIB_IDS.EVENT_REGISTER_2_ADMIN,
    destinee: destinee,
    params: {
    }
  })
}

const sendForgotPassword = user => {
  sendNotification({
    notification: SIB_IDS.FORGOT_PASSWORD,
    destinee: destinee,
    params: {
    }
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
  sendForgotPassword
}
