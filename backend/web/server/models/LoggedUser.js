const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let LoggedUserSchema=null

try {
  LoggedUserSchema=require(`../plugins/${getDataModel()}/schemas/UserSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

LoggedUserSchema?.plugin(mongooseLeanVirtuals)
module.exports = LoggedUserSchema ? mongoose.model('loggedUser', LoggedUserSchema) : null
