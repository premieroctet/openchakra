const { CREATED_AT_ATTRIBUTE, generate_id } = require('../../../utils/consts')
const {
  sendBookingRegister2Guest,
  sendEventRegister2Admin,
  sendEventRegister2Guest,
  sendEventUnregister2Admin,
  sendEventUnregister2Guest,
  sendEventUnregister2Member,
  sendForgotPassword,
  sendNewBookingToManager,
  sendNewBookingToMember,
  sendWelcomeRegister,
} = require('./mailing')
const {
  declareComputedField,
  declareEnumField,
  declareVirtualField,
  getModel,
  idEqual,
  setFilterDataUser,
  setPostCreateData,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')
const {
  CASH_MODE,
  CASH_CARD,
  EVENT_STATUS,
  EVENT_VAT_RATE,
  FUMOIR_ADMIN,
  FUMOIR_MANAGER,
  FUMOIR_MEMBER,
  PAYMENT_STATUS,
  PAYMENT_SUCCESS,
  PLACES,
  ROLES,
} = require('./consts')
const {
  generatePassword,
  validatePassword
} = require('../../../utils/passwords')
const Review = require('../../models/Review')
const moment = require('moment')
const bcryptjs = require('bcryptjs')
const lodash=require('lodash')
const {initiatePayment} = require('../payment/vivaWallet')
const Payment = require('../../models/Payment')
const {addAction} = require('../../utils/studio/actions.js')
const UserSessionData = require('../../models/UserSessionData')
const User = require('../../models/User')
const Booking = require('../../models/Booking')
const Message = require('../../models/Message')
const Guest = require('../../models/Guest')
const {BadRequestError, NotFoundError} = require('../../utils/errors')
const OrderItem = require('../../models/OrderItem')
const Product = require('../../models/Product')
const Event = require('../../models/Event')

const inviteGuest = ({eventOrBooking, email, phone}, user) => {
  return getModel(eventOrBooking, ['booking', 'event'])
    .then(modelName => {
      if (modelName=='booking') {
        return Booking.findById(eventOrBooking)
          .populate('guests')
          .populate('booking_user')
          .then(booking => {
            if (booking.guests.find(g => g.email==email)) {
              throw new BadRequestError(`${email} est déjà invité pour cet événement`)
            }
            if (booking.guests.length>=booking.guests_count) {
              throw new BadRequestError(`Vous avez déjà envoyé ${booking.guests.length} invitations`)
            }
            return Guest.create({email, phone})
              .then(guest => {
                booking.guests.push(guest._id)
                return booking.save()
                  .then(b => Promise.allSettled([sendBookingRegister2Guest({booking, guest})]))
                  .then(() => booking)
              })
          })
        return Guest.create({email, phone})
          .then(guest => Booking.findByIdAndUpdate(eventOrBooking, {$push: {guests: guest}}))
      }
      if (modelName=='event') {
        return Event.findById(eventOrBooking)
          .populate({path: 'members', populate: 'member guest'})
          .then(ev => {
            return Promise.all([
              Promise.resolve(ev),
              getEventGuests(user, {}, ev),
            ])
          })
          .then(([ev, guests])=> {
            // Must not invite the same email twice
            if (guests.includes(email)) {
              throw new BadRequestError(`${email} est déjà invité pour cet événement`)
            }
            if (ev.max_guests_per_member < guests.length+1) {
              throw new BadRequestError(`Le nombre d'invités maximum est ${ev.max_guests_per_member} pour cet événement`)
            }
            if (ev.people_count+1>ev.max_people) {
              throw new BadRequestError(`Cet événement est complet`)
            }
            return Guest.create({email, phone})
              .then(g => {
                ev.members.find(m => idEqual(m.member._id, user._id)).guest=g._id
                return Promise.all([ev.save(), g])
              })
              .then(([ev, guest]) => Promise.allSettled([sendEventRegister2Guest({event: ev, member: user, guest: guest})]))
          })
      }
    })
}

const setOrderItem = ({order, product, quantity}) => {
  return Booking.findById(order)
    .populate('items')
    .then(order => {
      if (!order) {
        throw new NotFoundError(`Commande ${order} introuvable`)
      }
      const item = order.items.find(i => i.product.toString() == product)
      if (item) {
        item.quantity = parseInt(quantity)
        return item.save()
      }
      return Product.findById(product)
        .then(product =>
          OrderItem.create({
            product: product,
            price: product.price,
            vat_rate: product.vat_rate,
            quantity,
          }),
        )
        .then(item =>
          Booking.findByIdAndUpdate(
            order,
            {$push: {items: item}},
            {new: true},
          ),
        )
    })
}

const removeOrderItem = ({order, item}) => {
  return Booking.findByIdAndUpdate(order, {$pull: {items: item}})
    .then(() => {
      return OrderItem.findByIdAndRemove(item)
    })
}

const payEvent=({context, redirect, color}, user) => {
  const eventId=context
  return getModel(eventId, 'event')
    .then(model => {
      return Promise.all([
        Event.findOne({_id: eventId, 'members.member': user}),
        Payment.find({event: eventId, event_member: user, status: PAYMENT_SUCCESS}),
      ])
    })
    .then(([ev, payments]) => {
      if (!ev) { return false }
      return getEventGuestsCount(user, null, ev)
        .then(guests_count => {
          console.log(`guests count:${guests_count}`)
          const remainingToPay=ev.price*guests_count-lodash(payments).map('amount').sum()
          console.log(`Remaining to pay:${remainingToPay}`)
          if (remainingToPay==0) {
            throw new BadRequestError(`Il n'y a rien à payer sur cet événement'`)
          }
          const vat=EVENT_VAT_RATE*remainingToPay
          const params={
            event: eventId, event_member: user, member: user, amount: remainingToPay,
            vat_amount: vat, mode: CASH_CARD,
          }
          return Payment.create(params)
        })
        .then(payment =>
          initiatePayment({amount: payment.amount, email: user.email, color})
            .then(({orderCode, redirect}) => {
              return Payment.findByIdAndUpdate(payment._id, {orderCode})
                .then(p => ({redirect}))
              })
          )
        })
}

const payOrder=({context, redirect, color}, user) => {
  const bookingId=context
  return getModel(bookingId, 'booking')
    .then(model => {
      return Booking.findById(bookingId)
        .populate('items')
        .populate('payments')
        .then(booking => {
          if (!booking) { throw new NotFoundError(`Réservation ${bookingId} introuvable`) }
          if (booking.remaining_total==0) {
            throw new BadRequestError(`Réservation ${bookingId} déjà payée`)
          }
          console.log(`Remaining total: ${booking.remaining_total}`)
          const params={
            booking: booking._id, member: user._id,
            amount: booking.remaining_total, vat_amount: booking.remaining_vat_amount,
            mode: CASH_CARD,
          }
          return Payment.create(params)
        })
        .then(payment => {
          return initiatePayment({amount: payment.amount, email: user.email, color})
            .then(({orderCode, redirect}) => {
              return Payment.findByIdAndUpdate(payment._id, {orderCode})
                .then(p => ({redirect}))
            })
        })
    })
}

const cashOrder=({context, guest, amount, mode, redirect}, user) => {
  const bookingId=context
  return getModel(bookingId, 'booking')
    .then(model => {
      return Booking.findById(bookingId)
        .populate('items')
        .populate('payments')
        .then(booking => {
          if (!booking) { throw new NotFoundError(`Réservation ${bookingId} not found`) }
          if (amount>booking.remaining_total) {
            throw new BadRequestError(`Il ne reste que ${booking.remaining_total}€ à payer`)
          }
          const customer=guest ? {guest}: {member: user}
          console.log(`total_remaining:${booking.total_remaining},remaining_vat:${booking.remaining_vat_amount}`)
          const remaining=booking.remaining_total
          const remaining_vat=booking.remaining_vat_amount
          const payment_tva=amount*remaining_vat/remaining
          // No vivwallet redirect, payment is considered successful
          return Payment.create({booking, ...customer, amount, vat_amount: payment_tva, mode, status: PAYMENT_SUCCESS})
        })
        .then(() => ({redirect}))
    })
}

const getCigarReview=({value}, user) => {
  return Review.findOneAndUpdate(
    {cigar: value, user:user},
    {},
    {upsert: true, new: true}
  )
  .then(review => {
    return review
  })
}

const changePassword=({password, password2}, user) => {
  return validatePassword({password, password2})
    .then(()=> {
      const hashed=bcryptjs.hashSync(password, 10)
      return User.findByIdAndUpdate(user._id, {password: hashed})
    })
}

addAction('payEvent', payEvent)
addAction('payOrder', payOrder)
addAction('cashOrder', cashOrder)
addAction('getCigarReview', getCigarReview)
addAction('changePassword', changePassword)

const registerToEvent = ({event, user}) => {
  return Event.findById(event)
    .populate('members')
    .then(event => {
      if (event.members.find(m => idEqual(m.member._id, user._id))) {
        throw new BadRequestError(`Vous êtes déjà inscrit à cet événement`)
      }
      if (event.people_count+1>event.max_people) {
        throw new BadRequestError(`Cet événement est complet`)
      }
      event.members.push({member: user._id})
      return event.save()
    })
    .then(event => Promise.all([Promise.resolve(event), User.find({role: FUMOIR_ADMIN})]))
    .then(([event, admins]) => Promise.allSettled(admins.map(admin => sendEventRegister2Admin({event, member: user, admin}))))
    .then(() => event)
}

// TODO: do refund if required
const unregisterFromEvent = ({event, user}) => {
  return Event.findById(event)
    .populate({path: 'members', populate: 'member guest'})
    .then(event => {
      if (!event) {
        throw new NotFoundError(`Evénément ${event} inconnu`)
      }
      const member=event.members.find(m => idEqual(m.member._id, user._id))
      sendEventUnregister2Member({event, member: member.member})
      if (member.guest) {
        sendEventUnregister2Guest({event, member: member.member, guest: member.guest})
      }
      User.find({role: FUMOIR_ADMIN})
        .then(admins => Promise.allSettled(admins.map(admin => sendEventUnregister2Admin({event, member: user, admin}))))
      event.members=event.members.filter(m => !idEqual(m.member._id, user._id))
      return event.save()
    })
}

const preCreate = ({model, params}) => {
  if (model=='user') {
    return User.findOne({email: params.email})
      .then(user => {
        if (user) {
          throw new BadRequestError(`Le compte ${params.email} existe déjà`)
        }
        if (moment(params.subscription_start).isAfter(params.subscription_end)) {
          throw new BadRequestError(`Les dates de début et fin d'abonnement sont incohérentes`)
        }
        const password=generatePassword()
        params.password=bcryptjs.hashSync(password, 10)
        params.nonHashedPassword=password
        return Promise.resolve({model, params})
      })
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)

const postCreate = ({model, params, data}) => {
  if (model=='user') {
    console.log(`Sending mail to ${params.email} with temp password ${params.nonHashedPassword}`)
    sendWelcomeRegister({member:data, password:params.nonHashedPassword})
  }
  if (model=='booking') {
    console.log(`Sending mail to ${data.booking_user.email} and admins for booking ${data._id}`)
    sendNewBookingToMember({booking:data})
    User.find({role: FUMOIR_MANAGER})
      .then(managers => Promise.allSettled(managers.map(manager => sendNewBookingToManager({booking:data, manager}))))
  }

  return Promise.resolve(data)
}

setPostCreateData(postCreate)

const filterDataUser = ({model, data, id, user}) => {

  // List mode
  if (!id) {
    if (model == 'category') {
      const allChildren=lodash.flattenDeep(data.map(d => (d.children||[]).map(c => c._id)))
      return data.filter(d => !allChildren.includes(d._id))
    }
    // for sub categories, return top level first
    if (/.*Category/.test(model)) {
      return lodash.sortBy(data, d => (d.parent? 1: 0))
    }
    if (model=='user') {
      if ([FUMOIR_MEMBER].includes(user.role)) {
        return data.filter(d => d.role==FUMOIR_MEMBER)
      }
    }
    if (model=='message') {
      if ([FUMOIR_MEMBER].includes(user.role)) {
        data=data.filter(d => [d.sender._id, d.receiver._id].some(id => idEqual(user._id)))
        return lodash.orderBy(data, [CREATED_AT_ATTRIBUTE], ['asc'])
      }
    }
    if (model=='booking') {
      if ([FUMOIR_MEMBER].includes(user.role)) {
        data=data.filter(d => idEqual(d.booking_user?._id, user._id))
      }
      return lodash.orderBy(data, ['start_date'], ['asc'])
    }
    if (model=='event') {
      return lodash.orderBy(data, ['start_date'], ['asc'])
    }
  }

  return data
}

setFilterDataUser(filterDataUser)

const preprocessGet = ({model, fields, id, user}) => {
  if (/.*Category/i.test(model)) {
    fields = lodash([...fields, 'parent']).uniq().value()
  }
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }

  if (model=='user') {
    fields.push('role')
  }

  if (model=='conversation') {
    const getPartner= (m, user) => {
      return idEqual(m.sender._id, user._id) ? m.receiver : m.sender
    }

    return Message.find({$or: [{sender: user._id}, {receiver: user._id}]})
      .populate({path: 'sender', populate: {path: 'company'}})
      .populate({path: 'receiver', populate: {path: 'company'}})
      .sort({CREATED_AT_ATTRIBUTE: 1})
      .then(messages => {
        if (id) {
          messages=messages.filter(m => idEqual(getPartner(m, user)._id, id))
          // If no messages for one parner, forge it
          if (lodash.isEmpty(messages)) {
            return User.findById(id).populate('company')
              .then(partner => {
                const data=[{_id: partner._id, partner, messages: []}]
                return {model, fields, id, data}
              })
          }
        }
        const partnerMessages=lodash.groupBy(messages, m => getPartner(m, user)._id)
        const convs=lodash(partnerMessages)
          .values()
          .map(msgs => { const partner=getPartner(msgs[0], user); return ({_id: partner._id, partner, messages: msgs}) })
          .sortBy(CREATED_AT_ATTRIBUTE, 'asc')
        return {model, fields, id, data: convs}
      })
  }
  return Promise.resolve({model, fields, id})
}

setPreprocessGet(preprocessGet)

const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareEnumField({model: m, field: 'role', enumValues: ROLES})
  declareVirtualField({model: m, field: 'full_name', instance: 'String', requires: 'firstname,lastname'})
  declareVirtualField({model: m, field: 'is_active', instance: 'Boolean', requires: 'subscription_start,subscription_end'})
  declareVirtualField({model: m, field: 'is_active_str', instance: 'String', requires: 'subscription_start,subscription_end'})
  declareVirtualField({model: m, field: 'posts', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'post'}}})

  declareVirtualField({model: m, field: 'bookings', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'booking'}}})

  declareVirtualField({model: m, field: 'events', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'event'}}})

  declareVirtualField({model: m, field: 'reviews', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'review'}}})

})


