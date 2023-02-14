const {
  sendBookingRegister2Guest,
  sendEventRegister2Admin,
  sendEventRegister2Guest,
  sendForgotPassword,
} = require('./mailing')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const lodash=require('lodash')
const { generatePassword } = require('../../../utils/passwords')
const {initiatePayment} = require('../payment/vivaWallet')
const Payment = require('../../models/Payment')
const {addAction} = require('../../utils/studio/actions.js')
const {
  declareComputedField,
  declareEnumField,
  declareVirtualField,
  getModel,
  setFilterDataUser,
  setPostCreateData,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')
const UserSessionData = require('../../models/UserSessionData')
const User = require('../../models/User')
const Booking = require('../../models/Booking')
const {generate_id} = require('../../../utils/consts')
const Message = require('../../models/Message')
const Guest = require('../../models/Guest')
const {BadRequestError, NotFoundError} = require('../../utils/errors')
const OrderItem = require('../../models/OrderItem')
const Product = require('../../models/Product')
const Event = require('../../models/Event')
const {
  EVENT_STATUS,
  EVENT_VAT_RATE,
  FUMOIR_ADMIN,
  FUMOIR_MEMBER,
  PAYMENT_STATUS,
  PAYMENT_SUCCESS,
  PLACES,
  ROLES,
} = require('./consts')

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
                ev.members.find(m => m.member._id.toString()==user._id.toString()).guest=g._id
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
            vat_amount: vat,
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

const cashOrder=({context, guest, amount, redirect}, user) => {
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
          return Payment.create({booking, ...customer, amount: amount, vat_amount: payment_tva, status: PAYMENT_SUCCESS})
        })
        .then(() => ({redirect}))
    })
}

addAction('payEvent', payEvent)
addAction('payOrder', payOrder)
addAction('cashOrder', cashOrder)

const registerToEvent = ({event, user}) => {
  console.log(`Adding ${user} to event ${event}`)
  return Event.findById(event)
    .populate('members')
    .then(ev => {
      if (ev.members.find(m => m.member._id.toString()==user._id.toString())) {
        throw new BadRequestError(`Vous êtes déjà inscrit à cet événement`)
      }
      if (ev.people_count+1>ev.max_people) {
        throw new BadRequestError(`Cet événement est complet`)
      }
      ev.members.push({member: user._id})
      return ev.save()
    })
    .then(ev => Promise.all([Promise.resolve(ev), User.find({role: FUMOIR_ADMIN})]))
    .then(([ev, admins]) => Promise.allSettled(admins.map(a => sendEventRegister2Admin({event: ev, member: user, admin: a}))))
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
        params.password=bcrypt.hashSync(password, 10)
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
    sendForgotPassword({user:data, password:params.nonHashedPassword})
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
        data=data.filter(d => [d.sender._id, d.receiver._id].includes(user._id.toString()))
        return lodash.orderBy(data, ['creation_date'], ['asc'])
      }
    }
    if (model=='booking') {
      if ([FUMOIR_MEMBER].includes(user.role)) {
        data=data.filter(d => d.booking_user?._id?.toString()==user._id.toString())
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
      return m.sender._id.toString()==user._id.toString() ? m.receiver : m.sender
    }

    return Message.find({$or: [{sender: user._id}, {receiver: user._id}]})
      .populate({path: 'sender', populate: {path: 'company'}})
      .populate({path: 'receiver', populate: {path: 'company'}})
      .sort({'creation_date': 1})
      .then(messages => {
        if (id) {
          messages=messages.filter(m => getPartner(m, user)._id.toString()==id)
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
          .sortBy('creation_date', 'asc')
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

declareVirtualField({model: 'payment', field: 'net_amount', instance: 'Number', requires: 'total_amount,vat_amount'})
declareEnumField({model: 'payment', field: 'status', enumValues: PAYMENT_STATUS})


const PRODUCT_MODELS=['product', 'cigar', 'drink', 'meal']
PRODUCT_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
  declareVirtualField({model: m, field: 'reviews', instance: 'review', requires: ''})
})
declareVirtualField({model: 'company', field: 'full_name', instance: 'String', requires: 'name'})

const CAT_MODELS=['category', 'cigarCategory', 'mealCategory', 'drinkCategory']
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
        .find(m => m.member._id.toString()==user._id.toString() && !!m.guest)
      return m ? [m.guest]:[]
    })
}

declareComputedField('event', 'guests', getEventGuests)

const getEventGuestsCount = (user, params, data) => {
  return getEventGuests(user, params, data)
    .then(guests => {
      console.log(`Guests:${guests.length}`)
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
        const guests_count=usd.guests_count.find(gc => gc.event._id.toString()==id)
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
  payOrder,
  getEventGuestsCount,
}
