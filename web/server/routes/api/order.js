const express = require('express')
const passport = require('passport')
const moment = require('moment')
const xlsx=require('node-xlsx')
const lodash=require('lodash')
const {
  addItem,
  computeShipFee,
  extractDepartment,
  getProductPrices,
  updateCompanyAddresses,
  updateShipFee,
  updateStock,
} = require('../../utils/commands')
const {
  EXPRESS_SHIPPING,
  HANDLE,
  HANDLED,
  PARTIALLY_HANDLED,
  STANDARD_SHIPPING,
  UPDATE_ALL,
  VALIDATE,
} = require('../../../utils/feurst/consts')
const Product = require('../../models/Product')
const {
  filterOrderQuotation,
  isActionAllowed,
} = require('../../utils/userAccess')
const {lineItemsImport} = require('../../utils/import')
const {XL_FILTER, createMemoryMulter} = require('../../utils/filesystem')
const {validateZipCode} = require('../../validation/order')

const router = express.Router()
const Order = require('../../models/Order')
const {validateOrder, validateOrderItem}=require('../../validation/order')
const {ORDER, CREATE, UPDATE, VIEW, DELETE}=require('../../../utils/consts')
moment.locale('fr')

const DATA_TYPE=ORDER
const MODEL=Order

// PRODUCTS
const uploadItems = createMemoryMulter(XL_FILTER)

router.get('/:order_id/addresses', passport.authenticate('jwt', {session: false}), (req, res) => {
  const order_id=req.params.order_id

  MODEL.findById(order_id)
    .populate('company')
    .then(order => {
      if (!order) {
        return res.status(404).json()
      }
      return res.json(order.company.addresses)
    })
})


// @Route GET /myAlfred/api/orders/template
// Returns an order xlsx template for import
// @Access private
router.get('/template', passport.authenticate('jwt', {session: false}), (req, res) => {
  const data = [
    ['Référence', 'Quantité'],
    ['AAAXXXZ', 6],
  ]
  let buffer = xlsx.build([{data: data}])
  res.setHeader('Content-Type', 'application/vnd.openxmlformats')
  res.setHeader('Content-Disposition', 'attachment; filename=order_template.xlsx')
  res.end(buffer, 'binary')
})

// @Route POST /myAlfred/api/orders/import
// Imports products from csv
router.post('/:order_id/import', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, UPDATE)) {
    return res.status(401).json()
  }

  uploadItems.single('buffer')(req, res, err => {
    if (err) {
      console.error(err)
      return res.status(404).json({errors: err.message})
    }

    const order_id=req.params.order_id
    const options=JSON.parse(req.body.options)

    MODEL.findOneById(order_id)
      .populate('items.product')
      .then(data => {
        if (!data) {
          console.error(`${DATA_TYPE} #${order_id} not found`)
          return res.status(404).json()
        }
        // db field => import field
        const DB_MAPPING={
          'reference': 'Référence',
          'quantity': 'Quantité',
        }
        return lineItemsImport(data, req.file.buffer, DB_MAPPING, options)
      })
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.error(err)
        return res.status(500).json(err)
      })
  })
})


