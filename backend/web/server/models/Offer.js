const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let OfferSchema=null

try {
  OfferSchema=require(`../plugins/${getDataModel()}/schemas/OfferSchema`)
  OfferSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = OfferSchema ? mongoose.model('offer', OfferSchema) : null
