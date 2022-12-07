const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AvailabilitySchema=null

try {
  AvailabilitySchema=require(`./${getDataModel()}/AvailabilitySchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

AvailabilitySchema?.plugin(mongooseLeanVirtuals)
module.exports = AvailabilitySchema ? mongoose.model('availability', AvailabilitySchema) : null
