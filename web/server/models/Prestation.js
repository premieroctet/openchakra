const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PrestationSchema=null

try {
  PrestationSchema=require(`./${getDataModel()}/PrestationSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  PrestationSchema=require(`./others/PrestationSchema`)
}

PrestationSchema?.plugin(mongooseLeanVirtuals)
module.exports = PrestationSchema ? mongoose.model('prestation', PrestationSchema) : null
