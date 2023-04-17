const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ResourceSchema=null

try {
  ResourceSchema=require(`../plugins/${getDataModel()}/schemas/ResourceSchema`)
  ResourceSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ResourceSchema ? mongoose.model('resource', ResourceSchema) : null
