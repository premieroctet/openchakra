const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let GiftSchema=null

try {
  GiftSchema=require(`../plugins/${getDataModel()}/schemas/GiftSchema`)
  GiftSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = GiftSchema ? mongoose.model('gift', GiftSchema) : null
