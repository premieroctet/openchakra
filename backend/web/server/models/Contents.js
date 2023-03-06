const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ContentsSchema=null

try {
  ContentsSchema=require(`../plugins/${getDataModel()}/schemas/ContentsSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ContentsSchema?.plugin(mongooseLeanVirtuals)
module.exports = ContentsSchema ? mongoose.model('contents', ContentsSchema) : null
