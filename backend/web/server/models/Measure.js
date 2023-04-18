const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let MeasureSchema=null

try {
  MeasureSchema=require(`../plugins/${getDataModel()}/schemas/MeasureSchema`)
  MeasureSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = MeasureSchema ? mongoose.model('measure', MeasureSchema) : null
