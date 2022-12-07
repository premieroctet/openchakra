const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PostSchema=null

try {
  PostSchema=require(`./${getDataModel()}/PostSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

PostSchema?.plugin(mongooseLeanVirtuals)
module.exports = PostSchema ? mongoose.model('post', PostSchema) : null
