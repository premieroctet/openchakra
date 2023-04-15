const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PipSchema=null

try {
  PipSchema=require(`../plugins/${getDataModel()}/schemas/KeySchema`)
  PipSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = PipSchema ? mongoose.model('pip', PipSchema) : null
