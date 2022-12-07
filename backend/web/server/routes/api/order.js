const lodash=require('lodash')
const CronJob = require('cron').CronJob
const express = require('express')
const passport = require('passport')
const moment = require('moment')
const xlsx=require('node-xlsx')
const {NotFoundError} = require('../../utils/errors')
const {generateExcel} = require('../../utils/feurst/generateExcel')
const {BadRequestError, HTTP_CODES} = require('../../utils/errors')
const {sendDataNotification, sendOrderAlert} = require('../../utils/mailing')
const {
  COMPLETE,
  CONVERT,
  CREATED,
  CUSTOMER_ADMIN,
  EXPORT,
  EXPRESS_SHIPPING,
  FEURST_ADV,
  FEURST_SALES,
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
  ORDER_ALERT_CHECK_INTERVAL,
  ORDER_ALERT_DELAY,
  ORDER,
  CREATE,
  UPDATE,
  VIEW,
  DELETE,
} = require('../../../utils/feurst/consts')
const Quotation = require('../../models/Quotation')
const {
  addItem,
  computeCarriagePaidDelta,
  computeShippingFee,
  getProductPrices,
  isInDeliveryZone,
  updateCompanyAddresses,
  updateShipFee,
  updateStock,
} = require('../../utils/commands')
const {StatusError} = require('../../utils/errors')
const {
  filterOrderQuotation,
  getStatusLabel,
  isActionAllowed,
} = require('../../utils/userAccess')
const Product = require('../../models/Product')
const {lineItemsImport} = require('../../utils/import')
const {XL_FILTER, createMemoryMulter} = require('../../utils/filesystem')

const router = express.Router()
const Order = require('../../models/Order')
const {validateOrder, validateOrderItem}=require('../../validation/order')
const validateAddress=require('../../validation/address')
const feurstfr=require('../../../translations/fr/feurst')
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
        return res.status(HTTP_CODES.NOT_FOUND).json()
      }
      return res.json(order.company.addresses)
    })
})


