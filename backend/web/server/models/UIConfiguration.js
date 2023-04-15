const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let UIConfigurationSchema=null

try {
  UIConfigurationSchema=require(`../plugins/${getDataModel()}/schemas/UIConfigurationSchema`)
  UIConfigurationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = UIConfigurationSchema ? mongoose.model('uiconfiguration', UIConfigurationSchema) : null
