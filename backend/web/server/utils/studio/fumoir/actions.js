const UserSessionData = require('../../../models/UserSessionData')
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

const inviteGuestAction=({parent, email, phone}, user) => {
  return inviteGuest({eventOrBooking: parent, email, phone}, user)
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
          return UserSessionData.findOne({user: user._id, 'guests.event': dataId})
            .then(usd => usd?.guests?.length>0)
        }
      })
  }
  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
