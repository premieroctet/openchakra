const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserSessionDataSchema=null

try {
  UserSessionDataSchema=require(`../plugins/${getDataModel()}/schemas/UserSessionDataSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

UserSessionDataSchema?.plugin(mongooseLeanVirtuals)
module.exports = UserSessionDataSchema ? mongoose.model('userSessionData', UserSessionDataSchema) : null