declareEnumField({model: 'booking', field: 'place', enumValues: PLACES})
declareVirtualField({model: 'booking', field: 'end_date', instance: 'Date', requires: ''})
declareVirtualField({model: 'booking', field: 'paid', instance: 'Boolean', requires: 'items,payments'})
declareVirtualField({model: 'booking', field: 'paid_str', instance: 'String', requires: 'items,payments'})
declareVirtualField({model: 'booking', field: 'status', instance: 'String', requires: 'start_date,end_date', enumValues: EVENT_STATUS})
declareVirtualField({model: 'booking', field: 'people_count', instance: 'Number', requires: 'guests_count'})
declareVirtualField({model: 'booking', field: 'total_price', instance: 'Number', requires: 'items'})
declareVirtualField({model: 'booking', field: 'remaining_total', instance: 'Number', requires: 'items,payments'})
declareVirtualField({model: 'booking', field: 'payments', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'payment'}}})
declareVirtualField({model: 'booking', field: 'total_vat_amount', instance: 'Number', requires: 'items,payments'})
declareVirtualField({model: 'booking', field: 'total_net_price', instance: 'Number', requires: 'items'})
declareVirtualField({model: 'booking', field: 'remaining_vat_amount', instance: 'Number', requires: 'items,payments'})


declareVirtualField({model: 'payment', field: 'net_amount', instance: 'Number', requires: 'amount,vat_amount'})
declareEnumField({model: 'payment', field: 'status', enumValues: PAYMENT_STATUS})
declareEnumField({model: 'payment', field: 'mode', enumValues: CASH_MODE})
declareVirtualField({model: 'payment', field: 'customer_str', instance: 'String', requires: 'member,guest,booking'})


