const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserSchema=null

try {
  UserSchema=require(`../plugins/${getDataModel()}/schemas/UserSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

UserSchema?.plugin(mongooseLeanVirtuals)
module.exports = UserSchema ? mongoose.model('user', UserSchema) : null
