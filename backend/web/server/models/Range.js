const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let RangeSchema=null

try {
  RangeSchema=require(`../plugins/${getDataModel()}/schemas/RangeSchema`)
  RangeSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = RangeSchema ? mongoose.model('range', RangeSchema) : null
