const lodash=require('lodash')
const Product = require('../models/Product')
const PriceList = require('../models/PriceList')
const User = require('../models/User')
const {EXPRESS_SHIPPING} = require('../../utils/feurst/consts')
const {roundCurrency} = require('../../utils/converters')
const ShipRate = require('../models/ShipRate')

const extractDept = address => {
  return parseInt(String(address.zip_code).slice(0, -3))
}

const getProductPrices = (product_ref, user_id) => {
  const result={catalog_price: 0, net_price: 0}
  let company=null
  return User.findById(user_id)
    .populate({path: 'company', populate: 'catalog_prices net_prices'})
    .then(user => {
      if (!user) { return Promise.reject('User not found') }
      company=user.company
      return PriceList.findOne({reference: product_ref, name: company.catalog_prices})
    })
    .then(price => {
      if (!price) { return Promise.reject(`Prix catalogue introuvable pour ${product_ref}`) }
      result.catalog_price=price.price
      return PriceList.findOne({reference: product_ref, name: company.net_prices})
    })
    .then(price => {
      if (!price) { return Promise.reject(`Prix remisé introuvable pour ${product_ref}`) }
      result.net_price=price.price
      return Promise.resolve(result)
    })
}
/** Adds product to the order :
If product is present, adds quantity if replace is false else sets quantity
If product is not present, adds the item to the order
*/
const addItem = (user_id, data, product_id, reference, quantity, replace=false) => {
  if (isNaN(parseInt(quantity))) {
    return Promise.reject(`Article ${reference}: quantité ${quantity} incorrect`)
  }
  let product=null
  return Product.findOne({$or: [{_id: product_id}, {reference: reference}]})
    .then(result => {
      if (!result) {
        return Promise.reject(`Article ${reference} inconnu`)
      }
      product=result
      return getProductPrices(product.reference, user_id)
    })
    .then(prices => {
      if (!prices) { return Promise.reject(`Tarif inconnu pour ${product.reference}`) }
      let item=data.items.find(item => item.product._id.toString()==product._id.toString())
      if (item) {
        item.quantity = replace ? parseInt(quantity) : item.quantity+parseInt(quantity)
      }
      else {
        item = {product: product, quantity: parseInt(quantity), catalog_price: prices.catalog_price, net_price: prices.net_price}
        data.items.push(item)
      }
      return Promise.resolve(data)
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}

/**
Computes Ship rate depending on zipcode, wieght and express (true||false)
*/
const computeShipFee = (zipcode, weight, express) => {
  return new Promise((resolve, reject) => {
    ShipRate.findOne({zipcode: zipcode, express: express, min_weight: {$lte: weight}, max_weight: {$gt: weight}})
      .then(rate => {
        if (!rate) {
          return reject(`No rate found for zipcode:${zipcode} weight:${weight} express:${express}`)
        }
        const fee=rate.fixed_price+rate.per_kg_price*parseInt(weight)
        return resolve(roundCurrency(fee))
      })
      .catch(err => {
        return reject(err)
      })
  })
}

/**
Updates shipping fee depending on ShipRate
Data is an Order or a Quotation
*/
const updateShipFee = data => {
  return new Promise((resolve, reject) => {
    if (data.address?.zip_code && data.shipping_mode) {
      const department=extractDept(data.address)
      computeShipFee(department, data.total_weight, result.shipping_mode==EXPRESS_SHIPPING)
        .then(fee => {
          data.shipping_fee=fee
          return resolve(data)
        })
        .catch(err => reject(err))
    }
    else {
      return resolve(data)
    }
  })
}

/** Update stock using depending on order/quotation items provided
If product is a group (i.e. has sub-products), update stock for each sub-component then set group's stock to the smallest one
Else update stock
*/
const updateStock = orderQuot => {
  return orderQuot.items.map(it => {
    return Product.findById(it.product)
      .populate('components')
      .then(product => {
        let promises
        const components=product.components
        if (components.length>0) {
          components.forEach(p => (p.stock=p.stock-it.quantity))
          product.stock=lodash.min(components.map(v => v.stock))
        }
        else {
          product.stock=product.stock-it.quantity
        }
        promises=[product.save(), ...components.map(p => p.save())]
        Promise.allSettled(promises)
          .then(() => {
            // const grouped=lodash.groupBy(res, 'status')
            return Promise.resolve(orderQuot)
          })
          .catch(err => {
            console.error(err)
            return Promise.reject(orderQuot)
          })
      })
  })
}

// Checks wether quotation or order is in the expected delivery zone
const isInDeliveryZone = quotOrder => {
  const addressDept=extractDept(quotOrder)
  const inZone=addressDept in quotOrder.company.delivery_zip_codes
  console.log(`isInZone:${addressDept}, ${quotOrder.company.delivery_zip_codes}: ${inZone}`)
  return inZone
}

module.exports = {addItem, computeShipFee, updateShipFee, getProductPrices,
  updateStock, isInDeliveryZone}
