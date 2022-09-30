const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ReviewSchema=null

try {
  ReviewSchema=require(`./${getDataModel()}/ReviewSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  ReviewSchema=require(`./others/ReviewSchema`)
}

ReviewSchema?.plugin(mongooseLeanVirtuals)

module.exports = ReviewSchema ? mongoose.model('review', ReviewSchema) : null
