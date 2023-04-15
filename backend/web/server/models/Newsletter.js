const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let NewsletterSchema=null

try {
  NewsletterSchema=require(`../plugins/${getDataModel()}/schemas/NewsletterSchema`)
  NewsletterSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = NewsletterSchema ? mongoose.model('newsletter', NewsletterSchema) : null
