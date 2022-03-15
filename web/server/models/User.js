const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

const UserSchema=require(`./${getDataModel()}/UserSchema`)

module.exports = User = mongoose.model('user', UserSchema)
