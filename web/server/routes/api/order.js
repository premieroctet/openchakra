const express = require('express')
const passport = require('passport')
const moment = require('moment')
const xlsx=require('node-xlsx')
const lodash=require('lodash')
const {
  COMPLETE,
  CONVERT,
  CREATED,
  EXPRESS_SHIPPING,
  HANDLE,
  HANDLED,
  PARTIALLY_HANDLE,
  PARTIALLY_HANDLED,
  REWRITE,
  STANDARD_SHIPPING,
  TOTALLY_HANDLE,
  UPDATE_ALL,
  VALID,
  VALIDATE,
} = require('../../../utils/feurst/consts')
const Quotation = require('../../models/Quotation')
const {
  addItem,
  computeShippingFee,
  extractDepartment,
  getProductPrices,
  isInDeliveryZone,
  updateCompanyAddresses,
  updateShipFee,
  updateStock,
} = require('../../utils/commands')
const {StatusError} = require('../../utils/errors')
const {
  filterOrderQuotation,
  getActionsForRoles,
  getStatusLabel,
  isActionAllowed,
} = require('../../utils/userAccess')
const Product = require('../../models/Product')
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
        return lineItemsImport(data, req.file.buffer, options)
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
  attributes={...attributes, company: req.body.company || req.user.company, created_by_company: req.user.company?._id}

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
  MODEL.findByIdAndUpdate(order_id, {handled_date: moment(), handle_status: total ? HANDLED: PARTIALLY_HANDLED}, {new: true})
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
  MODEL.findByIdAndUpdate(order_id, {validation_date: null, handle_status: null, handled_date: null}, {new: true})
    .then(result => {
      if (!result) {
        return res.status(404).json(`${DATA_TYPE} #${order_id} not found`)
      }
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
    .sort({creation_date: -1})
    .populate('items.product')
    .populate('company')
    .lean({virtuals: true})
    .then(orders => {
      orders=filterOrderQuotation(orders, DATA_TYPE, req.user, VIEW)
      orders.forEach(o => {
        o.status_label=getStatusLabel(o, DATA_TYPE, req.user)
      })
      return res.json(orders)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/orders
// View all orders
// @Access private
router.post('/:order_id/convert', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, CONVERT)) {
    return res.status(403).json()
  }

  const order_id=req.params.order_id

  let quotation=null

  MODEL.findById(order_id)
    .populate('company')
    .then(order => {
      if (!result) {
        return res.status(404).json(`${DATA_TYPE} #${order_id} not found`)
      }
      console.log(`Got order:${JSON.stringify(order)}`)
      const quotation={...lodash.omit(order, '_id'), items: order.items.map(item => lodash.omit(item, '_id')), validation_date: moment(), handled_date: null}
      return Quotation.create(quotation)
    })
    .then(result => {
      quotation=result
      return Order.findByIdAndRemove(order_id)
    })
    .then(() => {
      return res.json(quotation)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
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

/**
@Route POST /myAlfred/orders/:id/validate
 Validates an order
 Can return :
 - 404 if order not found
 - 412 if address or shipping mode is missing
 - 422 if address not in delivery zone
@Access private
*/
router.post('/:order_id/validate', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VALIDATE)) {
    return res.status(401).json()
  }

  const order_id=req.params.order_id

  MODEL.findById(order_id)
    .populate('items.product')
    .populate('company')
    .then(data => {
      if (!data) {
        throw new StatusError(`Order ${order_id} not found`, 404)
      }
      if (lodash.isEmpty(data.address) || lodash.isEmpty(data.shipping_mode)) {
        throw new StatusError(`Address and shipping mode are required to validate`, 412)
      }
      if (!isInDeliveryZone(data.address, data.company)) {
        throw new StatusError(`Address is outside delivery zone`, 422)
      }
      data.validation_date=moment()
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
      return res.status(err.status||500).json(err.message)
    })
})

// @Route GET /myAlfred/api/orders/:id/shipping-fee?zipcode
// Computes shipping fees
// @Access private
router.get('/:id/shipping-fee', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(401).json()
  }

  const address=JSON.parse(req.query.address)

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
      return computeShippingFee(order, address, false)
    })
    .then(standard => {
      fee[STANDARD_SHIPPING]=standard
      return computeShippingFee(order, address, true)
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

router.get('/:id/actions', passport.authenticate('jwt', {session: false}), (req, res) => {
  let result=[]
  const user=req.user
  MODEL.findById(req.params.id)
    .then(model => {
      if (isActionAllowed(user.roles, DATA_TYPE, UPDATE) && model.status==COMPLETE) {
        result.push(VALIDATE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, UPDATE) && model.status==VALID) {
        result.push(REWRITE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, HANDLE) && model.status==VALID) {
        result.push(PARTIALLY_HANDLE)
        result.push(TOTALLY_HANDLE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, HANDLE) && model.status==PARTIALLY_HANDLED) {
        result.push(TOTALLY_HANDLE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, DELETE) && [CREATED, COMPLETE].includes(model.status)) {
        result.push(DELETE)
      }
      return res.json(result)
    })
    .catch(err => {
      return res.status(err.status||500).json(err.message)
    })
})


module.exports = router
