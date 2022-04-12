const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let CompanySchema=null

try {
  CompanySchema=require(`./CompanySchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw e
  }
}

module.exports = CompanySchema ? mongoose.model('company', CompanySchema) : null
