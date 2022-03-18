const Quotation = require('../../models/Quotation')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const moment = require('moment')
const {validateQuotation}=require('../../validation/quotation')

moment.locale('fr')

const roleFilter= req => {
  // TODO How to filter available data ??
  /**
  if ([FEURST_ADMIN, CUSTOMER_MASTER].includes(getRole(req))) {
    return {}
  }
  return {user: get_logged_id(req)}
  */
  return {}
}

// @Route POST /myAlfred/api/quotations/
// Add a new quotation
// @Access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  const {errors, isValid}=validateQuotation(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  Quotation.create(req.body)
    .then(quotation => {
      res.json(quotation)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json(err)
    })
})

// @Route PUT /myAlfred/api/quotations/:id/item
// Add item to a quotation
// @Access private
router.put('/:id/item', passport.authenticate('jwt', {session: false}), (req, res) => {

  const quotation_id=req.params.id
  const item=req.body

  Quotation.findOneAndUpdate({_id: quotation_id, ...roleFilter(req)}, {$push: {items: item}}, {runValidators: true})
    .then(result => {
      if (!result) {
        console.error(`No quotation #${quotation_id}`)
        return res.status(404)
      }
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/quotations/:id/item
// Removes item from a quotation
// @Access private
router.delete('/:quotation_id/item/:item_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  const quotation_id=req.params.quotation_id
  const item_id=req.params.item_id

  Quotation.findOneAndUpdate({_id: quotation_id, ...roleFilter(req)}, {$pull: {items: {_id: item_id}}}, {runValidators: true})
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

  Quotation.find(roleFilter(req))
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
router.get('/:quotation_id', (req, res) => {

  Quotation.findOne({_id: req.params.quotation_id, ...roleFilter(req)})
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
  Quotation.findOneAndDelete({_id: req.params.quotation_id, ...roleFilter(req)})
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

module.exports = router
