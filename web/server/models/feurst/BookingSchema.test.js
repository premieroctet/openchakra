const {MONGOOSE_OPTIONS} = require('../../utils/database')
const lodash=require('lodash')

const ProductSchema = require('./ProductSchema')
const BookingSchema = require('./BookingSchema')
const mongoose = require('mongoose')

const Booking=mongoose.model('booking', BookingSchema)
const Product=mongoose.model('product', ProductSchema)

describe('Feurst Booking/Products test', () => {

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
        return Booking.create({
          reference: 'hopla',
          shipping_fee: 0,
        })
      })
  })

  afterAll(() => {
    return Product.deleteMany({})
      .then(() => {
        return Booking.deleteMany({})
      })
  })

  test('Booking amount properly computed', () => {
    return Product.find()
      .then(products => {
        const items=products.map(p => ({product: p, catalog_price: p.price, discount: 0.1}))
        return Booking.updateOne({}, {$set: {items: items}}, {new: true})
      })
      .then(() => {
        return Booking.findOne()
      })
      .then(book => {
        return expect(book.total_amount).toBe(24.3)
      })
  })

  const ATT_CASES='reference,description,weight,price'.split(',').map(a => ({product: PRODUCTS[0], attribute: a}))

  test.each(ATT_CASES)(
    'Product without $attribute must reject',
    ({product, attribute}) => {
      return expect(Product.create(lodash.omit(product, [attribute]))).rejects.not.toBeNull()
    })
})
