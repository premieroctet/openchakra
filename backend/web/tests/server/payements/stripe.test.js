const {
  createPayment,
  createSeller,
  getCustomers
} = require('../../../server/plugins/payment/stripe')
const {forceDataModelAllInclusive}=require('../../utils')

forceDataModelAllInclusive()

const moment = require('moment')
const {
  createCustomer,
  init
} = require('../../../server/plugins/payment/stripe')

describe('Stripe tests', () => {

  beforeAll(async() => {
    init({STRIPE_KEY: ''})
  })

  afterAll(async() => {
  })

  it('must create a customer', async() => {
    return createCustomer({email: `test${moment().valueOf()}@test.com`})
  })

  it('must list customers', async() => {
    const customer=(await getCustomers())[0]
    console.log(customer)
  })

  it('must createPayment', async() => {
    const customer=(await getCustomers())[0]
    return createPayment({user: {email: customer.email}, amount:200})
      .then(p => console.log(p))
  })

  it.only('must create a TPI', async() => {
    const ti=await createSeller({
      email: 'sebastien.auvray@free.fr', firstname: 'Sébastien', lastname: 'Auvray',
      address:'260 rue Louis Blanc, Rouen', phone: '+33675774324', register_ip: '127.0.0.1',
    })
    console.log(ti)
  })

})
