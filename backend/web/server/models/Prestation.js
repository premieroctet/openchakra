const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PrestationSchema=null

try {
  PrestationSchema=require(`../plugins/${getDataModel()}/schemas/PrestationSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

PrestationSchema?.plugin(mongooseLeanVirtuals)
module.exports = PrestationSchema ? mongoose.model('prestation', PrestationSchema) : null
