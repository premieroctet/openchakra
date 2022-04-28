const mongoose = require('mongoose')
const {
  EXPRESS_SHIPPING,
  ORDER_COMPLETE,
  ORDER_CREATED,
  ORDER_FULFILLED,
  ORDER_VALID,
} = require('../../../../utils/feurst/consts')
const {MONGOOSE_OPTIONS} = require('../../../../server/utils/database')

const ProductSchema = require('../../../../server/models/feurst/ProductSchema')
const OrderSchema = require('../../../../server/models/feurst/OrderSchema')
const UserSchema = require('../../../../server/models/feurst/UserSchema')

const Order=mongoose.model('order', OrderSchema)
const Product=mongoose.model('product', ProductSchema)
const User=mongoose.model('user', UserSchema)

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
        const items=products.map(p => ({product: p, catalog_price: p.price, discount: 0.1, quantity: 2}))
        return Order.updateOne({}, {$set: {items: items}}, {new: true})
      })
      .then(() => {
        return Order.findOne()
      })
      .then(order => {
        return expect(order.total_amount).toBe(48.6)
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
        expect(order.status).toBe(ORDER_CREATED)
        return Product.findOne()
      })
      .then(product => {
        const items=[{product: product._id, catalog_price: product.price, discount: 0.1}]
        return Order.findByIdAndUpdate(order._id, {$set: {items: items}}, {new: true})
      })
      .then(order => {
        expect(order.status).toBe(ORDER_FULFILLED)
        return Order.findByIdAndUpdate(order._id, {$set: {address: {address: 'Rue'}, shipping_mode: EXPRESS_SHIPPING}}, {new: true})
      })
      .then(order => {
        expect(order.status).toBe(ORDER_COMPLETE)
        return Order.findByIdAndUpdate(order._id, {$set: {user_validated: true}}, {new: true})
      })
      .then(order => {
        expect(order.status).toBe(ORDER_VALID)
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
