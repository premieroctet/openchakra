const Product = require('../../models/Product')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const moment = require('moment')
const {validateProduct}=require('../../validation/product')

moment.locale('fr')

// @Route GET /myAlfred/api/products
// View all products
// @Access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Product.find({})
    .then(products => {
      res.json(products)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/products/:product_id
// View one product
// @Access private
router.get('/:product_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Product.findById(req.params.product_id)
    .then(product => {
      if (!product) {
        return res.status(404).json()
      }
      return res.json(product)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route POST /myAlfred/api/products
// CReate a product
// @Access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid}=validateProduct(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Product.create(req.body, {runValidators: true})
    .then(product => {
      return res.json(product)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/products
// Update a product
// @Access private
router.put('/:product_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Product.findByIdAndUpdate(req.params.product_id, req.body, {runValidators: true, new: true})
    .then(product => {
      if (!product) {
        return res.status(404).json()
      }
      return res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route DELETE /myAlfred/api/products
// Deletes a product
// @Access private
router.delete('/:product_id', passport.authenticate('jwt', {session: false}), (req, res) => {


  Product.findByIdAndDelete(req.params.product_id, {runValidators: true, new: true})
    .then(product => {
      if (!product) {
        return res.status(404).json()
      }
      return res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

module.exports = router
