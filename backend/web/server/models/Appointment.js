const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AppointmentSchema=null

try {
  AppointmentSchema=require(`../plugins/${getDataModel()}/schemas/AppointmentSchema`)
  AppointmentSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = AppointmentSchema ? mongoose.model('appointment', AppointmentSchema) : null
