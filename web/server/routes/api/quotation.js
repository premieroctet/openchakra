const express = require('express')
const passport = require('passport')
const moment = require('moment')
const {
  EXPRESS_SHIPPING,
  STANDARD_SHIPPING,
} = require('../../../utils/feurst/consts')
const {addItem, computeShipFee} = require('../../utils/commands')
const {getDataFilter, isActionAllowed} = require('../../utils/userAccess')
const {validateZipCode} = require('../../validation/order')

const router = express.Router()
const Quotation = require('../../models/Quotation')
const {validateOrderItem} = require('../../validation/order')
const {validateQuotation}=require('../../validation/quotation')
const {QUOTATION, CREATE, UPDATE, VIEW}=require('../../../utils/consts')

moment.locale('fr')

const DATA_TYPE=QUOTATION
const MODEL=Quotation

// @Route GET /myAlfred/api/quotations/template
// Returns a quotation xlsx template for import
// @Access private
router.get('/template', passport.authenticate('jwt', {session: false}), (req, res) => {
  const data = [
    ['Réference', 'Quantité'],
    ['AAAXXXZ', 6],
  ]
  let buffer = xlsx.build([{data: data}])
  res.setHeader('Content-Type', 'application/vnd.openxmlformats')
  res.setHeader('Content-Disposition', 'attachment; filename=order_template.xlsx')
  res.end(buffer, 'binary')
})

// @Route POST /myAlfred/api/quotations/
// Add a new quotation
// @Access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, CREATE)) {
    return res.status(301)
  }

  const {errors, isValid}=validateQuotation(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  if (!req.body.user) {
    req.body.user=req.user._id
  }

  MODEL.create(req.body)
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/quotations/:id
// Add item to a quotation {address_id?, reference?}
// @Access private
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, UPDATE)) {
    return res.status(301)
  }
  throw new Error('Not implemented')
})

// @Route PUT /myAlfred/api/quotations/:id/item
// Add item to a quotation
// @Access private
router.put('/:id/items', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, UPDATE)) {
    return res.status(301)
  }

  const {errors, isValid}=validateOrderItem(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  const quotation_id=req.params.id
  const {product, quantity}=req.body

  Quotation.findOne({_id: quotation_id, ...getDataFilter(req.user, DATA_TYPE, UPDATE)})
    .then(data => {
      if (!data) {
        console.error(`No quotation #${quotation_id}`)
        return res.status(404)
      }
      return addItem(data, product, quantity)
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

// @Route DELETE /myAlfred/api/quotations/:id/items
// Removes item from a quotation
// @Access private
router.delete('/:quotation_id/items/:item_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, DELETE)) {
    return res.status(301)
  }

  const quotation_id=req.params.quotation_id
  const item_id=req.params.item_id

  Quotation.findOneAndUpdate({_id: quotation_id, ...getDataFilter(req.user, DATA_TYPE, DELETE)}, {$pull: {items: {_id: item_id}}}, {runValidators: true})
    .then(() => {
      res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/quotations
// View all quotations
// @Access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(301)
  }

  Quotation.find(getDataFilter(req.user, DATA_TYPE, VIEW))
    .populate('items.product')
    .then(quotations => {
      return res.json(quotations)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/quotations/:id
// View one booking
// @Access public
router.get('/:quotation_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(301)
  }

  Quotation.findOne({_id: req.params.quotation_id, ...getDataFilter(req.user, DATA_TYPE, VIEW)})
    .populate('items.product')
    .then(quotation => {
      if (quotation) {
        return res.json(quotation)
      }
      return res.status(404).json({msg: 'No quotation found'})
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route DELETE /myAlfred/quotations/:id
// Delete one quotation
// @Access private
router.delete('/:quotation_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, DELETE)) {
    return res.status(301)
  }

  Quotation.findOneAndDelete({_id: req.params.quotation_id, ...getDataFilter(req.user, DATA_TYPE, VIEW)})
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

router.post('/:quotation_id/convert', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (!isActionAllowed(reQ.user.roles, DATA_TYPE, CONVERT)) {
    return res.status(301)
  }

  const quotation_id=req.params.quotation_id

  MODEL.findById(quotation_id)
    .then(quotation => {
      if (!quotation) {
        return res.status(404)
      }
      const attributes=lodash.omit(quotation, ['_id', 'id'])
      attributes.source_quotation=quotation
      return Order.create(attributes)
    })
    .then(order => {
      res.json(order)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/quotations/:id/shipping-fee?zipcode
// Computes shipping fees
// @Access private
router.get('/:id/shipping-fee', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(301)
  }

  const zipCode=req.query.zipcode

  const {errors, isValid}=validateZipCode(zipCode)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  const department=parseInt(String(zipCode).slice(0, -3))

  const fee={express: 0, standard: 0}
  let order=null
  MODEL.findOne({_id: req.params.id, ...getDataFilter(req.user, DATA_TYPE, UPDATE)})
    .populate('items.product')
    .then(result => {
      if (!result) {
        return res.status(404).json()
      }
      order=result
      return computeShipFee(department, order.total_weight, false)
    })
    .then(standard => {
      fee[STANDARD_SHIPPING]=standard
      return computeShipFee(department, order.total_weight, true)
    })
    .then(express => {
      fee[EXPRESS_SHIPPING]=express
      return res.json(fee)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

module.exports = router
