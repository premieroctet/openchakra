const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ActivitySchema=null

try {
  ActivitySchema=require(`../plugins/${getDataModel()}/schemas/ActivitySchema`)
  ActivitySchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ActivitySchema ? mongoose.model('activity', ActivitySchema) : null
