const { fillSms } = require('../../utils/sms')
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
  sendWelcomeRegister,
} = require('../../server/plugins/fumoir/mailing')

describe('Mailing tests', () => {

  const roleEmail = role => {
    return `sebastien.auvray+${role}@my-alfred.io`
  }

  const member = {firstname: 'Sébastien', lastname: 'Auvray', full_name: 'Sébastien Auvray',
    'email': roleEmail('member'), locker: 69, phone: '0675774324'}
  const partner = {...member, firstname: 'Partner', email: roleEmail('partner')}
  const manager = {...member, email: roleEmail('manager')}
  const admin = {...member, email: roleEmail('admin')}
  const guest = {email: roleEmail('guest')}
  const booking = {booking_user: member, start_date: new Date(), duration: 3, booking_number: 185}
  const ev = {title: 'Super masterclass du cigare à moustache', start_date: new Date(),
  duration: 4, price: 23, max_guests_per_member: 3}
  const new_password='dfsdfklhhlk#12'

  test('sendNewBookingToMember', async() => {
    return expect(sendNewBookingToMember({booking})).resolves.not.toThrowError()
  })

  test('sendNewBookingToManager', async() => {
    return expect(sendNewBookingToManager({booking, manager})).resolves.not.toThrowError()
  })

  test('sendNewEvent', async() => {
    return expect(sendNewEvent({event: ev, member})).resolves.not.toThrowError()
  })

  test('sendWelcomeRegister', async() => {
    return expect(sendWelcomeRegister({member, password: 'Default password'})).resolves.not.toThrowError()
  })

  test('sendNewMessage', async() => {
    return expect(sendNewMessage({member, partner})).resolves.not.toThrowError()
  })

  test('sendEventRegister2Member', async() => {
    return expect(sendEventRegister2Member({event: ev, member})).resolves.not.toThrowError()
  })

  test('sendEventRegister2Guest', async() => {
    return expect(sendEventRegister2Guest({event: ev, member, guest})).resolves.not.toThrowError()
  })

  test('sendBookingRegister2Guest', async() => {
    return expect(sendBookingRegister2Guest({booking, guest})).resolves.not.toThrowError()
  })

  test('sendEventRegister2Admin', async() => {
    return expect(sendEventRegister2Admin({event: ev, member: member, admin})).resolves.not.toThrowError()
  })

  test('sendForgotPassword', async() => {
    return expect(sendForgotPassword({user: member, password: new_password})).resolves.not.toThrowError()
  })

  test('Should fill an SMS', async() => {
    const msg="Nouvel événement {{params.event_title}} pour {{params.firstname}}"
    const values={event_title: 'Evènement super chouette', firstname: 'Sébastien'}
    const res=fillSms(msg, values)
    expect(res).toEqual('Nouvel événement Evènement super chouette pour Sébastien')
  })

  test('Should fill an SMS with missing values', async() => {
    const msg="Nouvel événement {{params.event_title}} pour {{params.firstname}}"
    const values={event_title: 'Evènement super chouette'}
    const res=fillSms(msg, values)
    expect(res).toEqual('Nouvel événement Evènement super chouette pour <firstname>')
  })

})
