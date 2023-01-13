const {
  FUMOIR_MANAGER,
  FUMOIR_MEMBER
} = require('../../../../utils/fumoir/consts');
const Booking = require('../../../models/Booking');
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
addAction('registerToEvent', registerToEventAction)
addAction('removeOrderItem', removeOrderItemAction)
addAction('setOrderItem', setOrderItemAction)

const isActionAllowed = ({action, dataId, user}) => {
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
      .then(o => o?.paid==false)
  }
  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
