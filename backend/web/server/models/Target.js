const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TargetSchema=null

try {
  TargetSchema=require(`../plugins/${getDataModel()}/schemas/TargetSchema`)
  TargetSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = TargetSchema ? mongoose.model('target', TargetSchema) : null
