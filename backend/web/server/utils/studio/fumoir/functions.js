const mongoose = require('mongoose')
const lodash=require('lodash')
const {
  declareEnumField,
  declareVirtualField,
  getModel,
  setFilterDataUser,
  setPostCreateData,
  setPreprocessGet,
} = require('../../database')
const {PLACES, ROLES, EVENT_STATUS} = require('../../../../utils/fumoir/consts')
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

const postCreate = ({model, params, data}) => {
  if (model=='booking') {
    return Order.create({booking: data._id})
      .then(order => {
        console.log(`Created ${order}`)
        data.orders=[order]
        return data.save()
      })
  }

  return data

}

setPostCreateData(postCreate)

const filterDataUser = ({model, data, id, user}) => {

  // List mode
  if (!id) {
    if (model == 'category') {
      const allChildren=lodash.flattenDeep(data.map(d => d.children.map(c => c._id)))
      return data.filter(d => !allChildren.includes(d._id))
    }
  }

  return data
}

setFilterDataUser(filterDataUser)

const preprocessGet = ({model, fields, id, user}) => {
  if (model == 'category') {
    console.log('adding parent')
    fields = lodash([...fields, 'parent']).uniq().value()
  }
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }
  return Promise.resolve({model, fields, id})
}

setPreprocessGet(preprocessGet)


declareEnumField({model: 'user', field: 'role', enumValues: ROLES})
declareVirtualField({model: 'user', field: 'full_name', instance: 'String', requires: 'firstname,lastname'})
declareVirtualField({model: 'user', field: 'is_active', instance: 'Boolean', requires: 'subscription_start,subscription_end'})
declareVirtualField({model: 'user', field: 'is_active_str', instance: 'String', requires: 'subscription_start,subscription_end'})
declareVirtualField({model: 'user', field: 'posts', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'post'}}})

declareVirtualField({model: 'user', field: 'bookings', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'booking'}}})

declareVirtualField({model: 'user', field: 'events', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'event'}}})

declareEnumField({model: 'loggedUser', field: 'role', enumValues: ROLES})
declareVirtualField({model: 'loggedUser', field: 'full_name', instance: 'String', requires: 'firstname,name'})
declareVirtualField({model: 'loggedUser', field: 'is_active', instance: 'Boolean', requires: 'subscription_start,subscription_end'})
declareVirtualField({model: 'loggedUser', field: 'is_active_str', instance: 'String', requires: 'subscription_start,subscription_end'})
declareVirtualField({model: 'loggedUser', field: 'posts', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'post'}}})

declareVirtualField({model: 'loggedUser', field: 'bookings', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'booking'}}})

declareVirtualField({model: 'loggedUser', field: 'events', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'event'}}})

declareEnumField({model: 'booking', field: 'place', enumValues: PLACES})
declareVirtualField({model: 'booking', field: 'end_date', instance: 'Date', requires: ''})
declareVirtualField({model: 'booking', field: 'paid', instance: 'Boolean', requires: 'orders'})
declareVirtualField({model: 'booking', field: 'paid_str', instance: 'String', requires: 'orders'})
declareVirtualField({model: 'booking', field: 'status', instance: 'String', requires: 'start_date,end_date', enumValues: EVENT_STATUS})

const PRODUCT_MODELS=['product', 'cigar', 'drink', 'meal']
PRODUCT_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
  declareVirtualField({model: m, field: 'reviews', instance: 'review', requires: ''})
})
declareVirtualField({model: 'company', field: 'full_name', instance: 'String', requires: 'name'})

const CAT_MODELS=['category', 'cigarCategory', 'mealCategory', 'drinkCategory']
CAT_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'parent', instance: 'category', requires: ''})
  declareVirtualField({model: m, field: 'products', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'product'}}})
})

declareEnumField({model: 'event', field: 'place', enumValues: PLACES})
declareVirtualField({model: 'event', field: 'members_count', instance: 'Number', requires: 'guests_count,members'})
declareVirtualField({model: 'event', field: 'status', instance: 'String', requires: 'start_date,end_date', enumValues: EVENT_STATUS})

declareVirtualField({model: 'order', field: 'total_price', instance: 'Number', requires: 'items'})
declareVirtualField({model: 'order', field: 'paid', instance: 'Boolean', requires: 'items'})
declareVirtualField({model: 'order', field: 'paid_str', instance: 'String', requires: 'items'})

declareVirtualField({model: 'orderItem', field: 'net_price', instance: 'Number', requires: 'price,vat_rate'})
declareVirtualField({model: 'orderItem', field: 'total_price', instance: 'Number', requires: 'price,quantity'})

declareVirtualField({model: 'subscription', field: 'is_active', instance: 'Boolean', requires: 'start,end'})


module.exports = {
  inviteGuest,
  setOrderItem,
  removeOrderItem,
  registerToEvent,
  payOrder,
}
