const {
  MONGOOSE_OPTIONS
} = require('../../server/utils/database')
const {
  getDatabaseUri,
  paymentPlugin
} = require('../../config/config')
const lodash=require('lodash')
const mongoose = require('mongoose')
const {
  ROLE_COMPANY_BUYER,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')

// Upsert all TI and CUSTOMERS

const saveUser = user => {
  return user.save()
    .catch(err => {
      console.error(`${user.email}:${err}`)
      throw err
    })
}
const checkUsersConsistency = () => {
    console.log(getDatabaseUri())
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
      .then(() => User.find())
      .then(users => Promise.all(users.map(u => saveUser(u))))
}

checkUsersConsistency()
