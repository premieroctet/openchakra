const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ContactSchema=null

try {
  ContactSchema=require(`../plugins/${getDataModel()}/schemas/ContactSchema`)
  ContactSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ContactSchema ? mongoose.model('contact', ContactSchema) : null
