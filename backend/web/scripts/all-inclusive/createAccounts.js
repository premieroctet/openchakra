const { MONGOOSE_OPTIONS } = require('../../server/utils/database');
const { getDatabaseUri } = require('../../config/config');
const mongoose=require('mongoose')
const { ROLE_TI } = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')

const ACCOUNTS=[
  {firstname: 'User1', lastname: 'Wappizy', email:'hello+user1@wappizy.com', password: 'Password1;', role: ROLE_TI},
  {firstname: 'User2', lastname: 'Wappizy', email:'hello+user2@wappizy.com', password: 'Password1;', role: ROLE_TI},
]

console.log(`Importing accounts in ${getDatabaseUri()}`)
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return Promise.all(ACCOUNTS.map(account => User.update({email: account.email}, {account}, {upsert: true})))
  })
  .then(res => {
    console.log(`Created ${JSON.stringify(res)}`)
    return User.countDocuments()
  })
  .then(res => {
    console.log(`User count:${res}`)
    process.exit(0)
  })
