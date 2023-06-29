const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { getDatabaseUri, paymentPlugin } = require('../../config/config')
const mongoose = require('mongoose')
const {
  ROLE_COMPANY_BUYER,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')

// Upsert all TI and CUSTOMERS
console.log(getDatabaseUri())
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    User.find({role: {$in: [ROLE_TI, ROLE_COMPANY_BUYER]}, payment_account_id: null})
    .then(users => {
      const slices=users.slice(0, 4)
      console.log(`Got ${slices.map(u => u.email)} to upsert`)
      return Promise.allSettled(slices.map(user => {
        return (user.role==ROLE_TI? paymentPlugin.upsertProvider(user) : paymentPlugin.upsertCustomer(user))
        .then(account_id => {
          console.log(`before save ${user.email}, id:${account_id}`)
          user.payment_account_id=account_id
          return user.save()
        })
      }))
      .then(res => console.log(res.map((r, idx) => [slices[idx].email, r.status=='rejected' ? r.reason : 'ok'])))
    })
    .catch(err => console.error(err))
  })
