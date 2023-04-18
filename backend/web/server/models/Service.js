const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ServiceSchema=null

try {
  ServiceSchema=require(`../plugins/${getDataModel()}/schemas/ServiceSchema`)
  ServiceSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ServiceSchema ? mongoose.model('service', ServiceSchema) : null
