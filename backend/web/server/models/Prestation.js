const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PrestationSchema=null

try {
  PrestationSchema=require(`../plugins/${getDataModel()}/schemas/PrestationSchema`)
  PrestationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = PrestationSchema ? mongoose.model('prestation', PrestationSchema) : null