// @Route POST /myAlfred/api/orders/
// Add a new order
// @Access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, CREATE)) {
    return res.status(401).json()
  }

  const {errors, isValid}=validateOrder(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  let attributes=req.body
  attributes={...attributes, company: req.body.company || req.user.company, created_by: req.user}

  MODEL.create(attributes)
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/orders/:id/handle
// Resets address && shipping_mode to allow edition
// @Access private
router.put('/:id/handle', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, HANDLE)) {
    return res.status(401).json()
  }

  const total=req.body.total
  if (lodash.isNil(total)) {
    return res.status(400).json(`Paramètre 'total' (booléen) attendu`)
  }

  const order_id=req.params.id
  MODEL.findByIdAndUpdate(order_id, {handle_status: total ? HANDLED: PARTIALLY_HANDLED}, {new: true})
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/orders/:id/rewrite
// Resets address && shipping_mode to allow edition
// @Access private
router.put('/:id/rewrite', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, UPDATE)) {
    return res.status(401).json()
  }

  const order_id=req.params.id
  MODEL.findByIdAndUpdate(order_id, {address: null, shipping_mode: null, user_validated: false, reference: null, shipping_fee: null}, {new: true})
    .populate('items.product')
    .then(result => {
      if (!result) {
        return res.status(404).json(`${DATA_TYPE} #${order_id} not found`)
      }
      return result.save()
    })
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/orders/:id
// Set attributes(s) of an order {address_id?, reference?}
// @Access private
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, UPDATE)) {
    return res.status(401).json()
  }

  const order_id=req.params.id

  MODEL.findByIdAndUpdate(order_id, req.body, {new: true})
    .populate('items.product')
    .populate('company')
    .then(result => {
      if (!result) {
        return res.status(404).json(`${DATA_TYPE} #${order_id} not found`)
      }
      return updateShipFee(result)
    })
    .then(result => {
      return result.save()
    })
    .then(result => {
      return updateCompanyAddresses(result)
    })
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/orders/:id/item
// Add item to a order {product_id, quantity, discount?, replace}
// Adds quantity if replace is false else sets quantity
// @Access private
router.put('/:id/items', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, UPDATE)) {
    return res.status(401).json()
  }

  const {errors, isValid}=validateOrderItem(req.body)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  const order_id=req.params.id
  const {product, quantity, net_price, replace=false}=req.body

  if (net_price && !isActionAllowed(req.user.roles, DATA_TYPE, UPDATE_ALL)) {
    return res.status(401).json(`Droits insuffisants pour modifier le prix de l'article`)
  }

  MODEL.findById(order_id)
    .populate('items.product')
    .populate('company')
    .then(data => {
      if (!data) {
        console.error(`No order #${order_id}`)
        return res.status(404).json()
      }
      return addItem(data, product, null, quantity, net_price, replace)
    })
    .then(data => {
      return updateShipFee(data)
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

// @Route DELETE /myAlfred/api/orders/:id/item
// Removes item from a order
// @Access private
router.delete('/:order_id/items/:item_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, UPDATE)) {
    return res.status(401).json()
  }

  const order_id=req.params.order_id
  const item_id=req.params.item_id

  MODEL.findOneAndUpdate({_id: order_id}, {$pull: {items: {_id: item_id}}}, {new: true})
    .populate('items.product')
    .then(result => {
      if (!result) {
        return res.status(404).json(`${DATA_TYPE} #${order_id} not found`)
      }
      return updateShipFee(result)
    })
    .then(result => {
      return result.save()
    })
    .then(result => {
      return res.json(result)
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

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(401).json()
  }

  MODEL.find()
    .populate('items.product')
    .populate('company')
    .then(orders => {
      orders=filterOrderQuotation(orders, DATA_TYPE, req.user, VIEW)
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
router.get('/:order_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(401).json()
  }

  const order_id=req.params.order_id

  MODEL.findById(order_id)
    .populate('items.product')
    .populate('company')
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

  if (!isActionAllowed(req.user.roles, DATA_TYPE, DELETE)) {
    return res.status(401).json()
  }

  MODEL.findOneAndDelete()
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/products/:product_id
// View one product
// @Access private
router.get('/:order_id/products/:product_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  const order_id=req.params.order_id
  const product_id=req.params.product_id
  let product=null
  let data=null

  MODEL.findById(order_id)
    .populate('company')
    .then(result => {
      data=result
      return Product.findById(product_id).lean()
    })
    .then(result => {
      if (!result) {
        return res.status(404).json()
      }
      product=result
      return getProductPrices(product.reference, data.company)
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

// @Route DELETE /myAlfred/orders/:id
// Delete one order
// @Access private
router.post('/:order_id/validate', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VALIDATE)) {
    return res.status(401).json()
  }

  const order_id=req.params.order_id

  MODEL.findById(order_id)
    .populate('items.product')
    .then(data => {
      if (!data) {
        return res.status(404).json(`Order ${order_id} not found`)
      }
      if (lodash.isEmpty(data.address) || lodash.isEmpty(data.shipping_mode)) {
        return res.status(400).json(`Address and shipping mode are required to validate`)
      }
      data.user_validated=true
      return data.save()
    })
    .then(data => {
      return updateStock(data)
    })
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/orders/:id/shipping-fee?zipcode
// Computes shipping fees
// @Access private
router.get('/:id/shipping-fee', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(401).json()
  }

  const zipCode=req.query.zipcode

  const {errors, isValid}=validateZipCode(zipCode)
  if (!isValid) {
    return res.status(500).json(errors)
  }

  const fee={[EXPRESS_SHIPPING]: 0, [STANDARD_SHIPPING]: 0}
  let order=null
  MODEL.findById(req.params.id)
    .populate('items.product')
    .populate('company')
    .then(result => {
      if (!result) {
        return res.status(404).json()
      }
      order=result
      // Simulate address
      return computeShipFee(order, extractDepartment(zipCode), false)
    })
    .then(standard => {
      fee[STANDARD_SHIPPING]=standard
      return computeShipFee(order, extractDepartment(zipCode), true)
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
