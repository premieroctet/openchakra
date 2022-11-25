const { MONGOOSE_OPTIONS } = require('../../server/utils/database');
const { getDatabaseUri } = require('../../config/config');
const mongoose=require('mongoose')
const User = require('../../server/models/User')

const PASSWORD='$2a$10$I.JGpEq3ZI8d.wqjJjnSY.cRgyI.FRasGtryVnO5GpO7yh9pqfpSi'

const ACCOUNTS=[
  {firstname: 'Simon', lastname: 'Hoayek', email:'simon.hoayek@fdg.com', role: 'FUMOIR_MEMBER', password: PASSWORD},
  {firstname: 'Karen', lastname: 'Finzi', email:'karen.finzi@fdg.com', role: 'FUMOIR_ADMIN', password: PASSWORD},
  {firstname: 'Elie', lastname: 'Fares', email:'elie.fares@fdg.com', role: 'FUMOIR_MANAGER', password: PASSWORD},
  {firstname: 'Tala', lastname: 'Chaker', email:'tala.chaker@fdg.com', role: 'FUMOIR_CHEF', password: PASSWORD}
]

console.log(`Importing accounts in ${getDatabaseUri()}`)
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return Promise.all(ACCOUNTS.map(account => User.update({email: account.email}, account, {upsert:true})))
  })
  .then(res => {
    console.log(`Created ${JSON.stringify(res)}`)
    return User.countDocuments()
  })
  .then(res => {
    console.log(`User count:${res}`)
    process.exit(0)
  })
