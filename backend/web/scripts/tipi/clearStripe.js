const {
  deleteCustomer,
  deleteProvider,
  getCustomers,
  getProviders
} = require('../../server/plugins/payment/stripe')
const {
  MONGOOSE_OPTIONS
} = require('../../server/utils/database')
const lodash=require('lodash')
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

// Clear all customers
const clearAllCustomers = () => {
  return getCustomers()
  .then(custs => Promise.allSettled(custs.slice(0, 100).map(c => {
    console.log(`Deleting customer ${c.id}`)
    return deleteCustomer(c.id)
      .then(() => User.findOneAndUpdate({payment_account_id: c.id}, {$unset: {payment_account_id:true}}))
  })))
}

const clearAllProviders = () => {
  return getProviders()
    .then(providers => Promise.allSettled(providers.slice(0, 100).map(p => {
      console.log(`Deleting provider ${p.id}`)
      return deleteProvider(p.id)
        .then(() => User.findOneAndUpdate({payment_account_id: p.id}, {$unset: {payment_account_id:true}}))
    })))
}

Promise.allSettled([clearAllCustomers(), clearAllProviders()])
  .then(res => {
    const results=lodash.flattenDeep(res.map(r => r.value))
    const failed=results.filter(r => r.status=='rejected').map(r => r.reason.raw.message)
    console.log(JSON.stringify(failed, null, 2))
    console.log(`Failed:${failed.length}/${results.length}`)
  })
  .catch(err => console.error(err))
  .finally(() => process.exit(0))