// @Route GET /myAlfred/api/orders/template
// Returns an order xlsx template for import
// @Access private
router.get('/template', passport.authenticate('jwt', {session: false}), (req, res) => {
  const data = [
    ['Référence', 'Qté'],
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
    return res.status(403).json()
  }

  uploadItems.single('buffer')(req, res, err => {
    if (err) {
      console.error(err)
      return res.status(HTTP_CODES.NOT_FOUND).json({errors: err.message})
    }

    const order_id=req.params.order_id
    const options=JSON.parse(req.body.options)

    MODEL.findById(order_id)
      .populate('company')
      .populate('items.product')
      .then(data => {
        if (!data) {
          console.error(`${DATA_TYPE} #${order_id} not found`)
          return res.status(HTTP_CODES.NOT_FOUND).json()
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

  if (!req.headers.referer.includes('/create')) {
    return res.status(403).json(`Creation allowed from /create url only`)
  }

  if (!isActionAllowed(req.user.roles, DATA_TYPE, CREATE)) {
    return res.status(403).json()
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
      // const t=i18n.default.getFixedT(null, 'feurst')
      const msg=feurstfr[total ? 'EDI.ORDER_HANDLED_2_CUSTOMER': 'EDI.ORDER_PARTIALLY_HANDLED_2_CUSTOMER']
      sendDataNotification(req.user, CUSTOMER_ADMIN, result, msg)
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
        return res.status(HTTP_CODES.NOT_FOUND).json(`${DATA_TYPE} #${order_id} not found`)
      }
      if (req.body.address) {
        const {isValid, errors}=validateAddress(req.body.address)
        if (!isValid) {
          throw new BadRequestError(Object.values(errors).join(','))
        }
        if (!req.body.address._id && result.company?.addresses?.some(a => a.match(req.body.address))) {
          throw new BadRequestError('Cette adresse existe déjà')
        }
      }
      return MODEL.findByIdAndUpdate(order_id, req.body, {new: true})
        .populate('items.product')
        .populate('company')
    })
    .then(result => {
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
      return res.status(err.status || 500).json(err.message || err)
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
        return res.status(HTTP_CODES.NOT_FOUND).json()
      }
      return addItem({data, product_id: product, quantity, net_price, replace})
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
    .populate('company')
    .then(result => {
      if (!result) {
        return res.status(HTTP_CODES.NOT_FOUND).json(`${DATA_TYPE} #${order_id} not found`)
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
    .populate({path: 'company', populate: 'sales_representative'})
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
// Convert order to quotation
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
        return res.status(HTTP_CODES.NOT_FOUND).json(`${DATA_TYPE} #${order_id} not found`)
      }
      console.log(`Got order:${JSON.stringify(order)}`)
      const quotation={...lodash.omit(order, '_id'), items: order.items.map(item => lodash.omit(item, '_id')), validation_date: moment(), handled_date: null}
      return Quotation.create(quotation)
    })
    .then(result => {
      quotation=result
      return Order.findByIdAndRemove(order_id)
    })
    .then(order => {
      // const t=i18n.default.getFixedT(null, 'feurst')
      const msg=feurstfr['EDI.ORDER_CONVERTED_2_FEURST']
      sendDataNotification(req.user, FEURST_SALES, order, msg)
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
    .populate({path: 'company', populate: 'sales_representative'})
    .then(order => {
      if (order) {
        return res.json(order)
      }
      return res.status(HTTP_CODES.NOT_FOUND).json({msg: 'No order found'})
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
    return res.status(403).json()
  }

  MODEL.findOneAndDelete({_id: req.params.order_id})
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
      return Product.findById(product_id)
        .populate('components')
        .lean({virtuals: true})
    })
    .then(result => {
      if (!result) {
        return res.status(HTTP_CODES.NOT_FOUND).json()
      }
      product=result
      return getProductPrices(product.reference, data.company)
    })
    .then(prices => {
      product.catalog_price=prices.catalog_price
      product.net_price=prices.net_price
      return product.components?.length>0 ?
        Promise.allSettled(product.components.map(comp => getProductPrices(comp.reference, data.company)))
        :Promise.resolve([])
    })
    .then(results => {
      if (product.components) {
        product.components=product.components.filter((_, idx) => results[idx].status=='fulfilled')
      }
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

  let order=null
  MODEL.findById(order_id)
    .populate('items.product')
    .populate({path: 'company', populate: {path: 'sales_representative', select: 'email'}})
    .then(data => {
      order=data
      if (!data) {
        throw new NotFoundError(`Order ${order_id} not found`, 404)
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
      // const t=i18n.default.getFixedT(null, 'feurst')
      const msg=feurstfr['EDI.ORDER_VALID_2_FEURST']
      sendDataNotification(req.user, FEURST_ADV, order, msg)
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
        return res.status(HTTP_CODES.NOT_FOUND).json()
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

// @Route GET /myAlfred/api/orders/:id/export
// Export order as XL file
// @Access private
router.get('/:id/export', passport.authenticate('jwt', {session: false}), (req, res) => {
  MODEL.findById(req.params.id)
    .populate({path: 'company', populate: {path: 'sales_representative'}})
    .populate('items.product')
    .then(model => {
      const title=model.filename
      const buffer=generateExcel(model)
      res.setHeader('Content-Type', 'application/vnd.openxmlformats')
      res.setHeader('Content-Disposition', `attachment; filename="${title}"`)
      res.end(buffer, 'binary')
    })
})

router.get('/:id/actions', passport.authenticate('jwt', {session: false}), (req, res) => {
  let result=[]
  const user=req.user
  if (!req.user.cgv_valid) {
    return res.json([])
  }
  MODEL.findById(req.params.id)
    .then(model => {
      if (!model) {
        return res.status(HTTP_CODES.NOT_FOUND).json()
      }
      if (isActionAllowed(user.roles, DATA_TYPE, UPDATE) && ![VALID, PARTIALLY_HANDLED, HANDLED].includes(model.status)) {
        result.push(UPDATE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, UPDATE) && model.status==COMPLETE) {
        result.push(VALIDATE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, REWRITE) && model.status==VALID) {
        result.push(REWRITE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, HANDLE) && model.status==VALID) {
        result.push(PARTIALLY_HANDLE)
        result.push(TOTALLY_HANDLE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, HANDLE) && model.status==PARTIALLY_HANDLED) {
        result.push(TOTALLY_HANDLE)
      }
      if (isActionAllowed(user.roles, DATA_TYPE, DELETE)
        && [CREATED, COMPLETE].includes(model.status)
        && req.user.company?._id.toString()==model.created_by_company?._id.toString()) {
        result.push(DELETE)
      }
      if (isActionAllowed(req.user.roles, DATA_TYPE, EXPORT)) {
        result.push(EXPORT)
      }
      return res.json(result)
    })
    .catch(err => {
      return res.status(err.status||500).json(err.message)
    })
})

router.get('/:id/carriage-paid-delta', passport.authenticate('jwt', {session: false}), (req, res) => {
  return computeCarriagePaidDelta(MODEL, req.params.id)
    .then(value => {
      res.json(value)
    })
    .catch(err => {
      return res.status(err.status||500).json(err.message)
    })
})


/** Check orders unhandled after ORDER_ALERT_DELAY minutes
Check is done ervery ORDER_ALERT_CHECK_INTERVAL minutes
*/
const cronDef=`0 */${ORDER_ALERT_CHECK_INTERVAL} * * * *`
new CronJob(cronDef, (() => {
  const toDate = moment().add(-ORDER_ALERT_DELAY, 'minutes')
  const fromDate = moment(toDate).add(-ORDER_ALERT_CHECK_INTERVAL, 'minutes')

  Order.find({validation_date: {$gte: fromDate, $lte: toDate}})
    .populate({path: 'company', populate: {path: 'sales_representative', select: 'email'}})
    .then(result => {
      const orders=result.filter(o => o.status==VALID)
      console.log(`Cron: alerted orders ${orders.map(o => [o._id, o.validation_date])}`)
      orders.forEach(order => {
        sendOrderAlert(
          order.company.sales_representative.email,
          order.reference,
          order.company.name,
          order.url,
        )
      })
    })
    .catch(err => console.error(err))

}), null, true, 'Europe/Paris')

module.exports = router
