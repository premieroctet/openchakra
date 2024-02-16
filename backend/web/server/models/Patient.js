const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PatientSchema=null

try {
  PatientSchema=require(`../plugins/${getDataModel()}/schemas/PatientSchema`)
  PatientSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = PatientSchema ? mongoose.model('patient', PatientSchema) : null
