const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let UIConfigurationSchema=null

try {
  UIConfigurationSchema=require(`../plugins/${getDataModel()}/schemas/UIConfigurationSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

UIConfigurationSchema?.plugin(mongooseLeanVirtuals)

module.exports = UIConfigurationSchema ? mongoose.model('uiconfiguration', UIConfigurationSchema) : null