const PRODUCT_MODELS=['product', 'cigar', 'drink', 'meal', 'accessory']
PRODUCT_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
})

declareVirtualField({model: 'cigar', field: 'reviews', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'review'}}
})

declareVirtualField({model: 'cigar', field: 'average_taste_note', instance: 'Number', requires: 'reviews'})

declareVirtualField({model: 'company', field: 'full_name', instance: 'String', requires: 'name'})

const CAT_MODELS=['category', 'cigarCategory', 'mealCategory', 'drinkCategory', 'accessoryCategory']
CAT_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'children', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'category'},
    },
  })
  declareVirtualField({model: m, field: 'products', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'product'},
    },
  })
})

declareEnumField({model: 'event', field: 'place', enumValues: PLACES})
declareVirtualField({model: 'event', field: 'members_count', instance: 'Number', requires: 'guests_count,members'})
declareVirtualField({model: 'event', field: 'status', instance: 'String', requires: 'start_date,end_date', enumValues: EVENT_STATUS})
declareVirtualField({model: 'event', field: 'guests', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'guest'}}})
declareVirtualField({model: 'event', field: 'guests_count', instance: 'Number', requires: ''})
declareVirtualField({model: 'event', field: 'payments', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'payment'}}})
declareVirtualField({model: 'event', field: 'people_count', instance: 'Number', requires: 'members'})
declareVirtualField({model: 'event', field: 'registration_status', instance: 'String', requires: 'members'})


