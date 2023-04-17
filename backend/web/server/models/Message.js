const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let MessageSchema=null

try {
  MessageSchema=require(`../plugins/${getDataModel()}/schemas/MessageSchema`)
  MessageSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = MessageSchema ? mongoose.model('message', MessageSchema) : null
