const {getDataModel}=require('../../config/config')

let Article = null

try {
  const Content = require(`./Content`)
  if (Content) {
    const ArticleSchema=require(`../plugins/${getDataModel()}/schemas/ArticleSchema`)
    ArticleSchema.plugin(require('mongoose-lean-virtuals'))
    Article = Content.discriminator('article', ArticleSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = Article
