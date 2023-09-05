const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AppointmentTypeSchema=null

try {
  AppointmentTypeSchema=require(`../plugins/${getDataModel()}/schemas/AppointmentTypeSchema`)
  AppointmentTypeSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = AppointmentTypeSchema ? mongoose.model('appointmentType', AppointmentTypeSchema) : null
