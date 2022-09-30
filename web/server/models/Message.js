const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let MessageSchema=null

try {
  MessageSchema=require(`./${getDataModel()}/MessageSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  MessageSchema=require(`./others/MessageSchema`)
}

MessageSchema?.plugin(mongooseLeanVirtuals)
module.exports = MessageSchema ? mongoose.model('message', MessageSchema) : null
