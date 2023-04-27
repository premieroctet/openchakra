const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let LoggedUserSchema=null

try {
  LoggedUserSchema=require(`../plugins/${getDataModel()}/schemas/UserSchema`)
  LoggedUserSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = LoggedUserSchema ? mongoose.model('loggedUser', LoggedUserSchema) : null
