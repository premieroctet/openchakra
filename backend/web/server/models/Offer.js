const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let OfferSchema=null

try {
  OfferSchema=require(`../plugins/${getDataModel()}/schemas/OfferSchema`)
  OfferSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = OfferSchema ? mongoose.model('offer', OfferSchema) : null
