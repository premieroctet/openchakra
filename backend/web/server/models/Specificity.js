const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SpecificitySchema=null

try {
  SpecificitySchema=require(`../plugins/${getDataModel()}/schemas/SpecificitySchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

SpecificitySchema?.plugin(mongooseLeanVirtuals)
module.exports = SpecificitySchema ? mongoose.model('specificity', SpecificitySchema) : null
