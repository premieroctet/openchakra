const {
  sendBookingRegister2Guest,
  sendEventRegister2Admin,
  sendEventRegister2Guest,
  sendEventRegister2Member,
  sendForgotPassword,
  sendNewBookingToManager,
  sendNewBookingToMember,
  sendNewEvent,
  sendNewMessage,
  sendWelcomeRegister
} = require('../../server/utils/studio/fumoir/mailing');

describe('Mailing tests', () => {

  test('Send Mails', async () => {
    const user1={email: 'sebastien.auvray@free.fr', locker:42}
    const booking={booking_user: user1}
    await sendNewBookingToMember(booking)
    await sendNewBookingToManager(booking, {email: 'sebastien.auvray@free.fr'})
    /**
    await sendNewEvent()
    await sendWelcomeRegister()
    await sendNewMessage()
    await sendEventRegister2Member()
    await sendEventRegister2Guest()
    await sendBookingRegister2Guest()
    await sendEventRegister2Admin()
    await sendForgotPassword()
    */
  })

})
