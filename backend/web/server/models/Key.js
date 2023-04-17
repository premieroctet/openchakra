const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let KeySchema=null

try {
  KeySchema=require(`../plugins/${getDataModel()}/schemas/KeySchema`)
  KeySchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = KeySchema ? mongoose.model('key', KeySchema) : null
