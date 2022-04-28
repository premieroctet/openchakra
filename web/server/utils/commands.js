const Product = require('../models/Product')
const {EXPRESS_SHIPPING} = require('../../utils/feurst/consts')
const {roundCurrency} = require('../../utils/converters')
const ShipRate = require('../models/ShipRate')

/** Adds product to the order :
If product is present, adds quantity if replace is false else sets quantity
If product is not present, adds the item to the order
*/
const addItem = (data, product_id, reference, quantity, replace=false) => {
  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(quantity))) {
      return reject(`Article ${reference}: quantité ${quantity} incorrect`)
    }
    Product.findOne({$or: [{_id: product_id}, {reference: reference}]})
      .then(product => {
        if (!product) {
          return reject(`Article ${reference} inconnu`)
        }
        if (isNaN(product.price)) {
          return reject(`Le prix de l'article ${reference} est inconnu`)
        }
        let item=data.items.find(item => item.product._id.toString()==product._id.toString())
        if (item) {
          item.quantity = replace ? parseInt(quantity) : item.quantity+parseInt(quantity)
        }
        else {
          item = {product: product, quantity: parseInt(quantity), catalog_price: product.price}
          data.items.push(item)
        }
        return resolve(data)
      })
      .catch(err => { return reject(err) })
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

/**
Updates shipping fee depending on ShipRate
Data is an Order or a Quotation
*/
const updateDiscount = data => {
  return Promise.resolve(data)
}

module.exports = {addItem, computeShipFee, updateShipFee, updateDiscount}
