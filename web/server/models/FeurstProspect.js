const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let FeurstProspectSchema=null

try {
  FeurstProspectSchema=require(`./${getDataModel()}/FeurstProspectSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  FeurstProspectSchema=require(`./others/FeurstProspectSchema`)
}

FeurstProspectSchema?.plugin(mongooseLeanVirtuals)
module.exports = FeurstProspectSchema ? mongoose.model('feurstProspect', FeurstProspectSchema) : null
