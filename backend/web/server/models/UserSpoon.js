const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserSpoonSchema=null

try {
  UserSpoonSchema=require(`../plugins/${getDataModel()}/schemas/UserSpoonSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

UserSpoonSchema?.plugin(mongooseLeanVirtuals)
module.exports = UserSpoonSchema ? mongoose.model('userSpoon', UserSpoonSchema) : null
