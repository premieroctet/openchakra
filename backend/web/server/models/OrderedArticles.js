const {getDataModel}=require('../../config/config')

let OrderedArticles = null

try {
  const Content = require(`./Content`)
  if (Content) {
    const OrderedArticlesSchema=require(`../plugins/${getDataModel()}/schemas/OrderedArticlesSchema`)
    OrderedArticlesSchema.plugin(require('mongoose-lean-virtuals'))
    OrderedArticles = Content.discriminator('orderedArticles', OrderedArticlesSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = OrderedArticles
