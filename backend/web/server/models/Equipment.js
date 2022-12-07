const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let EquipmentSchema=null

try {
  EquipmentSchema=require(`./${getDataModel()}/EquipmentSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

EquipmentSchema?.plugin(mongooseLeanVirtuals)
module.exports = EquipmentSchema ? mongoose.model('equipment', EquipmentSchema) : null
