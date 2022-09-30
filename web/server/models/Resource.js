const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ResourceSchema=null

try {
  ResourceSchema=require(`./${getDataModel()}/ResourceSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  ResourceSchema=require(`./others/ResourceSchema`)
}

ResourceSchema?.plugin(mongooseLeanVirtuals)
module.exports = ResourceSchema ? mongoose.model('resource', ResourceSchema) : null
