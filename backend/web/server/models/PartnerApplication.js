const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PartnerApplicationSchema=null

try {
  PartnerApplicationSchema=require(`../plugins/${getDataModel()}/schemas/PartnerApplicationSchema`)
  PartnerApplicationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = PartnerApplicationSchema ? mongoose.model('partnerApplication', PartnerApplicationSchema) : null
