
const addItem = (data, product, quantity) => {

  return new Promise((resolve, reject) => {
    const product_id=product._id
    let item=data.items.filter(item => item._id ==product_id)
    if (item) {
      item.quantity += quantity
    }
    else {
      item = {product: product_id, quantity: quantity, catalog_price: product.price}
      data.items.push(item)
    }
    computeDiscount(product._id, item.quantity)
      .then(res => {
        item.discount=res
        resolve(data)
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
}

module.exports = {addItem}
