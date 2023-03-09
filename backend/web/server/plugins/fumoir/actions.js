const { BadRequestError, NotFoundError } = require('../../utils/errors')
const { sendForgotPassword } = require('./mailing')
const bcryptjs = require('bcryptjs')
const { generatePassword } = require('../../../utils/passwords')
const User = require('../../models/User')
const {
  getEventGuestsCount,
  getEventGuests,
  inviteGuest,
  registerToEvent,
  unregisterFromEvent,
  removeOrderItem,
  setOrderItem,
} = require('./functions')
const lodash=require('lodash')
const Payment = require('../../models/Payment')
const Event = require('../../models/Event')
const Booking = require('../../models/Booking')
const UserSessionData = require('../../models/UserSessionData')
const {addAction, setAllowActionFn} = require('../../utils/studio/actions')
const {
  FUMOIR_MANAGER,
  FUMOIR_MEMBER,
  PAYMENT_SUCCESS,
} = require('./consts')
const {idEqual}=require('../../utils/database')

const inviteGuestAction=({parent, email, phone}, user) => {
  return inviteGuest({eventOrBooking: parent, email, phone}, user)
}


const registerToEventAction=({value}, user) => {
  return registerToEvent({event: value, user})
}

const unregisterFromEventAction=({value}, user) => {
  return unregisterFromEvent({event: value, user})
}

const removeOrderItemAction=({context, parent}) => {
  return removeOrderItem({order: context, item: parent})
}

const setOrderItemAction=({context, parent, quantity}) => {
  return setOrderItem({order: context, product: parent, quantity})
}

const forgotPasswordAction=({context, parent, email}) => {
  console.log(`Email:${email}`)
  return User.findOne({email})
   .then(user => {
     if (!user) {
       throw new BadRequestError(`Aucun compte n'est associé à cet email`)
     }
     const password=generatePassword()
     user.password=bcryptjs.hashSync(password, 10)
     return user.save()
       .then(user => sendForgotPassword({user, password}))
       .then(user => `Un email a été envoyé à l'adresse ${email}`)
   })
}

addAction('inviteGuest', inviteGuestAction)
addAction('registerToEvent', registerToEventAction)
addAction('unregisterFromEvent', unregisterFromEventAction)
addAction('removeOrderItem', removeOrderItemAction)
addAction('setOrderItem', setOrderItemAction)
addAction('forgotPassword', forgotPasswordAction)

const isActionAllowed = ({action, dataId, user}) => {
  if (action=='payEvent') {
    return Promise.all([
      Event.findOne({_id: dataId, 'invitations.member': user}),
      Payment.find({event: dataId, event_member: user, status: PAYMENT_SUCCESS}),
    ])
      .then(([ev, payments]) => {
        if (!ev) { return false }
        return getEventGuestsCount(user, {}, {_id: dataId})
          .then(guests_count => {
            const already_paid=lodash(payments).map('amount').sum()
            const reminingToPay=ev.price*guests_count-already_paid
            return reminingToPay>0
          })
      })
  }
  if (action=='payOrder') {
    if (user.role!=FUMOIR_MEMBER) {
      return Promise.resolve(false)
    }
    return Booking.findById(dataId)
      .populate('items')
      .populate('payments')
      .then(o => o?.paid==false)
  }
  if (action=='cashOrder') {
    if (user.role!=FUMOIR_MANAGER) {
      return Promise.resolve(false)
    }
    return Booking.findById(dataId)
      .populate('items')
      .populate('payments')
      .then(o => o.remaining_total>0)
  }
  if (action=='registerToEvent') {
    return Event.findById(dataId)
      .populate('invitations')
      .then(event=> {
        if(!event) return false
        if (event.people_count>=event.max_people) { return false}
        const selfMember=event.invitations.find(m => idEqual(m.member._id, user._id))
        if (selfMember) { return false}
        return true
      })
  }
  if (action=='inviteGuest') {
    return Promise.all([Booking.findById(dataId).populate('guests'), Event.findById(dataId)])
      .then(([booking, event]) => {
        if (!booking && !event) {
          throw new NotFoundError(`No booking or event with id ${dataId}`)
        }
        if (event) {
          if (event.people_count>=event.max_people) { return false}
          return getEventGuests(user, null, event)
            .then(guests => guests.length==0)
        }
        if (booking) {
          if (booking.guests.length>=booking.guests_count) { return false}
          return true
        }
      })
  }

  if (action=='unregisterFromEvent') {
    return Event.findById(dataId)
      .populate({path: 'invitations', populate: 'member'})
      .then(ev=> {
        console.log(JSON.stringify(ev))
        return ev.invitations?.some(i => idEqual(i.member._id, user._id))
      })
  }
  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
