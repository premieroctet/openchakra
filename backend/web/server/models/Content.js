const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ContentSchema=null

try {
  ContentSchema=require(`../plugins/${getDataModel()}/schemas/ContentSchema`)
  ContentSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ContentSchema ? mongoose.model('content', ContentSchema) : null
