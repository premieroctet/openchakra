const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserSpoonSchema=null

try {
  UserSpoonSchema=require(`../plugins/${getDataModel()}/schemas/UserSpoonSchema`)
  UserSpoonSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = UserSpoonSchema ? mongoose.model('userSpoon', UserSpoonSchema) : null
