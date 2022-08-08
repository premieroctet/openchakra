const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ServiceUserSchema=null

try {
  ServiceUserSchema=require(`./${getDataModel()}/ServiceUserSchema`)
  ServiceUserSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  console.error(err)
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  console.warn(err)
}

module.exports = ServiceUserSchema ? mongoose.model('serviceUser', ServiceUserSchema) : null
