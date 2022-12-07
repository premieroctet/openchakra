const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let CompanySchema=null

try {
  CompanySchema=require(`./${getDataModel()}/CompanySchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CompanySchema ? mongoose.model('company', CompanySchema) : null
