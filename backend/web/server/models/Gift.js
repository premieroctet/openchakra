const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let GiftSchema=null

try {
  GiftSchema=require(`../plugins/${getDataModel()}/schemas/GiftSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

GiftSchema?.plugin(mongooseLeanVirtuals)
module.exports = GiftSchema ? mongoose.model('gift', GiftSchema) : null
