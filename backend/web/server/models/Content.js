const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ContentSchema=null

try {
  ContentSchema=require(`../plugins/${getDataModel()}/schemas/ContentSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ContentSchema?.plugin(mongooseLeanVirtuals)
module.exports = ContentSchema ? mongoose.model('content', ContentSchema) : null
