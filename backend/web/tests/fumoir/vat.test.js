const mongoose = require('mongoose')
const moment=require('moment')
const {forceDataModelFumoir}=require('../utils')
forceDataModelFumoir()
require('../../server/models/User')
const User = require('../../server/models/User')
const Booking = require('../../server/models/Booking')
const OrderItem = require('../../server/models/OrderItem')
const Product = require('../../server/models/Product')
const Company = require('../../server/models/Company')
require('../../server/models/Cigar')
const Payment = require('../../server/models/Payment')
const Category = require('../../server/models/Category')
const {PAYMENT_SUCCESS} = require('../../utils/fumoir/consts')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(20000)

describe('Test vat on products, order item and so on', () => {

  let [product1_id, product2_id]=[null, null]
  let [orderItem1_id, orderItem2_id]=[null, null]
  let category_id=null
  let company_id=null
  const picture='image'

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    category_id =(await Category.create({name: 'Catégorie'}))._id
    company_id =(await Company.create({name: 'Société'}))._id
    const productParams={category: category_id, picture, supplier: company_id}
    product1_id=(await Product.create({...productParams, name: 'Product 1', price: 20, vat_rate: 0.2, reference: 'Ref1'}))._id
    product2_id=(await Product.create({...productParams, name: 'Product 2', price: 10, vat_rate: 0.05, reference: 'Ref2'}))._id
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('Product should compute vat', async() => {
    expect((await Product.findById(product1_id)).net_price).toEqual(16)
    expect((await Product.findById(product2_id)).net_price).toEqual(9.5)
  })

  it('OrderItem should compute vat', async() => {
    const product=await Product.findById(product1_id)
    const orderItem=await OrderItem.create({product: product, quantity: 5, price: product.price, vat_rate: product.vat_rate})
    expect(orderItem.vat_amount).toEqual(4)
    expect(orderItem.net_price).toEqual(16)
    expect(orderItem.total_vat_amount).toEqual(20)
    expect(orderItem.total_net_price).toEqual(80)
    expect(orderItem.total_price).toEqual(100)
  })

  it('OrderItem should compute vat', async() => {
    const user=await User.create({password: 'p', email: 'e', role: 'FUMOIR_MEMBER', lastname: 'l', firstname: 'f'})
    const [p1, p2]=await Product.find()
    const oi1=await OrderItem.create({product: p1, quantity: 5, price: p1.price, vat_rate: p1.vat_rate})
    const oi2=await OrderItem.create({product: p2, quantity: 10, price: p2.price, vat_rate: p2.vat_rate})
    let booking=await Booking.create({booking_user: user, items: [oi1, oi2]})
    booking=await Booking.findById(booking._id).populate('items').populate('payments')
    expect(booking.total_price).toEqual(200)
    expect(booking.total_net_price).toEqual(175)
    expect(booking.total_vat_amount).toEqual(25)
    expect(booking.remaining_total).toEqual(200)
    await Payment.create({booking, member: user, amount: 100, vat_amount: 5, status: PAYMENT_SUCCESS})
    booking=await Booking.findById(booking._id).populate('items').populate('payments')
    expect(booking.remaining_total).toEqual(100)
    expect(booking.remaining_vat_amount).toEqual(12.5)
  })


})
