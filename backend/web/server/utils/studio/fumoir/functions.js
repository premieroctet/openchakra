const mongoose = require('mongoose')
const {
  declareEnumField,
  declareVirtualField,
  getModel,
} = require('../../database')
const {PLACES, ROLES} = require('../../../../utils/fumoir/consts')
const {BadRequestError, NotFoundError} = require('../../errors')
const OrderItem = require('../../../models/OrderItem')
const Product = require('../../../models/Product')
const Order = require('../../../models/Order')
const Event = require('../../../models/Event')

const inviteGuest = ({eventOrBooking, email, phone}) => {
  return getModel(eventOrBooking)
    .then(modelName => {
      if (!['booking', 'event'].includes(modelName)) {
        throw new BadRequestError(`Found model ${modelName} for ${eventOrBooking}, should be event or booking`)
      }
      mongooseModel = mongoose.connection.models[modelName]
      return mongooseModel.findByIdAndUpdate(eventOrBooking, {
        $push: {guests: {email, phone}},
      })
    })
}

const setOrderItem = ({order, product, quantity}) => {
  return Order.findById(order)
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
          Order.findByIdAndUpdate(
            order,
            {$push: {items: item}},
            {new: true},
          ),
        )
    })
}

const removeOrderItem = ({order, item}) => {
  return Order.findByIdAndUpdate(order, {$pull: {items: item}})
    .then(() => {
      return OrderItem.findByIdAndRemove(item)
    })
    .then(res => {
      console.log(res)
      return res
    })
}

const payOrder = ({order, user}) => {
  return Order.findById(order)
    .then(order => {
      if (!order) { throw new NotFoundError(`Order ${order} not found`) }
      console.log(`Items are ${JSON.stringify(order.items)}`)
      return OrderItem.updateMany({_id: {$in: order.items.map(i => i._id)}}, {$set: {paid: true}})
    })
}

const registerToEvent = ({event, user}) => {
  console.log(`Adding ${user} to event ${event}`)
  return Event.findByIdAndUpdate(event, {$addToSet: {members: user}})
}


declareEnumField({model: 'user', field: 'role', enumValues: ROLES})
declareVirtualField({model: 'user', field: 'full_name', instance: 'String', requires: 'firstname,lastname'})
declareVirtualField({model: 'user', field: 'is_active', instance: 'Boolean', requires: 'subscription_start,subscription_end'})
declareVirtualField({model: 'user', field: 'is_active_str', instance: 'String', requires: 'subscription_start,subscription_end'})
declareVirtualField({model: 'user', field: 'posts', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'post'}}})

declareEnumField({model: 'loggedUser', field: 'role', enumValues: ROLES})
declareVirtualField({model: 'loggedUser', field: 'full_name', instance: 'String', requires: 'firstname,name'})
declareVirtualField({model: 'loggedUser', field: 'is_active', instance: 'Boolean', requires: 'subscription_start,subscription_end'})
declareVirtualField({model: 'loggedUser', field: 'is_active_str', instance: 'String', requires: 'subscription_start,subscription_end'})
declareVirtualField({model: 'loggedUser', field: 'posts', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'post'}}})

declareEnumField({model: 'booking', field: 'place', enumValues: PLACES})

declareVirtualField({model: 'booking', field: 'end_date', instance: 'Date', requires: ''})
declareVirtualField({model: 'booking', field: 'orders', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'order'}}})
declareVirtualField({model: 'cigar', field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
declareVirtualField({model: 'cigar', field: 'reviews', instance: 'review', requires: ''})
declareVirtualField({model: 'company', field: 'full_name', instance: 'String', requires: 'name'})
declareVirtualField({model: 'drink', field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
declareVirtualField({model: 'drink', field: 'reviews', instance: 'review', requires: ''})
declareVirtualField({model: 'meal', field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
declareVirtualField({model: 'meal', field: 'reviews', instance: 'review', requires: ''})

declareEnumField({model: 'event', field: 'place', enumValues: PLACES})
declareVirtualField({model: 'event', field: 'members_count', instance: 'Number', required: 'guests_count,members'})

declareVirtualField({model: 'order', field: 'total_price', instance: 'Number', required: 'items'})
declareVirtualField({model: 'order', field: 'paid', instance: 'Boolean', required: 'items'})

declareVirtualField({model: 'orderItem', field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
declareVirtualField({model: 'orderItem', field: 'total_price', instance: 'Number', requires: 'price,quantity'})

declareVirtualField({model: 'product', field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
declareVirtualField({model: 'product', field: 'reviews', instance: 'review', requires: ''})

declareVirtualField({model: 'subscription', field: 'is_active', instance: 'Boolean', requires: 'start,end'})


module.exports = {
  inviteGuest,
  setOrderItem,
  removeOrderItem,
  registerToEvent,
  payOrder,
}
