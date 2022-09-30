const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let UIConfigurationSchema=null

try {
  UIConfigurationSchema=require(`./${getDataModel()}/UIConfigurationSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  UIConfigurationSchema=require(`./others/UIConfigurationSchema`)
}

UIConfigurationSchema?.plugin(mongooseLeanVirtuals)

module.exports = UIConfigurationSchema ? mongoose.model('uiconfiguration', UIConfigurationSchema) : null
