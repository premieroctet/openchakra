const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  body: {
    type: String,
    required: [true, 'Le contenu est obligatoire'],
  },
  conclusion: {
    type: String,
    required: [true, `La conclusion est obligatoire`],
  },
  order: {
    type: Number,
    required: [function() { return !!this.orderedArticle }, `L'ordre est obligatoire`],
  },
  orderedArticle: {
    type: Schema.Types.ObjectId,
    ref: 'orderedArticles',
    required: false,
  },
}, schemaOptions)


module.exports = ArticleSchema
