const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

const UserSchema=require(`./${getDataModel()}/UserSchema`)
UserSchema.plugin(mongooseLeanVirtuals)

module.exports = mongoose.model('user', UserSchema)
