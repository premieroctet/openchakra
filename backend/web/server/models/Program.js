const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ProgramSchema=null

try {
  ProgramSchema=require(`../plugins/${getDataModel()}/schemas/ProgramSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ProgramSchema?.plugin(mongooseLeanVirtuals)

module.exports = ProgramSchema ? mongoose.model('program', ProgramSchema) : null
