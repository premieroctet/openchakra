const { getProviders } = require('../../server/plugins/payment/stripe')
const { getCustomers } = require('../../server/plugins/payment/stripe')
const {
  MONGOOSE_OPTIONS
} = require('../../server/utils/database')
const {
  getDatabaseUri,
  paymentPlugin
} = require('../../config/config')
const mongoose = require('mongoose')
const {
  ROLE_COMPANY_BUYER,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')
const lodash=require('lodash')

// Retrieve existing Stripe accounts and synchronize database
const updateDatabase = () => {
  const fields='role,email,payment_account_id'.split(',')
  return Promise.all([
    User.find({role:{$in:[ROLE_TI, ROLE_COMPANY_BUYER]}}, fields),
    getCustomers(), getProviders(),
  ])
   .then(([users, customers, providers]) => {
     const stripeAccounts=[...customers, providers]
     return Promise.allSettled(stripeAccounts.map(c => {
      const user=users.find(u => u.email==c.email)
      if (!user)  {
        return Promise.reject(`No db user for Stripe account ${JSON.stringify(c)}`)
      }
      if ((c.object=='customer' && user.role!=ROLE_COMPANY_BUYER)
        || (c.object=='account' && user.role!=ROLE_TI)) {
          return Promise.reject(`${user.email}:inconsistent role ${user.role} % Stripe type ${c.object}`)
      }
      if (user.payment_account_id && user.payment_account_id!=c.id)  {
        return Promise.reject(`${user.email}:has Stripe id ${user.payment_account_id}, should be ${c.id}`)
      }
      user.payment_account_id=c.id
      return user.save()
     }))
   })
}

// Upsert all TI and CUSTOMERS
const updateAccounts = () => {
    console.log(getDatabaseUri())
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
      .then(() => User.find({role: {$in: [ROLE_TI, ROLE_COMPANY_BUYER]}}))
      .then(users => {
        // Handle users having no bank account first
        const slices = lodash(users).sortBy(u => !!u.payment_account_id ? 0: 1)
        console.log(`Got ${slices.length} to upsert`)
        return Promise.allSettled(slices.map(user => {
          return (user.role == ROLE_TI ? paymentPlugin.upsertProvider(user) : paymentPlugin.upsertCustomer(user))
            .then(account_id => {
              console.log(`before save ${user.email}, id:${account_id}`)
              user.payment_account_id = account_id
              return user.save()
            })
            .catch(err => {
              console.log(`${user.email}:${err}`)
              throw err
            })
        }))
      })
}

if (require.main === module) {
  console.log(getDatabaseUri())
  return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
    .then(() => updateDatabase())
    .then(() => updateAccounts())
    .then(() => console.log('All OK'))
    .catch(err => console.error(err))
    .finally(() => process.exit(0))
}

module.exports={
  updateAccounts
}
