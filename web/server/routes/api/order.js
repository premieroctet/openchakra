const {getDataFilter, isActionAllowed} = require('../../utils/userAccess')
const Order = require('../../models/Order')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const moment = require('moment')
const {validateOrder}=require('../../validation/order')
const {ORDER, CREATE, UPDATE, VIEW}=require('../../../utils/consts')

moment.locale('fr')

// @Route POST /myAlfred/api/orders/
// Add a new order
// @Access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, ORDER, CREATE)) {
    return res.status(301)
  }

  const {errors, isValid}=validateOrder(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  if (!req.body.user) {
    req.body.user=req.user
  }

  Order.create(req.body)
    .then(order => {
      return res.json(order)
    })
    .catch(err => {
      console.error(err)
      return res.status(404).json(err)
    })
})

// @Route PUT /myAlfred/api/orders/:id
// Add item to a order {address_id?, reference?}
// @Access private
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, ORDER, UPDATE)) {
    return res.status(301)
  }

})
// @Route PUT /myAlfred/api/orders/:id/item
// Add item to a order {product_id, quantity, discount?}
// @Access private
router.put('/:id/items', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, ORDER, UPDATE)) {
    return res.status(301)
  }

  const order_id=req.params.id
  const {product_id, quantity}=req.body

  Order.findOne({_id: order_id, ...getDataFilter(req.user.roles, ORDER, UPDATE)})
    .then(result => {
      if (!result) {
        console.error(`No order #${order_id}`)
        return res.status(404)
      }
      return addItem(result, product_id, quantity)
    })
    .then(data => {
      return data.save()
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
router.delete('/:order_id/item/:item_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, ORDER, DELETE)) {
    return res.status(301)
  }

  const order_id=req.params.order_id
  const item_id=req.params.item_id

  Order.findOneAndUpdate({_id: order_id, ...getDataFilter(req.user.roles, ORDER, DELETE)}, {$pull: {items: {_id: item_id}}}, {runValidators: true})
    .then(() => {
      res.json()
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

  if (!isActionAllowed(req.user.roles, ORDER, VIEW)) {
    return res.status(301)
  }

  Order.find(getDataFilter(req.user.roles, ORDER, VIEW))
    .then(orders => {
      return res.json(orders)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/orders/:id
// View one booking
// @Access public
router.get('/:order_id', (req, res) => {

  if (!isActionAllowed(req.user.roles, ORDER, VIEW)) {
    return res.status(301)
  }

  Order.findOne({_id: req.params.order_id, ...getDataFilter(req.user.roles, ORDER, VIEW)})
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

  if (!isActionAllowed(req.user.roles, ORDER, DELETE)) {
    return res.status(301)
  }

  Order.findOneAndDelete({_id: req.params.order_id, ...getDataFilter(req.user.roles, ORDER, VIEW)})
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

router.post('/:order_id/convert', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (!isActionAllowed(reQ.user.roles, ORDER, CONVERT)) {
    return res.status(301)
  }

})

module.exports = router
