const mongoose = require('mongoose')

let CompanySchema=null

try {
  CompanySchema=require(`./CompanySchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CompanySchema ? mongoose.model('company', CompanySchema) : null
