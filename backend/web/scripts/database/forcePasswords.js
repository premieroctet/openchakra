const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const PASSWD=bcrypt.hashSync('password', 10)

// import all of our models - they need to be imported only once
const User = require('../../server/models/User')

const updatePasswords= databaseName => {
  return mongoose.connect(`mongodb://localhost/${databaseName}`, MONGOOSE_OPTIONS)
    .then(() => User.updateMany({}, {password: PASSWD}))
    .catch(console.error)
    .finally(process.exit(0))
}

const databaseName=process.argv[2]?.trim()
if (!databaseName) {
  console.error(`Expected database name`)
  process.exit(1)
}
updatePasswords()
