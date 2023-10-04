const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let OrderedArticlesSchema=null

try {
  OrderedArticlesSchema=require(`../plugins/${getDataModel()}/schemas/OrderedArticlesSchema`)
  OrderedArticlesSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = OrderedArticlesSchema ? mongoose.model('orderedArticles', OrderedArticlesSchema) : null
