const {getModel} = require('../../database')
const Event = require('../../../models/Event')
const {getDataModel} = require('../../../../config/config')
const {addAction, setAllowActionFn} = require('../actions')
const {
  inviteGuest,
  payOrder,
  registerToEvent,
  removeOrderItem,
  setOrderItem,
} = require('./functions')

const inviteGuestAction=({parent, email, phone}) => {
  return inviteGuest({eventOrBooking: parent, email, phone})
}

const payAction=({context}, user) => {
  return payOrder({order: context, user})
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
          return Event.findById(dataId)
        }
      })
      .then(ev => {
        console.log(`Event:${JSON.stringify(ev.guests)}`)
        return ev.guests.length>0
      })
  }
  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
