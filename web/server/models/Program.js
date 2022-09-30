const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ProgramSchema=null

try {
  ProgramSchema=require(`./${getDataModel()}/ProgramSchema`)
}
catch(err) {
  if (err.code !== 'Program_NOT_FOUND') {
    throw err
  }
  ProgramSchema=require(`./others/ProgramSchema`)
}

ProgramSchema?.plugin(mongooseLeanVirtuals)
module.exports = ProgramSchema ? mongoose.model('program', ProgramSchema) : null
