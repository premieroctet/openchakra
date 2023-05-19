const moment = require('moment')

let Stripe=null
let Stripe2=null

const init = config => {
  console.log(`init:${config}`)
  Stripe=require('stripe')(config.STRIPE_KEY)
}

const createCustomer = user => {
  return Stripe.customers.create({
    email: user.email,
  })
}

const createSeller = user => {
  return Stripe2.createToken('account', {
    type: 'custom',
    country: 'fr',
    business_type: 'individual',
    email: user.email,
    tos_acceptance: {
      date: moment(user.creation_date).unix(),
      ip: user.register_ip,
    },
    individual: {
      first_name: user.firstname,
      last_name: user.lastname,
      phone: user.phone,
      address: {
        line1: user.address,
      }
    },
    tos_shown_and_accepted: true,
  })
  .then(token => {
    return Stripe.accounts.create({
      account_token: account.token.id,
    })
  })
}

const getCustomers = () => {
  return Stripe.customers.list()
    .then(result => result.data)
}

const createPayment = ({user, amount, description}) => {
  return getCustomers()
    .then(customers => {
      const customer=customers.find(c => c.email==user.email)
      return Stripe.prices.create({
        currency: 'eur',
        unit_amount: amount*100,
        product_data: {
          name: 'Mission de machin'
        }
      })
      .then(price => {
        return Stripe.checkout.sessions.create({
          line_items:[{
            price: price.id,
            quantity:1
          }],
          mode: 'payment',
          success_url: 'https://fumoir.my-alfred.io/yes',
          customer: customer.id,
          currency: 'eur',
          description,
        })
      })
    })
}

module.exports={
  init,
  createCustomer,
  getCustomers,
  createPayment,
  createSeller,
}
