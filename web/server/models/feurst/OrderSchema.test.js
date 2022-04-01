const {MONGOOSE_OPTIONS} = require('../../utils/database')
const lodash=require('lodash')

const ProductSchema = require('./ProductSchema')
const OrderSchema = require('./OrderSchema')
const mongoose = require('mongoose')

const Order=mongoose.model('order', OrderSchema)
const Product=mongoose.model('product', ProductSchema)

describe('Feurst Order/Products test', () => {

  const PRODUCTS=[
    {description: 'Produit 1', reference: 'ref1', weight: 12, price: 12},
    {description: 'Produit 2', reference: 'ref2', weight: 20, price: 15},
  ]

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => {
        return Product.create(PRODUCTS)
      })
      .then(() => {
        return Order.create({
          reference: 'hopla',
          shipping_fee: 0,
        })
      })
  })

  afterAll(() => {
    return Product.deleteMany({})
      .then(() => {
        return Order.deleteMany({})
      })
  })

  test('Order amount properly computed', () => {
    return Product.find()
      .then(products => {
        const items=products.map(p => ({product: p, catalog_price: p.price, discount: 0.1}))
        return Order.updateOne({}, {$set: {items: items}}, {new: true})
      })
      .then(() => {
        return Order.findOne()
      })
      .then(order => {
        return expect(order.total_amount).toBe(24.3)
      })
  })

  const ATT_CASES='reference,description,weight,price'.split(',').map(a => ({product: PRODUCTS[0], attribute: a}))

  test.each(ATT_CASES)(
    'Product without $attribute must reject',
    ({product, attribute}) => {
      return expect(Product.create(lodash.omit(product, [attribute]))).rejects.not.toBeNull()
    })
})
