const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ContactSchema=null

try {
  ContactSchema=require(`./${getDataModel()}/ContactSchema`)
}
catch(err) {
  ContactSchema=null
}

ContactSchema?.plugin(mongooseLeanVirtuals)
module.exports = ContactSchema ? mongoose.model('contact', ContactSchema) : null
