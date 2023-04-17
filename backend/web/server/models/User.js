const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserSchema=null

try {
  UserSchema=require(`../plugins/${getDataModel()}/schemas/UserSchema`)
  UserSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  console.error(err)
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = UserSchema ? mongoose.model('user', UserSchema) : null
