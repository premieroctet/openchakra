const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ConsultationSchema=null

try {
  ConsultationSchema=require(`../plugins/${getDataModel()}/schemas/ConsultationSchema`)
  ConsultationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ConsultationSchema ? mongoose.model('consultation', ConsultationSchema) : null
