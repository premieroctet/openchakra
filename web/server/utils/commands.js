const lodash=require('lodash')
const Product = require('../models/Product')
const PriceList = require('../models/PriceList')
const User = require('../models/User')
const {EXPRESS_SHIPPING} = require('../../utils/feurst/consts')
const {roundCurrency} = require('../../utils/converters')
const ShipRate = require('../models/ShipRate')


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
      const department=parseInt(String(data.address.zip_code).slice(0, -3))
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

const updateStock = orderQuot => {
  console.log(`Updating stock for ${orderQuot.items.map(i => ([i.product, i.quantity]))}`)
  const promises=orderQuot.items.map(it => Product.findByIdAndUpdate(it.product, {$inc: {stock: -it.quantity}}))
  Promise.allSettled(promises)
    .then(res => {
      const grouped=lodash.groupBy(res, 'status')
      console.log(`Result:${grouped}`)
      return Promise.resolve(orderQuot)
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(orderQuot)
    })
}

module.exports = {addItem, computeShipFee, updateShipFee, getProductPrices, updateStock}
