const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let NewsletterSchema=null

try {
  NewsletterSchema=require(`./${getDataModel()}/NewsletterSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

NewsletterSchema?.plugin(mongooseLeanVirtuals)

module.exports = NewsletterSchema ? mongoose.model('newsletter', NewsletterSchema) : null
