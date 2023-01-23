const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let JobSchema=null

try {
  JobSchema=require(`../plugins/${getDataModel()}/schemas/JobSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

JobSchema?.plugin(mongooseLeanVirtuals)
module.exports = JobSchema ? mongoose.model('job', JobSchema) : null
