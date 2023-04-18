const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let DiplomaSchema=null

try {
  DiplomaSchema=require(`../plugins/${getDataModel()}/schemas/DiplomaSchema`)
  DiplomaSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = DiplomaSchema ? mongoose.model('diploma', DiplomaSchema) : null
