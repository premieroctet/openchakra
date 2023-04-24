const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let RequestSchema=null

try {
  RequestSchema=require(`../plugins/${getDataModel()}/schemas/RequestSchema`)
  RequestSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = RequestSchema ? mongoose.model('request', RequestSchema) : null
