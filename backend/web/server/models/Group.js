const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let GroupSchema=null

try {
  GroupSchema=require(`../plugins/${getDataModel()}/schemas/GroupSchema`)
}
catch(err) {
  GroupSchema=null
}

GroupSchema?.plugin(mongooseLeanVirtuals)
module.exports = GroupSchema ? mongoose.model('group', GroupSchema) : null
