const moment = require('moment')
/**
Paiement ; https://stripe.com/docs/connect/collect-then-transfer-guide?locale=fr-FR
*/
let Stripe=null

const init = config => {
  console.log(`init Stripe:${JSON.stringify(config)}`)
  Stripe=require('stripe')(config.STRIPE_KEY)
}

const getUserGroup = user => {
  if (!user._id) {
    throw new Error(`user._id is required`)
  }
  return `wallet_${user._id}`
}

const user2Token = user => {
  const dob = user.birthday ? {
    day: moment(user.birthday).date(),
    month: moment(user.birthday).month()+1,
    year: moment(user.birthday).year()
  } : undefined
  return {
    account:{
      business_type: 'individual',
      tos_shown_and_accepted: true,
      individual: {
        first_name: user.firstname || undefined,
        last_name: user.lastname || undefined,
        email: user.email || undefined,
        address: {
          line1: user.address || undefined,
          city: user.address || undefined,
          postal_code: 76,
        },
        phone: user.phone?.trim().replace(/ /g, '').replace(/^0/, '+33'),
        dob,
      },
    },
  }
}

const user2Data = (user, token_id) => ({
  account_token: token_id,
  business_profile:{
    mcc: 7278,
    url: 'https://hellotipi.fr'
  },
  /**
  external_account: {
    object: 'bank_account',
    country: 'FR',
    currency: 'eur',
    account_number: 'FR1420041010050500013M02606',
  },
  */
  capabilities: {
    card_payments: {
      requested: true,
    },
    transfers: {
      requested: true,
    },
  },
})

const upsertCustomer = user => {
  const data={
    email: user.email || undefined,
    address: {
      line1: user.address,
    },
    name: user.full_name,
    phone: user.phone?.trim().replace(/ /g, '').replace(/^0/, '+33'),
  }
  const fn=user.payment_account_id ?
    Stripe.customers.update(user.payment_account_id, data)
    :
    Stripe.customers.create(data)
  return fn
    .then(account => {
      return account.id
    })
}

const upsertProvider = user => {
  return Stripe.tokens.create(user2Token(user))
    .then(token => {
      const data=user2Data(user, token.id)
      const fn=user.payment_account_id ?
        Stripe.accounts.update(user.payment_account_id, data)
        :
        Stripe.accounts.create({...data, country:'FR', type:'custom'})
      return fn
    })
    .then(account => {
      user.payment_account_id=account.id
      return account.id
    })
}

const getCustomers = () => {
  return Stripe.customers.list()
    .then(result => result.data)
}

const getAccounts = () => {
  return Stripe.accounts.list()
    .then(result => result.data)
}

const createPayment = ({source_user, amount, fee, destination_user, description, success_url, failure_url}) => {
  if (!description) {
    throw new Error(`Description is required`)
  }
  return Stripe.checkout.sessions.create({
    line_items:[{
      price_data: {
        currency: 'eur',
        product_data: {
          name: description,
        },
        unit_amount: parseInt(amount*100),
      },
      quantity:1
    }],
    payment_intent_data: {
      application_fee_amount: parseInt(fee*100),
      transfer_data: {
        destination: destination_user.payment_account_id,
      }
    },
    customer: source_user.payment_account_id,
    mode: 'payment',
    success_url: success_url,
    cancel_url: failure_url,
  })
}

const createTransfer = ({destination, amount}) => {
  return Stripe.transfers.create({
    amount: amount*100,
    currency: 'eur',
    destination: destination.payment_account_id,
  })
}

const getCheckout = id => {
  return Stripe.checkout.sessions.list()
    .then(checkouts => {
      return checkouts.data.find(c => c.id==id)
    })
}

module.exports={
  init,
  upsertCustomer,
  getCustomers,
  createPayment,
  upsertProvider,
  getAccounts,
  createTransfer,
  getCheckout,
}
