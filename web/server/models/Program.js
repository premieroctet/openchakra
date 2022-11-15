const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ProgramSchema=null

try {
  ProgramSchema=require(`./${getDataModel()}/ProgramSchema`)
}
catch(err) {
  ProgramSchema=null
}

ProgramSchema?.plugin(mongooseLeanVirtuals)

module.exports = ProgramSchema ? mongoose.model('program', ProgramSchema) : null
