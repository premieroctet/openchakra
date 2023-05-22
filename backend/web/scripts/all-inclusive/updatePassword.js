const {MONGOOSE_OPTIONS} = require('../../server/utils/database');
const {getDatabaseUri} = require('../../config/config');
const mongoose=require('mongoose')
const {ROLE_TI, ROLE_COMPANY_ADMIN} = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')

const ACCOUNT=
  {email: 'marion.deschamps@my-alfred.io', password: 'Password1;'}

mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return User.findOneAndUpdate({email:ACCOUNT.email}, {password: ACCOUNT.password})
  })
  .then(res => {
    console.log(`Updated ${res}`)
  })
  .catch(error => {
    console.error(`Error ${error}`)
    process.exit(0)
  })
