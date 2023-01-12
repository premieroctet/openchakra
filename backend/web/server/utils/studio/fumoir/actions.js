const Order = require('../../../models/Order')
const UserSessionData = require('../../../models/UserSessionData')
const {getModel} = require('../../database')
const {addAction, setAllowActionFn} = require('../actions')
const {
  inviteGuest,
  payOrder,
  registerToEvent,
  removeOrderItem,
  setOrderItem,
} = require('./functions')

const inviteGuestAction=({parent, email, phone}, user) => {
  return inviteGuest({eventOrBooking: parent, email, phone}, user)
}

const payAction=({context, redirect}, user) => {
  return payOrder({order: context, redirect, user})
}

const registerToEventAction=({context}, user) => {
  return registerToEvent({event: context, user})
}

const removeOrderItemAction=({context, parent}) => {
  return removeOrderItem({order: context, item: parent})
}

const setOrderItemAction=({context, parent, quantity}) => {
  return setOrderItem({order: context, product: parent, quantity})
}

addAction('inviteGuest', inviteGuestAction)
addAction('pay', payAction)
addAction('registerToEvent', registerToEventAction)
addAction('removeOrderItem', removeOrderItemAction)
addAction('setOrderItem', setOrderItemAction)

const isActionAllowed = ({action, dataId, user}) => {
  if (action=='pay') {
    return getModel(dataId)
      .then(dm => {
        if (dm=='event') {
          return UserSessionData.findOne({user: user._id, 'guests.event': dataId})
            .then(usd => usd?.guests?.length>0)
        }
        if (dm=='order') {
          return Order.findById(dataId)
            .populate('items')
            .populate('payments')
            .then(o => o.remaining_total>0)
        }
      })
  }
  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
