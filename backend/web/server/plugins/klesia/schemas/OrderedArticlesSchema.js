const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const OrderedArticlesSchema = new Schema({
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
OrderedArticlesSchema.virtual('articles', {
  ref: 'article', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'orderedArticles', // is equal to foreignField
})
/* eslint-enable prefer-arrow-callback */

module.exports = OrderedArticlesSchema
