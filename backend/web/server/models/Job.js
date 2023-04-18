const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let JobSchema=null

try {
  JobSchema=require(`../plugins/${getDataModel()}/schemas/JobSchema`)
  JobSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = JobSchema ? mongoose.model('job', JobSchema) : null
