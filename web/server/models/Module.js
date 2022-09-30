const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ModuleSchema=null

try {
  ModuleSchema=require(`./${getDataModel()}/ModuleSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  ModuleSchema=require(`./others/ModuleSchema`)
}

ModuleSchema?.plugin(mongooseLeanVirtuals)
module.exports = ModuleSchema ? mongoose.model('module', ModuleSchema) : null
