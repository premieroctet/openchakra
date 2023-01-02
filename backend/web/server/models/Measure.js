const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let MeasureSchema=null

try {
  MeasureSchema=require(`./${getDataModel()}/MeasureSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

MeasureSchema?.plugin(mongooseLeanVirtuals)
module.exports = MeasureSchema ? mongoose.model('measure', MeasureSchema) : null
