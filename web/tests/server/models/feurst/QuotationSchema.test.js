const moment = require('moment')
const mongoose = require('mongoose')
const {
  COMPLETE,
  CREATED,
  EXPIRED,
  EXPRESS_SHIPPING,
  HANDLED,
  QUOTATION_VALIDITY,
  VALID,
} = require('../../../../utils/feurst/consts')
const OrderSchema = require('../../../../server/models/feurst/OrderSchema')
const {MONGOOSE_OPTIONS} = require('../../../../server/utils/database')

const ProductSchema = require('../../../../server/models/feurst/ProductSchema')
const QuotationSchema = require('../../../../server/models/feurst/QuotationSchema')
const UserSchema = require('../../../../server/models/feurst/UserSchema')

const Quotation=mongoose.model('quotation', QuotationSchema)
const Order=mongoose.model('order', OrderSchema)
const Product=mongoose.model('product', ProductSchema)
const User=mongoose.model('user', UserSchema)

describe('Feurst Quotation/Products test', () => {

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
        return Quotation.create({
          reference: 'hopla',
          user: user,
        })
      })
  })

  afterAll(() => {
    return mongoose.connection.db.dropDatabase()
  })

  test('Quotation amount properly computed', () => {
    return Product.find()
      .then(products => {
        const items=products.map(p => ({product: p, catalog_price: 50, net_price: 40, quantity: 2}))
        return Quotation.updateOne({}, {$set: {items: items}}, {new: true})
      })
      .then(() => {
        return Quotation.findOne()
      })
      .then(order => {
        return expect(order.total_amount).toBe(160)
      })
  })

  test('Quotation status properly computed', () => {
    let store=null
    return User.findOne()
      .then(user => {
        return Quotation.create({user: user})
      })
      .then(res => {
        store=res
        expect(res.status).toBe(CREATED)
        return Product.findOne()
      })
      .then(product => {
        const items=[{product: product._id, catalog_price: product.price, discount: 0.1}]
        return Quotation.findByIdAndUpdate(store._id, {$set: {items: items}}, {new: true})
      })
      .then(quotation => {
        expect(quotation.status).toBe(COMPLETE)
        return Quotation.findByIdAndUpdate(quotation._id, {$set: {validaiton_date: moment()}}, {new: true})
      })
      .then(quotation => {
        expect(quotation.status).toBe(VALID)
        return Quotation.findByIdAndUpdate(quotation._id, {$set: {creation_date: moment().subtract(QUOTATION_VALIDITY+1, 'days')}}, {new: true})
      })
      .then(quotation => {
        expect(quotation.status).toBe(EXPIRED)
        return Quotation.findByIdAndUpdate(quotation._id, {$set: {creation_date: moment().subtract(QUOTATION_VALIDITY-1, 'days')}}, {new: true})
      })
      .then(quotation => {
        expect(quotation.status).toBe(VALID)
        store=quotation
        return Order.create({user: store.user})
          .then(order => {
            return Quotation.findByIdAndUpdate(quotation._id, {$set: {linked_order: order}}, {new: true})
          })
      })
      .then(quotation => {
        expect(quotation.status).toBe(HANDLED)
        return Quotation.findByIdAndUpdate(quotation._id, {$set: {linked_order: null}}, {new: true})
      })
      .then(quotation => {
        expect(quotation.status).not.toBe(HANDLED)
      })
  })

})
