const {MONGOOSE_OPTIONS} = require('../../server/utils/database');
const {getDatabaseUri} = require('../../config/config');
const mongoose=require('mongoose')
const {ROLE_TI, ROLE_COMPANY_ADMIN} = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')

const ACCOUNTS=[
  {firstname: 'User1', lastname: 'Wappizy', email:'hello+ti@wappizy.com', password: 'Password1;', role: ROLE_TI},
  {firstname: 'User2', lastname: 'Wappizy', email:'hello+adminent@wappizy.com', password: 'Password1;', role: ROLE_COMPANY_ADMIN},
]

console.log(`Importing accounts in ${getDatabaseUri()}`)
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return Promise.all(ACCOUNTS.map(account => User.create(account)))
  })
  .then(res => {
    console.log(`Created ${JSON.stringify(res)}`)
    return User.countDocuments()
  })
  .then(res => {
    console.log(`User count:${res}`)
    process.exit(0)
  })
