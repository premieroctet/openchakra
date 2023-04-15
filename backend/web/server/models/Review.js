const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ReviewSchema=null

try {
  ReviewSchema=require(`../plugins/${getDataModel()}/schemas/ReviewSchema`)
  ReviewSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ReviewSchema ? mongoose.model('review', ReviewSchema) : null
