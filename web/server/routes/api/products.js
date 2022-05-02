const express = require('express')
const passport = require('passport')
const moment = require('moment')
const {getProductPrices} = require('../../utils/commands')
const {fileImport} = require('../../utils/import')
const {isActionAllowed} = require('../../utils/userAccess')
const {DELETE} = require('../../../utils/feurst/consts')
const {XL_FILTER, createMemoryMulter} = require('../../utils/filesystem')
const {PRODUCT, VIEW, CREATE} = require('../../../utils/consts')
const Product = require('../../models/Product')

const router = express.Router()
const {validateProduct}=require('../../validation/product')
moment.locale('fr')

// PRODUCTS
const uploadProducts = createMemoryMulter(XL_FILTER)

const DATA_TYPE=PRODUCT

// @Route GET /myAlfred/api/products
// View all products
// optional ?pattern=XX filters on reference
// @Access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(301)
  }

  const pattern = new RegExp(req.query.pattern, 'i')
  const filter=req.query.pattern ? {
    $or: [
      {reference: pattern},
      {description: pattern},
      {description_2: pattern},
    ],
  }: {}

  Product.find(filter)
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
  const user_id=req.user._id // req.query.user
  if (!user_id) {
    return res.status(500).json('Missing user_id parameter')
  }
  const product_id=req.params.product_id
  let product=null
  Product.findById(product_id)
    .lean()
    .then(result => {
      if (!result) {
        return res.status(404).json()
      }
      product=result
      return getProductPrices(product.reference, user_id)
    })
    .then(prices => {
      product.catalog_price=prices.catalog_price
      product.net_price=prices.net_price
      return res.json(product)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route POST /myAlfred/api/products
// Create a product
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

  if (!isActionAllowed(req.user.roles, DATA_TYPE, DELETE)) {
    return res.status(301).json()
  }

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

// @Route POST /myAlfred/api/products/import
// Imports products from csv
router.post('/import', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, CREATE)) {
    return res.status(301).json()
  }

  uploadProducts.single('buffer')(req, res, err => {
    if (err) {
      console.error(err)
      return res.status(404).json({errors: err.message})
    }
    // db field => import field
    const DB_MAPPING={
      'reference': 'Code article',
      'description_2': 'Description 2',
      'group': 'Grpe',
      'family': 'Famille',
      'description': 'Description',
      'weight': "Poids d'expédition",
    }

    const options=JSON.parse(req.body.options)

    fileImport(Product, req.file.buffer, DB_MAPPING, {...options, key: 'reference'})
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.error(err)
        res.status(500).error(err)
      })
  })
})

// @Route POST /myAlfred/api/products/import-stock
// Imports stock from csv
router.post('/import-stock', passport.authenticate('jwt', {session: false}), (req, res) => {

  console.log(`Actions:${JSON.stringify(req.user.roles, null, 2)}`)
  if (!isActionAllowed(req.user.roles, DATA_TYPE, CREATE)) {
    return res.status(401).json()
  }

  uploadProducts.single('buffer')(req, res, err => {
    if (err) {
      console.error(err)
      return res.status(404).json({errors: err.message})
    }
    // db field => import field
    const DB_MAPPING={
      'reference': 'Code article',
      'stock': 'FSTMG',
    }

    const options=JSON.parse(req.body.options)
    fileImport(Product, req.file.buffer, DB_MAPPING, {...options, key: 'reference', update: true})
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.error(err)
        res.status(500).error(err)
      })
  })
})

module.exports = router
