const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ServiceUserSchema=null

try {
  ServiceUserSchema=require(`../plugins/${getDataModel()}/schemas/ServiceUserSchema`)
  ServiceUserSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ServiceUserSchema ? mongoose.model('serviceUser', ServiceUserSchema) : null
