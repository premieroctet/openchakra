const Quotation = require('../../models/Quotation')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const moment = require('moment')
const {validateQuotation}=require('../../validation/quotation')
const {QUOTATION, CREATE}=require('../../../utils/consts')

moment.locale('fr')

// @Route POST /myAlfred/api/quotations/
// Add a new quotation
// @Access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, QUOTATION, CREATE)) {
    return res.status(301)
  }

  const {errors, isValid}=validateQuotation(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  if (!req.body.user) {
    req.body.user=req.get_logged_id()
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

  if (!isActionAllowed(req.user.roles, QUOTATION, CREATE) || !isActionAllowed(req.user.roles, QUOTATION, UPDATE)) {
    return res.status(301)
  }

  const quotation_id=req.params.id
  const item=req.body

  Quotation.findOneAndUpdate({_id: quotation_id, ...getDataFilter(req.user.roles, QUOTATION, UPDATE)}, {$push: {items: item}}, {runValidators: true})
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

  if (!isActionAllowed(req.user.roles, QUOTATION, DELETE)) {
    return res.status(301)
  }

  const quotation_id=req.params.quotation_id
  const item_id=req.params.item_id

  Quotation.findOneAndUpdate({_id: quotation_id, ...getDataFilter(req.user.roles, QUOTATION, DELETE)}, {$pull: {items: {_id: item_id}}}, {runValidators: true})
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

  if (!isActionAllowed(req.user.roles, QUOTATION, VIEW)) {
    return res.status(301)
  }

  Quotation.find(getDataFilter(req.user.roles, QUOTATION, VIEW))
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

  if (!isActionAllowed(req.user.roles, QUOTATION, VIEW)) {
    return res.status(301)
  }

  Quotation.findOne({_id: req.params.quotation_id, ...getDataFilter(req.user.roles, QUOTATION, VIEW)})
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

  if (!isActionAllowed(req.user.roles, QUOTATION, DELETE)) {
    return res.status(301)
  }

  Quotation.findOneAndDelete({_id: req.params.quotation_id, ...getDataFilter(req.user.roles, QUOTATION, VIEW)})
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

router.post('/:quotation_id/convert', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (!isActionAllowed(reQ.user.roles, QUOTATION, CONVERT)) {
    return res.status(301)
  }

})

module.exports = router
