const Product = require('../models/Product')
const {EXPRESS_SHIPPING} = require('../../utils/feurst/consts')
const {roundCurrency} = require('../../utils/converters')
const ShipRate = require('../models/ShipRate')

const addItem = (data, product_id, quantity) => {
  return new Promise((resolve, reject) => {
    Product.findById(product_id)
      .then(product => {
        let item=data.items.find(item => item.product._id.toString()==product_id.toString())
        if (item) {
          item.quantity += quantity
        }
        else {
          item = {product: product, quantity: quantity, catalog_price: product.price}
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
  console.log(`Computing ship fee ${zipcode}, ${weight}, ${express}`)
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
