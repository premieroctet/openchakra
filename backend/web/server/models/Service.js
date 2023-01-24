const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ServiceSchema=null

try {
  ServiceSchema=require(`../plugins/${getDataModel()}/schemas/ServiceSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ServiceSchema?.plugin(mongooseLeanVirtuals)

module.exports = ServiceSchema ? mongoose.model('service', ServiceSchema) : null
