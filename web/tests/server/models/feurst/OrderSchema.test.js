const mongoose = require('mongoose')
const {
  COMPLETE,
  CREATED,
  VALID,
} = require('../../../../utils/consts')
const {MONGOOSE_OPTIONS} = require('../../../../server/utils/database')

const ProductSchema = require('../../../../server/models/feurst/ProductSchema')
const OrderSchema = require('../../../../server/models/feurst/OrderSchema')
const UserSchema = require('../../../../server/models/feurst/UserSchema')

const Order=mongoose.model('order', OrderSchema)
const Product=mongoose.model('product', ProductSchema)
const User=mongoose.model('user', UserSchema)

describe('Feurst Order/Products test', () => {

  const PRODUCTS=[
    {description: 'Produit 1', reference: 'ref1', weight: 12},
    {description: 'Produit 2', reference: 'ref2', weight: 20},
  ]

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => {
        return Product.create(PRODUCTS)
      })
      .then(() => {
        return User.create({firstname: 'test', name: 'test', email: 'test@test.com'})
      })
      .then(user => {
        return Order.create({
          reference: 'hopla',
          user: user,
        })
      })
  })

  afterAll(() => {
    return Product.deleteMany({})
      .then(() => {
        return Order.deleteMany({})
      })
      .then(() => {
        return User.deleteMany({})
      })
  })

  test('Order amount properly computed', () => {
    return Product.find()
      .then(products => {
        const items=products.map(p => ({product: p, catalog_price: 50, net_price: 50*0.9, quantity: 2}))
        return Order.updateOne({}, {$set: {items: items}}, {new: true})
      })
      .then(() => {
        return Order.findOne()
      })
      .then(order => {
        expect(order.items[0].discount).toBe(0.1)
        return expect(order.total_amount).toBe(180)
      })
  })

  test('Order status properly computed', () => {
    let order=null
    return User.findOne()
      .then(user => {
        return Order.create({user: user})
      })
      .then(res => {
        order=res
        expect(order.status).toBe(CREATED)
        return Product.findOne()
      })
      .then(product => {
        const items=[{product: product._id, catalog_price: product.price, discount: 0.1}]
        return Order.findByIdAndUpdate(order._id, {$set: {items: items}}, {new: true})
      })
      .then(order => {
        expect(order.status).toBe(COMPLETE)
        return Order.findByIdAndUpdate(order._id, {$set: {validation_date: true}}, {new: true})
      })
      .then(order => {
        expect(order.status).toBe(VALID)
      })
  })

  /**
  const ATT_CASES='reference,description,weight,price'.split(',').map(a => ({product: PRODUCTS[0], attribute: a}))

  test.each(ATT_CASES)(
    'Product without $attribute must reject',
    ({product, attribute}) => {
      return expect(Product.create(lodash.omit(product, [attribute]))).rejects.not.toBeNull()
    })
  */
})
