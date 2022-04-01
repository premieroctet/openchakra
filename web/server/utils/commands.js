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

module.exports = {addItem}
