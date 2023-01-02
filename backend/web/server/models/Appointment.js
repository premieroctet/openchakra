const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AppointmentSchema=null

try {
  AppointmentSchema=require(`./${getDataModel()}/AppointmentSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

AppointmentSchema?.plugin(mongooseLeanVirtuals)
module.exports = AppointmentSchema ? mongoose.model('appointment', AppointmentSchema) : null
