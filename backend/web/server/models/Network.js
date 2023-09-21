const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let NetworkSchema=null

try {
  NetworkSchema=require(`../plugins/${getDataModel()}/schemas/NetworkSchema`)
  NetworkSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = NetworkSchema ? mongoose.model('network', NetworkSchema) : null
