const {addItem} = require('../../utils/commands')
const {getDataFilter, isActionAllowed} = require('../../utils/userAccess')
const Order = require('../../models/Order')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const moment = require('moment')
const {validateOrder, validateOrderItem}=require('../../validation/order')
const {ORDER, CREATE, UPDATE, VIEW, DELETE}=require('../../../utils/consts')

moment.locale('fr')

// @Route POST /myAlfred/api/orders/
// Add a new order
// @Access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.context.user.roles, ORDER, CREATE)) {
    return res.status(301)
  }

  const {errors, isValid}=validateOrder(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  if (!req.body.user) {
    req.body.user=req.context.user._id
  }

  Order.create(req.body)
    .then(order => {
      return res.json(order)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/orders/:id
// Add item to a order {address_id?, reference?}
// @Access private
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.context.user.roles, ORDER, UPDATE)) {
    return res.status(301)
  }

})
// @Route PUT /myAlfred/api/orders/:id/item
// Add item to a order {product_id, quantity, discount?}
// @Access private
router.put('/:id/items', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.context.user.roles, ORDER, UPDATE)) {
    return res.status(301)
  }

  const {errors, isValid}=validateOrderItem(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  const order_id=req.params.id
  const {product, quantity}=req.body

  Order.findOne({_id: order_id, ...getDataFilter(req.context.user.roles, ORDER, UPDATE)})
    .then(order => {
      if (!order) {
        console.error(`No order #${order_id}`)
        return res.status(404)
      }
      console.log(`Order:${JSON.stringify(order)}`)
      return addItem(order, product, quantity)
    })
    .then(order => {
      return order.save()
    })
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/orders/:id/item
// Removes item from a order
// @Access private
router.delete('/:order_id/items/:item_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.context.user.roles, ORDER, UPDATE)) {
    return res.status(301)
  }

  const order_id=req.params.order_id
  const item_id=req.params.item_id

  Order.findOneAndUpdate({_id: order_id, ...getDataFilter(req.context.user.roles, ORDER, DELETE)}, {$pull: {items: {_id: item_id}}})
    .then(result => {
      if (!result) {
        return res.status(404).json(`Order #${order_id} not found`)
      }
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/orders
// View all orders
// @Access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.context.user.roles, ORDER, VIEW)) {
    return res.status(301)
  }

  Order.find(getDataFilter(req.context.user.roles, ORDER, VIEW))
    .populate('items.product')
    .then(orders => {
      return res.json(orders)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/orders/:id
// View one booking
// @Access public
router.get('/:order_id', (req, res) => {

  if (!isActionAllowed(req.context.user.roles, ORDER, VIEW)) {
    return res.status(301)
  }

  Order.findOne({_id: req.params.order_id, ...getDataFilter(req.context.user.roles, ORDER, VIEW)})
    .populate('items.product')
    .then(order => {
      if (order) {
        return res.json(order)
      }
      return res.status(404).json({msg: 'No order found'})
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route DELETE /myAlfred/orders/:id
// Delete one order
// @Access private
router.delete('/:order_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.context.user.roles, ORDER, DELETE)) {
    return res.status(301)
  }

  Order.findOneAndDelete({_id: req.params.order_id, ...getDataFilter(req.context.user.roles, ORDER, VIEW)})
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

module.exports = router
