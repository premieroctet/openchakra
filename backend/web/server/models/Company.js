const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let CompanySchema=null

try {
  CompanySchema=require(`../plugins/${getDataModel()}/schemas/CompanySchema`)
  CompanySchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CompanySchema ? mongoose.model('company', CompanySchema) : null
