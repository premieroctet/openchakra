const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ServiceSchema=null

try {
  ServiceSchema=require(`./${getDataModel()}/ServiceSchema`)
  ServiceSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ServiceSchema ? mongoose.model('service', ServiceSchema) : null