declareVirtualField({model: 'orderItem', field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
declareVirtualField({model: 'orderItem', field: 'vat_amount', instance: 'Number', requires: 'price,vat_rate'})
declareVirtualField({model: 'orderItem', field: 'total_net_price', instance: 'Number', requires: 'price,vat_rate,quantity'})
declareVirtualField({model: 'orderItem', field: 'total_vat_amount', instance: 'Number', requires: 'price,vat_rate,quantity'})
declareVirtualField({model: 'orderItem', field: 'total_price', instance: 'Number', requires: 'price,quantity'})
declareVirtualField({model: 'subscription', field: 'is_active', instance: 'Boolean', requires: 'start,end'})

const getEventGuests = (user, params, data) => {
  return Event.findById(data._id)
    .populate({path: 'members', populate: 'member guest'})
    .then(event => {
      const m=event.members
        .find(m => idEqual(m.member._id, user._id) && !!m.guest)
      return m ? [m.guest]:[]
    })
}

declareComputedField('event', 'guests', getEventGuests)

const getEventRegistrationStatus = (user, params, data) => {
  return Event.exists({_id: data._id, 'members.member': user._id})
    .then(exists => exists ? 'Vous êtes inscrit': '')
}

declareComputedField('event', 'registration_status', getEventRegistrationStatus)

const getEventGuestsCount = (user, params, data) => {
  return getEventGuests(user, params, data)
    .then(guests => {
      return guests.length
    })
}

const setEventGuestsCount = ({id, attribute, value, user}) => {
  return Event.findById(id)
    .then(event => {
    if (value>event.max_guests_per_member) {
      throw new BadRequestError(`Vous ne pouvez inviter plus de ${event.max_guests_per_member} personnes`)
    }
    return getEventGuests(user, null, {_id: id})
      .then(guests => {
        if (guests.length>value) {
          throw new BadRequestError(`Vous avez déjà envoyé ${guests.length} invitations`)
        }
        return UserSessionData.findOneAndUpdate({user: user._id},
          {user: user._id},
          {upsert: true, runValidators: true, new: true},
        )
      })
      .then(usd => {
        const guests_count=usd.guests_count.find(gc => idEqual(gc.event._id, id))
        if (guests_count) {
          guests_count.count=value
        }
        else {
          usd.guests_count.push({event: id, count: value})
        }
        return usd.save()
      })
  })
}

declareComputedField('event', 'guests_count', getEventGuestsCount, setEventGuestsCount)

module.exports = {
  inviteGuest,
  setOrderItem,
  removeOrderItem,
  registerToEvent,
  unregisterFromEvent,
  payOrder,
  getEventGuestsCount,
  getEventGuests,
}
