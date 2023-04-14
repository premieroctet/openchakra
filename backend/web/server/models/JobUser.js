const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let JobUserSchema=null

try {
  JobUserSchema=require(`../plugins/${getDataModel()}/schemas/JobUserSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = JobUserSchema ? mongoose.model('jobUser', JobUserSchema) : null
