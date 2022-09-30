const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let GroupSchema=null

try {
  GroupSchema=require(`./${getDataModel()}/GroupSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  GroupSchema=require(`./others/GroupSchema`)
}

GroupSchema?.plugin(mongooseLeanVirtuals)
module.exports = GroupSchema ? mongoose.model('group', GroupSchema) : null
