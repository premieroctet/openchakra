const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ObjectiveSchema=null

try {
  ObjectiveSchema=require(`../plugins/${getDataModel()}/schemas/ObjectiveSchema`)
  ObjectiveSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ObjectiveSchema ? mongoose.model('objective', ObjectiveSchema) : null
