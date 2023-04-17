const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AvailabilitySchema=null

try {
  AvailabilitySchema=require(`../plugins/${getDataModel()}/schemas/AvailabilitySchema`)
  AvailabilitySchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = AvailabilitySchema ? mongoose.model('availability', AvailabilitySchema) : null
