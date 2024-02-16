const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let BaseSchema=null

try {
  BaseSchema=require(`../plugins/${getDataModel()}/schemas/AppointmentSchema`)
  BaseSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = BaseSchema ? mongoose.model('currentFutureAppointment', BaseSchema) : null
