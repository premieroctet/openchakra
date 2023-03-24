const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PartnerApplicationSchema=null

try {
  PartnerApplicationSchema=require(`../plugins/${getDataModel()}/schemas/PartnerApplicationSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

PartnerApplicationSchema?.plugin(mongooseLeanVirtuals)
module.exports = PartnerApplicationSchema ? mongoose.model('partnerApplication', PartnerApplicationSchema) : null
