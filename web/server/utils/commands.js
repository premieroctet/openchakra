const {roundCurrency} = require('../../utils/converters')
const ShipRate = require('../models/ShipRate')
const {computeDiscount} = require('./discount')

const addItem = (data, product_id, quantity) => {

  return new Promise((resolve, reject) => {
    let item=data.items.find(item => item.product._id.toString() ==product_id.toString())
    if (item) {
      item.quantity += quantity
    }
    else {
      item = {product: product_id, quantity: quantity, catalog_price: 30 || product.price}
      data.items.push(item)
    }
    computeDiscount(product_id, item.quantity)
      .then(res => {
        item.discount=res || 0
        resolve(data)
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
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

module.exports = {addItem, computeShipFee}
