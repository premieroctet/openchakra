const User = require('../../server/models/User');
const Booking = require('../../server/models/Booking');
const OrderItem = require('../../server/models/OrderItem');
const Product = require('../../server/models/Product');
const Payment = require('../../server/models/Payment');
const { MONGOOSE_OPTIONS, getModels } = require('../../server/utils/database');
const { getDatabaseUri } = require('../../config/config');
const mongoose = require('mongoose');

describe('Test vat on products, order item and so on', () => {

  let [product1_id, product2_id]=[null,null]
  let [orderItem1_id, orderItem2_id]=[null,null]

  beforeAll( async () => {
    await mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
    await mongoose.connection.dropDatabase()
    product1_id=(await Product.create({price: 20, vat_rate:0.2}))._id
    product2_id =(await Product.create({price: 10, vat_rate:0.05}))._id
  })

  it('Product should compute vat', async () => {
    expect((await Product.findById(product1_id)).net_price).toEqual(16)
    expect((await Product.findById(product2_id)).net_price).toEqual(9.5)
  })

  it('OrderItem should compute vat', async () => {
    const product=await Product.findById(product1_id)
    const orderItem=await OrderItem.create({product:product, quantity:5, price:product.price, vat_rate: product.vat_rate})
    expect(orderItem.vat_amount).toEqual(4)
    expect(orderItem.net_price).toEqual(16)
    expect(orderItem.total_vat_amount).toEqual(20)
    expect(orderItem.total_net_price).toEqual(80)
    expect(orderItem.total_price).toEqual(100)
  })

  it('OrderItem should compute vat', async () => {
    const user=await User.create({password: 'p', email: 'e', role: 'FUMOIR_MEMBER', lastname:'l',firstname:'f'})
    const [p1, p2]=await Product.find()
    const oi1=await OrderItem.create({product:p1, quantity:5, price:p1.price, vat_rate: p1.vat_rate})
    const oi2=await OrderItem.create({product:p2, quantity:10, price:p2.price, vat_rate: p2.vat_rate})
    let booking=await Booking.create({booking_user: user, items:[oi1, oi2]})
    booking=await Booking.findById(booking._id).populate('items').populate('payments')
    expect(booking.total_price).toEqual(200)
    expect(booking.total_net_price).toEqual(175)
    expect(booking.total_vat_amount).toEqual(25)
    expect(booking.remaining_total).toEqual(200)
    await Payment.create({booking, member:user, total_amount: 100, vat_amount:5})
    booking=await Booking.findById(booking._id).populate('items').populate('payments')
    expect(booking.remaining_total).toEqual(100)
    expect(booking.remaining_vat_amount).toEqual(12.5)
  })


})
